import React, { useMemo, useState } from 'react';
import type { TravelSuggestion } from '../types';
import { allSuggestions } from '../data/suggestions';
import { ImageIcon } from './icons/ImageIcon';

const getShuffledSuggestions = (count: number): TravelSuggestion[] => {
  const national = allSuggestions.filter(s => s.destination.includes(', Brasil'));
  const international = allSuggestions.filter(s => !s.destination.includes(', Brasil') && !s.destination.match(/família|solo|praia|cultural|europa|montanha/i));
  
  const shuffledNational = [...national].sort(() => 0.5 - Math.random());
  const shuffledInternational = [...international].sort(() => 0.5 - Math.random());

  const numNational = 3;
  const numInternational = 1;

  const finalSuggestions = [
    ...shuffledNational.slice(0, numNational),
    ...shuffledInternational.slice(0, numInternational)
  ];

  return finalSuggestions.sort(() => 0.5 - Math.random());
};

interface SuggestionCardProps {
  suggestion: TravelSuggestion;
  onSelect: (suggestion: TravelSuggestion) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onSelect }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <button
            onClick={() => onSelect(suggestion)}
            className="relative block w-full h-48 rounded-lg overflow-hidden shadow-lg group text-left focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 bg-gray-300"
            aria-label={`Sugerir roteiro para ${suggestion.destination}`}
        >
            {!imageError ? (
                <img 
                    src={suggestion.imageUrl} 
                    alt={suggestion.destination} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    loading="lazy" 
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="font-bold text-lg">{suggestion.destination}</h4>
                <p className="text-sm opacity-90">{suggestion.description}</p>
            </div>
        </button>
    );
};

interface SuggestionCardsProps {
  onSelect: (suggestion: TravelSuggestion) => void;
  context?: 'initial' | 'follow-up';
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ onSelect, context = 'initial' }) => {
  const suggestions = useMemo(() => getShuffledSuggestions(4), []);

  const titles = {
    initial: 'Sem ideias? Comece por aqui!',
    'follow-up': 'Que tal um novo destino?'
  };

  return (
    <div className={context === 'initial' ? "mt-8 pt-8 border-t border-gray-200" : ""}>
        <h3 className="text-xl font-bold text-gray-800 text-center mb-6">{titles[context]}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.destination} suggestion={suggestion} onSelect={onSelect} />
            ))}
        </div>
    </div>
  );
};

export default SuggestionCards;
