import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, Key, Shield } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars.length === 0) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyPassword = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (includeUppercase && includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return { label: '弱', color: 'text-red-400', bg: 'bg-red-500', width: '33%' };
    if (score <= 4) return { label: '中等', color: 'text-yellow-400', bg: 'bg-yellow-500', width: '66%' };
    return { label: '强', color: 'text-emerald-400', bg: 'bg-emerald-500', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 gradient-text">密码生成器</h2>
        <p className="text-white/60 text-sm mb-6">
          生成安全的随机密码，使用浏览器的加密 API 确保随机性
        </p>

        {/* 密码显示区 */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="点击生成按钮生成密码"
                className="w-full bg-transparent text-lg font-mono text-white outline-none"
              />
            </div>
            <button
              onClick={copyPassword}
              disabled={!password}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="复制密码"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={generatePassword}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              title="重新生成"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* 强度指示器 */}
          {password && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">密码强度</span>
                <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full ${strength.bg} transition-all duration-500`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 长度设置 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-white/70">密码长度</label>
            <span className="text-lg font-bold gradient-text">{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-dusk-500"
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* 字符选项 */}
        <div className="space-y-3 mb-6">
          <label className="text-sm text-white/70 block">包含字符</label>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIncludeUppercase(!includeUppercase)}
              className={`p-3 rounded-xl text-left transition-all ${
                includeUppercase
                  ? 'bg-dusk-500/20 border-dusk-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              } border`}
            >
              <div className="text-sm font-medium">大写字母</div>
              <div className="text-xs opacity-60">A-Z</div>
            </button>

            <button
              onClick={() => setIncludeLowercase(!includeLowercase)}
              className={`p-3 rounded-xl text-left transition-all ${
                includeLowercase
                  ? 'bg-dusk-500/20 border-dusk-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              } border`}
            >
              <div className="text-sm font-medium">小写字母</div>
              <div className="text-xs opacity-60">a-z</div>
            </button>

            <button
              onClick={() => setIncludeNumbers(!includeNumbers)}
              className={`p-3 rounded-xl text-left transition-all ${
                includeNumbers
                  ? 'bg-dusk-500/20 border-dusk-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              } border`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">数字</span>
              </div>
              <div className="text-xs opacity-60 ml-6">0-9</div>
            </button>

            <button
              onClick={() => setIncludeSymbols(!includeSymbols)}
              className={`p-3 rounded-xl text-left transition-all ${
                includeSymbols
                  ? 'bg-dusk-500/20 border-dusk-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              } border`}
            >
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                <span className="text-sm font-medium">特殊符号</span>
              </div>
              <div className="text-xs opacity-60 ml-6">!@#$%...</div>
            </button>
          </div>
        </div>

        {/* 生成按钮 */}
        <button
          onClick={generatePassword}
          className="w-full dusk-btn py-3 rounded-xl font-medium text-base"
        >
          生成密码
        </button>
      </div>
    </div>
  );
}
