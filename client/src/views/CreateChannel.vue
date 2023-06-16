<template>
    <div @click.self="gotoHome" class="w-full h-full absolute bg-searchBarGray text-white">
        <div class="max-w-[45rem] h-[35rem] bg-almostBlack m-auto relative z-30 top-[4.7rem] rounded-xl p-4 flex-col">
            <div class="mt-2">
                <img class="w-20 aspect-square rounded-full mx-auto my-1" :src="URL" alt="">
                <p class="font-Gothic font-semibold text-[2rem] text-center">HI, {{ username }}</p>
            </div>
            <div class="my-4">
                <div class="my-2">
                    <p class="font-bold text-sm text-left">Description:</p>
                    <textarea maxlength="250" v-model="description" placeholder="Describe your channel (Optional)" class="h-24 text-sm w-full min-h-10 p-2 bg-searchBarGray rounded overflow-hidden break-words resize-x whitespace-normal outline-none text-textWhite"></textarea>
                </div>
                <div class="my-2">
                    <p class="font-bold text-sm text-left">Business Email:</p>
                    <input v-model="bEmail" placeholder="Enter a public email (Optional)" class="w-full p-2 min-h-10 bg-searchBarGray rounded text-sm text-textWhite" type="email">
                </div>
                <div class="flex mt-7 gap-2">
                    <p class="font-bold text-sm text-left mt-[10px]">Banner Pic:</p>
                    <input ref="imageFile" @change="displayFileName" type="file" name="image" id="image" accept="image/*" class="hidden" required>
                    <label ref="imageLabel" for="image" class="cursor-pointer bg-almostBlack hover:bg-searchBarGray text-white py-2 px-4 rounded-full">
                        {{ message }}
                    </label>
                </div>
            </div>
            <div class="flex justify-center gap-2 mt-[2.4rem]">
                <button @click="createChannel" class="w-[50%] border-[#ff0000] border-2 hover:bg-[#ff0000] duration-300 ease-in-out rounded-xl px-4 py-2 text-white font-medium">Create Channel</button>
                <button @click="$router.push({name:'MainSite'})" class="w-[50%] bg-almostBlack hover:bg-searchBarGray border-2 border-textWhite hover:border-searchBarGray text-white rounded-xl duration-300 ease-in-out px-4 py-2 font-medium">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../stores/userStore'

export default{
    name: 'CreateChannel',
    data(){
        return{
            URL: "http://localhost:4000/api/file/" + useUserStore().getProfilePic,
            username: useUserStore().getUsername.toLocaleUpperCase(),
            message: 'Select Banner Pic',
            description: '',
            bEmail: '',
        }
    },
    methods: {
        gotoHome(){
            this.$router.push({name: 'MainSite'})
        },
        displayFileName(){
            let message = this.$refs.imageFile.files[0].name
            if(message.length > 15){
                this.message = message.substring(0, 15) + '...'
            }
            else{
                this.message = message
            }
        },
        createChannel(event){

            event.preventDefault()
            const UserID = useUserStore().getID
            console.log(UserID)

            const formData = new FormData()
            formData.append('image', this.$refs.imageFile.files[0])
            formData.append('id', UserID)
            formData.append('description', this.description)
            formData.append('email', this.bEmail)

            axios.post('/api/channel/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                window.alert('Channel Created!')
                this.$router.push({name: 'MainSite'})
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}

</script>