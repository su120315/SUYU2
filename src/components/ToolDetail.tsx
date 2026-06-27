import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import StarryBackground from './StarryBackground';
import { tools, categories } from '../data/tools';
import WordCounter from '../tools/WordCounter';
import Base64Codec from '../tools/Base64Codec';
import PasswordGenerator from '../tools/PasswordGenerator';
import JsonFormatter from '../tools/JsonFormatter';
import UuidGenerator from '../tools/UuidGenerator';
import ColorConverter from '../tools/ColorConverter';
import UrlCodec from '../tools/UrlCodec';

const toolComponents: Record<string, React.ComponentType> = {
  'word-counter': WordCounter,
  'base64': Base64Codec,
  'password-generator': PasswordGenerator,
  'json-formatter': JsonFormatter,
  'uuid-generator': UuidGenerator,
  'color-converter': ColorConverter,
  'url-codec': UrlCodec,
};

export default function ToolDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();

  const tool = tools.find((t) => t.id === toolId);
  const category = tool ? categories.find((c) => c.id === tool.category) : null;

  if (!tool) {
    return (
      <div className="min-h-screen dusk-bg text-white relative overflow-hidden flex items-center justify-center">
        <StarryBackground />
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4 gradient-text">工具未找到</h1>
          <p className="text-white/60 mb-6">抱歉，您访问的工具不存在</p>
          <button
            onClick={() => navigate('/')}
            className="dusk-btn px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const ToolComponent = toolComponents[tool.id];
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[tool.icon] || LucideIcons.Wrench;

  return (
    <div className="min-h-screen dusk-bg text-white relative overflow-hidden">
      <StarryBackground />

      <div className="relative z-10">
        {/* 顶部导航 */}
        <div className="glass-card sticky top-0 z-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16 gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dusk-500 to-twilight-500 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-white">{tool.name}</h1>
                  <p className="text-xs text-white/50">{category?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 工具内容 */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <div className="glass-card rounded-2xl p-8 text-center">
                <IconComponent className="w-16 h-16 mx-auto mb-4 text-dusk-400" />
                <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
                <p className="text-white/60 mb-6">{tool.description}</p>
                <p className="text-white/40">该工具正在开发中，敬请期待...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
