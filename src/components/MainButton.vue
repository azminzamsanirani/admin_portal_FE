<template>
    <button class="main-button" @click="$emit('click')">
        {{ button }}
    </button>
</template>

<script setup>
defineProps({
    button: String
})
defineEmits(['click'])
</script>


<style scoped>
.main-button {
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    box-shadow: 6px 6px 12px #d1d1d1,
        -6px -6px 12px #ffffff;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.main-button:hover {
    box-shadow: 4px 4px 8px #d1d1d1,
        -4px -4px 8px #ffffff;
    transform: translateY(-2px);
}

.main-button:active {
    box-shadow: inset 2px 2px 4px #d1d1d1,
        inset -2px -2px 4px #ffffff;
    transform: translateY(1px);
}
</style>