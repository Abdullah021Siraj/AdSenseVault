import { Button } from "@/components/ui/button";
import BookmarkButton from "@/components/ui/BookmarkButton";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const handleNavClick = (section: string) => {
    trackEvent('navigation', 'header', section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600" data-testid="logo">
              💰 SmartFinance Pro
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => handleNavClick('calculators')}
              className="text-gray-700 hover:text-blue-600 font-medium"
              data-testid="nav-calculators"
            >
              Calculators
            </button>
            <button 
              onClick={() => handleNavClick('compare')}
              className="text-gray-700 hover:text-blue-600 font-medium"
              data-testid="nav-compare"
            >
              Compare
            </button>
            <button 
              onClick={() => handleNavClick('guides')}
              className="text-gray-700 hover:text-blue-600 font-medium"
              data-testid="nav-guides"
            >
              Guides
            </button>
            <BookmarkButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
