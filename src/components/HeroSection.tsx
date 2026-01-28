import { ExternalLink, Clock, Zap } from "lucide-react";
import { Article, formatTimeAgo, getRegionFlag, getRegionName } from "@/lib/constants";
import { CategoryBadge } from "./CategoryBadge";
import { Button } from "./ui/button";

interface HeroSectionProps {
  article: Article;
}

export const HeroSection = ({ article }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden rounded-xl mb-8 lg:mb-12">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={article.imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-10 lg:p-14 min-h-[400px] lg:min-h-[500px] flex flex-col justify-end">
        <div className="max-w-2xl space-y-4 animate-fade-in-up">
          {/* Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            {article.isBreaking && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-category-breaking text-white text-sm font-semibold rounded-md animate-pulse-glow">
                <Zap className="h-4 w-4" />
                Breaking News
              </span>
            )}
            <CategoryBadge category={article.category} size="md" />
            <span className="text-sm text-foreground/80 flex items-center gap-1.5">
              <span className="text-base">{getRegionFlag(article.region)}</span>
              <span>{getRegionName(article.region)}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-clamp-hero font-bold leading-tight text-foreground">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-lg text-foreground/80 leading-relaxed reading-width line-clamp-3">
            {article.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            <Button asChild className="btn-glow gap-2">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read Full Coverage
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <div className="flex items-center gap-3 text-sm text-foreground/70">
              <span className="font-medium">{article.source}</span>
              <span>•</span>
              <span>{formatTimeAgo(article.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
