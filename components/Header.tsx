
import React from 'react';
import { PlaneIcon } from './icons/PlaneIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex items-center">
          <PlaneIcon className="w-10 h-10 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
              Planejador de Viagens IA
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Seu roteiro perfeito, criado em segundos.
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;