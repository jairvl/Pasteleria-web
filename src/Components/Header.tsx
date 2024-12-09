'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface HeaderProps {
  sideExp: boolean;
}

const Header: React.FC<HeaderProps> = ({ sideExp }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Actualiza el estado con el valor del input
  };

  const handleSearch = () => {
    console.log('Buscar:', searchTerm); // Aquí puedes integrar la lógica para hacer la búsqueda
  };

  return (
    <div
  className="float-end border transition-all duration-300 h-[80px]"
  style={{
    width: sideExp ? 'calc(100% - 300px)' : 'calc(100% - 80px)',
  }}
>
  {/* Contenedor para centrar la barra de búsqueda */}
  <div className="flex items-center justify-start h-full">
    {/* Barra de búsqueda */}
    <div className="flex border border-gray-300 rounded-3xl w-64 items-center p-1 m-6">
      <button onClick={handleSearch} className="ml-2 text-blue-800">
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full outline-none p-2"
      />
    </div>
  </div>
</div>

  );
}

export default Header;
