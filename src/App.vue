<script>
    import { useAuthStore } from './stores/auth.js'
    import NavigationComponent from '@/components/NavigationComponent.vue';

    export default {
        components: {
    NavigationComponent
},
        data() {
            return {
                useAuthStore,
            }
        }
    }
</script>
<template>
    <!--  HEADER  -->
    <Header v-if="useAuthStore.authenticated"></Header>
    <!--  HEADER END  -->

    <!--  BODY  -->
    <div id="section-body">
        <NavigationComponent v-if="useAuthStore.authenticated"/>
        <router-view class="section-router"></router-view>
    </div>
    <!--  BODY END  -->

    <!--  PLAYER  -->
    <div id="section-player"  v-if="useAuthStore.authenticated" >
        <AudioPlayer/>
    </div>
    <!--  PLAYER END  -->
</template>
