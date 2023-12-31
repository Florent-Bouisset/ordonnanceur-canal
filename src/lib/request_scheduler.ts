import { randomId, defaultFetchFunction } from "./utils.ts";

export interface IRequest {
  priority: number; // the higher is highest priority
  url: string;
}

interface ITask {
  response: Promise<any>;
  id: string;
  requestStatus: "waiting" | "in progress";
  request: IRequest;
  deferred: { resolve: (value: any) => void; reject: (reason?: any) => void };
  abortController: AbortController;
  execute: () => Promise<void>;
}
class Task implements ITask {
  response: Promise<any>;
  id: string;
  requestStatus: "waiting" | "in progress";
  request: IRequest;
  deferred: { resolve: (value: any) => void; reject: (reason?: any) => void };
  abortController: AbortController;
  fetchFunction: (...args: any[]) => Promise<any>;
  constructor(
    request: IRequest,
    fetchFunction: (...args: any[]) => Promise<any>
  ) {
    this.id = randomId(6);
    this.requestStatus = "waiting";
    this.request = request;
    this.deferred = { resolve: () => {}, reject: () => {} };
    this.abortController = new AbortController();
    this.response = new Promise(
      (resolve, reject) => (this.deferred = { resolve, reject })
    );
    this.fetchFunction = fetchFunction;
  }

  async execute() {
    if (this.requestStatus === "in progress") {
      throw new Error(
        `Request ${this.id} was already executed, cannot execute twice`
      );
    }
    this.requestStatus = "in progress";
    try {
      const response = await this.fetchFunction(this.request.url, {
        signal: this.abortController.signal,
      });
      this.deferred.resolve(response);
    } catch (err) {
      console.error("failed to fetch");
      this.deferred.reject(err);
    }
  }
}

export class RequestScheduler {
  requestMap: Map<IRequest, ITask> = new Map();
  fetchFunction: (...args: any[]) => Promise<any>;
  constructor(
    fetchFunction: (...args: any) => Promise<any> = defaultFetchFunction
  ) {
    this.fetchFunction = fetchFunction;
  }

  getRequestsToExecute() {
    // get the list of request that can be executed now
    // only request with the highest level of priority are returned
    const iterator = this.requestMap.values();
    let maxPriority = 0;
    let requestsToExecute: ITask[] = [];

    for (const req of iterator) {
      if (req.request.priority > maxPriority) {
        maxPriority = req.request.priority;
        requestsToExecute = [req];
      } else if (req.request.priority === maxPriority) {
        requestsToExecute.push(req);
      }
    }

    // remove requests that are already being executed
    return requestsToExecute.filter((req) => req.requestStatus === "waiting");
  }

  async executeNextRequests() {
    const nextRequests = this.getRequestsToExecute();
    // allSettled is used instead of all to move on even if there is failed requests
    await Promise.allSettled(
      nextRequests.map((req) =>
        // finished request are removed
        req.execute().then(() => this.removeTask(req.request))
      )
    );
    if (this.getRequestsToExecute().length) {
      this.executeNextRequests();
    }
  }

  removeTask(request: IRequest) {
    this.requestMap.delete(request);
  }

  addRequest(request: IRequest | IRequest[]) {
    if (Array.isArray(request)) {
      const tasksArray = [];
      for (const req of request) {
        const task = new Task(req, this.fetchFunction);
        tasksArray.push(task);
        this.requestMap.set(req, task);
      }
      const taskResponse = tasksArray.map((task) => task.response);
      this.executeNextRequests();
      return taskResponse;
    } else {
      const requestExecution = new Task(request, this.fetchFunction);
      this.requestMap.set(request, requestExecution);
      this.executeNextRequests();
      return requestExecution.response;
    }
  }

  getRequestStatus(request: IRequest) {
    const task = this.requestMap.get(request);
    if (!task) return null;
    return task.requestStatus;
  }

  cancelRequest(request: IRequest) {
    const status = this.getRequestStatus(request);
    if (status === "waiting") {
      // if the request is waiting, just delete it
      this.removeTask(request);
    } else if (status === "in progress") {
      // if the request is in progress, cancel it before delete it
      const task = this.requestMap.get(request);
      task?.abortController.abort();
      this.removeTask(request);
    }
  }
}
