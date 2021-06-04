const db = firebase.firestore();

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const imgcarlos = document.getElementById('imgjulieta');
const storageRef = firebase.storage().ref();


let editStatus = false;
let id = '';
var seguimiento=[];

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
const saveTask = (title, description) =>
  db.collection("tasks").doc().set({
    title,
    description,
  });

const getTasks = () => db.collection("tasks").get();

const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const deleteTask = (id) => db.collection("tasks").doc(id).delete();

const getTask = (id) => db.collection("tasks").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('tasks').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";
    var felipe = 0;

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      seguimiento[felipe] = task.URL;

      tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.title}</h3>
    <p>${task.description}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
       
        </div>
      <div class="col-12">
      <br>
                            <img src=${task.URL} class="col-12" width="600px" alt="img">
                        </div>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    var title = taskForm['task-title'].value;
    var file = taskForm['photo'].files[0];
    var description = taskForm['task-description'].value;
    var imgnew = file.name;
    var URL = '';
    const imageRef = storageRef.child(imgnew);
    imageRef.put(file)
        .then(snapshot => {
            return imageRef.getDownloadURL();
            console.log('julieta 2');
        })
        
        .then(async (downloadURL) => {
          console.log('julieta');
            URL = downloadURL;
            await db.collection('tasks').doc().set({
                title,
                URL,
                description
            })
        })
}) 