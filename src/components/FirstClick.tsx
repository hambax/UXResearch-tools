import React, { useState, useRef } from 'react';
import { Save, RotateCcw, Trash2 } from 'lucide-react';

interface ClickMark {
  x: number;
  y: number;
}

const FirstClick: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [clickMark, setClickMark] = useState<ClickMark | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setClickMark(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (image && !clickMark && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setClickMark({ x, y });
    }
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving click test results...');
  };

  const handleReset = () => {
    setClickMark(null);
  };

  const handleDelete = () => {
    setImage(null);
    setClickMark(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-left text-blue-500">First Click Test</h1>
      
      <div 
        ref={containerRef}
        className={`relative w-full min-h-[500px] rounded-lg transition-all duration-200 ${
          image ? 'bg-gray-100' : 'border-2 border-dashed border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">
              Drag and drop an image here to start the first click test
            </p>
          </div>
        )}
        
        {image && (
          <img 
            src={image} 
            alt="Test interface" 
            className="w-full h-full object-contain"
          />
        )}

        {clickMark && (
          <div 
            className="absolute w-8 h-8 -ml-4 -mt-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
            style={{ left: clickMark.x, top: clickMark.y }}
          >
            click
          </div>
        )}
      </div>

      {image && (
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={20} className="mr-2" />
            Start Over
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={20} className="mr-2" />
            Delete Image
          </button>
          {clickMark && (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Save size={20} className="mr-2" />
              Save Results
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FirstClick;