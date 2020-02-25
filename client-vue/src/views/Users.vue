<template>
    <div class="about">
        <h1>Users</h1>
        <div class='user' v-for="user in res">
            <a :href="`/users/user/${user._id}`" class="name">{{user.first_name}} {{user.last_name}}</a>
        </div>
    </div>
</template>

<script>
    var axios = require('axios');
    export default {
        data() {
            return {
                msg: 'hi',
                res: {}
            }
        },
        created() {
            axios.get(this.$store.state.endpoint + '/users')
                .then(res => {
                    this.res = res.data.users
                })
                .catch(e => console.log(e.response))
        }
    }
</script>

<style lang="scss">

</style>