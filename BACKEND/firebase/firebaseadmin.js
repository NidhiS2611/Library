// backend/firebase/firebaseAdmin.js
const admin = require("firebase-admin");
console.log('SERVICE_ACCOUNT:', process.env.SERVICE_ACCOUNT);
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
