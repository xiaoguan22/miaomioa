<template>
    <div id="main">
        <Header  />
            <div id="content">
                <router-view />
            </div>
        <TabBar />
    </div>
    
    
  
</template>
<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'

export default {
    name:'Mine',
    components :{
        Header,
        TabBar,
        Login
    }
}
</script>


<style >

</style>
