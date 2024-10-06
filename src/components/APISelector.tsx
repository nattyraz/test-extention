import React from 'react';

interface APISelectorProps {
  onSelect: (api: string) => void;
}

const APISelector: React.FC<APISelectorProps> = ({ onSelect }) => {
  const apis = ['Claude', 'Ollama', 'OpenAI', 'Mistral', 'Groq'];

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Select LLM API</h2>
      {apis.map((api) => (
        <button
          key={api}
          className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onSelect(api)}
        >
          {api}
        </button>
      ))}
    </div>
  );
};

export default APISelector;