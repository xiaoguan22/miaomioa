<template>
    <div class="">
        <div>个人中心</div>
        <div>
            当前用户：{{ $store.state.user.name }}
            <a href="javascript:;" @touchstart="handleToLogout">退出</a>
        </div>
        <div v-if="$store.state.user.isAdmin">
            用户身份：管理员
            <a href="/admin" target="_blank">进入管理后台</a>
        </div>
        <div v-else>用户身份：普通会员</div>
        <!-- <div>
            <input
                type="file"
                name="file"
                value="上传头像"
                @change="uploadHead"
            />
            <img :src="$store.state.user.userHead" alt="" class="userhead" />
        </div> -->
    </div>
</template>

<script>
export default {
    name:'center',
    methods: {
        handleToLogout () {
            this.axios.get('/api2/users/logout')
                .then(res => {
                    var status = res.data.status;
                    if (status === 0) {
                        localStorage.removeItem('name')
                        localStorage.removeItem('isAdmin')
                        this.$store.commit('user/USER_NAME', { name: '', isAdmin: false, userHead: '' })
                        this.$router.push('/mine/login')
                    }
                })
        },
    //     uploadHead (ev) {
    //         const file = ev.target.files[0]
    //         const param = new FormData()
    //         param.append('file', file, file.name)
    //         var config = {
    //             headers: {
    //                 'Content-Type': "multipart/form-data"
    //             }
    //         }
    //         this.axios.post('/api2/users/uploadUserHead', param, config)
    //             .then(res => {
    //                 console.log(res)
    //                 var status = res.data.status;
    //                 var that = this
    //                 if (status === 0) {
    //                     messageBox({
    //                         title: '信息',
    //                         content: '上传头像成功',
    //                         ok: '确定',
    //                         handleOk () {
    //                             that.$store.commit('user/USER_NAME', {
    //                                 name: that.$store.state.user.name,
    //                                 isAdmin: that.$store.state.user.isAdmin,
    //                                 userHead: res.data.data.userHead + '?' + Math.random()
    //                             })
    //                         }

    //                     })
    //                 } else {
    //                     messageBox({
    //                         title: '信息',
    //                         content: '上传头像成功',
    //                         ok: '确定'
    //                     })
    //                 }
    //             })
    //             .catch(err => {
    //                 console.error(err);
    //             })
    //     }
    // },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/users/getUser')
            .then(res => {
                var status = res.data.status;
                if (status === 0) {
                    next(vm => {
                        localStorage.setItem('name', res.data.data.username)
                        localStorage.setItem('isAdmin', res.data.data.isAdmin)
                        vm.$store.commit('user/USER_NAME', {
                            name: res.data.data.username,
                            isAdmin: res.data.data.isAdmin,
                            // userHead: res.data.data.userHead
                        })
                    })
                } else {
                    next('/mine/login')
                }
            })
         }
    },
      
}
</script>
<style scoped>

</style>

