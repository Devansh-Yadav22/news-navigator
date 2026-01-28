import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { REGIONS, CATEGORIES, RegionId } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface HeaderProps {
  selectedRegion: RegionId;
  onRegionChange: (region: RegionId) => void;
}

export const Header = ({ selectedRegion, onRegionChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentRegion = REGIONS.find(r => r.id === selectedRegion);

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">News Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.slice(0, 6).map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={cn(
                  "nav-link px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  location.pathname === `/category/${category.id}` && "active text-foreground"
                )}
              >
                {category.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="nav-link px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                {CATEGORIES.slice(6).map(category => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/category/${category.id}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Region Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="text-lg">{currentRegion?.flag}</span>
                  <span className="hidden sm:inline text-sm">{currentRegion?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                {REGIONS.map(region => (
                  <DropdownMenuItem
                    key={region.id}
                    onClick={() => onRegionChange(region.id)}
                    className={cn(
                      "gap-2 cursor-pointer",
                      selectedRegion === region.id && "bg-accent"
                    )}
                  >
                    <span className="text-lg">{region.flag}</span>
                    <span>{region.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
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
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {CATEGORIES.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent transition-colors",
                  location.pathname === `/category/${category.id}` && "bg-accent text-primary"
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
