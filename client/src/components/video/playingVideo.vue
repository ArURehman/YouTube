<template>
    <div class="text-white text-xs max-w-[70rem]">
        <video class="rounded-md w-[65rem] cursor-pointer" controls :src="videoURL"></video>
        <div class="flex-col mt-2">
            <h4 class="text-base font-medium mt-1 mb-3 pl-1">{{ video.VideoTitle }}</h4>
            <div class="flex justify-between mt-3">
                <div class="flex gap-5">
                    <div class="flex gap-2">
                        <router-link :to="{name : 'Channel', params : {id: video.ChannelID}}"><img class="w-9 h-9 rounded-full" :src="profileURL" alt=""></router-link>
                        <div >
                            <router-link :to="{name : 'Channel', params : {id: video.ChannelID}}"><p class="text-[12px] my-[2px]">{{ video.UserName }}</p></router-link>
                            <p ref="sub_count" class="text-[9px] text-[#a5a5a5]"></p>
                        </div>
                    </div>
                    <subscribeBtn class="relative -top-6" @reload="windowReload()" :id="video.ChannelID" :video="true"/>
                </div>
                <div class="flex justify-end gap-4">
                    <div class="flex gap-5 bg-searchBarGray px-3 py-[6px] h-8 rounded-2xl">
                        <button @click="handleLike" class="border-r-2 border-r-white pr-4 text-textWhite"><font-awesome-icon icon="fa-solid fa-thumbs-up" size="md" style="color: #ffffff;" /><span class="ml-2" ref="like">{{ likeCounter }}</span></button>
                        <button  @click="handleDislike" class="text-textWhite"><font-awesome-icon class="mt-1" icon="fa-solid fa-thumbs-down" size="md" style="color: #ffffff;" /><span ref="dislike" class="ml-2">{{ dislikeCounter }}</span></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-searchBarGray py-3 px-4 rounded-xl">
            <p class="text-[11px] text-[#a5a5a5]">200M Views &bull; <span ref="uploadDate"></span></p>
            <p class="mt-1 pt-[2px]">{{ video.VideoDescription }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../stores/userStore';
import subscribeBtn from '../button/subscribeBtn.vue';

export default{
    name: 'PlayingVideo',
    components: { subscribeBtn },
    data(){
        return{
            video: {},
            isChannelUser: false,
            id: this.$route.params.id,
        }
    },
    computed: {
        videoURL(){
            return `http://localhost:4000/api/file/${this.video.VideoFile}`;
        },
        profileURL(){
            return `http://localhost:4000/api/file/${this.video.Profile_Pic}`;
        },
        likeCounter(){
            axios.post('/api/video/reaction-count', {VideoID: this.$route.params.id, Reaction: 1})
            .then(res => {
                console.log(res.data)
                this.$refs.like.innerText = res.data.count[0].ReactionCount
            })
            .catch(err => {
                console.log(err)
            })
        },
        dislikeCounter(){
            axios.post('/api/video/reaction-count', {VideoID: this.$route.params.id, Reaction: 0})
            .then(res => {
                console.log(res.data)
                this.$refs.dislike.innerText =  res.data.count[0].ReactionCount
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    methods:{
        getUploadDate(){
            let date = (new Date(this.video.createdAt)).toLocaleDateString('en-US', 
                { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            this.$refs.uploadDate.innerText = date
        },
        subCount(){
            axios.post('/api/channel/sub-count', {id: this.video.ChannelID})
                .then(res => {
                    this.$refs.sub_count.innerText = res.data.count.toString() + ' Subscribers'
                })
                .catch(err => {
                    console.log(err)
                }
            )
        },
        windowReload(){
            window.location.reload();
        },
        handleLike(){
            if(!useUserStore().getAuthenticated) return
            axios.post('/api/video/reaction', {UserID: useUserStore().getID, VideoID: this.$route.params.id, Reaction: 1})
            .then(res => {
                console.log(res.data)
                window.location.reload();   
            })
            .catch(err => {
                console.log(err)
            })
        },
        handleDislike(){
            if(!useUserStore().getAuthenticated) return
            axios.post('/api/video/reaction', {UserID: useUserStore().getID, VideoID: this.$route.params.id, Reaction: 0})
            .then(res => {
                console.log(res.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    mounted(){
        axios.post(`/api/video/playing`, {id: this.$route.params.id})
        .then(res => {
            this.video = res.data.video[0];
            this.isChannelUser = useUserStore().getID == this.video.ChannelID;
            this.subCount();
            this.getUploadDate();
        })
        .catch(err => {
            console.log(err);
        })
    }
}

</script>