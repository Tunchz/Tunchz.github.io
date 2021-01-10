if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'
  );

  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded 🚀');
    workbox.core.skipWaiting();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([{"revision":"6e3c4ca9df0bb0479e5044dc13e8f053","url":"404.html"},{"revision":"16702b78f3b399e557009d14e4d0b0c1","url":"f75ee72a9857e4539e3c.worker.js"},{"revision":"ad8463d1313fed60e1d10324511efdc3","url":"fonts/Archia/archia-bold-webfont.woff2"},{"revision":"80da55a565ba8976b8e9e84e8c511bf7","url":"fonts/Archia/archia-medium-webfont.woff2"},{"revision":"890ee929da47c4931933ff77fd557520","url":"fonts/Archia/archia-semibold-webfont.woff2"},{"revision":"6e3c4ca9df0bb0479e5044dc13e8f053","url":"index.html"},{"revision":"171c6d7420afcf7168faaa8e151588e1","url":"precache-manifest.171c6d7420afcf7168faaa8e151588e1.js"},{"revision":"e19bc81271c74332ddade92505488ab6","url":"static/css/15.2a0f33ef.chunk.css"},{"revision":"2e949e51221e12a7bc1d0c74443ca3a8","url":"static/js/0.1ad5e4fd.chunk.js"},{"revision":"13e4b8aa7f5d95e085cb8aa525f2038a","url":"static/js/1.8004eb25.chunk.js"},{"revision":"db7bc382ab85805a3f7d0edfb01b349b","url":"static/js/10.7e93b420.chunk.js"},{"revision":"f894a21e82130f9a98041e120aa2ebca","url":"static/js/11.ccae9169.chunk.js"},{"revision":"7ce5672db007ad30ce1b6ba283190d1d","url":"static/js/12.2213f7c0.chunk.js"},{"revision":"cb159347add8dadce8602714aa3cbb56","url":"static/js/13.3dd5d10b.chunk.js"},{"revision":"851c8ae5b8c3b7b6883f3dc5857fb736","url":"static/js/14.cdf76ef7.chunk.js"},{"revision":"5febbadf72e27292bb811866a783b7bc","url":"static/js/15.626f6b02.chunk.js"},{"revision":"4dfc271d1da6620d4af4824968e2756a","url":"static/js/16.c12a8426.chunk.js"},{"revision":"2771a4d4efa494c36ffd9abc34c4dd7f","url":"static/js/17.fd2a2890.chunk.js"},{"revision":"26de1507a656ef2e084191b4afde93dc","url":"static/js/18.61b2347b.chunk.js"},{"revision":"5ef21f4e12ff4c5cdc8ba985de35c55d","url":"static/js/19.bad2e3ac.chunk.js"},{"revision":"b0d1d9a2248bcc07df6b864ca2747a9d","url":"static/js/2.bd9d9746.chunk.js"},{"revision":"c07a20937f989864a1f78c8d259e0440","url":"static/js/20.ffa07a15.chunk.js"},{"revision":"cef2b74df0bf43f06d8c71490215222f","url":"static/js/21.505fc7cf.chunk.js"},{"revision":"4ecf81414f1e736e04b01ef5a56b390c","url":"static/js/22.d88638ab.chunk.js"},{"revision":"dd85a7f5588a852bb7aedd771895c6f8","url":"static/js/23.208c66d1.chunk.js"},{"revision":"031518d8536c5bac49ba7eff26d29248","url":"static/js/24.0b83165c.chunk.js"},{"revision":"f555e43c8eb65f902337d0377ef97b1e","url":"static/js/25.c3b259a0.chunk.js"},{"revision":"d9c314f7d1607f4742b293eafdb7f4af","url":"static/js/26.df5c6cff.chunk.js"},{"revision":"b8067c4a0fad96f6a7e16083b70d660b","url":"static/js/27.1b1489da.chunk.js"},{"revision":"6a0ed2576c49d9e029f1b1774f652139","url":"static/js/28.35cb0762.chunk.js"},{"revision":"8060b0638cc338b2a3a5771a648390af","url":"static/js/29.dd9089f6.chunk.js"},{"revision":"19a0d957187c9bc3f15baec3c1f9840f","url":"static/js/3.e1e3aa79.chunk.js"},{"revision":"04fe18458e0c3e5888913961c4e96433","url":"static/js/30.df3e9382.chunk.js"},{"revision":"e5f9f0414e9f2f8a0609392202b16774","url":"static/js/31.090762ff.chunk.js"},{"revision":"e63d5c1720399bdbe4169375553a117b","url":"static/js/32.1d2d54be.chunk.js"},{"revision":"e08a18697e03ee19fdac5d6f2c72f8f5","url":"static/js/33.a17002ec.chunk.js"},{"revision":"0e73a041705a951e65edf1b2ab5fe603","url":"static/js/34.f9ec6f21.chunk.js"},{"revision":"99a24e9687b9cc1cfc2a2f483e6f4cf1","url":"static/js/35.3ccea211.chunk.js"},{"revision":"971b7ab3b54e0097c322325b3cf4dce1","url":"static/js/36.ff6171e4.chunk.js"},{"revision":"5cfa16801808a0371888bb7f38fcad80","url":"static/js/37.a224414d.chunk.js"},{"revision":"39e8a6e023084fff4ec6409e690a5a8a","url":"static/js/4.e95771e3.chunk.js"},{"revision":"22f21e203d167b695c1df86abf276417","url":"static/js/5.eda31bfb.chunk.js"},{"revision":"afa792318d0af30891488fb8faeb1f14","url":"static/js/6.8605be58.chunk.js"},{"revision":"0365396837f32027a50afea7989820cf","url":"static/js/9.4d52bdfc.chunk.js"},{"revision":"07e186e4a37149431ed0c7e4da4f9092","url":"static/js/main.6b5782cb.chunk.js"},{"revision":"069bdcf1916949163c436209a53f64f4","url":"static/js/runtime-main.34db67d3.js"},{"revision":"ad8463d1313fed60e1d10324511efdc3","url":"static/media/archia-bold-webfont.ad8463d1.woff2"},{"revision":"80da55a565ba8976b8e9e84e8c511bf7","url":"static/media/archia-medium-webfont.80da55a5.woff2"},{"revision":"890ee929da47c4931933ff77fd557520","url":"static/media/archia-semibold-webfont.890ee929.woff2"}]);

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'PRODUCTION',
        })
      )
    );

    // Adding staleWhileRevalidate for all js files. Provide faster access from cache while revalidating in the background
    workbox.routing.registerRoute(
      /.*\.js$/,
      new workbox.strategies.StaleWhileRevalidate()
    );

    // Adding staleWhileRevalidate for all html files
    workbox.routing.registerRoute(
      /.*\.html/,
      new workbox.strategies.StaleWhileRevalidate()
    );

    // Adding staleWhileRevalidate for all css files
    workbox.routing.registerRoute(
      /.*\.css/,
      new workbox.strategies.StaleWhileRevalidate()
    );

    // Adding networkFirst for all json data. In offline mode will be fetched from cache
    workbox.routing.registerRoute(
      new RegExp('https://api\\.covid19india\\.org/.*\\.json'),
      new workbox.strategies.NetworkFirst(),
      'GET'
    );
  } else {
    console.log('Workbox could not be loaded. Hence, no offline support.');
  }
}
