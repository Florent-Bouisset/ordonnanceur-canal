let requestArray = [1, 2, 3];

export function displayRequest(element: HTMLElement) {
  setInterval(() => (element.innerHTML = requestArray.toString()), 1000);
}
