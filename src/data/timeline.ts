import type { CategoryMeta, SiteConfig, TimelineNode } from '../types/timeline';

/**
 * 站点基础配置 —— 可直接在此修改标题、简介与导航外链
 */
export const SITE_CONFIG: SiteConfig = {
  title: '游戏人生',
  englishTitle: 'GAME OF LIFE // ARCHIVE',
  author: '望云川',
  startYear: 2000,
  endYear: 2026,
  tagline: '从第一枚按下启动键的像素开始，到用 AI 亲手创造世界。',
  description:
    '这是一份横跨 2000 — 2026 的广义游戏档案：记录那些陪我长大的电脑游戏、主机与掌机、令人彻夜难眠的虚拟世界，以及如今把写代码也变成大型开放世界游戏的 Vibe Coding 旅程。',
  links: {
    home: { label: '主页', url: 'https://667667.xyz' },
    blog: { label: '博客', url: 'https://blog.667667.xyz' },
  },
};

/**
 * 广义游戏分类定义
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    label: '全部档案',
    shortLabel: '全部',
    description: '完整时间轴（2000 — 2026）',
  },
  {
    id: 'pc',
    label: '电脑游戏',
    shortLabel: 'PC',
    description: '单机、网游与 Steam 库',
  },
  {
    id: 'console',
    label: '主机 · 掌机',
    shortLabel: '主机',
    description: '红白机、街机、掌机与客厅主机',
  },
  {
    id: 'vibecoding',
    label: 'Vibe Coding',
    shortLabel: 'Vibe',
    description: 'AI 协作编程与独立创造',
  },
  {
    id: 'life',
    label: '人生记忆',
    shortLabel: '人生',
    description: '与游戏交织的成长节点',
  },
];

/**
 * ============================================================================
 * ⭐ 核心内容数据：2000 — 2026 时间轴节点
 * ============================================================================
 * 填写指南：
 * 1. 直接修改下方数组中的标题、年份、文案，或复制一个对象新增节点。
 * 2. 图片放到 public/images/ 目录后，填写 image: '/images/xxx.jpg' 即可展示。
 * 3. 填完真实内容后，将 isPlaceholder: true 删除（或改为 false）即可隐藏“待填写”徽标。
 * 4. 节点会自动按 year 从小到大排列在横向时间轴上。
 */
export const TIMELINE_NODES: TimelineNode[] = [
  {
    id: '2000-genesis',
    year: 2000,
    dateLabel: '2000 · 启程',
    era: 'CHAPTER 01 · 像素启蒙',
    title: '【待填写】人生第一款启蒙游戏',
    subtitle: 'Player 1 Ready // 最初的像素记忆',
    category: 'console',
    platform: '小霸王 / FC / 街机',
    image: '',
    coverTheme: 'retro',
    summary:
      '在这里记录你最早接触电子游戏的画面：电视机前的雪花屏、黄卡带、塑料手柄，或者和小伙伴轮流通关的那个下午。',
    story: [
      '把这段示例文字替换为你 2000 年前后最深刻的游戏启蒙回忆。可以写当时是在谁家里玩的、用的是什么机器、最喜欢哪一关的 BGM。',
      '时间轴卡片展示精简摘要，而点击节点后打开的这个面板适合放更完整的人生故事和多张老照片。',
    ],
    quote: '“原来按下方向键和跳跃键，屏幕里的世界真的会回应我。”',
    tags: ['童年启蒙', '红白机', '像素世界'],
    meta: [
      { label: '人生阶段', value: '童年启蒙' },
      { label: '记忆清晰度', value: 'MAX' },
    ],
    highlight: true,
    isPlaceholder: true,
  },
  {
    id: '2004-first-pc',
    year: 2004,
    dateLabel: '2004 · 初见 PC',
    era: 'CHAPTER 02 · 大屁股显示器时代',
    title: '【待填写】第一次拥有 / 接触电脑玩的游戏',
    subtitle: 'CRT Monitor & Windows 98 / XP',
    category: 'pc',
    platform: 'PC · 单机光盘 / 4399',
    image: '',
    coverTheme: 'cyber',
    summary:
      '厚重的 CRT 显示器、机械滚轮鼠标、盗版合集光盘与网页小游戏——电脑屏幕第一次把整个世界搬到书桌前。',
    story: [
      '在这里填上你最早沉迷的电脑游戏名称（例如红警、仙剑、暗黑、大富翁、Flash 小游戏等）。',
      '也可以记录当时偷偷玩电脑、听见家长脚步声迅速 Alt+Tab 或关显示器的经典瞬间。',
    ],
    quote: '“开机那声清脆的音效，就是周末正式开始的信号。”',
    tags: ['PC 启蒙', 'CRT', '单机光盘'],
    meta: [
      { label: '硬件记忆', value: '奔腾处理器 + 滚轮鼠标' },
      { label: '状态', value: '怀旧封存' },
    ],
    isPlaceholder: true,
  },
  {
    id: '2008-online-era',
    year: 2008,
    dateLabel: '2008 · 联机与江湖',
    era: 'CHAPTER 03 · 宽带与网游纪元',
    title: '【待填写】陪我度过整个青春的网游 / 联机游戏',
    subtitle: 'Multiplayer Memories // 并肩作战',
    category: 'pc',
    platform: 'PC · 网络游戏 / 局域网',
    image: '',
    coverTheme: 'cyber',
    summary:
      '从独自闯关到和五湖四海的玩家相逢：公会频道、开黑语音、通宵刷副本，游戏开始成为社交与友情的载体。',
    story: [
      '记录你印象最深的联机游戏或网游回忆：那些一起开黑的同学、第一次爆出稀有装备的兴奋、或者某个再也没亮起的灰色头像。',
    ],
    tags: ['网游时代', '青春开黑', '公会记忆'],
    meta: [
      { label: '游玩方式', value: '联机开黑' },
      { label: '关键词', value: '热血与友情' },
    ],
    isPlaceholder: true,
  },
  {
    id: '2012-handheld-campus',
    year: 2012,
    dateLabel: '2012 · 掌中世界',
    era: 'CHAPTER 04 · 校园与掌机时光',
    title: '【待填写】被窝里 / 课余时间最难忘的一款作品',
    subtitle: 'Pocket Universe // 随时随地进入异世界',
    category: 'console',
    platform: 'PSP / NDS / GBA / 手机',
    image: '',
    coverTheme: 'console',
    summary:
      '哪怕屏幕只有几英寸，藏在课桌抽屉或被窝微光里的，却是一整个庞大到装不下青春的异世界。',
    story: [
      '填写在中学或大学初期让你废寝忘食的掌机、主机或移动端作品，以及那段时间里的校园生活切片。',
    ],
    tags: ['掌机', '校园回忆', '碎片时光'],
    meta: [
      { label: '携带率', value: '100%' },
      { label: '通关次数', value: '待补充' },
    ],
    isPlaceholder: true,
  },
  {
    id: '2016-steam-awakening',
    year: 2016,
    dateLabel: '2016 · 喜加一开启',
    era: 'CHAPTER 05 · Steam 数字藏馆',
    title: '【待填写】第一款在 Steam 上买的正版游戏',
    subtitle: 'Steam Library Unlocked // 正版收藏的起点',
    category: 'pc',
    platform: 'PC · Steam',
    image: '',
    coverTheme: 'steam',
    summary:
      '下载 Steam 客户端、第一次夏促剁手、看着游戏库一点点亮起来——从这一年起，我的游玩记录拥有了永久的数字勋章。',
    story: [
      '在这里记录你入坑 Steam 的契机、买的第一款正版游戏、或者在 Steam 上游戏时长排第一的“电子榨菜”与神作。',
    ],
    quote: '“买游戏本身，有时就是比玩游戏还快乐的另一款游戏。”',
    tags: ['Steam', '正版启蒙', '全成就'],
    meta: [
      { label: '游戏时长', value: '待填写 h' },
      { label: '成就进度', value: '探索中' },
    ],
    highlight: true,
    isPlaceholder: true,
  },
  {
    id: '2019-console-livingroom',
    year: 2019,
    dateLabel: '2019 · 大屏沉浸',
    era: 'CHAPTER 06 · 客厅主机与第九艺术',
    title: '【待填写】让我感叹“这就是第九艺术”的主机神作',
    subtitle: 'Console Masterpiece // 握紧手柄的沉浸感',
    category: 'console',
    platform: 'Nintendo Switch / PS / Xbox',
    image: '',
    coverTheme: 'console',
    summary:
      '下班后窝在沙发里拿起手柄，手柄的震动反馈与恢弘配乐一起袭来，在几十个小时的旅途中活完另一段人生。',
    story: [
      '记录一款真正震撼过你的叙事大作或开放世界神作（例如塞尔达、荒野大镖客、艾尔登法环等，替换成你的本命作品）。',
    ],
    tags: ['主机游戏', '第九艺术', '开放世界'],
    meta: [
      { label: '平台', value: '主机' },
      { label: '评分', value: '10 / 10' },
    ],
    isPlaceholder: true,
  },
  {
    id: '2022-life-checkpoint',
    year: 2022,
    dateLabel: '2022 · 人生存档点',
    era: 'CHAPTER 07 · 现实与虚拟的交汇',
    title: '【待填写】一个与游戏紧密相连的人生转折点',
    subtitle: 'Life Checkpoint // 现实副本也在升级',
    category: 'life',
    platform: '现实世界 · Life OS',
    image: '',
    coverTheme: 'memory',
    summary:
      '游戏不只是消遣，有时是在高压现实里短暂回血的篝火，有时是搭建个人博客、记录生活与思考的灵感起点。',
    story: [
      '这里专门留给“人生记忆”类节点：比如某段低谷期靠哪款游戏治愈、搭建自己的网站、或者一次难忘的旅行与成长决定。',
    ],
    tags: ['人生存档点', '自留地', '成长复盘'],
    meta: [
      { label: '节点类型', value: 'Life Checkpoint' },
      { label: '状态', value: '已解锁' },
    ],
    link: {
      label: '前往云川博客',
      url: 'https://blog.667667.xyz',
    },
    isPlaceholder: true,
  },
  {
    id: '2025-vibecoding',
    year: 2025,
    dateLabel: '2025 · 造物主模式',
    era: 'CHAPTER 08 · AI 与 Vibe Coding',
    title: '【待填写】当我开始把 Vibe Coding 当作新游戏来玩',
    subtitle: 'Vibe Coding // 从玩家转职为世界创造者',
    category: 'vibecoding',
    platform: 'AI Agent · IDE · Web',
    image: '',
    coverTheme: 'vibe',
    summary:
      '和 AI 结对写代码，像极了一款自由度无限大的沙盒建造游戏：输入灵感的 Prompt，看着想法实时编译成会呼吸的产品。',
    story: [
      '广义的游戏，本质是“即时反馈 + 心流体验 + 探索与创造的乐趣”。Vibe Coding 完美契合了这一切。',
      '在这里可以填入你用 AI 做出的一个个小工具、看板、应用，以及某个深夜突然跑通功能时堪比“击败最终 Boss”的爽感。',
    ],
    quote: '“玩了二十多年别人设计的游戏，现在终于轮到自己用代码搭地图了。”',
    tags: ['Vibe Coding', 'AI 创造', '沙盒心流'],
    meta: [
      { label: '职业切换', value: 'Player → Creator' },
      { label: '心流指数', value: '99%' },
    ],
    highlight: true,
    isPlaceholder: true,
  },
  {
    id: '2026-now',
    year: 2026,
    dateLabel: '2026 · 进行中',
    era: 'CHAPTER 09 · 未完待续的现在',
    title: '【待填写】正在游玩 & 正在创造的此刻',
    subtitle: 'Now Playing // 2026 Live Save File',
    category: 'vibecoding',
    platform: 'PC · 主机 · Vibe Coding',
    image: '',
    coverTheme: 'steam',
    summary:
      '这座「游戏人生」时间轴网站本身，也是 2026 年的新存档。往后的每一款神作、每一次脑洞落地，都会继续点亮这条光轨。',
    story: [
      '记录你当下正在攻略的游戏、正在打磨的个人项目，以及对下一个十年游戏与人生的期待。',
    ],
    tags: ['2026', '正在进行', '游戏人生'],
    meta: [
      { label: '当前版本', value: 'v2026.11' },
      { label: '存档状态', value: 'Online · 持续更新' },
    ],
    link: {
      label: '访问 667667.xyz',
      url: 'https://667667.xyz',
    },
    highlight: true,
    isPlaceholder: true,
  },
];
