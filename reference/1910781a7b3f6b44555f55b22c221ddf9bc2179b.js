const Pf = () => Promise.resolve().then(() => Bf), ui = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: oa, jsx: e, jsxs: o } = ui;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function ul(t) {
  const a = t?.props?._fgT, l = typeof a == "function" || typeof a == "string" || typeof a == "object" && a !== null && "$$typeof" in a;
  return globalThis.__GLOBALS__.React.isValidElement(t) && l;
}
function ht(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function hl(t) {
  const { _fgT: a, _fgS: l, _fgB: i, _fgD: r, ...n } = t.props;
  return globalThis.__GLOBALS__.React.createElement(a, {
    ...n,
    key: t.key
  }, n.children);
}
function Ft(t) {
  return ul(t) ? hl(t) : ht(t) ? t.props.children : t;
}
const pt = globalThis.__GLOBALS__.React.Children, ml = {
  map(t, a, l) {
    return pt.map(t, (i, r) => {
      const n = Ft(i);
      return ht(i) ? null : a.call(l, n, r);
    });
  },
  forEach(t, a, l) {
    pt.forEach(t, (i, r) => {
      if (ht(i))
        return;
      const n = Ft(i);
      a.call(l, n, r);
    });
  },
  count(t) {
    let a = 0;
    return pt.forEach(t, (l) => {
      ht(l) || a++;
    }), a;
  },
  toArray(t) {
    const a = [];
    return pt.forEach(t, (l) => {
      ht(l) || a.push(Ft(l));
    }), a;
  },
  only(t) {
    const a = pt.only(t);
    return Ft(a);
  }
}, Jt = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function hi(t) {
  if (t == null || typeof t != "object") return t;
  const a = Object.keys(t);
  let l = !1;
  for (let r = 0; r < Jt.length; r++)
    if (Jt[r] in t) {
      l = !0;
      break;
    }
  if (!l) return t;
  const i = {};
  for (let r = 0; r < a.length; r++) {
    const n = a[r];
    Jt.indexOf(n) === -1 && (i[n] = t[n]);
  }
  return i;
}
const Oa = globalThis.__GLOBALS__.React.cloneElement, vl = (t, ...a) => {
  if (ul(t)) {
    const l = hl(t), i = a[0];
    return i != null && typeof i == "object" && (a = [
      hi(i),
      ...a.slice(1)
    ]), Oa(l, ...a);
  }
  return Oa(t, ...a);
}, mi = {
  ...globalThis.__GLOBALS__.React,
  Children: ml,
  cloneElement: vl
}, { Component: bl, createContext: ve, createElement: F, createFactory: vi, createRef: bi, forwardRef: Vt, Fragment: nt, isValidElement: wi, lazy: gi, memo: wl, Profiler: Ni, PureComponent: ki, startTransition: wt, StrictMode: yi, Suspense: Ri, use: Ci, useCallback: rt, useContext: G, useDebugValue: Mi, useDeferredValue: Si, useEffect: Fe, useId: Li, useImperativeHandle: ji, useInsertionEffect: Ii, useLayoutEffect: ca, useMemo: Se, useReducer: _i, useRef: yt, useState: se, useSyncExternalStore: Ei, useTransition: Bi, version: Pi, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Di } = globalThis.__GLOBALS__.React, Fi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Children: ml,
  Component: bl,
  Fragment: nt,
  Profiler: Ni,
  PureComponent: ki,
  StrictMode: yi,
  Suspense: Ri,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Di,
  cloneElement: vl,
  createContext: ve,
  createElement: F,
  createFactory: vi,
  createRef: bi,
  default: mi,
  forwardRef: Vt,
  isValidElement: wi,
  lazy: gi,
  memo: wl,
  startTransition: wt,
  use: Ci,
  useCallback: rt,
  useContext: G,
  useDebugValue: Mi,
  useDeferredValue: Si,
  useEffect: Fe,
  useId: Li,
  useImperativeHandle: ji,
  useInsertionEffect: Ii,
  useLayoutEffect: ca,
  useMemo: Se,
  useReducer: _i,
  useRef: yt,
  useState: se,
  useSyncExternalStore: Ei,
  useTransition: Bi,
  version: Pi
}, Symbol.toStringTag, { value: "Module" }));
/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var gl = (t) => {
  throw TypeError(t);
}, Oi = (t, a, l) => a.has(t) || gl("Cannot " + l), Xt = (t, a, l) => (Oi(t, a, "read from private field"), l ? l.call(t) : a.get(t)), Ai = (t, a, l) => a.has(t) ? gl("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, l), Aa = "popstate";
function zi(t = {}) {
  function a(i, r) {
    let { pathname: n, search: s, hash: c } = i.location;
    return gt(
      "",
      { pathname: n, search: s, hash: c },
      // state defaults to `null` because `window.history.state` does
      r.state && r.state.usr || null,
      r.state && r.state.key || "default"
    );
  }
  function l(i, r) {
    return typeof r == "string" ? r : Ie(r);
  }
  return Hi(
    a,
    l,
    null,
    t
  );
}
function A(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function te(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function Ti() {
  return Math.random().toString(36).substring(2, 10);
}
function za(t, a) {
  return {
    usr: t.state,
    key: t.key,
    idx: a
  };
}
function gt(t, a, l = null, i) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? $e(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || i || Ti()
  };
}
function Ie({
  pathname: t = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (t += l.charAt(0) === "#" ? l : "#" + l), t;
}
function $e(t) {
  let a = {};
  if (t) {
    let l = t.indexOf("#");
    l >= 0 && (a.hash = t.substring(l), t = t.substring(0, l));
    let i = t.indexOf("?");
    i >= 0 && (a.search = t.substring(i), t = t.substring(0, i)), t && (a.pathname = t);
  }
  return a;
}
function Hi(t, a, l, i = {}) {
  let { window: r = document.defaultView, v5Compat: n = !1 } = i, s = r.history, c = "POP", p = null, f = v();
  f == null && (f = 0, s.replaceState({ ...s.state, idx: f }, ""));
  function v() {
    return (s.state || { idx: null }).idx;
  }
  function u() {
    c = "POP";
    let C = v(), L = C == null ? null : C - f;
    f = C, p && p({ action: c, location: R.location, delta: L });
  }
  function w(C, L) {
    c = "PUSH";
    let y = gt(R.location, C, L);
    f = v() + 1;
    let B = za(y, f), J = R.createHref(y);
    try {
      s.pushState(B, "", J);
    } catch (U) {
      if (U instanceof DOMException && U.name === "DataCloneError")
        throw U;
      r.location.assign(J);
    }
    n && p && p({ action: c, location: R.location, delta: 1 });
  }
  function m(C, L) {
    c = "REPLACE";
    let y = gt(R.location, C, L);
    f = v();
    let B = za(y, f), J = R.createHref(y);
    s.replaceState(B, "", J), n && p && p({ action: c, location: R.location, delta: 0 });
  }
  function k(C) {
    return Nl(C);
  }
  let R = {
    get action() {
      return c;
    },
    get location() {
      return t(r, s);
    },
    listen(C) {
      if (p)
        throw new Error("A history only accepts one active listener");
      return r.addEventListener(Aa, u), p = C, () => {
        r.removeEventListener(Aa, u), p = null;
      };
    },
    createHref(C) {
      return a(r, C);
    },
    createURL: k,
    encodeLocation(C) {
      let L = k(C);
      return {
        pathname: L.pathname,
        search: L.search,
        hash: L.hash
      };
    },
    push: w,
    replace: m,
    go(C) {
      return s.go(C);
    }
  };
  return R;
}
function Nl(t, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), A(l, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : Ie(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = l + i), new URL(i, l);
}
var mt, Ta = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (Ai(this, mt, /* @__PURE__ */ new Map()), t)
      for (let [a, l] of t)
        this.set(a, l);
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(t) {
    if (Xt(this, mt).has(t))
      return Xt(this, mt).get(t);
    if (t.defaultValue !== void 0)
      return t.defaultValue;
    throw new Error("No value found for context");
  }
  /**
   * Set a value for the context. If the context already has a value set, this
   * will overwrite it.
   *
   * @param context The context to set the value for
   * @param value The value to set for the context
   * @returns {void}
   */
  set(t, a) {
    Xt(this, mt).set(t, a);
  }
};
mt = /* @__PURE__ */ new WeakMap();
var $i = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function Gi(t) {
  return $i.has(
    t
  );
}
var Vi = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function Ui(t) {
  return Vi.has(
    t
  );
}
function Wi(t) {
  return t.index === !0;
}
function Nt(t, a, l = [], i = {}, r = !1) {
  return t.map((n, s) => {
    let c = [...l, String(s)], p = typeof n.id == "string" ? n.id : c.join("-");
    if (A(
      n.index !== !0 || !n.children,
      "Cannot specify children on an index route"
    ), A(
      r || !i[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), Wi(n)) {
      let f = {
        ...n,
        id: p
      };
      return i[p] = Ha(
        f,
        a(f)
      ), f;
    } else {
      let f = {
        ...n,
        id: p,
        children: void 0
      };
      return i[p] = Ha(
        f,
        a(f)
      ), n.children && (f.children = Nt(
        n.children,
        a,
        c,
        i,
        r
      )), f;
    }
  });
}
function Ha(t, a) {
  return Object.assign(t, {
    ...a,
    ...typeof a.lazy == "object" && a.lazy != null ? {
      lazy: {
        ...t.lazy,
        ...a.lazy
      }
    } : {}
  });
}
function ze(t, a, l = "/") {
  return vt(t, a, l, !1);
}
function vt(t, a, l, i) {
  let r = typeof a == "string" ? $e(a) : a, n = ye(r.pathname || "/", l);
  if (n == null)
    return null;
  let s = kl(t);
  Yi(s);
  let c = null;
  for (let p = 0; c == null && p < s.length; ++p) {
    let f = rn(n);
    c = ln(
      s[p],
      f,
      i
    );
  }
  return c;
}
function Zi(t, a) {
  let { route: l, pathname: i, params: r } = t;
  return {
    id: l.id,
    pathname: i,
    params: r,
    data: a[l.id],
    loaderData: a[l.id],
    handle: l.handle
  };
}
function kl(t, a = [], l = [], i = "", r = !1) {
  let n = (s, c, p = r, f) => {
    let v = {
      relativePath: f === void 0 ? s.path || "" : f,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: c,
      route: s
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(i) && p)
        return;
      A(
        v.relativePath.startsWith(i),
        `Absolute route path "${v.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), v.relativePath = v.relativePath.slice(i.length);
    }
    let u = je([i, v.relativePath]), w = l.concat(v);
    s.children && s.children.length > 0 && (A(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      s.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${u}".`
    ), kl(
      s.children,
      a,
      w,
      u,
      p
    )), !(s.path == null && !s.index) && a.push({
      path: u,
      score: tn(u, s.index),
      routesMeta: w
    });
  };
  return t.forEach((s, c) => {
    if (s.path === "" || !s.path?.includes("?"))
      n(s, c);
    else
      for (let p of yl(s.path))
        n(s, c, !0, p);
  }), a;
}
function yl(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [l, ...i] = a, r = l.endsWith("?"), n = l.replace(/\?$/, "");
  if (i.length === 0)
    return r ? [n, ""] : [n];
  let s = yl(i.join("/")), c = [];
  return c.push(
    ...s.map(
      (p) => p === "" ? n : [n, p].join("/")
    )
  ), r && c.push(...s), c.map(
    (p) => t.startsWith("/") && p === "" ? "/" : p
  );
}
function Yi(t) {
  t.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : an(
      a.routesMeta.map((i) => i.childrenIndex),
      l.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var Ki = /^:[\w-]+$/, qi = 3, Ji = 2, Xi = 1, Qi = 10, en = -2, $a = (t) => t === "*";
function tn(t, a) {
  let l = t.split("/"), i = l.length;
  return l.some($a) && (i += en), a && (i += Ji), l.filter((r) => !$a(r)).reduce(
    (r, n) => r + (Ki.test(n) ? qi : n === "" ? Xi : Qi),
    i
  );
}
function an(t, a) {
  return t.length === a.length && t.slice(0, -1).every((i, r) => i === a[r]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    t[t.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function ln(t, a, l = !1) {
  let { routesMeta: i } = t, r = {}, n = "/", s = [];
  for (let c = 0; c < i.length; ++c) {
    let p = i[c], f = c === i.length - 1, v = n === "/" ? a : a.slice(n.length) || "/", u = Gt(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: f },
      v
    ), w = p.route;
    if (!u && f && l && !i[i.length - 1].route.index && (u = Gt(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      v
    )), !u)
      return null;
    Object.assign(r, u.params), s.push({
      // TODO: Can this as be avoided?
      params: r,
      pathname: je([n, u.pathname]),
      pathnameBase: cn(
        je([n, u.pathnameBase])
      ),
      route: w
    }), u.pathnameBase !== "/" && (n = je([n, u.pathnameBase]));
  }
  return s;
}
function Gt(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [l, i] = nn(
    t.path,
    t.caseSensitive,
    t.end
  ), r = a.match(l);
  if (!r) return null;
  let n = r[0], s = n.replace(/(.)\/+$/, "$1"), c = r.slice(1);
  return {
    params: i.reduce(
      (f, { paramName: v, isOptional: u }, w) => {
        if (v === "*") {
          let k = c[w] || "";
          s = n.slice(0, n.length - k.length).replace(/(.)\/+$/, "$1");
        }
        const m = c[w];
        return u && !m ? f[v] = void 0 : f[v] = (m || "").replace(/%2F/g, "/"), f;
      },
      {}
    ),
    pathname: n,
    pathnameBase: s,
    pattern: t
  };
}
function nn(t, a = !1, l = !0) {
  te(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let i = [], r = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (s, c, p) => (i.push({ paramName: c, isOptional: p != null }), p ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (i.push({ paramName: "*" }), r += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : l ? r += "\\/*$" : t !== "" && t !== "/" && (r += "(?:(?=\\/|$))"), [new RegExp(r, a ? void 0 : "i"), i];
}
function rn(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return te(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function ye(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let l = a.endsWith("/") ? a.length - 1 : a.length, i = t.charAt(l);
  return i && i !== "/" ? null : t.slice(l) || "/";
}
function sn({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : je([t, a]);
}
var Rl = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, da = (t) => Rl.test(t);
function on(t, a = "/") {
  let {
    pathname: l,
    search: i = "",
    hash: r = ""
  } = typeof t == "string" ? $e(t) : t, n;
  return l ? (l = l.replace(/\/\/+/g, "/"), l.startsWith("/") ? n = Ga(l.substring(1), "/") : n = Ga(l, a)) : n = a, {
    pathname: n,
    search: dn(i),
    hash: pn(r)
  };
}
function Ga(t, a) {
  let l = a.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((r) => {
    r === ".." ? l.length > 1 && l.pop() : r !== "." && l.push(r);
  }), l.length > 1 ? l.join("/") : "/";
}
function Qt(t, a, l, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Cl(t) {
  return t.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function pa(t) {
  let a = Cl(t);
  return a.map(
    (l, i) => i === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function fa(t, a, l, i = !1) {
  let r;
  typeof t == "string" ? r = $e(t) : (r = { ...t }, A(
    !r.pathname || !r.pathname.includes("?"),
    Qt("?", "pathname", "search", r)
  ), A(
    !r.pathname || !r.pathname.includes("#"),
    Qt("#", "pathname", "hash", r)
  ), A(
    !r.search || !r.search.includes("#"),
    Qt("#", "search", "hash", r)
  ));
  let n = t === "" || r.pathname === "", s = n ? "/" : r.pathname, c;
  if (s == null)
    c = l;
  else {
    let u = a.length - 1;
    if (!i && s.startsWith("..")) {
      let w = s.split("/");
      for (; w[0] === ".."; )
        w.shift(), u -= 1;
      r.pathname = w.join("/");
    }
    c = u >= 0 ? a[u] : "/";
  }
  let p = on(r, c), f = s && s !== "/" && s.endsWith("/"), v = (n || s === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (f || v) && (p.pathname += "/"), p;
}
var je = (t) => t.join("/").replace(/\/\/+/g, "/"), cn = (t) => t.replace(/\/+$/, "").replace(/^\/*/, "/"), dn = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, pn = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, Rt = class {
  constructor(t, a, l, i = !1) {
    this.status = t, this.statusText = a || "", this.internal = i, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function kt(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function Ct(t) {
  return t.map((a) => a.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
var Ml = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Sl(t, a) {
  let l = t;
  if (typeof l != "string" || !Rl.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let i = l, r = !1;
  if (Ml)
    try {
      let n = new URL(window.location.href), s = l.startsWith("//") ? new URL(n.protocol + l) : new URL(l), c = ye(s.pathname, a);
      s.origin === n.origin && c != null ? l = c + s.search + s.hash : r = !0;
    } catch {
      te(
        !1,
        `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: i,
    isExternal: r,
    to: l
  };
}
var He = Symbol("Uninstrumented");
function fn(t, a) {
  let l = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  t.forEach(
    (r) => r({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(n) {
        let s = Object.keys(l);
        for (let c of s)
          n[c] && l[c].push(n[c]);
      }
    })
  );
  let i = {};
  if (typeof a.lazy == "function" && l.lazy.length > 0) {
    let r = lt(l.lazy, a.lazy, () => {
    });
    r && (i.lazy = r);
  }
  if (typeof a.lazy == "object") {
    let r = a.lazy;
    ["middleware", "loader", "action"].forEach((n) => {
      let s = r[n], c = l[`lazy.${n}`];
      if (typeof s == "function" && c.length > 0) {
        let p = lt(c, s, () => {
        });
        p && (i.lazy = Object.assign(i.lazy || {}, {
          [n]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((r) => {
    let n = a[r];
    if (typeof n == "function" && l[r].length > 0) {
      let s = n[He] ?? n, c = lt(
        l[r],
        s,
        (...p) => Va(p[0])
      );
      c && (r === "loader" && s.hydrate === !0 && (c.hydrate = !0), c[He] = s, i[r] = c);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (i.middleware = a.middleware.map((r) => {
    let n = r[He] ?? r, s = lt(
      l.middleware,
      n,
      (...c) => Va(c[0])
    );
    return s ? (s[He] = n, s) : r;
  })), i;
}
function xn(t, a) {
  let l = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (i) => i({
      instrument(r) {
        let n = Object.keys(r);
        for (let s of n)
          r[s] && l[s].push(r[s]);
      }
    })
  ), l.navigate.length > 0) {
    let i = t.navigate[He] ?? t.navigate, r = lt(
      l.navigate,
      i,
      (...n) => {
        let [s, c] = n;
        return {
          to: typeof s == "number" || typeof s == "string" ? s : s ? Ie(s) : ".",
          ...Ua(t, c ?? {})
        };
      }
    );
    r && (r[He] = i, t.navigate = r);
  }
  if (l.fetch.length > 0) {
    let i = t.fetch[He] ?? t.fetch, r = lt(l.fetch, i, (...n) => {
      let [s, , c, p] = n;
      return {
        href: c ?? ".",
        fetcherKey: s,
        ...Ua(t, p ?? {})
      };
    });
    r && (r[He] = i, t.fetch = r);
  }
  return t;
}
function lt(t, a, l) {
  return t.length === 0 ? null : async (...i) => {
    let r = await Ll(
      t,
      l(...i),
      () => a(...i),
      t.length - 1
    );
    if (r.type === "error")
      throw r.value;
    return r.value;
  };
}
async function Ll(t, a, l, i) {
  let r = t[i], n;
  if (r) {
    let s, c = async () => (s ? console.error("You cannot call instrumented handlers more than once") : s = Ll(t, a, l, i - 1), n = await s, A(n, "Expected a result"), n.type === "error" && n.value instanceof Error ? { status: "error", error: n.value } : { status: "success", error: void 0 });
    try {
      await r(c, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    s || await c(), await s;
  } else
    try {
      n = { type: "success", value: await l() };
    } catch (s) {
      n = { type: "error", value: s };
    }
  return n || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Va(t) {
  let { request: a, context: l, params: i, unstable_pattern: r } = t;
  return {
    request: un(a),
    params: { ...i },
    unstable_pattern: r,
    context: hn(l)
  };
}
function Ua(t, a) {
  return {
    currentUrl: Ie(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function un(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function hn(t) {
  if (vn(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var mn = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function vn(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === mn;
}
var jl = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], bn = new Set(
  jl
), wn = [
  "GET",
  ...jl
], gn = new Set(wn), Il = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Nn = /* @__PURE__ */ new Set([307, 308]), ea = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, kn = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, ft = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, yn = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), _l = "remix-router-transitions", El = Symbol("ResetLoaderData");
function Rn(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  A(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], r = t.mapRouteProperties || yn, n = r;
  if (t.unstable_instrumentations) {
    let d = t.unstable_instrumentations;
    n = (x) => ({
      ...r(x),
      ...fn(
        d.map((h) => h.route).filter(Boolean),
        x
      )
    });
  }
  let s = {}, c = Nt(
    t.routes,
    n,
    void 0,
    s
  ), p, f = t.basename || "/";
  f.startsWith("/") || (f = `/${f}`);
  let v = t.dataStrategy || jn, u = {
    ...t.future
  }, w = null, m = /* @__PURE__ */ new Set(), k = null, R = null, C = null, L = t.hydrationData != null, y = ze(c, t.history.location, f), B = !1, J = null, U;
  if (y == null && !t.patchRoutesOnNavigation) {
    let d = ke(404, {
      pathname: t.history.location.pathname
    }), { matches: x, route: h } = Ot(c);
    U = !0, y = x, J = { [h.id]: d };
  } else if (y && !t.hydrationData && _t(
    y,
    c,
    t.history.location.pathname
  ).active && (y = null), y)
    if (y.some((d) => d.route.lazy))
      U = !1;
    else if (!y.some((d) => xa(d.route)))
      U = !0;
    else {
      let d = t.hydrationData ? t.hydrationData.loaderData : null, x = t.hydrationData ? t.hydrationData.errors : null;
      if (x) {
        let h = y.findIndex(
          (g) => x[g.route.id] !== void 0
        );
        U = y.slice(0, h + 1).every(
          (g) => !na(g.route, d, x)
        );
      } else
        U = y.every(
          (h) => !na(h.route, d, x)
        );
    }
  else {
    U = !1, y = [];
    let d = _t(
      null,
      c,
      t.history.location.pathname
    );
    d.active && d.matches && (B = !0, y = d.matches);
  }
  let Q, b = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: y,
    initialized: U,
    navigation: ea,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || J,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, D = "POP", V = null, q = !1, K, le = !1, Ce = /* @__PURE__ */ new Map(), ae = null, Y = !1, X = !1, be = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Map(), ie = 0, xe = -1, Me = /* @__PURE__ */ new Map(), ue = /* @__PURE__ */ new Set(), we = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), Ge = /* @__PURE__ */ new Map(), jt, st = null;
  function ql() {
    if (w = t.history.listen(
      ({ action: d, location: x, delta: h }) => {
        if (jt) {
          jt(), jt = void 0;
          return;
        }
        te(
          Ge.size === 0 || h != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let g = Ea({
          currentLocation: b.location,
          nextLocation: x,
          historyAction: d
        });
        if (g && h != null) {
          let N = new Promise((j) => {
            jt = j;
          });
          t.history.go(h * -1), It(g, {
            state: "blocked",
            location: x,
            proceed() {
              It(g, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: x
              }), N.then(() => t.history.go(h));
            },
            reset() {
              let j = new Map(b.blockers);
              j.set(g, ft), oe({ blockers: j });
            }
          }), V?.resolve(), V = null;
          return;
        }
        return Ve(d, x);
      }
    ), l) {
      Zn(a, Ce);
      let d = () => Yn(a, Ce);
      a.addEventListener("pagehide", d), ae = () => a.removeEventListener("pagehide", d);
    }
    return b.initialized || Ve("POP", b.location, {
      initialHydration: !0
    }), Q;
  }
  function Jl() {
    w && w(), ae && ae(), m.clear(), K && K.abort(), b.fetchers.forEach((d, x) => Yt(x)), b.blockers.forEach((d, x) => _a(x));
  }
  function Xl(d) {
    return m.add(d), () => m.delete(d);
  }
  function oe(d, x = {}) {
    d.matches && (d.matches = d.matches.map((N) => {
      let j = s[N.route.id], M = N.route;
      return M.element !== j.element || M.errorElement !== j.errorElement || M.hydrateFallbackElement !== j.hydrateFallbackElement ? {
        ...N,
        route: j
      } : N;
    })), b = {
      ...b,
      ...d
    };
    let h = [], g = [];
    b.fetchers.forEach((N, j) => {
      N.state === "idle" && (he.has(j) ? h.push(j) : g.push(j));
    }), he.forEach((N) => {
      !b.fetchers.has(N) && !W.has(N) && h.push(N);
    }), [...m].forEach(
      (N) => N(b, {
        deletedFetchers: h,
        newErrors: d.errors ?? null,
        viewTransitionOpts: x.viewTransitionOpts,
        flushSync: x.flushSync === !0
      })
    ), h.forEach((N) => Yt(N)), g.forEach((N) => b.fetchers.delete(N));
  }
  function et(d, x, { flushSync: h } = {}) {
    let g = b.actionData != null && b.navigation.formMethod != null && de(b.navigation.formMethod) && b.navigation.state === "loading" && d.state?._isRedirect !== !0, N;
    x.actionData ? Object.keys(x.actionData).length > 0 ? N = x.actionData : N = null : g ? N = b.actionData : N = null;
    let j = x.loaderData ? tl(
      b.loaderData,
      x.loaderData,
      x.matches || [],
      x.errors
    ) : b.loaderData, M = b.blockers;
    M.size > 0 && (M = new Map(M), M.forEach((P, _) => M.set(_, ft)));
    let S = Y ? !1 : Pa(d, x.matches || b.matches), I = q === !0 || b.navigation.formMethod != null && de(b.navigation.formMethod) && d.state?._isRedirect !== !0;
    p && (c = p, p = void 0), Y || D === "POP" || (D === "PUSH" ? t.history.push(d, d.state) : D === "REPLACE" && t.history.replace(d, d.state));
    let E;
    if (D === "POP") {
      let P = Ce.get(b.location.pathname);
      P && P.has(d.pathname) ? E = {
        currentLocation: b.location,
        nextLocation: d
      } : Ce.has(d.pathname) && (E = {
        currentLocation: d,
        nextLocation: b.location
      });
    } else if (le) {
      let P = Ce.get(b.location.pathname);
      P ? P.add(d.pathname) : (P = /* @__PURE__ */ new Set([d.pathname]), Ce.set(b.location.pathname, P)), E = {
        currentLocation: b.location,
        nextLocation: d
      };
    }
    oe(
      {
        ...x,
        // matches, errors, fetchers go through as-is
        actionData: N,
        loaderData: j,
        historyAction: D,
        location: d,
        initialized: !0,
        navigation: ea,
        revalidation: "idle",
        restoreScrollPosition: S,
        preventScrollReset: I,
        blockers: M
      },
      {
        viewTransitionOpts: E,
        flushSync: h === !0
      }
    ), D = "POP", q = !1, le = !1, Y = !1, X = !1, V?.resolve(), V = null, st?.resolve(), st = null;
  }
  async function Ra(d, x) {
    if (V?.resolve(), V = null, typeof d == "number") {
      V || (V = nl());
      let $ = V.promise;
      return t.history.go(d), $;
    }
    let h = ia(
      b.location,
      b.matches,
      f,
      d,
      x?.fromRouteId,
      x?.relative
    ), { path: g, submission: N, error: j } = Wa(
      !1,
      h,
      x
    ), M = b.location, S = gt(b.location, g, x && x.state);
    S = {
      ...S,
      ...t.history.encodeLocation(S)
    };
    let I = x && x.replace != null ? x.replace : void 0, E = "PUSH";
    I === !0 ? E = "REPLACE" : I === !1 || N != null && de(N.formMethod) && N.formAction === b.location.pathname + b.location.search && (E = "REPLACE");
    let P = x && "preventScrollReset" in x ? x.preventScrollReset === !0 : void 0, _ = (x && x.flushSync) === !0, H = Ea({
      currentLocation: M,
      nextLocation: S,
      historyAction: E
    });
    if (H) {
      It(H, {
        state: "blocked",
        location: S,
        proceed() {
          It(H, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: S
          }), Ra(d, x);
        },
        reset() {
          let $ = new Map(b.blockers);
          $.set(H, ft), oe({ blockers: $ });
        }
      });
      return;
    }
    await Ve(E, S, {
      submission: N,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: j,
      preventScrollReset: P,
      replace: x && x.replace,
      enableViewTransition: x && x.viewTransition,
      flushSync: _,
      callSiteDefaultShouldRevalidate: x && x.unstable_defaultShouldRevalidate
    });
  }
  function Ql() {
    st || (st = nl()), Zt(), oe({ revalidation: "loading" });
    let d = st.promise;
    return b.navigation.state === "submitting" ? d : b.navigation.state === "idle" ? (Ve(b.historyAction, b.location, {
      startUninterruptedRevalidation: !0
    }), d) : (Ve(
      D || b.historyAction,
      b.navigation.location,
      {
        overrideNavigation: b.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), d);
  }
  async function Ve(d, x, h) {
    K && K.abort(), K = null, D = d, Y = (h && h.startUninterruptedRevalidation) === !0, di(b.location, b.matches), q = (h && h.preventScrollReset) === !0, le = (h && h.enableViewTransition) === !0;
    let g = p || c, N = h && h.overrideNavigation, j = h?.initialHydration && b.matches && b.matches.length > 0 && !B ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      b.matches
    ) : ze(g, x, f), M = (h && h.flushSync) === !0;
    if (j && b.initialized && !X && On(b.location, x) && !(h && h.submission && de(h.submission.formMethod))) {
      et(x, { matches: j }, { flushSync: M });
      return;
    }
    let S = _t(j, g, x.pathname);
    if (S.active && S.matches && (j = S.matches), !j) {
      let { error: ne, notFoundMatches: pe, route: Z } = Kt(
        x.pathname
      );
      et(
        x,
        {
          matches: pe,
          loaderData: {},
          errors: {
            [Z.id]: ne
          }
        },
        { flushSync: M }
      );
      return;
    }
    K = new AbortController();
    let I = at(
      t.history,
      x,
      K.signal,
      h && h.submission
    ), E = t.getContext ? await t.getContext() : new Ta(), P;
    if (h && h.pendingError)
      P = [
        Te(j).route.id,
        { type: "error", error: h.pendingError }
      ];
    else if (h && h.submission && de(h.submission.formMethod)) {
      let ne = await ei(
        I,
        x,
        h.submission,
        j,
        E,
        S.active,
        h && h.initialHydration === !0,
        { replace: h.replace, flushSync: M }
      );
      if (ne.shortCircuited)
        return;
      if (ne.pendingActionResult) {
        let [pe, Z] = ne.pendingActionResult;
        if (me(Z) && kt(Z.error) && Z.error.status === 404) {
          K = null, et(x, {
            matches: ne.matches,
            loaderData: {},
            errors: {
              [pe]: Z.error
            }
          });
          return;
        }
      }
      j = ne.matches || j, P = ne.pendingActionResult, N = ta(x, h.submission), M = !1, S.active = !1, I = at(
        t.history,
        I.url,
        I.signal
      );
    }
    let {
      shortCircuited: _,
      matches: H,
      loaderData: $,
      errors: re
    } = await ti(
      I,
      x,
      j,
      E,
      S.active,
      N,
      h && h.submission,
      h && h.fetcherSubmission,
      h && h.replace,
      h && h.initialHydration === !0,
      M,
      P,
      h && h.callSiteDefaultShouldRevalidate
    );
    _ || (K = null, et(x, {
      matches: H || j,
      ...al(P),
      loaderData: $,
      errors: re
    }));
  }
  async function ei(d, x, h, g, N, j, M, S = {}) {
    Zt();
    let I = Un(x, h);
    if (oe({ navigation: I }, { flushSync: S.flushSync === !0 }), j) {
      let _ = await Et(
        g,
        x.pathname,
        d.signal
      );
      if (_.type === "aborted")
        return { shortCircuited: !0 };
      if (_.type === "error") {
        if (_.partialMatches.length === 0) {
          let { matches: $, route: re } = Ot(c);
          return {
            matches: $,
            pendingActionResult: [
              re.id,
              {
                type: "error",
                error: _.error
              }
            ]
          };
        }
        let H = Te(_.partialMatches).route.id;
        return {
          matches: _.partialMatches,
          pendingActionResult: [
            H,
            {
              type: "error",
              error: _.error
            }
          ]
        };
      } else if (_.matches)
        g = _.matches;
      else {
        let { notFoundMatches: H, error: $, route: re } = Kt(
          x.pathname
        );
        return {
          matches: H,
          pendingActionResult: [
            re.id,
            {
              type: "error",
              error: $
            }
          ]
        };
      }
    }
    let E, P = Tt(g, x);
    if (!P.route.action && !P.route.lazy)
      E = {
        type: "error",
        error: ke(405, {
          method: d.method,
          pathname: x.pathname,
          routeId: P.route.id
        })
      };
    else {
      let _ = it(
        n,
        s,
        d,
        g,
        P,
        M ? [] : i,
        N
      ), H = await ot(
        d,
        _,
        N,
        null
      );
      if (E = H[P.route.id], !E) {
        for (let $ of g)
          if (H[$.route.id]) {
            E = H[$.route.id];
            break;
          }
      }
      if (d.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (qe(E)) {
      let _;
      return S && S.replace != null ? _ = S.replace : _ = Xa(
        E.response.headers.get("Location"),
        new URL(d.url),
        f,
        t.history
      ) === b.location.pathname + b.location.search, await Ue(d, E, !0, {
        submission: h,
        replace: _
      }), { shortCircuited: !0 };
    }
    if (me(E)) {
      let _ = Te(g, P.route.id);
      return (S && S.replace) !== !0 && (D = "PUSH"), {
        matches: g,
        pendingActionResult: [
          _.route.id,
          E,
          P.route.id
        ]
      };
    }
    return {
      matches: g,
      pendingActionResult: [P.route.id, E]
    };
  }
  async function ti(d, x, h, g, N, j, M, S, I, E, P, _, H) {
    let $ = j || ta(x, M), re = M || S || il($), ne = !Y && !E;
    if (N) {
      if (ne) {
        let ce = Ca(_);
        oe(
          {
            navigation: $,
            ...ce !== void 0 ? { actionData: ce } : {}
          },
          {
            flushSync: P
          }
        );
      }
      let z = await Et(
        h,
        x.pathname,
        d.signal
      );
      if (z.type === "aborted")
        return { shortCircuited: !0 };
      if (z.type === "error") {
        if (z.partialMatches.length === 0) {
          let { matches: tt, route: Ye } = Ot(c);
          return {
            matches: tt,
            loaderData: {},
            errors: {
              [Ye.id]: z.error
            }
          };
        }
        let ce = Te(z.partialMatches).route.id;
        return {
          matches: z.partialMatches,
          loaderData: {},
          errors: {
            [ce]: z.error
          }
        };
      } else if (z.matches)
        h = z.matches;
      else {
        let { error: ce, notFoundMatches: tt, route: Ye } = Kt(
          x.pathname
        );
        return {
          matches: tt,
          loaderData: {},
          errors: {
            [Ye.id]: ce
          }
        };
      }
    }
    let pe = p || c, { dsMatches: Z, revalidatingFetchers: Ne } = Za(
      d,
      g,
      n,
      s,
      t.history,
      b,
      h,
      re,
      x,
      E ? [] : i,
      E === !0,
      X,
      be,
      he,
      we,
      ue,
      pe,
      f,
      t.patchRoutesOnNavigation != null,
      _,
      H
    );
    if (xe = ++ie, !t.dataStrategy && !Z.some((z) => z.shouldLoad) && !Z.some(
      (z) => z.route.middleware && z.route.middleware.length > 0
    ) && Ne.length === 0) {
      let z = ja();
      return et(
        x,
        {
          matches: h,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: _ && me(_[1]) ? { [_[0]]: _[1].error } : null,
          ...al(_),
          ...z ? { fetchers: new Map(b.fetchers) } : {}
        },
        { flushSync: P }
      ), { shortCircuited: !0 };
    }
    if (ne) {
      let z = {};
      if (!N) {
        z.navigation = $;
        let ce = Ca(_);
        ce !== void 0 && (z.actionData = ce);
      }
      Ne.length > 0 && (z.fetchers = ai(Ne)), oe(z, { flushSync: P });
    }
    Ne.forEach((z) => {
      Be(z.key), z.controller && W.set(z.key, z.controller);
    });
    let We = () => Ne.forEach((z) => Be(z.key));
    K && K.signal.addEventListener(
      "abort",
      We
    );
    let { loaderResults: ct, fetcherResults: Ae } = await Ma(
      Z,
      Ne,
      d,
      g
    );
    if (d.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      We
    ), Ne.forEach((z) => W.delete(z.key));
    let Le = At(ct);
    if (Le)
      return await Ue(d, Le.result, !0, {
        replace: I
      }), { shortCircuited: !0 };
    if (Le = At(Ae), Le)
      return ue.add(Le.key), await Ue(d, Le.result, !0, {
        replace: I
      }), { shortCircuited: !0 };
    let { loaderData: qt, errors: dt } = el(
      b,
      h,
      ct,
      _,
      Ne,
      Ae
    );
    E && b.errors && (dt = { ...b.errors, ...dt });
    let Ze = ja(), Bt = Ia(xe), Pt = Ze || Bt || Ne.length > 0;
    return {
      matches: h,
      loaderData: qt,
      errors: dt,
      ...Pt ? { fetchers: new Map(b.fetchers) } : {}
    };
  }
  function Ca(d) {
    if (d && !me(d[1]))
      return {
        [d[0]]: d[1].data
      };
    if (b.actionData)
      return Object.keys(b.actionData).length === 0 ? null : b.actionData;
  }
  function ai(d) {
    return d.forEach((x) => {
      let h = b.fetchers.get(x.key), g = xt(
        void 0,
        h ? h.data : void 0
      );
      b.fetchers.set(x.key, g);
    }), new Map(b.fetchers);
  }
  async function li(d, x, h, g) {
    Be(d);
    let N = (g && g.flushSync) === !0, j = p || c, M = ia(
      b.location,
      b.matches,
      f,
      h,
      x,
      g?.relative
    ), S = ze(j, M, f), I = _t(S, j, M);
    if (I.active && I.matches && (S = I.matches), !S) {
      Ee(
        d,
        x,
        ke(404, { pathname: M }),
        { flushSync: N }
      );
      return;
    }
    let { path: E, submission: P, error: _ } = Wa(
      !0,
      M,
      g
    );
    if (_) {
      Ee(d, x, _, { flushSync: N });
      return;
    }
    let H = t.getContext ? await t.getContext() : new Ta(), $ = (g && g.preventScrollReset) === !0;
    if (P && de(P.formMethod)) {
      await ii(
        d,
        x,
        E,
        S,
        H,
        I.active,
        N,
        $,
        P,
        g && g.unstable_defaultShouldRevalidate
      );
      return;
    }
    we.set(d, { routeId: x, path: E }), await ni(
      d,
      x,
      E,
      S,
      H,
      I.active,
      N,
      $,
      P
    );
  }
  async function ii(d, x, h, g, N, j, M, S, I, E) {
    Zt(), we.delete(d);
    let P = b.fetchers.get(d);
    _e(d, Wn(I, P), {
      flushSync: M
    });
    let _ = new AbortController(), H = at(
      t.history,
      h,
      _.signal,
      I
    );
    if (j) {
      let ee = await Et(
        g,
        new URL(H.url).pathname,
        H.signal,
        d
      );
      if (ee.type === "aborted")
        return;
      if (ee.type === "error") {
        Ee(d, x, ee.error, { flushSync: M });
        return;
      } else if (ee.matches)
        g = ee.matches;
      else {
        Ee(
          d,
          x,
          ke(404, { pathname: h }),
          { flushSync: M }
        );
        return;
      }
    }
    let $ = Tt(g, h);
    if (!$.route.action && !$.route.lazy) {
      let ee = ke(405, {
        method: I.formMethod,
        pathname: h,
        routeId: x
      });
      Ee(d, x, ee, { flushSync: M });
      return;
    }
    W.set(d, _);
    let re = ie, ne = it(
      n,
      s,
      H,
      g,
      $,
      i,
      N
    ), pe = await ot(
      H,
      ne,
      N,
      d
    ), Z = pe[$.route.id];
    if (!Z) {
      for (let ee of ne)
        if (pe[ee.route.id]) {
          Z = pe[ee.route.id];
          break;
        }
    }
    if (H.signal.aborted) {
      W.get(d) === _ && W.delete(d);
      return;
    }
    if (he.has(d)) {
      if (qe(Z) || me(Z)) {
        _e(d, De(void 0));
        return;
      }
    } else {
      if (qe(Z))
        if (W.delete(d), xe > re) {
          _e(d, De(void 0));
          return;
        } else
          return ue.add(d), _e(d, xt(I)), Ue(H, Z, !1, {
            fetcherSubmission: I,
            preventScrollReset: S
          });
      if (me(Z)) {
        Ee(d, x, Z.error);
        return;
      }
    }
    let Ne = b.navigation.location || b.location, We = at(
      t.history,
      Ne,
      _.signal
    ), ct = p || c, Ae = b.navigation.state !== "idle" ? ze(ct, b.navigation.location, f) : b.matches;
    A(Ae, "Didn't find any matches after fetcher action");
    let Le = ++ie;
    Me.set(d, Le);
    let qt = xt(I, Z.data);
    b.fetchers.set(d, qt);
    let { dsMatches: dt, revalidatingFetchers: Ze } = Za(
      We,
      N,
      n,
      s,
      t.history,
      b,
      Ae,
      I,
      Ne,
      i,
      !1,
      X,
      be,
      he,
      we,
      ue,
      ct,
      f,
      t.patchRoutesOnNavigation != null,
      [$.route.id, Z],
      E
    );
    Ze.filter((ee) => ee.key !== d).forEach((ee) => {
      let Dt = ee.key, Fa = b.fetchers.get(Dt), xi = xt(
        void 0,
        Fa ? Fa.data : void 0
      );
      b.fetchers.set(Dt, xi), Be(Dt), ee.controller && W.set(Dt, ee.controller);
    }), oe({ fetchers: new Map(b.fetchers) });
    let Bt = () => Ze.forEach((ee) => Be(ee.key));
    _.signal.addEventListener(
      "abort",
      Bt
    );
    let { loaderResults: Pt, fetcherResults: z } = await Ma(
      dt,
      Ze,
      We,
      N
    );
    if (_.signal.aborted)
      return;
    if (_.signal.removeEventListener(
      "abort",
      Bt
    ), Me.delete(d), W.delete(d), Ze.forEach((ee) => W.delete(ee.key)), b.fetchers.has(d)) {
      let ee = De(Z.data);
      b.fetchers.set(d, ee);
    }
    let ce = At(Pt);
    if (ce)
      return Ue(
        We,
        ce.result,
        !1,
        { preventScrollReset: S }
      );
    if (ce = At(z), ce)
      return ue.add(ce.key), Ue(
        We,
        ce.result,
        !1,
        { preventScrollReset: S }
      );
    let { loaderData: tt, errors: Ye } = el(
      b,
      Ae,
      Pt,
      void 0,
      Ze,
      z
    );
    Ia(Le), b.navigation.state === "loading" && Le > xe ? (A(D, "Expected pending action"), K && K.abort(), et(b.navigation.location, {
      matches: Ae,
      loaderData: tt,
      errors: Ye,
      fetchers: new Map(b.fetchers)
    })) : (oe({
      errors: Ye,
      loaderData: tl(
        b.loaderData,
        tt,
        Ae,
        Ye
      ),
      fetchers: new Map(b.fetchers)
    }), X = !1);
  }
  async function ni(d, x, h, g, N, j, M, S, I) {
    let E = b.fetchers.get(d);
    _e(
      d,
      xt(
        I,
        E ? E.data : void 0
      ),
      { flushSync: M }
    );
    let P = new AbortController(), _ = at(
      t.history,
      h,
      P.signal
    );
    if (j) {
      let Z = await Et(
        g,
        new URL(_.url).pathname,
        _.signal,
        d
      );
      if (Z.type === "aborted")
        return;
      if (Z.type === "error") {
        Ee(d, x, Z.error, { flushSync: M });
        return;
      } else if (Z.matches)
        g = Z.matches;
      else {
        Ee(
          d,
          x,
          ke(404, { pathname: h }),
          { flushSync: M }
        );
        return;
      }
    }
    let H = Tt(g, h);
    W.set(d, P);
    let $ = ie, re = it(
      n,
      s,
      _,
      g,
      H,
      i,
      N
    ), pe = (await ot(
      _,
      re,
      N,
      d
    ))[H.route.id];
    if (W.get(d) === P && W.delete(d), !_.signal.aborted) {
      if (he.has(d)) {
        _e(d, De(void 0));
        return;
      }
      if (qe(pe))
        if (xe > $) {
          _e(d, De(void 0));
          return;
        } else {
          ue.add(d), await Ue(_, pe, !1, {
            preventScrollReset: S
          });
          return;
        }
      if (me(pe)) {
        Ee(d, x, pe.error);
        return;
      }
      _e(d, De(pe.data));
    }
  }
  async function Ue(d, x, h, {
    submission: g,
    fetcherSubmission: N,
    preventScrollReset: j,
    replace: M
  } = {}) {
    h || (V?.resolve(), V = null), x.response.headers.has("X-Remix-Revalidate") && (X = !0);
    let S = x.response.headers.get("Location");
    A(S, "Expected a Location header on the redirect Response"), S = Xa(
      S,
      new URL(d.url),
      f,
      t.history
    );
    let I = gt(b.location, S, {
      _isRedirect: !0
    });
    if (l) {
      let re = !1;
      if (x.response.headers.has("X-Remix-Reload-Document"))
        re = !0;
      else if (da(S)) {
        const ne = Nl(S, !0);
        re = // Hard reload if it's an absolute URL to a new origin
        ne.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        ye(ne.pathname, f) == null;
      }
      if (re) {
        M ? a.location.replace(S) : a.location.assign(S);
        return;
      }
    }
    K = null;
    let E = M === !0 || x.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: P, formAction: _, formEncType: H } = b.navigation;
    !g && !N && P && _ && H && (g = il(b.navigation));
    let $ = g || N;
    if (Nn.has(x.response.status) && $ && de($.formMethod))
      await Ve(E, I, {
        submission: {
          ...$,
          formAction: S
        },
        // Preserve these flags across redirects
        preventScrollReset: j || q,
        enableViewTransition: h ? le : void 0
      });
    else {
      let re = ta(
        I,
        g
      );
      await Ve(E, I, {
        overrideNavigation: re,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: N,
        // Preserve these flags across redirects
        preventScrollReset: j || q,
        enableViewTransition: h ? le : void 0
      });
    }
  }
  async function ot(d, x, h, g) {
    let N, j = {};
    try {
      N = await _n(
        v,
        d,
        x,
        g,
        h,
        !1
      );
    } catch (M) {
      return x.filter((S) => S.shouldLoad).forEach((S) => {
        j[S.route.id] = {
          type: "error",
          error: M
        };
      }), j;
    }
    if (d.signal.aborted)
      return j;
    if (!de(d.method))
      for (let M of x) {
        if (N[M.route.id]?.type === "error")
          break;
        !N.hasOwnProperty(M.route.id) && !b.loaderData.hasOwnProperty(M.route.id) && (!b.errors || !b.errors.hasOwnProperty(M.route.id)) && M.shouldCallHandler() && (N[M.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${M.route.id}`
          )
        });
      }
    for (let [M, S] of Object.entries(N))
      if (Hn(S)) {
        let I = S.result;
        j[M] = {
          type: "redirect",
          response: Dn(
            I,
            d,
            M,
            x,
            f
          )
        };
      } else
        j[M] = await Pn(S);
    return j;
  }
  async function Ma(d, x, h, g) {
    let N = ot(
      h,
      d,
      g,
      null
    ), j = Promise.all(
      x.map(async (I) => {
        if (I.matches && I.match && I.request && I.controller) {
          let P = (await ot(
            I.request,
            I.matches,
            g,
            I.key
          ))[I.match.route.id];
          return { [I.key]: P };
        } else
          return Promise.resolve({
            [I.key]: {
              type: "error",
              error: ke(404, {
                pathname: I.path
              })
            }
          });
      })
    ), M = await N, S = (await j).reduce(
      (I, E) => Object.assign(I, E),
      {}
    );
    return {
      loaderResults: M,
      fetcherResults: S
    };
  }
  function Zt() {
    X = !0, we.forEach((d, x) => {
      W.has(x) && be.add(x), Be(x);
    });
  }
  function _e(d, x, h = {}) {
    b.fetchers.set(d, x), oe(
      { fetchers: new Map(b.fetchers) },
      { flushSync: (h && h.flushSync) === !0 }
    );
  }
  function Ee(d, x, h, g = {}) {
    let N = Te(b.matches, x);
    Yt(d), oe(
      {
        errors: {
          [N.route.id]: h
        },
        fetchers: new Map(b.fetchers)
      },
      { flushSync: (g && g.flushSync) === !0 }
    );
  }
  function Sa(d) {
    return ge.set(d, (ge.get(d) || 0) + 1), he.has(d) && he.delete(d), b.fetchers.get(d) || kn;
  }
  function ri(d, x) {
    Be(d, x?.reason), _e(d, De(null));
  }
  function Yt(d) {
    let x = b.fetchers.get(d);
    W.has(d) && !(x && x.state === "loading" && Me.has(d)) && Be(d), we.delete(d), Me.delete(d), ue.delete(d), he.delete(d), be.delete(d), b.fetchers.delete(d);
  }
  function si(d) {
    let x = (ge.get(d) || 0) - 1;
    x <= 0 ? (ge.delete(d), he.add(d)) : ge.set(d, x), oe({ fetchers: new Map(b.fetchers) });
  }
  function Be(d, x) {
    let h = W.get(d);
    h && (h.abort(x), W.delete(d));
  }
  function La(d) {
    for (let x of d) {
      let h = Sa(x), g = De(h.data);
      b.fetchers.set(x, g);
    }
  }
  function ja() {
    let d = [], x = !1;
    for (let h of ue) {
      let g = b.fetchers.get(h);
      A(g, `Expected fetcher: ${h}`), g.state === "loading" && (ue.delete(h), d.push(h), x = !0);
    }
    return La(d), x;
  }
  function Ia(d) {
    let x = [];
    for (let [h, g] of Me)
      if (g < d) {
        let N = b.fetchers.get(h);
        A(N, `Expected fetcher: ${h}`), N.state === "loading" && (Be(h), Me.delete(h), x.push(h));
      }
    return La(x), x.length > 0;
  }
  function oi(d, x) {
    let h = b.blockers.get(d) || ft;
    return Ge.get(d) !== x && Ge.set(d, x), h;
  }
  function _a(d) {
    b.blockers.delete(d), Ge.delete(d);
  }
  function It(d, x) {
    let h = b.blockers.get(d) || ft;
    A(
      h.state === "unblocked" && x.state === "blocked" || h.state === "blocked" && x.state === "blocked" || h.state === "blocked" && x.state === "proceeding" || h.state === "blocked" && x.state === "unblocked" || h.state === "proceeding" && x.state === "unblocked",
      `Invalid blocker state transition: ${h.state} -> ${x.state}`
    );
    let g = new Map(b.blockers);
    g.set(d, x), oe({ blockers: g });
  }
  function Ea({
    currentLocation: d,
    nextLocation: x,
    historyAction: h
  }) {
    if (Ge.size === 0)
      return;
    Ge.size > 1 && te(!1, "A router only supports one blocker at a time");
    let g = Array.from(Ge.entries()), [N, j] = g[g.length - 1], M = b.blockers.get(N);
    if (!(M && M.state === "proceeding") && j({ currentLocation: d, nextLocation: x, historyAction: h }))
      return N;
  }
  function Kt(d) {
    let x = ke(404, { pathname: d }), h = p || c, { matches: g, route: N } = Ot(h);
    return { notFoundMatches: g, route: N, error: x };
  }
  function ci(d, x, h) {
    if (k = d, C = x, R = h || null, !L && b.navigation === ea) {
      L = !0;
      let g = Pa(b.location, b.matches);
      g != null && oe({ restoreScrollPosition: g });
    }
    return () => {
      k = null, C = null, R = null;
    };
  }
  function Ba(d, x) {
    return R && R(
      d,
      x.map((g) => Zi(g, b.loaderData))
    ) || d.key;
  }
  function di(d, x) {
    if (k && C) {
      let h = Ba(d, x);
      k[h] = C();
    }
  }
  function Pa(d, x) {
    if (k) {
      let h = Ba(d, x), g = k[h];
      if (typeof g == "number")
        return g;
    }
    return null;
  }
  function _t(d, x, h) {
    if (t.patchRoutesOnNavigation)
      if (d) {
        if (Object.keys(d[0].params).length > 0)
          return { active: !0, matches: vt(
            x,
            h,
            f,
            !0
          ) };
      } else
        return { active: !0, matches: vt(
          x,
          h,
          f,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Et(d, x, h, g) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: d };
    let N = d;
    for (; ; ) {
      let j = p == null, M = p || c, S = s;
      try {
        await t.patchRoutesOnNavigation({
          signal: h,
          path: x,
          matches: N,
          fetcherKey: g,
          patch: (P, _) => {
            h.aborted || Ya(
              P,
              _,
              M,
              S,
              n,
              !1
            );
          }
        });
      } catch (P) {
        return { type: "error", error: P, partialMatches: N };
      } finally {
        j && !h.aborted && (c = [...c]);
      }
      if (h.aborted)
        return { type: "aborted" };
      let I = ze(M, x, f), E = null;
      if (I) {
        if (Object.keys(I[0].params).length === 0)
          return { type: "success", matches: I };
        if (E = vt(
          M,
          x,
          f,
          !0
        ), !(E && N.length < E.length && Da(
          N,
          E.slice(0, N.length)
        )))
          return { type: "success", matches: I };
      }
      if (E || (E = vt(
        M,
        x,
        f,
        !0
      )), !E || Da(N, E))
        return { type: "success", matches: null };
      N = E;
    }
  }
  function Da(d, x) {
    return d.length === x.length && d.every((h, g) => h.route.id === x[g].route.id);
  }
  function pi(d) {
    s = {}, p = Nt(
      d,
      n,
      void 0,
      s
    );
  }
  function fi(d, x, h = !1) {
    let g = p == null;
    Ya(
      d,
      x,
      p || c,
      s,
      n,
      h
    ), g && (c = [...c], oe({}));
  }
  return Q = {
    get basename() {
      return f;
    },
    get future() {
      return u;
    },
    get state() {
      return b;
    },
    get routes() {
      return c;
    },
    get window() {
      return a;
    },
    initialize: ql,
    subscribe: Xl,
    enableScrollRestoration: ci,
    navigate: Ra,
    fetch: li,
    revalidate: Ql,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (d) => t.history.createHref(d),
    encodeLocation: (d) => t.history.encodeLocation(d),
    getFetcher: Sa,
    resetFetcher: ri,
    deleteFetcher: si,
    dispose: Jl,
    getBlocker: oi,
    deleteBlocker: _a,
    patchRoutes: fi,
    _internalFetchControllers: W,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: pi,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(d) {
      oe(d);
    }
  }, t.unstable_instrumentations && (Q = xn(
    Q,
    t.unstable_instrumentations.map((d) => d.router).filter(Boolean)
  )), Q;
}
function Cn(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function ia(t, a, l, i, r, n) {
  let s, c;
  if (r) {
    s = [];
    for (let f of a)
      if (s.push(f), f.route.id === r) {
        c = f;
        break;
      }
  } else
    s = a, c = a[a.length - 1];
  let p = fa(
    i || ".",
    pa(s),
    ye(t.pathname, l) || t.pathname,
    n === "path"
  );
  if (i == null && (p.search = t.search, p.hash = t.hash), (i == null || i === "" || i === ".") && c) {
    let f = ha(p.search);
    if (c.route.index && !f)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!c.route.index && f) {
      let v = new URLSearchParams(p.search), u = v.getAll("index");
      v.delete("index"), u.filter((m) => m).forEach((m) => v.append("index", m));
      let w = v.toString();
      p.search = w ? `?${w}` : "";
    }
  }
  return l !== "/" && (p.pathname = sn({ basename: l, pathname: p.pathname })), Ie(p);
}
function Wa(t, a, l) {
  if (!l || !Cn(l))
    return { path: a };
  if (l.formMethod && !Vn(l.formMethod))
    return {
      path: a,
      error: ke(405, { method: l.formMethod })
    };
  let i = () => ({
    path: a,
    error: ke(400, { type: "invalid-body" })
  }), n = (l.formMethod || "get").toUpperCase(), s = Al(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!de(n))
        return i();
      let u = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(l.body.entries()).reduce(
          (w, [m, k]) => `${w}${m}=${k}
`,
          ""
        )
      ) : String(l.body);
      return {
        path: a,
        submission: {
          formMethod: n,
          formAction: s,
          formEncType: l.formEncType,
          formData: void 0,
          json: void 0,
          text: u
        }
      };
    } else if (l.formEncType === "application/json") {
      if (!de(n))
        return i();
      try {
        let u = typeof l.body == "string" ? JSON.parse(l.body) : l.body;
        return {
          path: a,
          submission: {
            formMethod: n,
            formAction: s,
            formEncType: l.formEncType,
            formData: void 0,
            json: u,
            text: void 0
          }
        };
      } catch {
        return i();
      }
    }
  }
  A(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let c, p;
  if (l.formData)
    c = sa(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    c = sa(l.body), p = l.body;
  else if (l.body instanceof URLSearchParams)
    c = l.body, p = Qa(c);
  else if (l.body == null)
    c = new URLSearchParams(), p = new FormData();
  else
    try {
      c = new URLSearchParams(l.body), p = Qa(c);
    } catch {
      return i();
    }
  let f = {
    formMethod: n,
    formAction: s,
    formEncType: l && l.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (de(f.formMethod))
    return { path: a, submission: f };
  let v = $e(a);
  return t && v.search && ha(v.search) && c.append("index", ""), v.search = `?${c}`, { path: Ie(v), submission: f };
}
function Za(t, a, l, i, r, n, s, c, p, f, v, u, w, m, k, R, C, L, y, B, J) {
  let U = B ? me(B[1]) ? B[1].error : B[1].data : void 0, Q = r.createURL(n.location), b = r.createURL(p), D;
  if (v && n.errors) {
    let Y = Object.keys(n.errors)[0];
    D = s.findIndex((X) => X.route.id === Y);
  } else if (B && me(B[1])) {
    let Y = B[0];
    D = s.findIndex((X) => X.route.id === Y) - 1;
  }
  let V = B ? B[1].statusCode : void 0, q = V && V >= 400, K = {
    currentUrl: Q,
    currentParams: n.matches[0]?.params || {},
    nextUrl: b,
    nextParams: s[0].params,
    ...c,
    actionResult: U,
    actionStatus: V
  }, le = Ct(s), Ce = s.map((Y, X) => {
    let { route: be } = Y, W = null;
    if (D != null && X > D ? W = !1 : be.lazy ? W = !0 : xa(be) ? v ? W = na(
      be,
      n.loaderData,
      n.errors
    ) : Mn(n.loaderData, n.matches[X], Y) && (W = !0) : W = !1, W !== null)
      return ra(
        l,
        i,
        t,
        le,
        Y,
        f,
        a,
        W
      );
    let ie = !1;
    typeof J == "boolean" ? ie = J : q ? ie = !1 : (u || Q.pathname + Q.search === b.pathname + b.search || Q.search !== b.search || Sn(n.matches[X], Y)) && (ie = !0);
    let xe = {
      ...K,
      defaultShouldRevalidate: ie
    }, Me = bt(Y, xe);
    return ra(
      l,
      i,
      t,
      le,
      Y,
      f,
      a,
      Me,
      xe,
      J
    );
  }), ae = [];
  return k.forEach((Y, X) => {
    if (v || !s.some((ge) => ge.route.id === Y.routeId) || m.has(X))
      return;
    let be = n.fetchers.get(X), W = be && be.state !== "idle" && be.data === void 0, ie = ze(C, Y.path, L);
    if (!ie) {
      if (y && W)
        return;
      ae.push({
        key: X,
        routeId: Y.routeId,
        path: Y.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(X))
      return;
    let xe = Tt(ie, Y.path), Me = new AbortController(), ue = at(
      r,
      Y.path,
      Me.signal
    ), we = null;
    if (w.has(X))
      w.delete(X), we = it(
        l,
        i,
        ue,
        ie,
        xe,
        f,
        a
      );
    else if (W)
      u && (we = it(
        l,
        i,
        ue,
        ie,
        xe,
        f,
        a
      ));
    else {
      let ge;
      typeof J == "boolean" ? ge = J : q ? ge = !1 : ge = u;
      let he = {
        ...K,
        defaultShouldRevalidate: ge
      };
      bt(xe, he) && (we = it(
        l,
        i,
        ue,
        ie,
        xe,
        f,
        a,
        he
      ));
    }
    we && ae.push({
      key: X,
      routeId: Y.routeId,
      path: Y.path,
      matches: we,
      match: xe,
      request: ue,
      controller: Me
    });
  }), { dsMatches: Ce, revalidatingFetchers: ae };
}
function xa(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function na(t, a, l) {
  if (t.lazy)
    return !0;
  if (!xa(t))
    return !1;
  let i = a != null && t.id in a, r = l != null && l[t.id] !== void 0;
  return !i && r ? !1 : typeof t.loader == "function" && t.loader.hydrate === !0 ? !0 : !i && !r;
}
function Mn(t, a, l) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), r = !t.hasOwnProperty(l.route.id);
  return i || r;
}
function Sn(t, a) {
  let l = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function bt(t, a) {
  if (t.route.shouldRevalidate) {
    let l = t.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function Ya(t, a, l, i, r, n) {
  let s;
  if (t) {
    let f = i[t];
    A(
      f,
      `No route found to patch children into: routeId = ${t}`
    ), f.children || (f.children = []), s = f.children;
  } else
    s = l;
  let c = [], p = [];
  if (a.forEach((f) => {
    let v = s.find(
      (u) => Bl(f, u)
    );
    v ? p.push({ existingRoute: v, newRoute: f }) : c.push(f);
  }), c.length > 0) {
    let f = Nt(
      c,
      r,
      [t || "_", "patch", String(s?.length || "0")],
      i
    );
    s.push(...f);
  }
  if (n && p.length > 0)
    for (let f = 0; f < p.length; f++) {
      let { existingRoute: v, newRoute: u } = p[f], w = v, [m] = Nt(
        [u],
        r,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(w, {
        element: m.element ? m.element : w.element,
        errorElement: m.errorElement ? m.errorElement : w.errorElement,
        hydrateFallbackElement: m.hydrateFallbackElement ? m.hydrateFallbackElement : w.hydrateFallbackElement
      });
    }
}
function Bl(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children.every(
    (l, i) => a.children?.some((r) => Bl(l, r))
  ) : !1;
}
var Ka = /* @__PURE__ */ new WeakMap(), Pl = ({
  key: t,
  route: a,
  manifest: l,
  mapRouteProperties: i
}) => {
  let r = l[a.id];
  if (A(r, "No route found in manifest"), !r.lazy || typeof r.lazy != "object")
    return;
  let n = r.lazy[t];
  if (!n)
    return;
  let s = Ka.get(r);
  s || (s = {}, Ka.set(r, s));
  let c = s[t];
  if (c)
    return c;
  let p = (async () => {
    let f = Gi(t), u = r[t] !== void 0 && t !== "hasErrorBoundary";
    if (f)
      te(
        !f,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), s[t] = Promise.resolve();
    else if (u)
      te(
        !1,
        `Route "${r.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let w = await n();
      w != null && (Object.assign(r, { [t]: w }), Object.assign(r, i(r)));
    }
    typeof r.lazy == "object" && (r.lazy[t] = void 0, Object.values(r.lazy).every((w) => w === void 0) && (r.lazy = void 0));
  })();
  return s[t] = p, p;
}, qa = /* @__PURE__ */ new WeakMap();
function Ln(t, a, l, i, r) {
  let n = l[t.id];
  if (A(n, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let v = qa.get(n);
    if (v)
      return {
        lazyRoutePromise: v,
        lazyHandlerPromise: v
      };
    let u = (async () => {
      A(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), m = {};
      for (let k in w) {
        let R = w[k];
        if (R === void 0)
          continue;
        let C = Ui(k), y = n[k] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        k !== "hasErrorBoundary";
        C ? te(
          !C,
          "Route property " + k + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : y ? te(
          !y,
          `Route "${n.id}" has a static property "${k}" defined but its lazy function is also returning a value for this property. The lazy route property "${k}" will be ignored.`
        ) : m[k] = R;
      }
      Object.assign(n, m), Object.assign(n, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...i(n),
        lazy: void 0
      });
    })();
    return qa.set(n, u), u.catch(() => {
    }), {
      lazyRoutePromise: u,
      lazyHandlerPromise: u
    };
  }
  let s = Object.keys(t.lazy), c = [], p;
  for (let v of s) {
    if (r && r.includes(v))
      continue;
    let u = Pl({
      key: v,
      route: t,
      manifest: l,
      mapRouteProperties: i
    });
    u && (c.push(u), v === a && (p = u));
  }
  let f = c.length > 0 ? Promise.all(c).then(() => {
  }) : void 0;
  return f?.catch(() => {
  }), p?.catch(() => {
  }), {
    lazyRoutePromise: f,
    lazyHandlerPromise: p
  };
}
async function Ja(t) {
  let a = t.matches.filter((r) => r.shouldLoad), l = {};
  return (await Promise.all(a.map((r) => r.resolve()))).forEach((r, n) => {
    l[a[n].route.id] = r;
  }), l;
}
async function jn(t) {
  return t.matches.some((a) => a.route.middleware) ? Dl(t, () => Ja(t)) : Ja(t);
}
function Dl(t, a) {
  return In(
    t,
    a,
    (i) => {
      if (Gn(i))
        throw i;
      return i;
    },
    zn,
    l
  );
  function l(i, r, n) {
    if (n)
      return Promise.resolve(
        Object.assign(n.value, {
          [r]: { type: "error", result: i }
        })
      );
    {
      let { matches: s } = t, c = Math.min(
        // Throwing route
        Math.max(
          s.findIndex((f) => f.route.id === r),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          s.findIndex((f) => f.shouldCallHandler()),
          0
        )
      ), p = Te(
        s,
        s[c].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: i }
      });
    }
  }
}
async function In(t, a, l, i, r) {
  let { matches: n, request: s, params: c, context: p, unstable_pattern: f } = t, v = n.flatMap(
    (w) => w.route.middleware ? w.route.middleware.map((m) => [w.route.id, m]) : []
  );
  return await Fl(
    {
      request: s,
      params: c,
      context: p,
      unstable_pattern: f
    },
    v,
    a,
    l,
    i,
    r
  );
}
async function Fl(t, a, l, i, r, n, s = 0) {
  let { request: c } = t;
  if (c.signal.aborted)
    throw c.signal.reason ?? new Error(`Request aborted: ${c.method} ${c.url}`);
  let p = a[s];
  if (!p)
    return await l();
  let [f, v] = p, u, w = async () => {
    if (u)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return u = { value: await Fl(
        t,
        a,
        l,
        i,
        r,
        n,
        s + 1
      ) }, u.value;
    } catch (m) {
      return u = { value: await n(m, f, u) }, u.value;
    }
  };
  try {
    let m = await v(t, w), k = m != null ? i(m) : void 0;
    return r(k) ? k : u ? k ?? u.value : (u = { value: await w() }, u.value);
  } catch (m) {
    return await n(m, f, u);
  }
}
function Ol(t, a, l, i, r) {
  let n = Pl({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), s = Ln(
    i.route,
    de(l.method) ? "action" : "loader",
    a,
    t,
    r
  );
  return {
    middleware: n,
    route: s.lazyRoutePromise,
    handler: s.lazyHandlerPromise
  };
}
function ra(t, a, l, i, r, n, s, c, p = null, f) {
  let v = !1, u = Ol(
    t,
    a,
    l,
    r,
    n
  );
  return {
    ...r,
    _lazyPromises: u,
    shouldLoad: c,
    shouldRevalidateArgs: p,
    shouldCallHandler(w) {
      return v = !0, p ? typeof f == "boolean" ? bt(r, {
        ...p,
        defaultShouldRevalidate: f
      }) : typeof w == "boolean" ? bt(r, {
        ...p,
        defaultShouldRevalidate: w
      }) : bt(r, p) : c;
    },
    resolve(w) {
      let { lazy: m, loader: k, middleware: R } = r.route, C = v || c || w && !de(l.method) && (m || k), L = R && R.length > 0 && !k && !m;
      return C && (de(l.method) || !L) ? En({
        request: l,
        unstable_pattern: i,
        match: r,
        lazyHandlerPromise: u?.handler,
        lazyRoutePromise: u?.route,
        handlerOverride: w,
        scopedContext: s
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function it(t, a, l, i, r, n, s, c = null) {
  return i.map((p) => p.route.id !== r.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: c,
    shouldCallHandler: () => !1,
    _lazyPromises: Ol(
      t,
      a,
      l,
      p,
      n
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : ra(
    t,
    a,
    l,
    Ct(i),
    p,
    n,
    s,
    !0,
    c
  ));
}
async function _n(t, a, l, i, r, n) {
  l.some((f) => f._lazyPromises?.middleware) && await Promise.all(l.map((f) => f._lazyPromises?.middleware));
  let s = {
    request: a,
    unstable_pattern: Ct(l),
    params: l[0].params,
    context: r,
    matches: l
  }, p = await t({
    ...s,
    fetcherKey: i,
    runClientMiddleware: (f) => {
      let v = s;
      return Dl(v, () => f({
        ...v,
        fetcherKey: i,
        runClientMiddleware: () => {
          throw new Error(
            "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
          );
        }
      }));
    }
  });
  try {
    await Promise.all(
      l.flatMap((f) => [
        f._lazyPromises?.handler,
        f._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function En({
  request: t,
  unstable_pattern: a,
  match: l,
  lazyHandlerPromise: i,
  lazyRoutePromise: r,
  handlerOverride: n,
  scopedContext: s
}) {
  let c, p, f = de(t.method), v = f ? "action" : "loader", u = (w) => {
    let m, k = new Promise((L, y) => m = y);
    p = () => m(), t.signal.addEventListener("abort", p);
    let R = (L) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${l.route.id}]`
      )
    ) : w(
      {
        request: t,
        unstable_pattern: a,
        params: l.params,
        context: s
      },
      ...L !== void 0 ? [L] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (n ? n((y) => R(y)) : R()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([C, k]);
  };
  try {
    let w = f ? l.route.action : l.route.loader;
    if (i || r)
      if (w) {
        let m, [k] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          u(w).catch((R) => {
            m = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          i,
          r
        ]);
        if (m !== void 0)
          throw m;
        c = k;
      } else {
        await i;
        let m = f ? l.route.action : l.route.loader;
        if (m)
          [c] = await Promise.all([u(m), r]);
        else if (v === "action") {
          let k = new URL(t.url), R = k.pathname + k.search;
          throw ke(405, {
            method: t.method,
            pathname: R,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      c = await u(w);
    else {
      let m = new URL(t.url), k = m.pathname + m.search;
      throw ke(404, {
        pathname: k
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return c;
}
async function Bn(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function Pn(t) {
  let { result: a, type: l } = t;
  if (ua(a)) {
    let i;
    try {
      i = await Bn(a);
    } catch (r) {
      return { type: "error", error: r };
    }
    return l === "error" ? {
      type: "error",
      error: new Rt(a.status, a.statusText, i),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: i,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return l === "error" ? ll(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: An(a),
    statusCode: kt(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: kt(a) ? a.status : void 0
  } : ll(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Dn(t, a, l, i, r) {
  let n = t.headers.get("Location");
  if (A(
    n,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !da(n)) {
    let s = i.slice(
      0,
      i.findIndex((c) => c.route.id === l) + 1
    );
    n = ia(
      new URL(a.url),
      s,
      r,
      n
    ), t.headers.set("Location", n);
  }
  return t;
}
function Xa(t, a, l, i) {
  let r = [
    "about:",
    "blob:",
    "chrome:",
    "chrome-untrusted:",
    "content:",
    "data:",
    "devtools:",
    "file:",
    "filesystem:",
    // eslint-disable-next-line no-script-url
    "javascript:"
  ];
  if (da(t)) {
    let n = t, s = n.startsWith("//") ? new URL(a.protocol + n) : new URL(n);
    if (r.includes(s.protocol))
      throw new Error("Invalid redirect location");
    let c = ye(s.pathname, l) != null;
    if (s.origin === a.origin && c)
      return s.pathname + s.search + s.hash;
  }
  try {
    let n = i.createURL(t);
    if (r.includes(n.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function at(t, a, l, i) {
  let r = t.createURL(Al(a)).toString(), n = { signal: l };
  if (i && de(i.formMethod)) {
    let { formMethod: s, formEncType: c } = i;
    n.method = s.toUpperCase(), c === "application/json" ? (n.headers = new Headers({ "Content-Type": c }), n.body = JSON.stringify(i.json)) : c === "text/plain" ? n.body = i.text : c === "application/x-www-form-urlencoded" && i.formData ? n.body = sa(i.formData) : n.body = i.formData;
  }
  return new Request(r, n);
}
function sa(t) {
  let a = new URLSearchParams();
  for (let [l, i] of t.entries())
    a.append(l, typeof i == "string" ? i : i.name);
  return a;
}
function Qa(t) {
  let a = new FormData();
  for (let [l, i] of t.entries())
    a.append(l, i);
  return a;
}
function Fn(t, a, l, i = !1, r = !1) {
  let n = {}, s = null, c, p = !1, f = {}, v = l && me(l[1]) ? l[1].error : void 0;
  return t.forEach((u) => {
    if (!(u.route.id in a))
      return;
    let w = u.route.id, m = a[w];
    if (A(
      !qe(m),
      "Cannot handle redirect results in processLoaderData"
    ), me(m)) {
      let k = m.error;
      if (v !== void 0 && (k = v, v = void 0), s = s || {}, r)
        s[w] = k;
      else {
        let R = Te(t, w);
        s[R.route.id] == null && (s[R.route.id] = k);
      }
      i || (n[w] = El), p || (p = !0, c = kt(m.error) ? m.error.status : 500), m.headers && (f[w] = m.headers);
    } else
      n[w] = m.data, m.statusCode && m.statusCode !== 200 && !p && (c = m.statusCode), m.headers && (f[w] = m.headers);
  }), v !== void 0 && l && (s = { [l[0]]: v }, l[2] && (n[l[2]] = void 0)), {
    loaderData: n,
    errors: s,
    statusCode: c || 200,
    loaderHeaders: f
  };
}
function el(t, a, l, i, r, n) {
  let { loaderData: s, errors: c } = Fn(
    a,
    l,
    i
  );
  return r.filter((p) => !p.matches || p.matches.some((f) => f.shouldLoad)).forEach((p) => {
    let { key: f, match: v, controller: u } = p;
    if (u && u.signal.aborted)
      return;
    let w = n[f];
    if (A(w, "Did not find corresponding fetcher result"), me(w)) {
      let m = Te(t.matches, v?.route.id);
      c && c[m.route.id] || (c = {
        ...c,
        [m.route.id]: w.error
      }), t.fetchers.delete(f);
    } else if (qe(w))
      A(!1, "Unhandled fetcher revalidation redirect");
    else {
      let m = De(w.data);
      t.fetchers.set(f, m);
    }
  }), { loaderData: s, errors: c };
}
function tl(t, a, l, i) {
  let r = Object.entries(a).filter(([, n]) => n !== El).reduce((n, [s, c]) => (n[s] = c, n), {});
  for (let n of l) {
    let s = n.route.id;
    if (!a.hasOwnProperty(s) && t.hasOwnProperty(s) && n.route.loader && (r[s] = t[s]), i && i.hasOwnProperty(s))
      break;
  }
  return r;
}
function al(t) {
  return t ? me(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function Te(t, a) {
  return (a ? t.slice(0, t.findIndex((i) => i.route.id === a) + 1) : [...t]).reverse().find((i) => i.route.hasErrorBoundary === !0) || t[0];
}
function Ot(t) {
  let a = t.length === 1 ? t[0] : t.find((l) => l.index || !l.path || l.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route: a
      }
    ],
    route: a
  };
}
function ke(t, {
  pathname: a,
  routeId: l,
  method: i,
  type: r,
  message: n
} = {}) {
  let s = "Unknown Server Error", c = "Unknown @remix-run/router error";
  return t === 400 ? (s = "Bad Request", i && a && l ? c = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.` : r === "invalid-body" && (c = "Unable to encode submission body")) : t === 403 ? (s = "Forbidden", c = `Route "${l}" does not match URL "${a}"`) : t === 404 ? (s = "Not Found", c = `No route matches URL "${a}"`) : t === 405 && (s = "Method Not Allowed", i && a && l ? c = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.` : i && (c = `Invalid request method "${i.toUpperCase()}"`)), new Rt(
    t || 500,
    s,
    new Error(c),
    !0
  );
}
function At(t) {
  let a = Object.entries(t);
  for (let l = a.length - 1; l >= 0; l--) {
    let [i, r] = a[l];
    if (qe(r))
      return { key: i, result: r };
  }
}
function Al(t) {
  let a = typeof t == "string" ? $e(t) : t;
  return Ie({ ...a, hash: "" });
}
function On(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function An(t) {
  return new Rt(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function zn(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, l]) => typeof a == "string" && Tn(l)
  );
}
function Tn(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function Hn(t) {
  return ua(t.result) && Il.has(t.result.status);
}
function me(t) {
  return t.type === "error";
}
function qe(t) {
  return (t && t.type) === "redirect";
}
function ll(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function ua(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function $n(t) {
  return Il.has(t);
}
function Gn(t) {
  return ua(t) && $n(t.status) && t.headers.has("Location");
}
function Vn(t) {
  return gn.has(t.toUpperCase());
}
function de(t) {
  return bn.has(t.toUpperCase());
}
function ha(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Tt(t, a) {
  let l = typeof a == "string" ? $e(a).search : a.search;
  if (t[t.length - 1].route.index && ha(l || ""))
    return t[t.length - 1];
  let i = Cl(t);
  return i[i.length - 1];
}
function il(t) {
  let { formMethod: a, formAction: l, formEncType: i, text: r, formData: n, json: s } = t;
  if (!(!a || !l || !i)) {
    if (r != null)
      return {
        formMethod: a,
        formAction: l,
        formEncType: i,
        formData: void 0,
        json: void 0,
        text: r
      };
    if (n != null)
      return {
        formMethod: a,
        formAction: l,
        formEncType: i,
        formData: n,
        json: void 0,
        text: void 0
      };
    if (s !== void 0)
      return {
        formMethod: a,
        formAction: l,
        formEncType: i,
        formData: void 0,
        json: s,
        text: void 0
      };
  }
}
function ta(t, a) {
  return a ? {
    state: "loading",
    location: t,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  } : {
    state: "loading",
    location: t,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function Un(t, a) {
  return {
    state: "submitting",
    location: t,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  };
}
function xt(t, a) {
  return t ? {
    state: "loading",
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
    data: a
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: a
  };
}
function Wn(t, a) {
  return {
    state: "submitting",
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
    data: a ? a.data : void 0
  };
}
function De(t) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: t
  };
}
function Zn(t, a) {
  try {
    let l = t.sessionStorage.getItem(
      _l
    );
    if (l) {
      let i = JSON.parse(l);
      for (let [r, n] of Object.entries(i || {}))
        n && Array.isArray(n) && a.set(r, new Set(n || []));
    }
  } catch {
  }
}
function Yn(t, a) {
  if (a.size > 0) {
    let l = {};
    for (let [i, r] of a)
      l[i] = [...r];
    try {
      t.sessionStorage.setItem(
        _l,
        JSON.stringify(l)
      );
    } catch (i) {
      te(
        !1,
        `Failed to save applied view transitions in sessionStorage (${i}).`
      );
    }
  }
}
function nl() {
  let t, a, l = new Promise((i, r) => {
    t = async (n) => {
      i(n);
      try {
        await l;
      } catch {
      }
    }, a = async (n) => {
      r(n);
      try {
        await l;
      } catch {
      }
    };
  });
  return {
    promise: l,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var Je = ve(null);
Je.displayName = "DataRouter";
var Mt = ve(null);
Mt.displayName = "DataRouterState";
var zl = ve(!1);
function Kn() {
  return G(zl);
}
var ma = ve({
  isTransitioning: !1
});
ma.displayName = "ViewTransition";
var Tl = ve(
  /* @__PURE__ */ new Map()
);
Tl.displayName = "Fetchers";
var qn = ve(null);
qn.displayName = "Await";
var Re = ve(
  null
);
Re.displayName = "Navigation";
var Ut = ve(
  null
);
Ut.displayName = "Location";
var Oe = ve({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Oe.displayName = "Route";
var va = ve(null);
va.displayName = "RouteError";
var Hl = "REACT_ROUTER_ERROR", Jn = "REDIRECT", Xn = "ROUTE_ERROR_RESPONSE";
function Qn(t) {
  if (t.startsWith(`${Hl}:${Jn}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function er(t) {
  if (t.startsWith(
    `${Hl}:${Xn}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Rt(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function tr(t, { relative: a } = {}) {
  A(
    St(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: i } = G(Re), { hash: r, pathname: n, search: s } = Lt(t, { relative: a }), c = n;
  return l !== "/" && (c = n === "/" ? l : je([l, n])), i.createHref({ pathname: c, search: s, hash: r });
}
function St() {
  return G(Ut) != null;
}
function Xe() {
  return A(
    St(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), G(Ut).location;
}
var $l = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Gl(t) {
  G(Re).static || ca(t);
}
function ar() {
  let { isDataRoute: t } = G(Oe);
  return t ? hr() : lr();
}
function lr() {
  A(
    St(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = G(Je), { basename: a, navigator: l } = G(Re), { matches: i } = G(Oe), { pathname: r } = Xe(), n = JSON.stringify(pa(i)), s = yt(!1);
  return Gl(() => {
    s.current = !0;
  }), rt(
    (p, f = {}) => {
      if (te(s.current, $l), !s.current) return;
      if (typeof p == "number") {
        l.go(p);
        return;
      }
      let v = fa(
        p,
        JSON.parse(n),
        r,
        f.relative === "path"
      );
      t == null && a !== "/" && (v.pathname = v.pathname === "/" ? a : je([a, v.pathname])), (f.replace ? l.replace : l.push)(
        v,
        f.state,
        f
      );
    },
    [
      a,
      l,
      n,
      r,
      t
    ]
  );
}
ve(null);
function Lt(t, { relative: a } = {}) {
  let { matches: l } = G(Oe), { pathname: i } = Xe(), r = JSON.stringify(pa(l));
  return Se(
    () => fa(
      t,
      JSON.parse(r),
      i,
      a === "path"
    ),
    [t, r, i, a]
  );
}
function ir(t, a, l, i, r) {
  A(
    St(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: n } = G(Re), { matches: s } = G(Oe), c = s[s.length - 1], p = c ? c.params : {}, f = c ? c.pathname : "/", v = c ? c.pathnameBase : "/", u = c && c.route;
  {
    let y = u && u.path || "";
    Ul(
      f,
      !u || y.endsWith("*") || y.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y === "/" ? "*" : `${y}/*`}">.`
    );
  }
  let w = Xe(), m;
  m = w;
  let k = m.pathname || "/", R = k;
  if (v !== "/") {
    let y = v.replace(/^\//, "").split("/");
    R = "/" + k.replace(/^\//, "").split("/").slice(y.length).join("/");
  }
  let C = ze(t, { pathname: R });
  return te(
    u || C != null,
    `No routes matched location "${m.pathname}${m.search}${m.hash}" `
  ), te(
    C == null || C[C.length - 1].route.element !== void 0 || C[C.length - 1].route.Component !== void 0 || C[C.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), cr(
    C && C.map(
      (y) => Object.assign({}, y, {
        params: Object.assign({}, p, y.params),
        pathname: je([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          n.encodeLocation ? n.encodeLocation(
            y.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : y.pathname
        ]),
        pathnameBase: y.pathnameBase === "/" ? v : je([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          n.encodeLocation ? n.encodeLocation(
            y.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : y.pathnameBase
        ])
      })
    ),
    s,
    l,
    i,
    r
  );
}
function nr() {
  let t = ur(), a = kt(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), l = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", r = { padding: "0.5rem", backgroundColor: i }, n = { padding: "2px 4px", backgroundColor: i }, s = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), s = /* @__PURE__ */ F(nt, null, /* @__PURE__ */ F("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ F("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ F("code", { style: n }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ F("code", { style: n }, "errorElement"), " prop on your route.")), /* @__PURE__ */ F(nt, null, /* @__PURE__ */ F("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ F("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ F("pre", { style: r }, l) : null, s);
}
var rr = /* @__PURE__ */ F(nr, null), Vl = class extends bl {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, a) {
    return a.location !== t.location || a.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : a.error,
      location: a.location,
      revalidation: t.revalidation || a.revalidation
    };
  }
  componentDidCatch(t, a) {
    this.props.onError ? this.props.onError(t, a) : console.error(
      "React Router caught the following error during render",
      t
    );
  }
  render() {
    let t = this.state.error;
    if (this.context && typeof t == "object" && t && "digest" in t && typeof t.digest == "string") {
      const l = er(t.digest);
      l && (t = l);
    }
    let a = t !== void 0 ? /* @__PURE__ */ F(Oe.Provider, { value: this.props.routeContext }, /* @__PURE__ */ F(
      va.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ F(sr, { error: t }, a) : a;
  }
};
Vl.contextType = zl;
var aa = /* @__PURE__ */ new WeakMap();
function sr({
  children: t,
  error: a
}) {
  let { basename: l } = G(Re);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = Qn(a.digest);
    if (i) {
      let r = aa.get(a);
      if (r) throw r;
      let n = Sl(i.location, l);
      if (Ml && !aa.get(a))
        if (n.isExternal || i.reloadDocument)
          window.location.href = n.absoluteURL || n.to;
        else {
          const s = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(n.to, {
              replace: i.replace
            })
          );
          throw aa.set(a, s), s;
        }
      return /* @__PURE__ */ F(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${n.absoluteURL || n.to}`
        }
      );
    }
  }
  return t;
}
function or({ routeContext: t, match: a, children: l }) {
  let i = G(Je);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ F(Oe.Provider, { value: t }, l);
}
function cr(t, a = [], l = null, i = null, r = null) {
  if (t == null) {
    if (!l)
      return null;
    if (l.errors)
      t = l.matches;
    else if (a.length === 0 && !l.initialized && l.matches.length > 0)
      t = l.matches;
    else
      return null;
  }
  let n = t, s = l?.errors;
  if (s != null) {
    let v = n.findIndex(
      (u) => u.route.id && s?.[u.route.id] !== void 0
    );
    A(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        s
      ).join(",")}`
    ), n = n.slice(
      0,
      Math.min(n.length, v + 1)
    );
  }
  let c = !1, p = -1;
  if (l)
    for (let v = 0; v < n.length; v++) {
      let u = n[v];
      if ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (p = v), u.route.id) {
        let { loaderData: w, errors: m } = l, k = u.route.loader && !w.hasOwnProperty(u.route.id) && (!m || m[u.route.id] === void 0);
        if (u.route.lazy || k) {
          c = !0, p >= 0 ? n = n.slice(0, p + 1) : n = [n[0]];
          break;
        }
      }
    }
  let f = l && i ? (v, u) => {
    i(v, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      unstable_pattern: Ct(l.matches),
      errorInfo: u
    });
  } : void 0;
  return n.reduceRight(
    (v, u, w) => {
      let m, k = !1, R = null, C = null;
      l && (m = s && u.route.id ? s[u.route.id] : void 0, R = u.route.errorElement || rr, c && (p < 0 && w === 0 ? (Ul(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), k = !0, C = null) : p === w && (k = !0, C = u.route.hydrateFallbackElement || null)));
      let L = a.concat(n.slice(0, w + 1)), y = () => {
        let B;
        return m ? B = R : k ? B = C : u.route.Component ? B = /* @__PURE__ */ F(u.route.Component, null) : u.route.element ? B = u.route.element : B = v, /* @__PURE__ */ F(
          or,
          {
            match: u,
            routeContext: {
              outlet: v,
              matches: L,
              isDataRoute: l != null
            },
            children: B
          }
        );
      };
      return l && (u.route.ErrorBoundary || u.route.errorElement || w === 0) ? /* @__PURE__ */ F(
        Vl,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: R,
          error: m,
          children: y(),
          routeContext: { outlet: null, matches: L, isDataRoute: !0 },
          onError: f
        }
      ) : y();
    },
    null
  );
}
function ba(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function dr(t) {
  let a = G(Je);
  return A(a, ba(t)), a;
}
function pr(t) {
  let a = G(Mt);
  return A(a, ba(t)), a;
}
function fr(t) {
  let a = G(Oe);
  return A(a, ba(t)), a;
}
function wa(t) {
  let a = fr(t), l = a.matches[a.matches.length - 1];
  return A(
    l.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function xr() {
  return wa(
    "useRouteId"
    /* UseRouteId */
  );
}
function ur() {
  let t = G(va), a = pr(
    "useRouteError"
    /* UseRouteError */
  ), l = wa(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[l];
}
function hr() {
  let { router: t } = dr(
    "useNavigate"
    /* UseNavigateStable */
  ), a = wa(
    "useNavigate"
    /* UseNavigateStable */
  ), l = yt(!1);
  return Gl(() => {
    l.current = !0;
  }), rt(
    async (r, n = {}) => {
      te(l.current, $l), l.current && (typeof r == "number" ? await t.navigate(r) : await t.navigate(r, { fromRouteId: a, ...n }));
    },
    [t, a]
  );
}
var rl = {};
function Ul(t, a, l) {
  !a && !rl[t] && (rl[t] = !0, te(!1, l));
}
var sl = {};
function ol(t, a) {
  !t && !sl[a] && (sl[a] = !0, console.warn(a));
}
var mr = "useOptimistic", cl = Fi[mr], vr = () => {
};
function br(t) {
  return cl ? cl(t) : [t, vr];
}
function wr(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && te(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: F(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && te(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: F(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && te(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: F(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var gr = [
  "HydrateFallback",
  "hydrateFallbackElement"
], Nr = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (l) => {
        this.status === "pending" && (this.status = "resolved", t(l));
      }, this.reject = (l) => {
        this.status === "pending" && (this.status = "rejected", a(l));
      };
    });
  }
};
function kr({
  router: t,
  flushSync: a,
  onError: l,
  unstable_useTransitions: i
}) {
  i = Kn() || i;
  let [n, s] = se(t.state), [c, p] = br(n), [f, v] = se(), [u, w] = se({
    isTransitioning: !1
  }), [m, k] = se(), [R, C] = se(), [L, y] = se(), B = yt(/* @__PURE__ */ new Map()), J = rt(
    (D, { deletedFetchers: V, newErrors: q, flushSync: K, viewTransitionOpts: le }) => {
      q && l && Object.values(q).forEach(
        (ae) => l(ae, {
          location: D.location,
          params: D.matches[0]?.params ?? {},
          unstable_pattern: Ct(D.matches)
        })
      ), D.fetchers.forEach((ae, Y) => {
        ae.data !== void 0 && B.current.set(Y, ae.data);
      }), V.forEach((ae) => B.current.delete(ae)), ol(
        K === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let Ce = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (ol(
        le == null || Ce,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !le || !Ce) {
        a && K ? a(() => s(D)) : i === !1 ? s(D) : wt(() => {
          i === !0 && p((ae) => dl(ae, D)), s(D);
        });
        return;
      }
      if (a && K) {
        a(() => {
          R && (m?.resolve(), R.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: le.currentLocation,
            nextLocation: le.nextLocation
          });
        });
        let ae = t.window.document.startViewTransition(() => {
          a(() => s(D));
        });
        ae.finished.finally(() => {
          a(() => {
            k(void 0), C(void 0), v(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => C(ae));
        return;
      }
      R ? (m?.resolve(), R.skipTransition(), y({
        state: D,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      })) : (v(D), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: le.currentLocation,
        nextLocation: le.nextLocation
      }));
    },
    [
      t.window,
      a,
      R,
      m,
      i,
      p,
      l
    ]
  );
  ca(() => t.subscribe(J), [t, J]), Fe(() => {
    u.isTransitioning && !u.flushSync && k(new Nr());
  }, [u]), Fe(() => {
    if (m && f && t.window) {
      let D = f, V = m.promise, q = t.window.document.startViewTransition(async () => {
        i === !1 ? s(D) : wt(() => {
          i === !0 && p((K) => dl(K, D)), s(D);
        }), await V;
      });
      q.finished.finally(() => {
        k(void 0), C(void 0), v(void 0), w({ isTransitioning: !1 });
      }), C(q);
    }
  }, [
    f,
    m,
    t.window,
    i,
    p
  ]), Fe(() => {
    m && f && c.location.key === f.location.key && m.resolve();
  }, [m, R, c.location, f]), Fe(() => {
    !u.isTransitioning && L && (v(L.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: L.currentLocation,
      nextLocation: L.nextLocation
    }), y(void 0));
  }, [u.isTransitioning, L]);
  let U = Se(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (D) => t.navigate(D),
    push: (D, V, q) => t.navigate(D, {
      state: V,
      preventScrollReset: q?.preventScrollReset
    }),
    replace: (D, V, q) => t.navigate(D, {
      replace: !0,
      state: V,
      preventScrollReset: q?.preventScrollReset
    })
  }), [t]), Q = t.basename || "/", b = Se(
    () => ({
      router: t,
      navigator: U,
      static: !1,
      basename: Q,
      onError: l
    }),
    [t, U, Q, l]
  );
  return /* @__PURE__ */ F(nt, null, /* @__PURE__ */ F(Je.Provider, { value: b }, /* @__PURE__ */ F(Mt.Provider, { value: c }, /* @__PURE__ */ F(Tl.Provider, { value: B.current }, /* @__PURE__ */ F(ma.Provider, { value: u }, /* @__PURE__ */ F(
    Cr,
    {
      basename: Q,
      location: c.location,
      navigationType: c.historyAction,
      navigator: U,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ F(
      yr,
      {
        routes: t.routes,
        future: t.future,
        state: c,
        onError: l
      }
    )
  ))))), null);
}
function dl(t, a) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...t,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: a.navigation.state !== "idle" ? a.navigation : t.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : t.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : t.actionData,
    fetchers: a.fetchers
  };
}
var yr = wl(Rr);
function Rr({
  routes: t,
  future: a,
  state: l,
  onError: i
}) {
  return ir(t, void 0, l, i, a);
}
function Cr({
  basename: t = "/",
  children: a = null,
  location: l,
  navigationType: i = "POP",
  navigator: r,
  static: n = !1,
  unstable_useTransitions: s
}) {
  A(
    !St(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let c = t.replace(/^\/*/, "/"), p = Se(
    () => ({
      basename: c,
      navigator: r,
      static: n,
      unstable_useTransitions: s,
      future: {}
    }),
    [c, r, n, s]
  );
  typeof l == "string" && (l = $e(l));
  let {
    pathname: f = "/",
    search: v = "",
    hash: u = "",
    state: w = null,
    key: m = "default"
  } = l, k = Se(() => {
    let R = ye(f, c);
    return R == null ? null : {
      location: {
        pathname: R,
        search: v,
        hash: u,
        state: w,
        key: m
      },
      navigationType: i
    };
  }, [c, f, v, u, w, m, i]);
  return te(
    k != null,
    `<Router basename="${c}"> is not able to match the URL "${f}${v}${u}" because it does not start with the basename, so the <Router> won't render anything.`
  ), k == null ? null : /* @__PURE__ */ F(Re.Provider, { value: p }, /* @__PURE__ */ F(Ut.Provider, { children: a, value: k }));
}
var Ht = "get", $t = "application/x-www-form-urlencoded";
function Wt(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function Mr(t) {
  return Wt(t) && t.tagName.toLowerCase() === "button";
}
function Sr(t) {
  return Wt(t) && t.tagName.toLowerCase() === "form";
}
function Lr(t) {
  return Wt(t) && t.tagName.toLowerCase() === "input";
}
function jr(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function Ir(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !jr(t);
}
var zt = null;
function _r() {
  if (zt === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), zt = !1;
    } catch {
      zt = !0;
    }
  return zt;
}
var Er = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function la(t) {
  return t != null && !Er.has(t) ? (te(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$t}"`
  ), null) : t;
}
function Br(t, a) {
  let l, i, r, n, s;
  if (Sr(t)) {
    let c = t.getAttribute("action");
    i = c ? ye(c, a) : null, l = t.getAttribute("method") || Ht, r = la(t.getAttribute("enctype")) || $t, n = new FormData(t);
  } else if (Mr(t) || Lr(t) && (t.type === "submit" || t.type === "image")) {
    let c = t.form;
    if (c == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = t.getAttribute("formaction") || c.getAttribute("action");
    if (i = p ? ye(p, a) : null, l = t.getAttribute("formmethod") || c.getAttribute("method") || Ht, r = la(t.getAttribute("formenctype")) || la(c.getAttribute("enctype")) || $t, n = new FormData(c, t), !_r()) {
      let { name: f, type: v, value: u } = t;
      if (v === "image") {
        let w = f ? `${f}.` : "";
        n.append(`${w}x`, "0"), n.append(`${w}y`, "0");
      } else f && n.append(f, u);
    }
  } else {
    if (Wt(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    l = Ht, i = null, r = $t, s = t;
  }
  return n && r === "text/plain" && (s = n, n = void 0), { action: i, method: l.toLowerCase(), encType: r, formData: n, body: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ga(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Pr(t, a, l, i) {
  let r = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return l ? r.pathname.endsWith("/") ? r.pathname = `${r.pathname}_.${i}` : r.pathname = `${r.pathname}.${i}` : r.pathname === "/" ? r.pathname = `_root.${i}` : a && ye(r.pathname, a) === "/" ? r.pathname = `${a.replace(/\/$/, "")}/_root.${i}` : r.pathname = `${r.pathname.replace(/\/$/, "")}.${i}`, r;
}
async function Dr(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let l = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = l, l;
  } catch (l) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(l), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function Fr(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function Or(t, a, l) {
  let i = await Promise.all(
    t.map(async (r) => {
      let n = a.routes[r.route.id];
      if (n) {
        let s = await Dr(n, l);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return Hr(
    i.flat(1).filter(Fr).filter((r) => r.rel === "stylesheet" || r.rel === "preload").map(
      (r) => r.rel === "stylesheet" ? { ...r, rel: "prefetch", as: "style" } : { ...r, rel: "prefetch" }
    )
  );
}
function pl(t, a, l, i, r, n) {
  let s = (p, f) => l[f] ? p.route.id !== l[f].route.id : !0, c = (p, f) => (
    // param change, /users/123 -> /users/456
    l[f].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l[f].route.path?.endsWith("*") && l[f].params["*"] !== p.params["*"]
  );
  return n === "assets" ? a.filter(
    (p, f) => s(p, f) || c(p, f)
  ) : n === "data" ? a.filter((p, f) => {
    let v = i.routes[p.route.id];
    if (!v || !v.hasLoader)
      return !1;
    if (s(p, f) || c(p, f))
      return !0;
    if (p.route.shouldRevalidate) {
      let u = p.route.shouldRevalidate({
        currentUrl: new URL(
          r.pathname + r.search + r.hash,
          window.origin
        ),
        currentParams: l[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof u == "boolean")
        return u;
    }
    return !0;
  }) : [];
}
function Ar(t, a, { includeHydrateFallback: l } = {}) {
  return zr(
    t.map((i) => {
      let r = a.routes[i.route.id];
      if (!r) return [];
      let n = [r.module];
      return r.clientActionModule && (n = n.concat(r.clientActionModule)), r.clientLoaderModule && (n = n.concat(r.clientLoaderModule)), l && r.hydrateFallbackModule && (n = n.concat(r.hydrateFallbackModule)), r.imports && (n = n.concat(r.imports)), n;
    }).flat(1)
  );
}
function zr(t) {
  return [...new Set(t)];
}
function Tr(t) {
  let a = {}, l = Object.keys(t).sort();
  for (let i of l)
    a[i] = t[i];
  return a;
}
function Hr(t, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, r) => {
    let n = JSON.stringify(Tr(r));
    return l.has(n) || (l.add(n), i.push({ key: n, link: r })), i;
  }, []);
}
function Wl() {
  let t = G(Je);
  return ga(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function $r() {
  let t = G(Mt);
  return ga(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Na = ve(void 0);
Na.displayName = "FrameworkContext";
function Zl() {
  let t = G(Na);
  return ga(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function Gr(t, a) {
  let l = G(Na), [i, r] = se(!1), [n, s] = se(!1), { onFocus: c, onBlur: p, onMouseEnter: f, onMouseLeave: v, onTouchStart: u } = a, w = yt(null);
  Fe(() => {
    if (t === "render" && s(!0), t === "viewport") {
      let R = (L) => {
        L.forEach((y) => {
          s(y.isIntersecting);
        });
      }, C = new IntersectionObserver(R, { threshold: 0.5 });
      return w.current && C.observe(w.current), () => {
        C.disconnect();
      };
    }
  }, [t]), Fe(() => {
    if (i) {
      let R = setTimeout(() => {
        s(!0);
      }, 100);
      return () => {
        clearTimeout(R);
      };
    }
  }, [i]);
  let m = () => {
    r(!0);
  }, k = () => {
    r(!1), s(!1);
  };
  return l ? t !== "intent" ? [n, w, {}] : [
    n,
    w,
    {
      onFocus: ut(c, m),
      onBlur: ut(p, k),
      onMouseEnter: ut(f, m),
      onMouseLeave: ut(v, k),
      onTouchStart: ut(u, m)
    }
  ] : [!1, w, {}];
}
function ut(t, a) {
  return (l) => {
    t && t(l), l.defaultPrevented || a(l);
  };
}
function Vr({ page: t, ...a }) {
  let { router: l } = Wl(), i = Se(
    () => ze(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return i ? /* @__PURE__ */ F(Wr, { page: t, matches: i, ...a }) : null;
}
function Ur(t) {
  let { manifest: a, routeModules: l } = Zl(), [i, r] = se([]);
  return Fe(() => {
    let n = !1;
    return Or(t, a, l).then(
      (s) => {
        n || r(s);
      }
    ), () => {
      n = !0;
    };
  }, [t, a, l]), i;
}
function Wr({
  page: t,
  matches: a,
  ...l
}) {
  let i = Xe(), { future: r, manifest: n, routeModules: s } = Zl(), { basename: c } = Wl(), { loaderData: p, matches: f } = $r(), v = Se(
    () => pl(
      t,
      a,
      f,
      n,
      i,
      "data"
    ),
    [t, a, f, n, i]
  ), u = Se(
    () => pl(
      t,
      a,
      f,
      n,
      i,
      "assets"
    ),
    [t, a, f, n, i]
  ), w = Se(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((y) => {
      let B = n.routes[y.route.id];
      !B || !B.hasLoader || (!v.some((J) => J.route.id === y.route.id) && y.route.id in p && s[y.route.id]?.shouldRevalidate || B.hasClientLoader ? C = !0 : R.add(y.route.id));
    }), R.size === 0)
      return [];
    let L = Pr(
      t,
      c,
      r.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return C && R.size > 0 && L.searchParams.set(
      "_routes",
      a.filter((y) => R.has(y.route.id)).map((y) => y.route.id).join(",")
    ), [L.pathname + L.search];
  }, [
    c,
    r.unstable_trailingSlashAwareDataRequests,
    p,
    i,
    n,
    v,
    a,
    t,
    s
  ]), m = Se(
    () => Ar(u, n),
    [u, n]
  ), k = Ur(u);
  return /* @__PURE__ */ F(nt, null, w.map((R) => /* @__PURE__ */ F("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...l })), m.map((R) => /* @__PURE__ */ F("link", { key: R, rel: "modulepreload", href: R, ...l })), k.map(({ key: R, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ F(
      "link",
      {
        key: R,
        nonce: l.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? l.crossOrigin
      }
    )
  )));
}
function Zr(...t) {
  return (a) => {
    t.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var Yr = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  Yr && (window.__reactRouterVersion = // @ts-expect-error
  "7.13.0");
} catch {
}
function Kr(t, a) {
  return Rn({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: zi({ window: a?.window }),
    hydrationData: qr(),
    routes: t,
    mapRouteProperties: wr,
    hydrationRouteProperties: gr,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    window: a?.window,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
function qr() {
  let t = window?.__staticRouterHydrationData;
  return t && t.errors && (t = {
    ...t,
    errors: Jr(t.errors)
  }), t;
}
function Jr(t) {
  if (!t) return null;
  let a = Object.entries(t), l = {};
  for (let [i, r] of a)
    if (r && r.__type === "RouteErrorResponse")
      l[i] = new Rt(
        r.status,
        r.statusText,
        r.data,
        r.internal === !0
      );
    else if (r && r.__type === "Error") {
      if (r.__subType) {
        let n = window[r.__subType];
        if (typeof n == "function")
          try {
            let s = new n(r.message);
            s.stack = "", l[i] = s;
          } catch {
          }
      }
      if (l[i] == null) {
        let n = new Error(r.message);
        n.stack = "", l[i] = n;
      }
    } else
      l[i] = r;
  return l;
}
var Yl = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, fe = Vt(
  function({
    onClick: a,
    discover: l = "render",
    prefetch: i = "none",
    relative: r,
    reloadDocument: n,
    replace: s,
    state: c,
    target: p,
    to: f,
    preventScrollReset: v,
    viewTransition: u,
    unstable_defaultShouldRevalidate: w,
    ...m
  }, k) {
    let { basename: R, unstable_useTransitions: C } = G(Re), L = typeof f == "string" && Yl.test(f), y = Sl(f, R);
    f = y.to;
    let B = tr(f, { relative: r }), [J, U, Q] = Gr(
      i,
      m
    ), b = ts(f, {
      replace: s,
      state: c,
      target: p,
      preventScrollReset: v,
      relative: r,
      viewTransition: u,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: C
    });
    function D(q) {
      a && a(q), q.defaultPrevented || b(q);
    }
    let V = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ F(
        "a",
        {
          ...m,
          ...Q,
          href: y.absoluteURL || B,
          onClick: y.isExternal || n ? a : D,
          ref: Zr(k, U),
          target: p,
          "data-discover": !L && l === "render" ? "true" : void 0
        }
      )
    );
    return J && !L ? /* @__PURE__ */ F(nt, null, V, /* @__PURE__ */ F(Vr, { page: B })) : V;
  }
);
fe.displayName = "Link";
var Xr = Vt(
  function({
    "aria-current": a = "page",
    caseSensitive: l = !1,
    className: i = "",
    end: r = !1,
    style: n,
    to: s,
    viewTransition: c,
    children: p,
    ...f
  }, v) {
    let u = Lt(s, { relative: f.relative }), w = Xe(), m = G(Mt), { navigator: k, basename: R } = G(Re), C = m != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    rs(u) && c === !0, L = k.encodeLocation ? k.encodeLocation(u).pathname : u.pathname, y = w.pathname, B = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
    l || (y = y.toLowerCase(), B = B ? B.toLowerCase() : null, L = L.toLowerCase()), B && R && (B = ye(B, R) || B);
    const J = L !== "/" && L.endsWith("/") ? L.length - 1 : L.length;
    let U = y === L || !r && y.startsWith(L) && y.charAt(J) === "/", Q = B != null && (B === L || !r && B.startsWith(L) && B.charAt(L.length) === "/"), b = {
      isActive: U,
      isPending: Q,
      isTransitioning: C
    }, D = U ? a : void 0, V;
    typeof i == "function" ? V = i(b) : V = [
      i,
      U ? "active" : null,
      Q ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let q = typeof n == "function" ? n(b) : n;
    return /* @__PURE__ */ F(
      fe,
      {
        ...f,
        "aria-current": D,
        className: V,
        ref: v,
        style: q,
        to: s,
        viewTransition: c
      },
      typeof p == "function" ? p(b) : p
    );
  }
);
Xr.displayName = "NavLink";
var Qr = Vt(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: l,
    reloadDocument: i,
    replace: r,
    state: n,
    method: s = Ht,
    action: c,
    onSubmit: p,
    relative: f,
    preventScrollReset: v,
    viewTransition: u,
    unstable_defaultShouldRevalidate: w,
    ...m
  }, k) => {
    let { unstable_useTransitions: R } = G(Re), C = is(), L = ns(c, { relative: f }), y = s.toLowerCase() === "get" ? "get" : "post", B = typeof c == "string" && Yl.test(c);
    return /* @__PURE__ */ F(
      "form",
      {
        ref: k,
        method: y,
        action: L,
        onSubmit: i ? p : (U) => {
          if (p && p(U), U.defaultPrevented) return;
          U.preventDefault();
          let Q = U.nativeEvent.submitter, b = Q?.getAttribute("formmethod") || s, D = () => C(Q || U.currentTarget, {
            fetcherKey: a,
            method: b,
            navigate: l,
            replace: r,
            state: n,
            relative: f,
            preventScrollReset: v,
            viewTransition: u,
            unstable_defaultShouldRevalidate: w
          });
          R && l !== !1 ? wt(() => D()) : D();
        },
        ...m,
        "data-discover": !B && t === "render" ? "true" : void 0
      }
    );
  }
);
Qr.displayName = "Form";
function es(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Kl(t) {
  let a = G(Je);
  return A(a, es(t)), a;
}
function ts(t, {
  target: a,
  replace: l,
  state: i,
  preventScrollReset: r,
  relative: n,
  viewTransition: s,
  unstable_defaultShouldRevalidate: c,
  unstable_useTransitions: p
} = {}) {
  let f = ar(), v = Xe(), u = Lt(t, { relative: n });
  return rt(
    (w) => {
      if (Ir(w, a)) {
        w.preventDefault();
        let m = l !== void 0 ? l : Ie(v) === Ie(u), k = () => f(t, {
          replace: m,
          state: i,
          preventScrollReset: r,
          relative: n,
          viewTransition: s,
          unstable_defaultShouldRevalidate: c
        });
        p ? wt(() => k()) : k();
      }
    },
    [
      v,
      f,
      u,
      l,
      i,
      a,
      t,
      r,
      n,
      s,
      c,
      p
    ]
  );
}
var as = 0, ls = () => `__${String(++as)}__`;
function is() {
  let { router: t } = Kl(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = G(Re), l = xr(), i = t.fetch, r = t.navigate;
  return rt(
    async (n, s = {}) => {
      let { action: c, method: p, encType: f, formData: v, body: u } = Br(
        n,
        a
      );
      if (s.navigate === !1) {
        let w = s.fetcherKey || ls();
        await i(w, l, s.action || c, {
          unstable_defaultShouldRevalidate: s.unstable_defaultShouldRevalidate,
          preventScrollReset: s.preventScrollReset,
          formData: v,
          body: u,
          formMethod: s.method || p,
          formEncType: s.encType || f,
          flushSync: s.flushSync
        });
      } else
        await r(s.action || c, {
          unstable_defaultShouldRevalidate: s.unstable_defaultShouldRevalidate,
          preventScrollReset: s.preventScrollReset,
          formData: v,
          body: u,
          formMethod: s.method || p,
          formEncType: s.encType || f,
          replace: s.replace,
          state: s.state,
          fromRouteId: l,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition
        });
    },
    [i, r, a, l]
  );
}
function ns(t, { relative: a } = {}) {
  let { basename: l } = G(Re), i = G(Oe);
  A(i, "useFormAction must be used inside a RouteContext");
  let [r] = i.matches.slice(-1), n = { ...Lt(t || ".", { relative: a }) }, s = Xe();
  if (t == null) {
    n.search = s.search;
    let c = new URLSearchParams(n.search), p = c.getAll("index");
    if (p.some((v) => v === "")) {
      c.delete("index"), p.filter((u) => u).forEach((u) => c.append("index", u));
      let v = c.toString();
      n.search = v ? `?${v}` : "";
    }
  }
  return (!t || t === ".") && r.route.index && (n.search = n.search ? n.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (n.pathname = n.pathname === "/" ? l : je([l, n.pathname])), Ie(n);
}
function rs(t, { relative: a } = {}) {
  let l = G(ma);
  A(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = Kl(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), r = Lt(t, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let n = ye(l.currentLocation.pathname, i) || l.currentLocation.pathname, s = ye(l.nextLocation.pathname, i) || l.nextLocation.pathname;
  return Gt(r.pathname, s) != null || Gt(r.pathname, n) != null;
}
const fl = 1440;
function ka({ designHeight: t, children: a, bg: l = "#000" }) {
  const [i, r] = se(1);
  return Fe(() => {
    function n() {
      r(window.innerWidth / fl);
    }
    return n(), window.addEventListener("resize", n), () => window.removeEventListener("resize", n);
  }, []), /* @__PURE__ */ e("div", { style: { width: "100vw", height: `${t * i}px`, overflow: "hidden", background: l }, children: /* @__PURE__ */ e(
    "div",
    {
      style: {
        width: `${fl}px`,
        height: `${t}px`,
        transformOrigin: "top left",
        transform: `scale(${i})`
      },
      children: a
    }
  ) });
}
const T = {
  p12b6440: "M33.1151 125.043C33.1151 132.156 34.6761 138.476 37.7977 144.003C40.9704 149.53 45.4477 153.88 51.2303 157.053C57.0129 160.174 63.8707 161.734 71.8026 161.734C79.7855 161.734 86.6685 160.174 92.451 157.053C98.2847 153.88 102.736 149.53 105.806 144.003C108.928 138.476 110.489 132.156 110.489 125.043V44.5157H134.285V126.962C134.285 137.964 131.701 147.713 126.532 156.208C121.364 164.652 114.097 171.304 104.732 176.165C95.3676 180.975 84.3911 183.381 71.8026 183.381C59.2651 183.381 48.3138 180.975 38.9491 176.165C29.5844 171.304 22.3177 164.652 17.1493 156.208C11.9807 147.713 9.39633 137.964 9.39633 126.962V44.5157H33.1151V125.043Z",
  p187a1e40: "M20.6742 578.908H263.914V575.259H20.6742V578.908Z",
  p1d983d00: "M0 363.642L243.24 363.646V367.291L0 367.287V363.642Z",
  p203c2a70: "M114.071 5.09804C112.854 5.0625 111.058 5.08789 110.178 5.15897C107.495 5.3722 105.127 5.75806 104.058 5.9586C101.891 6.36731 100.162 5.6489 99.3849 5.04981C98.4732 4.3441 98.2886 3.25507 98.283 2.4072L98.2774 1.78526C98.2774 0.967848 97.1251 0.0818994 95.6932 0.0285902C94.7731 -0.00694931 94.0739 -0.0120264 93.3887 0.0285902C91.926 0.1149 90.7346 0.955155 90.7346 1.78526L90.7402 13.4981C90.6479 14.7089 90.1725 15.7802 88.514 16.062C86.3549 16.4301 85.4544 15.9097 83.0771 15.5441C80.8929 15.209 75.9371 14.9932 73.0256 14.7115C68.7382 14.2977 66.1345 13.6707 66.1345 11.4799C66.1345 9.4364 67.435 7.61373 73.1039 7.61373C77.3858 7.61373 78.8065 9.27393 80.1434 11.1017C80.781 11.9749 82.1934 12.3659 83.9889 12.4192C86.1759 12.4852 87.138 12.0612 87.4988 11.8048C87.7029 11.6652 87.8176 11.4291 87.7561 11.1804C86.6514 6.67701 82.5234 5.56513 78.4821 5.1412C75.6658 4.84419 73.2354 4.84673 71.6524 4.85688C69.0347 4.87465 67.3091 5.07012 65.4493 5.36205C58.7147 6.51708 58.2141 9.96187 58.1862 10.7158V10.8631V14.9476C58.1862 20.677 53.4037 24.1066 46.6076 24.1066C39.8116 24.1066 37.2414 23.3653 37.2414 16.8718V13.9651C37.2414 12.2085 36.1339 9.83495 33.8825 8.04274C31.7122 6.314 28.6694 5.48136 26.1299 5.11073C23.6828 4.7528 21.7866 4.6208 19.3115 4.72742C15.7512 4.87973 13.6816 5.46359 12.4035 5.83676C10.773 6.314 8.77057 6.38254 6.88837 5.8926C5.77247 5.60321 4.16434 4.84927 1.82347 5.38997C0.39154 5.72252 0 6.35969 0 7.2888V32.2654C0 33.0854 1.16065 34.0069 2.60097 34.0221C2.61775 34.0221 4.87192 34.0221 4.8887 34.0221C6.35419 34.0221 7.5428 33.0955 7.5428 32.2654V30.2651C7.5428 29.4223 7.74417 28.6582 8.38742 28.12C9.13694 27.4955 10.6388 26.9929 12.8035 27.4016C13.9893 27.625 15.5079 27.9652 18.4809 28.0972C19.0038 28.1327 21.0986 28.1403 21.5908 28.1099C25.3133 28.0515 27.2263 27.5539 28.8959 27.0665C30.6718 26.5487 34.6041 25.7211 37.9238 27.0665C39.8116 27.8027 42.4797 28.1149 45.0359 28.1149C45.0471 28.1149 45.103 28.1149 45.103 28.1149C49.6925 28.1149 51.6474 27.1249 53.2807 26.6477C54.9112 26.1704 56.4969 26.1247 57.3136 26.4116C58.1302 26.6984 59.6405 27.3838 62.8008 27.8205C64.3334 28.0312 69.6863 28.1911 74.9442 28.1911C81.5249 28.1911 83.4715 27.7189 86.1563 26.8939C87.7812 26.3963 89.5879 27.0513 90.4046 27.3381C91.2212 27.625 92.2281 27.8001 93.1929 27.8763C93.3412 27.889 93.4894 27.8992 93.646 27.8992H95.338C96.8035 27.8992 98.2718 27.2264 98.2718 25.7516L98.2774 17.6257C98.2774 12.5766 103.021 8.50475 109.856 8.50475C116.691 8.50475 119.222 10.9494 119.222 17.4074V26.3963C119.222 27.2264 120.397 28.153 121.862 28.153H124.114C125.579 28.153 126.768 27.2264 126.768 26.3963V16.4834C126.768 7.94628 121.739 5.32905 114.065 5.09804H114.071ZM19.1744 25.386C11.9784 25.386 7.59594 21.926 7.59594 16.6281C7.59594 11.3301 11.9784 7.87012 19.1744 7.87012C25.7272 7.87012 29.707 11.287 29.707 16.6281C29.707 21.9691 25.7272 25.386 19.1744 25.386ZM74.3541 25.9343C74.0996 25.9343 73.8563 25.9318 73.6102 25.9293C69.4514 25.9419 66.2575 24.5686 64.6075 23.0074C62.7784 21.2761 63.43 18.8061 65.1864 17.3312C66.8309 15.9503 68.2516 16.3793 74.8575 17.2195C75.0896 17.2475 75.6854 17.3236 75.6854 17.3236C81.3012 18.0547 82.5989 19.5702 82.5989 21.7584C82.5989 23.9467 80.823 25.9343 74.3513 25.9343H74.3541Z",
  p2052fcf0: "M71.1826 22.5655C70.998 22.4259 66.4001 19.1715 62.9462 16.7624C60.5522 15.092 58.779 13.9903 58.779 12.683C58.779 12.6779 58.779 12.6728 58.779 12.6652C58.779 12.6652 58.779 12.655 58.779 12.6474C58.779 11.3401 60.5522 10.2384 62.9462 8.568C66.3974 6.15893 70.9952 2.90453 71.1826 2.76491C71.5965 2.45267 71.7615 2.10235 71.6049 1.77996C71.4594 1.48041 71.1182 1.31541 70.5086 1.23418C69.9212 1.15548 68.0894 1.12248 67.0798 1.12248C66.6547 1.12248 64.792 1.12248 64.5375 1.12248C63.7405 1.14279 62.4567 1.02348 60.7619 2.33336C59.9509 2.96038 56.2004 6.92049 55.753 7.32158C55.2244 7.79629 54.0078 8.80154 52.9506 8.80154C52.0836 8.80154 51.2474 8.03491 50.6349 7.4942C50.5007 7.37743 50.2042 7.13373 50.1343 7.07788C49.0464 6.19193 46.9488 4.68658 46.8258 4.60789C43.727 2.53391 40.3681 1.36872 36.036 0.688392C31.9891 0.0537582 27.1088 -0.24325 22.8046 0.239071C16.7441 0.91686 14.0648 1.53626 12.4035 1.9145C10.8765 2.26228 9.76901 1.97543 8.8265 1.73173C7.98469 1.51342 5.90391 0.995554 3.7728 0.995554C3.67771 0.995554 3.59381 0.998093 3.52389 1.00317C1.55778 1.07425 0 1.99066 0 3.11269V28.3635C0 29.1834 1.16065 30.1049 2.60097 30.1201C2.61775 30.1201 4.87192 30.1201 4.8887 30.1201C6.35419 30.1201 7.5428 29.1936 7.5428 28.3635V26.2159C7.56238 25.4239 7.77213 24.708 8.38462 24.2003C9.13415 23.5758 10.636 23.0732 12.8007 23.4819C13.9893 23.7053 15.5107 24.0454 18.4892 24.1774C19.0122 24.213 19.5408 24.2358 20.0862 24.2358C28.9714 24.2358 36.6792 20.8012 36.6792 12.7058C36.6792 12.4164 36.6624 12.1321 36.6345 11.8529L36.6401 11.8605C36.6401 10.1317 35.843 8.52992 37.068 7.5602C38.4747 6.44579 40.7401 7.34443 42.2 8.23545C42.7845 8.59085 43.5928 9.09855 44.099 9.43364C45.8889 10.6623 47.125 11.5609 47.125 12.6474C47.125 12.6525 47.125 12.6576 47.125 12.6652C47.125 12.6652 47.125 12.6753 47.125 12.683C47.125 13.9903 45.3519 15.092 42.9579 16.7624C39.5067 19.1715 35.1886 22.4259 35.0012 22.5655C34.5873 22.8777 34.4222 23.228 34.5789 23.5504C34.7243 23.85 35.0655 24.015 35.6752 24.0962C36.2625 24.1749 37.8147 24.2054 38.8243 24.2054C39.2494 24.2054 41.112 24.2054 41.3665 24.2054C42.1636 24.1851 43.4473 24.3044 45.1421 22.9945C45.9532 22.3675 49.7036 18.6612 50.1511 18.2601C50.6797 17.7854 51.8963 16.7802 52.9534 16.7802C54.0106 16.7802 55.2272 17.788 55.7558 18.2601C56.2032 18.6612 59.9537 22.3675 60.7647 22.9945C62.4595 24.3044 63.7432 24.1851 64.5403 24.2054C64.792 24.2054 66.6575 24.2054 67.0826 24.2054C68.0922 24.2054 69.924 24.1749 70.5114 24.0962C71.1238 24.015 71.465 23.85 71.6077 23.5504C71.7643 23.228 71.5993 22.8777 71.1854 22.5655H71.1826ZM19.1632 21.4663C11.9672 21.4663 7.58475 18.0063 7.58475 12.7083C7.58475 7.41043 11.9672 3.95041 19.1632 3.95041C25.716 3.95041 29.6958 7.36727 29.6958 12.7083C29.6958 18.0494 25.716 21.4663 19.1632 21.4663Z",
  p215ce980: "M94.8625 148.377L338.102 148.379V150.809L94.8625 150.807V148.377Z",
  p21fd39c0: "M342.968 872.011H586.208V868.363H342.968V872.011Z",
  p224a1200: "M21.8908 293.104L265.13 293.107V296.752L21.8908 296.749V293.104Z",
  p24b65c70: "M184.863 797.823H428.102V794.174H184.863V797.823Z",
  p30d7cd00: "M184.863 74.1883L428.102 74.1917V77.8369L184.863 77.8335V74.1883Z",
  p33800600: "M32.0059 10.0059V110.547C32.0059 117.801 33.5995 124.283 36.8096 129.967L36.8125 129.973C40.0739 135.654 44.6797 140.124 50.6074 143.376L50.6123 143.379C56.5569 146.588 63.5738 148.174 71.6289 148.174C79.7339 148.174 86.7763 146.588 92.7217 143.379L92.7236 143.378C98.7051 140.125 103.29 135.651 106.451 129.961L106.45 129.96C109.658 124.278 111.251 117.799 111.251 110.547V10.0059H133.176V112.466C133.176 123.315 130.63 132.891 125.561 141.224C120.487 149.511 113.353 156.049 104.131 160.837C94.922 165.567 84.0976 167.949 71.6289 167.949C59.2119 167.949 48.4117 165.567 39.2021 160.837C30.2683 156.198 23.2942 149.918 18.2549 141.995L17.7734 141.224C12.7041 132.891 10.1582 123.315 10.1582 112.466V10.0059H32.0059Z",
  p33d1a280: "M0 508.369H243.24V504.721H0V508.369Z",
  p35383500: "M94.8625 723.635H338.102V719.986H94.8625V723.635Z",
  p3771e400: "M342.968 0L586.208 0.00340636V3.64859L342.968 3.64519V0Z",
  p3d45a330: "M55.8336 86C40.5909 86 33.2618 77.5205 29.7896 70.4022C26.3539 63.3415 26.0653 56.3421 26.041 55.3443C25.4505 45.8941 31.0326 26.8978 56.4265 22.0598C56.8672 21.9759 57.32 21.9803 57.759 22.0728C58.198 22.1654 58.6146 22.3441 58.9851 22.599C59.3556 22.8538 59.6726 23.1797 59.9181 23.558C60.1637 23.9364 60.3329 24.3598 60.4161 24.804C60.4993 25.2483 60.4949 25.7048 60.4031 26.1473C60.3114 26.5899 60.134 27.0099 59.8813 27.3833C59.6285 27.7568 59.3052 28.0764 58.9299 28.3239C58.5546 28.5715 58.1346 28.742 57.6939 28.8259C31.7472 33.7695 32.804 54.1084 32.8576 54.9675C32.8576 55.0326 32.8649 55.0976 32.8661 55.1639C32.8843 56.1335 33.487 79.116 55.8336 79.116C64.1537 79.116 70.0292 75.5078 73.3164 68.3931C76.2967 61.9202 75.6649 54.592 71.6704 49.2679C68.8836 45.5529 65.2835 43.7451 60.6669 43.7451C56.4715 43.7451 52.9397 44.9576 50.1711 47.3497C49.0178 48.345 48.0785 49.5675 47.4108 50.9421C46.7432 52.3167 46.3613 53.8143 46.2886 55.3431C46.117 58.4605 47.1579 61.4011 49.2191 63.6262C51.0696 65.6157 53.2282 66.5852 55.8336 66.5852C59.1767 66.5852 61.3755 65.4807 62.3665 63.2948C63.3867 61.0489 62.806 58.5169 62.3434 57.9769C61.2342 56.7496 60.0679 56.298 59.6065 56.3814C59.2985 56.4342 58.9028 56.9472 58.5741 57.7216C58.3982 58.1373 58.1429 58.514 57.8226 58.8301C57.5023 59.1463 57.1234 59.3958 56.7075 59.5644C56.2916 59.7329 55.8468 59.8172 55.3985 59.8125C54.9503 59.8078 54.5074 59.7141 54.095 59.5368C53.6827 59.3595 53.309 59.1021 52.9954 58.7792C52.6818 58.4564 52.4343 58.0744 52.2671 57.6551C52.0999 57.2358 52.0162 56.7875 52.0209 56.3356C52.0256 55.8837 52.1185 55.4372 52.2944 55.0216C54.0329 50.9174 56.9135 49.8669 58.4742 49.5969C61.4911 49.0838 64.8258 50.4928 67.4031 53.3586C69.9805 56.2243 70.5089 61.7717 68.6389 66.0268C67.4165 68.8067 64.1269 73.4704 55.8336 73.4704C51.363 73.4704 47.3515 71.6921 44.2323 68.3256C40.888 64.7173 39.1993 59.9701 39.4708 54.9614C39.604 52.5084 40.2257 50.1076 41.2989 47.9021C42.3721 45.6965 43.8749 43.7313 45.7176 42.1238C49.7584 38.6321 54.7853 36.8623 60.6572 36.8623C67.3678 36.8623 73.057 39.7158 77.1076 45.1135C82.63 52.4773 83.5479 62.5057 79.5011 71.292C76.4148 78.0016 69.8003 86 55.8336 86Z",
  p483e100: "M0 434.181L243.24 434.184V437.829L0 437.826V434.181Z",
  p634d400: "M27.916 10.8945V110.688C27.916 118.055 29.5356 124.667 32.8164 130.476L32.8223 130.485C36.1546 136.29 40.8614 140.857 46.9053 144.173L46.915 144.178C52.9893 147.457 60.1335 149.062 68.2871 149.062C76.4896 149.062 83.6588 147.457 89.7344 144.178L89.7393 144.176C95.8351 140.86 100.523 136.291 103.757 130.476C107.038 124.667 108.657 118.055 108.657 110.688V10.8945H129.086V112.606C129.086 122.999 126.724 132.182 122.039 140.204L121.578 140.978C116.581 149.139 109.554 155.584 100.447 160.312C91.363 164.979 80.6599 167.342 68.2871 167.342C55.9689 167.342 45.2922 164.98 36.208 160.315H36.209C27.3823 155.733 20.5088 149.539 15.5439 141.733L15.0693 140.974C10.0795 132.771 7.56445 123.332 7.56445 112.606V10.8945H27.916Z",
  pbd40600: "M51.0772 222.565L294.317 222.567V224.997L51.0772 224.995V222.565Z",
  pefa4700: "M51.0772 649.446H294.317V645.798H51.0772V649.446Z"
}, ss = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/22e4295925292c3d24f972dbb70a51eff41a61ab.22e42959.png", os = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/668077f10c31ea82799bf681e8953af1982c5958.668077f1.png";
function cs() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex font-['Inter:Medium',sans-serif] font-medium gap-[56px] items-center leading-[1.02] not-italic right-[20px] text-[#d9d9d9] text-[20px] top-[20px] tracking-[-0.8px] whitespace-nowrap", children: [
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Posters" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Guidelines" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Submit (→)" })
  ] });
}
function ds() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute contents font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-1/2 not-italic text-[#d9d9d9] text-[20px] top-[512px] tracking-[-0.8px] whitespace-nowrap", children: [
    /* @__PURE__ */ e("p", { className: "absolute left-[calc(4.17%-40px)] top-[512px]", children: "Submit Work (→)" }),
    /* @__PURE__ */ e("p", { className: "absolute left-[calc(95.83%-140px)] top-[512px]", children: "(↓) Explore Themes" })
  ] });
}
function ps() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(33.33%+97.67px)] top-[237.94px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(33.33%+97.67px)] top-[304.27px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(33.33%+97.67px)] top-[271.1px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(33.33%+97.67px)] top-[237.94px] w-[284.667px]" })
  ] });
}
function fs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(33.33%+97.67px)] top-[624.86px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(33.33%+97.67px)] top-[691.2px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(33.33%+97.67px)] top-[658.03px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(33.33%+97.67px)] top-[624.87px] w-[284.667px]" })
  ] });
}
function xs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(25%+75.33px)] top-[374.74px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(25%+75.33px)] top-[446.6px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(25%+75.33px)] top-[410.67px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(25%+75.33px)] top-[374.74px] w-[142.333px]" })
  ] });
}
function us() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(25%+75.33px)] top-[482.53px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(25%+75.33px)] top-[554.39px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(25%+75.33px)] top-[518.46px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(25%+75.33px)] top-[482.53px] w-[142.333px]" })
  ] });
}
function hs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[482.53px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(58.33%+22.33px)] top-[554.39px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(58.33%+22.33px)] top-[518.46px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(58.33%+22.33px)] top-[482.53px] w-[142.333px]" })
  ] });
}
function ms() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[374.74px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(58.33%+22.33px)] top-[446.6px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(58.33%+22.33px)] top-[410.67px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[24.874px] left-[calc(58.33%+22.33px)] top-[374.74px] w-[142.333px]" })
  ] });
}
function vs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(16.67%+53px)] top-[381.66px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(16.67%+53px)] top-[453.51px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(16.67%+53px)] top-[417.59px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(16.67%+53px)] top-[381.66px] w-[142.333px]" })
  ] });
}
function bs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(16.67%+53px)] top-[489.44px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(16.67%+53px)] top-[561.3px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(16.67%+53px)] top-[525.37px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(16.67%+53px)] top-[489.44px] w-[142.333px]" })
  ] });
}
function ws() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(66.67%+44.67px)] top-[381.66px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(66.67%+44.67px)] top-[453.51px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(66.67%+44.67px)] top-[417.59px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(66.67%+44.67px)] top-[381.66px] w-[142.333px]" })
  ] });
}
function gs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(66.67%+44.67px)] top-[489.44px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(66.67%+44.67px)] top-[561.3px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(66.67%+44.67px)] top-[525.37px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(66.67%+44.67px)] top-[489.44px] w-[142.333px]" })
  ] });
}
function Ns() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(33.33%+97.67px)] top-[123.24px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(33.33%+97.67px)] top-[153.64px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(33.33%+97.67px)] top-[123.24px] w-[284.667px]" })
  ] });
}
function ks() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(33.33%+97.67px)] top-[792.07px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(33.33%+97.67px)] top-[792.07px] w-[284.667px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[284.667px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(33.33%+97.67px)] top-[822.48px] w-[284.667px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[284.667px]" }) }) })
  ] });
}
function ys() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(25%+75.33px)] top-[246.23px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(25%+75.33px)] top-[279.4px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(25%+75.33px)] top-[246.23px] w-[142.333px]" })
  ] });
}
function Rs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(25%+75.33px)] top-[666.32px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(25%+75.33px)] top-[666.32px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(25%+75.33px)] top-[699.49px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[142.333px]" }) }) })
  ] });
}
function Cs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[666.32px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(58.33%+22.33px)] top-[666.32px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(58.33%+22.33px)] top-[699.49px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[142.333px]" }) }) })
  ] });
}
function Ms() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[246.23px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(58.33%+22.33px)] top-[279.4px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(58.33%+22.33px)] top-[246.23px] w-[142.333px]" })
  ] });
}
function Ss() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(16.67%+53px)] top-[126px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[3px] left-[calc(25%+74.67px)] top-[126px] w-[143px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[2.764px] left-[calc(16.67%+53px)] top-[219.98px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[2.764px] left-[calc(16.67%+53px)] top-[249px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[2.764px] left-[calc(16.67%+53px)] top-[282.16px] w-[142.333px]" })
  ] });
}
function Ls() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[126px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3px] items-center justify-center left-[calc(58.33%+22.33px)] top-[126px] w-[143px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[3px] relative w-[143px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(66.67%+44.67px)] top-[219.98px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(66.67%+44.67px)] top-[249px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(66.67%+44.67px)] top-[282.16px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) })
  ] });
}
function js() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(16.67%+53px)] top-[669.08px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3px] items-center justify-center left-[calc(25%+74.67px)] top-[825.01px] w-[143px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[3px] relative w-[143px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(16.67%+53px)] top-[731.27px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(16.67%+53px)] top-[702.25px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(16.67%+53px)] top-[669.08px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) })
  ] });
}
function Is() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[669.08px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3px] items-center justify-center left-[calc(58.33%+22.33px)] top-[825.01px] w-[143px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[3px] relative w-[143px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(66.67%+44.67px)] top-[731.27px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(66.67%+44.67px)] top-[702.25px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.764px] items-center justify-center left-[calc(66.67%+44.67px)] top-[669.08px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[2.764px] relative w-[142.333px]" }) }) })
  ] });
}
function _s() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(25%+75.33px)] top-[155.03px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(25%+75.33px)] top-[218.59px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(25%+75.33px)] top-[186.81px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(25%+75.33px)] top-[155.03px] w-[142.333px]" })
  ] });
}
function Es() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(25%+75.33px)] top-[729.89px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(25%+75.33px)] top-[729.89px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(25%+75.33px)] top-[761.67px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(25%+75.33px)] top-[793.45px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) })
  ] });
}
function Bs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[729.89px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(58.33%+22.33px)] top-[729.89px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(58.33%+22.33px)] top-[761.67px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(58.33%+22.33px)] top-[793.45px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) })
  ] });
}
function Ps() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(58.33%+22.33px)] top-[155.03px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(58.33%+22.33px)] top-[218.59px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(58.33%+22.33px)] top-[186.81px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(58.33%+22.33px)] top-[155.03px] w-[142.333px]" })
  ] });
}
function Ds() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(33.33%+97.67px)] top-[337.43px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[337.44px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[373.36px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[409.29px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[445.22px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[481.15px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[517.08px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[553.01px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[27.638px] left-[calc(33.33%+97.67px)] top-[588.94px] w-[284.667px]" })
  ] });
}
function Fs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[calc(16.67%+53px)] top-[92.84px]", children: [
    /* @__PURE__ */ e(ps, {}),
    /* @__PURE__ */ e(fs, {}),
    /* @__PURE__ */ e(xs, {}),
    /* @__PURE__ */ e(us, {}),
    /* @__PURE__ */ e(hs, {}),
    /* @__PURE__ */ e(ms, {}),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.583px] left-[calc(33.33%+97.67px)] top-[213.07px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.583px] items-center justify-center left-[calc(33.33%+97.67px)] top-[724.36px] w-[284.667px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.583px] relative w-[284.667px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.583px] left-[calc(25%+75.33px)] top-[342.96px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.583px] items-center justify-center left-[calc(25%+75.33px)] top-[594.46px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.583px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.583px] items-center justify-center left-[calc(58.33%+22.33px)] top-[594.46px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.583px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.583px] left-[calc(58.33%+22.33px)] top-[342.96px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(33.33%+97.67px)] top-[184.05px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[11.055px] items-center justify-center left-[calc(33.33%+97.67px)] top-[758.91px] w-[284.667px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[11.055px] relative w-[284.667px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(25%+75.33px)] top-[311.18px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[11.055px] items-center justify-center left-[calc(25%+75.33px)] top-[631.77px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[11.055px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[11.055px] items-center justify-center left-[calc(58.33%+22.33px)] top-[631.77px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[11.055px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[11.055px] left-[calc(58.33%+22.33px)] top-[311.18px] w-[142.333px]" }),
    /* @__PURE__ */ e(vs, {}),
    /* @__PURE__ */ e(bs, {}),
    /* @__PURE__ */ e(ws, {}),
    /* @__PURE__ */ e(gs, {}),
    /* @__PURE__ */ e(Ns, {}),
    /* @__PURE__ */ e(ks, {}),
    /* @__PURE__ */ e(ys, {}),
    /* @__PURE__ */ e(Rs, {}),
    /* @__PURE__ */ e(Cs, {}),
    /* @__PURE__ */ e(Ms, {}),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(16.67%+53px)] top-[347.11px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(16.67%+53px)] top-[598.61px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.291px] items-center justify-center left-[calc(66.67%+44.67px)] top-[598.61px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[8.291px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[8.291px] left-[calc(66.67%+44.67px)] top-[347.11px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(33.33%+97.67px)] top-[92.84px] w-[284.667px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(33.33%+97.67px)] top-[855.64px] w-[284.667px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[284.667px]" }) }) }),
    /* @__PURE__ */ e(Ss, {}),
    /* @__PURE__ */ e(Ls, {}),
    /* @__PURE__ */ e(js, {}),
    /* @__PURE__ */ e(Is, {}),
    /* @__PURE__ */ e(_s, {}),
    /* @__PURE__ */ e(Es, {}),
    /* @__PURE__ */ e(Bs, {}),
    /* @__PURE__ */ e(Ps, {}),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(16.67%+53px)] top-[313.94px] w-[142.333px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(16.67%+53px)] top-[634.54px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[5.528px] items-center justify-center left-[calc(66.67%+44.67px)] top-[634.54px] w-[142.333px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[5.528px] relative w-[142.333px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[5.528px] left-[calc(66.67%+44.67px)] top-[313.94px] w-[142.333px]" }),
    /* @__PURE__ */ e(Ds, {})
  ] });
}
function Os() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#2449ed] h-[954px] left-0 overflow-x-clip overflow-y-auto top-0 w-[1440px]", "data-name": "hero", children: [
    /* @__PURE__ */ e(cs, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#d9d9d9] text-[20px] top-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Home" }),
    /* @__PURE__ */ e(ds, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(12.5%-160px)] not-italic text-[#d9d9d9] text-[20px] top-[804px] tracking-[-0.8px] w-[335px]", children: "Everything around us was designed by someone. The systems. The platforms. The institutions. The incentives. The habits. They were built. Which means they can be questioned." }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(12.5%-160px)] not-italic text-[#d9d9d9] text-[20px] top-[764px] tracking-[-0.8px] w-[335px]", children: "The World Isn’t Inevitable" }),
    /* @__PURE__ */ e(Fs, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(50%-1px)] not-italic text-[#101010] text-[248.245px] text-center top-[56px] tracking-[-14.8947px] uppercase whitespace-nowrap", children: "UNBLOCKED" })
  ] });
}
function As() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[169.242px] left-[calc(50%+0.19px)] top-[calc(50%-6.56px)] w-[136.591px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 136.591 169.242", children: /* @__PURE__ */ o("g", { id: "Group 98", children: [
    /* @__PURE__ */ e("rect", { fill: "var(--fill-0, #2850FE)", height: "169.242", id: "Rectangle 104", width: "136.591" }),
    /* @__PURE__ */ e("path", { d: T.p634d400, fill: "var(--fill-0, #D9D9D9)", id: "U", stroke: "var(--stroke-0, #2850FE)", strokeWidth: "3.36681" })
  ] }) }) });
}
function zs() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[168.885px] left-[calc(50%+0.19px)] top-[calc(50%-33.54px)] w-[143.276px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 143.276 168.885", children: /* @__PURE__ */ o("g", { id: "Group 97", children: [
    /* @__PURE__ */ e("rect", { fill: "var(--fill-0, #2850FE)", height: "168.714", id: "Rectangle 104", width: "143.276" }),
    /* @__PURE__ */ e("path", { d: T.p33800600, fill: "var(--fill-0, #D9D9D9)", id: "U", stroke: "var(--stroke-0, #2850FE)", strokeWidth: "1.87045" })
  ] }) }) });
}
function Ts() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[183.381px] left-[calc(50%+0.19px)] top-[calc(50%-73.81px)] w-[143.622px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 143.622 183.381", children: /* @__PURE__ */ o("g", { id: "Group 96", children: [
    /* @__PURE__ */ e("rect", { fill: "var(--fill-0, #2850FE)", height: "177.954", id: "Rectangle 104", width: "143.622" }),
    /* @__PURE__ */ o("g", { id: "U", children: [
      /* @__PURE__ */ e("path", { d: T.p12b6440, fill: "var(--fill-0, #D9D9D9)" }),
      /* @__PURE__ */ e("path", { d: T.p12b6440, stroke: "var(--stroke-0, #2850FE)" })
    ] })
  ] }) }) });
}
function Hs() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 absolute bg-[#2850fe] h-[181px] left-[calc(50%+1px)] overflow-clip top-[586px] w-[296px]", children: [
    /* @__PURE__ */ e(As, {}),
    /* @__PURE__ */ e(zs, {}),
    /* @__PURE__ */ e(Ts, {})
  ] });
}
function $s() {
  return /* @__PURE__ */ o("div", { className: "absolute contents inset-[40.12%_18.86%_40.1%_19.1%]", "data-name": "logo", children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-[40.12%_18.86%_40.1%_43.3%]", "data-name": "Vector", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 126.768 34.0221", children: /* @__PURE__ */ e("path", { d: T.p203c2a70, fill: "var(--fill-0, #272727)", id: "Vector" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute inset-[42.38%_59.51%_40.11%_19.1%]", "data-name": "Vector", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 71.666 30.1201", children: /* @__PURE__ */ e("path", { d: T.p2052fcf0, fill: "var(--fill-0, #272727)", id: "Vector" }) }) })
  ] });
}
function Gs() {
  return /* @__PURE__ */ e("div", { className: "flex-[1_0_0] h-[172px] min-w-px overflow-clip relative", children: /* @__PURE__ */ e($s, {}) });
}
function Vs() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 absolute left-1/2 size-[107px] top-[22px]", "data-name": "logo-107fbbb3e6ab7dd846bb56070511bc79 1", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 107 107", children: /* @__PURE__ */ e("g", { id: "logo-107fbbb3e6ab7dd846bb56070511bc79 1", children: /* @__PURE__ */ e("path", { d: T.p3d45a330, fill: "var(--fill-0, #272727)", id: "Vector" }) }) }) });
}
function Us() {
  return /* @__PURE__ */ e("div", { className: "flex-[1_0_0] h-[172px] min-w-px overflow-clip relative", children: /* @__PURE__ */ e(Vs, {}) });
}
function Ws() {
  return /* @__PURE__ */ e("div", { className: "flex-[1_0_0] h-[172px] min-w-px overflow-clip relative", children: /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[114px] left-[calc(50%+0.5px)] top-1/2 w-[228px]", "data-name": "image 31", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full", src: ss }) }) });
}
function Zs() {
  return /* @__PURE__ */ e("div", { className: "flex-[1_0_0] h-[172px] min-w-px overflow-clip relative", children: /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[114px] left-[calc(50%+0.5px)] top-1/2 w-[228px]", "data-name": "image 32", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full", src: os }) }) });
}
function Ys() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex gap-[20px] items-center left-[20px] top-[1492px] w-[1400px]", children: [
    /* @__PURE__ */ e(Gs, {}),
    /* @__PURE__ */ e(Us, {}),
    /* @__PURE__ */ e(Ws, {}),
    /* @__PURE__ */ e(Zs, {})
  ] });
}
function Ks() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#d9d9d9] h-[1686px] left-0 overflow-clip top-[4890px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%+0.6px)] not-italic text-[#272727] text-[180px] text-center top-[calc(50%-602px)] tracking-[-10.8px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.9] mb-0", children: "Making" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.9]", children: "Hidden" })
    ] }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(50%+0.6px)] not-italic text-[#272727] text-[224.775px] text-center top-[calc(50%-278px)] tracking-[-13.4865px] whitespace-pre", children: "(          )" }),
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%+0.5px)] not-italic text-[#272727] text-[180px] text-center top-[calc(50%-55px)] tracking-[-10.8px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.9] mb-0", children: "Systems" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.9]", children: "Visible" })
    ] }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(12.5%-160px)] not-italic text-[#272727] text-[20px] top-[656px] tracking-[-0.8px] w-[259px]", children: "(Through art)" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(95.83%+40px)] not-italic text-[#272727] text-[20px] text-right top-[656px] tracking-[-0.8px] whitespace-nowrap", children: "(Through exhibitions)" }),
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[calc(50%+0.5px)] not-italic text-[#272727] text-[20px] text-center top-[1232px] tracking-[-0.8px] w-[453px]", children: [
      /* @__PURE__ */ e("p", { className: "leading-[1.02] mb-0", children: "Through public participation. Through questions" }),
      /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Through people who refuse to treat the current arrangement as permanent." })
    ] }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+0.47px)] not-italic text-[#272727] text-[32px] text-center top-[104px] tracking-[-1.28px] whitespace-nowrap", children: "UNBLOCKED" }),
    /* @__PURE__ */ e(Hs, {}),
    /* @__PURE__ */ e(Ys, {})
  ] });
}
function qs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[233.13px] top-[149.13px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[233.13px] top-[194.63px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[233.13px] top-[149.13px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[22.5px] items-center justify-center left-[233.13px] top-[239.63px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15px] items-center justify-center left-[233.13px] top-[277.13px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.5px] items-center justify-center left-[233.13px] top-[307.13px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3.75px] items-center justify-center left-[233.13px] top-[329.63px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function Js() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[386.87px] top-[262.63px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[386.87px] top-[371.38px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[386.87px] top-[416.38px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[22.5px] items-center justify-center left-[386.87px] top-[333.88px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15px] items-center justify-center left-[386.87px] top-[303.88px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.5px] items-center justify-center left-[386.87px] top-[281.38px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3.75px] items-center justify-center left-[386.87px] top-[262.63px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function Xs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[540.62px] top-[112.88px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] h-[30px] left-[540.62px] top-[221.63px] w-[153.75px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] h-[30px] left-[540.62px] top-[270.38px] w-[153.75px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] h-[22.5px] left-[540.62px] top-[184.13px] w-[153.75px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] h-[15px] left-[540.62px] top-[154.13px] w-[153.75px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] h-[7.5px] left-[540.62px] top-[131.63px] w-[153.75px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] h-[3.75px] left-[540.62px] top-[112.88px] w-[153.75px]" })
  ] });
}
function Qs() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[333.5px] left-[233.12px] top-[112.87px] w-[461.25px]", children: [
    /* @__PURE__ */ e(qs, {}),
    /* @__PURE__ */ e(Js, {}),
    /* @__PURE__ */ e(Xs, {})
  ] });
}
function eo() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#369462] h-[560px] left-[calc(33.33%+13px)] top-[404px] w-[927px]", children: /* @__PURE__ */ e(Qs, {}) });
}
function to() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute bottom-[40px] content-stretch flex flex-col gap-[40px] items-start left-[20px] not-italic text-[#272727] w-[335px]", children: [
    /* @__PURE__ */ e("div", { className: "flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] relative shrink-0 text-[40px] tracking-[-1.6px] w-full", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Why is everything disposable?" }) }),
    /* @__PURE__ */ e("p", { className: "font-['Inter:Medium',sans-serif] font-medium leading-[1.02] relative shrink-0 text-[20px] tracking-[-0.8px] w-full", children: "Products. Memories. Platforms. Relationships. Why are so many things designed to disappear?" })
  ] });
}
function ao() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#43a772] h-[984px] left-0 overflow-clip top-[1938px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(62.5%-407px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] w-[792.939px]", children: "Permanence" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(4.17%-40px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] whitespace-nowrap", children: "02" }),
    /* @__PURE__ */ e(eo, {}),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[384px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #272727)" }) }) }) }),
    /* @__PURE__ */ e(to, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(91.67%+101px)] not-italic text-[#272727] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "Decay" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(4.17%-5px)] not-italic text-[#272727] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "(vs)" })
  ] });
}
function lo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[540.88px] top-[99.62px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[540.88px] top-[264.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.5px] items-center justify-center left-[540.88px] top-[212.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[37.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[45px] items-center justify-center left-[540.88px] top-[152.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[45px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.5px] items-center justify-center left-[540.88px] top-[99.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[37.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[22.5px] items-center justify-center left-[540.88px] top-[309.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15px] items-center justify-center left-[540.88px] top-[347.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.5px] items-center justify-center left-[540.88px] top-[377.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3.75px] items-center justify-center left-[540.88px] top-[399.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function io() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[233.38px] top-[188.62px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[233.38px] top-[264.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.5px] items-center justify-center left-[233.38px] top-[212.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[37.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[22.5px] items-center justify-center left-[233.38px] top-[309.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15px] items-center justify-center left-[233.38px] top-[347.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.5px] items-center justify-center left-[233.38px] top-[377.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.5px] items-center justify-center left-[233.38px] top-[188.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) })
  ] });
}
function no() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[387.13px] top-[155.87px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30px] items-center justify-center left-[387.13px] top-[264.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.5px] items-center justify-center left-[387.13px] top-[309.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[37.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[45px] items-center justify-center left-[387.13px] top-[362.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[45px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.5px] items-center justify-center left-[387.13px] top-[422.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[37.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[22.5px] items-center justify-center left-[387.13px] top-[227.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15px] items-center justify-center left-[387.13px] top-[197.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.5px] items-center justify-center left-[387.13px] top-[174.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3.75px] items-center justify-center left-[387.13px] top-[155.87px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function ro() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[360px] left-[233.37px] top-[99.62px] w-[461.25px]", children: [
    /* @__PURE__ */ e(lo, {}),
    /* @__PURE__ */ e(io, {}),
    /* @__PURE__ */ e(no, {})
  ] });
}
function so() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#d6cf6c] h-[560px] left-[calc(33.33%+13px)] top-[404px] w-[927px]", children: /* @__PURE__ */ e(ro, {}) });
}
function oo() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex flex-col gap-[40px] items-start leading-[0] left-[20px] not-italic text-[#272727] top-[701px] w-[335px]", children: [
    /* @__PURE__ */ e("div", { className: "flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end relative shrink-0 text-[40px] tracking-[-1.6px] w-full", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "When did exhaustion become normal?" }) }),
    /* @__PURE__ */ e("div", { className: "flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end relative shrink-0 text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Scarcity is not the natural state of human beings. What becomes possible when we stop accepting stagnation as progress?" }) })
  ] });
}
function co() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#e8e17e] h-[984px] left-0 overflow-clip top-[2922px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(62.5%-407px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] w-[792.939px]", children: "Energy" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(4.17%-40px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] whitespace-nowrap", children: "03" }),
    /* @__PURE__ */ e(so, {}),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[384px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #272727)" }) }) }) }),
    /* @__PURE__ */ e(oo, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(91.67%+101px)] not-italic text-[#272727] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "Stagnation" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(4.17%-5px)] not-italic text-[#272727] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "(vs)" })
  ] });
}
function po() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[350px] left-[233.37px] top-[104.62px] w-[461.25px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[24.75px] items-center justify-center left-[387.13px] top-[161.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[24.75px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[12px] items-center justify-center left-[297.63px] top-[186.62px] w-[90px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[12px] relative w-[90px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[18px] items-center justify-center left-[233.38px] top-[223.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[18px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[36px] items-center justify-center left-[233.38px] top-[303.37px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[36px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[36px] items-center justify-center left-[297.63px] top-[370.62px] w-[90px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[36px] relative w-[90px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[62.25px] items-center justify-center left-[540.88px] top-[241.12px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[62.25px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[12px] items-center justify-center left-[540.63px] top-[149.62px] w-[90px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[12px] relative w-[90px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[6px] items-center justify-center left-[418.63px] top-[104.62px] w-[90px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[6px] relative w-[90px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[24.75px] items-center justify-center left-[540.88px] top-[186.37px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[24.75px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[31.5px] items-center justify-center left-[387.13px] top-[339.37px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[31.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15px] items-center justify-center left-[387.13px] top-[134.62px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[18px] items-center justify-center left-[387.13px] top-[406.87px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[18px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[12px] items-center justify-center left-[419.63px] top-[442.62px] w-[90px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[12px] relative w-[90px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[39px] items-center justify-center left-[387.13px] top-[264.37px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[39px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[13.5px] items-center justify-center left-[387.13px] top-[210.37px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[13.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[36px] items-center justify-center left-[540.88px] top-[321.37px] w-[153.75px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[36px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[27px] items-center justify-center left-[540.63px] top-[379.62px] w-[90px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[27px] relative w-[90px]" }) }) })
  ] });
}
function fo() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#d997ac] h-[560px] left-[calc(33.33%+13px)] top-[404px] w-[927px]", children: /* @__PURE__ */ e(po, {}) });
}
function xo() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex flex-col gap-[40px] items-start leading-[0] left-[20px] not-italic text-[#272727] top-[742px] w-[335px]", children: [
    /* @__PURE__ */ e("div", { className: "flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end relative shrink-0 text-[40px] tracking-[-1.6px] w-full", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Who decides what matters?" }) }),
    /* @__PURE__ */ e("div", { className: "flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end relative shrink-0 text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "We are more connected than ever. Yet increasingly separated from each other. What happens when people build directly together again?" }) })
  ] });
}
function uo() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#f4a8c0] h-[984px] left-0 overflow-clip top-[3906px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(62.5%-407px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] w-[792.939px]", children: "Peers" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(4.17%-40px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] whitespace-nowrap", children: "04" }),
    /* @__PURE__ */ e(fo, {}),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[384px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #272727)" }) }) }) }),
    /* @__PURE__ */ e(xo, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(91.67%+101px)] not-italic text-[#272727] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "Hierarchies" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(4.17%-5px)] not-italic text-[#272727] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "(vs)" })
  ] });
}
function ho() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[389.66px] top-[74px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#f4a8c0] h-[28.683px] left-[389.66px] top-[177.98px] w-[147px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#f4a8c0] h-[21.512px] left-[389.66px] top-[142.12px] w-[147px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#f4a8c0] h-[14.341px] left-[389.66px] top-[113.44px] w-[147px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#f4a8c0] h-[7.171px] left-[389.66px] top-[91.93px] w-[147px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#f4a8c0] h-[3.585px] left-[389.66px] top-[74px] w-[147px]" })
  ] });
}
function mo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[389.66px] top-[353.66px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[28.683px] items-center justify-center left-[389.66px] top-[353.66px] w-[147px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[28.683px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[21.512px] items-center justify-center left-[389.66px] top-[396.69px] w-[147px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[21.512px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[14.341px] items-center justify-center left-[389.66px] top-[432.54px] w-[147px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[14.341px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.171px] items-center justify-center left-[389.66px] top-[461.22px] w-[147px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[7.171px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3.585px] items-center justify-center left-[389.66px] top-[482.73px] w-[147px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[3.585px] relative w-[147px]" }) }) })
  ] });
}
function vo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[147px] left-[257px] top-[206.66px] w-[132.659px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[360.98px] top-[206.66px] w-[28.683px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[28.683px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[325.12px] top-[206.66px] w-[21.512px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[21.512px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[296.44px] top-[206.66px] w-[14.341px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[14.341px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[274.92px] top-[206.66px] w-[7.171px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[7.171px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[257px] top-[206.66px] w-[3.585px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[3.585px] relative w-[147px]" }) }) })
  ] });
}
function bo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[147px] left-[536.66px] top-[206.66px] w-[132.659px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[536.66px] top-[206.66px] w-[28.683px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[28.683px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[579.69px] top-[206.66px] w-[21.512px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[21.512px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[615.53px] top-[206.66px] w-[14.341px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[14.341px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[644.22px] top-[206.66px] w-[7.171px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[7.171px] relative w-[147px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[147px] items-center justify-center left-[665.73px] top-[206.66px] w-[3.585px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#f4a8c0] h-[3.585px] relative w-[147px]" }) }) })
  ] });
}
function wo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[257px] top-[74px]", children: [
    /* @__PURE__ */ e(ho, {}),
    /* @__PURE__ */ e(mo, {}),
    /* @__PURE__ */ e(vo, {}),
    /* @__PURE__ */ e(bo, {})
  ] });
}
function go() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-black h-[560px] left-[calc(33.33%+13px)] top-[404px] w-[927px]", children: /* @__PURE__ */ e(wo, {}) });
}
function No() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#101010] h-[984px] left-0 overflow-clip top-[954px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(62.5%-407px)] not-italic text-[#dc91a8] text-[100px] top-[calc(50%-472px)] tracking-[-6px] w-[792.939px]", children: "Ownership" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(4.17%-40px)] not-italic text-[#dc91a8] text-[100px] top-[calc(50%-472px)] tracking-[-6px] whitespace-nowrap", children: "01" }),
    /* @__PURE__ */ e(go, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(12.5%-160px)] not-italic text-[#dc91a8] text-[20px] top-[848px] tracking-[-0.8px] w-[335px]", children: "We mistake access for ownership. We mistake convenience for control. We mistake permission for freedom. What happens when the things that matter most no longer belong to us?" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[384px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(12.5%-160px)] not-italic text-[#dc91a8] text-[40px] top-[726px] tracking-[-1.6px] w-[335px]", children: "Who owns your life?" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(91.67%+101px)] not-italic text-[#dc91a8] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "Dependence" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(4.17%-5px)] not-italic text-[#dc91a8] text-[20px] text-right top-[344px] tracking-[-0.8px] whitespace-nowrap", children: "(vs)" })
  ] });
}
function ko() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute bg-black bottom-0 h-[800px] left-1/2 not-italic overflow-clip w-[1440px]", "data-name": "-", children: [
    /* @__PURE__ */ e("p", { className: "absolute bottom-[228px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(50%-700px)] text-[#d9d9d9] text-[244.441px] tracking-[-14.6664px] translate-y-full uppercase whitespace-nowrap", children: "UNBLOCKED" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] whitespace-nowrap", children: "Question Everything" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(54.17%-49px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] whitespace-nowrap", children: "Explore" }),
    /* @__PURE__ */ e("a", { className: "absolute block font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[calc(83.33%-114px)] text-[#d9d9d9] text-[0px] top-[65px] tracking-[-0.4px] whitespace-nowrap", href: "mailto:hello@offf.barcelona", target: "_blank", children: /* @__PURE__ */ o("p", { className: "cursor-pointer text-[20px]", children: [
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "(h" }),
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "ello@unblocked.net)" })
    ] }) }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[65px] tracking-[-0.4px] w-[118px]", children: "Ownership" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[85px] tracking-[-0.4px] w-[118px]", children: "Guidelines" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[105px] tracking-[-0.4px] w-[118px]", children: "(→) Submit" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(8.33%+5px)] text-[#d9d9d9] text-[20px] text-center top-[527px] tracking-[-0.4px] whitespace-nowrap", children: "© Copyright 2026" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(95.83%-52.5px)] text-[#d9d9d9] text-[20px] text-center top-[527px] tracking-[-0.4px] whitespace-nowrap", children: "Back to Top (↑)" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[21px] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] w-[335px]", children: "Exploring ownership, permanence, energy and peers through art, design and culture. Built through participation, dialogue and creative expression." }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[163px] tracking-[-0.4px] whitespace-nowrap", children: "Socials" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[#d9d9d9] text-[20px] top-[203px] tracking-[-0.4px] whitespace-nowrap", children: "Instagram" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[#d9d9d9] text-[20px] top-[223px] tracking-[-0.4px] whitespace-nowrap", children: "Twitter (X)" })
  ] });
}
function yo() {
  return /* @__PURE__ */ e("div", { className: "absolute h-[872.016px] left-[40.14px] top-[295.52px] w-[586.208px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 586.208 872.011", children: /* @__PURE__ */ o("g", { id: "Group 126", children: [
    /* @__PURE__ */ e("path", { d: T.p3771e400, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156778" }),
    /* @__PURE__ */ e("path", { d: T.p21fd39c0, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156779" }),
    /* @__PURE__ */ e("path", { d: T.p483e100, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156782" }),
    /* @__PURE__ */ e("path", { d: T.p1d983d00, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156784" }),
    /* @__PURE__ */ e("path", { d: T.p33d1a280, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156785" }),
    /* @__PURE__ */ e("path", { d: T.p224a1200, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156788" }),
    /* @__PURE__ */ e("path", { d: T.p187a1e40, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156789" }),
    /* @__PURE__ */ e("path", { d: T.pbd40600, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156792" }),
    /* @__PURE__ */ e("path", { d: T.pefa4700, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156793" }),
    /* @__PURE__ */ e("path", { d: T.p215ce980, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156796" }),
    /* @__PURE__ */ e("path", { d: T.p35383500, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156797" }),
    /* @__PURE__ */ e("path", { d: T.p30d7cd00, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156800" }),
    /* @__PURE__ */ e("path", { d: T.p24b65c70, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156801" })
  ] }) }) });
}
function Ro() {
  return /* @__PURE__ */ e("div", { className: "h-[872.016px] relative w-[586.208px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 586.208 872.011", children: /* @__PURE__ */ o("g", { id: "Group 127", children: [
    /* @__PURE__ */ e("path", { d: T.p3771e400, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156778" }),
    /* @__PURE__ */ e("path", { d: T.p21fd39c0, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156779" }),
    /* @__PURE__ */ e("path", { d: T.p483e100, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156782" }),
    /* @__PURE__ */ e("path", { d: T.p1d983d00, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156784" }),
    /* @__PURE__ */ e("path", { d: T.p33d1a280, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156785" }),
    /* @__PURE__ */ e("path", { d: T.p224a1200, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156788" }),
    /* @__PURE__ */ e("path", { d: T.p187a1e40, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156789" }),
    /* @__PURE__ */ e("path", { d: T.pbd40600, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156792" }),
    /* @__PURE__ */ e("path", { d: T.pefa4700, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156793" }),
    /* @__PURE__ */ e("path", { d: T.p215ce980, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156796" }),
    /* @__PURE__ */ e("path", { d: T.p35383500, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156797" }),
    /* @__PURE__ */ e("path", { d: T.p30d7cd00, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156800" }),
    /* @__PURE__ */ e("path", { d: T.p24b65c70, fill: "var(--fill-0, #DB38C8)", id: "Rectangle 156801" })
  ] }) }) });
}
function Co() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 absolute contents left-1/2 top-[287px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[37.034px] left-[555.03px] top-[500.79px] w-[329.936px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[484.33px] top-[504.16px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[484.33px] top-[928.35px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[26.934px] left-[555.03px] top-[431.77px] w-[40.4px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[26.934px] items-center justify-center left-[555.03px] top-[1004.11px] w-[40.4px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[26.934px] relative w-[40.4px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[581.97px] top-[362.76px] w-[47.134px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[581.97px] top-[1083.22px] w-[47.134px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[47.134px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[346.29px] top-[722.99px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[1029.74px] top-[722.99px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[359.76px] top-[652.29px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[359.76px] top-[793.69px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[1016.27px] top-[652.29px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[1016.27px] top-[793.69px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[386.7px] top-[581.59px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[386.7px] top-[864.39px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[420.36px] top-[510.88px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[420.36px] top-[935.1px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[955.67px] top-[510.88px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[955.67px] top-[935.1px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[989.33px] top-[581.59px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[989.33px] top-[864.39px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[491.06px] top-[436.82px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[491.06px] top-[1009.16px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[467.5px] top-[366.12px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[467.5px] top-[1086.6px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e(yo, {}),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[872.016px] items-center justify-center left-[813.65px] top-[295.52px] w-[586.208px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e(Ro, {}) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[376.6px] top-[440.18px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[376.6px] top-[1012.53px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[1080.23px] top-[655.66px] w-[77.434px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[1080.23px] top-[797.05px] w-[77.434px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[77.434px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[282.33px] top-[655.66px] w-[77.434px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[77.434px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[282.33px] top-[797.05px] w-[77.434px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[77.434px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[1093.71px] top-[726.36px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[282.33px] top-[726.36px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[1019.64px] top-[514.25px] w-[87.534px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[1019.64px] top-[938.46px] w-[87.534px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[87.534px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[332.83px] top-[514.25px] w-[87.534px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[87.534px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[332.83px] top-[938.46px] w-[87.534px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[87.534px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[1053.3px] top-[584.96px] w-[84.167px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[1053.3px] top-[867.75px] w-[84.167px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[84.167px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[302.53px] top-[584.96px] w-[84.167px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[84.167px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[302.53px] top-[867.75px] w-[84.167px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[84.167px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[948.94px] top-[440.18px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[948.94px] top-[1012.53px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[10.1px] left-[858.03px] top-[366.12px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[858.03px] top-[1086.6px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[884.97px] top-[436.82px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[884.97px] top-[1009.16px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[625.73px] top-[288.68px] w-[37.034px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[625.73px] top-[1157.3px] w-[37.034px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[37.034px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[777.23px] top-[288.68px] w-[37.034px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[777.23px] top-[1157.3px] w-[37.034px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[37.034px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[16.833px] left-[810.9px] top-[362.76px] w-[47.134px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[810.9px] top-[1083.22px] w-[47.134px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[16.833px] relative w-[47.134px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[26.934px] left-[844.56px] top-[431.77px] w-[40.4px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[26.934px] items-center justify-center left-[844.56px] top-[1004.11px] w-[40.4px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[26.934px] relative w-[40.4px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[450.67px] top-[574.86px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[450.67px] top-[857.65px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[423.73px] top-[645.56px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[423.73px] top-[786.95px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[410.26px] top-[716.26px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[959.04px] top-[716.26px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[945.57px] top-[645.56px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[945.57px] top-[786.95px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[918.63px] top-[574.86px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[918.63px] top-[857.65px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[30.3px] left-[884.97px] top-[504.16px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[884.97px] top-[928.35px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.034px] items-center justify-center left-[555.03px] top-[924.99px] w-[329.936px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[37.034px] relative w-[329.936px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[33.667px] left-[595.44px] top-[428.4px] w-[249.135px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[33.667px] items-center justify-center left-[595.43px] top-[1000.74px] w-[249.135px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[33.667px] relative w-[249.135px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[26.934px] left-[629.1px] top-[357.7px] w-[181.801px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[26.934px] items-center justify-center left-[629.1px] top-[1078.18px] w-[181.801px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[26.934px] relative w-[181.801px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[20.2px] left-[662.77px] top-[287px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[20.2px] items-center justify-center left-[662.77px] top-[1155.61px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[20.2px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[40.4px] left-[521.37px] top-[569.8px] w-[397.27px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[50.5px] left-[546.61px] top-[635.46px] w-[346.769px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[50.5px] left-[546.61px] top-[776.85px] w-[346.769px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[50.5px] left-[538.2px] top-[706.16px] w-[363.603px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[40.4px] items-center justify-center left-[521.36px] top-[852.61px] w-[397.27px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[40.4px] relative w-[397.27px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[40.4px] left-[494.43px] top-[640.5px] w-[451.137px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[40.4px] items-center justify-center left-[494.43px] top-[781.91px] w-[451.137px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#db38c8] h-[40.4px] relative w-[451.137px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#db38c8] h-[40.4px] left-[480.96px] top-[711.21px] w-[478.07px]" })
  ] });
}
function Mo() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#2449ed] h-[800px] left-0 overflow-clip top-[6576px] w-[1440px]", "data-name": "-", children: [
    /* @__PURE__ */ e(Co, {}),
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-1/2 not-italic text-[#d9d9d9] text-[164px] text-center top-[calc(50%-56px)] tracking-[-9.84px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.83] mb-0", children: "Submit" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.83]", children: "Work (→)" })
    ] }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+0.5px)] not-italic text-[#d9d9d9] text-[20px] text-center top-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Current Theme (Ownership)" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+0.5px)] not-italic text-[#d9d9d9] text-[20px] text-center top-[696px] tracking-[-0.8px] whitespace-nowrap", children: "View Brief (→)" })
  ] });
}
function So() {
  return /* @__PURE__ */ o("div", { className: "relative size-full", "data-name": "index", children: [
    /* @__PURE__ */ e(Os, {}),
    /* @__PURE__ */ e(Ks, {}),
    /* @__PURE__ */ e(ao, {}),
    /* @__PURE__ */ e(co, {}),
    /* @__PURE__ */ e(uo, {}),
    /* @__PURE__ */ e(No, {}),
    /* @__PURE__ */ e(ko, {}),
    /* @__PURE__ */ e(Mo, {})
  ] });
}
const Lo = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1e3
}, Pe = {
  position: "absolute",
  display: "block",
  pointerEvents: "auto"
};
function ya({ firstNavRoute: t, footerTop: a, extraLinks: l }) {
  return /* @__PURE__ */ o("div", { style: Lo, children: [
    /* @__PURE__ */ e(fe, { to: "/", style: { ...Pe, left: 20, top: 14, width: 80, height: 34 } }),
    /* @__PURE__ */ e(fe, { to: "/submit", style: { ...Pe, right: 20, top: 14, width: 110, height: 34 } }),
    /* @__PURE__ */ e(fe, { to: "/guidelines", style: { ...Pe, right: 186, top: 14, width: 100, height: 34 } }),
    /* @__PURE__ */ e(fe, { to: t, style: { ...Pe, right: 342, top: 14, width: 130, height: 34 } }),
    /* @__PURE__ */ e(fe, { to: "/posters", style: { ...Pe, left: 720, top: a + 58, width: 110, height: 26 } }),
    /* @__PURE__ */ e(fe, { to: "/guidelines", style: { ...Pe, left: 720, top: a + 78, width: 110, height: 26 } }),
    /* @__PURE__ */ e(fe, { to: "/submit", style: { ...Pe, left: 720, top: a + 98, width: 110, height: 26 } }),
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        style: {
          ...Pe,
          left: 1280,
          top: a + 520,
          width: 160,
          height: 26,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0
        }
      }
    ),
    /* @__PURE__ */ e(fe, { to: "/", style: { ...Pe, left: 40, top: a + 520, width: 160, height: 26 } }),
    l
  ] });
}
const jo = 8176, Io = 7376, _o = 6576;
function Eo() {
  return /* @__PURE__ */ o(ka, { designHeight: jo, bg: "#2449ed", children: [
    /* @__PURE__ */ e(So, {}),
    /* @__PURE__ */ e(
      ya,
      {
        firstNavRoute: "/posters",
        footerTop: Io,
        extraLinks: /* @__PURE__ */ e(oa, { children: /* @__PURE__ */ e(
          fe,
          {
            to: "/posters",
            style: {
              position: "absolute",
              display: "block",
              pointerEvents: "auto",
              left: 580,
              top: _o + 688,
              width: 280,
              height: 30
            }
          }
        ) })
      }
    )
  ] });
}
const O = {
  p14ee9e80: "M270.829 81.9969L92.1011 260.726L-52.1014 116.522L68.8016 -4.3807L92.1011 18.9188L149.926 -38.9061L270.829 81.9969Z",
  p14f2dc00: "M0 434.18L243.24 434.183V437.828L0 437.825V434.18Z",
  p15381100: "M215.014 81.9917L92.0881 204.919L3.6875 116.517L68.7886 51.416L92.0881 74.7155L149.913 16.8906L215.014 81.9917Z",
  p16fe0480: "M173.163 81.9841L92.0883 163.06L45.5391 116.509L68.7888 93.2597L92.0883 116.561L149.913 58.7344L173.163 81.9841Z",
  p17c0ce00: "M228.962 81.9891L92.0854 218.867L-10.2656 116.514L68.786 37.4629L92.0854 60.7639L149.91 2.9375L228.962 81.9891Z",
  p18392000: "M187.111 81.9892L92.0856 177.016L31.5859 116.515L68.7861 79.3144L92.0856 102.614L149.91 44.7891L187.111 81.9892Z",
  p1c0bff80: "M159.215 81.9867L92.0909 149.112L59.4922 116.512L68.7914 107.213L92.0909 130.512L149.916 72.6875L159.215 81.9867Z",
  p1cdcb400: "M51.0781 222.562L294.318 222.565V224.995L51.0781 224.993V222.562Z",
  p2239e00: "M21.8906 293.102L265.13 293.105V296.75L21.8906 296.747V293.102Z",
  p236ed00: "M51.0781 649.445H294.318V645.797H51.0781V649.445Z",
  p23acc2d0: "M342.969 872.016H586.208V868.367H342.969V872.016Z",
  p25e77880: "M284.777 81.9941L92.0983 274.674L-66.0547 116.519L68.7988 -18.334L92.0983 4.96707L149.923 -52.8594L284.777 81.9941Z",
  p2b400d00: "M242.925 81.9864L92.0984 232.815L-24.2031 116.512L68.7989 23.5097L92.0984 46.8092L149.923 -11.0156L242.925 81.9864Z",
  p2c237f30: "M20.6738 578.906H263.913V575.258H20.6738V578.906Z",
  p33b8c600: "M256.873 81.9994L92.0957 246.778L-38.1562 116.525L68.7963 9.57224L92.0957 32.8733L149.921 -24.9531L256.873 81.9994Z",
  p36830f80: "M184.863 74.1875L428.103 74.1909V77.8361L184.863 77.8327V74.1875Z",
  p3c38fe00: "M326.636 82.0018L92.1059 316.533L-107.898 116.527L68.8064 -60.1778L92.1059 -36.8783L149.931 -94.7031L326.636 82.0018Z",
  p3c4f4dc0: "M0 363.641L243.24 363.644V367.289L0 367.286V363.641Z",
  p3d43e200: "M201.066 81.9944L92.0908 190.971L17.6406 116.52L68.7913 65.3691L92.0908 88.6702L149.916 30.8438L201.066 81.9944Z",
  p3da6bd00: "M298.724 82.0071L92.0956 288.637L-80.0078 116.532L68.7961 -32.2715L92.0956 -8.97203L149.92 -66.7969L298.724 82.0071Z",
  p3ea33500: "M94.8633 148.375L338.103 148.377V150.807L94.8633 150.805V148.375Z",
  p44d000: "M94.8633 723.633H338.103V719.984H94.8633V723.633Z",
  p7e33b80: "M342.969 0L586.208 0.00340636V3.64859L342.969 3.64519V0Z",
  p7e5c780: "M312.68 82.0044L92.1007 302.585L-93.9531 116.53L68.8013 -46.2246L92.1007 -22.9235L149.926 -80.75L312.68 82.0044Z",
  p8a3ea00: "M0 508.367H243.24V504.719H0V508.367Z",
  p91f4580: "M340.591 82.0069L92.1111 330.489L-121.844 116.532L68.8116 -74.1231L92.1111 -50.822L149.936 -108.648L340.591 82.0069Z",
  pfb727c0: "M184.863 797.82H428.103V794.172H184.863V797.82Z"
}, Bo = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/d356dbbf2d02f78c903bcc39b1a7ff95ac05d5a7.d356dbbf.png", Po = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/ff2033a1c38a4357386d641377703903abf0cb51.ff2033a1.png", Do = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/e353c20b9b160ceed44fa9f8dfbd71844bc63f36.e353c20b.png", Fo = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/ace3413e5a82a9d017f82762129b9755a0ff0588.ace3413e.png", Oo = "/_components/v2/1910781a7b3f6b44555f55b22c221ddf9bc2179b/49a99c5012c102d9fd4cf34cc5a1f852cdfb92ed.49a99c50.png";
function Ao() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute bg-black bottom-[6px] h-[800px] left-1/2 not-italic overflow-clip w-[1440px]", "data-name": "footer", children: [
    /* @__PURE__ */ e("p", { className: "absolute bottom-[228px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(50%-700px)] text-[#d9d9d9] text-[244.441px] tracking-[-14.6664px] translate-y-full uppercase whitespace-nowrap", children: "UNBLOCKED" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] whitespace-nowrap", children: "Question Everything" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(54.17%-49px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] whitespace-nowrap", children: "Explore" }),
    /* @__PURE__ */ e("a", { className: "absolute block font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[calc(83.33%-114px)] text-[#d9d9d9] text-[0px] top-[65px] tracking-[-0.4px] whitespace-nowrap", href: "mailto:hello@offf.barcelona", target: "_blank", children: /* @__PURE__ */ o("p", { className: "cursor-pointer text-[20px]", children: [
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "(h" }),
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "ello@unblocked.net)" })
    ] }) }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[65px] tracking-[-0.4px] w-[118px]", children: "Posters" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[85px] tracking-[-0.4px] w-[118px]", children: "Guidelines" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[105px] tracking-[-0.4px] w-[118px]", children: "(→) Submit" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(8.33%+5px)] text-[#d9d9d9] text-[20px] text-center top-[527px] tracking-[-0.4px] whitespace-nowrap", children: "© Copyright 2026" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(95.83%-52.5px)] text-[#d9d9d9] text-[20px] text-center top-[527px] tracking-[-0.4px] whitespace-nowrap", children: "Back to Top (↑)" }),
    /* @__PURE__ */ o("div", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[21px] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] w-[335px] whitespace-pre-wrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[1.02] mb-0", children: "Exploring ownership, permanence, energy and peers through art, design and culture." }),
      /* @__PURE__ */ e("p", { className: "leading-[1.02] mb-0", children: "​" }),
      /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Built through participation, dialogue and creative expression." })
    ] }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[163px] tracking-[-0.4px] whitespace-nowrap", children: "Socials" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[#d9d9d9] text-[20px] top-[203px] tracking-[-0.4px] whitespace-nowrap", children: "Instagram" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[#d9d9d9] text-[20px] top-[223px] tracking-[-0.4px] whitespace-nowrap", children: "Twitter (X)" })
  ] });
}
function zo() {
  return /* @__PURE__ */ e("div", { className: "absolute h-[872.016px] left-[40.14px] mix-blend-difference top-[295.52px] w-[586.208px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 586.208 872.016", children: /* @__PURE__ */ o("g", { id: "Group 126", children: [
    /* @__PURE__ */ e("path", { d: O.p7e33b80, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156778" }),
    /* @__PURE__ */ e("path", { d: O.p23acc2d0, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156779" }),
    /* @__PURE__ */ e("path", { d: O.p14f2dc00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156782" }),
    /* @__PURE__ */ e("path", { d: O.p3c4f4dc0, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156784" }),
    /* @__PURE__ */ e("path", { d: O.p8a3ea00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156785" }),
    /* @__PURE__ */ e("path", { d: O.p2239e00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156788" }),
    /* @__PURE__ */ e("path", { d: O.p2c237f30, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156789" }),
    /* @__PURE__ */ e("path", { d: O.p1cdcb400, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156792" }),
    /* @__PURE__ */ e("path", { d: O.p236ed00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156793" }),
    /* @__PURE__ */ e("path", { d: O.p3ea33500, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156796" }),
    /* @__PURE__ */ e("path", { d: O.p44d000, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156797" }),
    /* @__PURE__ */ e("path", { d: O.p36830f80, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156800" }),
    /* @__PURE__ */ e("path", { d: O.pfb727c0, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156801" })
  ] }) }) });
}
function To() {
  return /* @__PURE__ */ e("div", { className: "h-[872.016px] relative w-[586.208px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 586.208 872.016", children: /* @__PURE__ */ o("g", { id: "Group 127", children: [
    /* @__PURE__ */ e("path", { d: O.p7e33b80, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156778" }),
    /* @__PURE__ */ e("path", { d: O.p23acc2d0, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156779" }),
    /* @__PURE__ */ e("path", { d: O.p14f2dc00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156782" }),
    /* @__PURE__ */ e("path", { d: O.p3c4f4dc0, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156784" }),
    /* @__PURE__ */ e("path", { d: O.p8a3ea00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156785" }),
    /* @__PURE__ */ e("path", { d: O.p2239e00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156788" }),
    /* @__PURE__ */ e("path", { d: O.p2c237f30, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156789" }),
    /* @__PURE__ */ e("path", { d: O.p1cdcb400, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156792" }),
    /* @__PURE__ */ e("path", { d: O.p236ed00, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156793" }),
    /* @__PURE__ */ e("path", { d: O.p3ea33500, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156796" }),
    /* @__PURE__ */ e("path", { d: O.p44d000, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156797" }),
    /* @__PURE__ */ e("path", { d: O.p36830f80, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156800" }),
    /* @__PURE__ */ e("path", { d: O.pfb727c0, fill: "var(--fill-0, #FF2C3B)", id: "Rectangle 156801" })
  ] }) }) });
}
function Ho() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 absolute contents left-1/2 mix-blend-difference top-[287px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[37.034px] left-[555.03px] mix-blend-difference top-[500.79px] w-[329.936px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[484.33px] mix-blend-difference top-[504.16px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[484.33px] mix-blend-difference top-[928.36px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[26.934px] left-[555.03px] mix-blend-difference top-[431.77px] w-[40.4px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[26.934px] items-center justify-center left-[555.03px] mix-blend-difference top-[1004.11px] w-[40.4px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[26.934px] relative w-[40.4px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[581.97px] mix-blend-difference top-[362.76px] w-[47.134px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[581.97px] mix-blend-difference top-[1083.22px] w-[47.134px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[47.134px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[346.29px] mix-blend-difference top-[722.99px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[1029.73px] mix-blend-difference top-[722.99px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[359.77px] mix-blend-difference top-[652.29px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[359.77px] mix-blend-difference top-[793.69px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[1016.27px] mix-blend-difference top-[652.29px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[1016.27px] mix-blend-difference top-[793.69px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[386.7px] mix-blend-difference top-[581.59px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[386.7px] mix-blend-difference top-[864.39px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[420.36px] mix-blend-difference top-[510.88px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[420.36px] mix-blend-difference top-[935.1px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[955.67px] mix-blend-difference top-[510.88px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[955.67px] mix-blend-difference top-[935.1px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[989.33px] mix-blend-difference top-[581.59px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[989.33px] mix-blend-difference top-[864.39px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[491.06px] mix-blend-difference top-[436.82px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[491.06px] mix-blend-difference top-[1009.16px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[467.5px] mix-blend-difference top-[366.12px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[467.5px] mix-blend-difference top-[1086.6px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e(zo, {}),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[872.016px] items-center justify-center left-[813.65px] mix-blend-difference top-[295.52px] w-[586.208px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e(To, {}) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[376.6px] mix-blend-difference top-[440.18px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[376.6px] mix-blend-difference top-[1012.53px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[1080.23px] mix-blend-difference top-[655.66px] w-[77.434px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[1080.23px] mix-blend-difference top-[797.05px] w-[77.434px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[77.434px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[282.33px] mix-blend-difference top-[655.66px] w-[77.434px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[77.434px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[282.33px] mix-blend-difference top-[797.05px] w-[77.434px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[77.434px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[1093.71px] mix-blend-difference top-[726.36px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[282.33px] mix-blend-difference top-[726.36px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[1019.64px] mix-blend-difference top-[514.26px] w-[87.534px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[1019.64px] mix-blend-difference top-[938.45px] w-[87.534px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[87.534px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[332.83px] mix-blend-difference top-[514.26px] w-[87.534px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[87.534px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[332.83px] mix-blend-difference top-[938.45px] w-[87.534px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[87.534px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[1053.3px] mix-blend-difference top-[584.96px] w-[84.167px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[1053.3px] mix-blend-difference top-[867.75px] w-[84.167px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[84.167px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[302.53px] mix-blend-difference top-[584.96px] w-[84.167px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[84.167px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[302.53px] mix-blend-difference top-[867.75px] w-[84.167px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[84.167px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[948.94px] mix-blend-difference top-[440.18px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[948.94px] mix-blend-difference top-[1012.53px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[10.1px] left-[858.03px] mix-blend-difference top-[366.12px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[10.1px] items-center justify-center left-[858.03px] mix-blend-difference top-[1086.6px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[10.1px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[884.97px] mix-blend-difference top-[436.82px] w-[63.967px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[884.97px] mix-blend-difference top-[1009.16px] w-[63.967px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[63.967px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[625.73px] mix-blend-difference top-[288.68px] w-[37.034px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[625.73px] mix-blend-difference top-[1157.3px] w-[37.034px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[37.034px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[777.23px] mix-blend-difference top-[288.68px] w-[37.034px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[777.23px] mix-blend-difference top-[1157.3px] w-[37.034px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[37.034px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[16.833px] left-[810.9px] mix-blend-difference top-[362.76px] w-[47.134px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.833px] items-center justify-center left-[810.9px] mix-blend-difference top-[1083.22px] w-[47.134px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[16.833px] relative w-[47.134px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[26.934px] left-[844.56px] mix-blend-difference top-[431.77px] w-[40.4px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[26.934px] items-center justify-center left-[844.56px] mix-blend-difference top-[1004.11px] w-[40.4px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[26.934px] relative w-[40.4px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[450.67px] mix-blend-difference top-[574.86px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[450.67px] mix-blend-difference top-[857.65px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[423.73px] mix-blend-difference top-[645.56px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[423.73px] mix-blend-difference top-[786.95px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[410.27px] mix-blend-difference top-[716.26px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[959.04px] mix-blend-difference top-[716.26px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[945.57px] mix-blend-difference top-[645.56px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[945.57px] mix-blend-difference top-[786.95px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[918.63px] mix-blend-difference top-[574.86px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[918.63px] mix-blend-difference top-[857.65px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[30.3px] left-[884.97px] mix-blend-difference top-[504.16px] w-[70.701px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.3px] items-center justify-center left-[884.97px] mix-blend-difference top-[928.36px] w-[70.701px]", children: /* @__PURE__ */ e("div", { className: "-scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[30.3px] relative w-[70.701px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[37.034px] items-center justify-center left-[555.03px] mix-blend-difference top-[924.99px] w-[329.936px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[37.034px] relative w-[329.936px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[33.667px] left-[595.44px] mix-blend-difference top-[428.4px] w-[249.135px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[33.667px] items-center justify-center left-[595.43px] mix-blend-difference top-[1000.75px] w-[249.135px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[33.667px] relative w-[249.135px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[26.934px] left-[629.1px] mix-blend-difference top-[357.7px] w-[181.801px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[26.934px] items-center justify-center left-[629.1px] mix-blend-difference top-[1078.18px] w-[181.801px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[26.934px] relative w-[181.801px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[20.2px] left-[662.77px] mix-blend-difference top-[287px] w-[114.468px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[20.2px] items-center justify-center left-[662.76px] mix-blend-difference top-[1155.61px] w-[114.468px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[20.2px] relative w-[114.468px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[40.4px] left-[521.37px] mix-blend-difference top-[569.8px] w-[397.27px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[50.5px] left-[546.61px] mix-blend-difference top-[635.46px] w-[346.769px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[50.5px] left-[546.61px] mix-blend-difference top-[776.85px] w-[346.769px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[50.5px] left-[538.2px] mix-blend-difference top-[706.16px] w-[363.603px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[40.4px] items-center justify-center left-[521.36px] mix-blend-difference top-[852.61px] w-[397.27px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[40.4px] relative w-[397.27px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[40.4px] left-[494.43px] mix-blend-difference top-[640.5px] w-[451.137px]" }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[40.4px] items-center justify-center left-[494.43px] mix-blend-difference top-[781.91px] w-[451.137px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#ff2c3b] h-[40.4px] relative w-[451.137px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#ff2c3b] h-[40.4px] left-[480.96px] mix-blend-difference top-[711.21px] w-[478.07px]" })
  ] });
}
function $o() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#2951fe] h-[800px] left-0 overflow-clip top-[10930px] w-[1440px]", "data-name": "cta", children: [
    /* @__PURE__ */ e(Ho, {}),
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-1/2 not-italic text-[#d9d9d9] text-[164px] text-center top-[calc(50%-56px)] tracking-[-9.84px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.83] mb-0", children: "Read the" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.83]", children: "Guidelines (→)" })
    ] }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-1/2 not-italic text-[#d9d9d9] text-[20px] text-center top-[40px] tracking-[-0.8px] w-[454px]", children: "Before You Submit. Make sure your work is original, prepared in the correct format, and connected to the current theme." })
  ] });
}
function Go() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] content-stretch flex items-center justify-end left-[20px] px-[4px] py-[2px] top-[20px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#202020] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Sec. 02 (Creative Exploration)" }) });
}
function Vo() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#101010] h-[865px] left-0 overflow-clip top-[3283px] w-[1440px]", "data-name": "exploration", children: [
    /* @__PURE__ */ e("div", { className: "-translate-y-full [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] left-[20px] not-italic text-[#dc91a8] text-[40px] top-[445px] tracking-[-1.6px] w-[690px]", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "This theme invites creatives to question assumptions about control, authority, freedom, and the relationship between individuals and the things they claim as their own." }) }),
    /* @__PURE__ */ e(Go, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[20px] top-[485px] tracking-[-0.8px] w-[335px]", children: "Creative exploration often begins with questions rather than conclusions. What distinguishes ownership from access? What responsibilities come with control? What can truly be owned, and what remains beyond possession?" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(75%+5px)] not-italic text-[#dc91a8] text-[20px] top-[482px] tracking-[-0.8px] w-[335px]", children: "Participants are encouraged to pursue unexpected directions and develop work that introduces curiosity, reflection, and discussion. Whether conceptual, abstract, narrative, or experimental, submissions should show meaningful engagement with the theme while offering a distinctive perspective." }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[465px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function Uo() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] content-stretch flex items-center justify-end left-[20px] px-[4px] py-[2px] top-[20px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#202020] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Sec. 04 (About the Programme)" }) });
}
function Wo() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#101010] h-[1006px] left-0 overflow-clip top-[5148px] w-[1440px]", "data-name": "programme", children: [
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(25%+352px)] not-italic text-[#dc91a8] text-[40px] text-center top-[240px] tracking-[-1.6px] w-[690px]", children: "A creative programme bringing together diverse perspectives through participation, visual expression, public dialogue, and the collective exploration of ideas that shape culture and society." }),
    /* @__PURE__ */ e(Uo, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[20px] top-[706px] tracking-[-0.8px] w-[335px]", children: "Each edition centres on a single theme. Participants respond with one poster that interprets the theme through image, type, symbol, story, or system." }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(75%+5px)] not-italic text-[#dc91a8] text-[20px] top-[703px] tracking-[-0.8px] w-[335px]", children: "Selected works may be featured in an online gallery, publication, exhibition, or other programme materials." }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[686px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function Zo() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] content-stretch flex items-center justify-end left-[20px] px-[4px] py-[2px] top-[20px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#202020] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Sec. 01 (About the Theme)" }) });
}
function Yo() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#101010] h-[845px] left-0 overflow-clip top-[1690px] w-[1440px]", "data-name": "about", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[40px] top-[20px] tracking-[-1.6px] w-[690px]", children: "Ownership is more than possession—it shapes identity, responsibility, freedom and the relationship between people and the things they create, protect and value." }),
    /* @__PURE__ */ e(Zo, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[20px] top-[445px] tracking-[-0.8px] w-[335px]", children: "Ownership is the first theme of UNBLOCKED, inviting artists, designers, and creative thinkers to explore one of the most enduring ideas in human society. While ownership is often associated with property and assets, it also influences how we understand autonomy, stewardship, access, memory, and personal agency." }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(75%+5px)] not-italic text-[#dc91a8] text-[20px] top-[442px] tracking-[-0.8px] w-[335px]", children: "This open call encourages participants to move beyond conventional definitions and examine ownership through cultural, emotional, philosophical, and creative perspectives. The goal is not to communicate a single answer, but to expand the conversation through original visual expression and thoughtful interpretation." }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[425px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function Ko() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[223.39px] top-[165.55px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-black h-[30.342px] left-[223.39px] top-[275.55px] w-[155.503px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-black h-[22.757px] left-[223.39px] top-[237.63px] w-[155.503px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-black h-[15.171px] left-[223.39px] top-[207.27px] w-[155.503px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-black h-[7.586px] left-[223.39px] top-[184.52px] w-[155.503px]" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-black h-[3.793px] left-[223.39px] top-[165.55px] w-[155.503px]" })
  ] });
}
function qo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[223.39px] top-[461.38px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[30.342px] items-center justify-center left-[223.39px] top-[461.38px] w-[155.503px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-black h-[30.342px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[22.757px] items-center justify-center left-[223.39px] top-[506.92px] w-[155.503px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-black h-[22.757px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[15.171px] items-center justify-center left-[223.39px] top-[544.81px] w-[155.503px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-black h-[15.171px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[7.586px] items-center justify-center left-[223.39px] top-[575.17px] w-[155.503px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-black h-[7.586px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[3.793px] items-center justify-center left-[223.39px] top-[597.93px] w-[155.503px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-black h-[3.793px] relative w-[155.503px]" }) }) })
  ] });
}
function Jo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[155.503px] left-[83.05px] top-[305.88px] w-[140.334px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[193.05px] top-[305.88px] w-[30.342px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-black h-[30.342px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[155.12px] top-[305.88px] w-[22.757px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-black h-[22.757px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[124.77px] top-[305.88px] w-[15.171px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-black h-[15.171px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[102.01px] top-[305.88px] w-[7.586px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-black h-[7.586px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[83.05px] top-[305.88px] w-[3.793px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-black h-[3.793px] relative w-[155.503px]" }) }) })
  ] });
}
function Xo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[155.503px] left-[378.88px] top-[305.89px] w-[140.342px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[378.88px] top-[305.89px] w-[30.342px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-black h-[30.342px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[424.41px] top-[305.89px] w-[22.757px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-black h-[22.757px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[462.33px] top-[305.89px] w-[15.171px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-black h-[15.171px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[492.67px] top-[305.89px] w-[7.586px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-black h-[7.586px] relative w-[155.503px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[155.503px] items-center justify-center left-[515.43px] top-[305.89px] w-[3.793px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-black h-[3.793px] relative w-[155.503px]" }) }) })
  ] });
}
function Qo() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[83.05px] top-[165.55px]", children: [
    /* @__PURE__ */ e(Ko, {}),
    /* @__PURE__ */ e(qo, {}),
    /* @__PURE__ */ e(Jo, {}),
    /* @__PURE__ */ e(Xo, {})
  ] });
}
function ec() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-[#dc91a8] h-[766.609px] left-[calc(50%+0.16px)] top-[calc(50%+90.3px)] w-[602px]", children: /* @__PURE__ */ e(Qo, {}) });
}
function tc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-black h-[1690px] left-0 overflow-clip top-0 w-[1440px]", "data-name": "hero", children: [
    /* @__PURE__ */ e(ec, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%-178px)] not-italic text-[#dc91a8] text-[40px] top-[1429px] tracking-[-1.6px] whitespace-nowrap", children: "21.02.26—23.09.26" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [text-underline-position:from-font] [word-break:break-word] absolute decoration-from-font decoration-solid font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.86] left-[calc(50%+0.5px)] not-italic text-[40px] text-[rgba(244,169,192,0.5)] text-center top-[1486px] tracking-[-1.6px] underline whitespace-nowrap", children: "Submission Guidelines (→)" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [text-underline-position:from-font] [word-break:break-word] absolute decoration-from-font decoration-solid font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.86] left-1/2 not-italic text-[40px] text-[rgba(244,169,192,0.5)] text-center top-[1536px] tracking-[-1.6px] underline whitespace-nowrap", children: "Submit Poster (→)" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-1/2 not-italic text-[#f4a9c0] text-[290.738px] text-center top-[59px] tracking-[-17.4443px] whitespace-nowrap", children: "Ownership" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.86] left-1/2 not-italic text-[#f4a9c0] text-[72px] text-center top-[321px] tracking-[-2.88px] whitespace-nowrap", children: "Poster Contest (↓)" })
  ] });
}
function ac() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex font-['Inter:Medium',sans-serif] font-medium gap-[56px] items-center leading-[1.02] not-italic right-[20px] text-[#dc91a8] text-[20px] top-[20px] tracking-[-0.8px] whitespace-nowrap", children: [
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Poster" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Guidelines" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Submit (→)" })
  ] });
}
function lc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-black h-[1690px] left-0 overflow-clip top-0 w-[1440px]", "data-name": "hero", children: [
    /* @__PURE__ */ e(tc, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Home" }),
    /* @__PURE__ */ e(ac, {})
  ] });
}
function ic() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[20px] top-[820px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[32px] top-[836px] tracking-[-1.28px] whitespace-nowrap", children: "Theme Announced" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(83.33%+53px)] not-italic text-[#dc91a8] text-[32px] top-[836px] tracking-[-1.28px] whitespace-nowrap", children: "12.06.2026" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[836px] tracking-[-0.8px] whitespace-nowrap", children: "01" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[820px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function nc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[20px] top-[893px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[32px] top-[909px] tracking-[-1.28px] whitespace-nowrap", children: "Submission Deadline" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(83.33%+53px)] not-italic text-[#dc91a8] text-[32px] top-[909px] tracking-[-1.28px] whitespace-nowrap", children: "12.09.2026" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[909px] tracking-[-0.8px] whitespace-nowrap", children: "02" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[893px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function rc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[20px] top-[966px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[32px] top-[982px] tracking-[-1.28px] whitespace-nowrap", children: "Next Theme Announced" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(83.33%+63px)] not-italic text-[#dc91a8] text-[32px] top-[982px] tracking-[-1.28px] whitespace-nowrap", children: "12.12.2026" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[982px] tracking-[-0.8px] whitespace-nowrap", children: "03" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[966px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function sc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[20px] top-[1039px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[32px] top-[1055px] tracking-[-1.28px] whitespace-nowrap", children: "Selected Works Announced" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(83.33%+62px)] not-italic text-[#dc91a8] text-[32px] top-[1055px] tracking-[-1.28px] whitespace-nowrap", children: "12.10.2026" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[1055px] tracking-[-0.8px] whitespace-nowrap", children: "04" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[1039px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function oc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[20px] top-[1112px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[32px] top-[1128px] tracking-[-1.28px] whitespace-nowrap", children: "Global Exhibition" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(83.33%+56px)] not-italic text-[#dc91a8] text-[32px] top-[1128px] tracking-[-1.28px] whitespace-nowrap", children: "12.06.2027" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[1128px] tracking-[-0.8px] whitespace-nowrap", children: "05" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[1112px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function cc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[20px] top-[1185px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(50%+10px)] not-italic text-[#dc91a8] text-[32px] top-[1201px] tracking-[-1.28px] whitespace-nowrap", children: "Final Publication" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(83.33%+56px)] not-italic text-[#dc91a8] text-[32px] top-[1201px] tracking-[-1.28px] whitespace-nowrap", children: "12.06.2027" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[20px] top-[1201px] tracking-[-0.8px] whitespace-nowrap", children: "06" }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[1185px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function dc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-black h-[1434px] left-0 overflow-clip top-[8512px] w-[1440px]", "data-name": "dates", children: [
    /* @__PURE__ */ e(ic, {}),
    /* @__PURE__ */ e(nc, {}),
    /* @__PURE__ */ e(rc, {}),
    /* @__PURE__ */ e(sc, {}),
    /* @__PURE__ */ e(oc, {}),
    /* @__PURE__ */ e(cc, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%-0.5px)] mix-blend-difference not-italic text-[#dc91a8] text-[20px] text-center top-[540px] tracking-[-0.8px] w-[453px]", children: "The programme unfolds across a series of milestones guiding participants from theme announcement and submission through selection, exhibition, and publication" }),
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%+0.5px)] not-italic text-[#dc91a8] text-[164px] text-center top-[calc(50%-517px)] tracking-[-9.84px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.9] mb-0", children: "Sec.07" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.9]", children: "(Key Dates)" })
    ] })
  ] });
}
function pc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] content-stretch flex items-center justify-end left-[20px] px-[4px] py-[2px] top-[20px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#202020] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Sec. 06 (How It Works)" }) });
}
function fc() {
  return /* @__PURE__ */ e("div", { className: "absolute left-[20px] size-[217px] top-[260px]", "data-name": "checked", children: /* @__PURE__ */ o("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 217 217", children: [
    /* @__PURE__ */ o("g", { clipPath: "url(#clip0_1_336)", id: "checked", children: [
      /* @__PURE__ */ e("path", { d: O.p1c0bff80, id: "Vector 4 (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p16fe0480, id: "Vector 4 (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p18392000, id: "Vector 4 (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p3d43e200, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p15381100, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p17c0ce00, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p2b400d00, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p33b8c600, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p14ee9e80, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p25e77880, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p3da6bd00, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p7e5c780, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p3c38fe00, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" }),
      /* @__PURE__ */ e("path", { d: O.p91f4580, id: "Vector 4 (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke) (Stroke)", stroke: "var(--stroke-0, #DC91A8)", strokeLinejoin: "round", strokeWidth: "1.64406" })
    ] }),
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e("clipPath", { id: "clip0_1_336", children: /* @__PURE__ */ e("rect", { fill: "white", height: "217", width: "217" }) }) })
  ] }) });
}
function xc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#101010] h-[1105px] left-0 overflow-clip top-[7407px] w-[1440px]", "data-name": "how -it-works", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(66.67%-467px)] not-italic text-[#dc91a8] text-[72px] top-[260px] tracking-[-2.88px] w-[927px]", children: "Read the contest overview (→) Review the current theme (→) Read the submission guidelines (→) Create an original poster (→) Submit your entry through the form (→)" }),
    /* @__PURE__ */ e("p", { className: "[text-underline-position:from-font] [word-break:break-word] absolute decoration-from-font decoration-solid font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.86] left-[calc(45.83%-167px)] not-italic text-[40px] text-[rgba(244,169,192,0.5)] top-[956px] tracking-[-1.6px] underline whitespace-nowrap", children: "Submit Work (→)" }),
    /* @__PURE__ */ e(pc, {}),
    /* @__PURE__ */ e(fc, {}),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[240px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) })
  ] });
}
function uc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] content-stretch flex items-center justify-end left-[20px] px-[4px] py-[2px] top-[20px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#101010] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Sec. 05 (Jury Members)" }) });
}
function hc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#f4a8c0] h-[509px] left-[calc(66.67%+7px)] overflow-clip top-[444px] w-[453px]", children: /* @__PURE__ */ e("div", { className: "absolute left-0 mix-blend-luminosity size-[509px] top-0", "data-name": "image 40", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover opacity-75 pointer-events-none size-full", src: Bo }) }) });
}
function mc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-black h-[1253px] left-0 overflow-clip top-[6154px] w-[1440px]", "data-name": "jury", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[40px] top-[240px] tracking-[-1.6px] w-[690px]", children: "The poster contest will be reviewed by jury members working across design, technology, culture, branding, and visual communication." }),
    /* @__PURE__ */ e(uc, {}),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[424px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #DC91A8)" }) }) }) }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[20px] not-italic text-[#dc91a8] text-[72px] top-[831px] tracking-[-2.88px] whitespace-nowrap", children: "Kyle Fletcher" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[20px] not-italic text-[72px] text-[rgba(220,145,168,0.5)] top-[904px] tracking-[-2.88px] whitespace-nowrap", children: "Johns Beharry" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[20px] not-italic text-[72px] text-[rgba(220,145,168,0.5)] top-[977px] tracking-[-2.88px] whitespace-nowrap", children: "Lewis Webber" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] left-[calc(25%+92px)] not-italic text-[#dc91a8] text-[72px] top-[831px] tracking-[-2.88px] whitespace-nowrap", children: "(→)" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(66.67%+7px)] not-italic text-[#dc91a8] text-[20px] top-[993px] tracking-[-0.8px] w-[453px]", children: "Brand creative and campaign direction, with experience shaping cultural work across music, identity, and visual systems." }),
    /* @__PURE__ */ e(hc, {})
  ] });
}
function vc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] content-stretch flex items-center justify-end left-[calc(66.67%+99px)] px-[4px] py-[2px] top-[20px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#43a772] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Coming Next" }) });
}
function bc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[153.75px] left-[410px] top-[49px] w-[184.25px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[518.75px] top-[49px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[564.25px] top-[49px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[481.25px] top-[49px] w-[22.5px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[451.25px] top-[49px] w-[15px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[428.75px] top-[49px] w-[7.5px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[410px] top-[49px] w-[3.75px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function wc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[153.75px] left-[297px] top-[202.75px] w-[183.75px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[342px] top-[202.75px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 -scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[297px] top-[202.75px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 -scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[387px] top-[202.75px] w-[22.5px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 -scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[424.5px] top-[202.75px] w-[15px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 -scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[454.5px] top-[202.75px] w-[7.5px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 -scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[477px] top-[202.75px] w-[3.75px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 -scale-y-100 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function gc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[153.75px] left-[443px] top-[356.5px] w-[187.5px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[491.75px] top-[356.5px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[443px] top-[356.5px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[30px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[536.75px] top-[356.5px] w-[22.5px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[22.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[574.25px] top-[356.5px] w-[15px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[15px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[604.25px] top-[356.5px] w-[7.5px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[7.5px] relative w-[153.75px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[153.75px] items-center justify-center left-[626.75px] top-[356.5px] w-[3.75px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#272727] h-[3.75px] relative w-[153.75px]" }) }) })
  ] });
}
function Nc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[297px] top-[49px]", children: [
    /* @__PURE__ */ e(bc, {}),
    /* @__PURE__ */ e(wc, {}),
    /* @__PURE__ */ e(gc, {})
  ] });
}
function kc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#369462] h-[560px] left-[calc(33.33%+13px)] top-[404px] w-[927px]", children: /* @__PURE__ */ e(Nc, {}) });
}
function yc() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute bottom-[40px] content-stretch flex flex-col gap-[40px] items-start left-[20px] not-italic text-[#272727] w-[335px]", children: [
    /* @__PURE__ */ e("div", { className: "flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] relative shrink-0 text-[40px] tracking-[-1.6px] w-full", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Why is everything disposable?" }) }),
    /* @__PURE__ */ e("p", { className: "font-['Inter:Medium',sans-serif] font-medium leading-[1.02] relative shrink-0 text-[20px] tracking-[-0.8px] w-full", children: "Products. Memories. Platforms. Relationships. Why are so many things designed to disappear?" })
  ] });
}
function Rc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#43a772] h-[984px] left-0 overflow-clip top-[9946px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(54.17%-287px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] whitespace-nowrap", children: "Permanence" }),
    /* @__PURE__ */ e(vc, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(4.17%-40px)] not-italic text-[#272727] text-[100px] top-[calc(50%-472px)] tracking-[-6px] whitespace-nowrap", children: "02" }),
    /* @__PURE__ */ e(kc, {}),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[389px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #272727)" }) }) }) }),
    /* @__PURE__ */ e(yc, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(91.67%+101px)] not-italic text-[#272727] text-[20px] text-right top-[349px] tracking-[-0.8px] whitespace-nowrap", children: "Decay" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-full [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(4.17%-5px)] not-italic text-[#272727] text-[20px] text-right top-[349px] tracking-[-0.8px] whitespace-nowrap", children: "(vs)" })
  ] });
}
function Cc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#3b3b3b] h-[473.855px] left-[20px] overflow-clip top-[108px] w-[335px]", "data-name": "A4 - 1", children: /* @__PURE__ */ e("div", { className: "-translate-x-1/2 absolute h-[724.498px] left-[calc(50%-0.03px)] top-[-122.35px] w-[334.944px]", "data-name": "image 54", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full", src: Po }) }) });
}
function Mc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#3b3b3b] h-[474.067px] left-[calc(16.67%+17px)] overflow-clip top-[765px] w-[335px]", "data-name": "A4 - 3", children: /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[470.214px] left-[calc(50%+0.09px)] top-[calc(50%+0.01px)] w-[352.66px]", "data-name": "image 56", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full", src: Do }) }) });
}
function Sc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#3b3b3b] h-[474.029px] left-[calc(50%+10px)] overflow-clip top-[108px] w-[335px]", "data-name": "A4 - 2", children: /* @__PURE__ */ e("div", { className: "absolute h-[500.511px] left-[-0.48px] top-[-13.6px] w-[335.763px]", "data-name": "image 55", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full", src: Fo }) }) });
}
function Lc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#3b3b3b] h-[471.071px] left-[calc(66.67%+7px)] overflow-clip top-[768px] w-[335px]", "data-name": "A4 - 4", children: /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute h-[670.653px] left-[calc(50%+0.39px)] top-[calc(50%+2.92px)] w-[335.783px]", "data-name": "image 57", children: /* @__PURE__ */ e("img", { alt: "", className: "absolute inset-0 max-w-none object-cover pointer-events-none size-full", src: Oo }) }) });
}
function jc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-black h-[1000px] left-0 overflow-clip top-[4148px] w-[1440px]", "data-name": "references", children: [
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-1/2 mix-blend-difference not-italic text-[#dc91a8] text-[164px] text-center top-[calc(50%-200px)] tracking-[-9.84px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.9] mb-0", children: "Sec.03" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.9]", children: "(References)" })
    ] }),
    /* @__PURE__ */ e(Cc, {}),
    /* @__PURE__ */ e(Mc, {}),
    /* @__PURE__ */ e(Sc, {}),
    /* @__PURE__ */ e(Lc, {}),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%-0.5px)] mix-blend-difference not-italic text-[#dc91a8] text-[20px] text-center top-[640px] tracking-[-0.8px] w-[335px]", children: "These references are provided as creative inspiration rather than stylistic direction." })
  ] });
}
function Ic() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-[#865b68] content-stretch flex flex-col items-center justify-center left-[calc(70.83%-9.5px)] top-[calc(50%+0.5px)] w-[859px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[1087.742px] text-black tracking-[-43.5097px] w-full", children: "O" }) });
}
function _c() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-[#ab7284] content-stretch flex flex-col items-center justify-center left-[calc(62.5%+8.5px)] top-[calc(50%+0.5px)] w-[859px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[1087.742px] text-black tracking-[-43.5097px] w-full", children: "O" }) });
}
function Ec() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-[#865b68] content-stretch flex flex-col items-center justify-center left-[calc(29.17%+9.5px)] top-[calc(50%+0.5px)] w-[859px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[1087.742px] text-black tracking-[-43.5097px] w-full", children: "O" }) });
}
function Bc() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-[#ab7284] content-stretch flex flex-col items-center justify-center left-[calc(37.5%-8.5px)] top-[calc(50%+0.5px)] w-[859px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[1087.742px] text-black tracking-[-43.5097px] w-full", children: "O" }) });
}
function Pc() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-[#dc91a8] content-stretch flex flex-col items-center justify-center left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] w-[859px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[1087.742px] text-black tracking-[-43.5097px] w-full", children: "O" }) });
}
function Dc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#f4a8c0] h-[748px] left-0 overflow-clip top-[2535px] w-[1440px]", "data-name": "break", children: [
    /* @__PURE__ */ e(Ic, {}),
    /* @__PURE__ */ e(_c, {}),
    /* @__PURE__ */ e(Ec, {}),
    /* @__PURE__ */ e(Bc, {}),
    /* @__PURE__ */ e(Pc, {})
  ] });
}
function Fc() {
  return /* @__PURE__ */ o("div", { className: "relative size-full", "data-name": "poster", children: [
    /* @__PURE__ */ e(Ao, {}),
    /* @__PURE__ */ e($o, {}),
    /* @__PURE__ */ e(Vo, {}),
    /* @__PURE__ */ e(Wo, {}),
    /* @__PURE__ */ e(Yo, {}),
    /* @__PURE__ */ e(lc, {}),
    /* @__PURE__ */ e(dc, {}),
    /* @__PURE__ */ e(xc, {}),
    /* @__PURE__ */ e(mc, {}),
    /* @__PURE__ */ e(Rc, {}),
    /* @__PURE__ */ e(jc, {}),
    /* @__PURE__ */ e(Dc, {})
  ] });
}
const Oc = 12536, Ac = 11730, zc = 10930;
function Tc() {
  return /* @__PURE__ */ o(ka, { designHeight: Oc, bg: "#000", children: [
    /* @__PURE__ */ e(Fc, {}),
    /* @__PURE__ */ e(
      ya,
      {
        firstNavRoute: "/posters",
        footerTop: Ac,
        extraLinks: /* @__PURE__ */ o(oa, { children: [
          /* @__PURE__ */ e(
            fe,
            {
              to: "/guidelines",
              style: {
                position: "absolute",
                display: "block",
                pointerEvents: "auto",
                left: 400,
                top: 1476,
                width: 640,
                height: 34
              }
            }
          ),
          /* @__PURE__ */ e(
            fe,
            {
              to: "/guidelines",
              style: {
                position: "absolute",
                display: "block",
                pointerEvents: "auto",
                left: 100,
                top: zc + 260,
                width: 1240,
                height: 320
              }
            }
          )
        ] })
      }
    )
  ] });
}
const Qe = {
  p1176af80: "M16.0029 11.1934H4V8.80469H16.0029V11.1934Z",
  p3c692780: "M11.1914 8.80273H16.0029V11.1914H11.1914V16.0029H8.80273V11.1914H4V8.80273H8.80273V4H11.1914V8.80273Z"
};
function Hc() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex font-['Inter:Medium',sans-serif] font-medium gap-[56px] items-center leading-[1.02] not-italic right-[20px] text-[#fff0f0] text-[20px] top-[20px] tracking-[-0.8px] whitespace-nowrap", children: [
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Posters" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Guidelines" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0", children: "Submit (→)" })
  ] });
}
function $c() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-[1267.5px] mix-blend-difference top-[316px] w-[185.5px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1267.5px] top-[316px] w-[10px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[10px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1413px] top-[316px] w-[40px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[40px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1362.5px] top-[316px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[30px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1322.5px] top-[316px] w-[20px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[20px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1292.5px] top-[316px] w-[10px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[10px] relative w-[205px]" }) }) })
  ] });
}
function Gc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-[1074px] mix-blend-difference top-[316px] w-[185.5px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1219.5px] top-[316px] w-[40px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[40px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1169.5px] top-[316px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[30px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1129.5px] top-[316px] w-[20px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[20px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1099.5px] top-[316px] w-[10px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[10px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1074px] top-[316px] w-[5px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[5px] relative w-[205px]" }) }) })
  ] });
}
function Vc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[125px] left-[1881px] mix-blend-difference top-[396px] w-[413px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[125px] items-center justify-center left-[2204.7px] top-[396px] w-[89.297px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[89.297px] relative w-[125px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[125px] items-center justify-center left-[2093.09px] top-[396px] w-[66.973px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[66.973px] relative w-[125px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[125px] items-center justify-center left-[2003.79px] top-[396px] w-[44.649px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[44.649px] relative w-[125px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[125px] items-center justify-center left-[1936.81px] top-[396px] w-[22.324px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[22.324px] relative w-[125px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[125px] items-center justify-center left-[1881px] top-[396px] w-[22.324px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[22.324px] relative w-[125px]" }) }) })
  ] });
}
function Uc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-[661px] mix-blend-difference top-[111px] w-[413px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[984.7px] top-[111px] w-[89.297px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[89.297px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[893px] top-[111px] w-[66.973px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[66.973px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[783.79px] top-[111px] w-[44.649px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[44.649px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[661px] top-[111px] w-[11.162px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[11.162px] relative w-[205px]" }) }) })
  ] });
}
function Wc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-[1453px] mix-blend-difference top-[111px] w-[635px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1821px] top-[111px] w-[267px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[267px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1642.56px] top-[111px] w-[89.297px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[89.297px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1453px] top-[111px] w-[22.324px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#ec0011] h-[22.324px] relative w-[205px]" }) }) })
  ] });
}
function Zc() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[661px] mix-blend-difference top-[111px]", children: [
    /* @__PURE__ */ e($c, {}),
    /* @__PURE__ */ e(Gc, {}),
    /* @__PURE__ */ e(Vc, {}),
    /* @__PURE__ */ e(Uc, {}),
    /* @__PURE__ */ e(Wc, {})
  ] });
}
function Yc() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#2850fe] h-[585px] left-0 overflow-clip top-0 w-[1440px]", "data-name": "hero", children: [
    /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-[calc(50%-700px)] not-italic text-[#d9d9d9] text-[91.361px] top-[57px] tracking-[-3.6545px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.9] mb-0", children: "Submissions" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.9] mb-0", children: "Guidelines" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.9]", children: "(↓)" })
    ] }),
    /* @__PURE__ */ e(Hc, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[#fff0f0] text-[20px] top-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Home" }),
    /* @__PURE__ */ e(Zc, {})
  ] });
}
function Kc() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex flex-col font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start leading-[1.02] left-[20px] not-italic text-[20px] top-[771px] tracking-[-0.8px] w-[453px]", children: [
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[#272727] w-full", children: "Submission Process" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[rgba(39,39,39,0.5)] w-full", children: "Who Can Submit" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[rgba(39,39,39,0.5)] w-full", children: "What You Need Before Submitting" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[rgba(39,39,39,0.5)] w-full", children: "Poster Information" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[rgba(39,39,39,0.5)] w-full", children: "Rules" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[rgba(39,39,39,0.5)] w-full", children: "Judging Process" }),
    /* @__PURE__ */ e("p", { className: "relative shrink-0 text-[rgba(39,39,39,0.5)] w-full", children: "After Submission" })
  ] });
}
function qc() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] content-stretch flex items-center justify-end left-[20px] top-[691px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Sections" }) });
}
function Jc() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "1", children: /* @__PURE__ */ o("li", { className: "leading-[1.02] ms-[30px]", children: [
      "Visit the ",
      /* @__PURE__ */ e("span", { className: "[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline", children: "poster contest page" }),
      "."
    ] }) })
  ] });
}
function Xc() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "2", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Read the contest overview." }) }) })
  ] });
}
function Qc() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "3", children: /* @__PURE__ */ o("li", { className: "leading-[1.02] ms-[30px]", children: [
      "Review the ",
      /* @__PURE__ */ e("span", { className: "[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid underline", children: "Ownership" }),
      " theme."
    ] }) })
  ] });
}
function ed() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "4", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Create one or more original poster responses." }) }) })
  ] });
}
function td() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "5", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Prepare your poster file or files and any supporting assets." }) }) })
  ] });
}
function ad() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "6", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Open the submit page." }) }) })
  ] });
}
function ld() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "7", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Complete the participant information." }) }) })
  ] });
}
function id() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "8", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Complete the poster information." }) }) })
  ] });
}
function nd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "9", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Upload the required files." }) }) })
  ] });
}
function rd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "10", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Accept the consent and copyright confirmations." }) }) })
  ] });
}
function sd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ol", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] list-decimal not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", start: "11", children: /* @__PURE__ */ e("li", { className: "ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Submit your entry." }) }) })
  ] });
}
function od() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(Jc, {}),
    /* @__PURE__ */ e(Xc, {}),
    /* @__PURE__ */ e(Qc, {}),
    /* @__PURE__ */ e(ed, {}),
    /* @__PURE__ */ e(td, {}),
    /* @__PURE__ */ e(ad, {}),
    /* @__PURE__ */ e(ld, {}),
    /* @__PURE__ */ e(id, {}),
    /* @__PURE__ */ e(nd, {}),
    /* @__PURE__ */ e(rd, {}),
    /* @__PURE__ */ e(sd, {})
  ] });
}
function cd() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[40px] items-start left-[calc(50%+10px)] top-[691px] w-[690px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[40px] tracking-[-1.6px] w-full", children: "Submission Process" }),
    /* @__PURE__ */ e(od, {})
  ] });
}
function dd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Designers" }) }) })
  ] });
}
function pd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Artists" }) }) })
  ] });
}
function fd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Illustrators" }) }) })
  ] });
}
function xd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Typographers" }) }) })
  ] });
}
function ud() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Students" }) }) })
  ] });
}
function hd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Studios" }) }) })
  ] });
}
function md() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Independent creatives" }) }) })
  ] });
}
function vd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Collaborative groups" }) }) })
  ] });
}
function bd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(dd, {}),
    /* @__PURE__ */ e(pd, {}),
    /* @__PURE__ */ e(fd, {}),
    /* @__PURE__ */ e(xd, {}),
    /* @__PURE__ */ e(ud, {}),
    /* @__PURE__ */ e(hd, {}),
    /* @__PURE__ */ e(md, {}),
    /* @__PURE__ */ e(vd, {})
  ] });
}
function wd() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[40px] items-start left-[calc(50%+10px)] top-[1344px] w-[690px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[40px] tracking-[-1.6px] w-full", children: "Who Can Submit" }),
    /* @__PURE__ */ e(bd, {})
  ] });
}
function gd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your full name." }) }) })
  ] });
}
function Nd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your email address." }) }) })
  ] });
}
function kd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your country and city." }) }) })
  ] });
}
function yd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your website or Instagram, if available." }) }) })
  ] });
}
function Rd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your poster title." }) }) })
  ] });
}
function Cd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your poster concept." }) }) })
  ] });
}
function Md() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Your final poster file or files." }) }) })
  ] });
}
function Sd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(gd, {}),
    /* @__PURE__ */ e(Nd, {}),
    /* @__PURE__ */ e(kd, {}),
    /* @__PURE__ */ e(yd, {}),
    /* @__PURE__ */ e(Rd, {}),
    /* @__PURE__ */ e(Cd, {}),
    /* @__PURE__ */ e(Md, {})
  ] });
}
function Ld() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[40px] items-start left-[calc(50%+10px)] top-[1865px] w-[690px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[40px] tracking-[-1.6px] w-full", children: "What You Need Before Submitting" }),
    /* @__PURE__ */ e(Sd, {})
  ] });
}
function jd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The purpose of the poster." }) }) })
  ] });
}
function Id() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The message being communicated." }) }) })
  ] });
}
function _d() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The creative thinking process." }) }) })
  ] });
}
function Ed() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The design decisions." }) }) })
  ] });
}
function Bd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "How the work responds to Ownership." }) }) })
  ] });
}
function Pd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(jd, {}),
    /* @__PURE__ */ e(Id, {}),
    /* @__PURE__ */ e(_d, {}),
    /* @__PURE__ */ e(Ed, {}),
    /* @__PURE__ */ e(Bd, {})
  ] });
}
function Dd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: "Your submission should explain the idea behind the work. Use the poster concept field to describe:" }),
    /* @__PURE__ */ e(Pd, {})
  ] });
}
function Fd() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[40px] items-start left-[calc(50%+10px)] top-[2342px] w-[690px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[40px] tracking-[-1.6px] w-full", children: "Poster Information" }),
    /* @__PURE__ */ e(Dd, {})
  ] });
}
function Od() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Submitted work must be original." }) }) })
  ] });
}
function Ad() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "You must have the right to submit the work." }) }) })
  ] });
}
function zd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Submitted work must be original." }) }) })
  ] });
}
function Td() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "You must have the right to submit the work." }) }) })
  ] });
}
function Hd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Publication or exhibition versions may be requested later." }) }) })
  ] });
}
function $d() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(Od, {}),
    /* @__PURE__ */ e(Ad, {}),
    /* @__PURE__ */ e(zd, {}),
    /* @__PURE__ */ e(Td, {}),
    /* @__PURE__ */ e(Hd, {})
  ] });
}
function Gd() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[40px] items-start left-[calc(50%+10px)] top-[2795px] w-[690px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[40px] tracking-[-1.6px] w-full", children: "Rules" }),
    /* @__PURE__ */ e($d, {})
  ] });
}
function Vd() {
  return /* @__PURE__ */ o("div", { className: "[word-break:break-word] absolute content-stretch flex flex-col gap-[40px] items-start leading-[1.02] left-[calc(50%+10px)] not-italic text-[#272727] top-[4650px] w-[690px]", children: [
    /* @__PURE__ */ e("p", { className: "font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[40px] tracking-[-1.6px] w-full", children: "After Submission" }),
    /* @__PURE__ */ e("p", { className: "font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[20px] tracking-[-0.8px] w-full", children: "After submitting, you should receive a confirmation message or email. Please do not close or exit the page while your submission is uploading." })
  ] });
}
function Ud() {
  return /* @__PURE__ */ e("div", { className: "bg-[#272727] content-stretch flex items-center justify-end relative shrink-0", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Accepted" }) });
}
function Wd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex gap-[8px] items-start relative shrink-0", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Status" }),
    /* @__PURE__ */ e(Ud, {})
  ] });
}
function Zd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Round 1 (Accepted)" }),
    /* @__PURE__ */ e(Wd, {})
  ] });
}
function Yd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "round", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e(Zd, {})
  ] });
}
function Kd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "Submitted work must be original." }) }) })
  ] });
}
function qd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "You must have the right to submit the work." }) }) })
  ] });
}
function Jd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(Kd, {}),
    /* @__PURE__ */ e(qd, {})
  ] });
}
function Xd() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: "Your work has been viewed by the team, considered eligible, and successfully accepted into the poster contest." }),
    /* @__PURE__ */ e(Jd, {})
  ] });
}
function Qd() {
  return /* @__PURE__ */ e("div", { className: "bg-[#272727] content-stretch flex items-center justify-end relative shrink-0", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Under Review" }) });
}
function ep() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex gap-[8px] items-start relative shrink-0", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Status" }),
    /* @__PURE__ */ e(Qd, {})
  ] });
}
function tp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Round 2 (Potential Selection)" }),
    /* @__PURE__ */ e(ep, {})
  ] });
}
function ap() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[690px]", "data-name": "round", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e(tp, {})
  ] });
}
function lp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has actively discussed the work." }) }) })
  ] });
}
function ip() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has reviewed its strengths." }) }) })
  ] });
}
function np() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has considered it for future selection." }) }) })
  ] });
}
function rp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(lp, {}),
    /* @__PURE__ */ e(ip, {}),
    /* @__PURE__ */ e(np, {})
  ] });
}
function sp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[690px]", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: "Your work has been highlighted as a potential selection." }),
    /* @__PURE__ */ e(rp, {})
  ] });
}
function op() {
  return /* @__PURE__ */ e("div", { className: "bg-[#272727] content-stretch flex items-center justify-end relative shrink-0", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Shortlisted" }) });
}
function cp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex gap-[8px] items-start relative shrink-0", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Status" }),
    /* @__PURE__ */ e(op, {})
  ] });
}
function dp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Round 3 (Exceptional Merit)" }),
    /* @__PURE__ */ e(cp, {})
  ] });
}
function pp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[690px]", "data-name": "round", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e(dp, {})
  ] });
}
function fp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has actively discussed the work." }) }) })
  ] });
}
function xp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has reviewed its strengths." }) }) })
  ] });
}
function up() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has considered it for future selection." }) }) })
  ] });
}
function hp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(fp, {}),
    /* @__PURE__ */ e(xp, {}),
    /* @__PURE__ */ e(up, {})
  ] });
}
function mp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[690px]", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: "Your work has been highlighted as a potential selection." }),
    /* @__PURE__ */ e(hp, {})
  ] });
}
function vp() {
  return /* @__PURE__ */ e("div", { className: "bg-[#272727] content-stretch flex items-center justify-end relative shrink-0", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Selected" }) });
}
function bp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex gap-[8px] items-start relative shrink-0", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Status" }),
    /* @__PURE__ */ e(vp, {})
  ] });
}
function wp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Round 4 (Selected)" }),
    /* @__PURE__ */ e(bp, {})
  ] });
}
function gp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[690px]", "data-name": "round", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e(wp, {})
  ] });
}
function Np() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has actively discussed the work." }) }) })
  ] });
}
function kp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has reviewed its strengths." }) }) })
  ] });
}
function yp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "The jury has considered it for future selection." }) }) })
  ] });
}
function Rp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(Np, {}),
    /* @__PURE__ */ e(kp, {}),
    /* @__PURE__ */ e(yp, {})
  ] });
}
function Cp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[690px]", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: "Your work has been highlighted as a potential selection." }),
    /* @__PURE__ */ e(Rp, {})
  ] });
}
function Mp() {
  return /* @__PURE__ */ e("div", { className: "content-stretch flex items-start relative shrink-0", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "Accepted (→) Under Review (→) Shortlisted (→) Selected" }) });
}
function Sp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Progress Overview" }),
    /* @__PURE__ */ e(Mp, {})
  ] });
}
function Lp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[690px]", "data-name": "round", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e(Sp, {})
  ] });
}
function jp() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[40px] items-start left-[calc(50%+10px)] top-[3184px] w-[690px]", "data-name": "judging-process", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] min-w-full not-italic relative shrink-0 text-[#272727] text-[40px] tracking-[-1.6px] w-[min-content]", children: "Judging Process" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] min-w-full not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-[min-content]", children: "The competition review process takes place across four rounds. During each round, submitted posters are reviewed and either progress to the next stage or conclude their journey. Each round represents a different level of selection and feedback." }),
    /* @__PURE__ */ e(Yd, {}),
    /* @__PURE__ */ e(Xd, {}),
    /* @__PURE__ */ e(ap, {}),
    /* @__PURE__ */ e(sp, {}),
    /* @__PURE__ */ e(pp, {}),
    /* @__PURE__ */ e(mp, {}),
    /* @__PURE__ */ e(gp, {}),
    /* @__PURE__ */ e(Cp, {}),
    /* @__PURE__ */ e(Lp, {})
  ] });
}
function Ip() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p3c692780, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function _p() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "What is UNBLOCKED?" }),
    /* @__PURE__ */ e(Ip, {})
  ] });
}
function Ep() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(_p, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function Bp() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p3c692780, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function Pp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Who can participate in the poster contest?" }),
    /* @__PURE__ */ e(Bp, {})
  ] });
}
function Dp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(Pp, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function Fp() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p3c692780, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function Op() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Do I need professional experience to submit?" }),
    /* @__PURE__ */ e(Fp, {})
  ] });
}
function Ap() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(Op, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function zp() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p3c692780, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function Tp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "Can I submit multiple entries?" }),
    /* @__PURE__ */ e(zp, {})
  ] });
}
function Hp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(Tp, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function $p() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p3c692780, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function Gp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "What themes can I respond to?" }),
    /* @__PURE__ */ e($p, {})
  ] });
}
function Vp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(Gp, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function Up() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p3c692780, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function Wp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "What file types can I submit?" }),
    /* @__PURE__ */ e(Up, {})
  ] });
}
function Zp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(Wp, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function Yp() {
  return /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", "data-name": "plus", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { id: "plus", children: /* @__PURE__ */ e("path", { d: Qe.p1176af80, fill: "var(--fill-0, #272727)", id: "Union" }) }) }) });
}
function Kp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", "data-name": "group", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[25px] tracking-[-1px] whitespace-nowrap", children: "What do I get if I win?" }),
    /* @__PURE__ */ e(Yp, {})
  ] });
}
function qp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "1st Place (£500)" }) }) })
  ] });
}
function Jp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "2st Place (£300)" }) }) })
  ] });
}
function Xp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) }),
    /* @__PURE__ */ e("ul", { className: "[word-break:break-word] block font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: /* @__PURE__ */ e("li", { className: "list-disc ms-[30px]", children: /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "3rd Place (£100)" }) }) })
  ] });
}
function Qp() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full", "data-name": "list", children: [
    /* @__PURE__ */ e(qp, {}),
    /* @__PURE__ */ e(Jp, {}),
    /* @__PURE__ */ e(Xp, {})
  ] });
}
function ef() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#272727] text-[20px] tracking-[-0.8px] w-full", children: "Winning entries receive recognition across our channels and programme materials, with selected works becoming part of the broader exhibition experience." }),
    /* @__PURE__ */ e(Qp, {})
  ] });
}
function tf() {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full", "data-name": "faq", children: [
    /* @__PURE__ */ e(Kp, {}),
    /* @__PURE__ */ e(ef, {}),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-[690px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 690 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H690", id: "line", stroke: "var(--stroke-0, black)", strokeOpacity: "0.25" }) }) }) })
  ] });
}
function af() {
  return /* @__PURE__ */ o("div", { className: "absolute content-stretch flex flex-col gap-[20px] items-start left-[calc(50%+10px)] top-[4991px] w-[690px]", children: [
    /* @__PURE__ */ e(Ep, {}),
    /* @__PURE__ */ e(Dp, {}),
    /* @__PURE__ */ e(Ap, {}),
    /* @__PURE__ */ e(Hp, {}),
    /* @__PURE__ */ e(Vp, {}),
    /* @__PURE__ */ e(Zp, {}),
    /* @__PURE__ */ e(tf, {})
  ] });
}
function lf() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-[#272727] content-stretch flex items-center justify-end left-[20px] top-[4991px]", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] tracking-[-0.8px] whitespace-nowrap", children: "FAQs" }) });
}
function nf() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#d9d9d9] h-[5890px] left-0 top-[585px] w-[1440px]", "data-name": "-", children: [
    /* @__PURE__ */ e(Kc, {}),
    /* @__PURE__ */ e(qc, {}),
    /* @__PURE__ */ e("div", { className: "-translate-y-full [word-break:break-word] absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] left-[calc(50%+10px)] not-italic text-[40px] text-black top-[471px] tracking-[-1.6px] w-[690px]", children: /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "UNBLOCKED seeks provocative poster work that challenges the everyday – from visual politics to personal manifesto, from editorial critique to insurgent imagery. Everyone is invited. For this first edition, special focus is on poster responses that interrogate Ownership, asking what it means to take, give, claim, resist, and remake authorship and shared space." }) }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[671px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #272727)" }) }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute h-0 left-[20px] top-[4971px] w-[1400px]", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 1400 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H1400", id: "line", stroke: "var(--stroke-0, #272727)" }) }) }) }),
    /* @__PURE__ */ o("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[20px] not-italic text-[20px] text-[rgba(39,39,39,0.5)] top-[20px] tracking-[-0.8px] w-[335px]", children: [
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "This page explains how to prepare and submit work for the poster contest. The first theme is " }),
      /* @__PURE__ */ e("span", { className: "[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[1.02] underline", children: "Ownership" }),
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "." })
    ] }),
    /* @__PURE__ */ e(cd, {}),
    /* @__PURE__ */ e(wd, {}),
    /* @__PURE__ */ e(Ld, {}),
    /* @__PURE__ */ e(Fd, {}),
    /* @__PURE__ */ e(Gd, {}),
    /* @__PURE__ */ e(Vd, {}),
    /* @__PURE__ */ e(jp, {}),
    /* @__PURE__ */ e(af, {}),
    /* @__PURE__ */ e(lf, {})
  ] });
}
function rf() {
  return /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute bg-black bottom-0 h-[800px] left-1/2 not-italic overflow-clip w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ e("p", { className: "absolute bottom-[228px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(50%-700px)] text-[#d9d9d9] text-[244.441px] tracking-[-14.6664px] translate-y-full uppercase whitespace-nowrap", children: "UNBLOCKED" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] whitespace-nowrap", children: "Contact Us" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(54.17%-49px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] whitespace-nowrap", children: "Explore" }),
    /* @__PURE__ */ e("a", { className: "absolute block font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[calc(83.33%-114px)] text-[#d9d9d9] text-[0px] top-[65px] tracking-[-0.4px] whitespace-nowrap", href: "mailto:hello@offf.barcelona", target: "_blank", children: /* @__PURE__ */ o("p", { className: "cursor-pointer text-[20px]", children: [
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "(h" }),
      /* @__PURE__ */ e("span", { className: "leading-[1.02]", children: "ello@unblocked.net)" })
    ] }) }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[65px] tracking-[-0.4px] w-[118px]", children: "Ownership" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[85px] tracking-[-0.4px] w-[118px]", children: "Guidelines" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+11px)] text-[#d9d9d9] text-[20px] top-[105px] tracking-[-0.4px] w-[118px]", children: "(→) Submit" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(8.33%+5px)] text-[#d9d9d9] text-[20px] text-center top-[527px] tracking-[-0.4px] whitespace-nowrap", children: "© Copyright 2026" }),
    /* @__PURE__ */ e("p", { className: "-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(95.83%-52.5px)] text-[#d9d9d9] text-[20px] text-center top-[527px] tracking-[-0.4px] whitespace-nowrap", children: "Back to Top (↑)" }),
    /* @__PURE__ */ o("div", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-[21px] text-[20px] text-[rgba(217,217,217,0.5)] top-[20px] tracking-[-0.4px] w-[335px] whitespace-pre-wrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[1.02] mb-0", children: "Exploring ownership, permanence, energy and peers through art, design and culture." }),
      /* @__PURE__ */ e("p", { className: "leading-[1.02] mb-0", children: "​" }),
      /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Built through participation, dialogue and creative expression." })
    ] }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[20px] text-[rgba(217,217,217,0.5)] top-[163px] tracking-[-0.4px] whitespace-nowrap", children: "Socials" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[#d9d9d9] text-[20px] top-[203px] tracking-[-0.4px] whitespace-nowrap", children: "Instagram" }),
    /* @__PURE__ */ e("p", { className: "absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(79.17%-54px)] text-[#d9d9d9] text-[20px] top-[223px] tracking-[-0.4px] whitespace-nowrap", children: "Twitter (X)" })
  ] });
}
function sf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-0 mix-blend-difference top-[467px] w-[185px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[175px] top-[467px] w-[10px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[10px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-0 top-[467px] w-[40px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[40px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[60px] top-[467px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[30px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[110px] top-[467px] w-[20px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[20px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[150px] top-[467px] w-[10px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[10px] relative w-[205px]" }) }) })
  ] });
}
function of() {
  return /* @__PURE__ */ e("div", { className: "absolute contents h-[205px] left-[193px] mix-blend-difference top-[467px] w-[167px]", children: /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[193px] top-[467px] w-[167px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[167px] relative w-[205px]" }) }) }) });
}
function cf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-[374px] mix-blend-difference top-[467px] w-[215px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[374px] top-[467px] w-[40px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[40px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[464px] top-[467px] w-[30px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[30px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[514px] top-[467px] w-[20px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[20px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[554px] top-[467px] w-[10px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[10px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[584px] top-[467px] w-[5px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[5px] relative w-[205px]" }) }) })
  ] });
}
function df() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[205px] left-[932px] mix-blend-difference top-[414px] w-[413px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[932px] top-[414px] w-[89.297px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[89.297px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1046.03px] top-[414px] w-[66.973px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[66.973px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1177.56px] top-[414px] w-[44.649px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[44.649px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1333.84px] top-[414px] w-[11.162px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[11.162px] relative w-[205px]" }) }) })
  ] });
}
function pf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[520px] left-[322px] mix-blend-difference top-[-106px] w-[1217.002px]", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[200px] items-center justify-center left-[322px] top-[-106px] w-[267px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[267px] relative w-[200px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1344.7px] top-[209px] w-[89.297px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[89.297px] relative w-[205px]" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[205px] items-center justify-center left-[1516.67px] top-[208.99px] w-[22.324px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#ff0004] h-[22.324px] relative w-[205px]" }) }) })
  ] });
}
function ff() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-0 mix-blend-difference top-[-106px]", children: [
    /* @__PURE__ */ e(sf, {}),
    /* @__PURE__ */ e(of, {}),
    /* @__PURE__ */ e(cf, {}),
    /* @__PURE__ */ e(df, {}),
    /* @__PURE__ */ e(pf, {})
  ] });
}
function xf() {
  return /* @__PURE__ */ o("div", { className: "absolute bg-[#2951fe] h-[800px] left-0 overflow-clip top-[6475px] w-[1440px]", "data-name": ".", children: [
    /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-1/2 not-italic text-[#d9d9d9] text-[164px] text-center top-[calc(50%-136px)] tracking-[-9.84px] whitespace-nowrap", children: [
      /* @__PURE__ */ e("p", { className: "leading-[0.83] mb-0", children: "Submit" }),
      /* @__PURE__ */ e("p", { className: "leading-[0.83]", children: "Entry (→)" })
    ] }),
    /* @__PURE__ */ e(ff, {})
  ] });
}
function uf() {
  return /* @__PURE__ */ o("div", { className: "relative size-full", "data-name": "guidelines", children: [
    /* @__PURE__ */ e(Yc, {}),
    /* @__PURE__ */ e(nf, {}),
    /* @__PURE__ */ e(rf, {}),
    /* @__PURE__ */ e(xf, {})
  ] });
}
const hf = 8075, mf = 7275;
function vf() {
  return /* @__PURE__ */ o(ka, { designHeight: hf, bg: "#2850fe", children: [
    /* @__PURE__ */ e(uf, {}),
    /* @__PURE__ */ e(
      ya,
      {
        firstNavRoute: "/posters",
        footerTop: mf
      }
    )
  ] });
}
function bf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[120.97px] top-[89.65px]", "data-name": "Container", children: [
    /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] h-[16.431px] left-[120.97px] top-[149.22px] w-[84.209px]", "data-name": "Rounded rectangle" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] h-[12.323px] left-[120.97px] top-[128.68px] w-[84.209px]", "data-name": "Rounded rectangle" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] h-[8.216px] left-[120.97px] top-[112.24px] w-[84.209px]", "data-name": "Rounded rectangle" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] h-[4.108px] left-[120.97px] top-[99.93px] w-[84.209px]", "data-name": "Rounded rectangle" }),
    /* @__PURE__ */ e("div", { className: "absolute bg-[#dc91a8] h-[2.054px] left-[120.97px] top-[89.65px] w-[84.209px]", "data-name": "Rounded rectangle" })
  ] });
}
function wf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[120.97px] top-[249.85px]", "data-name": "Container", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[16.431px] items-center justify-center left-[120.97px] top-[249.85px] w-[84.209px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[16.431px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[12.323px] items-center justify-center left-[120.97px] top-[274.51px] w-[84.209px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[12.323px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[8.216px] items-center justify-center left-[120.97px] top-[295.03px] w-[84.209px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[8.216px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[4.108px] items-center justify-center left-[120.97px] top-[311.47px] w-[84.209px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[4.108px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[2.054px] items-center justify-center left-[120.97px] top-[323.8px] w-[84.209px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-180", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[2.054px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) })
  ] });
}
function gf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[84.209px] left-[44.97px] top-[165.64px] w-[75.994px]", "data-name": "Container", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[104.54px] top-[165.65px] w-[16.431px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[16.431px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[84px] top-[165.65px] w-[12.323px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[12.323px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[67.57px] top-[165.65px] w-[8.216px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[8.216px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[55.24px] top-[165.65px] w-[4.108px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[4.108px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[44.97px] top-[165.65px] w-[2.054px]", children: /* @__PURE__ */ e("div", { className: "-rotate-90 flex-none", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[2.054px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) })
  ] });
}
function Nf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents h-[84.209px] left-[205.17px] top-[165.65px] w-[75.999px]", "data-name": "Container", children: [
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[205.18px] top-[165.65px] w-[16.431px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[16.431px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[229.83px] top-[165.65px] w-[12.323px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[12.323px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[250.36px] top-[165.65px] w-[8.216px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[8.216px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[266.79px] top-[165.65px] w-[4.108px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[4.108px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) }),
    /* @__PURE__ */ e("div", { className: "absolute flex h-[84.209px] items-center justify-center left-[279.12px] top-[165.65px] w-[2.054px]", children: /* @__PURE__ */ e("div", { className: "flex-none rotate-90", children: /* @__PURE__ */ e("div", { className: "bg-[#dc91a8] h-[2.054px] relative w-[84.209px]", "data-name": "Rounded rectangle" }) }) })
  ] });
}
function kf() {
  return /* @__PURE__ */ o("div", { className: "absolute contents left-[44.98px] top-[89.65px]", "data-name": "Container", children: [
    /* @__PURE__ */ e(bf, {}),
    /* @__PURE__ */ e(wf, {}),
    /* @__PURE__ */ e(gf, {}),
    /* @__PURE__ */ e(Nf, {})
  ] });
}
function yf() {
  return /* @__PURE__ */ e("div", { className: "-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[415.141px] left-[calc(20.83%-12px)] top-[calc(50%+0.57px)] w-[326px]", "data-name": "illustration", children: /* @__PURE__ */ e(kf, {}) });
}
function Rf() {
  return /* @__PURE__ */ e("div", { className: "absolute bg-black h-[918px] left-[calc(33.33%+96px)] top-0 w-[864px]", "data-name": "content-container" });
}
function Cf() {
  return /* @__PURE__ */ o("div", { className: "bg-[#dc91a8] relative size-full", "data-name": "submit / submitted", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[20px] not-italic text-[20px] text-black top-[20px] tracking-[-0.8px] whitespace-nowrap", children: "(←) Home" }),
    /* @__PURE__ */ e(yf, {}),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] absolute bottom-[132.93px] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0.9] left-[calc(20.83%-280px)] not-italic text-[112.123px] text-black tracking-[-6.7274px] translate-y-full whitespace-nowrap", children: "Ownership" }),
    /* @__PURE__ */ e(Rf, {})
  ] });
}
function Ke({
  value: t,
  onChange: a,
  placeholder: l,
  opacity: i = 0.5
}) {
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[11px] items-start pt-[21px] relative shrink-0 w-full", children: [
    /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        value: t,
        onChange: (r) => a(r.target.value),
        placeholder: l,
        className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[20px] tracking-[-0.8px] w-full bg-transparent border-none outline-none p-0",
        style: {
          color: t ? "#dc91a8" : `rgba(220,145,168,${i})`
        }
      }
    ),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 406 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H406", stroke: "#DC91A8", strokeOpacity: i }) }) }) })
  ] });
}
function Mf({
  value: t,
  onChange: a,
  placeholder: l,
  options: i,
  opacity: r = 0.5
}) {
  const [n, s] = se(!1);
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[11px] items-start pt-[21px] relative shrink-0 w-full", children: [
    /* @__PURE__ */ o("div", { className: "content-stretch flex items-center justify-between relative shrink-0 w-full", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => s(!n),
          className: "flex-1 text-left bg-transparent border-none outline-none p-0 cursor-pointer [word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic text-[20px] tracking-[-0.8px]",
          style: {
            color: t ? "#dc91a8" : `rgba(220,145,168,${r})`
          },
          children: t || l
        }
      ),
      /* @__PURE__ */ e("div", { className: "relative shrink-0 size-[20px]", children: /* @__PURE__ */ e("svg", { className: "absolute block inset-0 size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 20 20", children: /* @__PURE__ */ e("g", { children: /* @__PURE__ */ e("path", { d: "M6 8L10 12L14 8", stroke: "#DC91A8" }) }) }) })
    ] }),
    n && /* @__PURE__ */ o(oa, { children: [
      /* @__PURE__ */ e(
        "div",
        {
          className: "fixed inset-0 z-10",
          onClick: () => s(!1)
        }
      ),
      /* @__PURE__ */ e("div", { className: "absolute left-0 right-0 top-full mt-1 bg-black border border-[rgba(220,145,168,0.4)] max-h-[300px] overflow-y-auto z-20", children: i.map((c) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => {
            a(c), s(!1);
          },
          className: "w-full text-left bg-transparent border-none outline-none px-3 py-2 cursor-pointer font-['Inter:Medium',sans-serif] font-medium leading-[1.02] text-[20px] tracking-[-0.8px] text-[#dc91a8] hover:bg-[rgba(220,145,168,0.1)]",
          children: c
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 406 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H406", stroke: "#DC91A8", strokeOpacity: r }) }) }) })
  ] });
}
function Sf({
  value: t,
  onChange: a,
  placeholder: l,
  opacity: i = 0.5
}) {
  const r = se(null), n = (s) => {
    s && (s.style.height = "auto", s.style.height = s.scrollHeight + "px");
  };
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[11px] items-start pt-[21px] relative shrink-0 w-full", children: [
    /* @__PURE__ */ e(
      "textarea",
      {
        ref: (s) => {
          r[0] = s, n(s);
        },
        value: t,
        onChange: (s) => {
          a(s.target.value), n(s.target);
        },
        placeholder: l,
        rows: 1,
        className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[20px] tracking-[-0.8px] w-full bg-transparent border-none outline-none p-0 resize-none overflow-hidden",
        style: {
          color: t ? "#dc91a8" : `rgba(220,145,168,${i})`,
          minHeight: "160px"
        }
      }
    ),
    /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 406 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H406", stroke: "#DC91A8", strokeOpacity: i }) }) }) })
  ] });
}
function xl({
  title: t,
  subtitle: a,
  optional: l = !1,
  opacity: i = 0.5
}) {
  const [r, n] = se(null), [s, c] = se(!1), p = se(null), f = (m) => {
    n(m);
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "h-[176px] relative shrink-0 w-full cursor-pointer",
      onDragOver: (m) => {
        m.preventDefault(), m.stopPropagation(), c(!0);
      },
      onDragLeave: (m) => {
        m.preventDefault(), m.stopPropagation(), c(!1);
      },
      onDrop: (m) => {
        m.preventDefault(), m.stopPropagation(), c(!1), m.dataTransfer.files && m.dataTransfer.files.length > 0 && f(m.dataTransfer.files);
      },
      onClick: () => p[0]?.click(),
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            "aria-hidden": !0,
            className: "absolute border border-solid inset-[-0.5px] pointer-events-none transition-colors",
            style: {
              borderColor: s ? "#dc91a8" : `rgba(220,145,168,${i * 0.8})`,
              backgroundColor: s ? "rgba(220,145,168,0.05)" : "transparent"
            }
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            ref: (m) => p[0] = m,
            type: "file",
            multiple: !0,
            className: "hidden",
            onChange: (m) => f(m.target.files),
            accept: t === "Poster Files" ? "image/jpeg,image/png,image/gif,video/mp4" : void 0
          }
        ),
        /* @__PURE__ */ o("p", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-[calc(50%+0.5px)] not-italic text-[#dc91a8] text-[20px] text-center tracking-[-0.8px] whitespace-nowrap", style: { top: a ? "calc(50% - 44px)" : "calc(50% - 26px)" }, children: [
          t,
          l && " (Optional)"
        ] }),
        a && /* @__PURE__ */ o("div", { className: "-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[0] left-1/2 not-italic text-[14px] text-center top-[calc(50%-20px)] tracking-[-0.56px] whitespace-nowrap", style: { color: `rgba(220,145,168,${i})` }, children: [
          /* @__PURE__ */ e("p", { className: "leading-[1.02] mb-0", children: "Static: JPG, PNG, GIF up to 2000px wide under 4mb." }),
          /* @__PURE__ */ e("p", { className: "leading-[1.02]", children: "Motion: GIF or MP4 up to 2000px wide under 20mb." })
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: (m) => {
              m.stopPropagation(), p[0]?.click();
            },
            className: "-translate-x-1/2 [text-underline-position:from-font] [word-break:break-word] absolute decoration-from-font decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[1.02] left-1/2 not-italic text-[#dc91a8] text-center tracking-[-0.64px] underline whitespace-nowrap cursor-pointer bg-transparent border-none p-0 pointer-events-auto",
            style: {
              top: l ? "calc(50% + 10px)" : "calc(50% + 28px)",
              fontSize: a ? "16px" : "20px"
            },
            children: "Browse"
          }
        )
      ]
    }
  );
}
function Lf({
  number: t,
  data: a,
  onChange: l,
  onRemove: i,
  canRemove: r,
  opacity: n = 0.5
}) {
  const s = Array.from({ length: 50 }, (c, p) => ((/* @__PURE__ */ new Date()).getFullYear() - p).toString());
  return /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": `poster-${t}`, children: [
    /* @__PURE__ */ o("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#dc91a8] text-[20px] tracking-[-0.8px] w-full", children: [
      "Poster ",
      t
    ] }),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.title,
        onChange: (c) => l({ ...a, title: c }),
        placeholder: "Poster Title",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Mf,
      {
        value: a.year,
        onChange: (c) => l({ ...a, year: c }),
        placeholder: "Year Designed",
        options: s,
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.designedFor,
        onChange: (c) => l({ ...a, designedFor: c }),
        placeholder: "Designed For",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.clientName,
        onChange: (c) => l({ ...a, clientName: c }),
        placeholder: "Client Name",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.creationMethod,
        onChange: (c) => l({ ...a, creationMethod: c }),
        placeholder: "Creation Method",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.materialsUsed,
        onChange: (c) => l({ ...a, materialsUsed: c }),
        placeholder: "Materials Used",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.digitalPrograms,
        onChange: (c) => l({ ...a, digitalPrograms: c }),
        placeholder: "Digital Programs Used",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Ke,
      {
        value: a.printingMethod,
        onChange: (c) => l({ ...a, printingMethod: c }),
        placeholder: "Printing Method",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      Sf,
      {
        value: a.concept,
        onChange: (c) => l({ ...a, concept: c }),
        placeholder: "Poster Concept",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      xl,
      {
        title: "Poster Files",
        subtitle: "file requirements",
        opacity: n
      }
    ),
    /* @__PURE__ */ e(
      xl,
      {
        title: "Supporting Assets",
        optional: !0,
        opacity: n
      }
    ),
    r && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: i,
        className: "h-[52px] relative shrink-0 w-full bg-transparent border border-solid cursor-pointer p-0",
        style: { borderColor: `rgba(220,145,168,${n * 0.8})` },
        children: /* @__PURE__ */ e("div", { className: "flex flex-row items-center justify-center size-full", children: /* @__PURE__ */ e("div", { className: "content-stretch flex items-center justify-center px-[146px] py-[26px] relative size-full", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#dc91a8] text-[20px] text-center tracking-[-0.8px] whitespace-nowrap", children: "(-) Remove This Poster" }) }) })
      }
    )
  ] });
}
function jf() {
  const [t, a] = se([
    {
      title: "",
      year: "",
      designedFor: "",
      clientName: "",
      creationMethod: "",
      materialsUsed: "",
      digitalPrograms: "",
      printingMethod: "",
      concept: ""
    }
  ]), l = (n, s) => {
    const c = [...t];
    c[n] = s, a(c);
  }, i = () => {
    a([
      ...t,
      {
        title: "",
        year: "",
        designedFor: "",
        clientName: "",
        creationMethod: "",
        materialsUsed: "",
        digitalPrograms: "",
        printingMethod: "",
        concept: ""
      }
    ]);
  }, r = (n) => {
    t.length > 1 && a(t.filter((s, c) => c !== n));
  };
  return /* @__PURE__ */ e("div", { className: "bg-black relative size-full", "data-name": "all-fields", children: /* @__PURE__ */ e("div", { className: "absolute w-full left-0 top-0 px-[20px] max-w-[800px] mx-auto", style: { left: "50%", transform: "translateX(-50%)" }, children: /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[48px] items-start pt-[252px] w-full max-w-[406px] mx-auto pb-[100px]", children: [
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.02] not-italic relative shrink-0 text-[#dc91a8] text-[40px] tracking-[-1.6px] w-full", children: "Poster Entries" }),
    /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#dc91a8] text-[20px] tracking-[-0.8px] w-full", children: "Provide your contact details so we can communicate important updates regarding your submission." }),
    t.map((n, s) => /* @__PURE__ */ e(
      Lf,
      {
        number: s + 1,
        data: n,
        onChange: (c) => l(s, c),
        onRemove: () => r(s),
        canRemove: t.length > 1,
        opacity: s === 0 ? 0.5 : 0.4
      },
      s
    )),
    /* @__PURE__ */ o("div", { className: "content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full", "data-name": "add-more", children: [
      /* @__PURE__ */ e("div", { className: "h-0 relative shrink-0 w-full", "data-name": "line", children: /* @__PURE__ */ e("div", { className: "absolute inset-[-0.5px_0]", children: /* @__PURE__ */ e("svg", { className: "block size-full", fill: "none", preserveAspectRatio: "none", viewBox: "0 0 406 1", children: /* @__PURE__ */ e("path", { d: "M0 0.5H406", stroke: "#DC91A8", strokeOpacity: "0.4" }) }) }) }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: i,
          className: "h-[52px] relative shrink-0 w-full bg-transparent border border-[rgba(220,145,168,0.4)] border-solid cursor-pointer p-0",
          children: /* @__PURE__ */ e("div", { className: "flex flex-row items-center justify-center size-full", children: /* @__PURE__ */ e("div", { className: "content-stretch flex items-center justify-center px-[146px] py-[26px] relative size-full", children: /* @__PURE__ */ e("p", { className: "[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[1.02] not-italic relative shrink-0 text-[#dc91a8] text-[20px] text-center tracking-[-0.8px] whitespace-nowrap", children: "(+) Add Another Poster" }) }) })
        }
      )
    ] })
  ] }) }) });
}
function If() {
  return /* @__PURE__ */ o("div", { className: "flex h-screen overflow-hidden flex-col md:flex-row", children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: "hidden md:block md:w-[calc(33.33%+96px)] md:min-w-[280px] h-screen overflow-hidden relative flex-shrink-0",
        children: [
          /* @__PURE__ */ e("div", { className: "relative w-[1440px] h-full", children: /* @__PURE__ */ e(Cf, {}) }),
          /* @__PURE__ */ e(
            fe,
            {
              to: "/",
              className: "absolute top-3 left-3 w-[100px] h-8 block z-10"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex-1 h-screen bg-black relative",
        children: [
          /* @__PURE__ */ o(
            "div",
            {
              className: "sticky top-0 left-0 right-0 h-[112px] bg-black z-20 flex-shrink-0 pointer-events-none",
              children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: "absolute top-0 left-0 w-[181px] h-[2px] bg-[#dc91a8]"
                  }
                ),
                /* @__PURE__ */ o(
                  "div",
                  {
                    className: "absolute top-5 left-5 font-['Inter',sans-serif] text-base font-medium tracking-[-0.64px] leading-[1.62] whitespace-nowrap",
                    children: [
                      /* @__PURE__ */ e("span", { className: "text-[rgba(220,145,168,0.5)]", children: "(01)" }),
                      /* @__PURE__ */ e("br", {}),
                      /* @__PURE__ */ e("span", { className: "text-[#dc91a8]", children: "(02)" }),
                      /* @__PURE__ */ e("span", { className: "text-[#dc91a8] ml-6", children: "Poster" }),
                      /* @__PURE__ */ e("br", {}),
                      /* @__PURE__ */ e("span", { className: "text-[rgba(220,145,168,0.5)]", children: "(03)" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: "h-[calc(100vh-112px)] overflow-y-auto overflow-x-hidden",
              children: /* @__PURE__ */ e(jf, {})
            }
          ),
          /* @__PURE__ */ e(
            fe,
            {
              to: "/posters",
              className: "absolute bottom-[46px] left-5 font-['Inter',sans-serif] text-base font-medium text-[#dc91a8] no-underline tracking-[-0.64px] z-30 hover:opacity-80",
              children: "(←)"
            }
          )
        ]
      }
    )
  ] });
}
const _f = Kr([
  {
    path: "/",
    Component: Eo
  },
  {
    path: "/posters",
    Component: Tc
  },
  {
    path: "/guidelines",
    Component: vf
  },
  {
    path: "/submit",
    Component: If
  }
]);
function Ef() {
  return /* @__PURE__ */ e(kr, { router: _f });
}
const Bf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ef
}, Symbol.toStringTag, { value: "Module" }));
export {
  Pf as Code0_8
};
