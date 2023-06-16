import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        username: '',
        email: '',
        profilePic: '',
        authenticated: false,
        profileURL: '',
        
    }),
    getters: {
        getID: (state) => state.id,
        getUsername: (state) => state.username,
        getEmail: (state) => state.email,
        getProfilePic: (state) => state.profilePic,
        getAuthenticated: (state) => state.authenticated,
        getProfileURL: (state) => state.profileURL,
        getAll: (state) => state,
    },
    actions: {
        setUser(user) {
            this.id = user.id
            this.username = user.UserName
            this.email = user.Email
            this.profilePic = user.Profile_Pic
            this.authenticated = true
            console.log("User set successfully")
        },
        logout() {
            this.id = ''
            this.username = ''
            this.email = ''
            this.profilePic = ''
            this.authenticated = false
        }
    },
})
