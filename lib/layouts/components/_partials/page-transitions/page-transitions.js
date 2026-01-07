/**
 * Page Transitions Module
 *
 * Implements smooth page transitions using SWUP.
 * Provides a registry for component initialization functions that need
 * to run after each page transition.
 *
 * Components inside the SWUP container (#swup / main) should register their
 * init functions to be called after each page transition. Components
 * outside the container (header, footer) don't need to register.
 *
 * Plugins:
 * - HeadPlugin: Updates <head> tags during transitions
 * - ScrollPlugin: Handles scroll position and smooth scrolling
 * - PreloadPlugin: Prefetches pages on link hover for instant navigation
 *
 * @see https://swup.js.org/
 */

import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

/**
 * Registry of component initialization functions
 * Components register their init functions here to be called after page transitions
 * @type {Map<string, Function>}
 */
const componentRegistry = new Map();

/**
 * Cleanup function registry for components that need teardown
 * @type {Map<string, Function>}
 */
const cleanupRegistry = new Map();

/**
 * Register a component's initialization function
 * @param {string} name - Unique component name
 * @param {Function} initFn - Initialization function to call
 */
function registerComponent(name, initFn) {
  componentRegistry.set(name, initFn);
}

/**
 * Register a cleanup function for a component
 * @param {string} name - Unique component name
 * @param {Function} cleanupFn - Cleanup function to call before page transition
 */
function registerCleanup(name, cleanupFn) {
  cleanupRegistry.set(name, cleanupFn);
}

/**
 * Initialize all registered components
 * Called after each page transition
 */
function initAllComponents() {
  componentRegistry.forEach((initFn, name) => {
    try {
      initFn();
    } catch (error) {
      console.error(`Error initializing component "${name}":`, error);
    }
  });
}

/**
 * Run all registered cleanup functions
 * Called before content is replaced during page transition
 */
function cleanupAllComponents() {
  cleanupRegistry.forEach((cleanupFn, name) => {
    try {
      cleanupFn();
    } catch (error) {
      console.error(`Error cleaning up component "${name}":`, error);
    }
  });
}

/**
 * Initialize SWUP page transitions
 */
function initSwup() {
  const swup = new Swup({
    containers: ['#swup'],
    animationSelector: '[class*="transition-"]',
    plugins: [
      new SwupHeadPlugin({
        persistAssets: true,
        awaitAssets: true
      }),
      new SwupScrollPlugin({
        doScrollingRightAway: false,
        animateScroll: {
          betweenPages: true,
          samePageWithHash: true,
          samePage: true
        },
        offset: 0
      }),
      new SwupPreloadPlugin({
        preloadHoveredLinks: true,
        preloadVisibleLinks: false,
        preloadInitialPage: true
      })
    ]
  });

  // Run cleanup before content is replaced
  swup.hooks.on('content:replace', () => {
    cleanupAllComponents();
  });

  // Re-initialize components after new page content is loaded
  swup.hooks.on('page:view', () => {
    initAllComponents();
  });

  // Store swup instance on window for debugging
  window.swup = swup;

  return swup;
}

// Export registry functions immediately so components can register
// Components will initialize themselves on DOMContentLoaded
// SWUP will call initAllComponents after each page transition
window.PageTransitions = {
  registerComponent,
  registerCleanup
};

// Initialize SWUP when DOM is ready
document.addEventListener('DOMContentLoaded', initSwup);
