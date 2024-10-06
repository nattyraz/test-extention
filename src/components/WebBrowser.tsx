import React, { useState } from 'react';
import { APICall } from '../types';
import { ProxyService } from '../services/ProxyService';

interface WebBrowserProps {
  onApiCall: (call: APICall) => void;
}

const WebBrowser: React.FC<WebBrowserProps> = ({ onApiCall }) => {
  const [url, setUrl] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [currentAction, setCurrentAction] = useState('');
  const proxyService = new ProxyService('https://votre-serveur-proxy.com/proxy');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await proxyService.request(url, 'GET', {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }, null);

      const apiCall: APICall = {
        url,
        method: 'GET',
        type: 'initial_load',
        headers: response.headers,
        body: response.data
      };

      onApiCall(apiCall);
      setActions([`Chargement initial de ${url}`]);
    } catch (error) {
      console.error('Error loading URL:', error);
    }
  };

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAction.trim()) {
      setActions([...actions, currentAction]);
      
      // Simulate an API call based on the action
      try {
        const response = await proxyService.request(`${url}/api/action`, 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify({ action: currentAction }));

        const apiCall: APICall = {
          url: `${url}/api/action`,
          method: 'POST',
          type: 'user_action',
          headers: response.headers,
          body: response.data
        };

        onApiCall(apiCall);
      } catch (error) {
        console.error('Error performing action:', error);
      }

      setCurrentAction('');
    }
  };

  // ... rest of the component remains the same
};

export default WebBrowser;