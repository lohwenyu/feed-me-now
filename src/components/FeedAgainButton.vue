<template>
    <button type="button">
        <p>FEED AGAIN</p>
    </button>
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
}
button:hover {
    background-color: rgba(64, 168, 213, 0.5);
}
</style>