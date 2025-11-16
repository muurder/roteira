import React, { useState, useMemo } from 'react';
import type { FavoriteItinerary } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SearchIcon } from './icons/SearchIcon';

interface FavoritesSectionProps {
  favorites: FavoriteItinerary[];
  onSelect: (favorite: FavoriteItinerary) => void;
  onRemove: (favorite: FavoriteItinerary) => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ favorites, onSelect, onRemove }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFavorites = useMemo(() => {
    if (!searchTerm.trim()) {
      return favorites;
    }
    return favorites.filter(fav =>
      fav.preferences.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-black/20 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          Seus Roteiros Favoritos
        </h2>
        <div className="max-w-md mx-auto mb-8">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por destino..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                    aria-label="Buscar roteiros favoritos por destino"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((fav, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-3">
                    <MapPinIcon className="w-6 h-6 text-blue-600 mr-2 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate" title={fav.preferences.destination}>
                      {fav.preferences.destination}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {fav.preferences.duration} dia(s) | {fav.preferences.interests.slice(0, 2).join(', ')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {fav.result.text.split('\n').find(line => line.length > 50)?.substring(0, 120) || 'Roteiro detalhado'}...
                  </p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelect(fav)}
                    className="w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Ver Roteiro
                  </button>
                  <button
                    onClick={() => onRemove(fav)}
                    title="Remover dos favoritos"
                    className="p-2 text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    aria-label="Remover roteiro dos favoritos"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Nenhum roteiro encontrado para "{searchTerm}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesSection;