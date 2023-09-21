<script setup lang="ts">
import RequestComponent from "./components/RequestComponent.vue";
import { RequestScheduler } from "../../src/lib/main";
const scheduler = new RequestScheduler();

scheduler.addRequest({
  priority: 1,
  url: "https://rickandmortyapi.com/api/character/1",
});

scheduler.addRequest({
  priority: 2,
  url: "https://rickandmortyapi.com/api/character/2",
});

scheduler.addRequest({
  priority: 3,
  url: "https://rickandmortyapi.com/api/character/3",
});

const requestArray = Array.from(scheduler.requestMap.values());
const nextRequests = scheduler.getRequestsToExecute();
</script>

<template>
  <div>
    <h2>All Requests</h2>
    <table>
      <thead>
        <td>Priority</td>
        <td>Status</td>
      </thead>
      <tbody>
        <RequestComponent
          v-for="(req, index) in requestArray"
          :key="index"
          :priority="req.request.priority"
          :status="req.requestStatus"
        ></RequestComponent>
      </tbody>
    </table>

    <h2 style="margin-top: 60px">Next requests to execute</h2>
    <table>
      <thead>
        <td>Priority</td>
        <td>Status</td>
      </thead>
      <tbody>
        <RequestComponent
          v-for="(req, index) in nextRequests"
          :key="index"
          :priority="req.request.priority"
          :status="req.requestStatus"
        ></RequestComponent>
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
