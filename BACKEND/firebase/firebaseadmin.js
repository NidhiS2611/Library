// backend/firebase/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
console.log ('serviceaccount', process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
