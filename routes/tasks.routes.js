import {Router} from 'express'


import {
    creat_user,    // Función para crear un nuevo usuario
    vistas_user,   // Función para obtener la lista de usuarios
    vista_user,    // Función para obtener detalles de un usuario específico
    actua_user,    // Función para actualizar información de un usuario
    elim_user,     // Función para eliminar un usuario
    login_user     // Función para el proceso de inicio de sesión
} from '../controllers/login.controllers.js';


import {
    createDatos,          // Función para crear nuevos datos en el registro
    vistasReg,            // Función para obtener una vista general del registro
    actua_Regist,         // Función para actualizar registros existentes
    deleteRegistro,       // Función para eliminar registros
    viewRegist,           // Función para ver detalles específicos de un registro
} from '../controllers/registro.controllers.js';


import {
    createInfima,       // Función para crear nuevos datos en el contexto de infima
    vistasInfima,       // Función para obtener una vista general de los datos de infima
    updateInfima,       // Función para actualizar datos existentes en infima
    deleteInfimo,       // Función para eliminar datos específicos en infima
    viewInfima,         // Función para ver detalles específicos de un dato en infima
} from '../controllers/infima.controllers.js';


import {
    createProceso,     // Función para crear un nuevo proceso
    vistasProceso,     // Función para obtener una vista general de todos los procesos
    updateProceso,     // Función para actualizar información de un proceso existente
    deleteProceso,     // Función para eliminar un proceso
    viewProceso,       // Función para ver detalles específicos de un proceso
} from '../controllers/procesos.controllers.js';

import {
    CreateArea,    // Función para crear una nueva área
    vistasArea,    // Función para obtener una vista general de todas las áreas
    updateArea,    // Función para actualizar información de un área existente
    deleteArea,    // Función para eliminar un área
    viewArea,      // Función para ver detalles específicos de un área
} from '../controllers/area.controllers.js';

import {
    createCatalogo,      // Función para crear un nuevo elemento en el catálogo
    vistasCatalogo,      // Función para obtener una vista general de los elementos en el catálogo
    actua_Catalogo,      // Función para actualizar información de un elemento en el catálogo existente
    deleteCatalogo,      // Función para eliminar un elemento del catálogo
    viewCatalogo,        // Función para ver detalles específicos de un elemento en el catálogo
} from '../controllers/datos.registro.controllers.js';


import {resumCatalogo} from '../controllers/resum.catalogo.js' // Función para obtener una vista general de los elementos del Resumen de catálogo

import {resumRegistro } from '../controllers/resum.registro.js' // Función para obtener una vista general de los elementos del Registro

const router = Router()

// Rutas de usuario:----------------------------------

// Ruta para crear un nuevo usuario (POST)
router.post('/createrUser', creat_user);

// Ruta para obtener todas las vistas de usuarios (GET)
router.get('/vistasU', vistas_user);

// Ruta para obtener la vista de un usuario específico por ID (GET)
router.get('/vistaU/:id', vista_user);

// Ruta para actualizar información de un usuario por ID (PUT)
router.put('/actU/:id', actua_user);

// Ruta para eliminar un usuario por ID (DELETE)
router.delete('/elimU/:id', elim_user);

// Ruta para el proceso de inicio de sesión (POST)
router.post('/login', login_user);


//rutas del registro:------------------------------------------

// Ruta para crear un nuevo registro (POST)
router.post('/crearegistro', createDatos);

// Ruta para ver todos los registros (GET)
router.get('/ver', vistasReg);

// Ruta para actualizar un registro por ID (PUT)
router.put('/actuaregist/:id', actua_Regist);

// Ruta para eliminar un registro por ID (DELETE)
router.delete('/elimReg/:id', deleteRegistro);

// Ruta para ver un registro específico por ID (GET)
router.get('/vistaone/:id', viewRegist);

// Rutas de operaciones en el contexto de "infima":-----------------------------

// Ruta para crear nuevos datos en el contexto de "infima" (POST)
router.post('/creoinfima', createInfima);

// Ruta para obtener una vista general de todos los datos en "infima" (GET)
router.get('/vitotal', vistasInfima);

// Ruta para actualizar datos en "infima" por ID (PUT)
router.put('/actinfima/:id', updateInfima);

// Ruta para eliminar datos en "infima" por ID (DELETE)
router.delete('/eliminfima/:id', deleteInfimo);

// Ruta para ver detalles específicos de un dato en "infima" por ID (GET)
router.get('/visone/:id', viewInfima);



// Rutas de operaciones en el contexto de "Proceso":------------------------------

// Ruta para crear un nuevo proceso (POST)
router.post('/creaproceso', createProceso);

// Ruta para obtener una vista general de todos los procesos (GET)
router.get('/vistasproceso', vistasProceso);

// Ruta para actualizar información de un proceso por ID (PUT)
router.put('/actuproceso/:id', updateProceso);

// Ruta para eliminar un proceso por ID (DELETE)
router.delete('/eliminproceso/:id', deleteProceso);

// Ruta para ver detalles específicos de un proceso por ID (GET)
router.get('/oneproceso/:id', viewProceso);

// Rutas de operaciones en el contexto de "Area requiriente":---------------------------

// Ruta para crear una nueva área requiriente (POST)
router.post('/creaArea', CreateArea);

// Ruta para obtener una vista general de todas las áreas requirientes (GET)
router.get('/totalArea', vistasArea);

// Ruta para actualizar información de un área requiriente por ID (PUT)
router.put('/actuArea/:id', updateArea);

// Ruta para eliminar un área requiriente por ID (DELETE)
router.delete('/eliminArea/:id', deleteArea);

// Ruta para ver detalles específicos de un área requiriente por ID (GET)
router.get('/oneArea/:id', viewArea);

// Rutas de operaciones en el contexto de "registro de contrato":--------------------------

// Ruta para crear un nuevo contrato (POST)
router.post('/creaContrato', createCatalogo);

// Ruta para obtener una vista general de todos los contratos (GET)
router.get('/vistasContrato', vistasCatalogo);

// Ruta para actualizar información de un contrato por ID (PUT)
router.put('/actuContrato/:id', actua_Catalogo);

// Ruta para eliminar un contrato por ID (DELETE)
router.delete('/eliminContrato/:id', deleteCatalogo);

// Ruta para ver detalles específicos de un contrato por ID (GET)
router.get('/oneContrato/:id', viewCatalogo);


// Ruta para obtener el resumen del catálogo (GET)
router.get('/resum1', resumCatalogo);

// Ruta para obtener el resumen del registro (GET)
router.get('/resum2', resumRegistro);


export default router;