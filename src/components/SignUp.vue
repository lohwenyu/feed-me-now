<template>
    <div id="mainContainer">
        <div class="row">
            <div class="column"></div>
            <div class="column">
                <div id="formContainer">
                    <button id="logoButton"  v-on:click="redirectDashboard()"><img src="../assets/logo.png" alt=""/></button>
                    <form id="loginForm">
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="user-circle" size="lg"/></div>
                            <input id="username" v-model="username" type="text" placeholder="Username"><br>
                        </div>
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="envelope" size="lg"/></div>
                            <input id="email" v-model="email" type="email" placeholder="Email"><br>
                        </div>
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="lock" size="lg"/></div>
                            <input id="password" v-model="password" type="password" placeholder="Password">
                        </div>
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="check-double" size="lg"/></div>
                            <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm Password">
                        </div>
                        <button type="button" id="signUpButton" v-on:click="signUp()">Sign Up</button>
                        <p id="login">Already have an account? <button type="button" id="loginButton" v-on:click="login()">Login here.</button></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import database, { auth } from "../firebase.js";

export default {
    name: "SignUp",
    data() {
        return {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    },
    methods: {
        signUp: async function() {
            if (this.username === "") {
                window.alert("Please fill in username field!")
            } else if (this.email === "") {
                window.alert("Please fill in email field!")
            } else if (this.password === "") {
                window.alert("Please set a password!")
            } else if (this.password !== this.confirmPassword) {
                window.alert("Passwords do not match!") 
            } else {
                return auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then((userCredential) => {
                        var userId = userCredential.user.uid;
                        console.log(userId);

                        database.collection("users").doc(userId).set({
                            name: this.username,
                            status: "Animal Protector"
                        })

                        auth.onAuthStateChanged((user) => {
                            if (user) {
                                this.$router.push({ path: '/home' }).then(() => location.reload())
                            }
                        })
                    })
                    .catch((error) => {
                        var errorMessage = error.message;
                        window.alert(errorMessage);
                    });
            }
        },
        login: function() {
            this.$router.push({ path: '/login' }).then(() => location.reload())
        },
        redirectDashboard: function() {
            this.$router.push({ path: '/dashboard' }).then(() => location.reload())
        }
    }
}
</script>
<style scoped>
#mainContainer {
    background-image: url("https://pro2-bar-s3-cdn-cf1.myportfolio.com/383922e195047105bbe4a3f326ac989a/91edee3e-fa8d-47a8-9be1-c38a2a364cf5_rw_1920.jpg?h=d0da74dbb32ed941ede16cacd5b84544");
    background-size: cover;
}
.row {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.row:after {
    display: table;
    clear: both;
}
.column {
    width:50%;
    float:left;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
}
#logoButton {
    background: none;
    outline: none;
    border: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
#logoButton:hover {
    cursor: pointer;
}
/* img {
    display: block;
    margin-left: auto;
    margin-right: auto;
} */
.inputContainer {
    width: 300px;
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.inputContainer:after {
    display: table;
    clear: both;
}
.iconContainer {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
}
input {
    border: none;
    outline: none;
    width: 200px;
    font-size: 15px;
    cursor: pointer;
}
#signUpButton {
    margin-top: 10px;
    width: 300px;
    height: 30px;
    outline: none;
    border-radius: 30px;
    border: none;
    font-size: 15px;
    background-color: black;
    color: white;
    box-shadow: 1px 1px rgb(255, 255, 255, 0.5);
}
#signUpButton:hover {
    transition: ease-in-out 0.2s;
    background-color: white;
    color: black;
    cursor: pointer;
}
#login {
    font-size: 13px;
}
#loginButton {
    background: none;
    border: none;
    outline: none;
    padding: 0px;
    color: white;
}
#loginButton:hover {
    transition: ease-in-out 0.2s;
    color: black;
    cursor: pointer;
}
</style>