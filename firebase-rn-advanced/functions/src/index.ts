const onRequest = require("firebase-functions/v2/https");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const createUser = require('./create_user');

const EMULATOR_HOST_AUTH = 'localhost:9099';

admin.initializeApp();

if (process.env.FUNCTIONS_EMULATOR) {
    // Conectarse al emulador de Firestore
    const firestore = admin.firestore();
    firestore.settings({
        host: "localhost:8080",
        ssl: false
    });

    // Conectarse al emulador de Realtime Database
    const database = admin.database();
    database.useEmulator("localhost", 9000);
}

exports.createUser = functions.https.onRequest(createUser);
