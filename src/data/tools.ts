export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
}

export const categories: Category[] = [
  {
    id: 'text',
    name: '文本工具',
    icon: 'Type',
    description: '文字处理、编码转换、生成器',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'developer',
    name: '开发工具',
    icon: 'Code2',
    description: 'JSON格式化、正则测试、颜色转换',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'calculator',
    name: '计算工具',
    icon: 'Calculator',
    description: '单位换算、百分比、年龄计算',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'image',
    name: '图片工具',
    icon: 'Image',
    description: '图片压缩、格式转换、尺寸调整',
    color: 'from-orange-500 to-red-500',
  },
];

export const tools: Tool[] = [
  {
    id: 'word-counter',
    name: '字数统计',
    description: '统计文本的字数、字符数、行数和段落数',
    icon: 'FileText',
    category: 'text',
    tags: ['统计', '文本', '字数'],
  },
  {
    id: 'case-converter',
    name: '大小写转换',
    description: '在大小写、驼峰、下划线等格式间转换',
    icon: 'ArrowUpDown',
    category: 'text',
    tags: ['转换', '文本', '大小写'],
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: '快速进行 Base64 编码和解码',
    icon: 'Binary',
    category: 'text',
    tags: ['编码', '解码', 'Base64'],
  },
  {
    id: 'url-codec',
    name: 'URL 编解码',
    description: '对 URL 进行编码和解码处理',
    icon: 'Link',
    category: 'text',
    tags: ['编码', '解码', 'URL'],
  },
  {
    id: 'password-generator',
    name: '密码生成器',
    description: '生成安全的随机密码，支持自定义复杂度',
    icon: 'Key',
    category: 'text',
    tags: ['密码', '安全', '随机'],
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: '生成占位文本，支持自定义长度和格式',
    icon: 'FileText',
    category: 'text',
    tags: ['占位符', '文本', '生成'],
  },
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    description: '格式化、压缩、验证 JSON 数据',
    icon: 'Braces',
    category: 'developer',
    tags: ['JSON', '格式化', '开发'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID 生成器',
    description: '一键生成 v4 UUID 标识符',
    icon: 'Shield',
    category: 'developer',
    tags: ['UUID', '唯一标识', '开发'],
  },
  {
    id: 'color-converter',
    name: '颜色转换器',
    description: '在 HEX、RGB、HSL 之间转换颜色',
    icon: 'Palette',
    category: 'developer',
    tags: ['颜色', '设计', '转换'],
  },
  {
    id: 'regex-tester',
    name: '正则测试',
    description: '实时测试正则表达式匹配结果',
    icon: 'Search',
    category: 'developer',
    tags: ['正则', '匹配', '开发'],
  },
  {
    id: 'number-base',
    name: '进制转换',
    description: '二进制、八进制、十进制、十六进制互转',
    icon: 'Hash',
    category: 'developer',
    tags: ['进制', '转换', '数学'],
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix 时间戳与日期时间相互转换',
    icon: 'Clock',
    category: 'calculator',
    tags: ['时间', '转换', '日期'],
  },
  {
    id: 'percentage',
    name: '百分比计算器',
    description: '快速计算百分比增减和折扣',
    icon: 'Percent',
    category: 'calculator',
    tags: ['百分比', '数学', '计算'],
  },
  {
    id: 'age-calculator',
    name: '年龄计算器',
    description: '计算精确年龄，包括年月日和天数',
    icon: 'Calendar',
    category: 'calculator',
    tags: ['年龄', '日期', '计算'],
  },
  {
    id: 'unit-converter',
    name: '单位换算',
    description: '长度、重量、温度等单位换算',
    icon: 'ArrowLeftRight',
    category: 'calculator',
    tags: ['单位', '换算', '长度'],
  },
  {
    id: 'image-compress',
    name: '图片压缩',
    description: '在浏览器中压缩图片，保护隐私',
    icon: 'ImageMinus',
    category: 'image',
    tags: ['压缩', '图片', '优化'],
  },
  {
    id: 'image-resize',
    name: '图片尺寸调整',
    description: '调整图片大小，支持等比例缩放',
    icon: 'Image',
    category: 'image',
    tags: ['尺寸', '图片', '调整'],
  },
  {
    id: 'qr-generator',
    name: '二维码生成',
    description: '生成自定义内容的二维码图片',
    icon: 'QrCode',
    category: 'image',
    tags: ['二维码', '生成', '图片'],
  },
];
