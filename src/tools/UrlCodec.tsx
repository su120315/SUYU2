import { useState } from 'react';
import { ArrowDownUp, Copy, Check, RotateCcw, Link } from 'lucide-react';

export default function UrlCodec() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setError('');
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (err) {
      setError('编码失败');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (err) {
      setError('解码失败，请输入有效的 URL 编码字符串');
      setOutput('');
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setError('');
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setError('');
    if (value) {
      if (mode === 'encode') {
        handleEncode();
      } else {
        handleDecode();
      }
    } else {
      setOutput('');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 gradient-text">URL 编解码</h2>
        <p className="text-white/60 text-sm mb-6">
          对 URL 进行编码和解码，特殊字符转换为百分号编码
        </p>

        {/* 模式切换 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('encode'); if (input) handleEncode(); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'encode'
                ? 'dusk-btn'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            编码
          </button>
          <button
            onClick={() => { setMode('decode'); if (input) handleDecode(); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'decode'
                ? 'dusk-btn'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            解码
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          {/* 输入框 */}
          <div>
            <label className="text-sm text-white/60 mb-2 block flex items-center gap-2">
              <Link className="w-4 h-4" />
              {mode === 'encode' ? '原始文本' : '编码字符串'}
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的 URL 编码字符串...'}
              className="w-full h-48 p-4 rounded-xl dusk-input resize-none text-sm font-mono"
            />
          </div>

          {/* 交换按钮 */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              title="交换"
            >
              <ArrowDownUp className="w-5 h-5" />
            </button>
          </div>

          {/* 输出框 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-white/60">
                {mode === 'encode' ? '编码结果' : '解码结果'}
              </label>
              <button
                onClick={copyOutput}
                disabled={!output}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="复制结果"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="结果将显示在这里..."
              className="w-full h-48 p-4 rounded-xl dusk-input resize-none text-sm font-mono"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            清空
          </button>
        </div>
      </div>
    </div>
  );
}
