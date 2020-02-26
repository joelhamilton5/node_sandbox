<template>
    <div class="about">
        <h1>Users</h1>
        <div class="clear-cache">
            <button @click="clearCache()">Clear All Cached</button>
        </div>
        <user-card v-for="user in users" :user="user" @clearCache="clearCache(user._id)"></user-card>
    </div>
</template>

<script>
    import UserCard from './UserCard';

    var axios = require('axios');
    export default {
        data() {
            return {
                users: {}
            }
        },
        methods: {
            clearCache(id = '') {
                axios.post(this.$store.state.endpoint + `/users/clearCached${id ? '/' + id : ''}`)
                    .then(res => {
                        if (res.data.success) {
                            this.fetchUsers();
                        }
                    })
            },
            fetchUsers() {
                axios.get(this.$store.state.endpoint + '/users')
                    .then(res => {
                        this.users = res.data.users,
                            this.message = res.data.message
                    })
                    .catch(e => console.log(e.response))
            }
        },
        created() {
            this.fetchUsers();
        },
        components: {
            UserCard
        }
    }
</script>

<style lang="scss" scoped>
    .clear-cache {
        margin: 15px 0;
        text-align: center;
    }
</style>