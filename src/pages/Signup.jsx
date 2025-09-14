import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength <= 1) return "Very Weak";
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        formData
      );
      if (response.data.isOk) {
        // Handle successful signup (e.g., redirect to login)
        toast.success("Signup successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setAgreedToTerms(false);
      } else {
        // Handle server-side errors
        console.error("Signup failed:", response.data.message);
        toast.error(
          response.data.message || "Signup failed. Please try again."
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-emerald-600 to-teal-600">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-emerald-100">Join us and get started today</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500"
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex space-x-1 flex-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                              level <= passwordStrength
                                ? getStrengthColor(passwordStrength)
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength <= 2
                            ? "text-red-500"
                            : passwordStrength <= 3
                            ? "text-yellow-500"
                            : passwordStrength <= 4
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 focus:border-emerald-500"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <div className="absolute inset-y-0 right-10 flex items-center">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 animate-pulse">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 mt-1"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-sm animate-pulse">
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>
            </div>

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
