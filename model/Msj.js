const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message_type: {
        type: String,
        required: true,
        enum: ['text', 'image']
    },
    payload: {
        text: {
            type: String,
            required: true
        },
        image: {
            url: {
                type: String,
                required: false
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['enviado', 'local'],
        default: 'local'
    }
});

module.exports = model('Message', MessageSchema, 'messages');
