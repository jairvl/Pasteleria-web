'use client';
import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import Cliente from "@/Components/Empleados";
import Empleados from "@/Components/Empleados";
import Inventario from "@/Components/Inventario";


export default function Home() {
  // Estado que maneja si el Sidebar está expandido o no
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
  console.log("DB_SERVER:", process.env.DB_SERVER);
  console.log("DB_DATABASE:", process.env.DB_DATABASE);
  console.log("DB_PORT:", process.env.DB_PORT);


  return (
    <>
      {/* Header que recibe el estado del sidebar como prop */}
      <Header sideExp={sidebarExpanded} />

      {/* Sidebar recibe el estado y las funciones como props */}
      {/* <Empleados sideExp={sidebarExpanded}/> */}

      <Inventario sideExp={sidebarExpanded}/>
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />

      {/* Contenido principal */}
    </>

  );
}
