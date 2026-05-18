
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';

const ProductModal = ({ 
  product = null, 
  categories = [], 
  onSave, 
  children 
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    gallery: [],
    price: 0,
    description: '',
    brand: '',
    model: '',
    color: '',
    category: '',
    popular: false,
    discount: 0,
    rating: 0,
    stock: 0,
    edition: '',
    onSale: false
  });

  // Initialize form when product changes or modal opens
  useEffect(() => {
    if (product) {
      setFormData({
        id: product?._id || '',
        title: product.title || '',
        image: product.image || '',
        gallery: product?.gallery || '',
        price: product.price || 0,
        description: product.description || '',
        brand: product.brand || '',
        model: product.model || '',
        color: product.color || '',
        category: product.category?._id || product.category || '',
        popular: product.popular || false,
        discount: product.discount || 0,
        rating: product.rating || 0,
        stock: product.stock || 0,
        edition: product.edition || '',
        onSale: product.onSale || false
      });
      setColors(product.colors || []);
    } else {
      setFormData({
        title: '',
        image: '',
        gallery: [],
        price: 0,
        description: '',
        brand: '',
        model: '',
        color: '',
        category: '',
        popular: false,
        discount: 0,
        rating: 0,
        stock: 0,
        edition: '',
        onSale: false
      });
      setColors([]);
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value, type, checked, files} = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked  : type === 'file' ? files[0]  : value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  const handleAddColor = () => {
    if (formData.color.trim() && !colors.includes(formData.color.trim())) {
      setColors([...colors, formData.color.trim()]);
      setFormData(prev => ({ ...prev, color: '' }));
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setColors(colors.filter(color => color !== colorToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData)
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value])=> {
        
        if(key !== 'gallery' && value) {
          form.append(`${key}`, value)
        } 
           
      });

      colors.forEach(color=> form.append('colors', color));
      formData.gallery.forEach((file) => form.append('gallery', file))

     const res = await onSave(form);
      if(res.error) {
toast.error(
         res.error.data.message ? res.error.data.message :
         (product 
          ? "Faild to updated product" 
          : "Faild to create product")
      );
      } else {
        toast.success(
         product 
          ? "Product updated successfully" 
          : "Product created successfully"
      );
      setOpen(false);
      }
    } catch (error) {
      toast.error( error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product 
              ? "Update the product details below" 
              : "Fill in the details for the new product"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Column 1 */}
          <div className="space-y-5">
            <div>
              <Label className={`pb-2`} htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="image">Cover Image  *</Label>
                 <Input
                id="image"
                name="image"
                type="file"
                
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="gallery">Other Images  *</Label>
                 <Input
                id="gallery"
                name="gallery"
                type="file"
                multiple
                onChange={(e)=> setFormData(prev => ({...prev, gallery: Array.from(e.target.files)}))}
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleNumberChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleNumberChange}
                min="0"
                max="100"
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Enter model name"
                required
              />
            </div>

            <div>
              <Label className={`pb-2`}>Available Colors</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.color}
                  onChange={handleChange}
                  name="color"
                  placeholder="Add a color"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleAddColor}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex items-center px-3 py-1 rounded-full text-xs bg-muted"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div>
              <Label className={`pb-2`} htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleNumberChange}
                min="0"
                required
              />
            </div>

            <div>
              <Label className={`pb-2`} htmlFor="edition">Edition</Label>
              <Input
                id="edition"
                name="edition"
                value={formData.edition}
                onChange={handleChange}
                placeholder="Special edition, version, etc."
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className={`pb-2`} htmlFor="popular">Popular Product</Label>
                <p className="text-sm text-muted-foreground">
                  Show this product as popular
                </p>
              </div>
              <Switch
                id="popular"
                checked={formData.popular}
                onCheckedChange={checked => setFormData(prev => ({ ...prev, popular: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className={`pb-2`} htmlFor="onSale">On Sale</Label>
                <p className="text-sm text-muted-foreground">
                  Show discount pricing
                </p>
              </div>
              <Switch
                id="onSale"
                checked={formData.onSale}
                onCheckedChange={checked => setFormData(prev => ({ ...prev, onSale: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label className={`pb-2`} htmlFor="rating">Initial Rating</Label>
                <p className="text-sm text-muted-foreground">
                  (0-5)
                </p>
              </div>
              <Input
                id="rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleNumberChange}
                min="0"
                max="5"
                step="0.1"
                className="w-24"
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;