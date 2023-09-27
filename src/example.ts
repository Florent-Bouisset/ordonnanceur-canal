import { RequestScheduler } from "./lib/main";

/* Creating instance */
const scheduler = new RequestScheduler();

/* Adding requests  */
const myRequest = {
  url: "https://rickandmortyapi.com/api/character/5",
  priority: 1,
};

// this will add the request to the queue
const response = scheduler.addRequest(myRequest);

/* Get request status  */
const status = scheduler.getRequestStatus(myRequest);
console.log(status);

/* Cancel a request */

scheduler.cancelRequest(myRequest);

console.log("resp", await response);
const response2 = await scheduler.addRequest([
  {
    priority: 3,
    url: "https://rickandmortyapi.com/api/character/1",
  },
  {
    priority: 4,
    url: "https://rickandmortyapi.com/api/character/5",
  },
  {
    priority: 2,
    url: "https://rickandmortyapi.com/api/character/2",
  },
]);
const data = await Promise.all(response2);
console.log(data);
