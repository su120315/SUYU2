import { Moon, Sun, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dusk-500 to-twilight-500 flex items-center justify-center glow-purple">
              <span className="text-white font-bold text-lg">暮</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">暮光工具箱</h1>
              <p className="text-xs text-white/50 hidden sm:block">Dusk Tools</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl dusk-input text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="切换主题"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl dusk-input text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
