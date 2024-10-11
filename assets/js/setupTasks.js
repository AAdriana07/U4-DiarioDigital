import {
  createTask,
  onGetTask,
  deleteTask,
  updateTask,
  getTask,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container");

//Variables para la edición
let editStatus = false;
let editId = "";

export const setupTasks = (user) => {
  console.log(user);

  // CREATE
  taskForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    // Crear una nueva tarea
    try {
      const metaData = new Date().toISOString();
      if (!editStatus) {
        //Crea tarea
        await createTask(
          title,
          description,
          user.displayName,
          user.photoURL,
          user.email,
          metaData
        );
        //Mostrar mensaje de exito
        showMessage("Tarea creada", "success");
        //Limpiar el formulario
      } else {
        //Actualizar tarea
        await updateTask(editId, { title, description, metaData });
        //Mostrar menzaje de éxito
        showMessage("Tarea actualizada", "success");
        //Cambiar el estado de edición
        editStatus = false;
        //Cambiar el id de edición
        editId = "";

        // Cambiamos lo que muestra el formulario
        document.getElementById("form.title").innerHTML =
          "Agregar una nueva tarea";
        taskForm["btn-agregar"].value = "Crear tarea";
      }

      taskForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });

  // READ
  onGetTask((querySnapshot) => {
    let tasksHtml = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      tasksHtml += `
      <article class="task-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <img class="task-profile-picture rounded-circle" src="${
              data.userImage
            }" alt="${data.userName}" />
            <p class="m-0">${data.userName}</p>
            <p class="m-0 gap-5">Fecha y hora: ${data.metaData}</p>
          </div>
          ${
            user.email === data.userEmail
              ? `<div>
            <button class="btn btn-info btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i> Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id="${doc.id}"><i class="bi bi-trash3-fill"></i> Eliminar</button>
          </div>`
              : `<div></div>`
          }
        </header>
        <hr />
        <h4>${data.title}</h4>
        <p>${data.description}</p>
        
      </article>
      `;
    });

    // Mostrar las tareas en el DOM
    tasksContainer.innerHTML = tasksHtml;

    //UPDATE
    const btnsEditar = document.querySelectorAll(".btn-editar");
    //Iteramos
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        //Obtenemos el documento
        const doc = await getTask(dataset.id);
        //Obtenemos los datos
        const task = doc.data();

        //Llenamos el formulario con los datos
        taskForm["title"].value = task.title;
        taskForm["description"].value = task.description;

        //Actualizamos el estado de edición y el id edicion
        editStatus = true;
        editId = doc.id;
        //Cambiamos lo que muestra el formulario
        document.getElementById("form-title").innerHTML = "Editar tarea";
        taskForm["btn-agregar"].value = "guardar cambios";
      });
    });

    //DELETE
    //Obtenemos los botones de eleminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    //Iteramos los btn
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
        showMessage("Tarea eliminada", "success");
      });
    });
  });
};
