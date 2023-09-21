<script setup lang="ts">
import RequestComponent from "./components/RequestComponent.vue";
import { RequestScheduler } from "../../src/lib/main";
import { computed, ref } from "vue";
const scheduler = ref(new RequestScheduler());

scheduler.value.addRequest({
  priority: 1,
  url: "https://rickandmortyapi.com/api/character/1",
});

scheduler.value.addRequest({
  priority: 2,
  url: "https://rickandmortyapi.com/api/character/2",
});

scheduler.value.addRequest({
  priority: 3,
  url: "https://rickandmortyapi.com/api/character/3",
});

scheduler.value.addRequest({
  priority: 3,
  url: "https://rickandmortyapi.com/api/character/4",
});

scheduler.value.addRequest({
  priority: 4,
  url: "https://rickandmortyapi.com/api/character/5",
});

const requestArray = computed(() =>
  Array.from(scheduler.value.requestMap.values())
);
const nextRequests = computed(() => scheduler.value.getRequestsToExecute());

const priority = ref(1);
const handlePriorityChange = (e: any) => {
  priority.value = Number.parseInt(e.target.selectedOptions[0].value);
};

const addRequestHandler = () => {
  scheduler.value.addRequest({
    priority: priority.value,
    url: "https://rickandmortyapi.com/api/character/3",
  });
};
</script>

<template>
  <div>
    <h2>Create a new request</h2>
    <label for="priority">Priority</label>

    <select id="priority" :onchange="handlePriorityChange">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>

    <button style="margin-left: 24px" :onclick="addRequestHandler">
      Add request
    </button>
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
