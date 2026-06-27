import { useState, useMemo } from 'react';
import { Copy, Check, Palette, RefreshCw } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1');
  const [copied, setCopied] = useState<string | null>(null);

  const colors = useMemo(() => {
    try {
      const hexColor = hex.replace('#', '');
      if (hexColor.length !== 6) {
        return { rgb: '', hsl: '', valid: false };
      }

      const r = parseInt(hexColor.substring(0, 2), 16);
      const g = parseInt(hexColor.substring(2, 4), 16);
      const b = parseInt(hexColor.substring(4, 6), 16);

      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case rNorm:
            h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
            break;
          case gNorm:
            h = ((bNorm - rNorm) / d + 2) / 6;
            break;
          case bNorm:
            h = ((rNorm - gNorm) / d + 4) / 6;
            break;
        }
      }

      return {
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
        valid: true,
        r,
        g,
        b,
      };
    } catch {
      return { rgb: '', hsl: '', valid: false };
    }
  }, [hex]);

  const copyValue = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const randomColor = () => {
    const random = Math.floor(Math.random() * 16777215).toString(16);
    setHex('#' + random.padStart(6, '0'));
  };

  const colorItems = [
    { label: 'HEX', value: hex, type: 'hex' },
    { label: 'RGB', value: colors.rgb, type: 'rgb' },
    { label: 'HSL', value: colors.hsl, type: 'hsl' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 gradient-text">颜色转换器</h2>
        <p className="text-white/60 text-sm mb-6">
          在 HEX、RGB、HSL 之间转换颜色，支持颜色预览
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 颜色选择和预览 */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">选择颜色</label>
            <div className="glass-card rounded-xl p-4">
              <div
                className="w-full h-32 rounded-xl mb-4 border border-white/10"
                style={{ backgroundColor: colors.valid ? hex : '#333' }}
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60">#</span>
                    <input
                      type="text"
                      value={hex.replace('#', '')}
                      onChange={(e) => setHex('#' + e.target.value)}
                      placeholder="6366f1"
                      className="flex-1 px-3 py-2 rounded-lg dusk-input text-sm font-mono uppercase"
                      maxLength={6}
                    />
                  </div>
                </div>
                <input
                  type="color"
                  value={colors.valid ? hex : '#000000'}
                  onChange={(e) => setHex(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
              </div>
              <button
                onClick={randomColor}
                className="w-full mt-3 px-4 py-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm inline-flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                随机颜色
              </button>
            </div>
          </div>

          {/* 颜色值列表 */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">转换结果</label>
            <div className="space-y-3">
              {colorItems.map((item) => (
                <div
                  key={item.type}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/70 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-dusk-400" />
                      {item.label}
                    </span>
                    <button
                      onClick={() => copyValue(item.value, item.type)}
                      disabled={!item.value}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="复制"
                    >
                      {copied === item.type ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-lg font-mono text-white/90 break-all">
                    {item.value || '-'}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!colors.valid && hex.length > 1 && (
          <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
            请输入有效的 6 位 HEX 颜色值
          </div>
        )}
      </div>
    </div>
  );
}
