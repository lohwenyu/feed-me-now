<template>
    <div>
        <div id="mealCounter">
            <img class="icon" src="../assets/meal.jpg"/>
            <span class="quantity">X {{ mealQuantity }}</span>
        </div>
        <div id="feastCounter">
            <img class="icon" src="../assets/feast.jpg"/>
            <span class="quantity">X {{ feastQuantity }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "FeedCounter",
    props: {
        mealQuantity: {
            type: Number
        },
        feastQuantity: {
            type: Number
        }
    },
    components: {
    },
    data() {
        return {
        }
    }
}
</script>
<style scoped>
#mealCounter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
#mealCounter:after {
    display: table;
    clear: both;
}
#feastCounter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
#feastCounter:after {
    display: table;
    clear: both;
}
.icon {
    color: #96B08A;
    float: left;
    margin: 10px;
    width: 50px;
    height: 50px;
}
.quantity {
    font-size: 15px;
    font-weight: bold;
    float: left;
}
</style>