<template>
    <div class="flex px-5 gap-5 pt-4">
        <div>
            <PlayingVideo/>
            <Comment/>
        </div>
        <div class="min-w-[21rem]">
            <smallVideoCard/>
        </div>
    </div>
</template>

<script>
import PlayingVideo from '../../components/video/playingVideo.vue';
import smallVideoCard from '../../components/video/smallVideoCard.vue';
import Comment from '../../components/comment/Comment.vue';
import axios from 'axios';
import { useUserStore } from '../../stores/userStore';

export default{
    name: "Play",
    props: ["id"],
    components: { PlayingVideo, smallVideoCard, Comment },
    data() {
        return {

        };
    },
    methods: {
        // addToHistory() {
        //     axios.post('/api/user/add-history', {UserID: useUserStore().getID, VideoID: this.$route.params.id})
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // }
    },
    mounted() {
        // setTimeout(() => {
        //     axios.post('/api/video/increase-views', { id: this.$route.params.id })
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // }, 1000);
        // addToHistory()
    },
}

</script>