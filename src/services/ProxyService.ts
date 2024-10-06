import axios from 'axios';

export class ProxyService {
  private proxyUrl: string;

  constructor(proxyUrl: string) {
    this.proxyUrl = proxyUrl;
  }

  async request(url: string, method: string, headers: Record<string, string>, body: any) {
    try {
      const response = await axios({
        method: 'POST',
        url: this.proxyUrl,
        data: {
          url,
          method,
          headers,
          body
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error making proxied request:', error);
      throw error;
    }
  }
}