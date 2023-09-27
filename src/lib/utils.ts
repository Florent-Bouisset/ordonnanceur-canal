// short random string for ids - not guaranteed to be unique
export function randomId(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export function delayedFetch(url: string, { signal }: { signal: AbortSignal }) {
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
}
