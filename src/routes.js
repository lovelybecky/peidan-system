import logIn from './components/login.vue';
import homePeidan from './components/home1.vue';
import homeChaodan from './components/home2.vue';
import checkDetail from './components/detail.vue';
import changeP from './components/changpassword.vue';

export default[
	{path:'/',component:logIn},
	{path:'/peidan',component:homePeidan},
	{path:'/chaodan',component:homeChaodan},
	{path:'/detail',component:checkDetail},
	{path:'/changepassword',component:changeP}
]
	
