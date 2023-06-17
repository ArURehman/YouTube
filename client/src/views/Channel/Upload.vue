<template>
    <div class="text-white px-40">
        <div class="mb-5">
            <h4 class="mt-2 mb-4 text-xl font-medium ml-1">Details:</h4>
            <textarea maxlength="50" v-model="title" placeholder="Video Title" class="h-16 text-sm w-full min-h-10 p-2 bg-searchBarGray rounded overflow-hidden break-words resize-x whitespace-normal outline-none text-textWhite"></textarea>
            <textarea maxlength="250" v-model="description" placeholder="Video Description" class="h-24 text-sm w-full min-h-10 p-2 bg-searchBarGray rounded overflow-hidden break-words resize-x whitespace-normal outline-none text-textWhite"></textarea>
        </div>
        <div class="flex gap-2">
            <h4 class="mt-2 mb-4 text-xl font-medium ml-1">Video:</h4>
            <div class="relative">
                <input ref="vidFile" @change="displayFileName" type="file" name="image" id="image" accept="image/*" class="hidden" required>
                <label ref="vidLabel" for="image" class="cursor-pointer bg-almostBlack hover:bg-gray text-white py-2 px-4 rounded-full">
                    {{ vid_message }}
                </label>
            </div>
        </div>
        <div class="flex gap-2">
            <h4 class="mt-2 mb-4 text-xl font-medium ml-1">Thumbnail:</h4>
            <div class="relative">
                <input ref="imageFile" @change="displayThumbnailFileName" type="file" name="image" id="image" accept="image/*" class="hidden" required>
                <label ref="imageLabel" for="image" class="cursor-pointer bg-almostBlack hover:bg-gray text-white py-2 px-4 rounded-full">
                    {{ thumbnail_message }}
                </label>
            </div>
        </div>
        <div class="flex gap-3">
            <h4 class="mt-2 mb-4 text-xl font-medium ml-1">Visibility:</h4>
            <div class="mt-3 text-[1rem] font-light">
                <input type="radio" :value="true" name="visibility" id="public" v-model="visibility">
                <label for="public">Public</label>
            </div>
            <div class="mt-3 text-[1rem] font-light">
                <input type="radio" :value="false" name="visibility" id="private" v-model="visibility">
                <label for="private">Private</label>
            </div>
        </div>
        <div class="flex justify-end gap-3 text-sm">
            <button class="py-2 px-3 bg-searchBarGray hover:bg-gray ease-in-out duration-300 rounded-2xl">Cancel</button>
            <button class="py-2 px-3 bg-highlightBlue hover:bg-[#478ac4] ease-in-out duration-300 rounded-2xl">Upload</button>
        </div>
    </div>
</template>

<script>

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
                window.location.reload()
            })
            .catch(err => {
                window.alert('Error uploading video')
            })
        }
    }
}

</script>