import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import ToolCard from '../components/ToolCard';
import StarryBackground from '../components/StarryBackground';
import { categories, tools } from '../data/tools';
import { Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === null || tool.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen dusk-bg text-white relative overflow-hidden">
      <StarryBackground />
      
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero 区域 */}
        <section className="container mx-auto px-4 text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-dusk-400" />
            <span className="text-sm text-white/70">18+ 实用工具，持续更新中</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">暮光工具箱</span>
            <br />
            <span className="text-white/90">你的一站式在线工具库</span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            所有工具均在浏览器中运行，数据不会上传到服务器，
            保护你的隐私安全。无需安装，即开即用。
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-white/80">极速响应</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-white/80">隐私安全</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
              <Sparkles className="w-5 h-5 text-dusk-400" />
              <span className="text-sm text-white/80">完全免费</span>
            </div>
          </div>
        </section>

        {/* 分类导航 */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <span className="gradient-text">工具分类</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard
              category={{
                id: 'all',
                name: '全部工具',
                icon: 'LayoutGrid',
                description: '浏览所有可用工具',
                color: 'from-dusk-500 to-twilight-500',
              }}
              isActive={activeCategory === null}
              onClick={() => setActiveCategory(null)}
              index={0}
            />
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                index={index + 1}
              />
            ))}
          </div>
        </section>

        {/* 工具网格 */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              <span className="gradient-text">
                {activeCategory
                  ? categories.find((c) => c.id === activeCategory)?.name
                  : '全部工具'}
              </span>
              <span className="text-white/50 text-lg ml-3">({filteredTools.length})</span>
            </h2>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-2xl">
              <p className="text-white/50 text-lg">没有找到匹配的工具</p>
              <p className="text-white/30 text-sm mt-2">试试其他关键词或分类</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* 页脚 */}
        <footer className="container mx-auto px-4 mt-20 pt-8 border-t border-white/10">
          <div className="text-center text-white/40 text-sm">
            <p>暮光工具箱 © 2024 · 所有工具均在本地运行，保护您的隐私</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
