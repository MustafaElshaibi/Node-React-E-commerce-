function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.totalCount = null;
    this.baseQuery = null;
    this.filterConditions = {};
    this.stockConditions = {};
  }

  filter() {
    const filterObj = { ...this.queryString };
    const unwantedKeys = ['page', 'limit', 'sort', 'fields', 'search'];
    unwantedKeys.forEach(el => delete filterObj[el]);
    
    // Handle advanced filtering operators
    const conditions = {};
    for (const [key, value] of Object.entries(filterObj)) {
      if (key.match(/\[(gte|gt|lte|lt|ne|in|nin|regex)\]$/)) {
        const [field, operator] = key.split(/[\[\]]/).filter(Boolean);
        if (!conditions[field]) conditions[field] = {};
        
        conditions[field][`$${operator}`] = isNaN(Number(value)) 
          ? value 
          : Number(value);
      } else {
        conditions[key] = isNaN(Number(value)) ? value : Number(value);
      }
    }

    // Store filter conditions instead of applying immediately
    this.filterConditions = conditions;
    return this;
  }

  textSearch() {
    if (this.queryString.search) {
      const searchTerm = this.queryString.search.trim();
      
      if (searchTerm) {
        console.log("[Atlas Search] Term:", searchTerm);
        
        // Combine text search with existing filter conditions
        const searchCondition = { 
          $text: { $search: searchTerm } 
        };
        
        // Merge text search with other filters using $and
        const combinedConditions = Object.keys(this.filterConditions).length > 0
          ? { $and: [this.filterConditions, searchCondition] }
          : searchCondition;

        this.query = this.query.find(combinedConditions)
          .sort({ score: { $meta: "textScore" } })
          .select('-__v');

        console.log("[Atlas Search] Combined Query:", JSON.stringify(combinedConditions));
      }
    } else {
      // Apply regular filters if no search term exists
      this.query = this.query.find(this.filterConditions);
    }
    
    // Set base query for pagination
    this.baseQuery = this.query.clone();
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  async paginate() {
    const page = Math.max(1, parseInt(this.queryString.page) || 1);
    const limit = Math.max(1, parseInt(this.queryString.limit) || 10);
    const skip = (page - 1) * limit;
    
    if (!this.totalCount && this.baseQuery) {
      this.totalCount = await this.baseQuery.model.countDocuments(this.baseQuery.getFilter());
    }
    
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  async execute() {
    const results = await this.query;
    const page = Math.max(1, parseInt(this.queryString.page) || 1);
    const limit = Math.max(1, parseInt(this.queryString.limit) || 10);
    const totalPages = this.totalCount ? Math.ceil(this.totalCount / limit) : 1;
    
    return {
      results,
      pagination: {
        totalItems: this.totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }
}

module.exports = ApiFeatures;