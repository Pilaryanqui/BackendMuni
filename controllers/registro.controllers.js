import {pool} from '../db.js'


// Función para crear nuevos registros en la tabla DatosRegistro de la base de datos.
export const createDatos = async (req, res) =>{
    try {
        // Extrae los datos del cuerpo de la solicitud.
        const {Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9, Dato10, Dato11,Dato12, Dato13, Dato14, Dato15, Dato16, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34, Dato35, Dato36, Dato37, Dato38, Dato39, Dato40, Dato41, Dato42, Dato43}=req.body
        // Realiza una inserción en la base de datos con los datos proporcionados.
        const [result] = await pool.query('INSERT INTO DatosRegistro(Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9, Dato10, Dato11,Dato12, Dato13, Dato14, Dato15, Dato16, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34, Dato35, Dato36, Dato37, Dato38, Dato39, Dato40, Dato41, Dato42, Dato43) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9, Dato10, Dato11,Dato12, Dato13, Dato14, Dato15, Dato16, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34, Dato35, Dato36, Dato37, Dato38, Dato39, Dato40, Dato41, Dato42, Dato43]
        );

        // Devuelve una respuesta JSON con el ID del registro recién insertado y los datos proporcionados.
        res.json({
            id: result.insertId,
            Dato1, Dato2, Dato3, Dato4, Dato5, Dato6, Dato7, Dato8, Dato9, Dato10, Dato11,Dato12, Dato13, Dato14, Dato15, Dato16, Dato17, Dato18, Dato19, Dato20, Dato21, Dato22, Dato23, Dato24, Dato25, Dato26, Dato27, Dato28, Dato29, Dato30, Dato31, Dato32, Dato33, Dato34, Dato35, Dato36, Dato37, Dato38, Dato39, Dato40, Dato41, Dato42, Dato43
        });
    } catch (error) {
        // Maneja cualquier error durante la inserción de datos.
        console.error("Error al insertar datos:", error);
        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: error.message });
    }
    

};

// Función para obtener y devolver todas las filas de DatosRegistro ordenadas por fechaA de forma ascendente.
export const vistasReg = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todas las columnas de DatosRegistro y ordenar los resultados por fechaA de forma ascendente.
        const [result] = await pool.query('SELECT * FROM DatosRegistro ORDER BY fechaA ASC');
        // Imprime un mensaje de éxito en la consola junto con la consulta ejecutada.
        console.log('Consulta SQL ejecutada con éxito:');
        // Devuelve los resultados como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la ejecución de la consulta.
        console.error(error);
        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para actualizar un registro en la tabla DatosRegistro de la base de datos.
export const actua_Regist = async (req, res) => {
    try {
        // Realiza una actualización en la base de datos, utilizando los datos del cuerpo de la solicitud y el parámetro de la URL (id).
        const [result] = await pool.query("UPDATE DatosRegistro SET ? WHERE id =?", [
            req.body,         // Datos a actualizar obtenidos del cuerpo de la solicitud.
            req.params.id     // ID del registro que se va a actualizar obtenido de los parámetros de la URL.
        ]);

        // Devuelve el resultado de la actualización como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la actualización de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Función para eliminar un registro de la tabla DatosRegistro de la base de datos.
export const deleteRegistro = async (req, res) => {
    try {
        // Realiza la eliminación en la base de datos, utilizando el ID obtenido de los parámetros de la URL.
        const [result] = await pool.query("DELETE FROM DatosRegistro WHERE id=?", [req.params.id]);

        // Verifica si algún registro fue afectado por la operación de eliminación.
        if (result.affectedRows === 0) {
            // Si no se encontró ningún registro con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "El Registro no fue encontrado" });
        }

        // Si la eliminación fue exitosa y afectó al menos un registro, devuelve un estado 204 (Sin contenido).
        return res.sendStatus(204);
    } catch (error) {
        // Maneja cualquier error durante la eliminación de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para obtener y devolver detalles específicos de un registro en la tabla DatosRegistro de la base de datos.
export const viewRegist = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de DatosRegistro donde el ID coincide con el proporcionado en los parámetros de la URL.
        const [result] = await pool.query('SELECT * FROM DatosRegistro WHERE id = ?', [req.params.id]);

        // Verifica si algún registro fue devuelto por la consulta.
        if (result.length === 0) {
            // Si no se encontró ningún registro con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        // Devuelve los detalles del registro encontrado como respuesta JSON al cliente.
        res.json(result[0]);
    } catch (error) {
        // Maneja cualquier error durante la consulta de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
