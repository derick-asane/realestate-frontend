// src/pages/owner/OwnerProperty.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Home, Building2, Search, Heart, MapPin, Calculator,
  Phone, Camera, TrendingUp, Star, Trash2, Settings,
  X, ChevronLeft, ChevronRight, Plus, SlidersHorizontal,
  LayoutGrid, List,
} from "lucide-react";
import api from "../../helpers/axios";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

// ─── Inline SVG icons not in lucide ──────────────────────────────────────────
const BedIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 5a2 2 0 012-2h2a2 2 0 012 2v2H9V5z"/>
  </svg>
);

// ── ADD THESE HERE ────────────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";

const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const BathIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13a3 3 0 11-6 0 3 3 0 016 0zm4 0v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5"/>
  </svg>
);

const SquareIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round"
      strokeLinejoin="round" strokeWidth={2}/>
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { value: "", label: "All Types" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "villa", label: "Villa" },
  { value: "commercial", label: "Commercial" },
];

const EMPTY_PROPERTY = {
  title: "", description: "", price: "", location: "",
  latitude: "", longitude: "", bedrooms: "", bathrooms: "",
  size: "", propertyType: "house", status: "AVAILABLE",
  purpose: "RENT", images: [],
};

const EMPTY_FILTERS = {
  minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "",
  propertyType: "", status: "", minSize: "", maxSize: "", location: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: 0 }).format(price) + " FCFA";

const getAverageRating = (reviews) => {
  if (!reviews?.length) return 0;
  return (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
};

const getStatusColor = (status) => {
  const colors = {
    AVAILABLE: "bg-green-100 text-green-800 border-green-200",
    RENTED: "bg-yellow-100 text-yellow-800 border-yellow-200",
    SOLD: "bg-red-100 text-red-800 border-red-200",
    UNDER_MAINTENANCE: "bg-gray-100 text-gray-800 border-gray-200",
    DRAFT: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

const BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000";

const imgSrc = (url) => (url?.startsWith("http") ? url : `${BASE}${url}`);

// ─── Property Card ────────────────────────────────────────────────────────────
const PropertyCard = ({ property, onEdit, onDelete, onGallery, isListView }) => {
  const [imgError, setImgError] = useState(false);
  const avgRating = getAverageRating(property.reviews);
  const firstImage = property.images?.[0];

  const Fallback = () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
      <Home className="w-12 h-12 text-gray-400 mb-2" />
      <p className="text-gray-500 text-sm">{property.propertyType}</p>
    </div>
  );

  if (isListView) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex">
        <div className="w-72 h-56 flex-shrink-0 relative cursor-pointer" onClick={() => onGallery(property)}>
          {imgError || !firstImage ? <Fallback /> : (
            <img src={imgSrc(firstImage.url)} alt={property.title}
              className="w-full h-full object-cover" onError={() => setImgError(true)} loading="lazy"/>
          )}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
            {property.status}
          </div>
          <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {property.purpose}
          </span>
          {property.images?.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              +{property.images.length - 1} photos
            </span>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
              <p className="text-xl font-bold text-blue-600 ml-2">{formatPrice(property.price)}</p>
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{property.description}</p>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1"><BedIcon className="w-4 h-4"/>{property.bedrooms} bed</span>
              <span className="flex items-center gap-1"><BathIcon className="w-4 h-4"/>{property.bathrooms} bath</span>
              <span className="flex items-center gap-1"><SquareIcon className="w-4 h-4"/>{property.size?.toLocaleString()} sqft</span>
              {avgRating > 0 && (
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current"/>{avgRating}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => onEdit(property)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Settings className="w-4 h-4"/>Edit
            </button>
            <button onClick={() => onDelete(property.id)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
              <Trash2 className="w-4 h-4"/>Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative h-56 cursor-pointer overflow-hidden" onClick={() => onGallery(property)}>
        {imgError || !firstImage ? <Fallback /> : (
          <img src={imgSrc(firstImage.url)} alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)} loading="lazy"/>
        )}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
          {property.status}
        </div>
        <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {property.purpose}
        </span>
        {property.images?.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            +{property.images.length - 1}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1">{property.title}</h3>
          <p className="text-base font-bold text-blue-600 ml-2 whitespace-nowrap">{formatPrice(property.price)}</p>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 shrink-0"/>
          <span className="line-clamp-1">{property.location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
          <span className="flex items-center gap-1"><BedIcon className="w-4 h-4"/>{property.bedrooms}</span>
          <span className="flex items-center gap-1"><BathIcon className="w-4 h-4"/>{property.bathrooms}</span>
          <span className="flex items-center gap-1"><SquareIcon className="w-4 h-4"/>{property.size?.toLocaleString()}</span>
          {avgRating > 0 && (
            <span className="flex items-center gap-1 ml-auto"><Star className="w-3 h-3 text-yellow-400 fill-current"/>{avgRating}</span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(property)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Settings className="w-4 h-4"/>Edit
          </button>
          <button onClick={() => onDelete(property.id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
            <Trash2 className="w-4 h-4"/>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const OwnerProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [properties, setProperties]               = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState(null);
  const [viewMode, setViewMode]                   = useState("grid");
  const [searchQuery, setSearchQuery]             = useState("");
  const [showFilters, setShowFilters]             = useState(false);
  const [filters, setFilters]                     = useState(EMPTY_FILTERS);
  const [currentPage, setCurrentPage]             = useState(1);
  const ITEMS_PER_PAGE                            = 12;

  // Gallery
  const [gallery, setGallery]                     = useState({ open: false, property: null, index: 0 });

  // Edit modal
  const [showEditModal, setShowEditModal]         = useState(false);
  const [editingProperty, setEditingProperty]     = useState(null);
  const [newImages, setNewImages]                 = useState([]);
  const [imagesToRemove, setImagesToRemove]       = useState([]);
  const [editLoading, setEditLoading]             = useState(false);

  // Add modal
  const [showAddModal, setShowAddModal]           = useState(false);
  const [addProperty, setAddProperty]             = useState(EMPTY_PROPERTY);
  const [addLoading, setAddLoading]               = useState(false);

  // ─── Fetch ─────────────────────────────────────────────────────────────────
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/properties/my/listings");
      setProperties(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch properties. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  // ─── Filter logic ──────────────────────────────────────────────────────────
  const applyFilters = useCallback(() => {
    let filtered = [...properties];
    const q = searchQuery.toLowerCase().trim();

    if (q) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
      );
    }
    if (filters.minPrice) filtered = filtered.filter((p) => p.price >= parseFloat(filters.minPrice));
    if (filters.maxPrice) filtered = filtered.filter((p) => p.price <= parseFloat(filters.maxPrice));
    if (filters.bedrooms) filtered = filtered.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.bathrooms) filtered = filtered.filter((p) => p.bathrooms >= parseInt(filters.bathrooms));
    if (filters.propertyType) filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    if (filters.status) filtered = filtered.filter((p) => p.status === filters.status);
    if (filters.minSize) filtered = filtered.filter((p) => p.size >= parseFloat(filters.minSize));
    if (filters.maxSize) filtered = filtered.filter((p) => p.size <= parseFloat(filters.maxSize));
    if (filters.location.trim()) filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes(filters.location.toLowerCase())
    );

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [properties, searchQuery, filters]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const clearFilters = () => { setFilters(EMPTY_FILTERS); setSearchQuery(""); };

  // ─── Gallery ───────────────────────────────────────────────────────────────
  const openGallery  = (property, index = 0) => setGallery({ open: true, property, index });
  const closeGallery = () => setGallery({ open: false, property: null, index: 0 });
  const nextImg = () => setGallery((g) => ({ ...g, index: (g.index + 1) % g.property.images.length }));
  const prevImg = () => setGallery((g) => ({ ...g, index: g.index === 0 ? g.property.images.length - 1 : g.index - 1 }));

  // ─── Edit ──────────────────────────────────────────────────────────────────
  const openEditModal = (property) => {
    setEditingProperty({ ...property });
    setNewImages([]);
    setImagesToRemove([]);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProperty(null);
    setNewImages([]);
    setImagesToRemove([]);
  };

  const handleEditChange = (field, value) =>
    setEditingProperty((prev) => ({ ...prev, [field]: value }));

  const removeExistingImage = (imageId) => {
    setEditingProperty((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
    setImagesToRemove((prev) => [...prev, imageId]);
  };

  const removeNewImage = (index) =>
    setNewImages((prev) => prev.filter((_, i) => i !== index));

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files).filter((f) => {
      if (!f.type.startsWith("image/")) { toast.error(`${f.name} is not an image`); return false; }
      if (f.size > 5 * 1024 * 1024) { toast.error(`${f.name} exceeds 5MB`); return false; }
      return true;
    });
    setNewImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const handleSaveChanges = async () => {
    if (!editingProperty) return;
    setEditLoading(true);
    try {
      // 1. Update property fields
      const { images, owner, reviews, ...fields } = editingProperty;
      await api.put(`/properties/${editingProperty.id}`, fields);

      // 2. Delete removed images
      await Promise.all(
        imagesToRemove.map((imgId) => api.delete(`/images/images/${imgId}`))
      );

      // 3. Upload new images
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((file) => formData.append("images", file));
        await api.post(`/images/${editingProperty.id}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success("Property updated successfully!");
      closeEditModal();
      fetchProperties();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update property");
    } finally {
      setEditLoading(false);
    }
  };

  // ─── Add ───────────────────────────────────────────────────────────────────
  const closeAddModal = () => {
    setShowAddModal(false);
    setAddProperty(EMPTY_PROPERTY);
  };

  const handleAddChange = (field, value) =>
    setAddProperty((prev) => ({ ...prev, [field]: value }));

  const handleAddImageUpload = (e) => {
    const files = Array.from(e.target.files).filter((f) => {
      if (!f.type.startsWith("image/")) { toast.error(`${f.name} is not an image`); return false; }
      if (f.size > 5 * 1024 * 1024) { toast.error(`${f.name} exceeds 5MB`); return false; }
      return true;
    });
    setAddProperty((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    e.target.value = "";
  };

  const removeAddImage = (index) =>
    setAddProperty((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const handleSaveNewProperty = async () => {
    if (!addProperty.title || !addProperty.price || !addProperty.location) {
      toast.error("Title, price and location are required");
      return;
    }
    setAddLoading(true);
    try {
      // 1. Create property — ownerId comes from token on backend
      const { images, ...fields } = addProperty;
      const res = await api.post("/properties", fields);
      const newPropertyId = res.data.data.id;

      // 2. Upload images if any
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));
        await api.post(`/images/${newPropertyId}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success("Property added successfully!");
      closeAddModal();
      fetchProperties();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add property");
    } finally {
      setAddLoading(false);
    }
  };

  // ─── Delete ────────────────────────────────────────────────────────────────
  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await api.delete(`/properties/${propertyId}`);
      toast.success("Property deleted successfully");
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete property");
    }
  };

  // ─── Pagination ────────────────────────────────────────────────────────────
  const totalPages        = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ─── Drag & drop ───────────────────────────────────────────────────────────
  const handleDrop = (e, isAdd) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const valid = files.filter((f) => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024);
    if (isAdd) setAddProperty((prev) => ({ ...prev, images: [...prev.images, ...valid] }));
    else setNewImages((prev) => [...prev, ...valid]);
  };


  // ─── Render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"/>
        <p className="text-gray-600">Loading properties...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-4xl mb-4">⚠️</p>
        <p className="text-gray-800 text-lg mb-2">Something went wrong</p>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={fetchProperties} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
              <p className="text-gray-500 text-sm mt-1">{filteredProperties.length} properties found</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4"/>Add Property
            </button>
          </div>
        </div>
      </div>

      {/* ── Search + Filters ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input type="text" placeholder="Search by title, location or type..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                  showFilters ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}>
                <SlidersHorizontal className="w-4 h-4"/>Filters
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}>
                  <LayoutGrid className="w-4 h-4"/>
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}>
                  <List className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <FormField label="Min Price">
                  <input type="number" placeholder="Min" value={filters.minPrice}
                    onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))} className={inputClass}/>
                </FormField>
                <FormField label="Max Price">
                  <input type="number" placeholder="Max" value={filters.maxPrice}
                    onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))} className={inputClass}/>
                </FormField>
                <FormField label="Property Type">
                  <select value={filters.propertyType}
                    onChange={(e) => setFilters((p) => ({ ...p, propertyType: e.target.value }))} className={inputClass}>
                    {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </FormField>
                <FormField label="Status">
                  <select value={filters.status}
                    onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))} className={inputClass}>
                    <option value="">All</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                    <option value="SOLD">Sold</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </FormField>
                <FormField label="Min Bedrooms">
                  <select value={filters.bedrooms}
                    onChange={(e) => setFilters((p) => ({ ...p, bedrooms: e.target.value }))} className={inputClass}>
                    <option value="">Any</option>
                    {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </FormField>
                <FormField label="Min Bathrooms">
                  <select value={filters.bathrooms}
                    onChange={(e) => setFilters((p) => ({ ...p, bathrooms: e.target.value }))} className={inputClass}>
                    <option value="">Any</option>
                    {[1,2,3,4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </FormField>
                <FormField label="Location">
                  <input type="text" placeholder="Filter by location..." value={filters.location}
                    onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))} className={inputClass}/>
                </FormField>
              </div>
              <div className="flex justify-end">
                <button onClick={clearFilters}
                  className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                  <X className="w-4 h-4"/>Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Results ────────────────────────────────────────────────────────── */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-5xl mb-4">🏠</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className={viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
              : "space-y-4 mb-8"}>
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property}
                  isListView={viewMode === "list"}
                  onEdit={openEditModal}
                  onDelete={handleDeleteProperty}
                  onGallery={openGallery}/>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm">
                  <ChevronLeft className="w-4 h-4"/>Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = totalPages <= 5 ? i + 1
                    : currentPage <= 3 ? i + 1
                    : currentPage >= totalPages - 2 ? totalPages - 4 + i
                    : currentPage - 2 + i;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentPage === page ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}>
                      {page}
                    </button>
                  );
                })}
                <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm">
                  Next<ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Image Gallery Modal ───────────────────────────────────────────────── */}
      {gallery.open && gallery.property && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button onClick={closeGallery}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30">
            <X className="w-5 h-5"/>
          </button>
          <div className="relative max-w-4xl w-full">
            <img src={imgSrc(gallery.property.images[gallery.index]?.url)}
              alt={gallery.property.title}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"/>
            {gallery.property.images.length > 1 && (
              <>
                <button onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30">
                  <ChevronLeft className="w-5 h-5"/>
                </button>
                <button onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30">
                  <ChevronRight className="w-5 h-5"/>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {gallery.index + 1} / {gallery.property.images.length}
                </div>
              </>
            )}
          </div>
          {gallery.property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-lg">
              {gallery.property.images.map((img, i) => (
                <button key={img.id} onClick={() => setGallery((g) => ({ ...g, index: i }))}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === gallery.index ? "border-white" : "border-transparent opacity-60 hover:opacity-80"
                  }`}>
                  <img src={imgSrc(img.url)} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Edit Modal ────────────────────────────────────────────────────────── */}
      {showEditModal && editingProperty && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
              <button onClick={closeEditModal} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Title *">
                  <input type="text" value={editingProperty.title}
                    onChange={(e) => handleEditChange("title", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Property Type *">
                  <select value={editingProperty.propertyType}
                    onChange={(e) => handleEditChange("propertyType", e.target.value)} className={inputClass}>
                    {PROPERTY_TYPES.filter((t) => t.value).map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Price (FCFA) *">
                  <input type="number" value={editingProperty.price}
                    onChange={(e) => handleEditChange("price", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Status *">
                  <select value={editingProperty.status}
                    onChange={(e) => handleEditChange("status", e.target.value)} className={inputClass}>
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                    <option value="SOLD">Sold</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </FormField>
                <FormField label="Purpose *">
                  <select value={editingProperty.purpose}
                    onChange={(e) => handleEditChange("purpose", e.target.value)} className={inputClass}>
                    <option value="RENT">Rent</option>
                    <option value="SALE">Sale</option>
                  </select>
                </FormField>
                <FormField label="Location *">
                  <input type="text" value={editingProperty.location}
                    onChange={(e) => handleEditChange("location", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Bedrooms *">
                  <input type="number" min="0" value={editingProperty.bedrooms}
                    onChange={(e) => handleEditChange("bedrooms", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Bathrooms *">
                  <input type="number" min="0" value={editingProperty.bathrooms}
                    onChange={(e) => handleEditChange("bathrooms", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Size (sqft) *">
                  <input type="number" min="0" value={editingProperty.size}
                    onChange={(e) => handleEditChange("size", e.target.value)} className={inputClass}/>
                </FormField>
              </div>

              <FormField label="Description">
                <textarea rows={4} value={editingProperty.description}
                  onChange={(e) => handleEditChange("description", e.target.value)}
                  className={`${inputClass} resize-none`} placeholder="Describe your property..."/>
              </FormField>

              {/* Images */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Images ({(editingProperty.images?.length || 0) + newImages.length})
                </h3>
                <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 cursor-pointer"
                  onDrop={(e) => handleDrop(e, false)} onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById("edit-image-upload").click()}>
                  <input id="edit-image-upload" type="file" multiple accept="image/*"
                    onChange={handleEditImageUpload} className="hidden"/>
                  <Camera className="w-7 h-7 text-gray-400 mx-auto mb-1"/>
                  <p className="text-gray-600 text-sm">Click to upload or drag & drop</p>
                  <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — max 5MB each</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {editingProperty.images?.map((img, i) => (
                    <div key={img.id} className="relative group aspect-square">
                      <img src={imgSrc(img.url)} alt={`Image ${i + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-200"/>
                      <button onClick={() => removeExistingImage(img.id)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3"/>
                      </button>
                    </div>
                  ))}
                  {newImages.map((file, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img src={URL.createObjectURL(file)} alt={`New ${i + 1}`}
                        className="w-full h-full object-cover rounded-lg border-2 border-green-400"/>
                      <button onClick={() => removeNewImage(i)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3"/>
                      </button>
                      <span className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs text-center py-0.5 rounded-b-lg">New</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
              <button onClick={closeEditModal}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                Cancel
              </button>
              <button onClick={handleSaveChanges} disabled={editLoading}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm">
                {editLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <Settings className="w-4 h-4"/>}
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Modal ──────────────────────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add Property</h2>
              <button onClick={closeAddModal} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Title *">
                  <input type="text" value={addProperty.title} placeholder="e.g. Modern 3-Bedroom Apartment"
                    onChange={(e) => handleAddChange("title", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Property Type *">
                  <select value={addProperty.propertyType}
                    onChange={(e) => handleAddChange("propertyType", e.target.value)} className={inputClass}>
                    {PROPERTY_TYPES.filter((t) => t.value).map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Price (FCFA) *">
                  <input type="number" value={addProperty.price} placeholder="e.g. 250000"
                    onChange={(e) => handleAddChange("price", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Purpose *">
                  <select value={addProperty.purpose}
                    onChange={(e) => handleAddChange("purpose", e.target.value)} className={inputClass}>
                    <option value="RENT">Rent</option>
                    <option value="SALE">Sale</option>
                  </select>
                </FormField>
                <FormField label="Status *">
                  <select value={addProperty.status}
                    onChange={(e) => handleAddChange("status", e.target.value)} className={inputClass}>
                    <option value="AVAILABLE">Available</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </FormField>
                <FormField label="Location *">
                  <input type="text" value={addProperty.location} placeholder="e.g. Bastos, Yaoundé"
                    onChange={(e) => handleAddChange("location", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Bedrooms *">
                  <input type="number" min="0" value={addProperty.bedrooms}
                    onChange={(e) => handleAddChange("bedrooms", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Bathrooms *">
                  <input type="number" min="0" value={addProperty.bathrooms}
                    onChange={(e) => handleAddChange("bathrooms", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Size (sqft) *">
                  <input type="number" min="0" value={addProperty.size}
                    onChange={(e) => handleAddChange("size", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Latitude">
                  <input type="number" value={addProperty.latitude} placeholder="e.g. 3.8480"
                    onChange={(e) => handleAddChange("latitude", e.target.value)} className={inputClass}/>
                </FormField>
                <FormField label="Longitude">
                  <input type="number" value={addProperty.longitude} placeholder="e.g. 11.5021"
                    onChange={(e) => handleAddChange("longitude", e.target.value)} className={inputClass}/>
                </FormField>
              </div>

              <FormField label="Description">
                <textarea rows={4} value={addProperty.description}
                  onChange={(e) => handleAddChange("description", e.target.value)}
                  className={`${inputClass} resize-none`} placeholder="Describe your property..."/>
              </FormField>

              {/* Images */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Images ({addProperty.images.length})
                </h3>
                <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 cursor-pointer"
                  onDrop={(e) => handleDrop(e, true)} onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById("add-image-upload").click()}>
                  <input id="add-image-upload" type="file" multiple accept="image/*"
                    onChange={handleAddImageUpload} className="hidden"/>
                  <Camera className="w-7 h-7 text-gray-400 mx-auto mb-1"/>
                  <p className="text-gray-600 text-sm">Click to upload or drag & drop</p>
                  <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — max 5MB each</p>
                </div>
                {addProperty.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {addProperty.images.map((file, i) => (
                      <div key={i} className="relative group aspect-square">
                        <img src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-gray-200"/>
                        <button onClick={() => removeAddImage(i)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-3 h-3"/>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
              <button onClick={closeAddModal}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                Cancel
              </button>
              <button onClick={handleSaveNewProperty} disabled={addLoading}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm">
                {addLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <Plus className="w-4 h-4"/>}
                {addLoading ? "Saving..." : "Save Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProperty;