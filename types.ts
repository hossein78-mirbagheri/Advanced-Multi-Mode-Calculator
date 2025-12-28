
export enum CalculatorMode {
  STANDARD = 'Standard',
  SCIENTIFIC = 'Scientific',
  GRAPHING = 'Graphing',
  PROGRAMMER = 'Programmer'
}

export type Base = 2 | 8 | 10 | 16;

export interface GraphDataPoint {
  x: number;
  y: number;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}
