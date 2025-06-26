
const appContainer = document.getElementById('app');

const routes = {
  '/home': './routes/home.js',
  '/about': './routes/about.js',
  '/contact': './routes/contact.js',
  '/404': './routes/404.js'
};

let previousRouteCleanup = () => {};

const navigate = async () => {
  const path = window.location.hash.substring(1) || '/home';
  console.log(window.location.hash, path);
  

  const routeFile = routes[path] || routes['/404'];

  try {
    if (typeof previousRouteCleanup === 'function') {
      previousRouteCleanup();
    }

    const routeModule = await import(/* @vite-ignore */ routeFile);

    appContainer.innerHTML = routeModule.html;
    routeModule.onLoad();

    previousRouteCleanup = routeModule.cleanup;

  } catch (error) {
    console.error('Failed to load route:', error);
    appContainer.innerHTML = '<h1>Error</h1><p>Failed to load page content.</p>';
  }
};

export const initializeRouter = () => {
  window.addEventListener('hashchange', navigate);
  navigate();
};