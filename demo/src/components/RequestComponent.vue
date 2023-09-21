<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ priority: number; status: string }>();

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
    <td :style="`color: ${getColor}`">{{ priority }}</td>
    <td>{{ status }}</td>
  </tr>
</template>
