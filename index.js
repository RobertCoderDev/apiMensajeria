const {conexion} = require('./db/conexion');
const express = require('express');
const cors = require('cors');

const cron = require('node-cron');
const axios = require('axios');

const Message = require("./model/Msj");

//Inicializar app
console.log("App de node arrancada");

// conexión a la db

conexion();

//crear servidor con node

const app = express();
const puerto = 3900;


// configurar cors 

app.use(cors());

// convertir body a objeto js

app.use(express.json());  // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true})); // form-urlencoded app/json




// Tarea cron para enviar mensajes al webhook cada minuto
cron.schedule('* * * * *', async () => {
    try {
        // Obtener todos los mensajes guardados en la base de datos
        const messages = await getMessagesFromDatabase();

        // Si hay mensajes, enviarlos al webhook
        if (messages.length > 0) {
            await sendToWebhook(messages);
        } else {
            console.log('No hay mensajes para enviar al webhook.');
        }
    } catch (error) {
        console.error('Error al procesar la tarea cron:', error);
    }
});

// Función para enviar mensajes al webhook
const sendToWebhook = async (messages) => {
    try {
        // Aquí debes reemplazar 'http://tu-webhook-url' con la URL de tu webhook
        const webhookUrl = 'http://tu-webhook-url';
        
        // Realizar solicitud HTTP POST utilizando axios
        const response = await axios.post(webhookUrl, messages);

        // Si se realiza correctamente la solicitud, imprime la respuesta en la consola
        console.log('Respuesta del webhook:', response.data);

        // Después de enviar los mensajes, eliminarlos de la base de datos
        await deleteMessagesFromDatabase();
        
    } catch (error) {
        console.error('Error al enviar mensajes al webhook:', error.message);
    }
};

// Función para obtener mensajes de la base de datos
const getMessagesFromDatabase = async () => {
    try {
        const mensajes = await Message.find();
        return mensajes;
    } catch (error) {
        console.error('Error al obtener mensajes de la base de datos:', error);
        return [];
    }
};

// Función para eliminar mensajes de la base de datos
const deleteMessagesFromDatabase = async () => {
    try {
        await Message.deleteMany();
        console.log('Mensajes eliminados de la base de datos.');
    } catch (error) {
        console.error('Error al eliminar mensajes de la base de datos:', error);
    }
};



//Rutas

const rutas_msj = require("./routes/ruta");


// cargo las rutas

app.use("/messages", rutas_msj);


//crear servidor y escuchar peticiones http

app.listen(puerto, () => {
    console.log("servidor corriendo en el puerto " + puerto);
});


//ruta hard codeada  

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Api de mensajeria</h1>")
})

