import {pool} from '../db.js'

// Función para crear datos en el registro de contratos
export const createCatalogo = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, AreaRequeriente_ID, Dato8, Dato9, Dato10, Dato11, Dato12, Dato13, Dato14, Dato15, EstadoProceso_ID, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34 } = req.body;

        // Realiza la inserción en la base de datos con los datos proporcionados
        const [result] = await pool.query('INSERT INTO RegistroContratos(Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, AreaRequeriente_ID, Dato8, Dato9, Dato10, Dato11, Dato12, Dato13, Dato14, Dato15, EstadoProceso_ID, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, AreaRequeriente_ID, Dato8, Dato9, Dato10, Dato11, Dato12, Dato13, Dato14, Dato15, EstadoProceso_ID, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34]
        );

        // Devuelve la respuesta JSON con la información del nuevo registro en el catálogo
        res.json({
            id: result.insertId,
            Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, AreaRequeriente_ID, Dato8, Dato9, Dato10, Dato11, Dato12, Dato13, Dato14, Dato15, EstadoProceso_ID, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34
        });
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error("Error al insertar datos:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Función para obtener una vista general de los registros en el catálogo
export const vistasCatalogo = async (req, res) => {
    try {
        // Realiza una consulta a la base de datos para obtener información detallada de los registros
        const [result] = await pool.query(`
            SELECT 
                RegistroContratos.*,
                AreaRequeriente.Nombre_Area,
                EstadoProceso.Nombre_Estado
            FROM 
                RegistroContratos
            JOIN 
                AreaRequeriente ON RegistroContratos.AreaRequeriente_ID = AreaRequeriente.ID_Area
            JOIN 
                EstadoProceso ON RegistroContratos.EstadoProceso_ID = EstadoProceso.ID_Estado
        `);

        // Imprime un mensaje en la consola indicando que la consulta SQL se ejecutó con éxito
        console.log('Consulta SQL ejecutada con éxito:');

        // Devuelve los resultados de la consulta en formato JSON
        res.json(result);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error(error);

        // Devuelve un mensaje de error al cliente
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para actualizar información de un registro en el catálogo por ID
export const actua_Catalogo = async (req, res) => {
    try {
        // Realiza una actualización en la base de datos utilizando el cuerpo de la solicitud y el ID proporcionado
        const [result] = await pool.query("UPDATE RegistroContratos SET ? WHERE IdCont =?", [
            req.body,          // Utiliza el cuerpo de la solicitud para los nuevos datos
            req.params.id      // Utiliza el parámetro de la solicitud para el ID del registro a actualizar
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

// Función para eliminar un registro en el catálogo por ID
export const deleteCatalogo = async (req, res) => {
    try {
        // Realiza una eliminación en la base de datos utilizando el ID proporcionado
        const [result] = await pool.query("DELETE FROM RegistroContratos WHERE IdCont=?", [req.params.id]);

        // Verifica si se eliminó algún registro (affectedRows === 0 significa que no se encontró el registro)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "El Registro no fue encontrado" });
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

// Función para ver detalles específicos de un registro en el catálogo por ID
export const viewCatalogo = async (req, res) => {
    try {
        // Realiza una consulta a la base de datos para obtener el registro con el ID proporcionado
        const [result] = await pool.query('SELECT * FROM RegistroContratos WHERE IdCont = ?', [req.params.id]);

        // Verifica si se encontró algún registro (length === 0 significa que no se encontró el registro)
        if (result.length === 0) {
            return res.status(404).json({ message: "Registro no fue encontrado" });
        }

        // Devuelve los detalles del registro encontrado
        res.json(result[0]);
    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos
        console.error(error);

        // Devuelve un mensaje de error al cliente
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
