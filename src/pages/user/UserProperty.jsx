// src/pages/user/UserProperty.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Home, Building2, Search, Heart, MapPin, Phone,
  Star, X, ChevronLeft, ChevronRight, MessageCircle,
  SlidersHorizontal, LayoutGrid, List, Map,
} from "lucide-react";
import api from "../../helpers/axios";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
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

const EMPTY_FILTERS = {
  minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "",
  propertyType: "", status: "AVAILABLE", minSize: "", maxSize: "", location: "",
};

const BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000";
const imgSrc = (url) => (url?.startsWith("http") ? url : `${BASE}${url}`);

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: 0 }).format(price) + " FCFA";

const getAverageRating = (reviews) => {
  if (!reviews?.length) return 0;
  return (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
};

const getStatusColor = (status) => ({
  AVAILABLE: "bg-green-100 text-green-800 border-green-200",
  RENTED: "bg-yellow-100 text-yellow-800 border-yellow-200",
  SOLD: "bg-red-100 text-red-800 border-red-200",
  UNDER_MAINTENANCE: "bg-gray-100 text-gray-800 border-gray-200",
}[status] || "bg-gray-100 text-gray-800 border-gray-200");

// ─── Property Card ────────────────────────────────────────────────────────────
const PropertyCard = ({ property, currentUserId, onGallery, onToggleFavorite, onChat, isListView }) => {
  const [imgError, setImgError] = useState(false);
  const avgRating = getAverageRating(property.reviews);
  const firstImage = property.images?.[0];
  const isFavorited = property.favorites?.some((f) => f.userId === currentUserId);

  const Fallback = () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
      <Home className="w-12 h-12 text-gray-400 mb-2"/>
      <p className="text-gray-500 text-sm">{property.propertyType}</p>
    </div>
  );

  const ImageSection = ({ height = "h-56" }) => (
    <div className={`relative ${height} overflow-hidden cursor-pointer`} onClick={() => onGallery(property)}>
      {imgError || !firstImage
        ? <Fallback />
        : <img src={imgSrc(firstImage.url)} alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)} loading="lazy"/>
      }
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
          isFavorited ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 hover:bg-white"
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}/>
      </button>
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
  );

  if (isListView) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex">
        <div className="w-72 flex-shrink-0">
          <ImageSection height="h-full"/>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
              <p className="text-xl font-bold text-blue-600 ml-2 whitespace-nowrap">{formatPrice(property.price)}</p>
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1"/>{property.location}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{property.description}</p>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1"><BedIcon className="w-4 h-4"/>{property.bedrooms} bed</span>
              <span className="flex items-center gap-1"><BathIcon className="w-4 h-4"/>{property.bathrooms} bath</span>
              <span className="flex items-center gap-1"><SquareIcon className="w-4 h-4"/>{property.size?.toLocaleString()} sqft</span>
              {avgRating > 0 && <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current"/>{avgRating}</span>}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="font-medium">{property.owner?.name}</span>
              {property.owner?.phone && (
                <span className="flex items-center gap-1"><Phone className="w-4 h-4"/>{property.owner.phone}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onChat(property.owner?.id)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                <MessageCircle className="w-4 h-4"/>Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <ImageSection/>
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
          {avgRating > 0 && <span className="flex items-center gap-1 ml-auto"><Star className="w-3 h-3 text-yellow-400 fill-current"/>{avgRating}</span>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onChat(property.owner?.id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <MessageCircle className="w-4 h-4"/>Chat
          </button>
          <button onClick={() => onGallery(property)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Map className="w-4 h-4"/>View
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const UserProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [properties, setProperties]                 = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading]                       = useState(true);
  const [error, setError]                           = useState(null);
  const [viewMode, setViewMode]                     = useState("grid");
  const [searchQuery, setSearchQuery]               = useState("");
  const [showFilters, setShowFilters]               = useState(false);
  const [filters, setFilters]                       = useState(EMPTY_FILTERS);
  const [currentPage, setCurrentPage]               = useState(1);
  const [gallery, setGallery]                       = useState({ open: false, property: null, index: 0 });
  const ITEMS_PER_PAGE                              = 12;

  // ─── Fetch ─────────────────────────────────────────────────────────────────
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/properties");
      setProperties(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch properties. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  // ─── Filters ───────────────────────────────────────────────────────────────
  const applyFilters = useCallback(() => {
    let f = [...properties];
    const q = searchQuery.toLowerCase().trim();

    if (q) f = f.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.propertyType.toLowerCase().includes(q)
    );

    if (filters.minPrice)    f = f.filter((p) => p.price >= parseFloat(filters.minPrice));
    if (filters.maxPrice)    f = f.filter((p) => p.price <= parseFloat(filters.maxPrice));
    if (filters.bedrooms)    f = f.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.bathrooms)   f = f.filter((p) => p.bathrooms >= parseInt(filters.bathrooms));
    if (filters.propertyType) f = f.filter((p) => p.propertyType === filters.propertyType);
    if (filters.status)      f = f.filter((p) => p.status === filters.status);
    if (filters.minSize)     f = f.filter((p) => p.size >= parseFloat(filters.minSize));
    if (filters.maxSize)     f = f.filter((p) => p.size <= parseFloat(filters.maxSize));
    if (filters.location.trim()) f = f.filter((p) =>
      p.location.toLowerCase().includes(filters.location.toLowerCase())
    );

    setFilteredProperties(f);
    setCurrentPage(1);
  }, [properties, searchQuery, filters]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const clearFilters = () => { setFilters(EMPTY_FILTERS); setSearchQuery(""); };

  // ─── Favorite toggle ────────────────────────────────────────────────────────
  const handleToggleFavorite = async (propertyId) => {
    try {
      const res = await api.post("/favorites", { propertyId });
      const { favorited } = res.data.data;
      toast.success(favorited ? "Added to favorites" : "Removed from favorites");

      // Optimistic update — toggle locally without refetch
      setProperties((prev) => prev.map((p) => {
        if (p.id !== propertyId) return p;
        const favorites = favorited
          ? [...(p.favorites || []), { userId: user.id }]
          : (p.favorites || []).filter((f) => f.userId !== user.id);
        return { ...p, favorites };
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update favorite");
    }
  };

  // ─── Chat ──────────────────────────────────────────────────────────────────
  const handleChat = (ownerId) => {
    if (!ownerId) return;
    navigate(`/user/messages/${ownerId}`);
  };

  // ─── Gallery ───────────────────────────────────────────────────────────────
  const openGallery  = (property, index = 0) => setGallery({ open: true, property, index });
  const closeGallery = () => setGallery({ open: false, property: null, index: 0 });
  const nextImg = () => setGallery((g) => ({ ...g, index: (g.index + 1) % g.property.images.length }));
  const prevImg = () => setGallery((g) => ({ ...g, index: g.index === 0 ? g.property.images.length - 1 : g.index - 1 }));

  // ─── Pagination ────────────────────────────────────────────────────────────
  const totalPages        = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";

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
        <p className="text-4xl mb-4">⚠️</p>
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

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Browse Properties</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredProperties.length} properties available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Search + Filters ──────────────────────────────────────────────── */}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Min" value={filters.minPrice}
                      onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))} className={inputClass}/>
                    <input type="number" placeholder="Max" value={filters.maxPrice}
                      onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))} className={inputClass}/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select value={filters.propertyType}
                    onChange={(e) => setFilters((p) => ({ ...p, propertyType: e.target.value }))} className={inputClass}>
                    {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <select value={filters.purpose || ""}
                    onChange={(e) => setFilters((p) => ({ ...p, purpose: e.target.value }))} className={inputClass}>
                    <option value="">All</option>
                    <option value="RENT">Rent</option>
                    <option value="SALE">Sale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Bedrooms</label>
                  <select value={filters.bedrooms}
                    onChange={(e) => setFilters((p) => ({ ...p, bedrooms: e.target.value }))} className={inputClass}>
                    <option value="">Any</option>
                    {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Bathrooms</label>
                  <select value={filters.bathrooms}
                    onChange={(e) => setFilters((p) => ({ ...p, bathrooms: e.target.value }))} className={inputClass}>
                    <option value="">Any</option>
                    {[1,2,3,4].map((n) => <option key={n} value={n}>{n}+</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" placeholder="Enter location..." value={filters.location}
                    onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))} className={inputClass}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size (sqft)</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Min" value={filters.minSize}
                      onChange={(e) => setFilters((p) => ({ ...p, minSize: e.target.value }))} className={inputClass}/>
                    <input type="number" placeholder="Max" value={filters.maxSize}
                      onChange={(e) => setFilters((p) => ({ ...p, maxSize: e.target.value }))} className={inputClass}/>
                  </div>
                </div>
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
            <p className="text-5xl mb-4">🏠</p>
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
                <PropertyCard
                  key={property.id}
                  property={property}
                  currentUserId={user?.id}
                  isListView={viewMode === "list"}
                  onGallery={openGallery}
                  onToggleFavorite={handleToggleFavorite}
                  onChat={handleChat}
                />
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

      {/* ── Gallery Modal ─────────────────────────────────────────────────────── */}
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
            <div className="absolute bottom-16 left-4 bg-black/60 text-white p-3 rounded-lg max-w-xs">
              <h3 className="font-semibold mb-1">{gallery.property.title}</h3>
              <p className="text-sm opacity-80 mb-1">{gallery.property.location}</p>
              <p className="font-bold text-blue-300">{formatPrice(gallery.property.price)}</p>
            </div>
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
    </div>
  );
};

export default UserProperty;