import { Flame } from "lucide-react";
import { Article, formatTimeAgo } from "@/lib/constants";
import { CategoryBadge } from "./CategoryBadge";

interface TrendingSectionProps {
  articles: Article[];
}

export const TrendingSection = ({ articles }: TrendingSectionProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="mb-8 lg:mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-category-world" />
        <h2 className="font-serif text-xl font-bold">Trending Now</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
        {articles.map((article, index) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-72 group"
          >
            <div className="bg-card border rounded-lg p-4 h-full hover:border-primary/50 hover:shadow-card transition-all">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-primary/30 font-serif">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <CategoryBadge category={article.category} className="mb-2" />
                  <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {article.source} • {formatTimeAgo(article.publishedAt)}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
