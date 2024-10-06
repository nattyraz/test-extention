import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import WebBrowser from './components/WebBrowser';
import APIAnalyzer from './components/APIAnalyzer';
import { APICall } from './types';
import { LLMService } from './services/LLMService';

const App: React.FC = () => {
  const [apiCalls, setApiCalls] = useState<APICall[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const llmService = new LLMService('Groq', import.meta.env.VITE_GROQ_API_KEY || '');

  const handleApiCall = async (call: APICall) => {
    setApiCalls(prevCalls => [...prevCalls, call]);
    
    const prompt = `Analyze this API call and provide insights:
    URL: ${call.url}
    Method: ${call.method}
    Type: ${call.type}
    Headers: ${JSON.stringify(call.headers)}
    Body: ${call.body ? JSON.stringify(call.body) : 'None'}
    
    Based on this API call:
    1. What kind of action is being performed?
    2. What data might be exchanged?
    3. Are there any potential security concerns?
    4. How might this relate to user authentication or data retrieval?
    5. Suggest possible response structures or data that might be returned.`;

    try {
      const response = await llmService.generateResponse(prompt);
      setAnalysis(prevAnalysis => prevAnalysis + '\n\n' + response);
    } catch (error) {
      console.error('Error analyzing API call:', error);
      setAnalysis(prevAnalysis => prevAnalysis + '\n\nError analyzing API call: ' + String(error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Globe className="mr-2" /> Analyseur d'API Web
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <WebBrowser onApiCall={handleApiCall} />
        </div>
        <div className="w-full md:w-1/2">
          <APIAnalyzer apiCalls={apiCalls} analysis={analysis} />
        </div>
      </div>
    </div>
  );
};

export default App;