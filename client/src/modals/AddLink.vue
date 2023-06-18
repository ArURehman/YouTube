<template>
    <div class="relative h-full w-full bg-slate-400 blur-lg z-10">
        <div class="absolute bg-almostBlack h-28 w-28">
            <div class="flex">

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{

    name: 'AddLink',
    props: ['id'],
    data(){
        return{
            link_name: "",
            link_url: "",
        }
    },
    methods:{
        handleLinkAdd(){
            axios.post('/api/channel/add-link', {id: this.id, name: this.link_name, link: this.link_url})
                .then(res => {
                    this.link_name = ""
                    this.link_url = ""
                })
                .catch(err => {
                    window.alert(err.message)
                }
            )
        }
    },


}
</script>