import { CategoryId, getCategoryName, getCategoryColor } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: CategoryId;
  size?: "sm" | "md";
  className?: string;
}

export const CategoryBadge = ({ category, size = "sm", className }: CategoryBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium text-white rounded-full transition-all duration-200",
        getCategoryColor(category),
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        "hover:opacity-90 hover:scale-105",
        className
      )}
    >
      {getCategoryName(category)}
    </span>
  );
};
