<template>
    <div class="about">
        <h1>User</h1>
        <div class='user'>
            {{ user }}
        </div>
    </div>
</template>

<script>
    var axios = require('axios');
    export default {
        data() {
            return {
                msg: 'hi',
                user: {}
            }
        },
        created() {
            axios.get(this.$store.state.endpoint + '/users/user/' + this.$route.params.id)
                .then(res => {
                    this.user = res.data;
                    console.log(res);

                })
                .catch(e => console.log(e.response))
        }
    }
</script>

<style lang="scss">

</style>