export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        const errorMessages = error.errors.map(err => ({
            field: err.path[0], // Campo que causó el error
            message: err.message   // Mensaje de error correspondiente
        }));
        
        return res.status(400).json({
            error: errorMessages
        });
    }
};
