import * as LucideIcons from 'lucide-react';
import { Tool } from '../data/tools';
import { useNavigate } from 'react-router-dom';

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const navigate = useNavigate();
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[tool.icon] || LucideIcons.Wrench;

  return (
    <div
      onClick={() => navigate(`/tool/${tool.id}`)}
      className="tool-card glass-card rounded-2xl p-5 cursor-pointer group animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dusk-500/20 to-twilight-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-dusk-500/30 group-hover:to-twilight-500/30 transition-all">
          <IconComponent className="w-6 h-6 text-dusk-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base mb-1 group-hover:text-dusk-300 transition-colors">
            {tool.name}
          </h3>
          <p className="text-white/50 text-sm line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md bg-white/5 text-white/40 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
