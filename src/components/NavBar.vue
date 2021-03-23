<template>
    <div class="navbar">
        <p class="menu-item"> Home </p>
        <p class="menu-item">Your Contributions</p>
        <p class="menu-item">LeaderBoard</p>
        <p class="menu-item">Contact Us</p>    
    </div>
</template>

<script>
export default {
    name : 'navbar'
}
</script>

<style scoped>
.navbar {
    background-color: #96B08A;
    display: flex;
    text-align: center;
    overflow: hidden ; 
    font-size: 20px; 
}

.navbar .menu-item {
    color : #FFF ; 
    padding: 10px 20px;
    position: relative ; 
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s;
    float: left ; 
}

.navbar .menu-item:hover {
    background-color: #000;
}

</style>