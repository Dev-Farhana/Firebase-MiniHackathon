const firebaseConfig = {
    apiKey: "AIzaSyBgJOLZXdKrItcGqUFffMd8GpCHH1FMBcg",
    authDomain: "attendance-smit-5596b.firebaseapp.com",
    databaseURL: "https://attendance-smit-5596b-default-rtdb.firebaseio.com",
    projectId: "attendance-smit-5596b",
    storageBucket: "attendance-smit-5596b.appspot.com",
    messagingSenderId: "445566485755",
    appId: "1:445566485755:web:1bd12eb1258f06f90e9c5e"
  };
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js';
import { getFirestore, addDoc, collection, onSnapshot, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const database = getFirestore()
const db = getDatabase();

let flag = true;

const signupButton = document.getElementById('signUp');

const signUpAuth = () => {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((res) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User has been created',
                showConfirmButton: false,
                timer: 1500,
            });

            // Get the user ID after successful signup
            const userID = res.user.uid;
            
            // Create a data object to store in your database
            const formData = {
                UserName: userName,
                Email: userEmail,
                Password: userPassword,
                 // isAdmin: true,
            };
            //  docRef.child('users/' + userID).set(formData)
             setDoc(doc(database, 'Users', userID), formData)

                .then(() => {
                    window.location.href = "/login.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Sorry not created. Error code: " + errorCode);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...' + errorCode,
                        text: errorMessage,
                    });
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Sorry not created. Error code: " + errorCode);
            Swal.fire({
                icon: 'error',
                title: 'Oops...' + errorCode,
                text: errorMessage,
            });
        });
};

const signUpBtn = document.getElementById('signUp');
if (signUpBtn) {
    signUpBtn.addEventListener("click", signUpAuth);
}

let LogIn = () => {
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((res) => {
    Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'User has been created',
     showConfirmButton: false,
     timer: 1500,
 });
    let userID = auth.currentUser.uid;
    let userNameRef = ref(db, "LoginUsers/" + userID);
    onValue(userNameRef, (data) => {
      let userData = data.val().username;
      console.log(userData);
     document.getElementById("username").innerHTML = userData;
      username.innerHTML = userData;   
    })
   window.location.href = "./index.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: 'error',
        title: 'Oops...'+ errorMessage,
        text: errorCode,
     });
     console.log("Sorry an Error Came by " + errorCode + ": " + errorMessage);
  });

};
let loginBtn = document.getElementById('logIn');
if(loginBtn) { loginBtn.addEventListener('click',LogIn);}



