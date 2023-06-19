<template>
    <PlayingVideo />
</template>

<script>
import PlayingVideo from '../../components/video/playingVideo.vue';

export default{
    name: "Play",
    props: ["id"],
    components: { PlayingVideo },
    data() {
        return {
            video: {},
            isChannelUser: false,
        };
    },
    components: { PlayingVideo }
}

</script>