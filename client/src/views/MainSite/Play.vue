<template>
    
</template>

<script>
import axios from 'axios'

export default{
    name: 'Play',
    props: ['id'],
    data(){
        return{
            video: {},
            isChannelUser: false,
        }
    },
}

</script>