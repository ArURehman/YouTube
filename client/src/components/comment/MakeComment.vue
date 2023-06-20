<template>
    <div class="flex justify-start gap-2 text-xs mt-4 font-medium" :class="{'pl-6 mt-3 pr-5' : isReply}">
        <img class="w-7 h-7 rounded-full" :class="{'min-w-6 h-4' : isReply}" :src="profile" alt="">
        <div>
            <input maxlength="250" v-model="txtInput" ref="textInput" @click="() => commActive = true" :placeholder="type" class="bg-almostBlack border-b-2 border-b-gray w-[47.8rem] h-6 pb-[1px]" :class="{'w-[34rem]' : isReply}" required type="text">
            <div class="flex justify-end gap-3 my-3 mx-1" :class="{'hidden' : !commActive}">
                <button @click="toggleCommActive" class="hover:bg-searchBarGray px-3 py-2 rounded-2xl ease-in-out duration-300">Cancel</button>
                <button @click="postComment" class="bg-[#2C8EBD] px-3 py-2 rounded-2xl text-black">{{ type }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../../stores/userStore'

export default{
    name: 'MakeComments',
    props: ['isReply', 'type', 'parent'],
    data(){
        return{
            commActive: false,
            txtInput: '',
            VideoID: this.$route.params.id,
            UserID: useUserStore().getID,
            parentCommentID: this.parent
        }
    },
    computed: {
        profile(){
            return 'http://localhost:4000/api/file/' + useUserStore().getProfilePic
        }
    },
    methods: {
        toggleCommActive(){
            this.commActive = !this.commActive
            this.txtInput = ''
            if(this.isReply) this.$emit('closeReply')
        },
        postComment(){
            setTimeout(() => {
                axios.post('/api/comment/post', {
                VideoID: this.VideoID,
                UserID: this.UserID,
                commentText: this.txtInput,
                parentCommentID: this.parentCommentID
            })
            .then(res => {
                this.txtInput = ''
                this.commActive = false
                this.$emit('update')
            })
            .catch(err => console.log(err))
            }, 200);
        }
    }

}
</script>