import React, { useState, useEffect } from 'react';
import type { TravelPreferences, TravelSuggestion } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
// FIX: Import SparklesIcon to be used in the submit button.
import { SparklesIcon } from './icons/SparklesIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface TravelFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading: boolean;
  suggestion: TravelSuggestion | null;
  onSuggestionApplied: () => void;
}

const interestsOptions = [
  'Natureza', 'História', 'Gastronomia', 'Vida Noturna', 'Viagem barata', 'Cultura', 'Arte', 'Praia', 'Aventura', 'Romântico'
];

const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading, suggestion, onSuggestionApplied }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState<number>(3);
  const [interests, setInterests] = useState<string[]>([]);
  const [month, setMonth] = useState('');
  const [budget, setBudget] = useState<number | ''>('');
  const [travelerType, setTravelerType] = useState<'sozinho' | 'casal' | 'família' | 'amigos' | ''>('');
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    if (suggestion) {
      setDestination(suggestion.destination);
      setDuration(suggestion.duration);
      setInterests(suggestion.interests);
      onSuggestionApplied();
    }
  }, [suggestion, onSuggestionApplied]);

  const handleInterestToggle = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      alert('Por favor, informe o destino da viagem.');
      return;
    }
    onSubmit({ destination, duration, interests, month, budget, travelerType });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destino</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Para onde vamos? Ex: Paris, França"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duração (dias)</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                    className="absolute left-0 top-0 h-full px-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    aria-label="Diminuir dias"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                    className="w-full text-center px-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                    type="button"
                    onClick={() => setDuration(prev => prev + 1)}
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    aria-label="Aumentar dias"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                </button>
            </div>
          </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Principais Interesses</label>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
                {interestsOptions.map(option => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => handleInterestToggle(option)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            interests.includes(option)
                                ? 'bg-blue-600 text-white border-blue-700'
                                : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500'
                        }`}
                        aria-pressed={interests.includes(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
                type="button"
                onClick={() => setShowOptional(!showOptional)}
                className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none"
                aria-expanded={showOptional}
              >
                <span>Adicionar Detalhes (Opcional)</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${showOptional ? 'transform rotate-180' : ''}`} />
            </button>
            
            {showOptional && (
                <div className="mt-6 space-y-6 animate-fade-in-down">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mês da Viagem</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {months.map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMonth(prev => prev === m ? '' : m)}
                                className={`w-full text-center px-2 py-2 rounded-md text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    month === m
                                        ? 'bg-blue-600 text-white border-blue-700'
                                        : 'bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500'
                                }`}
                                aria-pressed={month === m}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Orçamento</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">R$</span>
                            </div>
                            <input
                                type="number"
                                id="budget"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value ? parseInt(e.target.value, 10) : '')}
                                placeholder="2000"
                                min="0"
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 dark:placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="travelerType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Viajante</label>
                        <div className="relative">
                        <select
                            id="travelerType"
                            value={travelerType}
                            onChange={(e) => setTravelerType(e.target.value as any)}
                            className="w-full px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 appearance-none"
                        >
                            <option value="">Selecione...</option>
                            <option value="sozinho">Sozinho</option>
                            <option value="casal">Casal</option>
                            <option value="família">Família</option>
                            <option value="amigos">Amigos</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.25 3.25a.75.75 0 11-1.06 1.06L10 4.81 7.28 7.53a.75.75 0 01-1.06-1.06l3.25-3.25A.75.75 0 0110 3zM7.28 12.47a.75.75 0 011.06 0L10 15.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0l-3.25-3.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>


        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Gerando Roteiro...
              </>
            ) : (
               <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Criar Meu Roteiro
               </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;