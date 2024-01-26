// Importa el objeto 'pool' desde el módulo 'db.js', que contiene la configuración de conexión a la base de datos.
import { pool } from '../db.js';

// Importa la biblioteca 'bcrypt' para el hash y la comparación de contraseñas.
import bcrypt from 'bcrypt';



// Función para crear un nuevo usuario en la tabla 'login' de la base de datos.
export const creat_user = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud.
        const { cedula, nombre, apellido, correoE, usuario, contrasena } = req.body;

        // Hashea la contraseña antes de almacenarla en la base de datos para mejorar la seguridad.
        const hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es el número de rondas de hashing

        // Realiza una inserción en la base de datos con los datos proporcionados y la contraseña hasheada.
        const [result] = await pool.query('INSERT INTO login(cedula, nombre, apellido, correoE, usuario, contrasena) VALUES (?,?,?,?,?,?)',
            [cedula, nombre, apellido, correoE, usuario, hashedPassword]
        );

        // Devuelve una respuesta JSON con el ID del usuario recién insertado y algunos datos del usuario.
        res.json({
            id: result.insertId,
            cedula,
            nombre,
            apellido,
            correoE,
        });
    } catch (error) {
        // Maneja cualquier error durante la creación del usuario.
        console.error(error);

        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Función para obtener y devolver todos los usuarios desde la tabla 'login' ordenados por la fecha de creación de forma ascendente.
export const vistas_user = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de la tabla 'login' y ordenar los resultados por createAt de forma ascendente.
        const [result] = await pool.query('SELECT * FROM login ORDER BY createAt ASC');
        
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





// Función para obtener y devolver detalles específicos de un usuario en la tabla 'login' de la base de datos.
export const vista_user = async (req, res) => {
    try {
        // Realiza una consulta SQL para seleccionar todos los campos de la tabla 'login' donde el ID coincide con el proporcionado en los parámetros de la URL.
        const [result] = await pool.query('SELECT * FROM login WHERE id = ?', [req.params.id]);

        // Verifica si algún usuario fue devuelto por la consulta.
        if (result.length === 0) {
            // Si no se encontró ningún usuario con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Devuelve los detalles del usuario encontrado como respuesta JSON al cliente.
        res.json(result[0]);
    } catch (error) {
        // Maneja cualquier error durante la consulta de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para actualizar un usuario en la tabla 'login' de la base de datos.
export const actua_user = async (req, res) => {
    try {
        // Realiza la actualización en la base de datos, utilizando los datos del cuerpo de la solicitud y el ID del usuario obtenido de los parámetros de la URL.
        const [result] = await pool.query("UPDATE login SET ? WHERE id = ?", [
            req.body,           // Datos a actualizar obtenidos del cuerpo de la solicitud.
            req.params.id       // ID del usuario que se va a actualizar obtenido de los parámetros de la URL.
        ]);

        // Devuelve el resultado de la actualización como respuesta JSON al cliente.
        res.json(result);
    } catch (error) {
        // Maneja cualquier error durante la actualización de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Función para eliminar un usuario de la tabla 'login' de la base de datos.
export const elim_user = async (req, res) => {
    try {
        // Realiza la eliminación en la base de datos, utilizando el ID del usuario obtenido de los parámetros de la URL.
        const [result] = await pool.query("DELETE FROM login WHERE id=?", [req.params.id]);

        // Verifica si algún registro fue afectado por la operación de eliminación.
        if (result.affectedRows === 0) {
            // Si no se encontró ningún usuario con el ID especificado, devuelve un mensaje de error y un estado 404.
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Si la eliminación fue exitosa y afectó al menos un usuario, devuelve un estado 204 (Sin contenido).
        return res.sendStatus(204);
    } catch (error) {
        // Maneja cualquier error durante la eliminación de datos.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Función para realizar la autenticación de un usuario mediante el inicio de sesión.
export const login_user = async (req, res) => {
    try {
        // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud.
        const { usuario, contrasena } = req.body;

        // Realiza una consulta SQL para obtener el usuario correspondiente al nombre de usuario proporcionado.
        const [result] = await pool.query('SELECT * FROM login WHERE usuario = ?', [usuario]);

        // Verifica si se encontró algún usuario con el nombre de usuario proporcionado.
        if (result.length === 0) {
            // Si no se encontró ningún usuario, devuelve un estado 401 (No autorizado) y un mensaje de credenciales inválidas.
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Obtiene la contraseña almacenada del primer resultado de la consulta.
        const storedPassword = result[0].contrasena;

        // Compara la contraseña proporcionada con la contraseña almacenada mediante bcrypt.
        const passwordMatch = await bcrypt.compare(contrasena, storedPassword);

        // Verifica si las contraseñas coinciden.
        if (!passwordMatch) {
            // Si las contraseñas no coinciden, devuelve un estado 401 (No autorizado) y un mensaje de credenciales inválidas.
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // En este punto, la autenticación ha sido exitosa. Puedes generar un token de sesión si lo deseas.

        // Devuelve una respuesta JSON con un mensaje de inicio de sesión exitoso y los detalles del usuario.
        res.json({ message: "Inicio de sesión exitoso", user: result[0] });
    } catch (error) {
        // Maneja cualquier error durante el proceso de inicio de sesión.
        console.error(error);

        // Devuelve una respuesta de error al cliente en caso de error interno del servidor.
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};




