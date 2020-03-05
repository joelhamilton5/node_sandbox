<template>
    <div class="home" :class="{'no-user': !usernameSubmitted}">
        <div class="get-user">
            <h2>What is your name?</h2>
            <input class="name-input" v-model="username" @keypress.enter="usernameSubmitted = true"/>
            <button class="submit-name" @click="usernameSubmitted = true">Begin</button>
        </div>

        <h1>Socket.io Test</h1>
        <div class="users">
            <h2>Guests:</h2>
            <div class="user" v-for="(user, i) in users" :key="i">
                <div class="username"><span class="user-color" :style="{background: user.color}"></span>{{ user.name }}
                </div>
                <div class="cursor" v-if="usernameSubmitted && user.name !== username"
                     :style="{ background: user.color, left: user.x + 'px', top: user.y + 'px' }"></div>
            </div>
        </div>

        <input type="text" class="msg" v-model="message" @input="emitMsg">
        <div>
            <button @click="clearMessages">Clear Messages</button>
        </div>
    </div>
</template>

<script>

    // @ is an alias to /src
    // import HelloWorld from "@/components/HelloWorld.vue";
    import _ from 'lodash'
    import io from 'socket.io-client'

    let tinycolor = require("tinycolor2");


    export default {
        name: "Home",
        data() {
            return {
                socket: io(this.$store.state.endpoint),
                message: '',
                username: '',
                usernameSubmitted: false,
                scrollTop: 0,
                scrollLeft: 0,
                users: []
            }
        },
        created() {
            window.onbeforeunload = () => {
                this.socket.emit('leave', this.username);
            };

            window.addEventListener('scroll', () => {
                this.scrollTop = window.scrollY;
                this.scrollLeft = window.scrollX;
            })

            window.addEventListener('mousemove',
                _.throttle(e => {
                    if (!this.usernameSubmitted) return;

                    this.socket.emit('mousemove', {
                        username: this.username,
                        x: e.clientX + this.scrollLeft,
                        y: e.clientY + this.scrollTop
                    })
                }, 40)
            );

            this.socket.on('connections', (data) => {
                this.connections = data;
            });

            this.socket.on('message', (data) => {
                this.message = data.message;
            });

            this.socket.on('leave', (username) => {
                let index = this.getUserIndex(username);

                if (index !== -1) {
                    this.users.splice(index, 1);
                }
            });

            this.socket.on('mousemove', (data) => {
                let index = this.getUserIndex(data.username);

                // create new user if none existing
                if (index === -1) {
                    this.users.push({
                        name: data.username,
                        color: tinycolor.random().toString(),
                        x: data.x - this.scrollLeft,
                        y: data.y - this.scrollTop
                    });
                } else {
                    let user = this.users.filter(user => user.name === data.username)[0];
                    user.x = data.x - this.scrollLeft;
                    user.y = data.y - this.scrollTop;
                }
            });
        },
        methods:
            {
                getUserIndex(username) {
                    return this.users.findIndex(user => user.name === username)
                },
                emitMsg() {
                    this.socket.emit('message', {
                        sender: this.username,
                        message: this.message
                    });
                }
                ,
                clearMessages() {
                    this.socket.emit('clear');
                }
            }
    };
</script>
<style lang="scss">
    html, body {
        height: 100%
    }

    .home {
        position: relative;

        .get-user {
            display: none;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: #fff;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        &.no-user .get-user {
            display: flex;
        }
    }

    .msg {
        height: 200px;
    }

    .user {

        .user-color {
            display: inline-block;
            width: 5px;
            height: 5px;
        }

        .cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 5px;
            height: 5px;
            background: red;
        }
    }
</style>