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

const OwnerProperty = () => {
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
        `http://localhost:3000/properties/owner/`,
        {
          //at backend i need to use req.query not req.params, because this is a query parameter
          params: {
            id: ownerId.id,
          },
        }
      );
      console.log("API response:", response.data);
      const data = response.data.data;
      setProperties(data);
      console.log(properties);
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
      filtered = filtered.filter(
        (property) => property.price <= parseFloat(filters.maxPrice)
      );
    }

    // Room filters
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms >= parseInt(filters.bedrooms)
      );
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(
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
  const handleAddChange = (field, value) => {
    setAddProperty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFieldChange = (field, value) => {
    setCurrentProperty((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    let validFiles = [];
    let hasError = false;

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setMessage({
          type: "error",
          text: `File "${file.name}" is not a valid image file.`,
        });
        hasError = true;
        continue;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: `File "${file.name}" is too large. Please select files under 5MB.`,
        });
        hasError = true;
        continue;
      }
      validFiles.push(file);
    }

    if (hasError) {
      setUploading(false);
      return;
    }

    // Add valid files to the newImages state

    setNewImages((prev) => [...prev, ...validFiles]);

    setUploading(false);
    setMessage({
      type: "success",
      text: `Successfully added ${validFiles.length} new image(s) for upload.`,
    });

    // Reset the input field so the same files can be uploaded again
    event.target.value = "";
  };

  const handleImageUploadAddProperty = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    let validImageObjects = []; // Store objects with id, url, and file
    let hasError = false;

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setMessage({
          type: "error",
          text: `File "${file.name}" is not a valid image file.`,
        });
        hasError = true;
        continue;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: `File "${file.name}" is too large. Please select files under 5MB.`,
        });
        hasError = true;
        continue;
      }

      // Create a unique ID and an object URL for the file
      const uniqueId =
        Date.now().toString() +
        "-" +
        Math.random().toString(36).substring(2, 9); // Simple unique ID
      const imageUrl = URL.createObjectURL(file);

      validImageObjects.push({
        id: uniqueId,
        url: imageUrl,
        file: file, // Keep the original File object for actual upload later
        name: file.name,
      });
    }

    if (hasError) {
      // Clean up any object URLs created for files that were valid before an error stopped the process
      validImageObjects.forEach((imgObj) => URL.revokeObjectURL(imgObj.url));
      setUploading(false);
      return;
    }

    // Add valid image objects to the newImages state
    setAddProperty((prev) => ({
      ...prev, // keep other fields
      images: [...prev.images, ...validImageObjects], // append new image objects
    }));

    setUploading(false);
    setMessage({
      type: "success",
      text: `Successfully added ${validImageObjects.length} new image(s) for upload.`,
    });

    // Reset the input field so the same files can be uploaded again
    event.target.value = "";
  };

  const handleSaveChanges = async () => {
    if (!editingProperty) return;
    console.log("Preparing to save changes for property:", editingProperty);
    // Create a FormData object to send mixed data (text + files)
    const formData = new FormData();

    formData.append("editingProperty", JSON.stringify(editingProperty));
    formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
    // DEBUG: Check the content of newImages array BEFORE appending
    console.log("Content of newImages array BEFORE appending:", newImages);

    // 3. Append the new files under the name "newImages"
    newImages.forEach((image) => {
      formData.append("images", image); // <-- THIS IS THE CORRECT WAY TO APPEND THE FILE
    });

    // DEBUG: Check the FormData content just before sending (THIS IS WHAT I NEED TO SEE!)
    console.log("--- FormData contents before submission ---");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("-----------------------------------------");
    try {
      console.log(
        "New Images to upload:",
        newImages.map((file) => file)
      );
      console.log("Images to remove:", imagesToRemove);
      const response = await axios.put(
        `http://localhost:3000/properties/update/${editingProperty.id}`,
        formData
      );
      const result = await response.data;
      console.log("Property updated successfully:", result);

      toast.success("Property updated successfully!");
      closeEditModal(); // Close the modal on success
    } catch (error) {
      console.error("Failed to update property:", error);
      toast.error("Failed to update property.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    // Create a synthetic event to reuse handleImageUpload logic
    const syntheticEvent = {
      target: { files },
    };
    handleImageUpload(syntheticEvent);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSaveProperty = async () => {
    try {
      // Here you would make an API call to update the property
      // const response = await fetch(`/api/properties/${editingProperty.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editingProperty)
      // });

      // Update local state
      setProperties((prev) =>
        prev.map((p) => (p.id === editingProperty.id ? editingProperty : p))
      );

      closeEditModal();

      // Show success message (you could add a toast notification here)
      alert("Property updated successfully!");
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property. Please try again.");
    }
  };

  // handdle save new property
  const handleSaveNewProperty = async () => {
    const formData = { ...addProperty };
    const user = JSON.parse(sessionStorage.getItem("user"));
    formData.ownerId = user.id;
    try {
      // create FormData to send multipart/form-data
      const submitData = new FormData();

      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("location", formData.location);
      submitData.append("latitude", formData.latitude || "");
      submitData.append("longitude", formData.longitude || "");
      submitData.append("bedrooms", formData.bedrooms);
      submitData.append("bathrooms", formData.bathrooms);
      submitData.append("size", formData.size);
      submitData.append("propertyType", formData.propertyType);
      submitData.append("status", formData.status);
      submitData.append("ownerId", formData.ownerId);

      // Add image files
      console.log("number of images:", formData.images.length);
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          if (image.file) {
            submitData.append("images", image.file);
          }
        });
      }
      console.log("Submitting property:", formData);
      console.log("Submitting FormData:", submitData);
      // Submit to backend
      const response = await axios.post(
        `http://localhost:3000/properties/create`,
        submitData
      );

      if (!response.data.isOk) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = response.data;
      console.log("Property created:", result);
      alert("Property added successfully!");
      // // Update local state with new property
      // setProperties((prev) => [result, ...prev]);
      // closeAddModal();
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  // Remove image from add property
  const removeImage = (imageId) => {
    setAddProperty((prev) => {
      const updatedImages = prev.images.filter((img) => img.id !== imageId);

      // Find the image that was removed to revoke its URL
      const removedImage = prev.images.find((img) => img.id === imageId);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.url); // Revoke the object URL
      }

      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/properties/delete/${propertyId}`
      );

      if (response.data.isOk) {
        toast.success("prpoerty deleted successfully");
      } else {
        toast.error("prpoerty deleted successfully");
      }

      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property. Please try again.");
    }
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
    const [isFavorited, setIsFavorited] = useState(false);
    const [imageError, setImageError] = useState(false);
    const averageRating = getAverageRating(property.reviews);

    const toggleFavorite = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsFavorited(!isFavorited);
      // Add API call to toggle favorite
    };

    const handlePropertyClick = () => {
      // Navigate to property details or open image gallery
      openImageGallery(property);
    };

    const handleEditClick = (e, property) => {
      console.log("Edit clicked for property:", property);
      e.preventDefault();
      e.stopPropagation();
      openEditModal(property);
    };

    const handleDeleteClick = (e, property) => {
      e.preventDefault();
      e.stopPropagation();
      handleDeleteProperty(property.id);
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
                  isFavorited
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}
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
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Trash className="w-4 h-4 inline mr-1" />
                  Delete
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
              onClick={toggleFavorite}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                isFavorited
                  ? "bg-red-500 text-white"
                  : "bg-white/80 text-gray-600 hover:bg-white"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}
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
              onClick={(e) => handleEditClick(e, property)}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Settings className="w-4 h-4 inline mr-1" />
              Edit
            </button>
            <button
              onClick={(e) => handleDeleteClick(e, property)}
              className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              <Trash className="w-4 h-4 inline mr-1" />
              Delete
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
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Browse Properties
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProperties.length} properties found
              </p>
            </div>

            {/* Map Link */}
            <button
              onClick={handleAddModalPop}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Map className="w-4 h-4 mr-2" />
              Add Property
            </button>
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

      {/* Edit Property Modal */}
      {showEditModal && editingProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Property
                </h2>
                <button
                  onClick={closeEditModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={editingProperty.title}
                    onChange={(e) => handleEditChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter property title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    value={editingProperty.propertyType}
                    onChange={(e) =>
                      handleEditChange("propertyType", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={editingProperty.price}
                    onChange={(e) =>
                      handleEditChange("price", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) => handleEditChange("status", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                    <option value="SOLD">Sold</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProperty.bedrooms}
                    onChange={(e) =>
                      handleEditChange(
                        "bedrooms",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProperty.bathrooms}
                    onChange={(e) =>
                      handleEditChange(
                        "bathrooms",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size (sqft) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProperty.size}
                    onChange={(e) =>
                      handleEditChange("size", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={editingProperty.location}
                    onChange={(e) =>
                      handleEditChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose *
                </label>
                <select
                  value={editingProperty.purpose}
                  onChange={(e) => handleEditChange("purpose", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="RENT">RENT</option>
                  <option value="SALE">SALE</option>
                </select>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={editingProperty.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter property description"
                />
              </div>

              {/* Current Images Preview */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Property Images ({editingProperty.images.length})
                </h3>

                {/* Image Upload Area */}
                <div
                  className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">
                    {uploading
                      ? "Uploading images..."
                      : "Click to upload images or drag & drop"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Supported formats: JPG, PNG, WebP (Max 5MB each)
                  </p>
                </div>

                {/* Images Grid */}
                {editingProperty.images || newImages.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Debug: {editingProperty.images.length} images in state
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {editingProperty.images.map((image, index) => {
                        console.log(
                          `Rendering image ${index}:`,
                          image.name,
                          image.url?.substring(0, 50) + "..."
                        );
                        return (
                          <div
                            key={image.id || index}
                            className="relative group"
                          >
                            <img
                              src={`http://localhost:3000${image.url}`}
                              alt={`Property image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                                <button
                                  type="button"
                                  // onClick={() =>
                                  //   openImageGallery &&
                                  //   openImageGallery(addProperty.images, index)
                                  // }
                                  className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-all"
                                  title="View image"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(image.id)}
                                  className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-all"
                                  title="Remove existing image"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            {/* Image name overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 rounded-b-lg truncate">
                              {image.name || `Image ${index + 1}`}
                            </div>
                          </div>
                        );
                      })}

                      {/* New Images */}
                      {newImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-green-500"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                              <button
                                type="button"
                                onClick={() => removeNewImage(index)}
                                className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-all"
                                title="Remove image"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs p-2 rounded-b-lg truncate">
                            New Image
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No images uploaded yet</p>
                    <p className="text-sm">
                      Add some images to showcase your property
                    </p>
                    <p className="text-xs text-gray-400">
                      Debug: {addProperty.images?.length || 0} images in state
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={closeEditModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add Property
                </h2>
                <button
                  onClick={closeAddModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={addProperty.title}
                    onChange={(e) => handleAddChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter property title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    value={addProperty.propertyType}
                    onChange={(e) =>
                      handleAddChange("propertyType", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={addProperty.price}
                    onChange={(e) =>
                      handleAddChange("price", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={addProperty.status}
                    onChange={(e) => handleAddChange("status", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                    <option value="SOLD">Sold</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={addProperty.bedrooms}
                    onChange={(e) =>
                      handleAddChange("bedrooms", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={addProperty.bathrooms}
                    onChange={(e) =>
                      handleAddChange(
                        "bathrooms",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size (sqft) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={addProperty.size}
                    onChange={(e) =>
                      handleAddChange("size", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={addProperty.location}
                    onChange={(e) =>
                      handleAddChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    longitude *
                  </label>
                  <input
                    type="number"
                    value={addProperty.longitude}
                    onChange={(e) =>
                      handleAddChange("longitude", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter logitude"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    latitude *
                  </label>
                  <input
                    type="nunber"
                    value={addProperty.latitude}
                    onChange={(e) =>
                      handleAddChange("latitude", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter latitude"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose *
                </label>
                <select
                  value={addProperty.purpose}
                  onChange={(e) => handleAddChange("pupose", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="RENT">RENT</option>
                  <option value="SALE">SALE</option>
                </select>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={addProperty.description}
                  onChange={(e) =>
                    handleAddChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter property description"
                />
              </div>

              {/* Current Images Preview */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Property Images ({addProperty.images.length})
                </h3>

                {/* Image Upload Area */}
                <div
                  className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUploadAddProperty}
                    className="hidden"
                  />
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">
                    {uploading
                      ? "Uploading images..."
                      : "Click to upload images or drag & drop"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Supported formats: JPG, PNG, WebP (Max 5MB each)
                  </p>
                </div>

                {/* Images Grid */}
                {addProperty.images && addProperty.images.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Debug: {addProperty.images.length} images in state
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {addProperty.images.map((image, index) => {
                        console.log(
                          `Rendering image ${index}:`,
                          image.name,
                          image.url?.substring(0, 50) + "..."
                        );
                        return (
                          <div
                            key={image.id || index}
                            className="relative group"
                          >
                            <img
                              src={image.url}
                              alt={`Property image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              onLoad={() =>
                                console.log(
                                  `Image ${index} loaded successfully`
                                )
                              }
                              onError={(e) => {
                                console.error(
                                  `Image ${index} failed to load:`,
                                  e
                                );
                                console.log(
                                  "Image URL:",
                                  image.url?.substring(0, 100)
                                );
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                                <button
                                  type="button"
                                  // onClick={() =>
                                  //   openImageGallery &&
                                  //   openImageGallery(addProperty.images, index)
                                  // }
                                  className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-all"
                                  title="View image"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeImage(image.id)}
                                  className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-all"
                                  title="Remove image"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            {/* Image name overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 rounded-b-lg truncate">
                              {image.name || `Image ${index + 1}`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Camera className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No images uploaded yet</p>
                    <p className="text-sm">
                      Add some images to showcase your property
                    </p>
                    <p className="text-xs text-gray-400">
                      Debug: {addProperty.images?.length || 0} images in state
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Required fields
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={closeAddModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNewProperty}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Save Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProperty;
