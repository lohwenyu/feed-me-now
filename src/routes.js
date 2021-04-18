import ContactUs from './components/ContactUs.vue'
import Contributions from './components/Contributions.vue'
import FeedMe from './components/FeedMe.vue'
import Home from './components/Home.vue'
import Landing from './components/Landing.vue'
import Leaderboard from './components/Leaderboard.vue'
import Login from './components/Login.vue'
import SignUp from "./components/SignUp.vue"
import Transactions from "./components/Transactions.vue"

import MealPayment from './components/MealPayment.vue'
import SuccessfulMeal from './components/SuccessfulMeal.vue'
import FeastPayment from './components/FeastPayment.vue'
import SuccessfulFeast from './components/SuccessfulFeast.vue'

import HomeDashboard from './components/HomeDashboard.vue'
import Dashboard from "./components/Dashboard.vue"

export default [
    { path: '/', component: Landing},
    { path: '/landing', component: Landing },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/home', name:'home', component: Home },
    { path: '/contactus', component: ContactUs},
    { path: '/contributions', component: Contributions},
    { path: '/leaderboard', component: Leaderboard},
    { path: '/feedme', name:'feedme', component: FeedMe, props:true},
    { path: '/mealpayment', name:'mealpayment', component: MealPayment, props:true},
    { path: '/successfulmeal', name:'successfulmeal', component: SuccessfulMeal, props:true},
    { path: '/feastpayment', name:'feastpayment', component: FeastPayment, props:true},
    { path: '/successfulfeast', name:'successfulfeast', component: SuccessfulFeast, props:true},
    { path: '/dashboard', component: Dashboard},
    { path: '/homedashboard', component:  HomeDashboard},
    { path: '/transactions', component: Transactions}
]


