<template>
    <div class="admin-container">
        <div class="admin-card">
            <h1 class="admin-title">👋 Welcome to Admin Portal</h1>
            <p class="admin-subtitle">Manage users and groups from one place.</p>
            <div class="button-container">
                <MainButton button="👤 User List" @click="goToUserList" />
                <MainButton button="👥 Group List" @click="goToGroupList" />
            </div>
        </div>
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
    router.push('/groups')
}
</script>

<style scoped>
.admin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: #f8f9fa;
}

.admin-card {
    background: white;
    padding: 2rem 3rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 600px;
    width: 100%;
    animation: fadeIn 0.6s ease-out;
}

.admin-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.admin-subtitle {
    font-size: 1rem;
    color: #6c757d;
    margin-bottom: 2rem;
}

.button-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Optional fade-in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>