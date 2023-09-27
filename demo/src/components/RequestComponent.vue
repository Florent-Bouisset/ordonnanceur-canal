<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  requestId: string;
  priority: number;
  status: string;
}>();

const getColor = computed(() => {
  switch (props.priority) {
    case 1:
      return "green";

    case 2:
      return "yellow";

    case 3:
      return "orange";

    case 4:
      return "red";

    default:
      return "grey";
  }
});
</script>

<template>
  <tr>
    <td>{{ requestId }}</td>
    <td :style="`color: ${getColor}`">{{ priority }}</td>
    <td>{{ status }}</td>
    <td>
      <button style="color: red" @click="$emit('cancel')">Cancel</button>
    </td>
  </tr>
</template>
