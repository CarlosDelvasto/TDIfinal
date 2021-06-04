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
          var contenido=document.getElementById('contenido');
          contenido.innerHTML =`
          <div class="container mt-5">
          <div>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                  registrate
              </button>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Registrate</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <h1> ¡Bienvenid@!</h1>
                          <p> Únete para que compartas tu experiencia en los 20 años del programa de Ingenieria en
                              Multimedia</p>
                          <input class="form-control" id="email" type="email" placeholder="Correo electrónico">
                          <div class="mt-2"></div>
                          <input class="form-control" id="contrasena" type="password" placeholder="Contraseña">
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                          <button type="button" class="btn btn-primary" onclick="registro()">Registrarse</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="container mt-5">
          <div>
              <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModal1">
                  Iniciar Sesión
              </button>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Inicia Sesión</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <h1> ¡Bienvenid@!</h1>
                          <p> Inicia tu experiencia en los 20 años del programa de Ingeniería en Multimedia</p>
                          <input class="form-control" id="email2" type="email" placeholder="Correo electrónico">
                          <div class="mt-2"></div>
                          <input class="form-control" id="contrasena2" type="password" placeholder="Contraseña">
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                          <button type="button" class="btn btn-primary" onclick="ingreso()">Ingresar</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
          
          `
          ;

        }
      });
      
    }
    observador();
  //
    function aparece(){
      var contenido=document.getElementById('contenido');
      contenido.innerHTML =`
      <br><br><br>
            <div class="container mt-4">
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Bienvenid@</h4>
        <p> Gracias por participar en la celebración de los 20 años de nuestro programa <3 </p>
        <hr>
            </div>
                <button class="btn btn-info" onclick="cerrar()">Cerrar sesión</button>
                </div>
      
      `
      ;
    }
    function desaparece(){
      var contenido=document.getElementById('contenido');
      if(user){
        ('#email').hide();
        ('.boton').hide();
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
  