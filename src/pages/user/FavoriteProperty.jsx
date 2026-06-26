// src/pages/user/FavoriteProperty.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Heart, MapPin, Star, X, ChevronLeft,
  ChevronRight, MessageCircle, Search,
} from "lucide-react";
import api from "../../helpers/axios";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

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
    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
  </svg>
);

const BASE    = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000";
const imgSrc  = (url) => (url?.startsWith("http") ? url : `${BASE}${url}`);
const fmtPrice = (p) => new Intl.NumberFormat("en-US").format(p) + " FCFA";

const getAvgRating = (reviews) => {
  if (!reviews?.length) return 0;
  return (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
};

const getStatusColor = (status) => ({
  AVAILABLE: "bg-green-100 text-green-800 border-green-200",
  RENTED:    "bg-yellow-100 text-yellow-800 border-yellow-200",
  SOLD:      "bg-red-100 text-red-800 border-red-200",
}[status] || "bg-gray-100 text-gray-800 border-gray-200");

// ─── Favorite Card ────────────────────────────────────────────────────────────
const FavoriteCard = ({ favorite, onRemove, onGallery, onChat }) => {
  const [imgError, setImgError] = useState(false);
  const [removing, setRemoving] = useState(false);
  const property = favorite.property;
  const firstImg = property.images?.[0];
  const avgRating = getAvgRating(property.reviews);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(property.id);
    setRemoving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onGallery(property)}>
        {imgError || !firstImg
          ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
              <Home className="w-10 h-10 text-gray-400 mb-2"/>
              <p className="text-gray-500 text-sm">{property.propertyType}</p>
            </div>
          )
          : (
            <img src={imgSrc(firstImg.url)} alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)} loading="lazy"/>
          )
        }

        {/* Remove from favorites */}
        <button
          onClick={(e) => { e.stopPropagation(); handleRemove(); }}
          disabled={removing}
          className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
          title="Remove from favorites"
        >
          <Heart className="w-4 h-4 fill-current"/>
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

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1">{property.title}</h3>
          <p className="text-base font-bold text-blue-600 ml-2 whitespace-nowrap">{fmtPrice(property.price)}</p>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 shrink-0"/>
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 text-sm mb-3">
          <span className="flex items-center gap-1"><BedIcon className="w-4 h-4"/>{property.bedrooms}</span>
          <span className="flex items-center gap-1"><BathIcon className="w-4 h-4"/>{property.bathrooms}</span>
          <span className="flex items-center gap-1"><SquareIcon className="w-4 h-4"/>{property.size?.toLocaleString()}</span>
          {avgRating > 0 && (
            <span className="flex items-center gap-1 ml-auto">
              <Star className="w-3 h-3 text-yellow-400 fill-current"/>{avgRating}
            </span>
          )}
        </div>

        {/* Owner info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Listed by</p>
            <p className="text-sm font-medium text-gray-800">{property.owner?.name}</p>
          </div>
          <button
            onClick={() => onChat(property.owner?.id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4"/>Chat
          </button>
        </div>

        {/* Saved on date */}
        <p className="text-xs text-gray-400 mt-2">
          Saved {new Date(favorite.createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const FavoriteProperty = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [searchQuery, setSearch]  = useState("");
  const [gallery, setGallery]     = useState({ open: false, property: null, index: 0 });
  const [currentPage, setPage]    = useState(1);
  const ITEMS_PER_PAGE            = 12;

  // ─── Fetch ─────────────────────────────────────────────────────────────────
  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/favorites");
      setFavorites(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch favorites. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFavorites(); }, [fetchFavorites]);

  // ─── Remove favorite ────────────────────────────────────────────────────────
  const handleRemove = async (propertyId) => {
    try {
      await api.post("/favorites", { propertyId });
      setFavorites((prev) => prev.filter((f) => f.property.id !== propertyId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove favorite");
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

  // ─── Filter ────────────────────────────────────────────────────────────────
  const filtered = favorites.filter((f) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const p = f.property;
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.propertyType.toLowerCase().includes(q)
    );
  });

  const totalPages        = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentFavorites  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // ─── Render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"/>
        <p className="text-gray-600">Loading favorites...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-gray-800 text-lg mb-2">Something went wrong</p>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={fetchFavorites} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 fill-current"/>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Saved Properties</h1>
              <p className="text-gray-500 text-sm mt-0.5">{favorites.length} saved properties</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Search ───────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
            <input type="text" placeholder="Search your saved properties..."
              value={searchQuery} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
          </div>
        </div>

        {/* ── Empty state ───────────────────────────────────────────────────── */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-300"/>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved properties yet</h3>
            <p className="text-gray-500 mb-6">Browse properties and tap the heart to save ones you like</p>
            <button onClick={() => navigate("/user/home")}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Browse Properties
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-4">Try a different search term</p>
            <button onClick={() => setSearch("")}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentFavorites.map((fav) => (
                <FavoriteCard
                  key={fav.id}
                  favorite={fav}
                  onRemove={handleRemove}
                  onGallery={openGallery}
                  onChat={handleChat}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm">
                  <ChevronLeft className="w-4 h-4"/>Prev
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = totalPages <= 5 ? i + 1
                    : currentPage <= 3 ? i + 1
                    : currentPage >= totalPages - 2 ? totalPages - 4 + i
                    : currentPage - 2 + i;
                  return (
                    <button key={page} onClick={() => setPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        currentPage === page ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}>
                      {page}
                    </button>
                  );
                })}
                <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
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
              <p className="font-bold text-blue-300">{fmtPrice(gallery.property.price)}</p>
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

export default FavoriteProperty;