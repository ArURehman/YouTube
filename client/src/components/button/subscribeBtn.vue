<template>
    <button @click="toggleSubscribe" ref="sub" class="text-xs bg-searchBarGray h-9 px-4 mt-6 rounded-2xl hover:bg-gray ease-in-out duration-300">{{ isSubscribed }}</button>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../stores/userStore';

export default{
    name: 'SubscribeBtn',
    props: ['id'],
    data(){
        return{
            isSubscribed: false,
            id: this.id,
        }
    },
    computed: {
        isSubscribed(){
            axios.post('/api/user/subscribe-status', {UserID: useUserStore().getID, ChannelID: this.id})
                .then(res => {
                    if(res.data.status && useUserStore().getAuthenticated){
                        this.isSubscribed = true
                        this.$refs.sub.innerText = 'Subscribed'
                    }else{
                        this.isSubscribed = false
                        this.$refs.sub.innerText = 'Subscribe'
                    }
                })
                .catch(err => {
                    console.log(err)
                }
            )
        },
    },
    methods: {
        toggleSubscribe(){
            if(!useUserStore().getAuthenticated){
                this.$router.push({name: 'Login'})
            }else{
                if(this.isSubscribed){
                    axios.post('/api/user/unsubscribe', {UserID: useUserStore().getID, ChannelID: this.id})
                        .then(res => {
                            this.isSubscribed = res.data.status
                            this.$refs.sub.innerText = 'Subscribe'
                        })
                        .catch(err => {
                            console.log(err)
                        }
                    )
                }else{
                    axios.post('/api/user/subscribe', {UserID: useUserStore().getID, ChannelID: this.id})
                        .then(res => {
                            this.isSubscribed = res.data.status
                            this.$refs.sub.innerText = 'Subscribed'
                        })
                        .catch(err => {
                            console.log(err)
                        }
                    )
                }
                this.$emit('reload')
            }

        }
    }
}

</script>