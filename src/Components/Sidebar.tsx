'use client';
import React, { useState } from 'react';
import { RiDashboard2Fill } from 'react-icons/ri';
import { FaUserPlus, FaWallet } from 'react-icons/fa';
import { MdInventory, MdHelp } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import Header from './Header';

interface SidebarProps {
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>; // Tipo de la función setState
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarExpanded, setSidebarExpanded }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [mouseActive, setMouseActive] = useState(false);

  // Función para manejar el cambio de fondo
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  // Manejo de eventos de mouse
  const handleMouseEnter = () => {
    setMouseActive(true);
    setSidebarExpanded(true); // Expande el sidebar
  };

  const handleMouseLeave = () => {
    setMouseActive(false);
    setSidebarExpanded(false); // Reduce el sidebar
  };

  return (
    <>
      <div
        className={`h-screen ${
          sidebarExpanded ? 'w-[300px]' : 'w-[80px]'
        } flex flex-col border drop-shadow-2xl transition-all duration-300`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="flex justify-center p-6 m-4">
          <p
            className={`text-4xl font-bold text-blue-800 ${
              !sidebarExpanded ? 'text-[1.5rem]' : ''
            }`}
          >
            JVL
          </p>
        </div>

        {/* Menú principal */}
        <div className="flex-grow text-xl">
          <ul>
            <li
              className={`w-full h-12 ${
                activeItem === 'dashboard' ? 'bg-blue-800 text-white' : 'text-blue-800'
              } transition-colors`}
            >
              <a
                href="#"
                className={`flex items-center space-x-4 p-3 ${!mouseActive ? 'text-2xl justify-center' : ''}`}
                onClick={() => handleItemClick('dashboard')}
              >
                <RiDashboard2Fill />
                {sidebarExpanded && <span className="ml-2">Dashboard</span>}
              </a>
            </li>
            <li
              className={`w-full h-12 ${
                activeItem === 'client' ? 'bg-blue-800 text-white' : 'text-blue-800'
              } transition-colors`}
            >
              <a
                href="#"
                className={`flex items-center space-x-4 p-3 ${!mouseActive ? 'text-2xl justify-center' : ''}`}
                onClick={() => handleItemClick('client')}
              >
                <FaUserPlus />
                {sidebarExpanded && <span className="ml-2">Cliente</span>}
              </a>
            </li>
            <li
              className={`w-full h-12 ${
                activeItem === 'inventario' ? 'bg-blue-800 text-white' : 'text-blue-800'
              } transition-colors`}
            >
              <a
                href="#"
                className={`flex items-center space-x-4 p-3 ${!mouseActive ? 'text-2xl justify-center' : ''}`}
                onClick={() => handleItemClick('inventario')}
              >
                <MdInventory />
                {sidebarExpanded && <span className="ml-2">Inventario</span>}
              </a>
            </li>
            <li
              className={`w-full h-12 ${
                activeItem === 'venta' ? 'bg-blue-800 text-white' : 'text-blue-800'
              } transition-colors`}
            >
              <a
                href="#"
                className={`flex items-center space-x-4 p-3 ${!mouseActive ? 'text-2xl justify-center' : ''}`}
                onClick={() => handleItemClick('venta')}
              >
                <FaWallet />
                {sidebarExpanded && <span className="ml-2">Venta</span>}
              </a>
            </li>
          </ul>
        </div>

        {/* Configuración y ayuda (en la parte inferior) */}
        <div className="mt-auto">
          <ul className="space-y-4">
            <li
              className={`w-full h-12 ${
                activeItem === 'configuracion' ? 'bg-blue-800 text-white' : 'text-blue-800'
              } transition-colors rounded-md`}
            >
              <a
                href="#"
                className={`flex items-center space-x-4 p-3 ${!mouseActive ? 'text-2xl justify-center' : ''}`}
                onClick={() => handleItemClick('configuracion')}
              >
                <IoSettingsSharp />
                {sidebarExpanded && <span className="ml-2">Configuracion</span>}
              </a>
            </li>
            <li
              className={`w-full h-12 ${
                activeItem === 'help' ? 'bg-blue-800 text-white' : 'text-blue-800'
              } transition-colors rounded-md`}
            >
              <a
                href="#"
                className={`flex items-center space-x-4 p-3 ${!mouseActive ? 'text-2xl justify-center' : ''}`}
                onClick={() => handleItemClick('help')}
              >
                <MdHelp />
                {sidebarExpanded && <span className="ml-2">Help us</span>}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
