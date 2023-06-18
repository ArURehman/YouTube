<template>
    <div class="text-white grid grid-cols-3 text-xs">
        <div class="col-span-3 sm:col-span-2 flex-col justify-start pr-24">
            <div class="flex justify-start gap-2 py-2">
                <h5 class="text-sm font-medium my-2">Description</h5>
                <button v-if="!editingDesc && isChannelUser" class="text-xs text-textWhite bg-searchBarGray px-3 rounded-3xl hover:bg-gray ease-in-out duration-300" @click="handleDescEdit">Edit</button>
            </div>
            <P v-if="!editingDesc" class="text-xs mt-1">{{ channel_desc }}</P>
            <div v-if="editingDesc" class="">
                <textarea maxlength="250" required v-model="edited_desc" ref="descInput" class="h-24 text-xs w-full min-h-10 p-2 bg-searchBarGray rounded overflow-hidden break-words resize-x whitespace-normal outline-none text-textWhite"></textarea>
                <div class="flex justify-end gap-2 mt-1">
                    <button @click="handleDescCancel" class="py-2 px-3 bg-searchBarGray hover:bg-gray ease-in-out duration-300 rounded-2xl">Cancel</button>
                    <button @click="handleDescSave" class="py-2 px-3 bg-highlightBlue hover:bg-[#478ac4] ease-in-out duration-300 rounded-2xl">Save</button>
                </div>
            </div>
            <hr class="w-full bg-almostBlack my-7 border-1 border-gray">
            <div class="flex justify-start gap-2 py-2">
                <h5 class="text-sm font-medium my-2">Details</h5>
                <button v-if="!editingEmail && isChannelUser" @click="handleEmailEdit" class="text-xs text-textWhite bg-searchBarGray px-3 rounded-3xl hover:bg-gray ease-in-out duration-300">Edit</button>
            </div>
            <div class="text-xs flex gap-4 mt-2">
                <p class="text-[#a5a5a5]" :class="{'mt-0' : editingEmail}">For business inquiries: </p>
                <p v-if="!editingEmail">{{ channel_email }}</p>
                <div v-if="editingEmail" class="w-full">
                    <input required max-lenght="250" v-model="edited_email" class="h-auto w-full min-h-10 p-2 bg-searchBarGray rounded" ref="emailInput" type="email">
                    <div class="flex justify-end gap-2 mt-2">
                        <button @click="handleEmailCancel" class="py-2 px-3 bg-searchBarGray hover:bg-gray ease-in-out duration-300 rounded-2xl">Cancel</button>
                        <button @click="handleEmailSave" class="py-2 px-3 bg-highlightBlue hover:bg-[#478ac4] ease-in-out duration-300 rounded-2xl">Save</button>
                </div>
            </div>
            </div>
            <hr class="w-full bg-almostBlack my-7 border-1 border-gray">
            <div class="flex justify-start gap-1">
                <h5 class="text-sm font-medium my-2">Links</h5>
                <button @click="toggleLinkEdit" v-if="isChannelUser" class="hover:bg-blue-500 hover:bg-opacity-10 px-4 rounded-full"><font-awesome-icon icon="fa-solid fa-plus" size="xs" style="color: #377cb7;" /></button>
                
            </div>
            <div v-if="link_editing" class="w-full my-3">
                <div class="">
                    <div class="flex w-full my-2">
                        <h1 class="text-sm text-textWhite mr-4 mt-[6px]">Name:</h1>
                        <input required max-lenght="250" v-model="link_name" class="h-auto w-[92%] min-h-8 p-2 bg-searchBarGray rounded" ref="linkNameInput" type="text">
                    </div>
                    <div class="flex w-full my-2">
                        <h1 class="text-sm text-textWhite mr-[26px] mt-[7px]">Link:</h1>
                        <input required max-lenght="250" v-model="link_url" class="h-auto w-[90%] min-h-8 p-2 bg-searchBarGray rounded" ref="linkInput" type="text">
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-2">
                    <button @click="toggleLinkEdit" class="py-2 px-3 bg-searchBarGray hover:bg-gray ease-in-out duration-300 rounded-2xl">Cancel</button>
                    <button @click="handleLinkAdd" class="py-2 px-3 bg-highlightBlue hover:bg-[#478ac4] ease-in-out duration-300 rounded-2xl">Save</button>
                </div>
            </div>
            <div class="text-xs mt-2 text-blue-600 pr-48 flex justify-start flex-wrap gap-2">
                <a v-for="(link, index) in links" :key="link.id" target="_blank" class="mr-2 hover:bg-blue-400 hover:bg-opacity-20 px-3 py-2 rounded-2xl inline-block" :href="link.Link">{{ link.LinkName }}<button @click.prevent="handleLinkDelete(index)" v-if="isChannelUser" class="hover:bg-blue-500 hover:bg-opacity-10 px-3 rounded-full ml-1"><font-awesome-icon icon="fa-solid fa-minus" size="xs" style="color: #377cb7;" /></button></a>
            </div>
            <div class="mb-16"></div>
        </div>
        <div class="col-span-3 sm:col-span-1">
            <h5 class="text-sm font-medium my-2">Stats</h5>
            <p><span class="mr-2 font-medium">Joined:</span>{{ join_date }}</p>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../../stores/userStore'
import axios from 'axios'

export default{
    name: 'ChannelAbout',
    data(){
        return{
            channel_desc: "",
            edited_desc: "",
            editingDesc: false,
            channel_email: "",
            edited_email: "",
            editingEmail: false,
            channel: {},
            user: {},
            links: [],
            data: {
                id: this.$route.params.id,
            },
            isChannelUser: false,
            join_date: "",
            link_editing: false,
            link_name: "",
            link_url: "",
            base_link: "https://www."
        }
    },
    methods: {
        handleDescEdit(){
            this.edited_desc = this.channel_desc
            this.editingDesc = true
        },
        handleDescSave(){
            if(!this.isChannelUser) return
            axios.post('/api/channel/update-desc', {id: this.$route.params.id, desc: this.edited_desc})
                .then(res => { 
                    this.channel_desc = this.edited_desc
                    this.editingDesc = false
                })
                .catch(err => {
                    window.alert(err.message)
                }
            )
        },
        handleDescCancel(){
            this.edited_desc = ""
            this.editingDesc = false
        },
        handleEmailEdit(){
            this.edited_email = this.channel_email
            this.editingEmail = true
        },
        handleEmailSave(){
            axios.post('/api/channel/update-email', {id: this.$route.params.id, email: this.edited_email})
                .then(res => {
                    this.channel_email = this.edited_email
                    this.editingEmail = false
                })
                .catch(err => {
                    window.alert(err.message)
                }
            )
        },
        handleEmailCancel(){
            this.edited_email = ""
            this.editingEmail = false
        },
        toggleLinkEdit(){
            this.link_name = ""
            this.link_url = ""
            this.link_editing = !this.link_editing
        },
        handleLinkAdd(event){
            event.preventDefault()
            axios.post('/api/channel/add-link', {id: this.$route.params.id, link: this.link_url, name: this.link_name})
                .then(res => {
                    this.link_url = ""
                    this.link_name = ""
                    window.location.reload()
                })
                .catch(err => {
                    window.alert(err.message)
                }
            )
        },
        loadLinks(){
            axios.post('/api/channel/get-links', {id: this.$route.params.id})
                .then(res => {
                    this.links = res.data.links
                })
                .catch(err => {
                    window.alert(err.message)
                }
            )
        },
        handleLinkDelete(index){
            axios.post('/api/channel/delete-link', {id: this.links[index].id})
                .then(res => {
                    window.location.reload()
                })
                .catch(err => {
                    window.alert(err.message)
                }
            )
        }
    },
    mounted(){
        axios.post('/api/channel/get', this.data)
            .then(res => {
                this.channel = res.data.channel
                this.isChannelUser = useUserStore().getID == res.data.user.id
                this.channel_desc = this.channel.Description
                this.channel_email = this.channel.B_email
                this.join_date = (new Date(this.channel.createdAt)).toLocaleDateString('en-US', 
                { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            })
            .catch(err => {
                console.log(err)
            })
            this.loadLinks()
    }
}
</script>