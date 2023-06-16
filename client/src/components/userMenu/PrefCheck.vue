<template>
    <div class="flex py-2 hover:bg-gray justify-between hover:rounded-sm my-1">
        <p class="ml-3 mt-[2px]">History</p>
        <label class="relative inline-flex items-center mr-3 cursor-pointer rounded-full">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>   
    </div>
    <div class="flex py-2 hover:bg-gray justify-between hover:rounded-sm my-1">
        <p class="ml-3 mt-[2px]">Videos</p>
        <label class="relative inline-flex items-center mr-3 cursor-pointer rounded-full">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>   
    </div>
    <div class="flex py-2 hover:bg-gray justify-between hover:rounded-sm my-1">
        <p class="ml-3 mt-[2px]">Subscription</p>
        <label class="relative inline-flex items-center mr-3 cursor-pointer rounded-full">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>   
    </div>
    <div class="flex py-2 hover:bg-gray justify-between hover:rounded-sm my-1">
        <p class="ml-3 mt-[2px]">Interaction</p>
        <label class="relative inline-flex items-center mr-3 cursor-pointer rounded-full">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>   
    </div>
</template>

<script>

export default{
    name: 'PrefCheck',
    data(){
        return{
            prefName: this.pref
        }
    }
}

</script>