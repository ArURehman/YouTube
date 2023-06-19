<template>
    <div v-for="(comment, index) in comments" :key="comment.id" class="mt-3 font-medium flex w-full mb-4" :class="{'pl-9' : isReply}">
        <div class="w-12"><img class="w-7 h-7 mt-2 rounded-full" :src="commenterProfile(comment)" alt=""></div>
        <div>
            <p class="text-[0.7rem] text-[#a5a5a5]"><span>{{ comment.UserName }}</span> &bull; <span>{{ getDate(comment) }}</span></p>
            <p class="pr-3">{{ comment.Com_Text }}</p>
            <div class="flex gap-3 mt-1">
                <button><font-awesome-icon icon="fa-solid fa-thumbs-up" size="xs" style="color: #a5a5a5;" /></button>
                <button><font-awesome-icon icon="fa-solid fa-thumbs-down" size="xs" style="color: #a5a5a5;" /></button>
                <button @click="toggledReply(index)" class="text-[#a5a5a5]">Reply</button>
            </div>
            <MakeComment @closeReply="toggledReply(index)" v-if="comment.show" :is-reply="true" type="Reply" :parent="comment.id"/>
            <button @click="showReplies(comment)" v-if="!comment.hidden" ref="replies" class="mt-2 text-highlightBlue rounded-2xl px-2 py-1 hover:bg-[#a9d1f5] hover:bg-opacity-20">{{ countReplies(comment) }}<font-awesome-icon class="ml-1" icon="fa-solid fa-chevron-down" size="xs" style="color: #377cb7;" /></button>
        </div>
    </div>
</template>

<script>
import MakeComment from './MakeComment.vue';
import { useUserStore } from '../../stores/userStore'
import axios from 'axios'

export default{
    name: 'CommentList',
    components: {MakeComment},
    props: ['isReply'],
    data(){
        return{
            comments: [],
            replies: []
        }
    },
    methods: {
        toggledReply(index){
            if(!useUserStore().getAuthenticated) this.$router.push({name: 'Login'})
            this.comments[index].show = !this.comments[index].show
        },
        commenterProfile(comment){
            return 'http://localhost:4000/api/file/' + comment.Profile_Pic
        },
        getDate(comment){
            let date = (new Date(comment.createdAt)).toLocaleDateString('en-US', 
                { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            return date
        },
        countReplies(comment){
            axios.post('/api/comment/count-replies', {
                VideoID: this.$route.params.id,
                parentCommentID: comment.id
            })
            .then(res => {
                setTimeout(() => {
                    if(res.data.count === 0){
                        comment.hidden = true
                    }
                    return res.data.count + ' Replies'
                }, 1000);
            })
            .catch(err => console.log(err))
        },
        showReplies(cmnt){
            axios.post('/api/comment/get-replies', {
                parentCommentID: cmnt.id,
                VideoID: this.$route.params.id
            })
            .then(res => {
                let replies = res.data.replies;
                this.comments = this.comments.map(comment => {
                    if(comment.id === comment.id){
                        return {...comment, replies: replies.map(reply => {
                            return {...reply, show: false}
                        })}
                    }
                    return comment
                })
            })
        }
    },
    mounted(){
        axios.post('/api/comment/get', {
                VideoID: this.$route.params.id
            })
            .then(res => {
                let comments = res.data.comments;
                this.comments = comments.map(comment => {
                    return {...comment, show: false, hidden: false}
                })
            })
            .catch(err => console.log(err))
    }
}
</script>