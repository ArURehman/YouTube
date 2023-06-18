<template>
    <div class="text-white px-40">
        <div class="mb-5">
            <h4 class="mt-2 mb-4 text-base font-medium ml-1">Details:</h4>
            <textarea maxlength="50" required v-model="title" placeholder="Title" class="h-16 text-sm w-full min-h-10 p-2 bg-searchBarGray rounded overflow-hidden break-words resize-x whitespace-normal outline-none text-textWhite"></textarea>
            <textarea maxlength="250" required v-model="description" placeholder="Description" class="h-24 text-sm w-full min-h-10 p-2 bg-searchBarGray rounded overflow-hidden break-words resize-x whitespace-normal outline-none text-textWhite"></textarea>
        </div>
        <div>
            <h4 class="mt-2 mb-2 text-base font-medium ml-1">Tags:</h4>
            <div @keydown.space="addTag" class="flex w-full h-11 p-2 rounded-md bg-searchBarGray text-textWhite">
                <span v-for="(tag, index) in tags" class="text-sm mt-[1px] ml-1 rounded-md bg-gray px-2">{{ tag }}<button class="ml-1 rounded-full p-1 hover:bg-gray" @click="deleteTag(index)"><font-awesome-icon icon="fa-solid fa-x" size="xs" style="color: #ffffff;" /></button></span>
                <textarea max-length="250" required v-model="tag" ref="tagInput" type="text" class="pt-1 overflow-hidden break-words resize-x whitespace-normal flex-1 h-full border-none outline-none text-sm bg-searchBarGray text-textWhite"></textarea>
            </div>
        </div>
        <div class="flex gap-2 mt-3">
            <h4 class="mt-4 mb-4 text-base font-medium ml-1">Video:</h4>
            <div class="relative top-2 py-2">
                <input ref="vidFile" @change="displayFileName" type="file" name="video" id="video" accept="video/*" class="hidden" required>
                <label ref="vidLabel" for="video" class="cursor-pointer text-sm bg-almostBlack hover:bg-searchBarGray text-white py-2 px-4 rounded-full">
                    {{ vid_message }}
                </label>
            </div>
        </div>
        <div class="flex gap-2 mt-0">
            <h4 class="mt-4 mb-4 text-base font-medium ml-1">Thumbnail:</h4>
            <div class="relative top-2 py-2">
                <input ref="imageFile" @change="displayThumbnailFileName" type="file" name="image" id="image" accept="image/*" class="hidden" required>
                <label ref="imageLabel" for="image" class="cursor-pointer text-sm bg-almostBlack hover:bg-searchBarGray text-white py-2 px-4 rounded-full">
                    {{ thumbnail_message }}
                </label>
            </div>
        </div>
        <div class="flex gap-6 mt-3">
            <h4 class="mt-[10px] mb-4 text-base font-medium ml-1">Visibility:</h4>
            <div class="flex gap-2">
                <div class="mt-3 text-[1rem] font-light">
                    <input type="radio" :value="true" name="visibility" id="public" v-model="visibility">
                    <label for="public">Public</label>
                </div>
                <div class="mt-3 text-[1rem] font-light">
                    <input type="radio" :value="false" name="visibility" id="private" v-model="visibility">
                    <label for="private">Private</label>
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-3 text-sm mb-8">
            <button @click="handleCancel" class="py-2 px-3 bg-searchBarGray hover:bg-gray ease-in-out duration-300 rounded-2xl">Cancel</button>
            <button @click="handleUpload" class="py-2 px-3 bg-highlightBlue hover:bg-[#478ac4] ease-in-out duration-300 rounded-2xl">Upload</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'Upload',
    props: ['id'],
    data(){
        return{
            thumbnail_message: 'Select Thumbnail',
            vid_message: 'Select Video',
            title: '',
            description: '',
            visibility: true,
            tags: [],
            tag: '',
        }
    },
    methods: {
        displayThumbnailFileName(){
            let thumbnail_message = this.$refs.imageFile.files[0].name
            if(thumbnail_message.length > 15){
                this.thumbnail_message = thumbnail_message.substring(0, 15) + '...'
            }
            else{
                this.thumbnail_message = thumbnail_message
            }
        },
        displayFileName(){
            let vid_message = this.$refs.vidFile.files[0].name
            if(vid_message.length > 15){
                this.vid_message = vid_message.substring(0, 15) + '...'
            }
            else{
                this.vid_message = vid_message
            }
        },
        handleCancel(){
            this.$router.push({name: 'Channel', params: {id: this.id}})
        },
        handleUpload(event){
            event.preventDefault()

            const formData = new FormData();
            formData.append('id', this.id)
            formData.append('title', this.title)
            formData.append('description', this.description)
            formData.append('image', this.$refs.imageFile.files[0])
            formData.append('video', this.$refs.vidFile.files[0])
            formData.append('visibility', this.visibility)

            axios.post('/api/channel/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                window.alert(res.data.message)
                axios.post('/api/video/tags', {id: this.id, tags: this.tags})
                .then(res => {
                    console.log(res.data.message)
                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
                window.location.reload()
            })
            .catch(err => {
                window.alert(err.data.message)
            })
        },
        handleTagUpload(){
            
        },
        addTag(){
            if(this.tags.includes(this.tag)){
                this.tag = ''
                return
            }
            this.tags.push(this.tag)
            this.tag = ''
        },
        deleteTag(index){
            this.tags.splice(index, 1)
            const filteredArray = this.tags.filter(Boolean);
            console.log(filteredArray);
        }
    }
}

</script>