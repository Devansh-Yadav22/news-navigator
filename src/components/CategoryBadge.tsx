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
        "inline-flex items-center font-medium text-white rounded-md transition-all",
        getCategoryColor(category),
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        "hover:opacity-90",
        className
      )}
    >
      {getCategoryName(category)}
    </span>
  );
};
