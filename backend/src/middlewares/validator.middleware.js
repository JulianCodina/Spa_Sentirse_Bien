export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // Crear un array de mensajes de error más específico
        const errorMessages = error.errors.map(err => ({
            field: err.path[0], // Campo que causó el error
            message: err.message  // Mensaje de error correspondiente
        }));

        // Enviar la respuesta con el estatus 400 y detalles del error
        return res.status(400).json({
            status: 'error',          // Indicar que hubo un error
            message: 'Errores de validación encontrados', // Mensaje general
            errors: errorMessages     // Lista de errores específicos
        });
    }
};
