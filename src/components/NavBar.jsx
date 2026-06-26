// src/components/NavBar.jsx

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Menu, X, Home, Users, Settings, BarChart3, Shield, User,
  LogOut, ChevronDown, Bell, HelpCircle, CreditCard, Database,
  UserPlus, FileText, Moon, Sun, Building2, Heart, Calculator,
  Mail, Calendar, Filter, Star, Building, TrendingUp,
} from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navigationConfig = {
  USER: [
    { name: "Properties",           href: "/user/home",               icon: Home      },
    { name: "Saved Properties",     href: "/user/favorites",          icon: Heart     },
    { name: "Mortgage Calculator",  href: "/user/mortgage-calculator", icon: Calculator },
    { name: "Appointments",         href: "/user/appointments",       icon: Calendar  },
    { name: "Messages",             href: "/user/messages",           icon: Mail      },
  ],
  OWNER: [
    { name: "My Properties",   href: "/owner/my-properties", icon: Building  },
    { name: "Appointments",    href: "/owner/appointments",  icon: Calendar  },
    { name: "Messages",        href: "/owner/messages",      icon: Mail      },
    { name: "Transactions",    href: "/owner/transactions",  icon: CreditCard },
    { name: "Analytics",       href: "/owner/analytics",     icon: BarChart3 },
    { name: "Market Data",     href: "/owner/market-data",   icon: TrendingUp },
    { name: "Reports",         href: "/owner/reports",       icon: FileText  },
  ],
  ADMIN: [
    { name: "Dashboard",       href: "/admin",               icon: Home      },
    { name: "Users",           href: "/admin/users",         icon: Users     },
    { name: "Properties",      href: "/admin/properties",    icon: Building2 },
    { name: "Transactions",    href: "/admin/transactions",  icon: CreditCard },
    { name: "Reports",         href: "/admin/reports",       icon: FileText  },
    { name: "Analytics",       href: "/admin/analytics",     icon: BarChart3 },
    { name: "Settings",        href: "/admin/settings",      icon: Settings  },
  ],
};

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen]   = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen]       = useState(false);
  const [isDarkMode, setIsDarkMode]               = useState(false);
  const [visibleLinks, setVisibleLinks]           = useState([]);
  const [hiddenLinks, setHiddenLinks]             = useState([]);

  const { user, logout }  = useAuth();
  const navigate          = useNavigate();
  const location          = useLocation();
  const navRef            = useRef(null);
  const userDropdownRef   = useRef(null);
  const moreDropdownRef   = useRef(null);
  const mobileMenuRef     = useRef(null);

  const navigationLinks = navigationConfig[user?.role] || navigationConfig.USER;

  const userMenuItems = [
    { name: "View Profile",      href: "/profile",       icon: User,        type: "link"   },
    { name: "Account Settings",  href: "/settings",      icon: Settings,    type: "link"   },
    { name: "Notifications",     href: "/notifications", icon: Bell,        type: "link", badge: "3" },
    { name: "Favorites",         href: "/user/favorites",icon: Heart,       type: "link"   },
    { name: "Reviews",           href: "/reviews",       icon: Star,        type: "link"   },
    { name: "Help & Support",    href: "/help",          icon: HelpCircle,  type: "link"   },
    { type: "divider" },
    { name: "Sign Out",          icon: LogOut,           action: "logout",  type: "action" },
  ];

  // ─── Responsive link calculation ─────────────────────────────────────────────
  const calculateVisibleLinks = useCallback(() => {
    if (window.innerWidth < 768) {
      setVisibleLinks([]);
      setHiddenLinks(navigationLinks);
      return;
    }

    let maxLinks;
    if (window.innerWidth >= 1536)      maxLinks = 7;
    else if (window.innerWidth >= 1280) maxLinks = 6;
    else if (window.innerWidth >= 1024) maxLinks = 4;
    else                                maxLinks = 3;

    if (maxLinks >= navigationLinks.length) {
      setVisibleLinks(navigationLinks);
      setHiddenLinks([]);
    } else {
      setVisibleLinks(navigationLinks.slice(0, maxLinks));
      setHiddenLinks(navigationLinks.slice(maxLinks));
    }
  }, [navigationLinks]);

  useEffect(() => {
    calculateVisibleLinks();
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calculateVisibleLinks();
        if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
      }, 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
    };
  }, [calculateVisibleLinks]);

  // ─── Close dropdowns on outside click ────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target))
        setIsUserDropdownOpen(false);
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target))
        setIsMoreMenuOpen(false);
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest("[data-mobile-menu-button]")
      )
        setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href) => location.pathname === href ||
    (href !== "/admin" && location.pathname.startsWith(href));

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleUserMenuClick = (item) => {
    if (item.action === "logout") {
      logout();
    } else if (item.href) {
      navigate(item.href);
    }
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      ADMIN: "bg-red-100 text-red-800 border-red-200",
      OWNER: "bg-orange-100 text-orange-800 border-orange-200",
      USER:  "bg-green-100 text-green-800 border-green-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const avatarUrl = user?.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=ffffff`;

  const linkClass = (href) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
      isActive(href)
        ? "bg-blue-600 text-white shadow-sm"
        : isDarkMode
        ? "text-gray-300 hover:text-white hover:bg-gray-800"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`;

  return (
    <nav className={`border-b shadow-sm sticky top-0 z-50 transition-colors duration-200 ${
      isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* ── Left: Logo + Nav ─────────────────────────────────────────── */}
          <div className="flex items-center flex-1 min-w-0">

            {/* Mobile menu button */}
            <button
              data-mobile-menu-button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg mr-3 transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link
              to={user?.role === "ADMIN" ? "/admin" : user?.role === "OWNER" ? "/owner" : "/user"}
              className="flex-shrink-0 flex items-center mr-6"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold hidden sm:block ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                MboaEstate
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 flex-1" ref={navRef}>
              {visibleLinks.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  onClick={handleNavClick}
                  className={linkClass(item.href)}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* More dropdown */}
              {hiddenLinks.length > 0 && (
                <div className="relative" ref={moreDropdownRef}>
                  <button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isMoreMenuOpen
                        ? isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                        : isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <span>More</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isMoreMenuOpen && (
                    <div className={`absolute left-0 mt-2 w-56 rounded-xl shadow-lg ring-1 ring-black/5 z-50 ${
                      isDarkMode ? "bg-gray-800 ring-gray-700" : "bg-white"
                    }`}>
                      <div className="p-2">
                        <p className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          More options
                        </p>
                        {hiddenLinks.map((item) => (
                          <Link
                            to={item.href}
                            key={item.name}
                            onClick={handleNavClick}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                              isActive(item.href)
                                ? "bg-blue-600 text-white"
                                : isDarkMode
                                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Controls + User ────────────────────────────────────── */}
          <div className="flex items-center gap-2 ml-4">

            {/* Notifications */}
            <button className={`p-2 rounded-lg transition-colors duration-200 relative ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                3
              </span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Role badge */}
            <span className={`hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role)}`}>
              <Shield className="w-3 h-3" />
              {user?.role}
            </span>

            {/* User dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`flex items-center gap-2 p-1 rounded-lg transition-all duration-200 ${
                  isUserDropdownOpen
                    ? isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100"
                    : isDarkMode ? "text-gray-300 hover:bg-gray-800" : "hover:bg-gray-50"
                }`}
              >
                <img
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500/20 object-cover"
                  src={avatarUrl}
                  alt={user?.name || "User"}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=ffffff`;
                  }}
                />
                <ChevronDown className={`w-4 h-4 hidden sm:block transition-transform duration-200 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } ${isUserDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isUserDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg ring-1 ring-black/5 z-50 ${
                  isDarkMode ? "bg-gray-800 ring-gray-700" : "bg-white"
                }`}>
                  {/* User info */}
                  <div className={`px-4 py-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <div className="flex items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-full ring-2 ring-blue-500/20 object-cover"
                        src={avatarUrl}
                        alt={user?.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=ffffff`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {user?.name}
                        </p>
                        <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {user?.email}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 border ${getRoleBadgeColor(user?.role)}`}>
                          <Shield className="w-3 h-3" />
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    {userMenuItems.map((item, index) => {
                      if (item.type === "divider") {
                        return (
                          <div key={index} className={`my-2 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`} />
                        );
                      }
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleUserMenuClick(item)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                            item.action === "logout"
                              ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                              : isDarkMode
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`md:hidden border-t ${
            isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
          }`}
        >
          <div className="px-4 py-3 space-y-1">

            {/* User info */}
            <div className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-3 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            }`}>
              <img
                className="w-10 h-10 rounded-full ring-2 ring-blue-500/20 object-cover"
                src={avatarUrl}
                alt={user?.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=2563eb&color=ffffff`;
                }}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {user?.name}
                </p>
                <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {user?.email}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role)}`}>
                <Shield className="w-3 h-3" />
                {user?.role}
              </span>
            </div>

            {/* Navigation */}
            <p className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              Navigation
            </p>
            {navigationLinks.map((item) => (
              <Link
                to={item.href}
                key={item.name}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Account */}
            <div className={`pt-3 border-t space-y-1 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
              <p className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Account
              </p>
              {userMenuItems.map((item, index) => {
                if (item.type === "divider") return null;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleUserMenuClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      item.action === "logout"
                        ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;