import { useLocalStorage } from './useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export function useBookmark() {
  const [isBookmarked, setIsBookmarked] = useLocalStorage('isBookmarked', false);
  const { toast } = useToast();

  const addBookmark = () => {
    // Attempt to add bookmark programmatically (limited browser support)
    if ((window as any).sidebar && (window as any).sidebar.addPanel) {
      // Firefox
      (window as any).sidebar.addPanel('SmartFinance Pro', window.location.href, '');
      setIsBookmarked(true);
      toast({
        title: "Bookmarked!",
        description: "SmartFinance Pro has been added to your bookmarks.",
      });
    } else if (window.external && ('AddFavorite' in window.external)) {
      // IE (legacy)
      (window.external as any).AddFavorite(window.location.href, 'SmartFinance Pro');
      setIsBookmarked(true);
      toast({
        title: "Bookmarked!",
        description: "SmartFinance Pro has been added to your favorites.",
      });
    } else {
      // Other browsers - show instruction
      toast({
        title: "Bookmark this page",
        description: "Press Ctrl+D (Windows) or Cmd+D (Mac) to bookmark SmartFinance Pro for quick access to our financial tools.",
      });
      setIsBookmarked(true);
    }
  };

  return { isBookmarked, addBookmark };
}
