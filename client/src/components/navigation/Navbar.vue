<template>
    <nav class="h-10 px-5 py-0 flex justify-between">
    <div class="my-auto flex justify-between align-middle gap-5">
      <button @click="emitToggleSidebar" class="mt-[0.063em]"><font-awesome-icon class="stroke-[0.5]" icon="fa-solid fa-bars" size="sm" style="color: #a5a5a5;" /></button>
      <router-link :to="{ name : 'Home' }"><font-awesome-icon icon="fa-brands fa-youtube" size="lg" style="color: #ff0000;" /><span class="font-Gothic text-white tracking-normal after:content-['PK'] after:text-[9px] after:text-[#7c7c7c] after:relative after:-top-3 after:left-[0.5px] after:font-extralight before:content[''] before:w-2 before:h-2 before:absolute before:-z-10 before:bg-white before:top-4 before:left-[3.75rem]">YouTube</span></router-link> 
    </div>
    <div class="mt-[9px] flex justify-between gap-0 align-middle">
      <input class="h-[26px] w-96 px-2 bg-inherit border-searchBarGray border-2 text-textWhite text-xs rounded-l-xl" placeholder="Search" v-model="searchText" type="text" name="" id="">
      <router-link :to="{ name : 'Search' }"><button class="w-9 pr-[1px] my-auto h-[26px] bg-searchBarGray rounded-r-xl"><font-awesome-icon class="stroke-[0.5p]" icon="fa-solid fa-magnifying-glass" size="xs" style="color: #a5a5a5;" /></button></router-link>
    </div>
    <div class="my-auto flex justify-between gap-6 align-middle">
      <button @mouseenter="() => notifOpen = true" @mouseleave="notifOpen = false" v-if="signedIn" class="mt-1"><font-awesome-icon icon="fa-solid fa-bell" size="sm" style="color: #a5a5a5;" /></button>
      <NotifMenu @click="() => notifOpen = true" @mouseleave="notifOpen = false" v-if="notifOpen"/>
      <button v-if="signedIn" @mouseenter="() => menuOpen = true" @mouseleave="menuOpen = false"><img class="w-[26px] h-[26px] rounded-full object-contain" :src="URL" alt=""></button>
      <div v-else class="mt-1 w-19 h-8 rounded-full flex align-middle justify-between border-highlightBlue border-2 px-[2px] pt-[1px]"><button @click="gotoLogin"><font-awesome-icon icon="fa-solid fa-circle-user" size="lg" style="color: #377cb7;" /><span class="text-highlightBlue font-Roboto ml-1 text-xs relative bottom-[2px]">Sign In</span></button></div>
      <UserMenu :url="URL" @mouseenter="() => menuOpen = true" @mouseleave="menuOpen = false" v-if="menuOpen"/>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../../stores/userStore'
import UserMenu from '../userMenu/UserMenu.vue'

export default{
  name: 'Navbar',
  components: { UserMenu},
  data(){
    return {
      signedIn: false,
      menuOpen: false,
      notifOpen: false,
      searchText: '',
      URL: "http://localhost:4000/api/file/" + useUserStore().getProfilePic
    }
  },
  methods: {
    gotoLogin(){
      this.$router.push({name: 'Login'})
    },
    emitToggleSidebar(){
      this.$emit('toggleSidebar')
    },
    setProfileURL() {
        axios.get('/api/user/profilePic')
        .then((res) => {
        })
        .catch((err) => {
            console.log(err)
        })
    }
  },
  updated(){
    axios.get('/api/auth/info')
    .then(res => {
      useUserStore().setUser(res.data.user)
      this.signedIn = true
      this.setProfileURL()
    })
    .catch(err => {
      this.signedIn = false
    })
  },
  watch:{
    
  }
}

</script>