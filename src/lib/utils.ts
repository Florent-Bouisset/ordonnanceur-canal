// short random string for ids - not guaranteed to be unique
export function randomId(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export function delayedFetch(
  input: string,
  { signal }: { signal: AbortSignal }
) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return new Promise(async (resolve, reject) => {
    try {
      const res = await (
        await fetch(
          `https://rickandmortyapi.com/api/character/${randomNumber}`,
          {
            signal: signal,
          }
        )
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
