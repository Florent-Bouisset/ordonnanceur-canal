interface IRequestExecution {
  requestStatus: string;
  execute(): Promise<Response>;
}

export class RequestScheduler {
  requestMap: Map<IRequest, IRequestExecution> = new Map();
  constructor() {}

  createExecution(request: IRequest) {
    return {
      requestStatus: "waiting",
      async execute() {
        this.requestStatus = "in progress";
        const result = await fetch(request.url);
        this.requestStatus = "done";
        return result;
      },
    };
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
