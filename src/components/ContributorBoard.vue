<template>
    <div id=mainboard>
        <p><strong>Top 3 Contributors</strong></p>
            <div class="column">
                <span>
                    <font-awesome-icon icon="paw" size="sm"/>
                    {{ first[0] }}
                    ({{ first[1] }})
                </span>
            </div>
            <div class="column">
                <span>
                    <font-awesome-icon icon="paw" size="sm"/>
                    {{ second[0] }}
                    ({{ second[1] }})
                </span>
            </div>
            <div class="column">
                <span>
                    <font-awesome-icon icon="paw" size="sm"/>
                    {{ third[0] }}
                    ({{ third[1] }})
                </span>
            </div>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    name: "ContributorBoard",
    props: {
        animalId: {
            type: String
        }
    },
    data() {
        return {
            contributors: Object,
            users: null,
            first: [],
            second: [],
            third: []
        }
    },
    methods: {
        fetchAnimal: function() {
            database.collection('animals').doc(this.animalId).get().then(doc => {
                this.contributors = doc.data().contributors;
            }).then(() => {
                this.users = Object.keys(this.contributors)
            }).then(() => {
                this.fetchTopContributors()
            })

        },
        fetchTopContributors: function() {
            var i;
            for (i=0;i<this.users.length; i++) {
                var userId = this.users[i];
                var user = this.contributors[userId]
                if (user[2]==1) {
                    const temp = user
                    database.collection('users').doc(userId).get().then(doc => {
                        this.first = [doc.data().name, temp[0] + 2*temp[1]]
                    })
                } else if (user[2]==2) {
                    const temp = user
                    database.collection('users').doc(userId).get().then(doc => {
                        this.second = [doc.data().name, temp[0] + 2*temp[1]]
                    })
                } else if (user[2]==3) {
                    const temp = user
                    database.collection('users').doc(userId).get().then(doc => {
                        this.third = [doc.data().name, temp[0] + 2*temp[1]]
                    })
                } else {
                    continue
                }
            }
        }
    },
    created() {
        this.fetchAnimal()
    }
}
</script>

<style scoped>
#mainboard{
    background-color: #F5F8E3;
    width: 30%;
    float: left;
    margin-left: 40px;
    padding: 20px;
    text-align: center;
    border-radius: 25px;
}
</style>