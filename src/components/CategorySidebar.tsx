import { Link, useLocation } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CategoryId, RegionId, getRegionName, getRegionFlag } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion: RegionId;
  onCategorySelect: (category: CategoryId) => void;
}

export const CategorySidebar = ({
  isOpen,
  onClose,
  selectedRegion,
  onCategorySelect,
}: CategorySidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-card border-r shadow-2xl",
          "transition-transform duration-500 ease-out",
          "lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getRegionFlag(selectedRegion)}</span>
              <div>
                <h2 className="font-serif text-lg font-bold">{getRegionName(selectedRegion)}</h2>
                <p className="text-xs text-muted-foreground">Select a category</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 lg:hidden liquid-button"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Category List */}
          <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            <div className="px-3 space-y-1">
              {CATEGORIES.map((category, index) => {
                const isActive = location.search.includes(`category=${category.id}`);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className={cn(
                      "sidebar-item w-full flex items-center justify-between px-4 py-3 rounded-xl",
                      "text-left font-medium transition-all duration-300",
                      "hover:bg-primary/5 hover:text-primary hover:translate-x-1",
                      "group",
                      isActive 
                        ? "bg-primary/10 text-primary border-l-4 border-primary" 
                        : "text-foreground/80"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <span>{category.name}</span>
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 opacity-0 -translate-x-2 transition-all duration-200",
                        "group-hover:opacity-100 group-hover:translate-x-0",
                        isActive && "opacity-100 translate-x-0 text-primary"
                      )} 
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t bg-muted/30">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-all duration-200 liquid-button"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
