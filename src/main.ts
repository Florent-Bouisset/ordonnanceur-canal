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
