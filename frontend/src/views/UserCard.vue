<template>
    <div class="user">
        <router-link :to="`/users/user/${user._id}`" class="name">
            {{user.first_name}} {{user.last_name}}
        </router-link>
        <button class="clear-cache" v-if="user.redisCached" @click.stop="$emit('clearCache')">Clear Cache</button>
    </div>
</template>

<script>
    export default {
        name: "UserCard",
        props: ['user'],
        data() {
            return {}
        }
    };
</script>
<style lang="scss" scoped>
    .user {
        height: 150px;
        width: 150px;
        margin: 10px;
        position: relative;
        border: 1px solid #eee;
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
        display: inline-flex;
        padding: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .clear-cache {
        position: absolute;
        bottom: 10px;
    }
</style>