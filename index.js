var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
const auth = firebase.auth();
var database = firebase.database;
var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var firebase = database().ref();
var falselogout = document.getElementById("signout2")
var ref = database().ref("LogOuts/");
var firstlogoutcount;
var secondlogoutcount;

function submitClick() {
    //var messageText = mainText.value;
    //firebase.child("text").child("Text").set(mainText.value);

    firebase.child("'Users'").child(user.value).child("'Password'").set(pass.value);
}



function signin()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));

}


function create()
{

    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
}

function signout()
{
    auth.signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });

}

function googledirect()
{
    auth.signInWithRedirect(provider);
}




/*firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});
*/

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in");
        // User is signed in.
        const filename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        console.log(filename);
        if (filename === "main.html") {
            window.location.href = "dunno.html";
        }
    } else {
        console.log("logged out");
        // No user is signed in.
        const filename = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        console.log(filename);
        if (filename !== "main.html") {
            window.location.href = "main.html";
        }
    }
});


falselogout.addEventListener("mouseover", function(){
    var div = document.createElement("div");

    div.style.width = "100%";
    div.style.height = "1000px";
    document.body.insertBefore(div, document.body.childNodes[6]);
    window.scrollTo(0, top);
});



ref.on("value", function(snapshot)
{
    var info = snapshot.val();
    firstlogoutcount = info.First;
    secondlogoutcount = info.Second;

    document.getElementById('logoutdisplay1').innerHTML = "The first logout button has been pressed " + firstlogoutcount + " times.";
    document.getElementById('logoutdisplay2').innerHTML = "The second logout button has been pressed " + secondlogoutcount + " times.";
});

function setValues() {

    database().ref('LogOuts').set({
        First: 10,
        Second: 0,
    });
}
function firstSignout() {
    var updateSignout = firstlogoutcount + 1;
    database().ref('LogOuts').update({
        First: updateSignout
    });
    signout();
}

function secondSignout() {
    var updateSignout = secondlogoutcount + 1;
    database().ref('LogOuts').update({
        Second: updateSignout
    });
    signout();
}