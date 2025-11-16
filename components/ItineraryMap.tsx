
import React from 'react';
import { MapIcon } from './icons/MapIcon';

interface ItineraryMapProps {
  imageUrl: string;
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ imageUrl }) => {
  return (
    <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
        <MapIcon className="w-5 h-5 mr-2 text-blue-600" />
        Mapa Artístico do seu Destino
      </h3>
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-md overflow-hidden min-h-[200px]">
        <img 
          src={imageUrl} 
          alt="Mapa artístico do destino" 
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ItineraryMap;