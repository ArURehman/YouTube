<template>
    <div class="text-white">
        <img class="object-cover h-[15rem] w-full" :src="bannerURL" alt="">
        <div class="flex justify-around w-full my-7 mx-auto px-10 mb-10">
            <div class="flex justify-start gap-5">
                <img class="w-24 h-24 rounded-full border-2 border-white object-cover" :src="profileURL" alt="">
                <div class="mt-1">
                    <h4 class="text-[1.1rem] mb-1">{{ user.UserName }}</h4>
                    <p class="text-[11px] text-textWhite">200M Subscribers &bull; 3K Videos</p>
                    <nav class="flex gap-4 mt-3">
                        <router-link :to="{ name : 'CHome', params: { id: $route.params.id } }"><span class="text-xs text-textWhite bg-searchBarGray px-3 py-[2px] rounded-3xl hover:bg-gray ease-in-out duration-300">Home</span></router-link>
                        <router-link :to="{ name : 'About', params: { id: $route.params.id } }"><span class="text-xs text-textWhite bg-searchBarGray px-3 py-[2px] rounded-3xl hover:bg-gray ease-in-out duration-300">About</span></router-link>
                        <router-link  v-if="isChannelUser" :to="{ name : 'Upload', params: { id: $route.params.id } }"><span class="text-xs text-textWhite bg-searchBarGray px-3 py-[2px] rounded-3xl hover:bg-gray ease-in-out duration-300">Upload</span></router-link>
                        <button v-if="isChannelUser"><span class="text-xs text-textWhite bg-almostBlack px-3 py-[2px] rounded-3xl hover:bg-[#ff0000] ease-in-out duration-300 border-2 border-[#ff0000]">Delete</span></button>
                    </nav>
                </div>
            </div>
            <button @click="toggleSubscribe" ref="sub" class="text-xs bg-searchBarGray h-9 px-4 mt-6 rounded-2xl hover:bg-gray ease-in-out duration-300">{{ isSubscribed }}</button>
        </div>
        <div class="border-b-2 border-b-gray flex justify-around mb-2"></div>
    </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../../stores/userStore'

export default{
    name: 'ChannelNav',
    props: ['id'],
    data(){
        return{
            channel: {},
            user: {},
            data: {
                id: this.id,
            },
            bannerURL: '',
            profileURL: '',
            isChannelUser: false,    
        }
    },
    computed: {
        isSubscribed(){
            axios.post('/api/user/subscribe-status', {UserID: this.user.id, ChannelID: this.channel.id})
                .then(res => {
                    if(res.data.status){
                        this.$refs.sub.innerText = 'Subscribed'
                    }else{
                        this.$refs.sub.innerText = 'Subscribe'
                    }
                })
                .catch(err => {
                    console.log(err)
                }
            )
        }
    },
    methods: {
        toggleSubscribe(){
            if(!useUserStore().getAuthenticated){
                this.$router.push({name: 'Login'})
            }else{
                axios.post('/api/user/toggle-subscriber', {UserID: this.user.id, ChannelID: this.channel.id})
                    .then(res => {
                        if(res.data.status){
                            this.$refs.sub.innerText = 'Subscribed'
                        }else{
                            this.$refs.sub.innerText = 'Subscribe'
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    }
                )
                window.location.reload()
            }

        }
    },
    mounted(){
        console.log(this.id)
        axios.post('/api/channel/get', this.data)
            .then(res => {
                this.channel = res.data.channel
                this.user = res.data.user
                this.isChannelUser = useUserStore().getID == this.user.id
                this.bannerURL = 'http://localhost:4000/api/file/' + this.channel.Banner_Pic
                this.profileURL = 'http://localhost:4000/api/file/' + this.user.Profile_Pic
            })
            .catch(err => {
                console.log(err)
            })
    }
}

</script>
