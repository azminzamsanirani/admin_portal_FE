<template>
    <div class="group-list">
        <h2>🧑‍🤝‍🧑 Group List</h2>

        <div class="group-header">
            <span class="no">No.</span>
            <span class="name">Name</span>
            <span class="edit"></span>
            <span class="delete"></span>
        </div>

        <ul>
            <li v-for="(group, index) in groups" :key="group.id">
                <span class="no">{{ index + 1 }}</span>
                <span class="name">{{ group.name }}</span>
                <span class="edit">
                    Edit <i class="mdi mdi-pencil edit-icon"></i>
                </span>
                <span class="delete">
                    Delete <i class="mdi mdi-delete delete-icon"></i>
                </span>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const groups = ref([])

onMounted(async () => {
    try {
        const res = await fetch('http://127.0.0.1:8000/groups/')
        const data = await res.json()
        groups.value = data.results.map((group) => {
            return {
                ...group
            }
        })
        console.log("groups.value : ", groups.value)
    } catch (err) {
        console.error("Failed to fetch groups:", err)
    }
})
</script>


<style lang="scss" scoped>
.group-list {
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h2 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 0.5rem;
    }

    .group-header,
    li {
        display: flex;
        align-items: center;

        span {
            font-size: 0.95rem;
            color: #4b5563;
            padding-right: 1rem;
        }

        .no {
            width: 150px;
        }

        .name {
            width: 200px;
        }

        .edit,
        .delete {
            width: 70px;
            text-align: center;
            height: 50px;
            display: flex;
            align-items: center;
            gap: 5px;

            .edit-icon {
                color: #2563eb;
            }

            .delete-icon {
                color: red;
                font-size: 20px;
            }
        }
    }

    .group-header {
        font-weight: 600;
        padding: 0.5rem 1rem;
        background: #f3f4f6;
        border-radius: 8px;
        margin-bottom: 1rem;

        span {
            color: #374151;
        }
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            padding: 1rem;
            margin-bottom: 0.75rem;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            transition: background 0.2s ease;

            &:hover {
                background: #f3f4f6;
            }
        }
    }
}
</style>