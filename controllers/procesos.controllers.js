import {pool} from '../db.js'

///-----------DATOS DE PROCESO------
// Función para crear un nuevo estado de proceso en la tabla EstadoProceso de la base de datos.
export const createProceso = async (req, res) => {
    try {
        // Extrae el nombre del estado del cuerpo de la solicitud.
        const { Nombre_Estado } = req.body;

        // Realiza una inserción en la base de datos con el nombre del estado proporcionado.
        const [result] = await pool.query('INSERT INTO EstadoProceso (Nombre_Estado) VALUES (?)', [Nombre_Estado]);

        // Devuelve una respuesta JSON con el ID del estado de proceso recién insertado y el nombre del estado.
        res.json({
            id: result.insertId,
            Nombre_Estado
        });
    } catch (error) {
        // Maneja cualquier error durante la inserción de datos.
        console.error("Error al insertar Datos en Proceso:", error);

        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: error.message });
    }
};



// Función para obtener y devolver todos los estados de proceso desde la tabla EstadoProceso de la base de datos.
export const vistasProceso = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de EstadoProceso.
        const [result] = await pool.query('SELECT * FROM EstadoProceso');

        // Imprime un mensaje de éxito en la consola junto con la consulta ejecutada.
        console.log('VS_Proceso Consulta SQL ejecutada con éxito:');

        // Devuelve los resultados como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la ejecución de la consulta.
        console.error(error);

        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Función para actualizar un estado de proceso en la tabla EstadoProceso de la base de datos.
export const updateProceso = async (req, res) => {
    try {
        // Realiza la actualización en la base de datos, utilizando los datos del cuerpo de la solicitud y el ID del estado obtenido de los parámetros de la URL.
        const [result] = await pool.query("UPDATE EstadoProceso SET ? WHERE ID_Estado = ?", [
            req.body,           // Datos a actualizar obtenidos del cuerpo de la solicitud.
            req.params.id       // ID del estado que se va a actualizar obtenido de los parámetros de la URL.
        ]);

        // Devuelve el resultado de la actualización como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la actualización de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};




// Función para eliminar un estado de proceso de la tabla EstadoProceso de la base de datos.
export const deleteProceso = async (req, res) => {
    try {
        // Realiza la eliminación en la base de datos, utilizando el ID del estado obtenido de los parámetros de la URL.
        const [result] = await pool.query("DELETE FROM EstadoProceso WHERE ID_Estado = ?", [req.params.id]);

        // Verifica si algún registro fue afectado por la operación de eliminación.
        if (result.affectedRows === 0) {
            // Si no se encontró ningún estado con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "El Proceso no fue encontrado" });
        }

        // Si la eliminación fue exitosa y afectó al menos un estado, devuelve un estado 204 (Sin contenido).
        return res.sendStatus(204);
    } catch (error) {
        // Maneja cualquier error durante la eliminación de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};




// Función para obtener y devolver detalles específicos de un estado de proceso en la tabla EstadoProceso de la base de datos.
export const viewProceso = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de EstadoProceso donde el ID_Estado coincide con el proporcionado en los parámetros de la URL.
        const [result] = await pool.query('SELECT * FROM EstadoProceso WHERE ID_Estado = ?', [req.params.id]);

        // Verifica si algún estado de proceso fue devuelto por la consulta.
        if (result.length === 0) {
            // Si no se encontró ningún estado con el ID_Estado especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "Registro no fue encontrado" });
        }

        // Devuelve los detalles del estado de proceso encontrado como respuesta JSON al cliente.
        res.json(result[0]);
    } catch (error) {
        // Maneja cualquier error durante la consulta de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
