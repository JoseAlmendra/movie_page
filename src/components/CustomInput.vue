<template>
  <input
    :model-value="props.modelValue"
    style="background-color: bisque"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])


</script>
