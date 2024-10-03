import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { showMessage } from "./toastMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  //Evitar que se recargue la página
  e.preventDefault();
  console.log("Formulario enviado");

  //Obtener los datos del formulario mediante sus id
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  // Menejo de errores
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //Registro correcto
    console.log(userCredentials);

    //Mostrar menzaje de exito
    showMessage("Usuario resgistrado", "success");
  } catch (error) {
    //Registro fallido
    console.log(error);
    //Mostrar menzaje de error
    if (error.code === "auth/email-already-in-use") {
      showMessage("El correo ya está en uso", "error");
    } else if (error.code === "auth/invalid-email") {
      showMessage("El correo es inválido", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("La contraseña debe tener más de 5 digitos", "error");
    } else {
      showMessage(error.code, "error");
    }
  }
});
