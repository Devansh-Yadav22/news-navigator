import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Newspaper, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REGIONS, CATEGORIES, RegionId, CategoryId } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeaderProps {
  onRegionSelect?: (region: RegionId) => void;
  selectedRegion?: RegionId | null;
}

export const Header = ({ onRegionSelect, selectedRegion }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<"regions" | "categories" | null>(null);

  const handleRegionClick = (region: RegionId) => {
    if (onRegionSelect) {
      onRegionSelect(region);
    }
    navigate(`/news/${region}`);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (category: CategoryId) => {
    navigate(`/category/${category}`);
    setMobileMenuOpen(false);
  };

  const mainCategories = CATEGORIES.slice(0, 4); // Politics, Economy, Geopolitics, Security

  // Check if we're on a region page (sidebar should be shown there)
  const isOnRegionPage = location.pathname.startsWith('/news/');

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        {/* Top Bar - Logo and Theme Toggle */}
        <div className="flex h-14 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <Newspaper className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight hidden sm:inline transition-colors duration-200 group-hover:text-primary">
              News Platform
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 liquid-button"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 liquid-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation - Only show when not on region page */}
        {!isOnRegionPage && (
          <nav className="hidden md:block pb-3">
            {/* Region Bar */}
            <div 
              className={cn(
                "flex items-center gap-1 mb-2 transition-all duration-500 ease-out origin-top",
                hoveredSection === "categories" 
                  ? "opacity-0 h-0 mb-0 scale-y-0 pointer-events-none" 
                  : "opacity-100 h-auto scale-y-100"
              )}
              onMouseEnter={() => setHoveredSection("regions")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <span className="text-xs font-medium text-muted-foreground mr-2 uppercase tracking-wider">Regions</span>
              <div className="flex items-center gap-1">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className={cn(
                      "liquid-nav-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "hover:bg-primary/10 hover:text-primary",
                      selectedRegion === region.id || location.pathname === `/news/${region.id}`
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="mr-1.5">{region.flag}</span>
                    {region.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Bar */}
            <div 
              className={cn(
                "flex items-center gap-1 transition-all duration-500 ease-out origin-top",
                hoveredSection === "regions" 
                  ? "opacity-0 h-0 scale-y-0 pointer-events-none" 
                  : "opacity-100 h-auto scale-y-100"
              )}
              onMouseEnter={() => setHoveredSection("categories")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <span className="text-xs font-medium text-muted-foreground mr-2 uppercase tracking-wider">Topics</span>
              <div className="flex items-center gap-1">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={cn(
                      "liquid-nav-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "hover:bg-accent hover:text-accent-foreground",
                      location.pathname === `/category/${category.id}`
                        ? "bg-secondary text-secondary-foreground font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}

        {/* Show only regions when on region page */}
        {isOnRegionPage && (
          <nav className="hidden md:block pb-3">
            <div 
              className="flex items-center gap-1"
              onMouseEnter={() => setHoveredSection("regions")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <span className="text-xs font-medium text-muted-foreground mr-2 uppercase tracking-wider">Regions</span>
              <div className="flex items-center gap-1">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionClick(region.id)}
                    className={cn(
                      "liquid-nav-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      "hover:bg-primary/10 hover:text-primary",
                      location.pathname.includes(`/news/${region.id}`)
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="mr-1.5">{region.flag}</span>
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container py-4 border-t bg-background/95 backdrop-blur">
          {/* Mobile Regions */}
          <div className="mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Regions</span>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region.id)}
                  className={cn(
                    "liquid-nav-item px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    selectedRegion === region.id || location.pathname === `/news/${region.id}`
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <span className="mr-1.5">{region.flag}</span>
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Categories - Only show when not on region page */}
          {!isOnRegionPage && (
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Topics</span>
              <div className="flex flex-wrap gap-2">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={cn(
                      "liquid-nav-item px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                      location.pathname === `/category/${category.id}`
                        ? "bg-secondary text-secondary-foreground font-semibold"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};