// backend/firebase/firebaseAdmin.js
const admin = require("firebase-admin");
console.log('SERVICE_ACCOUNT:', process.env.SERVICE_ACCOUNT);
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
