import React, { useState } from 'react';
import { MapIcon } from './icons/MapIcon';
import { MaximizeIcon } from './icons/MaximizeIcon';
import { MinimizeIcon } from './icons/MinimizeIcon';

interface ItineraryMapProps {
  imageUrl: string;
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center">
          <MapIcon className="w-5 h-5 mr-2 text-blue-600" />
          Mapa Artístico do seu Destino
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-800 focus:ring-blue-500"
          aria-label={isExpanded ? 'Recolher mapa' : 'Expandir mapa'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <MinimizeIcon className="w-5 h-5" /> : <MaximizeIcon className="w-5 h-5" />}
        </button>
      </div>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-60'}`}
      >
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-md">
          <img 
            src={imageUrl} 
            alt="Mapa artístico do destino" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ItineraryMap;