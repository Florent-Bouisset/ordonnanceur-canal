<script setup lang="ts">
import RequestComponent from "./components/RequestComponent.vue";
import { RequestScheduler } from "../../src/lib/main";
import { computed, ref } from "vue";
import { IRequest } from "../../src/lib/request_scheduler";

const delayedFetch = (url: string, { signal }: { signal: AbortSignal }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await (
        await fetch(url, {
          signal: signal,
        })
      ).json();
      const timeout = setTimeout(() => resolve(res.name), 10000);
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(timeout), reject("cancelled");
        },
        {}
      );
    } catch (err) {
      console.error("error: ", err);
      reject(err);
    }
  });
};

const scheduler = ref(new RequestScheduler(delayedFetch));

const req1 = {
  priority: 4,
  url: "https://rickandmortyapi.com/api/character/5",
};

scheduler.value.addRequest([
  req1,
  {
    priority: 3,
    url: "https://rickandmortyapi.com/api/character/4",
  },
  {
    priority: 1,
    url: "https://rickandmortyapi.com/api/character/1",
  },
  {
    priority: 2,
    url: "https://rickandmortyapi.com/api/character/2",
  },
  {
    priority: 3,
    url: "https://rickandmortyapi.com/api/character/3",
  },
]) as Array<Promise<any>>;

// scheduler.value.cancelRequest(req1);

const requestArray = computed(() =>
  Array.from(scheduler.value.requestMap.values())
);

// Adding new request with
const addRequestHandler = (priority: number) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  scheduler.value.addRequest({
    priority: priority,
    url: `https://rickandmortyapi.com/api/character/${randomNumber}`,
  });
};

const handleCancel = (request: IRequest) => {
  scheduler.value.cancelRequest(request);
};
</script>

<template>
  <div>
    <h2>Create a new request</h2>

    <button :onclick="() => addRequestHandler(1)" style="color: green">
      Add priority 1 request
    </button>

    <button
      style="margin-left: 24px; color: yellow"
      :onclick="() => addRequestHandler(2)"
    >
      Add priority 2 request
    </button>

    <button
      style="margin-left: 24px; color: orange"
      :onclick="() => addRequestHandler(3)"
    >
      Add priority 3 request
    </button>

    <button
      style="margin-left: 24px; color: red"
      :onclick="() => addRequestHandler(4)"
    >
      Add priority 4 request
    </button>
    <h2>All Requests</h2>
    <table>
      <thead>
        <td>ID</td>
        <td>Priority</td>
        <td>Status</td>
      </thead>
      <tbody>
        <RequestComponent
          v-for="(req, index) in requestArray"
          :key="index"
          :requestId="req.id"
          :priority="req.request.priority"
          :status="req.requestStatus"
          @cancel="handleCancel(req.request)"
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
