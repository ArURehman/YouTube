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

export default{
    name: "Play",
    props: ["id"],
    components: { PlayingVideo, smallVideoCard, Comment },
    data() {
        return {
            video: {},
            isChannelUser: false,
        };
    },
}

</script>