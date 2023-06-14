<template>
    <div @click.self="emitCloseSignUp();emitOpenLogin()" class="w-full h-full bg-searchBarGray absolute text-white">
        <div class="w-72 h-[26rem] bg-almostBlack m-auto relative z-30 top-32 rounded-xl p-4 flex-col">
            <div class="mx-[4.7rem] mt-5 flex gap-1">
                <font-awesome-icon icon="fa-brands fa-youtube" size="2xl" style="color: #ff0000;" />
                <span class="font-Gothic text-2xl before:content[''] before:w-4 before:h-4 before:bg-white before:absolute before:-z-10 before:left-[6.2rem] before:bottom-[22.2rem]">YouTube</span>
            </div>
            <div class="p-[24px] mt-2">
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
                        <input type="file" name="profile" id="profile" accept="image/*" class="hidden" required>
                        <label for="profile" class="cursor-pointer bg-almostBlack hover:bg-gray text-white py-2 px-4 rounded-full">
                            Select Profile Pic
                        </label>
                    </div>

                </div>
                <div class="mt-5 px-2 flex justify-around gap-2">
                    <button ref="signUp" class="border-2 border-[#ff0000] duration-300 hover:font-medium rounded-xl px-3 py-2 hover:bg-[#ff0000] ease-in-out">Sign Up</button>
                    <button @click="emitOpenLogin" class="ease-in-out duration-300 border-2 border-[#ff0000] hover:font-medium rounded-xl px-4 py-2 hover:bg-[#ff0000]">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { watch } from 'vue'
export default{
    name: 'SignUp',
    data(){
        return{
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        emitCloseSignUp(){
            this.$emit('closeSignUp')
        },
        emitOpenLogin(){
            this.$emit('openLoginFS')
        }
    }
}
</script>