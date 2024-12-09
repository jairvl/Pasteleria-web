import React, { useState } from 'react';

interface EmpleadosProps {
  sideExp: boolean;
}

interface Empleado {
  id_empleado: number;
  nombre_empleado: string;
  apellido_empleado: string;
  telefono_empleado: string;
  email_empleado: string;
  cargo: string;
  fecha_ingreso: string;
}

const Empleados: React.FC<EmpleadosProps> = ({ sideExp }) => {
  // Estado para la lista de empleados
  const [empleados, setEmpleados] = useState<Empleado[]>([
    {
      id_empleado: 1,
      nombre_empleado: 'Juan',
      apellido_empleado: 'Pérez',
      telefono_empleado: '555-1234',
      email_empleado: 'juan.perez@pasteleria.com',
      cargo: 'Pastelero',
      fecha_ingreso: '2023-01-15'
    },
    {
      id_empleado: 2,
      nombre_empleado: 'María',
      apellido_empleado: 'García',
      telefono_empleado: '555-5678',
      email_empleado: 'maria.garcia@pasteleria.com',
      cargo: 'Cajera',
      fecha_ingreso: '2022-11-20'
    }
  ]);

  // Estado para el filtro
  const [filtro, setFiltro] = useState('');

  // Estado para el nuevo empleado
  const [nuevoEmpleado, setNuevoEmpleado] = useState<Partial<Empleado>>({});

  // Estado para controlar la visibilidad del modal
  const [modalAbierto, setModalAbierto] = useState(false);

  // Filtrar empleados
  const empleadosFiltrados = empleados.filter(empleado => 
    Object.values(empleado).some(valor => 
      valor.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  // Manejar cambios en el formulario de nuevo empleado
  const handleNuevoEmpleadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar nuevo empleado
  const handleAgregarEmpleado = () => {
    if (Object.keys(nuevoEmpleado).length === 7) {
      const empleadoConId = {
        ...nuevoEmpleado,
        id_empleado: empleados.length + 1
      } as Empleado;
      
      setEmpleados([...empleados, empleadoConId]);
      setNuevoEmpleado({});
      setModalAbierto(false);
    } else {
      alert('Por favor complete todos los campos');
    }
  };

  return (
    <div 
      className='float-end duration-300'
      style={{
        width: sideExp ? 'calc(100% - 300px)' : 'calc(100% - 80px)',
        height: 'calc(100vh - 80px)',
      }}
    >
      <div className="p-4 h-full overflow-auto">
        <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">Gestión de Empleados</h2>
            
            {/* Barra de búsqueda */}
            <input 
              type="text"
              placeholder="Buscar empleados..." 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border rounded px-2 py-1 w-1/3"
            />

            {/* Botón para abrir modal */}
            <button 
              onClick={() => setModalAbierto(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Empleado
            </button>
          </div>

          {/* Tabla de empleados */}
          <div className="overflow-x-auto flex-grow">
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Nombre</th>
                  <th className="p-2 text-left">Apellido</th>
                  <th className="p-2 text-left">Teléfono</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Cargo</th>
                  <th className="p-2 text-left">Fecha de Ingreso</th>
                </tr>
              </thead>
              <tbody>
                {empleadosFiltrados.map((empleado) => (
                  <tr key={empleado.id_empleado} className="border-b hover:bg-gray-50">
                    <td className="p-2">{empleado.id_empleado}</td>
                    <td className="p-2">{empleado.nombre_empleado}</td>
                    <td className="p-2">{empleado.apellido_empleado}</td>
                    <td className="p-2">{empleado.telefono_empleado}</td>
                    <td className="p-2">{empleado.email_empleado}</td>
                    <td className="p-2">{empleado.cargo}</td>
                    <td className="p-2">{empleado.fecha_ingreso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para agregar empleado */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Empleado</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Nombre</label>
                <input 
                  type="text"
                  name="nombre_empleado"
                  value={nuevoEmpleado.nombre_empleado || ''}
                  onChange={handleNuevoEmpleadoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Apellido</label>
                <input 
                  type="text"
                  name="apellido_empleado"
                  value={nuevoEmpleado.apellido_empleado || ''}
                  onChange={handleNuevoEmpleadoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Teléfono</label>
                <input 
                  type="text"
                  name="telefono_empleado"
                  value={nuevoEmpleado.telefono_empleado || ''}
                  onChange={handleNuevoEmpleadoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input 
                  type="email"
                  name="email_empleado"
                  value={nuevoEmpleado.email_empleado || ''}
                  onChange={handleNuevoEmpleadoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Cargo</label>
                <input 
                  type="text"
                  name="cargo"
                  value={nuevoEmpleado.cargo || ''}
                  onChange={handleNuevoEmpleadoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Fecha de Ingreso</label>
                <input 
                  type="date"
                  name="fecha_ingreso"
                  value={nuevoEmpleado.fecha_ingreso || ''}
                  onChange={handleNuevoEmpleadoChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button 
                onClick={() => setModalAbierto(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAgregarEmpleado}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;