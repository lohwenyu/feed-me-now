import ContactUs from './components/ContactUs.vue'
import Contributions from './components/Contributions.vue'
import FeedMe from './components/FeedMe.vue'
import Home from './components/Home.vue'
import Landing from './components/Landing.vue'
import LeaderBoard from './components/LeaderBoard.vue'
import Login from './components/Login.vue'

export default[
    { path: '/', component: Home},
    { path: '/contactus', component: ContactUs},
    { path: '/contributions', component: Contributions},
    { path: '/feedme', component: FeedMe},
    { path: '/landing', component: Landing},
    { path: '/leaderboard', component: LeaderBoard},
    { path: '/login', component: Login},
]


