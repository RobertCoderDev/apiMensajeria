const NUMEROS_PERMITIDOS = ['5213521234567'];

// Middleware para validar el número de teléfono
function validatePhone(req, res, next) {
    const { phone } = req.body;
    if (!NUMEROS_PERMITIDOS.includes(phone)) {
        return res.status(403).json({ error: 'Número de teléfono no permitido' });
    }
    next();
}

module.exports = validatePhone;