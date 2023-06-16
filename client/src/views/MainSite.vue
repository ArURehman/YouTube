<template>
    <div class="flex flex-col h-screen">
      <div class="h-10 flex-none">
        <Navbar @toggleSidebar="() => {sidebarIsVisible = !sidebarIsVisible}"/>
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
  import Navbar from '../components/navigation/Navbar.vue'
  import Sidebar from '../components/navigation/Sidebar.vue'
  
  export default{
    name: 'MainSite',
    components: {Navbar, Sidebar},
    setup(){
      let sidebarIsVisible = ref(true)
  
      return{sidebarIsVisible}
    }
  }
  
</script>