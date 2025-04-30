<template>
    <div class="button-container">
        <MainButton button="User List" @click="goToUserList" />
        <MainButton button="Group List" @click="goToGroupList" />
    </div>
</template>

<script setup>
import MainButton from '../components/MainButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToUserList() {
    router.push('/users')
}

function goToGroupList() {
    router.push("/groups")
}

</script>

<style scoped>
.button-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}
</style>