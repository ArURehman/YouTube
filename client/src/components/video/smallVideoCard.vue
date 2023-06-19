<template>
    <div v-for="video in videos" class="flex flex-col w-full">
        <div :key="video.id" @click="gotoNewVideo(video)" class="w-full h-24 mb-[2px] p-2 rounded-md hover:bg-searchBarGray duration-300 ease-in-out flex gap-2 cursor-pointer">
            <img :src="thumbnailURL(video)" alt="" class="h-full aspect-video rounded-md">
            <div class="max-w-[9rem]">
                <h1 class="text-[0.7rem] font-medium text-white">{{video.VideoTitle}}</h1>
                <button @click.stop="gotoChannel(video)" class="text-[0.65rem] text-textWhite hover:text-white mb-2">{{dispalyUsername(video)}}</button>
                <h1 class="text-[0.65rem] text-textWhite">200M Views &bull; <span>{{getUploadDate(video)}}</span></h1>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{

    name: 'smallVideoCard',
    data(){
        return{
            videos: [],
        }
    },
    computed:{
        
    },
    methods:{
        thumbnailURL(video){
            return 'http://localhost:4000/api/file/' + video.VideoThumbnail;
        },
        getUploadDate(video){
            let date = (new Date(video.createdAt)).toLocaleDateString('en-US', 
                { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            return date
        },
        dispalyUsername(video){
            let message = video.UserName
            if(message.length > 15){
                return message.substring(0, 15) + '...'
            }
            else{
                return message
            }
        },
        gotoNewVideo(video){
            this.$router.push({name: 'Play', params: {id: video.id}})
            setTimeout(() => {
                window.location.reload();
            }, 200);
        },
        gotoChannel(video){
            this.$router.push({name: 'Channel', params: {id: video.ChannelID}})
        }
    },
    mounted(){
        axios.get('/api/video/get')
        .then(res => {
            this.videos = res.data.videos;
        })
        .catch(err => {
            console.log(err);
        })
    }

}
</script>