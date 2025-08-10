import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

interface Guide {
  icon: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const guides: Guide[] = [
  {
    icon: "📊",
    category: "Investment Guide",
    readTime: "5 min read",
    title: "How to Build a $1M Investment Portfolio by Age 50",
    description: "Learn proven strategies for long-term wealth building through smart investment choices and compound growth.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Professional financial planning meeting"
  },
  {
    icon: "🏠",
    category: "Mortgage Guide",
    readTime: "7 min read",
    title: "Mortgage Rate Comparison: Save $50K+ Over 30 Years",
    description: "Compare mortgage options and discover how a small rate difference can save tens of thousands in interest.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Financial calculator and planning documents"
  },
  {
    icon: "💳",
    category: "Debt Management",
    readTime: "6 min read",
    title: "Pay Off Credit Card Debt 3X Faster: Proven Methods",
    description: "Strategic debt payoff methods including avalanche and snowball techniques to eliminate debt quickly.",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Money and calculator representing savings planning"
  },
  {
    icon: "🎯",
    category: "Retirement",
    readTime: "8 min read",
    title: "Retirement Planning: How Much You Really Need by Age",
    description: "Age-based retirement savings benchmarks and strategies to ensure a comfortable retirement lifestyle.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    imageAlt: "Peaceful beach sunset representing retirement planning"
  }
];

export default function FinancialGuides() {
  const handleGuideClick = (title: string) => {
    trackEvent('guide_click', 'content', title.toLowerCase().replace(/\s+/g, '_'));
  };

  return (
    <section id="guides" className="mb-16" data-testid="financial-guides-section">
      <h2 className="text-3xl font-bold mb-8">Expert Financial Guides</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {guides.map((guide, index) => (
          <Card 
            key={index}
            className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleGuideClick(guide.title)}
            data-testid={`card-guide-${index}`}
          >
            <img 
              src={guide.imageUrl} 
              alt={guide.imageAlt}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <span>{guide.icon}</span>
                <span data-testid={`guide-category-${index}`}>{guide.category}</span>
                <span>•</span>
                <span data-testid={`guide-read-time-${index}`}>{guide.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" data-testid={`guide-title-${index}`}>
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid={`guide-description-${index}`}>
                {guide.description}
              </p>
              <button 
                className="text-blue-600 hover:text-blue-700 font-medium"
                data-testid={`button-read-guide-${index}`}
              >
                Read Guide →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
