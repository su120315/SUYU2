import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Shield, Hash } from 'lucide-react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const generateUuids = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      if (crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
        newUuids.push(
          'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setUuids(newUuids);
  }, [count]);

  const copyUuid = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const copyAll = async () => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 gradient-text">UUID 生成器</h2>
        <p className="text-white/60 text-sm mb-6">
          生成 v4 版本 UUID（通用唯一标识符），可用于数据库主键、会话标识等
        </p>

        {/* 设置区域 */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-dusk-400" />
              <span className="text-sm text-white/70">生成数量</span>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
                className="w-20 px-3 py-1.5 rounded-lg dusk-input text-center text-sm"
              />
            </div>
            <button
              onClick={generateUuids}
              className="dusk-btn px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              生成 UUID
            </button>
            {uuids.length > 0 && (
              <button
                onClick={copyAll}
                className="px-4 py-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
              >
                {allCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                复制全部
              </button>
            )}
          </div>
        </div>

        {/* UUID 列表 */}
        {uuids.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dusk-500/20 to-twilight-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-dusk-400" />
                </div>
                <code className="flex-1 text-sm font-mono text-white/80 truncate">
                  {uuid}
                </code>
                <button
                  onClick={() => copyUuid(uuid, index)}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-white/20 transition-all text-white/60 hover:text-white"
                  title="复制"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/40">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>点击"生成 UUID"按钮开始</p>
          </div>
        )}
      </div>
    </div>
  );
}
