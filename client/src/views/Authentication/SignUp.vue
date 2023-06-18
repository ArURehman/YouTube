<template>
    <div @click.self="gotoMainSite" class="w-full h-full bg-searchBarGray absolute text-white">
        <div class="w-72 h-[26rem] bg-almostBlack m-auto relative z-30 top-32 rounded-xl p-4 flex-col">
            <div class="mx-[4.7rem] mt-5 flex gap-1">
                <font-awesome-icon icon="fa-brands fa-youtube" size="2xl" style="color: #ff0000;" />
                <span class="font-Gothic text-2xl before:content[''] before:w-4 before:h-4 before:bg-white before:absolute before:-z-10 before:left-[6.2rem] before:bottom-[22.2rem]">YouTube</span>
            </div>
            <form @submit="submitSignUp" class="p-[24px] mt-2">
                <div class="pb-8 pt-2 pl-[10px] flex gap-2 font-Roboto text-sm font-light">
                    <font-awesome-icon class="mt-2" icon="fa-solid fa-user" size="md" style="color: #ffffff;" />
                    <input v-model="username" required placeholder="Username" class="bg-almostBlack border-b-2 border-b-white  font-light" type="text">
                </div>
                <div class="pb-8 pt-2 pl-[10px] flex gap-2 font-Roboto text-sm font-light">
                    <font-awesome-icon class="mt-2" icon="fa-solid fa-envelope" size="md" style="color: #ffffff;" />
                    <input v-model="email" required placeholder="example@email.com" class="bg-almostBlack border-b-2 border-b-white  font-light" type="text">
                </div>
                <div class="pb-8 pt-2 pl-[10px] flex gap-2 font-Roboto text-sm">
                    <font-awesome-icon class="mt-2" icon="fa-solid fa-lock" size="md" style="color: #ffffff;" />
                    <input v-model="password" required placeholder="Password" class="bg-almostBlack border-b-2 border-b-white font-light" type="password">
                </div>
                <div class="pb-2 pt-2 pl-[10px] flex gap-2 font-Roboto text-sm">
                    <font-awesome-icon class="mt-[2px]" icon="fa-solid fa-camera-retro" size="md" style="color: #ffffff;" />
                    <div class="relative">
                        <input ref="imageFile" @change="displayFileName" type="file" name="image" id="image" accept="image/*" class="hidden" required>
                        <label ref="imageLabel" for="image" class="cursor-pointer bg-almostBlack hover:bg-gray text-white py-2 px-4 rounded-full">
                            {{ message }}
                        </label>
                    </div>

                </div>
                <div class="mt-5 px-2 flex justify-around gap-2">
                    <button ref="signUp" type="submit" class="border-2 border-[#ff0000] duration-300 hover:font-medium rounded-xl px-3 py-2 hover:bg-[#ff0000] ease-in-out">Sign Up</button>
                    <button @click="gotoLogin" class="ease-in-out duration-300 border-2 border-[#ff0000] hover:font-medium rounded-xl px-4 py-2 hover:bg-[#ff0000]">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'SignUp',
    data(){
        return{
            username: '',
            email: '',
            password: '',
            image: null,
            message: 'Select Profile Pic'
        }
    },
    methods: {

        gotoMainSite(){
            this.$router.go(-1)
        },
        gotoLogin(){
            this.$router.push({name: 'Login'})
        },
        //save name of file instead of label when user enter file
        displayFileName(){
            let message = this.$refs.imageFile.files[0].name
            if(message.length > 15){
                this.message = message.substring(0, 15) + '...'
            }
            else{
                this.message = message
            }
        },
        submitSignUp(event){

            event.preventDefault()
            this.image = this.$refs.imageFile.files[0]

            const formData = new FormData();
            formData.append('username', this.username)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('image', this.image)

            axios.post('/api/auth/signup', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => {
                window.alert(response.data.message)
                this.$router.push({name: 'Login'})
            }).catch(err => {
                window.alert(err.message)
            })

        }
    }
}
</script>