function registro(){
  var email = document.getElementById('email').value;
  var contrasena = document.getElementById('contrasena').value;

  firebase.auth().createUserWithEmailAndPassword(email, contrasena)
.then((userCredential) => {
  // Signed in
  verificar()
  var user = userCredential.user;
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  // ..
});
  }
  function ingreso(){
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
.then((userCredential) => {
  // Signed in
  var user = userCredential.user;
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode)
  console.log(errorMessage)
});
 
  }
  function observador(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("exixte usuario activo")
        aparece();
        desaparece();
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        console.log("no exixte usuario activo")
      }
    });
    
  }
  observador();
//
  function aparece(){
    var contenido=document.getElementById('contenido');
    contenido.innerHTML =`
    <button class="cerrar" onclick="cerrar()">Cerrar sesión</button>
    
    `
    ;
  }
  function desaparece(){
    var contenido=document.getElementById('contenido');
    if(user){
      ('.regis').hide();
    }
  }
  function cerrar(){
    firebase.auth().signOut()
    .then(function(){
      console.log("saliendo")

    })
    .catch(function(error){
console.log(error)
    })
  }
  function verificar(){
    var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
// Email sent.
console.log("mensaje de verificación enviado");
}).catch(function(error) {
console.log(error);
// An error happened.
});
  }
