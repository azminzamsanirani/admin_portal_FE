<template>
    <div class="user-list">
        <h2>👥 User List</h2>

        <div class="user-header">
            <span class="name">Name</span>
            <span class="email">Email</span>
            <span class="groups">Groups</span>
            <span class="edit"></span>
            <span class="delete"></span>
        </div>

        <ul>
            <li v-for="user in users" :key="user.id">
                <span class="name">{{ user.username }}</span>
                <span class="email">{{ user.email }}</span>
                <span class="groups">
                    <span v-for="(group, index) in user.groups" :key="index" class="group-badge"
                        :class="groupClass(group)">
                        {{ group }}
                    </span>
                </span>
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

const users = ref([])

async function fetchGroupName(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data.name
    } catch (err) {
        console.error(`Failed to fetch group ${url}:`, err)
        return 'Unknown Group'
    }
}

onMounted(async () => {
    try {
        const res = await fetch('http://127.0.0.1:8000/users/')
        const data = await res.json()
        const enrichedUsers = await Promise.all(
            data.results.map(async (user) => {
                const groupNames = await Promise.all(user.groups.map(fetchGroupName))
                return {
                    ...user,
                    groups: groupNames
                }
            })
        )
        users.value = enrichedUsers
        console.log("users.value : ", users.value)
    } catch (err) {
        console.error('Failed to fetch users:', err)
    }
})

function groupClass(group) {
    switch (group) {
        case 'HR':
            return 'badge-hr'
        case 'IT':
            return 'badge-it'
        case 'Admin':
            return 'badge-admin'
        case 'Finance':
            return 'badge-finance'
        case 'Engineering':
            return 'badge-eng'
        case 'Facility':
            return 'badge-facility'
        default:
            return 'badge-default'
    }
}

</script>


<style lang="scss" scoped>
.user-list {
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

    .user-header,
    li {
        display: flex;
        align-items: center;

        span {
            font-size: 0.95rem;
            color: #4b5563;
            padding-right: 1rem;
        }

        .name {
            width: 150px;
        }

        .email {
            width: 200px;
        }

        .groups {
            width: 250px;
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
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

    .user-header {
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

        .group-badge {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0.25rem 0.5rem;
            border-radius: 999px;

            &.badge-hr {
                background-color: #fef3c7;
                color: #92400e;
            }

            &.badge-it {
                background-color: #d1fae5;
                color: #065f46;
            }

            &.badge-admin {
                background-color: #e0e7ff;
                color: #3730a3;
            }

            &.badge-finance {
                background-color: #ffe4e6;
                color: #9f1239;
            }

            &.badge-eng {
                background-color: #e0f2fe;
                color: #0369a1;
            }

            &.badge-facility {
                background-color: #ede9fe;
                color: #6b21a8;
            }

            &.badge-default {
                background-color: #f3f4f6;
                color: #374151;
            }
        }
    }
}
</style>
