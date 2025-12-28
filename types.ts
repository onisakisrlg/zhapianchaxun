export enum Language {
  EN = 'en',
  JA = 'ja',
  ZH = 'zh'
}

export enum SafetyStatus {
  SAFE = 'SAFE',
  SCAM = 'SCAM',
  UNKNOWN = 'UNKNOWN'
}

export interface SearchResult {
  status: SafetyStatus;
  entityName?: string;
  website?: string;
  description: string;
  phoneNumber: string;
}

export interface Translation {
  title: string;
  subtitle: string;
  placeholder: string;
  searchButton: string;
  analyzing: string;
  disclaimer: string;
  resultLabels: {
    safe: string;
    scam: string;
    unknown: string;
    website: string;
    entity: string;
    reason: string;
  };
  unknownMessage: string;
}

export interface Translations {
  [key: string]: Translation;
}