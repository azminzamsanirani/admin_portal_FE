<template>
    <div class="popup-backdrop" @click.self="emit('close')">
        <div class="content">
            <h3>Add User</h3>
            <form @submit.prevent="handleSubmit">
                <input type="text" placeholder="Username" v-model="username" />
                <input type="email" placeholder="Email" v-model="email" />
                <div class="group-select">
                    <input type="text" readonly :value="selectedGroup" @click="toggleDropdown"
                        placeholder="Choose group" />
                    <ul v-if="openGroups" class="groups-dropdown">
                        <li v-for="group in groups" :key="group.id" @click="selectGroup(group)">
                            {{ group.name }}
                        </li>
                    </ul>
                </div>

                <div class="actions">
                    <button type="submit">Add</button>
                    <button type="button" @click="emit('close')">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close'])

const username = ref("")
const email = ref("")
const groups = ref([])
const selectedGroup = ref("Choose group")
const openGroups = ref(false)

function handleSubmit() {
    console.log("User added: ", { username: username.value, email: email.value })
    emit('close')
}

function toggleDropdown() {
    openGroups.value = !openGroups.value
}

function selectGroup(group) {
    selectedGroup.value = group.name
    openGroups.value = false
}

async function fetchGroups() {
    try {
        const response = await fetch('http://127.0.0.1:8000/groups/')
        const data = await response.json()
        groups.value = data.results
        console.log("groups.value : ", groups.value)
    } catch (error) {
        console.error("Failed to fetch groups: ", error)
    }
}

onMounted(() => {
    fetchGroups()
})
</script>


<style lang="scss" scoped>
.popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    z-index: 50;

    .content {
        background: white;
        padding: 10px;
        border-radius: 12px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);

        h3 {
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 20px;

            input {
                display: block;
                margin-bottom: 5px;
                padding: 5px;
            }

            .group-select {
                position: relative;

                input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 5px;
                    cursor: pointer;
                }

                .groups-dropdown {
                    position: absolute;
                    top: 13px;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid #ccc;
                    max-height: 150px;
                    overflow-y: auto;
                    z-index: 10;
                    list-style: none;

                    li {
                        padding: 8px;
                        margin-left: -40px;
                        cursor: pointer;

                        &:hover {
                            background: #f0f0f0;
                        }
                    }
                }
            }

            .actions {
                display: flex;
                justify-content: center;
                gap: 10px
            }
        }
    }
}
</style>