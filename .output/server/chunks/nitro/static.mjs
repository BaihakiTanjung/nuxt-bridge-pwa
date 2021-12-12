import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"21bc-XwkmumvsWAWQvKTShmzlcL3xoys\"",
    "mtime": "2021-12-12T17:20:06.356Z",
    "path": "../public/favicon.ico"
  },
  "/nuxtLogo.jpeg": {
    "type": "image/jpeg",
    "etag": "\"1d72-XGEIhg/tdZQ5ul5qTJCVuyt673s\"",
    "mtime": "2021-12-12T17:20:06.354Z",
    "path": "../public/nuxtLogo.jpeg"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"e72-y83Kt6nSbHBCnL1a8FKM8LtgHaM\"",
    "mtime": "2021-12-12T17:20:06.351Z",
    "path": "../public/sw.js"
  },
  "/_nuxt/NuxtLogo-legacy.71e80523.js": {
    "type": "application/javascript",
    "etag": "\"6e0-pjLTy2pyD+r2mSH1xPQgPNJ+kj0\"",
    "mtime": "2021-12-12T17:20:06.471Z",
    "path": "../public/_nuxt/NuxtLogo-legacy.71e80523.js"
  },
  "/_nuxt/NuxtLogo.0ba10b31.js": {
    "type": "application/javascript",
    "etag": "\"608-oH01GdvNhnWq011i+dBx6ARbfK4\"",
    "mtime": "2021-12-12T17:20:06.470Z",
    "path": "../public/_nuxt/NuxtLogo.0ba10b31.js"
  },
  "/_nuxt/NuxtLogo.0c230018.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19-0QPZZ0V19iKteWBOIv5f+52Gwcg\"",
    "mtime": "2021-12-12T17:20:06.468Z",
    "path": "../public/_nuxt/NuxtLogo.0c230018.css"
  },
  "/_nuxt/Tutorial-legacy.1b04c14a.js": {
    "type": "application/javascript",
    "etag": "\"1a69-qVetI9A1UjfF3CtpUkWElmqkJQ8\"",
    "mtime": "2021-12-12T17:20:06.467Z",
    "path": "../public/_nuxt/Tutorial-legacy.1b04c14a.js"
  },
  "/_nuxt/Tutorial.a84d1d57.js": {
    "type": "application/javascript",
    "etag": "\"1a0c-5V7qTN5GP/gmHC27kSTD5ThD9bc\"",
    "mtime": "2021-12-12T17:20:06.466Z",
    "path": "../public/_nuxt/Tutorial.a84d1d57.js"
  },
  "/_nuxt/client-legacy.ec2c5389.js": {
    "type": "application/javascript",
    "etag": "\"bb16-mW/aJTxNQmhShcm+2+FYI/T3/GU\"",
    "mtime": "2021-12-12T17:20:06.464Z",
    "path": "../public/_nuxt/client-legacy.ec2c5389.js"
  },
  "/_nuxt/client.795a2511.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b6-x7kGmKoD9wbdRMWqZ3X8oG+U4jw\"",
    "mtime": "2021-12-12T17:20:06.462Z",
    "path": "../public/_nuxt/client.795a2511.css"
  },
  "/_nuxt/client.a89f8abb.js": {
    "type": "application/javascript",
    "etag": "\"900c-2aTiYzb/DH6mUpuztzYxCCcVyMU\"",
    "mtime": "2021-12-12T17:20:06.458Z",
    "path": "../public/_nuxt/client.a89f8abb.js"
  },
  "/_nuxt/entry-legacy.73249e31.js": {
    "type": "application/javascript",
    "etag": "\"a3-D2OZffIh89djFeaOFV1BMmXV0is\"",
    "mtime": "2021-12-12T17:20:06.452Z",
    "path": "../public/_nuxt/entry-legacy.73249e31.js"
  },
  "/_nuxt/index-legacy.e7e392a0.js": {
    "type": "application/javascript",
    "etag": "\"193-JImWLWOQaWbWxNlisEBBKSrfq14\"",
    "mtime": "2021-12-12T17:20:06.380Z",
    "path": "../public/_nuxt/index-legacy.e7e392a0.js"
  },
  "/_nuxt/index.d49b39e4.js": {
    "type": "application/javascript",
    "etag": "\"136-EnNb8MXlfIG5j+iSNFsyFruF7io\"",
    "mtime": "2021-12-12T17:20:06.379Z",
    "path": "../public/_nuxt/index.d49b39e4.js"
  },
  "/_nuxt/manifest.8fa55302.json": {
    "type": "application/json",
    "etag": "\"54c-YpLBmtvc5nK9JvH7aSs7dnQN/Es\"",
    "mtime": "2021-12-12T17:20:06.377Z",
    "path": "../public/_nuxt/manifest.8fa55302.json"
  },
  "/_nuxt/polyfills-legacy.ecb3de0f.js": {
    "type": "application/javascript",
    "etag": "\"16efa-EIWs0dwBs83X+UM3/28ObzQfkvE\"",
    "mtime": "2021-12-12T17:20:06.372Z",
    "path": "../public/_nuxt/polyfills-legacy.ecb3de0f.js"
  },
  "/_nuxt/vendor-legacy.c6f0150b.js": {
    "type": "application/javascript",
    "etag": "\"29bb9-+oxDkC6VxkjgjrXsqKJMQeGp7xY\"",
    "mtime": "2021-12-12T17:20:06.367Z",
    "path": "../public/_nuxt/vendor-legacy.c6f0150b.js"
  },
  "/_nuxt/vendor.13047ac8.js": {
    "type": "application/javascript",
    "etag": "\"2776f-+M+Wn9wvXimx/WAdQTxaoZvSdFY\"",
    "mtime": "2021-12-12T17:20:06.364Z",
    "path": "../public/_nuxt/vendor.13047ac8.js"
  },
  "/_nuxt/workbox-window.prod.es5-legacy.0a2ff814.js": {
    "type": "application/javascript",
    "etag": "\"1428-tHJxCoRDp7RzX9YFxQ9mxKot45E\"",
    "mtime": "2021-12-12T17:20:06.361Z",
    "path": "../public/_nuxt/workbox-window.prod.es5-legacy.0a2ff814.js"
  },
  "/_nuxt/workbox-window.prod.es5.62f68450.js": {
    "type": "application/javascript",
    "etag": "\"13b3-xEuQGikQirDQrQllNWGW/wmQcQY\"",
    "mtime": "2021-12-12T17:20:06.360Z",
    "path": "../public/_nuxt/workbox-window.prod.es5.62f68450.js"
  },
  "/_nuxt/icons/icon_120x120.3adfc4.png": {
    "type": "image/png",
    "etag": "\"f7a-U5dd5mKOk8hsMfJ1kJ5hAGAZQfQ\"",
    "mtime": "2021-12-12T17:20:06.445Z",
    "path": "../public/_nuxt/icons/icon_120x120.3adfc4.png"
  },
  "/_nuxt/icons/icon_144x144.3adfc4.png": {
    "type": "image/png",
    "etag": "\"1518-fkDyOIYdYihkQeyaQlLCLe4H/Xo\"",
    "mtime": "2021-12-12T17:20:06.434Z",
    "path": "../public/_nuxt/icons/icon_144x144.3adfc4.png"
  },
  "/_nuxt/icons/icon_152x152.3adfc4.png": {
    "type": "image/png",
    "etag": "\"170a-x4y1piE0BWixSk6ITYZR6/zfgPg\"",
    "mtime": "2021-12-12T17:20:06.433Z",
    "path": "../public/_nuxt/icons/icon_152x152.3adfc4.png"
  },
  "/_nuxt/icons/icon_192x192.3adfc4.png": {
    "type": "image/png",
    "etag": "\"2194-05HyhYeBXFomrVUylOn0ykoTHUw\"",
    "mtime": "2021-12-12T17:20:06.430Z",
    "path": "../public/_nuxt/icons/icon_192x192.3adfc4.png"
  },
  "/_nuxt/icons/icon_384x384.3adfc4.png": {
    "type": "image/png",
    "etag": "\"6a7e-welhYP0ZL9WupbuyvkT7Z6wxuMk\"",
    "mtime": "2021-12-12T17:20:06.426Z",
    "path": "../public/_nuxt/icons/icon_384x384.3adfc4.png"
  },
  "/_nuxt/icons/icon_512x512.3adfc4.png": {
    "type": "image/png",
    "etag": "\"a638-OrAhf5lBTQ3v0jes2P7S0MFjgk0\"",
    "mtime": "2021-12-12T17:20:06.424Z",
    "path": "../public/_nuxt/icons/icon_512x512.3adfc4.png"
  },
  "/_nuxt/icons/icon_64x64.3adfc4.png": {
    "type": "image/png",
    "etag": "\"5fb-Mxq/aCfq2tt1uRPUzjke9YUrOI4\"",
    "mtime": "2021-12-12T17:20:06.421Z",
    "path": "../public/_nuxt/icons/icon_64x64.3adfc4.png"
  },
  "/_nuxt/icons/splash_ipad_1536x2048.3adfc4.png": {
    "type": "image/png",
    "etag": "\"34915-Z4iaFNiriK9M6ewZKAAvcoV6j2U\"",
    "mtime": "2021-12-12T17:20:06.419Z",
    "path": "../public/_nuxt/icons/splash_ipad_1536x2048.3adfc4.png"
  },
  "/_nuxt/icons/splash_ipadpro10_1668x2224.3adfc4.png": {
    "type": "image/png",
    "etag": "\"3bc36-+3vEKaMLwg74RYDssCP0xgKYncU\"",
    "mtime": "2021-12-12T17:20:06.415Z",
    "path": "../public/_nuxt/icons/splash_ipadpro10_1668x2224.3adfc4.png"
  },
  "/_nuxt/icons/splash_ipadpro12_2048x2732.3adfc4.png": {
    "type": "image/png",
    "etag": "\"51a5b-dAG+CVTKnWHLvmgn7wNUKjzK2f4\"",
    "mtime": "2021-12-12T17:20:06.412Z",
    "path": "../public/_nuxt/icons/splash_ipadpro12_2048x2732.3adfc4.png"
  },
  "/_nuxt/icons/splash_ipadpro9_1536x2048.3adfc4.png": {
    "type": "image/png",
    "etag": "\"34915-Z4iaFNiriK9M6ewZKAAvcoV6j2U\"",
    "mtime": "2021-12-12T17:20:06.405Z",
    "path": "../public/_nuxt/icons/splash_ipadpro9_1536x2048.3adfc4.png"
  },
  "/_nuxt/icons/splash_iphone6_50x1334.3adfc4.png": {
    "type": "image/png",
    "etag": "\"574-hwYlDzM/EsFda5/ryp2skxvVlaw\"",
    "mtime": "2021-12-12T17:20:06.401Z",
    "path": "../public/_nuxt/icons/splash_iphone6_50x1334.3adfc4.png"
  },
  "/_nuxt/icons/splash_iphoneplus_1080x1920.3adfc4.png": {
    "type": "image/png",
    "etag": "\"1fc74-ihJ3rVY8WkodOePj64orDbmWmDA\"",
    "mtime": "2021-12-12T17:20:06.400Z",
    "path": "../public/_nuxt/icons/splash_iphoneplus_1080x1920.3adfc4.png"
  },
  "/_nuxt/icons/splash_iphonese_640x1136.3adfc4.png": {
    "type": "image/png",
    "etag": "\"eb8b-9zmY5d4+2BSDWYiMez2/tO8iGPo\"",
    "mtime": "2021-12-12T17:20:06.398Z",
    "path": "../public/_nuxt/icons/splash_iphonese_640x1136.3adfc4.png"
  },
  "/_nuxt/icons/splash_iphonex_1125x2436.3adfc4.png": {
    "type": "image/png",
    "etag": "\"22025-kHuyiEepDtzIUeYCqk/leQ1iHKk\"",
    "mtime": "2021-12-12T17:20:06.396Z",
    "path": "../public/_nuxt/icons/splash_iphonex_1125x2436.3adfc4.png"
  },
  "/_nuxt/icons/splash_iphonexr_828x1792.3adfc4.png": {
    "type": "image/png",
    "etag": "\"15e74-WTOXtj9VHcTBZ3hsAc9INzG1nTo\"",
    "mtime": "2021-12-12T17:20:06.392Z",
    "path": "../public/_nuxt/icons/splash_iphonexr_828x1792.3adfc4.png"
  },
  "/_nuxt/icons/splash_iphonexsmax_1242x2688.3adfc4.png": {
    "type": "image/png",
    "etag": "\"27bb6-xizpeUUXPbExHa8XM/Tdj0Xh9oU\"",
    "mtime": "2021-12-12T17:20:06.384Z",
    "path": "../public/_nuxt/icons/splash_iphonexsmax_1242x2688.3adfc4.png"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const PUBLIC_PATH = "/_nuxt/";
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/static" + "/" + "1639329583";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  if (!asset) {
    if (id.startsWith(PUBLIC_PATH) && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (id.startsWith(PUBLIC_PATH)) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
