document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app)

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