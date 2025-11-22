export interface Alert {
  id: string;
  title: string;
  message: string;
  level: 'info' | 'warning' | 'danger';
  timestamp: number; // epoch ms
  read?: boolean;
  meta?: any; // météo brute ou infos supplémentaires
}
