import React, { useEffect, useState } from "react";
import {
  Star,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  ChevronRight,
  Award,
  Truck,
  Shield,
  RotateCcw,
  Tag,
  EllipsisVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useLocation, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetProductByIdQuery,
} from "@/redux/api/productsApi";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadcrumbWithCustomSeparator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const ColorSwatch = ({ color, isSelected, onClick, size = "lg" }) => {
  const colorMap = {
    Grey: "bg-gray-400",
    Navy: "bg-blue-900",
    Beige: "bg-amber-100",
    Black: "bg-black",
    White: "bg-white border border-gray-300",
    Gold: "bg-yellow-400",
    Charcoal: "bg-gray-700",
    Cream: "bg-amber-50 border border-gray-200",
    Natural: "bg-amber-200",
    Brass: "bg-yellow-600",
    Chrome: "bg-gray-300",
    Silver: "bg-gray-200",
    Red: "bg-red-600",
    Green: "bg-green-600",
    Blue: "bg-blue-600",
    Pink: "bg-pink-500",
    Purple: "bg-purple-600",
    Orange: "bg-orange-500",
  };

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };
  const col = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
  return (
    <button
      onClick={() => onClick(color)}
      className={`${sizeClasses[size]} ${
        colorMap[col] || "bg-gray-300"
      } rounded-full border-2 transition-all duration-200 ${
        isSelected
          ? "border-black scale-110"
          : "border-gray-300 hover:border-gray-400"
      }`}
      title={color}
    />
  );
};

const StarRating = ({ rating, size = "md", showNumber = true, onChange }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xs: "w-3 h-3",
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
          onClick={() => onChange && onChange(i + 1)}
          onMouseEnter={() => onChange && onChange(i + 1)}
        />
      ))}
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      )}
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetProductByIdQuery(id);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });
  const [addReview] = useAddReviewMutation();
  const product = data?.data?.product;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [modalReviews, setModalReviews] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const routeParams = {
    id: id,
  };

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.color || product.colors[0]);
    }
    setSelectedImage(0);
  }, [product]);

  const handleAddReview = async () => {
    if (review.rating === 0 || !review.comment.trim()) {
      toast.error("Please provide a rating and a comment.");
      return;
    }
    addReview({ id, data: { ...review } })
      .unwrap()
      .then(() => {
        setReview({ rating: 0, comment: "" });
        toast.success("Review added successfully!");
        refetch();
        setActiveTab("reviews");
      })
      .catch((error) => {
        console.error("Failed to add review:", error);
        toast.error("Failed to add review. Please try again.");
      });
  };

  if (!product && !isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600">
              The product you're looking for doesn't exist.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) return <ProductDetailSkeleton />;

  const originalPrice =
    product.discount > 0 ? product.price / (1 - product.discount / 100) : null;
  const savings = originalPrice ? originalPrice - product.price : 0;

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const averageRating = product?.rating;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <BreadcrumbWithCustomSeparator
            
          />
        </div>
      </div>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={[product.image, ...product.gallery][selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product?.gallery &&
                  [product?.image, ...product.gallery].map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-black"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{product.model}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4">
                  <StarRating rating={averageRating} />
                  <span className="text-sm text-gray-600">
                    ({product?.numReviews} reviews)
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.popular && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Popular Choice
                  </span>
                )}
                {product.onSale && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 text-sm font-medium rounded-full">
                    On Sale
                  </span>
                )}
                {product.edition && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 text-sm font-medium rounded-full">
                    {product.edition}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-sm font-medium rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-green-600 font-medium">
                    You save ${savings.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Color: <span className="font-normal">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-3">
                    {[product?.color, ...product.colors].map((color) => (
                      <ColorSwatch
                        key={color}
                        color={color}
                        isSelected={selectedColor === color}
                        onClick={setSelectedColor}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center justify-between border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange("decrease")}
                      className="rounded-r-none hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-lg font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange("increase")}
                      className="rounded-l-none hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button className="flex-1 bg-black text-white hover:bg-gray-800 py-3 max-sm:order-3">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                  <Button variant="outline" size="icon" className="py-3 max-sm:order-2">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  Free shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />2 year warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw className="w-4 h-4" />
                  30-day returns
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  Quality guaranteed
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {["description", "specifications", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <div className="max-w-4xl">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>
                  {product.features && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Product Details
                      </h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Brand:</dt>
                          <dd className="font-medium">{product.brand}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Model:</dt>
                          <dd className="font-medium">{product.model}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Category:</dt>
                          <dd className="font-medium">
                            {product.category?.name}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Primary Color:</dt>
                          <dd className="font-medium">{product.color}</dd>
                        </div>
                        {product.edition && (
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Edition:</dt>
                            <dd className="font-medium">{product.edition}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    {product?.specifications && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Specifications
                        </h3>
                        <dl className="space-y-3">
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <dt className="text-gray-600">{key}:</dt>
                                <dd className="font-medium">{value}</dd>
                              </div>
                            )
                          )}
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="max-w-4xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Customer Reviews ({product.reviews.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={averageRating} showNumber={false} />
                      <span className="text-sm text-gray-600">
                        {averageRating.toFixed(1)} out of 5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mb-9">
                    <Button
                      variant="outline"
                      onClick={handleAddReview}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Send
                    </Button>
                    <div className="flex flex-col gap-2 flex-1">
                      <Input
                        placeholder={"write a review"}
                        value={review.comment}
                        onChange={(e) =>
                          setReview((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                      />
                      <div className="flex items-center gap-2 ">
                        <StarRating
                          rating={review.rating}
                          size="sm"
                          showNumber={false}
                          onChange={(rating) =>
                            setReview((prev) => ({ ...prev, rating }))
                          }
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={user?.profile?.avatar} />
                        <AvatarFallback>
                          {user?.firstName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {Array.from(product.reviews).map((review) => (
                      <ReviewCard
                        key={review._id}
                        review={review}
                        user={user}
                        id={id}
                        refetch={refetch}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ReviewCard = ({ review, user, id, refetch }) => {
  const [modalReviews, setModalReviews] = useState(false);
  const [deleteReview] = useDeleteReviewMutation();
  const handleDeleteReview = async () => {
    const res = await deleteReview({ id, reviewId: review._id }).unwrap();
    console.log(res);
    if (res.status === "success") {
      toast.success("Review deleted successfully!");
      setModalReviews(false);
      refetch();
    } else {
      toast.error("Failed to delete review. Please try again.");
      setModalReviews(false);
    }
  };

  return (
    <div className="flex items-start gap-2 border-b border-gray-200 pb-5 last:border-b-0" key={review._id}>
      <Avatar>
        <AvatarImage src={review.user.profile.avatar} />
        <AvatarFallback>{review.user?.firstName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div
        className="flex-1  p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-start gap-1">
            <div className="flex items-start flex-col gap-2">
              <span className="font-semibold text-gray-900 text-sm">
                {review.user?.firstName + " " + review.user?.lastName}
              </span>
              <StarRating rating={review.rating} size="xs" showNumber={false} />
            </div>

            <span className="text-xs text-gray-500 mt-0.5">
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString()
                : "Just now"}
            </span>
          </div>

          <div className=" relative">
            <EllipsisVertical
              size={15}
              className="cursor-pointer"
              onClick={() => setModalReviews(!modalReviews)}
            />
            {modalReviews && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  {review.user?._id === user?._id && (
                    <>
                      <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Edit
                      </li>
                      <li
                        onClick={handleDeleteReview}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Delete
                      </li>
                    </>
                  )}
                  <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Report
                  </li>
                </ul>
                <div className="border-t border-gray-200">
                  <Button
                    variant="ghost"
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setModalReviews(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
};

// Skeleton Loading Component
const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Breadcrumb Skeleton */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <div className="skeleton h-4 w-16 rounded"></div>
            <div className="skeleton h-4 w-4 rounded-full mx-2"></div>
            <div className="skeleton h-4 w-24 rounded"></div>
            <div className="skeleton h-4 w-4 rounded-full mx-2"></div>
            <div className="skeleton h-4 w-32 rounded"></div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <div className="skeleton w-full h-full"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <div className="skeleton w-full h-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Skeleton */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="skeleton h-4 w-16 rounded"></div>
                  <div className="skeleton h-4 w-4 rounded-full"></div>
                  <div className="skeleton h-4 w-24 rounded"></div>
                </div>
                <div className="skeleton h-8 w-3/4 rounded mb-3"></div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="skeleton w-5 h-5 rounded-full"
                      ></div>
                    ))}
                  </div>
                  <div className="skeleton h-4 w-20 rounded"></div>
                </div>
              </div>

              {/* Badges Skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="skeleton h-6 w-32 rounded-full"></div>
                <div className="skeleton h-6 w-20 rounded-full"></div>
                <div className="skeleton h-6 w-24 rounded-full"></div>
              </div>

              {/* Price Skeleton */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <div className="skeleton h-8 w-24 rounded"></div>
                  <div className="skeleton h-6 w-20 rounded"></div>
                  <div className="skeleton h-6 w-16 rounded"></div>
                </div>
                <div className="skeleton h-5 w-36 rounded"></div>
              </div>

              {/* Color Selection Skeleton */}
              <div>
                <div className="skeleton h-5 w-40 rounded mb-3"></div>
                <div className="flex gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="skeleton w-10 h-10 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart Skeleton */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <div className="skeleton w-10 h-10 rounded-l-lg"></div>
                    <div className="skeleton w-16 h-8"></div>
                    <div className="skeleton w-10 h-10 rounded-r-lg"></div>
                  </div>
                  <div className="skeleton flex-1 h-12 rounded-lg"></div>
                  <div className="skeleton w-12 h-12 rounded-lg"></div>
                </div>
              </div>

              {/* Features Skeleton */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="skeleton w-5 h-5 rounded"></div>
                    <div className="skeleton h-4 w-32 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information Tabs Skeleton */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8">
                <div className="skeleton h-10 w-32 rounded"></div>
                <div className="skeleton h-10 w-40 rounded"></div>
                <div className="skeleton h-10 w-28 rounded"></div>
              </div>
            </div>

            <div className="py-8">
              <div className="max-w-4xl">
                <div className="space-y-3">
                  <div className="skeleton h-5 w-full rounded"></div>
                  <div className="skeleton h-5 w-11/12 rounded"></div>
                  <div className="skeleton h-5 w-10/12 rounded"></div>
                  <div className="skeleton h-5 w-9/12 rounded"></div>
                  <div className="skeleton h-5 w-8/12 rounded"></div>
                </div>

                <div className="mt-6">
                  <div className="skeleton h-6 w-40 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="skeleton w-2 h-2 rounded-full mr-3"></div>
                        <div className="skeleton h-4 w-64 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
