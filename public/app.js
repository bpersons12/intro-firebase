document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app)

/*    service firebase.storage {
        match /b/{bucket}/o {
          match /{allPaths=**} {
            allow read, write: if request.auth != null;
          }
        }
      }
*/
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result => {
                var user = result.user;
                var name = user.displayName;
                document.write(`Hello ${name}`);
                console.log(user)
        })
        .catch(console.log)
}

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('image.jpg');

    const file = files.item(0);

    const task = imageRef.put(file)

    //.downloadURL reportedly deprecated
    //task.then(snapshot => {
    //    console.log(snapshot)
    //    const url = snapshot.downloadURL
    //    document.querySelector('#imgUpload').setAttribute('src', url)

    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log("File available at", downloadURL);
        const url = downloadURL;
        document.querySelector("#imgUpload").setAttribute("src", url);
      });

    task.on('state_changed', snapshot => {
        console.log(snapshot)
    })
}

/*  Firestore Example to load firstpost into webpage

const db = firebase.firestore();

const myPost = db.collection('posts').doc('firstpost');

//  Firebase Firestore example without onSnapshot    
//    
//   myPost.get()
//        .then(doc => {
//
//            const data = doc.data();
//            document.write( data.title + `<br>`)
//
//    })

myPost.onSnapshot( doc => {
    
    const data = doc.data();
    document.write( data.title + `<br>`)

})
*/

