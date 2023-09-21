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
  const randomNumber = Math.floor(Math.random() * 100);
  return new Promise(async (resolve) => {
    const res = await (
      await fetch(`https://rickandmortyapi.com/api/character/${randomNumber}`, {
        signal: signal,
      })
    ).json();

    setTimeout(() => resolve(res.name), 4000);
  });
}
