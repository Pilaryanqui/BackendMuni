import {pool} from '../db.js'

///-----------DATOS DE Area Requeriente------

// Función para crear una nueva área requeriente
export const CreateArea = async (req, res) => {
    try {
        // Extrae el nombre del área del cuerpo de la solicitud
        const { Nombre_Area } = req.body;

        // Realiza la inserción en la base de datos
        const [result] = await pool.query('INSERT INTO AreaRequeriente (Nombre_Area) VALUES (?)', [Nombre_Area]);

        // Devuelve la respuesta JSON con la información del área creada
        res.json({
            id: result.insertId,
            Nombre_Area
        });
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error("Error al insertar Datos en Area Requeriente:", error);
        return res.status(500).json({ message: error.message });
    }
};


// Función para obtener una vista general de todas las áreas requerientes
export const vistasArea = async (req, res) => {
    try {
        // Realiza una consulta a la base de datos para obtener todos los registros de Área Requeriente
        const [result] = await pool.query('SELECT * FROM AreaRequeriente');

        // Imprime un mensaje en la consola indicando que la consulta SQL se ejecutó con éxito
        console.log('VS_Area Consulta SQL ejecutada con éxito:');

        // Devuelve los resultados de la consulta en formato JSON
        res.json(result);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error(error);

        // Devuelve un mensaje de error al cliente
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para actualizar información de un área requeriente por ID
export const updateArea = async (req, res) => {
    try {
        // Realiza una actualización en la base de datos utilizando el cuerpo de la solicitud y el ID proporcionado
        const [result] = await pool.query("UPDATE AreaRequeriente SET ? WHERE ID_Area =?", [
            req.body,          // Utiliza el cuerpo de la solicitud para los nuevos datos
            req.params.id      // Utiliza el parámetro de la solicitud para el ID del área a actualizar
        ]);

        // Devuelve la respuesta JSON con la información de la actualización
        res.json(result);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error(error);

        // Devuelve un mensaje de error al cliente
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para eliminar un área requeriente por ID
export const deleteArea = async (req, res) => {
    try {
        // Realiza una eliminación en la base de datos utilizando el ID proporcionado
        const [result] = await pool.query("DELETE FROM AreaRequeriente WHERE ID_Area=?", [req.params.id]);

        // Verifica si se eliminó algún registro (affectedRows === 0 significa que no se encontró el área requeriente)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "El Área Requeriente no fue encontrada" });
        }

        // Devuelve un código de estado 204 (Sin contenido) indicando que la eliminación fue exitosa
        return res.sendStatus(204);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error(error);

        // Devuelve un mensaje de error al cliente
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para ver detalles específicos de un área requeriente por ID
export const viewArea = async (req, res) => {
    try {
        // Realiza una consulta a la base de datos para obtener el área requeriente con el ID proporcionado
        const [result] = await pool.query('SELECT * FROM AreaRequeriente WHERE ID_Area = ?', [req.params.id]);

        // Verifica si se encontró algún registro (length === 0 significa que no se encontró el área requeriente)
        if (result.length === 0) {
            return res.status(404).json({ message: "Registro de Área no fue encontrado" });
        }

        // Devuelve los detalles del área requeriente encontrado
        res.json(result[0]);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error(error);

        // Devuelve un mensaje de error al cliente
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
