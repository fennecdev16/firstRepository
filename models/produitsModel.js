//création d'un model dont le schéma possèdera les propriété name, description, quantity, price + ce que vous voulez

// Utilisation du module npm 'mongoose'
const mongoose = require('mongoose');

// Définition du "Schéma" d'un utilisateur
const ProductSchema = mongoose.Schema({

    title: {
        type: 'string',
        required: true,
        unique: true,
    },

    desc: {
        type: 'string',
        required: true, 
    },
    quantity: {
        type: 'Number',
        required: true,
    },
    price: { type: 'Number', required: true },
     

}, { timestamps: true })

// Export du Modèle mongoose représentant un objet User
module.exports = mongoose.model('Product', ProductSchema);
