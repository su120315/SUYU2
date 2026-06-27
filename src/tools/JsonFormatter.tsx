import { useState, useCallback } from 'react';
import { Copy, Check, RotateCcw, Braces, Minimize2, Maximize2, AlertCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('JSON 格式错误，请检查语法');
      setOutput('');
    }
  }, [input, indentSize]);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('JSON 格式错误，请检查语法');
      setOutput('');
    }
  }, [input]);

  const copyOutput = async () => {
    if (!output) return;
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

  const loadSample = () => {
    const sample = {
      name: '暮光工具箱',
      version: '1.0.0',
      description: '一个功能丰富的在线工具箱',
      features: ['JSON格式化', 'Base64编解码', '密码生成器'],
      settings: {
        theme: 'dark',
        language: 'zh-CN',
        autoSave: true
      }
    };
    setInput(JSON.stringify(sample, null, 2));
    setError('');
  };

  return (
    <div className="animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 gradient-text">JSON 格式化</h2>
        <p className="text-white/60 text-sm mb-6">
          格式化、压缩和验证 JSON 数据，所有操作在本地完成
        </p>

        {/* 工具栏 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={formatJson}
            className="px-4 py-2 rounded-xl dusk-btn text-sm font-medium inline-flex items-center gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            格式化
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
          >
            <Minimize2 className="w-4 h-4" />
            压缩
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm inline-flex items-center gap-2"
          >
            <Braces className="w-4 h-4" />
            示例
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-white/50">缩进:</span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg dusk-input text-sm"
            >
              <option value={2}>2 空格</option>
              <option value={4}>4 空格</option>
              <option value={8}>8 空格</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* 输入框 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-white/60">输入 JSON</label>
              <button
                onClick={clearAll}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                title="清空"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(''); }}
              onBlur={formatJson}
              placeholder='{"name": "暮光工具箱"}'
              className="w-full h-80 p-4 rounded-xl dusk-input resize-none text-sm font-mono"
            />
          </div>

          {/* 输出框 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-white/60">输出结果</label>
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
              placeholder="格式化后的 JSON 将显示在这里..."
              className="w-full h-80 p-4 rounded-xl dusk-input resize-none text-sm font-mono"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
