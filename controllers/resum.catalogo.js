// Importa el objeto 'pool' desde el módulo 'db.js', que probablemente contiene la configuración de conexión a la base de datos.
import { pool } from '../db.js';

// Función que obtiene y devuelve un resumen del catálogo desde la base de datos.
export const resumCatalogo = async (req, res) => {
    try {
        // Consulta SQL que realiza un JOIN en tres tablas para obtener información detallada.
        const query = `
            SELECT 
                RegistroContratos.Dato5 AS Tipo_de_Proceso,
                EstadoProceso.Nombre_Estado AS Estado_del_Proceso,
                AreaRequeriente.Nombre_Area AS Área_Requirente,
                RegistroContratos.Dato8 AS Administrador_de_Contratos
            FROM RegistroContratos
            JOIN AreaRequeriente ON RegistroContratos.AreaRequeriente_ID = AreaRequeriente.ID_Area
            JOIN EstadoProceso ON RegistroContratos.EstadoProceso_ID = EstadoProceso.ID_Estado;
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


