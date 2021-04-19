<template>
    <div id="container">
        <div id="name">
            <span>{{ name }}</span>
        </div>
        <div id="status">
            <span>
                <font-awesome-icon icon="paw" size="sm"/>
                {{ status }}
            </span>
        </div>
        
    </div>
</template>
<script>
import database, { auth } from "../firebase.js";

export default {
    name: "UserCard",
    data() {
        return {
            name: null,
            status: null
        }
    },
    methods: {
        getUser: function() {
            var userId = auth.currentUser.uid;
            database.collection("users").doc(userId).get().then(doc => {
                this.name = doc.data().name;
                this.status = doc.data().status
            })
        }
    },
    created() {
        this.getUser()
    }
}
</script>
<style scoped>
#container {
    height: 80px;
    width: 200px;
    background-color: #CCD2A8;
    margin-left: auto;
    margin-right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-inline-start: 10px;
}
#name {
    font-size: 18px;
    font-weight: bold;
    margin-top: 3px;
    margin-bottom: 3px;
}
#status {
    font-size: 14px;
    margin-top: 3px;
    margin-bottom: 3px;
}
</style>