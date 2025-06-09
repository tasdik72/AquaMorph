
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Waves, Rocket } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const activeSection = useActiveSection([
    'home',
    'features',
    'how-it-works',
    'impact',
    'demo',
    'about',
    'contact'
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      setIsAtTop(window.scrollY < 100);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  type NavItem = {
    name: string;
    href: string;
    type: 'section' | 'page' | 'home';
  };

  // Get current path to determine active page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isHomePage = currentPath === '/';
  
  const navigation: NavItem[] = [
    { name: 'Home', href: 'home', type: 'home' },
    { name: 'Features', href: 'features', type: 'section' },
    { name: 'How It Works', href: 'how-it-works', type: 'section' },
    { name: 'Impact', href: 'impact', type: 'section' },
    { name: 'Demo', href: 'demo', type: 'section' },
    { name: 'About', href: 'about', type: 'page' },
    { name: 'Contact', href: 'contact', type: 'page' }
  ] as const;
  
  // Determine active section based on route and current path
  const getActiveSection = () => {
    // If we're not on the home page
    if (!isHomePage) {
      // Get the current page from the path
      const currentPage = currentPath.split('/')[1];
      if (!currentPage) return null;
      
      // Check if it's a page that should be in the navigation
      const navItem = navigation.find(item => item.href === currentPage);
      
      // Only return the section if it's a page type navigation item
      return navItem?.type === 'page' ? currentPage : null;
    }
    
    // On home page, use the active section from scroll
    // Only return it if it's not 'home' (we handle 'home' separately)
    return activeSection === 'home' ? null : activeSection;
  };
  
  const currentActiveSection = getActiveSection();

  // Generate proper href for navigation items
  const getHref = (item: NavItem) => {
    if (item.type === 'home') return '/';
    if (item.type === 'page') return `/${item.href}`;
    return `/#${item.href}`;
  };

  // Handle click for mobile menu and smooth scrolling
  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    // Don't handle if it's a middle/right click or with modifier keys (let browser handle it)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      return;
    }

    e.preventDefault();
    
    // For home, always navigate to the home page
    if (item.type === 'home') {
      window.location.href = '/';
      return;
    }
    
    // For other pages, navigate directly
    if (item.type === 'page') {
      window.location.href = `/${item.href}`;
      setIsMobileMenuOpen(false);
      return;
    }
    
    // For sections (including demo)
    const element = document.getElementById(item.href);
    if (element) {
      if (window.location.pathname !== '/') {
        // If not on home page, navigate to home page with section hash
        window.location.href = `/#${item.href}`;
      } else {
        // On home page, scroll to section
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', `#${item.href}`);
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Map section IDs to display names
  const getSectionName = (id: string) => {
    const sectionMap: Record<string, string> = {
      'home': 'Home',
      'features': 'Features',
      'how-it-works': 'How It Works',
      'impact': 'Impact',
      'demo': 'Demo',
      'about': 'About',
      'contact': 'Contact'
    };
    return sectionMap[id] || id;
  };

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
          >
            {/* Water Droplet Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center -mt-1">
              <img 
                src="/aquamorph-logo.svg" 
                alt="AquaMorph Logo" 
                className="w-full h-full"
                width="48"
                height="48"
              />
            </div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text group-hover:opacity-80 transition-all duration-300">
              AquaMorph
            </h1>
          </a>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={getHref(item)}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`transition-colors duration-300 font-medium relative group text-sm xl:text-base whitespace-nowrap ${
                    (currentActiveSection === item.href || 
                    (item.href === 'home' && isAtTop && isHomePage))
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-secondary-cyan transition-all duration-300 ${
                      (currentActiveSection === item.href || 
                      (item.href === 'home' && isAtTop && isHomePage))
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </a>
              ))}
            </div>
          </nav>

          {/* Desktop Get Started Button - Hidden on mobile */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Button 
              className="water-button text-sm xl:text-base px-4 xl:px-6 py-2 xl:py-3"
              onClick={() => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/#get-started';
                } else {
                  const getStartedSection = document.getElementById('get-started');
                  if (getStartedSection) {
                    getStartedSection.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState({}, '', '#get-started');
                  }
                }
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-white p-2 rounded-md transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-white/10"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-50 flex justify-end"
            onClick={(e) => e.target === e.currentTarget && setIsMobileMenuOpen(false)}
          >
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-4/5 sm:w-96 h-full bg-gradient-to-b from-bg-dark to-bg-card border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02]" />
              <div className="relative h-full flex flex-col overflow-y-auto custom-scrollbar">
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-gray-300 hover:text-white z-10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="p-6 pb-4">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Waves className="w-5 h-5 mr-2" />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Navigation
                    </span>
                  </h2>
                  <nav className="space-y-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={getHref(item)}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center ${
                          (currentActiveSection === item.href || 
                          (item.href === 'home' && isAtTop && isHomePage))
                            ? 'bg-white/5 pl-6 text-white font-medium'
                            : 'hover:bg-white/5 hover:pl-6 text-text-secondary hover:text-white'
                        }`}
                      >
                        <span 
                          className={`w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3 transition-opacity duration-300 ${
                            (currentActiveSection === item.href || 
                            (item.href === 'home' && isAtTop && isHomePage)) 
                              ? 'opacity-100' 
                              : 'opacity-0 group-hover:opacity-100'
                          }`} 
                        />
                        <span className="transition-all duration-300">
                          {item.name}
                        </span>
                        <span 
                          className="ml-auto text-cyan-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                
                <div className="mt-auto p-6 pt-4 border-t border-white/10">
                  <div className="mt-4 text-center text-xs text-text-secondary">
                    <p>AquaMorph © {new Date().getFullYear()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
    

    
    {/* Add padding to the top of the page content equal to the header height */}
    <style dangerouslySetInnerHTML={{
      __html: `
        :root {
          --header-height: 3.5rem; /* h-14 */
        }
        @media (min-width: 640px) {
          :root {
            --header-height: 4rem; /* sm:h-16 */
          }
        }
        @media (min-width: 1024px) {
          :root {
            --header-height: 5rem; /* lg:h-20 */
          }
        }
        body {
          padding-top: var(--header-height);
        }
      `
    }} />
    </>
  );
};

export default Header;
