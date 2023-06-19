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
                    <subscribeBtn class="relative -top-6" @reload="() => window.location.reload()" :id="video.ChannelID" :video="true"/>
                </div>
                <div class="flex justify-end gap-4">
                    <div class="flex gap-5 bg-searchBarGray px-3 py-[6px] h-8 rounded-2xl">
                        <button class="border-r-2 border-r-white pr-5"><font-awesome-icon icon="fa-solid fa-thumbs-up" size="md" style="color: #ffffff;" /></button>
                        <button><font-awesome-icon icon="fa-solid fa-thumbs-down" size="md" style="color: #ffffff;" /></button>
                    </div>
                    <button class="bg-searchBarGray px-3 py-[6px] h-8 rounded-2xl">Save</button>
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
    },
    mounted(){
        axios.post(`/api/video/playing`, {id: this.id})
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