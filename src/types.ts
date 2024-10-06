export interface APICall {
  url: string;
  method: string;
  type: string;
  headers?: Record<string, string>;
  body?: any;
}