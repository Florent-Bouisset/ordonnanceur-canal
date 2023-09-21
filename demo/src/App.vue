<script setup lang="ts">
import RequestComponent from "./components/RequestComponent.vue";
import { RequestScheduler } from "../../src/lib/main";
const scheduler = new RequestScheduler();
</script>

<template>
  <div>
    <table>
      <thead>
        <td>Priority</td>
        <td>Status</td>
      </thead>
      <tbody>
        <RequestComponent :priority="3" status="in progress"></RequestComponent>
        <RequestComponent :priority="2" status="waiting"></RequestComponent>
        <RequestComponent :priority="4" status="done"></RequestComponent>
      </tbody>
    </table>
  </div>
</template>

<style>
table,
th,
td {
  border: 1px solid white;
}

table {
  border-collapse: collapse;
}

td {
  padding: 10px 20px;
}
</style>
