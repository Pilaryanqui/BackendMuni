// Importa el objeto 'pool' desde el módulo 'db.js', que presumiblemente contiene la configuración de conexión a la base de datos.
import { pool } from '../db.js';

// Función que obtiene y devuelve un resumen de registros desde la base de datos.
export const resumRegistro = async (req, res) => {
    try {
        // Consulta SQL para seleccionar ciertos campos de la tabla 'DatosRegistro'.
        const query = `
            SELECT 
                Dato5 AS 'Tipo de Proceso',
                Dato15 AS 'Estado del Proceso',
                Dato7 AS 'Área Requirente',
                Dato8 AS 'Administrador de Contratos'
            FROM DatosRegistro;
        `;
        // Ejecuta la consulta SQL y espera el resultado.
        const [result] = await pool.query(query);
        
        // Imprime un mensaje de éxito en la consola junto con la consulta ejecutada.
        console.log('Consulta SQL ejecutada con éxito:');
        
        // Envia el resultado como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la ejecución de la consulta.
        console.error(error);
        
        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



