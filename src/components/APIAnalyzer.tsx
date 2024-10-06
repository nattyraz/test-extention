import React from 'react';
import { APICall } from '../types';

interface APIAnalyzerProps {
  apiCalls: APICall[];
  analysis: string;
}

const APIAnalyzer: React.FC<APIAnalyzerProps> = ({ apiCalls, analysis }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Analyse des appels API</h2>
      <div className="overflow-y-auto h-[600px]">
        {apiCalls.map((call, index) => (
          <div key={index} className="mb-4 p-2 border rounded">
            <p><strong>URL:</strong> {call.url}</p>
            <p><strong>Méthode:</strong> {call.method}</p>
            <p><strong>Type:</strong> {call.type}</p>
            {call.headers && (
              <div>
                <strong>En-têtes:</strong>
                <pre className="text-sm">{JSON.stringify(call.headers, null, 2)}</pre>
              </div>
            )}
            {call.body && (
              <div>
                <strong>Corps:</strong>
                <pre className="text-sm">{JSON.stringify(call.body, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Analyse Groq</h3>
      <div className="overflow-y-auto h-[300px] bg-gray-100 p-2 rounded">
        <pre className="text-sm whitespace-pre-wrap">{analysis}</pre>
      </div>
    </div>
  );
};

export default APIAnalyzer;