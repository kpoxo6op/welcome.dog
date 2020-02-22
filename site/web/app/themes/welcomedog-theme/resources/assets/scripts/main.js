// import external dependencies
import 'jquery';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';
import githubDemo from './routes/github-demo';
import map from './routes/map';
import integrated from './routes/integrated';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs,
  // github demo
  githubDemo,
  // full page map
  map,
  // integrate into WordPress and use dotenv inside the app
  integrated,
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
