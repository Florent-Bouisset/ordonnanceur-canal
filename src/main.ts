import "./style.css";
import { displayRequest } from "./displayRequest";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>RxScheduler</h1>
    <p class="read-the-docs">
      Hello world
    </p>
  
    <p class="read-the-docs" id="display">
    Request displayed here
    </p> 
  </div>
`;

displayRequest(document.querySelector<HTMLElement>("#display")!);

import { RequestScheduler } from "./lib/request_scheduler";

const scheduler = new RequestScheduler();

const req1 = scheduler.createExecution({
  priority: 1,
  url: "https://rickandmortyapi.com/api/character/2",
});

console.log(req1);

const res = req1.execute();
console.log(req1);

const json = await (await res).json();
console.log(json);
