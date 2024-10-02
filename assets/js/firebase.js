    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCK5Ncqf0HtcvWMfRLrFkSE2lHO2iZuBk8",
      authDomain: "diario-digital-f5e89.firebaseapp.com",
      projectId: "diario-digital-f5e89",
      storageBucket: "diario-digital-f5e89.appspot.com",
      messagingSenderId: "79394816484",
      appId: "1:79394816484:web:dbe6ccca980d4cc62787f1"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

export { app };