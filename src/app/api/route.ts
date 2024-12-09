import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  try {
    // Configuración de conexión a la base de datos
    const dbConfig = {
      user: 'Ghost',           // Usar una cadena vacía si no está definido
      password: 'Ghost',    // Usar una cadena vacía si no está definido
      server: '127.0.0.1', // Default a 'localhost'
      database: 'PRUEBA3',        // Asegúrate de que la base de datos esté definida
      port: 1433,                                 // Asegúrate de que el puerto sea correcto
      options: {
        encrypt: false,
        trustServerCertificate: true,            // Usar true si estás usando un certificado autofirmado
      },
    };

    // Verificación de las credenciales antes de intentar la conexión
    if (!dbConfig.user || !dbConfig.password || !dbConfig.database) {
      return NextResponse.json({
        error: 'Faltan credenciales o configuración en las variables de entorno',
      }, { status: 400 });
    }

    // Crear la conexión
    const pool = await sql.connect(dbConfig);

    // Consulta SQL simple para obtener productos de la tabla "productos"
    const result = await pool.request().query('SELECT * FROM productos');

    // Devolver los productos obtenidos
    return NextResponse.json(result.recordset, { status: 200 });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json({
      error: 'Error al obtener productos',
      detalle: error instanceof Error ? error.message : 'Error desconocido',
    }, { status: 500 });
  }
}
