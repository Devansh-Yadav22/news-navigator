import { ExternalLink, Clock, Flame, Zap } from "lucide-react";
import { Article, formatTimeAgo, getRegionFlag, getRegionName } from "@/lib/constants";
import { CategoryBadge } from "./CategoryBadge";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured";
}

export const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "article-card group relative bg-card rounded-lg border overflow-hidden",
        isFeatured ? "md:col-span-2 lg:col-span-2" : ""
      )}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-ring rounded-lg"
      >
        {/* Image Container */}
        {article.imageUrl && (
          <div className={cn(
            "relative overflow-hidden bg-muted",
            isFeatured ? "aspect-[21/9]" : "aspect-video"
          )}>
            <img
              src={article.imageUrl}
              alt=""
              className="article-image w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Freshness Badge */}
            {(article.isBreaking || article.isTrending) && (
              <div className="absolute top-3 left-3">
                {article.isBreaking ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-category-breaking text-white text-xs font-semibold rounded-md animate-pulse-glow">
                    <Zap className="h-3 w-3" />
                    Breaking
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-category-world text-white text-xs font-semibold rounded-md">
                    <Flame className="h-3 w-3" />
                    Trending
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("p-4", isFeatured && "p-5 lg:p-6")}>
          {/* Meta Row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <CategoryBadge category={article.category} size={isFeatured ? "md" : "sm"} />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <span>{getRegionFlag(article.region)}</span>
              <span>{getRegionName(article.region)}</span>
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "article-title font-serif font-bold leading-snug mb-2",
              isFeatured
                ? "text-clamp-hero line-clamp-3"
                : "text-clamp-title line-clamp-2"
            )}
          >
            {article.title}
          </h3>

          {/* Summary */}
          <p
            className={cn(
              "text-muted-foreground leading-relaxed mb-4",
              isFeatured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
            )}
          >
            {article.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="font-medium">{article.source}</span>
              <span>•</span>
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </a>
    </article>
  );
};
