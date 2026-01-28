import { Article } from "@/lib/constants";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  showFeatured?: boolean;
}

export const ArticleGrid = ({ articles, showFeatured = false }: ArticleGridProps) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="font-serif text-xl font-bold mb-2">No articles found</h3>
        <p className="text-muted-foreground">
          Try changing your filters or check back later for new stories.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {showFeatured && featured && (
        <ArticleCard article={featured} variant="featured" />
      )}
      {(showFeatured ? rest : articles).map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
