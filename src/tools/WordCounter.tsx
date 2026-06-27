import { useState, useMemo } from 'react';
import { Copy, Check, FileText, Type, AlignLeft, List } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const charCount = text.length;
    const charCountNoSpace = text.replace(/\s/g, '').length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lineCount = text === '' ? 0 : text.split('\n').length;
    const paragraphCount = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).length;
    const sentenceCount = text.trim() === '' ? 0 : (text.match(/[.!?。！？]+/g)?.length || 1);
    
    return {
      charCount,
      charCountNoSpace,
      wordCount,
      lineCount,
      paragraphCount,
      sentenceCount,
    };
  }, [text]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const clearText = () => {
    setText('');
  };

  const statItems = [
    { label: '字符数', value: stats.charCount, icon: Type },
    { label: '字符数(不含空格)', value: stats.charCountNoSpace, icon: Type },
    { label: '单词数', value: stats.wordCount, icon: FileText },
    { label: '行数', value: stats.lineCount, icon: AlignLeft },
    { label: '段落数', value: stats.paragraphCount, icon: List },
    { label: '句子数', value: stats.sentenceCount, icon: FileText },
  ];

  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 gradient-text">字数统计</h2>
        <p className="text-white/60 text-sm mb-6">
          输入或粘贴文本，实时统计字数、字符数、行数等信息
        </p>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此输入或粘贴文本..."
            className="w-full h-64 p-4 rounded-xl dusk-input resize-none text-sm leading-relaxed"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={copyText}
              disabled={!text}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="复制文本"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={clearText}
            disabled={!text}
            className="text-sm text-white/50 hover:text-white/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            清空内容
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="glass-card rounded-xl p-4 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dusk-500/20 to-twilight-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-dusk-400" />
                </div>
                <span className="text-sm text-white/60">{item.label}</span>
              </div>
              <p className="text-2xl font-bold gradient-text">{item.value.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
