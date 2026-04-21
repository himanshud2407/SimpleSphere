import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the element is near the top of the viewport
          if (rect.top <= offset) {
            currentId = id;
          }
        }
      }
      
      if (currentId) {
        setActiveId(currentId);
      } else if (window.scrollY < offset && sectionIds.length > 0) {
        // If we're at the top of the page, default to the first section
        setActiveId(sectionIds[0]);
      }
    };

    // Attach listener
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}
