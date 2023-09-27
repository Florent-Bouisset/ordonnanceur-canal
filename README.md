# REQUEST SCHEDULER API

This library allow to execute several HTTP requests in a particular order depending on the priority level


## How to use

### Create a Scheduler instance
First create an instance of the scheduler

```js
const scheduler = new RequestScheduler();
```

### Add a request
When creating a request a priority level can specified, it's represented by a number: the larger the number, the higher the priority the request will be.
The URL for the fetch request is also required.
```js
const myRequest = {
    url: "https://rickandmortyapi.com/api/character/5",
    priority: 4,
};

// this will add the request to the queue
scheduler.addRequest(myRequest)
```

### Add multiple requests at once

Multiple requests can be added at once using an array of requests

```js
scheduler.addRequest([
  {
    priority: 3,
    url: "https://rickandmortyapi.com/api/character/4",
  },
  {
    priority: 1,
    url: "https://rickandmortyapi.com/api/character/1",
  }
]) 
```


### Read the response
The request need to be awaited to read the data
```js
const response = await scheduler.addRequest({
    url: "https://rickandmortyapi.com/api/character/5",
    priority: 4,
})
console.log(response) // { name: "Jerry Smith", ...}
```

#### For multiple requests: 
```js
const response = scheduler.addRequest([
  {
    priority: 3,
    url: "https://rickandmortyapi.com/api/character/1",
  },
  {
    priority: 4,
    url: "https://rickandmortyapi.com/api/character/5",
  }
]);

const data = await Promise.all(response)
console.log(data) // [{ name: "Rick", ...}, { name: "Jerry Smith", ...}]
```

### Get Request status
**Waiting**: the request has not been started  
**In progress**: the request has started  

```js
const status = scheduler.getRequestStatus(myRequest)
console.log(status) // "in progress"
```

### Cancel a request
 **waiting** request: request will be removed before it has started  
 **In progress** request: request will be aborted


```js
scheduler.cancelRequest(myRequest);
```




### Provide custom fetch function

You can also provide custom fetch function if you have specific needs, for example if you want to delay every requests
to make the debugging easier.

```js
const delayedFetch = (url: string, { signal }: { signal: AbortSignal }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await (
        await fetch(url, {
          signal: signal,
        })
      ).json();
      const timeout = setTimeout(() => resolve(res.name), 5000);
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

const schedulerWithDelay = new RequestScheduler(delayedFetch);
```












Documentations utilisés :
https://vitejs.dev/guide/build.html#library-mode