// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storageRef;
function uploadimage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector('#photo').files[0];
    const name = new Date() + '-' + file.name;

    if (file == null) {
        alert('Debe seleccionar una imagen')
    }
    else {
        const metadata = {
            contentType: file.type
        }
        const task = ref.child(name).put(file, metadata);

        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url);
                alert('La imagen se subio correctamente');
                const imageElement = document.querySelector('#photo');
                imageElement.src = url;

            })
    }

}