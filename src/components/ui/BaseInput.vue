<template>
    <div>
        <label 
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            v-if="label" :for="id"
        >
            {{ label }} <span class="text-xs dark:text-gray-400" v-if="optional">(optional)</span>
        </label>
        <input 
            :class="[
                'bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                errorMessage[0] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500' : 'border-gray-300'
            ]"
            :id="id"
            :type="type" 
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <span v-if="errorMessage[0]" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errorMessage[0] }}</span>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    optional: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: [String, Array],
      default: '',
    },
  })
</script>