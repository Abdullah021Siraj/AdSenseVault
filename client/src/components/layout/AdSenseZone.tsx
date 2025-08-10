import { cn } from "@/lib/utils";

interface AdSenseZoneProps {
  type: 'banner' | 'rectangle' | 'sidebar' | 'in-article';
  size: string;
  className?: string;
  label?: string;
}

export default function AdSenseZone({ type, size, className, label = "Advertisement" }: AdSenseZoneProps) {
  return (
    <div 
      className={cn("adsense-zone", className)}
      data-testid={`adsense-${type}-${size}`}
    >
      {/* Placeholder for AdSense - Replace with actual AdSense code in production */}
      <div className="text-sm text-gray-500">
        AdSense {type} {size} - {label}
      </div>
      {/* 
        Production AdSense implementation would replace this with:
        <ins className="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
}
