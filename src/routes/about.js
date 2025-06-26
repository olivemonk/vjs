let intervalId = null;

export const html = `
  <h1>About Us</h1>
  <p>This page has a counter that starts when you visit and stops when you leave.</p>
  <p>Current count: <b id="counter">0</b></p>
`;

export const onLoad = () => {
  console.log('About page loaded. Starting counter.');
  let count = 0;
  const counterElement = document.getElementById('counter');
  
  // Start an interval and store its ID
  intervalId = setInterval(() => {
    count++;
    if (counterElement) {
      counterElement.innerText = count;
    }
  }, 1000);
};

export const cleanup = () => {
  console.log('Cleaning up about page. Stopping counter.');
  // Clear the interval to prevent it from running in the background
  if (intervalId) {
    clearInterval(intervalId);
  }
};