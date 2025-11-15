
import React from 'react';
import { PlaneIcon } from './icons/PlaneIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center text-center">
        <PlaneIcon className="w-10 h-10 text-blue-600 mr-3" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Planejador de Viagens IA
          </h1>
          <p className="text-sm text-gray-500">
            Seu roteiro perfeito, criado em segundos.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
