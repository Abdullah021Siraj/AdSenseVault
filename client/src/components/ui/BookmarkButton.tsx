import { Button } from "@/components/ui/button";
import { useBookmark } from "@/hooks/useBookmark";
import { trackEvent } from "@/lib/analytics";

export default function BookmarkButton() {
  const { isBookmarked, addBookmark } = useBookmark();

  const handleBookmark = () => {
    addBookmark();
    trackEvent('bookmark', 'engagement', 'header_button');
  };

  return (
    <Button
      onClick={handleBookmark}
      className={`bookmark-btn ${isBookmarked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white font-medium`}
      data-testid="button-bookmark"
    >
      {isBookmarked ? '✅ Bookmarked' : '📌 Bookmark Site'}
    </Button>
  );
}
