import React, { useState } from 'react';

// Interfaces para tipos de datos
interface Producto {
  id_producto: number;
  nombre_producto: string;
  id_categoria: number;
  descripcion?: string;
  precio_unitario: number;
  id_proveedor: number;
}

interface Inventario {
  id_inventario?: number;
  id_producto: number;
  cantidad_entrada: number;
  cantidad_actual: number;
  fecha_entrada: string;
  nombre_producto?: string;
}

interface InventarioProps {
  sideExp: boolean;
}

const Inventario: React.FC<InventarioProps> = ({ sideExp }) => {
  // Estados de ejemplo para categorías y proveedores (normalmente vendrían de una base de datos)
  const [categorias] = useState([
    { id_categoria: 1, nombre_categoria: 'Pasteles' },
    { id_categoria: 2, nombre_categoria: 'Postres' },
    { id_categoria: 3, nombre_categoria: 'Panes' }
  ]);

  const [proveedores] = useState([
    { id_proveedor: 1, nombre_proveedor: 'Proveedor A' },
    { id_proveedor: 2, nombre_proveedor: 'Proveedor B' },
    { id_proveedor: 3, nombre_proveedor: 'Proveedor C' }
  ]);

  // Estado para productos e inventario
  const [productos, setProductos] = useState<Producto[]>([
    {
      id_producto: 1,
      nombre_producto: 'Pastel de Chocolate',
      id_categoria: 1,
      descripcion: 'Pastel de chocolate con crema',
      precio_unitario: 25.50,
      id_proveedor: 1
    },
    {
      id_producto: 2,
      nombre_producto: 'Croissant',
      id_categoria: 3,
      descripcion: 'Croissant francés',
      precio_unitario: 3.50,
      id_proveedor: 2
    }
  ]);

  const [inventario, setInventario] = useState<Inventario[]>([
    {
      id_inventario: 1,
      id_producto: 1,
      cantidad_entrada: 50,
      cantidad_actual: 30,
      fecha_entrada: '2024-02-15',
      nombre_producto: 'Pastel de Chocolate'
    },
    {
      id_inventario: 2,
      id_producto: 2,
      cantidad_entrada: 100,
      cantidad_actual: 75,
      fecha_entrada: '2024-02-10',
      nombre_producto: 'Croissant'
    }
  ]);

  // Estados para filtros y modal
  const [filtro, setFiltro] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  
  // Estado para nuevo producto/inventario
  const [nuevoProducto, setNuevoProducto] = useState<Partial<Producto & Inventario>>({});

  // Filtrar inventario
  const inventarioFiltrado = inventario.filter(item => 
    Object.values(item).some(valor => 
      valor.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  // Manejar cambios en el formulario
  const handleNuevoItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: name === 'precio_unitario' || name === 'cantidad_entrada' ? parseFloat(value) : value
    }));
  };

  // Agregar nuevo producto e inventario
  const handleAgregarItem = () => {
    // Validación básica
    const camposRequeridos = [
      'nombre_producto', 'id_categoria', 'precio_unitario', 
      'id_proveedor', 'cantidad_entrada'
    ];
    
    const todosLosCamposLlenos = camposRequeridos.every(campo => 
      nuevoProducto[campo] !== undefined && nuevoProducto[campo] !== ''
    );

    if (todosLosCamposLlenos) {
      // Crear nuevo producto
      const productoNuevo: Producto = {
        id_producto: productos.length + 1,
        nombre_producto: nuevoProducto.nombre_producto!,
        id_categoria: nuevoProducto.id_categoria!,
        descripcion: nuevoProducto.descripcion,
        precio_unitario: nuevoProducto.precio_unitario!,
        id_proveedor: nuevoProducto.id_proveedor!
      };

      // Crear nuevo registro de inventario
      const inventarioNuevo: Inventario = {
        id_inventario: inventario.length + 1,
        id_producto: productoNuevo.id_producto,
        cantidad_entrada: nuevoProducto.cantidad_entrada!,
        cantidad_actual: nuevoProducto.cantidad_entrada!,
        fecha_entrada: new Date().toISOString().split('T')[0],
        nombre_producto: productoNuevo.nombre_producto
      };

      // Actualizar estados
      setProductos([...productos, productoNuevo]);
      setInventario([...inventario, inventarioNuevo]);
      
      // Resetear formulario
      setNuevoProducto({});
      setModalAbierto(false);
    } else {
      alert('Por favor complete todos los campos requeridos');
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
            <h2 className="text-xl font-semibold">Gestión de Inventario</h2>
            
            {/* Barra de búsqueda */}
            <input 
              type="text"
              placeholder="Buscar en inventario..." 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border rounded px-2 py-1 w-1/3"
            />

            {/* Botón para abrir modal */}
            <button 
              onClick={() => setModalAbierto(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Producto
            </button>
          </div>

          {/* Tabla de inventario */}
          <div className="overflow-x-auto flex-grow">
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">ID Producto</th>
                  <th className="p-2 text-left">Nombre</th>
                  <th className="p-2 text-left">Cantidad Entrada</th>
                  <th className="p-2 text-left">Cantidad Actual</th>
                  <th className="p-2 text-left">Fecha Entrada</th>
                  <th className="p-2 text-left">Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {inventarioFiltrado.map((item) => (
                  <tr key={item.id_inventario} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.id_producto}</td>
                    <td className="p-2">{item.nombre_producto}</td>
                    <td className="p-2">{item.cantidad_entrada}</td>
                    <td className="p-2">{item.cantidad_actual}</td>
                    <td className="p-2">{item.fecha_entrada}</td>
                    <td className="p-2">
                      {productos.find(p => p.id_producto === item.id_producto)?.precio_unitario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para agregar producto */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Producto</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Nombre del Producto</label>
                <input 
                  type="text"
                  name="nombre_producto"
                  value={nuevoProducto.nombre_producto || ''}
                  onChange={handleNuevoItemChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Categoría</label>
                <select
                  name="id_categoria"
                  value={nuevoProducto.id_categoria || ''}
                  onChange={handleNuevoItemChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre_categoria}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Proveedor</label>
                <select
                  name="id_proveedor"
                  value={nuevoProducto.id_proveedor || ''}
                  onChange={handleNuevoItemChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Seleccione un proveedor</option>
                  {proveedores.map(prov => (
                    <option key={prov.id_proveedor} value={prov.id_proveedor}>
                      {prov.nombre_proveedor}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Descripción (Opcional)</label>
                <input 
                  type="text"
                  name="descripcion"
                  value={nuevoProducto.descripcion || ''}
                  onChange={handleNuevoItemChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Precio Unitario</label>
                <input 
                  type="number"
                  name="precio_unitario"
                  step="0.01"
                  value={nuevoProducto.precio_unitario || ''}
                  onChange={handleNuevoItemChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">Cantidad de Entrada</label>
                <input 
                  type="number"
                  name="cantidad_entrada"
                  value={nuevoProducto.cantidad_entrada || ''}
                  onChange={handleNuevoItemChange}
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
                onClick={handleAgregarItem}
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

export default Inventario;