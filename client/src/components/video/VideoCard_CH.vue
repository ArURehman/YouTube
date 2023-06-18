<template>
    <div class="flex gap-3">
        <div v-for="(video, index) in videos" :key="video.id" class="w-[16rem] h-[13rem] m-0 p-2 hover:bg-searchBarGray px-3 py-2 rounded-xl ease-in-out duration-200" @mouseover="isHovered = true" @mouseleave="isHovered = false">
            <router-link :to="{name : 'Play', params: {id: video.id}}"><img class="rounded-lg" :src="videoLink(video)" alt=""></router-link>
            <div class="flex justify-start gap-1 mt-1">
                <router-link :to="{name : 'Channel', params: {id: video.ChannelID}}"><img class="w-11 aspect-square rounded-full object-cover p-1 my-1" :src="userLink(index)" alt=""></router-link>
                <div class="text-white my-[6px] mr-5 mt-[11px]">
                    <router-link :to="{name : 'Play', params: {id: video.id}}"><h5 class="text-[11px] font-medium">{{ displayTitle(video) }}</h5></router-link>
                    <router-link :to="{name : 'Channel', params: {id: video.ChannelID}}"><p class="text-[10px] text-[#a5a5a5] mb-[2px] hover:text-white">{{ video.Username }}</p></router-link>
                    <router-link :to="{name : 'Play', params: {id: video.id}}"><p class="text-[9px] text-[#a5a5a5]">200M Views &bull; <span>{{ getUploadDate(video) }}</span></p></router-link>
                </div>
                <!-- <button class="relative -top-3 -right-8" :class="{ 'hidden': !isHovered }"><font-awesome-icon icon="fa-solid fa-ellipsis-vertical" size="xs" style="color: #ffffff;" /></button> -->
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'VideoCard',
    props: ['videos', 'isChannelUser'],
    data(){
        return{
            isHovered: [false]
        }
    },
    mounted(){

    },
    computed: {
        
    },
    methods: {
        userLink(index){
            const video = this.videos[index]
            return 'http://localhost:4000/api/file/' + video.Profile_Pic
        },
        videoLink(video){
            return 'http://localhost:4000/api/file/' + video.VideoThumbnail 
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
        toBeVisible(video){
            if(this.isChannelUser){
                return true
            }else{
                if(video.VideoVisibility == true){
                    return true
                }else{
                    return false
                }   
            }
        },
        displayTitle(video){
            let message = video.VideoTitle
            if(message.length > 26){
                return message.substring(0, 26) + '...'
            }
            else{
                return message
            }
        },
    }
}
</script>