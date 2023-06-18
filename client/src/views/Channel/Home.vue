<template>
    <VideoCard :videos="videos" :isChannelUser="isChannelUser" />
    <div class="mb-16"></div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../../stores/userStore'
import VideoCard from '../../components/video/VideoCard_CH.vue'

export default{
    name: 'Home',
    components: {VideoCard},
    data(){
        return{
            videos: [],
            isChannelUser: false
        }
    },
    mounted(){
        axios.post('/api/channel/get-videos', {id: this.$route.params.id})
        .then(res => {
            this.videos = res.data.videos
            this.isChannelUser = res.data.videos[0].UserID == useUserStore().getID
        })
        .catch(err => {
            console.log(err)
        })
    }
}


</script>