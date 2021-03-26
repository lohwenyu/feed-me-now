import ContactUs from './components/ContactUs.vue'
import Contributions from './components/Contributions.vue'
import FeedMe from './components/FeedMe.vue'
import Home from './components/Home.vue'
import Landing from './components/Landing.vue'
import Leaderboard from './components/Leaderboard.vue'
import Login from './components/Login.vue'
import Payment from './components/Payment.vue'
import SuccessfulTreat from './components/SuccessfulTreat.vue'

export default [
    { path: '/', name:'home',component: Home},
    { path: '/contactus', component: ContactUs},
    { path: '/contributions', component: Contributions},
    { path: '/landing', component: Landing},
    { path: '/leaderboard', component: Leaderboard},
    { path: '/login', component: Login},
    { path: '/feedme', name:'feedme', component: FeedMe, props:true},
    { path: '/payment', name:'payment', component: Payment, props:true},
    { path: '/successfultreat', name:'successfultreat', component: SuccessfulTreat, props:true}

]


