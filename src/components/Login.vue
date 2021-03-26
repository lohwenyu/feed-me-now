<template>
    <div id="mainContainer">
        <div class="row">
            <div class="column"></div>
            <div class="column">
                <div id="formContainer">
                    <img src="../assets/logo.png" alt=""/>
                    <form id="loginForm">
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="user-circle" size="2x"/></div>
                            <input id="username" type="text" placeholder="Username"><br>
                        </div>
                        <div class="inputContainer">
                            <div class="iconContainer"><font-awesome-icon icon="lock" size="2x"/></div>
                            <input id="password" type="password" placeholder="Password">
                        </div>
                        <p><button type="button" id="forgetButton">Forgot Password?</button></p>
                        <button type="button" id="loginButton" v-on:click="login()">Sign In</button>
                        <p id="signUp">Don't have an account? <button type="button" id="signUpButton" v-on:click="signUp()">Sign up here.</button></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {

        }
    },
    methods: {
        login: function() {
            this.$router.push({ path: '/home' })
        },
        signUp: function() {
            this.$router.push({ path: '/signup' })
        }
    }
}
</script>
<style scoped>
#mainContainer {
    background-image: url("https://wallpaperaccess.com/full/1267114.jpg");
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
#loginButton {
    width: 300px;
    height: 30px;
    outline: none;
    border-radius: 30px;
    border: none;
    font-size: 15px;
    background-color: black;
    color: white;
}
#loginButton:hover {
    transition: ease-in-out 0.2s;
    background-color: white;
    color: black;
}
#signUp {
    font-size: 13px;
}
#signUpButton {
    background: none;
    border: none;
    outline: none;
    padding: 0px;
    color: white;
}
#signUpButton:hover {
    transition: ease-in-out 0.2s;
    color: black;
}
</style>