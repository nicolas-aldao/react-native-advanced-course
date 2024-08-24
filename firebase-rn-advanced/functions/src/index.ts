const onRequest = require("firebase-functions/v2/https");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const createUser = require('./create_user');
const requestOTP = require('./request_otp');
const verifyOTP = require('./verify_otp');

const EMULATOR_HOST_AUTH = 'localhost:9099';

// run the firebase server  
// firebase emulators:start

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
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);
