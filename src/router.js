
const appContainer = document.getElementById('app');

const routes = {
  '/': './routes/home.js',
  '/about': './routes/about.js',
  '/contact': './routes/contact.js',
  '/404': './routes/404.js'
};

let previousRouteCleanup = () => {};

const loadRoute = async (path) => {
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

const navigate = (path) => {
  history.pushState(null, null, path);
  loadRoute(path);
};

export const initializeRouter = () => {
  window.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      e.preventDefault();
      const path = e.target.getAttribute('href');
      navigate(path);
    }
  });

  window.addEventListener('popstate', () => {
    loadRoute(window.location.pathname);
  });

  loadRoute(window.location.pathname);
};