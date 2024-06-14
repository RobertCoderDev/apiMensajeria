const mongoose = require('mongoose');

const conexion = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/retoMsj")

        //parámetros dentro de objeto, solo en caso de aviso 
        // useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log("Conectado correctamente a la Base de datos retoMsj");

    }catch(error) {
        console.log(error);
        throw new Error("No se a podido conectar a la base de datos !!");
    }
}

module.exports = {
    conexion
}