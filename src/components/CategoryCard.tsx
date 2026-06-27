import * as LucideIcons from 'lucide-react';
import { Category } from '../data/tools';
import { tools } from '../data/tools';

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export default function CategoryCard({ category, isActive, onClick, index }: CategoryCardProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[category.icon] || LucideIcons.Wrench;
  const toolCount = tools.filter(t => t.category === category.id).length;

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 animate-slide-up ${
        isActive
          ? 'ring-2 ring-dusk-500/50 glow-purple scale-[1.02]'
          : 'hover:scale-[1.02] hover:shadow-xl'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg`}>
        <IconComponent className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
      <p className="text-white/50 text-sm mb-3">{category.description}</p>
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium">
          {toolCount} 个工具
        </span>
      </div>
    </div>
  );
}
