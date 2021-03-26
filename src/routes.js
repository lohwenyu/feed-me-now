import ContactUs from './components/ContactUs.vue'
import Contributions from './components/Contributions.vue'
import FeedMe from './components/FeedMe.vue'
import Home from './components/Home.vue'
import Landing from './components/Landing.vue'
import Leaderboard from './components/Leaderboard.vue'
import Login from './components/Login.vue'
import SignUp from "./components/SignUp.vue"

export default[
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/home', component: Home },
    { path: '/contactus', component: ContactUs },
    { path: '/contributions', component: Contributions },
    { path: '/feedme', component: FeedMe },
    { path: '/landing', component: Landing },
    { path: '/leaderboard', component: Leaderboard }
]


