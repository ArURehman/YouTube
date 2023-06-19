<template>
    <div class="text-white text-xs mt-6 font-semibold">
        <div class="mb-7">
            <h4 ref="commentCount"></h4>
            <MakeComment v-show="loggedIn" :is-reply="false" type="Comment" :parent="null" @update="reloadWindow"/>
        </div>
        <div class="mt-2">
            <CommentList :is-reply="false"  @count="count"/>
        </div>
    </div>
    <div class="mb-16"></div>
</template>

<script>
import MakeComment from './MakeComment.vue'
import CommentList from './CommentList.vue'
import axios from 'axios'
import { useUserStore } from '../../stores/userStore'

export default{
    name: 'Comment',
    components: {MakeComment, CommentList},
    data(){
        return{
            
        }
    },
    methods: {
        count(count){
            this.$refs.commentCount.innerHTML = count + ' Comments'
        },
        reloadWindow(){
            window.location.reload()
        }
    },
    computed: {
        loggedIn(){
            return useUserStore().getAuthenticated
        }
    },
    mounted(){
        axios.post('/api/comment/count-comments', {
            VideoID: this.$route.params.id
        })
        .then(res => {
            this.$refs.commentCount.innerHTML = res.data.count + ' Comments'
        })
        .catch(err => console.log(err))
    }
}

</script>