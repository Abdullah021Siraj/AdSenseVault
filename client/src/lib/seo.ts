export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schema?: any;
}

export const defaultSEO: SEOData = {
  title: "SmartFinance Pro - Free Financial Planning Tools & Calculators | Compare Loans, Investments & Insurance",
  description: "Free financial planning tools and calculators. Compare loans, mortgages, investments and insurance rates. Save thousands with our expert financial guidance and comparison tools for 2025.",
  keywords: "financial calculator, loan calculator, mortgage calculator, investment calculator, insurance comparison, financial planning, personal finance, money saving, investment advice, retirement planning",
  canonical: "https://smartfinance-pro.vercel.app",
  ogTitle: "SmartFinance Pro - Free Financial Planning Tools",
  ogDescription: "Free financial calculators and comparison tools. Save thousands on loans, investments, and insurance.",
};

export const generateSchema = (type: 'WebSite' | 'Article' | 'Product', data: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case 'WebSite':
      return {
        ...baseSchema,
        name: "SmartFinance Pro",
        description: "Free financial planning tools and calculators for loans, investments, and insurance",
        url: "https://smartfinance-pro.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://smartfinance-pro.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
    
    case 'Article':
      return {
        ...baseSchema,
        headline: data.title,
        description: data.description,
        author: {
          "@type": "Organization",
          name: "SmartFinance Pro"
        },
        publisher: {
          "@type": "Organization",
          name: "SmartFinance Pro"
        },
        datePublished: data.datePublished || new Date().toISOString(),
        dateModified: data.dateModified || new Date().toISOString(),
      };
    
    default:
      return baseSchema;
  }
};

export const updatePageSEO = (seoData: Partial<SEOData>) => {
  // Update document title
  if (seoData.title) {
    document.title = seoData.title;
  }

  // Update meta description
  if (seoData.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }
  }

  // Update canonical URL
  if (seoData.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoData.canonical);
  }
};
