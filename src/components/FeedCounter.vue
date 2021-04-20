<template>
    <div>
        <div id="contributionsCounter" v-if="page==='contributions'">
            <div id="mealCounter">
                <img class="icon" src="../assets/meal.jpg"/>
                <span class="quantity">X {{ mealQuantity }}</span>
            </div>
            <div id="feastCounter">
                <img class="icon" src="../assets/feast.jpg"/>
                <span class="quantity">X {{ feastQuantity }}</span>
            </div>
        </div>
        <div id="leaderboardCounter" v-if="page==='leaderboard'">
            <div id="mealCounter">
                <img class="icon" src="../assets/meal.jpg"/>
                <span class="quantity">X {{ mealQuantity }}</span>
            </div>
            <div id="feastCounter">
                <img class="icon" src="../assets/feast.jpg"/>
                <span class="quantity">X {{ feastQuantity }}</span>
            </div>
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
        },
        page: {
            type: String
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
#contributionsCounter {
    display: flex;
}
#leaderboardCounter {
    display: flex;
    flex-direction: column;
}
#mealCounter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: fit-content;
    height: fit-content;
    padding: 10px;
}
#feastCounter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: fit-content;
    height: fit-content;
    padding: 10px;
}
.icon {
    margin-right: 5px;
    width: 50px;
    height: 50px;
}
.quantity {
    font-size: 15px;
    font-weight: bold;
}
</style>