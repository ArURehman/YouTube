<template>
    <VideoCard :videos="videos" :isChannelUser="false" />
</template>

<script>
import axios from 'axios'
import VideoCard from '../../components/video/VideoCard_CH.vue'

export default{
    name: 'Home',
    components: {VideoCard},
    data(){
        return{
            videos: [],
        }
    },
    mounted(){
        axios.get('/api/video/get')
        .then(res => {
            this.videos = res.data.videos
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>