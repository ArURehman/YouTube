<template>
    <div @click.self="emitCloseLogin()" class="w-full h-full bg-searchBarGray absolute text-white">
        <div class="w-72 h-[22rem] bg-almostBlack m-auto relative z-30 top-36 rounded-xl p-4 flex-col">
            <div class="mx-[4.7rem] mt-5 flex gap-1">
                <font-awesome-icon icon="fa-brands fa-youtube" size="2xl" style="color: #ff0000;" />
                <span class="font-Gothic text-2xl before:content[''] before:w-4 before:h-4 before:bg-white before:absolute before:-z-10 before:left-[6.2rem] before:bottom-[18.3rem]">YouTube</span>
            </div>
            <div class="p-[24px] mt-7">
                <div class="pb-8 pt-2 pl-[10px] flex gap-2 font-Roboto text-sm font-light">
                    <font-awesome-icon class="mt-2" icon="fa-solid fa-user" size="md" style="color: #ffffff;" />
                    <input placeholder="Email" class="bg-almostBlack border-b-2 border-b-white  font-light" type="text">
                </div>
                <div class="pb-8 pt-2 pl-[10px] flex gap-2 font-Roboto text-sm">
                    <font-awesome-icon class="mt-2" icon="fa-solid fa-lock" size="md" style="color: #ffffff;" />
                    <input placeholder="Password" class="bg-almostBlack border-b-2 border-b-white font-light" type="password">
                </div>
                <div class="mt-5 px-2 flex justify-around gap-2">
                    <button class="ease-in-out duration-300 border-2 border-[#ff0000] hover:font-medium rounded-xl px-4 py-2 hover:bg-[#ff0000]">Login</button>
                    <button @click="emitOpenSignUp" class="border-2 border-[#ff0000] duration-300 hover:font-medium rounded-xl px-3 py-2 hover:bg-[#ff0000] ease-in-out">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'Login',
    methods: {
        emitCloseLogin(){
            this.$emit('closeLogin')
        },
        emitOpenSignUp(){
            this.$emit('openSignUpFL')
        }
    }
}
</script>