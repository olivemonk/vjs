export const html = `
  <h1>Welcome Home</h1>
  <p>This is the home page. Nothing fancy here, just a welcome message.</p>
`;

export const onLoad = () => {
  console.log('Home page loaded.');
};

export const cleanup = () => {
  console.log('Cleaning up home page.');
};