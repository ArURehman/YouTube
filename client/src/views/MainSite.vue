<template>
    <div class="flex flex-col h-screen">
      <div class="h-10 flex-none">
        <Navbar @toggleSidebar="() => {sidebarIsVisible = !sidebarIsVisible}" @reload="reloadWindow"/>
      </div>
      <div class="flex-1 flex">
        <div class="w-40 flex-none" :class="{ 'hidden' : !sidebarIsVisible }">
          <Sidebar/>
        </div>
        <div class="flex-1 overflow-y-auto" :class="{ 'w-full' : !sidebarIsVisible }">
          <router-view/>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import Navbar from '../components/navigation/Navbar.vue'
  import Sidebar from '../components/navigation/Sidebar.vue'
  
  export default{
    name: 'MainSite',
    components: {Navbar, Sidebar},
    setup(){
      let sidebarIsVisible = ref(true)
      
      const reloadPage = () => { useRouter().push({name: 'Login'}) }

      const reloadWindow = () => { window.location.reload() }
  
      return{sidebarIsVisible, reloadPage, reloadWindow}
    }
  }
  
</script>