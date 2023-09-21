export interface IRequestExecution {
  requestStatus: "waiting" | "in progress";
  request: IRequest;
  execute(): Promise<Response>;
}

export class RequestScheduler {
  requestMap: Map<IRequest, IRequestExecution> = new Map();
  constructor() {}

  createExecution(request: IRequest): IRequestExecution {
    return {
      requestStatus: "waiting",
      request: request,
      async execute() {
        this.requestStatus = "in progress";
        const result = await fetch(request.url);
        return result;
      },
    };
  }

  getRequestsToExecute() {
    const iterator = this.requestMap.values();
    let maxPriority = 0;
    let requestsToExecute: IRequestExecution[] = [];

    for (const req of iterator) {
      if (req.request.priority > maxPriority) {
        maxPriority = req.request.priority;
        requestsToExecute = [req];
      } else if (req.request.priority === maxPriority) {
        requestsToExecute.push(req);
      }
    }
    requestsToExecute.filter((req) => req.requestStatus === "waiting");
    return requestsToExecute;
  }

  addRequest(request: IRequest) {
    // TO DO: need to set multiple request at once
    // if (Array.isArray(request)) {
    //   this.requestMap.set(...request);
    // } else {
    // this.requestMap.set(request);
    // }
    const requestExecution = this.createExecution(request);
    this.requestMap.set(request, requestExecution);

    // TO DO return response
  }

  getRequestStatus(request: IRequest) {
    // TO DO
    // status: waiting, in progress, completed, cancelled
  }

  cancelRequest(request: IRequest) {
    // TO DO
  }
}

interface IRequest {
  priority: number; // the higher is highest priority
  url: string;
}
