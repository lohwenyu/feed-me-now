<template>
    <button type="button">FEED AGAIN</button>
</template>
<script>
export default {
    name: "FeedAgainButton"
}
</script>
<style scoped>
button {
    background-color: rgba(64, 168, 213, 0.24);
    width: 140px;
    height: 70px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border: none;
    outline: none;
}
button:hover {
    background-color: rgba(64, 168, 213, 0.5);
    transition: ease-in-out 0.2s;
}
</style>