const validator = require("validator");

const validarMsj = (res, parametros) => {
    let mensaje = false;
    
    try {

        let validar_phone = !validator.isEmpty(parametros.phone) && validator.isLength(parametros.phone, {min: 10, max: 14});
        let validar_name = !validator.isEmpty(parametros.name);

        if (!validar_name || !validar_phone) {
            mensaje = true;
            throw new Error("No se ha validado la información, revise de nuevo, recuerde que phone tiene que tener mínimo 10 caracteres");
        }

    }catch(error) {
        return res.status(400).json({
            status: "error",
            mensaje: mensaje == true ? error.message : "faltan datos por enviar"
        });
    }

    return true;
}

module.exports = {
    validarMsj
}