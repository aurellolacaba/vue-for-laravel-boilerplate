<template>
    <div v-if="isLoading">
        <div class="animate-pulse">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th v-for="index in numColumns" :key="index" scope="col" class="px-6 py-3">
                        <div class="h-4 bg-gray-200 rounded dark:bg-gray-600 w-24"></div>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rowIndex in numRows" :key="rowIndex" class="border-b dark:border-gray-700">
                        <td v-for="colIndex in numColumns" :key="colIndex" class="px-6 py-4">
                            <div
                            :class="{
                                'w-32': colIndex === 1,
                                'w-24': colIndex === 2,
                                'w-28': colIndex === 3,
                                'w-20': colIndex === 4,
                            }"
                            class="h-4 bg-gray-200 rounded dark:bg-gray-600"
                            ></div>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>
  
<script setup>

defineProps({
    isLoading: Boolean
})

const numColumns = 4;
const numRows = 10;
</script>