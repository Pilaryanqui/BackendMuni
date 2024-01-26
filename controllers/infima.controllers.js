// Importa el objeto 'pool' desde el módulo 'db.js', que contiene la configuración de conexión a la base de datos.
import {pool} from '../db.js'

// Función para crear un nuevo registro en la tabla 'DatosInfima'.
export const createInfima = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud.
        const { Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9 } = req.body;

        // Realiza una inserción en la base de datos con los datos proporcionados.
        const [result] = await pool.query('INSERT INTO DatosInfima(Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9) VALUES (?,?,?,?,?,?,?,?,?)',
            [Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9]
        );

        // Devuelve una respuesta JSON con el ID del registro recién insertado y algunos datos del registro.
        res.json({
            id: result.insertId,
            Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9
        });
    } catch (error) {
        // Maneja cualquier error durante la inserción de datos.
        console.error("Error al insertar datos en el registro infima:", error);

        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: error.message });
    }
};



// Función para obtener y devolver todos los registros de la tabla 'DatosInfima' ordenados por la fecha de creación de forma ascendente.
export const vistasInfima = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de la tabla 'DatosInfima' y ordenar los resultados por CreaA de forma ascendente.
        const [result] = await pool.query('SELECT * FROM DatosInfima ORDER BY CreaA ASC');
        
        // Imprime un mensaje de éxito en la consola junto con la consulta ejecutada.
        console.log('VS_I Consulta SQL ejecutada con éxito:');
        
        // Devuelve los resultados como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la ejecución de la consulta.
        console.error(error);
        
        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para actualizar un registro en la tabla 'DatosInfima' de la base de datos.
export const updateInfima = async (req, res) => {
    try {
        // Realiza la actualización en la base de datos, utilizando los datos del cuerpo de la solicitud y el ID del registro obtenido de los parámetros de la URL.
        const [result] = await pool.query("UPDATE DatosInfima SET ? WHERE id = ?", [
            req.body,           // Datos a actualizar obtenidos del cuerpo de la solicitud.
            req.params.id       // ID del registro que se va a actualizar obtenido de los parámetros de la URL.
        ]);

        // Devuelve el resultado de la actualización como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la actualización de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para eliminar un registro de la tabla 'DatosInfima' de la base de datos.
export const deleteInfimo = async (req, res) => {
    try {
        // Realiza la eliminación en la base de datos, utilizando el ID del registro obtenido de los parámetros de la URL.
        const [result] = await pool.query("DELETE FROM DatosInfima WHERE id=?", [req.params.id]);

        // Verifica si algún registro fue afectado por la operación de eliminación.
        if (result.affectedRows === 0) {
            // Si no se encontró ningún registro con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "El Registro Infima no fue encontrado" });
        }

        // Si la eliminación fue exitosa y afectó al menos un registro, devuelve un estado 204 (Sin contenido).
        return res.sendStatus(204);
    } catch (error) {
        // Maneja cualquier error durante la eliminación de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};




// Función para obtener y devolver detalles específicos de un registro en la tabla 'DatosInfima'.
export const viewInfima = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de la tabla 'DatosInfima' donde el ID coincide con el proporcionado en los parámetros de la URL.
        const [result] = await pool.query('SELECT * FROM DatosInfima WHERE id = ?', [req.params.id]);

        // Verifica si algún registro fue devuelto por la consulta.
        if (result.length === 0) {
            // Si no se encontró ningún registro con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "Registro Infima no fue encontrado" });
        }

        // Devuelve los detalles del registro encontrado como respuesta JSON al cliente.
        res.json(result[0]);
    } catch (error) {
        // Maneja cualquier error durante la consulta de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};





