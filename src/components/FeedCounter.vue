<template>
    <div>
        <!-- can consider changing this alignment -->
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
    components: {
    },
    data() {
        return {
            mealQuantity: 6,
            feastQuantity: 15
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
  content: "";
  display: table;
  clear: both;
}
#feastCounter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
#feastCounter:after {
  content: "";
  display: table;
  clear: both;
}
.icon {
    color: #96B08A;
    float: left;
    margin: 10px;
    width: 40px;
    height: 40px;
}
.quantity {
    font-size: 15px;
    font-weight: bold;
    float: left;
}
</style>