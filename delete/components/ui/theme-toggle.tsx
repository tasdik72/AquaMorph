
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full border border-border-color hover:bg-bg-card transition-all duration-300"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-primary-blue" />
      ) : (
        <Moon className="w-5 h-5 text-primary-blue" />
      )}
    </Button>
  );
};

export default ThemeToggle;
