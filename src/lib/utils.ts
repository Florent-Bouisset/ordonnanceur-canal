// short random string for ids - not guaranteed to be unique
export function randomId(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export function defaultFetchFunction(
  url: string,
  { signal }: { signal: AbortSignal }
) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await (
        await fetch(url, {
          signal: signal,
        })
      ).json();
      resolve(res);
    } catch (err) {
      console.error("error: ", err);
      reject(err);
    }
  });
}
