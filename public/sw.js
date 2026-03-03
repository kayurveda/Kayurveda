// Kayurveda Service Worker - PWA Offline Support
const CACHE_NAME = 'kayurveda-v1.0.0';
const RUNTIME_CACHE = 'kayurveda-runtime-v1.0.0';

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Kayurveda SW] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        console.log('[Kayurveda SW] Deleting old cache:', cacheToDelete);
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network first, falling back to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }

  // For other requests - Network first, then cache
  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) => {
      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          cache.put(event.request, response.clone());
        }
        return response;
      }).catch(() => {
        // If network fails, try cache
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback for navigation
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
          // Return offline response for other resources
          return new Response('Offline - Please check your connection', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      });
    })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[Kayurveda SW] Background sync:', event.tag);
  if (event.tag === 'sync-wellness-data') {
    event.waitUntil(syncWellnessData());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Time for your wellness routine!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Open Kayurveda',
        icon: '/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Kayurveda Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sync wellness data function
async function syncWellnessData() {
  // This would sync any offline changes when back online
  console.log('[Kayurveda SW] Syncing wellness data...');
  return Promise.resolve();
}

// Periodic background sync (for checking reminders)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'wellness-check') {
    event.waitUntil(checkWellnessReminders());
  }
});

async function checkWellnessReminders() {
  console.log('[Kayurveda SW] Checking wellness reminders...');
  return Promise.resolve();
}
