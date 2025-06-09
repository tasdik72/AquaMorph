import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Set scrolling state
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      // Set a new timeout to detect when scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false);
        
        const scrollPosition = window.scrollY + 100; // Adjust offset based on your header height
        const hash = window.location.hash.replace('#', '');
        
        // If we have a hash in the URL and it's not from scrolling (to prevent race conditions)
        if (hash && !isScrolling && sectionIds.includes(hash)) {
          setActiveSection(hash);
          return;
        }
        
        // If we're at the very top of the page, set active section to 'home' only if we're on the home page
        if (window.location.pathname === '/' && scrollPosition < 150) {
          setActiveSection('home');
          return;
        }
        
        // Find which section is in view
        let foundSection = null;
        for (let i = 0; i < sectionIds.length; i++) {
          const sectionId = sectionIds[i];
          // Skip 'home' in the loop as we handle it separately
          if (sectionId === 'home') continue;
          
          const element = document.getElementById(sectionId);
          if (!element) continue;
          
          const { offsetTop, offsetHeight } = element;
          const sectionBottom = offsetTop + offsetHeight;
          
          // Check if the section is in the viewport
          if (scrollPosition >= offsetTop - 100 && scrollPosition < sectionBottom - 100) {
            foundSection = sectionId;
            break;
          }
        }
        
        // Only update if we found a section and it's different from the current one
        if (foundSection && foundSection !== activeSection) {
          setActiveSection(foundSection);
        } else if (!foundSection && activeSection !== null) {
          // If no section is found and we're not at the top, clear the active section
          setActiveSection(null);
        }
      }, 100);
      
      setScrollTimeout(timeout);
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, activeSection, isScrolling, scrollTimeout]);

  return activeSection;
};
