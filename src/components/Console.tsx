import React, { useState, useRef, useEffect } from 'react';

interface ConsoleProps {
  onSubmit: (prompt: string) => void;
  output: string;
}

const Console: React.FC<ConsoleProps> = ({ onSubmit, output }) => {
  const [input, setInput] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-[600px] flex flex-col">
      <div ref={outputRef} className="flex-grow overflow-y-auto mb-4 whitespace-pre-wrap">
        {output}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-gray-800 text-white p-2 rounded-l"
          placeholder="Enter your prompt..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default Console;