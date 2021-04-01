<template>
    <div id="mainContainer">
        <div class="row">
            <div class="column"></div>
            <div class="column">
                <div id="formContainer">
                    <img src="../assets/logo.png" alt=""/>
                    <form id="loginForm">
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="user-circle" size="lg"/></div>
                            <input id="username" type="text" placeholder="Username"><br>
                        </div>
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="lock" size="lg"/></div>
                            <input id="password" type="password" placeholder="Password">
                        </div>
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="check-double" size="lg"/></div>
                            <input id="password" type="password" placeholder="Confirm Password">
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
export default {
    name: "SignUp",
    methods: {
        signUp: function() {
            this.$router.push({ path: '/home' })
        },
        login: function() {
            this.$router.push({ path: '/login' })
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
img {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
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
}
#forgetButton {
    background: none;
    border: none;
    outline: none;
    font-size: 13px;
    padding: 0px;
    color: white;
}
#forgetButton:hover {
    transition: ease-in-out 0.2s;
    color: black;
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
}
#signUpButton:hover {
    transition: ease-in-out 0.2s;
    background-color: white;
    color: black;
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
}
</style>