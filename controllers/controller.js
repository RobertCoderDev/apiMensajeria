const Message = require("../model/Msj");
const {validarMsj} = require("../helpers/validator"); 



const save = async (req, res) => {

    // Recoger parámetros por post a guardar 

    let parametros = req.body;
    

    // validar datos

    if (validarMsj(res, parametros) != true) {
        return;
    }

    // crear el objeto a guardar 

    const mensaje = new Message(parametros); // esta linea guarda de manera automática
    

    try {
        // Guardar el mensaje en la base de datos usando async/await
        const msjGuardado = await mensaje.save();
        
        // devolver resultado 
        return res.status(200).json({
            status: "success",
            cuerpo: msjGuardado,
            mensaje: "mensaje creado con éxito !!"
        });

    } catch (error) {
        // Manejar errores durante el guardado
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha guardado el mensaje"
        });
    }

};


const read = async (req, res) => {
    try {
        // Obtener todos los mensajes guardados en la base de datos
        const mensajes = await Message.find();
        res.status(200).json(mensajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
};



module.exports = {
    save,
    read
}