import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES, REGIONS } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold">News Platform</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted source for breaking news and in-depth coverage from around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map(category => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-semibold mb-4">Regions</h4>
            <ul className="space-y-2">
              {REGIONS.map(region => (
                <li key={region.id}>
                  <Link
                    to={`/news/${region.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {region.flag} {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-semibold mb-4">More</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} News Platform. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ for news readers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
