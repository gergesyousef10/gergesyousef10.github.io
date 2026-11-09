/* Kill switch for the old copy of the till that used to live here.
   An installed app checks this file for updates; this version takes over at
   once, deletes the old offline copy (not the saved data), removes itself and
   sends every open window to the live till. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys()
    .then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.registration.unregister(); })
    .then(function () { return self.clients.matchAll({ type: "window" }); })
    .then(function (cs) { cs.forEach(function (c) { c.navigate("https://elcashier-eg.web.app/").catch(function () {}); }); }));
});
