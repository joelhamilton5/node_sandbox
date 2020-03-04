<template>
    <div class="about">
        <h1>User</h1>
        <div class="message">{{ message }}</div>
        <code class='user'>
            {{ user }}
        </code>
    </div>
</template>

<script>
    var axios = require('axios');
    export default {
        data() {
            return {
                message: '',
                user: {}
            }
        },
        created() {
            axios.get(this.$store.state.endpoint + '/users/user/' + this.$route.params.id)
                .then(res => {
                    this.user = res.data.user;
                    this.message = res.data.message;
                })
                .catch(e => console.log(e.response))
        }
    }
</script>

<style lang="scss" scoped>

    .message {
        font-style: italic;
    }

    .user {
        text-align: left;
        display: inline-block;
        white-space: pre-wrap;
    }
</style>