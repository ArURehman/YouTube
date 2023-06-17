<template>
    <div class="">
        <ChannelNav :id="id"/>
        <div class="px-[5.7rem]"><router-view :id="id"></router-view></div>
    </div>
</template>

<script>
import ChannelNav from '../../components/navigation/ChannelNav.vue'
import axios from 'axios'
import { useUserStore } from '../../stores/userStore'

export default{
    name: 'Channel',
    components: {ChannelNav},
    props: ['id'],
    data(){
        return{
            
        }
    },
    methods: {

    },
    computed: {
        
    }
}
</script>