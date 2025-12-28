import { Translations, Language } from './types';

export const APP_TRANSLATIONS: Translations = {
  [Language.EN]: {
    title: "Japan Number Safety Check",
    subtitle: "Verify callers to protect yourself from fraud.",
    placeholder: "Enter phone number (e.g., 03-1234-5678)",
    searchButton: "Search",
    analyzing: "Analyzing...",
    disclaimer: "This tool uses AI analysis and known databases. A 'Not Found' result does not guarantee safety. Always verify official requests via official channels.",
    resultLabels: {
      safe: "Verified Official Number",
      scam: "Potential Scam / Fraud",
      unknown: "Unknown / No Data",
      website: "Official Website",
      entity: "Organization",
      reason: "Details"
    },
    unknownMessage: "We could not find a confirmed report for this number. However, this does not mean it is 100% safe. Scammers often change numbers. Proceed with caution."
  },
  [Language.JA]: {
    title: "電話番号詐欺チェック",
    subtitle: "不審な電話番号を検索して、詐欺被害を防ぎましょう。",
    placeholder: "電話番号を入力 (例: 03-1234-5678)",
    searchButton: "検索",
    analyzing: "分析中...",
    disclaimer: "このツールはAI分析とデータベースを使用しています。「不明」等の結果は安全を100%保証するものではありません。重要な連絡は必ず公式サイト等で確認してください。",
    resultLabels: {
      safe: "公式確認済み",
      scam: "詐欺・迷惑電話の可能性",
      unknown: "情報なし / 不明",
      website: "公式サイト",
      entity: "組織・機関名",
      reason: "詳細"
    },
    unknownMessage: "この番号に関する確実な情報は確認できませんでした。安全を保証するものではありません。詐欺グループは頻繁に番号を変えるため、十分にご注意ください。"
  },
  [Language.ZH]: {
    title: "日本反诈电话查询",
    subtitle: "查询陌生来电，防止入管局、税务局等冒充诈骗。",
    placeholder: "输入电话号码 (如: 03-1234-5678)",
    searchButton: "查询",
    analyzing: "正在分析...",
    disclaimer: "本工具基于AI分析及公开数据。未搜索到信息不代表百分百安全。遇到索要钱财或个人信息的电话，请务必通过官方渠道核实。",
    resultLabels: {
      safe: "官方认证号码",
      scam: "高风险 / 疑似诈骗",
      unknown: "暂无数据 / 未知",
      website: "官方网站",
      entity: "机构名称",
      reason: "详细说明"
    },
    unknownMessage: "暂时未搜索到该号码的官方信息或举报记录。但这不代表绝对安全。骗子经常更换号码，请务必提高警惕。"
  }
};