import ContactUs from './components/ContactUs.vue'
import Contributions from './components/Contributions.vue'
import FeedMe from './components/FeedMe.vue'
import Home from './components/Home.vue'
import Landing from './components/Landing.vue'
import Leaderboard from './components/Leaderboard.vue'
import Login from './components/Login.vue'
import MealPayment from './components/MealPayment.vue'
import SuccessfulMeal from './components/SuccessfulMeal.vue'
import FeastPayment from './components/FeastPayment.vue'
import SuccessfulFeast from './components/SuccessfulFeast.vue'

export default [
    { path: '/', name:'home',component: Home},
    { path: '/contactus', component: ContactUs},
    { path: '/contributions', component: Contributions},
    { path: '/landing', component: Landing},
    { path: '/leaderboard', component: Leaderboard},
    { path: '/login', component: Login},
    { path: '/feedme', name:'feedme', component: FeedMe, props:true},
    { path: '/mealpayment', name:'mealpayment', component: MealPayment, props:true},
    { path: '/successfulmeal', name:'successfulmeal', component: SuccessfulMeal, props:true},
    { path: '/feastpayment', name:'feastpayment', component: FeastPayment, props:true},
    { path: '/sfeast', name:'sfeast', component: SuccessfulFeast, props:true}
]


