import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  BarChart3,
  Shield,
  User,
  LogOut,
  ChevronDown,
  Bell,
  HelpCircle,
  CreditCard,
  Database,
  UserPlus,
  FileText,
  Activity,
  Package,
  Moon,
  Sun,
  Building2,
  Search,
  Heart,
  MapPin,
  Calculator,
  Phone,
  Mail,
  Calendar,
  Camera,
  DollarSign,
  TrendingUp,
  Filter,
  Star,
  Trash,
  Trash2,
  ChartAreaIcon,
  ChartBar,
  MessageCircle,
} from "lucide-react";
import BASE_URL from "../../helpers/baseUrl";
// used to display notifications to users
import toast from "react-hot-toast";
import axios from "axios";
const Bed = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"
    />
  </svg>
);

const Bath = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13a3 3 0 11-6 0 3 3 0 016 0zm4 0v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5"
    />
  </svg>
);

const Square = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      ry="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const Eye = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const Grid3X3 = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const List = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      x1="8"
      y1="6"
      x2="21"
      y2="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="8"
      y1="12"
      x2="21"
      y2="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="8"
      y1="18"
      x2="21"
      y2="18"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="3"
      y1="6"
      x2="3.01"
      y2="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="3"
      y1="12"
      x2="3.01"
      y2="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="3"
      y1="18"
      x2="3.01"
      y2="18"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const SlidersHorizontal = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      x1="21"
      y1="4"
      x2="14"
      y2="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="10"
      y1="4"
      x2="3"
      y2="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="21"
      y1="12"
      x2="12"
      y2="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="8"
      y1="12"
      x2="3"
      y2="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="21"
      y1="20"
      x2="16"
      y2="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="12"
      y1="20"
      x2="3"
      y2="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <circle
      cx="12"
      cy="4"
      r="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <circle
      cx="10"
      cy="12"
      r="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <circle
      cx="14"
      cy="20"
      r="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const TreePine = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2a1 1 0 0 1-.8-1.7L12 2l4 5.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22V8"
    />
  </svg>
);

const Warehouse = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 8.35V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.35A2 2 0 013.26 6.5l8-3.2a2 2 0 011.48 0l8 3.2A2 2 0 0122 8.35zM6 18h12M6 14h12"
    />
  </svg>
);

const Map = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polygon
      points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="8"
      y1="2"
      x2="8"
      y2="18"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line
      x1="16"
      y1="6"
      x2="16"
      y2="22"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const FavoriteProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    status: "AVAILABLE",
    minSize: "",
    maxSize: "",
    location: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Modal states
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addProperty, setAddProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    latitude: 0,
    longitude: 0,
    bedrooms: "",
    purpose: "",
    bathrooms: "",
    size: "",
    propertyType: "",
    status: "AVAILABLE",
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  // This two states are used when trying to modify a property.
  const [newImages, setNewImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [message, setMessage] = useState(null);
  const [currentProperty, setCurrentProperty] = useState(null);
  // Property types with icons
  const propertyTypes = [
    { value: "", label: "All Types", icon: Home },
    { value: "house", label: "House", icon: Home },
    { value: "apartment", label: "Apartment", icon: Building2 },
    { value: "condo", label: "Condo", icon: Building2 },
    { value: "villa", label: "Villa", icon: TreePine },
    { value: "commercial", label: "Commercial", icon: Warehouse },
  ];

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const ownerId = JSON.parse(sessionStorage.getItem("user")); // Replace with actual owner ID

      const response = await axios.get(
        `http://localhost:3000/favorite/user/${ownerId.id}`
      );
      console.log("API response:", response.data);
      const favoriteItems = response.data.favorites || []; // Ensure it's an array
      const actualProperties = favoriteItems
        .map((fav) => fav.property)
        .filter(Boolean); // Extract and filter out nulls
      setProperties(actualProperties);
      console.log(actualProperties);

      setError(null);
    } catch (err) {
      setError("Failed to fetch properties. Please try again later.");
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search logic
  const applyFilters = useCallback(() => {
    let filtered = [...properties];
    console.log(
      "my property filter",
      filtered.map((property) => property.property)
    );
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.propertyType.toLowerCase().includes(query)
      );
    }

    // Price filters
    if (filters.minPrice) {
      filtered = filtered.filter(
        (property) => property.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.property.filter(
        (property) => property.price <= parseFloat(filters.maxPrice)
      );
    }

    // Room filters
    if (filters.bedrooms) {
      filtered = filtered.property.filter(
        (property) => property.bedrooms >= parseInt(filters.bedrooms)
      );
    }
    if (filters.bathrooms) {
      filtered = filtered.property.filter(
        (property) => property.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) => property.propertyType === filters.propertyType
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(
        (property) => property.status === filters.status
      );
    }

    // Size filters
    if (filters.minSize) {
      filtered = filtered.filter(
        (property) => property.size >= parseFloat(filters.minSize)
      );
    }
    if (filters.maxSize) {
      filtered = filtered.filter(
        (property) => property.size <= parseFloat(filters.maxSize)
      );
    }

    // Location filter
    if (filters.location.trim()) {
      const locationQuery = filters.location.toLowerCase();
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(locationQuery)
      );
    }
    console.log("my filter", filtered.length);
    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [properties, searchQuery, filters]);

  // Effects
  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      propertyType: "",
      status: "AVAILABLE",
      minSize: "",
      maxSize: "",
      location: "",
    });
    setSearchQuery("");
  };

  // Modal handlers
  const openImageGallery = (property, imageIndex = 0) => {
    setSelectedProperty(property);
    setCurrentImageIndex(imageIndex);
    setShowImageGallery(true);
  };

  const closeImageGallery = () => {
    setShowImageGallery(false);
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProperty.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      );
    }
  };

  const openEditModal = (property) => {
    setEditingProperty({ ...property });
    setShowEditModal(true);
    // Reset temporary states for new images and removals
    setNewImages([]);
    setImagesToRemove([]);
    console.log("displaying editingProperties", editingProperty);
  };

  const handleAddModalPop = () => {
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProperty(null);
    setNewImages([]);
    setImagesToRemove([]);
  };

  const handleEditChange = (field, value) => {
    setEditingProperty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const removeExistingImage = (imageId) => {
    setEditingProperty((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
    setImagesToRemove((prev) => [...prev, imageId]);
  };

  const removeNewImage = (fileIndex) => {
    setNewImages((prev) => prev.filter((_, index) => index !== fileIndex));
  };

  //add property handlers

  const handleFieldChange = (field, value) => {
    setCurrentProperty((prev) => ({ ...prev, [field]: value }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Navigation handlers
  const handleViewDetails = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleAddPropertyPop = () => {
    setShowAddModal(true);
  };

  const handleScheduleTour = (propertyId) => {
    navigate(`/properties/${propertyId}/schedule`);
  };

  // Format price
  const formatPrice = (price) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price) + " FCFA"
    );
  };

  // Calculate average rating
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      AVAILABLE: "bg-green-100 text-green-800 border-green-200",
      RENTED: "bg-yellow-100 text-yellow-800 border-yellow-200",
      SOLD: "bg-red-100 text-red-800 border-red-200",
      UNDER_MAINTENANCE: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Property Card Component
  const PropertyCard = ({ property, isListView = false }) => {
    const [imageError, setImageError] = useState(false);
    const averageRating = getAverageRating(property.reviews);
    console.log(property.property);
    const toggleFavorite = (e) => {
      e.stopPropagation();
      e.preventDefault();

      //remove property from favorite
      handleRemoveFavorite(property.id);
    };

    const openLocationMap = () => {};

    //removeProperty to favorite

    const handleRemoveFavorite = async (propertyId) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      console.log("remove property id:", propertyId, "userId:", user.id);
      try {
        const response = await axios.delete(
          "http://localhost:3000/favorite/removefavorite",
          {
            // Place your data inside the 'data' key
            data: {
              propertyId: propertyId,
              userId: user.id,
            },
          }
        );

        if (response.data.isOk) {
          toast.success("Remove to favorite successfully");
        } else {
          toast.error("Failed to remove to favorite");
        }
        fetchProperties();
      } catch (err) {
        console.error("error removing to favorite", err);
        toast.error("Failed to remove to favorite");
      }
    };

    //get the user from the session
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    const isFavorited = () => {
      return true;
    };

    const handlePropertyClick = () => {
      // Navigate to property details or open image gallery
      openImageGallery(property);
    };

    const handleImageError = () => {
      setImageError(true);
    };

    // Fallback image component
    const FallbackImage = () => (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm font-medium">
            {property.propertyType}
          </p>
        </div>
      </div>
    );

    if (isListView) {
      return (
        <div className="flex">
          <div
            onClick={handlePropertyClick}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <div className="w-80 h-64 flex-shrink-0 relative overflow-hidden">
              {imageError ? (
                <FallbackImage />
              ) : (
                <img
                  src={property.images[0]?.url}
                  alt={property.title}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                  onError={handleImageError}
                  onClick={(e) => {
                    e.stopPropagation();
                    openImageGallery(property, 0);
                  }}
                  loading="lazy"
                />
              )}
              <button
                onClick={toggleFavorite}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                  isFavorited(property)
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorited(property) ? "fill-current" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  property.status
                )}`}
              >
                {property.status}
              </div>
              <div
                className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  property.status
                )}`}
              >
                {property.purpose}
              </div>
              {property.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  +{property.images.length - 1} photos
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </p>
                {averageRating > 0 && (
                  <div className="flex items-center justify-end mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {averageRating} ({property.reviews.length})
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {property.description}
            </p>

            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center text-gray-600">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bathrooms} bath</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  {property.size.toLocaleString()} sqft
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-gray-600">
                  <span className="text-sm font-medium">
                    {property.owner.name}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.owner.phone}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4 inline mr-1" />
                  map
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Trash className="w-4 h-4 inline mr-1" />
                  chat
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300  overflow-hidden group">
        <div onClick={handlePropertyClick} className="cursor-pointer">
          {/* Image */}
          <div className="relative overflow-hidden h-64">
            {imageError ? (
              <FallbackImage />
            ) : (
              property.images.map((img, index) => (
                <img
                  key={img.id}
                  src={`http://localhost:3000${img.url}`}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onError={handleImageError}
                  onClick={(e) => {
                    e.stopPropagation();
                    openImageGallery(property, 0);
                  }}
                  loading="lazy"
                />
              ))
            )}
            <button
              onClick={(e) => toggleFavorite(e)}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 bg-red-500 text-white`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorited() ? "fill-current" : ""}`}
              />
            </button>
            <div
              className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                property.status
              )}`}
            >
              {property.status}
            </div>
            <div
              className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                property.status
              )}`}
            >
              {property.purpose}
            </div>
            {property.images.length > 1 && (
              <div
                className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  openImageGallery(property, 0);
                }}
              >
                +{property.images.length - 1} photos
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="text-right ml-2">
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </p>
              {averageRating > 0 && (
                <div className="flex items-center justify-end mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">
                    {averageRating}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Bed className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Square className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.size.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={openLocationMap()}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <MapPin className="w-4 h-4 inline mr-1" />
              Map
            </button>
            <button className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Chat
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-800 text-xl mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProperties}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Link
                  to="/dashboard"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">Properties</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">Favorites</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Browse Favorite Properties
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProperties.length} properties found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, location, or property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
                  showFilters
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) =>
                      handleFilterChange("propertyType", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) =>
                      handleFilterChange("bedrooms", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) =>
                      handleFilterChange("bathrooms", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                {/* Size Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size (sqft)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minSize}
                      onChange={(e) =>
                        handleFilterChange("minSize", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxSize}
                      onChange={(e) =>
                        handleFilterChange("maxSize", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                    <option value="SOLD">Sold</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4 inline mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Properties Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                  : "space-y-6 mb-8"
              }
            >
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isListView={viewMode === "list"}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Gallery Modal */}
      {showImageGallery && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full mx-4">
            {/* Close button */}
            <button
              onClick={closeImageGallery}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={`http://localhost:3000${selectedProperty.images[currentImageIndex]?.url}`}
                alt={`${selectedProperty.title} - Image ${
                  currentImageIndex + 1
                }`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              ;{/* Navigation arrows */}
              {selectedProperty.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronDown className="w-6 h-6 rotate-90" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronDown className="w-6 h-6 -rotate-90" />
                  </button>
                </>
              )}
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            {selectedProperty.images.length > 1 && (
              <div className="mt-4 flex justify-center space-x-2 overflow-x-auto">
                {selectedProperty.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={`http://localhost:3000${image?.url}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Property info overlay */}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white p-4 rounded-lg max-w-sm">
              <h3 className="font-semibold text-lg mb-1">
                {selectedProperty.title}
              </h3>
              <p className="text-sm opacity-90 mb-2">
                {selectedProperty.location}
              </p>
              <p className="text-xl font-bold">
                {formatPrice(selectedProperty.price)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteProperty;
