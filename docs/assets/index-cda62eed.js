(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver(s => {
    for (const o of s)
      if (o.type === 'childList')
        for (const i of o.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerpolicy && (o.referrerPolicy = s.referrerpolicy),
      s.crossorigin === 'use-credentials'
        ? (o.credentials = 'include')
        : s.crossorigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function ur(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? s => !!n[s.toLowerCase()] : s => !!n[s];
}
function fr(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = oe(r) ? oi(r) : fr(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (oe(e)) return e;
    if (ee(e)) return e;
  }
}
const ni = /;(?![^(]*\))/g,
  ri = /:([^]+)/,
  si = /\/\*.*?\*\//gs;
function oi(e) {
  const t = {};
  return (
    e
      .replace(si, '')
      .split(ni)
      .forEach(n => {
        if (n) {
          const r = n.split(ri);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function ar(e) {
  let t = '';
  if (oe(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const r = ar(e[n]);
      r && (t += r + ' ');
    }
  else if (ee(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const ii =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  li = ur(ii);
function Ns(e) {
  return !!e || e === '';
}
const X = {},
  vt = [],
  we = () => {},
  ci = () => !1,
  ui = /^on[^a-z]/,
  yn = e => ui.test(e),
  dr = e => e.startsWith('onUpdate:'),
  fe = Object.assign,
  hr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  fi = Object.prototype.hasOwnProperty,
  K = (e, t) => fi.call(e, t),
  D = Array.isArray,
  Dt = e => En(e) === '[object Map]',
  ai = e => En(e) === '[object Set]',
  k = e => typeof e == 'function',
  oe = e => typeof e == 'string',
  pr = e => typeof e == 'symbol',
  ee = e => e !== null && typeof e == 'object',
  Ls = e => ee(e) && k(e.then) && k(e.catch),
  di = Object.prototype.toString,
  En = e => di.call(e),
  hi = e => En(e).slice(8, -1),
  pi = e => En(e) === '[object Object]',
  mr = e => oe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  un = ur(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  xn = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
  },
  mi = /-(\w)/g,
  wt = xn(e => e.replace(mi, (t, n) => (n ? n.toUpperCase() : ''))),
  gi = /\B([A-Z])/g,
  St = xn(e => e.replace(gi, '-$1').toLowerCase()),
  Ds = xn(e => e.charAt(0).toUpperCase() + e.slice(1)),
  Fn = xn(e => (e ? `on${Ds(e)}` : '')),
  Kt = (e, t) => !Object.is(e, t),
  Mn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  dn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  js = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let jr;
const _i = () =>
  jr ||
  (jr =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {});
let Ie;
class ks {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ie),
      !t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Ie;
      try {
        return (Ie = this), t();
      } finally {
        Ie = n;
      }
    }
  }
  on() {
    Ie = this;
  }
  off() {
    Ie = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function bi(e) {
  return new ks(e);
}
function vi(e, t = Ie) {
  t && t.active && t.effects.push(e);
}
const gr = e => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Hs = e => (e.w & Je) > 0,
  Us = e => (e.n & Je) > 0,
  yi = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Je;
  },
  Ei = e => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        Hs(s) && !Us(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Je),
          (s.n &= ~Je);
      }
      t.length = n;
    }
  },
  Vn = new WeakMap();
let Nt = 0,
  Je = 1;
const qn = 30;
let ye;
const lt = Symbol(''),
  Yn = Symbol('');
class _r {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      vi(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ye,
      n = qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ye),
        (ye = this),
        (qe = !0),
        (Je = 1 << ++Nt),
        Nt <= qn ? yi(this) : kr(this),
        this.fn()
      );
    } finally {
      Nt <= qn && Ei(this),
        (Je = 1 << --Nt),
        (ye = this.parent),
        (qe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ye === this
      ? (this.deferStop = !0)
      : this.active &&
        (kr(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function kr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const Ks = [];
function Tt() {
  Ks.push(qe), (qe = !1);
}
function It() {
  const e = Ks.pop();
  qe = e === void 0 ? !0 : e;
}
function ge(e, t, n) {
  if (qe && ye) {
    let r = Vn.get(e);
    r || Vn.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = gr())), zs(s);
  }
}
function zs(e, t) {
  let n = !1;
  Nt <= qn ? Us(e) || ((e.n |= Je), (n = !Hs(e))) : (n = !e.has(ye)),
    n && (e.add(ye), ye.deps.push(e));
}
function je(e, t, n, r, s, o) {
  const i = Vn.get(e);
  if (!i) return;
  let c = [];
  if (t === 'clear') c = [...i.values()];
  else if (n === 'length' && D(e)) {
    const l = js(r);
    i.forEach((a, f) => {
      (f === 'length' || f >= l) && c.push(a);
    });
  } else
    switch ((n !== void 0 && c.push(i.get(n)), t)) {
      case 'add':
        D(e)
          ? mr(n) && c.push(i.get('length'))
          : (c.push(i.get(lt)), Dt(e) && c.push(i.get(Yn)));
        break;
      case 'delete':
        D(e) || (c.push(i.get(lt)), Dt(e) && c.push(i.get(Yn)));
        break;
      case 'set':
        Dt(e) && c.push(i.get(lt));
        break;
    }
  if (c.length === 1) c[0] && Qn(c[0]);
  else {
    const l = [];
    for (const a of c) a && l.push(...a);
    Qn(gr(l));
  }
}
function Qn(e, t) {
  const n = D(e) ? e : [...e];
  for (const r of n) r.computed && Hr(r);
  for (const r of n) r.computed || Hr(r);
}
function Hr(e, t) {
  (e !== ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const xi = ur('__proto__,__v_isRef,__isVue'),
  Ws = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter(e => e !== 'arguments' && e !== 'caller')
      .map(e => Symbol[e])
      .filter(pr)
  ),
  wi = br(),
  Pi = br(!1, !0),
  Ri = br(!0),
  Ur = Ci();
function Ci() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
      e[t] = function (...n) {
        const r = W(this);
        for (let o = 0, i = this.length; o < i; o++) ge(r, 'get', o + '');
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(W)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
      e[t] = function (...n) {
        Tt();
        const r = W(this)[t].apply(this, n);
        return It(), r;
      };
    }),
    e
  );
}
function br(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === '__v_isReactive') return !e;
    if (s === '__v_isReadonly') return e;
    if (s === '__v_isShallow') return t;
    if (s === '__v_raw' && o === (e ? (t ? Ui : Zs) : t ? Qs : Ys).get(r))
      return r;
    const i = D(r);
    if (!e && i && K(Ur, s)) return Reflect.get(Ur, s, o);
    const c = Reflect.get(r, s, o);
    return (pr(s) ? Ws.has(s) : xi(s)) || (e || ge(r, 'get', s), t)
      ? c
      : ce(c)
      ? i && mr(s)
        ? c
        : c.value
      : ee(c)
      ? e
        ? Js(c)
        : Xe(c)
      : c;
  };
}
const Oi = Vs(),
  Ai = Vs(!0);
function Vs(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (Pt(i) && ce(i) && !ce(s)) return !1;
    if (
      !e &&
      (!hn(s) && !Pt(s) && ((i = W(i)), (s = W(s))), !D(n) && ce(i) && !ce(s))
    )
      return (i.value = s), !0;
    const c = D(n) && mr(r) ? Number(r) < n.length : K(n, r),
      l = Reflect.set(n, r, s, o);
    return (
      n === W(o) && (c ? Kt(s, i) && je(n, 'set', r, s) : je(n, 'add', r, s)), l
    );
  };
}
function Si(e, t) {
  const n = K(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && je(e, 'delete', t, void 0), r;
}
function Ti(e, t) {
  const n = Reflect.has(e, t);
  return (!pr(t) || !Ws.has(t)) && ge(e, 'has', t), n;
}
function Ii(e) {
  return ge(e, 'iterate', D(e) ? 'length' : lt), Reflect.ownKeys(e);
}
const qs = { get: wi, set: Oi, deleteProperty: Si, has: Ti, ownKeys: Ii },
  $i = {
    get: Ri,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Bi = fe({}, qs, { get: Pi, set: Ai }),
  vr = e => e,
  wn = e => Reflect.getPrototypeOf(e);
function en(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = W(e),
    o = W(t);
  n || (t !== o && ge(s, 'get', t), ge(s, 'get', o));
  const { has: i } = wn(s),
    c = r ? vr : n ? wr : zt;
  if (i.call(s, t)) return c(e.get(t));
  if (i.call(s, o)) return c(e.get(o));
  e !== s && e.get(t);
}
function tn(e, t = !1) {
  const n = this.__v_raw,
    r = W(n),
    s = W(e);
  return (
    t || (e !== s && ge(r, 'has', e), ge(r, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function nn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ge(W(e), 'iterate', lt), Reflect.get(e, 'size', e)
  );
}
function Kr(e) {
  e = W(e);
  const t = W(this);
  return wn(t).has.call(t, e) || (t.add(e), je(t, 'add', e, e)), this;
}
function zr(e, t) {
  t = W(t);
  const n = W(this),
    { has: r, get: s } = wn(n);
  let o = r.call(n, e);
  o || ((e = W(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? Kt(t, i) && je(n, 'set', e, t) : je(n, 'add', e, t), this
  );
}
function Wr(e) {
  const t = W(this),
    { has: n, get: r } = wn(t);
  let s = n.call(t, e);
  s || ((e = W(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && je(t, 'delete', e, void 0), o;
}
function Vr() {
  const e = W(this),
    t = e.size !== 0,
    n = e.clear();
  return t && je(e, 'clear', void 0, void 0), n;
}
function rn(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      c = W(i),
      l = t ? vr : e ? wr : zt;
    return (
      !e && ge(c, 'iterate', lt), i.forEach((a, f) => r.call(s, l(a), l(f), o))
    );
  };
}
function sn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = W(s),
      i = Dt(o),
      c = e === 'entries' || (e === Symbol.iterator && i),
      l = e === 'keys' && i,
      a = s[e](...r),
      f = n ? vr : t ? wr : zt;
    return (
      !t && ge(o, 'iterate', l ? Yn : lt),
      {
        next() {
          const { value: h, done: p } = a.next();
          return p
            ? { value: h, done: p }
            : { value: c ? [f(h[0]), f(h[1])] : f(h), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ue(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function Fi() {
  const e = {
      get(o) {
        return en(this, o);
      },
      get size() {
        return nn(this);
      },
      has: tn,
      add: Kr,
      set: zr,
      delete: Wr,
      clear: Vr,
      forEach: rn(!1, !1),
    },
    t = {
      get(o) {
        return en(this, o, !1, !0);
      },
      get size() {
        return nn(this);
      },
      has: tn,
      add: Kr,
      set: zr,
      delete: Wr,
      clear: Vr,
      forEach: rn(!1, !0),
    },
    n = {
      get(o) {
        return en(this, o, !0);
      },
      get size() {
        return nn(this, !0);
      },
      has(o) {
        return tn.call(this, o, !0);
      },
      add: Ue('add'),
      set: Ue('set'),
      delete: Ue('delete'),
      clear: Ue('clear'),
      forEach: rn(!0, !1),
    },
    r = {
      get(o) {
        return en(this, o, !0, !0);
      },
      get size() {
        return nn(this, !0);
      },
      has(o) {
        return tn.call(this, o, !0);
      },
      add: Ue('add'),
      set: Ue('set'),
      delete: Ue('delete'),
      clear: Ue('clear'),
      forEach: rn(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(o => {
      (e[o] = sn(o, !1, !1)),
        (n[o] = sn(o, !0, !1)),
        (t[o] = sn(o, !1, !0)),
        (r[o] = sn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Mi, Ni, Li, Di] = Fi();
function yr(e, t) {
  const n = t ? (e ? Di : Li) : e ? Ni : Mi;
  return (r, s, o) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
      ? e
      : s === '__v_raw'
      ? r
      : Reflect.get(K(n, s) && s in r ? n : r, s, o);
}
const ji = { get: yr(!1, !1) },
  ki = { get: yr(!1, !0) },
  Hi = { get: yr(!0, !1) },
  Ys = new WeakMap(),
  Qs = new WeakMap(),
  Zs = new WeakMap(),
  Ui = new WeakMap();
function Ki(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function zi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ki(hi(e));
}
function Xe(e) {
  return Pt(e) ? e : Er(e, !1, qs, ji, Ys);
}
function Wi(e) {
  return Er(e, !1, Bi, ki, Qs);
}
function Js(e) {
  return Er(e, !0, $i, Hi, Zs);
}
function Er(e, t, n, r, s) {
  if (!ee(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = zi(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? r : n);
  return s.set(e, c), c;
}
function yt(e) {
  return Pt(e) ? yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Pt(e) {
  return !!(e && e.__v_isReadonly);
}
function hn(e) {
  return !!(e && e.__v_isShallow);
}
function Xs(e) {
  return yt(e) || Pt(e);
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function xr(e) {
  return dn(e, '__v_skip', !0), e;
}
const zt = e => (ee(e) ? Xe(e) : e),
  wr = e => (ee(e) ? Js(e) : e);
function Gs(e) {
  qe && ye && ((e = W(e)), zs(e.dep || (e.dep = gr())));
}
function eo(e, t) {
  (e = W(e)), e.dep && Qn(e.dep);
}
function ce(e) {
  return !!(e && e.__v_isRef === !0);
}
function Fe(e) {
  return to(e, !1);
}
function Vi(e) {
  return to(e, !0);
}
function to(e, t) {
  return ce(e) ? e : new qi(e, t);
}
class qi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : W(t)),
      (this._value = n ? t : zt(t));
  }
  get value() {
    return Gs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || hn(t) || Pt(t);
    (t = n ? t : W(t)),
      Kt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : zt(t)), eo(this));
  }
}
function Ye(e) {
  return ce(e) ? e.value : e;
}
const Yi = {
  get: (e, t, n) => Ye(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ce(s) && !ce(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function no(e) {
  return yt(e) ? e : new Proxy(e, Yi);
}
var ro;
class Qi {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[ro] = !1),
      (this._dirty = !0),
      (this.effect = new _r(t, () => {
        this._dirty || ((this._dirty = !0), eo(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = W(this);
    return (
      Gs(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
ro = '__v_isReadonly';
function Zi(e, t, n = !1) {
  let r, s;
  const o = k(e);
  return (
    o ? ((r = e), (s = we)) : ((r = e.get), (s = e.set)),
    new Qi(r, s, o || !s, n)
  );
}
function Qe(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    Pn(o, t, n);
  }
  return s;
}
function Pe(e, t, n, r) {
  if (k(e)) {
    const o = Qe(e, t, n, r);
    return (
      o &&
        Ls(o) &&
        o.catch(i => {
          Pn(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Pe(e[o], t, n, r));
  return s;
}
function Pn(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      c = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let f = 0; f < a.length; f++) if (a[f](e, i, c) === !1) return;
      }
      o = o.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Qe(l, null, 10, [e, i, c]);
      return;
    }
  }
  Ji(e, n, s, r);
}
function Ji(e, t, n, r = !0) {
  console.error(e);
}
let Wt = !1,
  Zn = !1;
const le = [];
let Be = 0;
const Et = [];
let Le = null,
  ot = 0;
const so = Promise.resolve();
let Pr = null;
function pn(e) {
  const t = Pr || so;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xi(e) {
  let t = Be + 1,
    n = le.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    Vt(le[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Rr(e) {
  (!le.length || !le.includes(e, Wt && e.allowRecurse ? Be + 1 : Be)) &&
    (e.id == null ? le.push(e) : le.splice(Xi(e.id), 0, e), oo());
}
function oo() {
  !Wt && !Zn && ((Zn = !0), (Pr = so.then(lo)));
}
function Gi(e) {
  const t = le.indexOf(e);
  t > Be && le.splice(t, 1);
}
function el(e) {
  D(e)
    ? Et.push(...e)
    : (!Le || !Le.includes(e, e.allowRecurse ? ot + 1 : ot)) && Et.push(e),
    oo();
}
function qr(e, t = Wt ? Be + 1 : 0) {
  for (; t < le.length; t++) {
    const n = le[t];
    n && n.pre && (le.splice(t, 1), t--, n());
  }
}
function io(e) {
  if (Et.length) {
    const t = [...new Set(Et)];
    if (((Et.length = 0), Le)) {
      Le.push(...t);
      return;
    }
    for (Le = t, Le.sort((n, r) => Vt(n) - Vt(r)), ot = 0; ot < Le.length; ot++)
      Le[ot]();
    (Le = null), (ot = 0);
  }
}
const Vt = e => (e.id == null ? 1 / 0 : e.id),
  tl = (e, t) => {
    const n = Vt(e) - Vt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function lo(e) {
  (Zn = !1), (Wt = !0), le.sort(tl);
  const t = we;
  try {
    for (Be = 0; Be < le.length; Be++) {
      const n = le[Be];
      n && n.active !== !1 && Qe(n, null, 14);
    }
  } finally {
    (Be = 0),
      (le.length = 0),
      io(),
      (Wt = !1),
      (Pr = null),
      (le.length || Et.length) && lo();
  }
}
function nl(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || X;
  let s = n;
  const o = t.startsWith('update:'),
    i = o && t.slice(7);
  if (i && i in r) {
    const f = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: h, trim: p } = r[f] || X;
    p && (s = n.map(v => (oe(v) ? v.trim() : v))), h && (s = n.map(js));
  }
  let c,
    l = r[(c = Fn(t))] || r[(c = Fn(wt(t)))];
  !l && o && (l = r[(c = Fn(St(t)))]), l && Pe(l, e, 6, s);
  const a = r[c + 'Once'];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Pe(a, e, 6, s);
  }
}
function co(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    c = !1;
  if (!k(e)) {
    const l = a => {
      const f = co(a, t, !0);
      f && ((c = !0), fe(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !o && !c
    ? (ee(e) && r.set(e, null), null)
    : (D(o) ? o.forEach(l => (i[l] = null)) : fe(i, o),
      ee(e) && r.set(e, i),
      i);
}
function Rn(e, t) {
  return !e || !yn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, St(t)) || K(e, t));
}
let Ee = null,
  uo = null;
function mn(e) {
  const t = Ee;
  return (Ee = e), (uo = (e && e.type.__scopeId) || null), t;
}
function gt(e, t = Ee, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && ts(-1);
    const o = mn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      mn(o), r._d && ts(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Nn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: c,
    attrs: l,
    emit: a,
    render: f,
    renderCache: h,
    data: p,
    setupState: v,
    ctx: C,
    inheritAttrs: A,
  } = e;
  let L, T;
  const N = mn(e);
  try {
    if (n.shapeFlag & 4) {
      const V = s || r;
      (L = $e(f.call(V, V, h, o, v, p, C))), (T = l);
    } else {
      const V = t;
      (L = $e(
        V.length > 1 ? V(o, { attrs: l, slots: c, emit: a }) : V(o, null)
      )),
        (T = t.props ? l : rl(l));
    }
  } catch (V) {
    (kt.length = 0), Pn(V, e, 1), (L = z(ut));
  }
  let F = L;
  if (T && A !== !1) {
    const V = Object.keys(T),
      { shapeFlag: ie } = F;
    V.length && ie & 7 && (i && V.some(dr) && (T = sl(T, i)), (F = Rt(F, T)));
  }
  return (
    n.dirs && ((F = Rt(F)), (F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (F.transition = n.transition),
    (L = F),
    mn(N),
    L
  );
}
const rl = e => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || yn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  sl = (e, t) => {
    const n = {};
    for (const r in e) (!dr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function ol(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: c, patchFlag: l } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? Yr(r, i, a) : !!i;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (i[p] !== r[p] && !Rn(a, p)) return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Yr(r, i, a)
        : !0
      : !!i;
  return !1;
}
function Yr(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Rn(n, o)) return !0;
  }
  return !1;
}
function il({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const ll = e => e.__isSuspense;
function cl(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : el(e);
}
function xt(e, t) {
  if (re) {
    let n = re.provides;
    const r = re.parent && re.parent.provides;
    r === n && (n = re.provides = Object.create(r)), (n[e] = t);
  }
}
function he(e, t, n = !1) {
  const r = re || Ee;
  if (r) {
    const s =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && k(t) ? t.call(r.proxy) : t;
  }
}
function ul(e, t) {
  return Cr(e, null, t);
}
const on = {};
function Ze(e, t, n) {
  return Cr(e, t, n);
}
function Cr(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = X
) {
  const c = re;
  let l,
    a = !1,
    f = !1;
  if (
    (ce(e)
      ? ((l = () => e.value), (a = hn(e)))
      : yt(e)
      ? ((l = () => e), (r = !0))
      : D(e)
      ? ((f = !0),
        (a = e.some(F => yt(F) || hn(F))),
        (l = () =>
          e.map(F => {
            if (ce(F)) return F.value;
            if (yt(F)) return bt(F);
            if (k(F)) return Qe(F, c, 2);
          })))
      : k(e)
      ? t
        ? (l = () => Qe(e, c, 2))
        : (l = () => {
            if (!(c && c.isUnmounted)) return h && h(), Pe(e, c, 3, [p]);
          })
      : (l = we),
    t && r)
  ) {
    const F = l;
    l = () => bt(F());
  }
  let h,
    p = F => {
      h = T.onStop = () => {
        Qe(F, c, 4);
      };
    },
    v;
  if (Yt)
    if (
      ((p = we),
      t ? n && Pe(t, c, 3, [l(), f ? [] : void 0, p]) : l(),
      s === 'sync')
    ) {
      const F = Zl();
      v = F.__watcherHandles || (F.__watcherHandles = []);
    } else return we;
  let C = f ? new Array(e.length).fill(on) : on;
  const A = () => {
    if (T.active)
      if (t) {
        const F = T.run();
        (r || a || (f ? F.some((V, ie) => Kt(V, C[ie])) : Kt(F, C))) &&
          (h && h(),
          Pe(t, c, 3, [F, C === on ? void 0 : f && C[0] === on ? [] : C, p]),
          (C = F));
      } else T.run();
  };
  A.allowRecurse = !!t;
  let L;
  s === 'sync'
    ? (L = A)
    : s === 'post'
    ? (L = () => de(A, c && c.suspense))
    : ((A.pre = !0), c && (A.id = c.uid), (L = () => Rr(A)));
  const T = new _r(l, L);
  t
    ? n
      ? A()
      : (C = T.run())
    : s === 'post'
    ? de(T.run.bind(T), c && c.suspense)
    : T.run();
  const N = () => {
    T.stop(), c && c.scope && hr(c.scope.effects, T);
  };
  return v && v.push(N), N;
}
function fl(e, t, n) {
  const r = this.proxy,
    s = oe(e) ? (e.includes('.') ? fo(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  k(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = re;
  Ct(this);
  const c = Cr(s, o.bind(r), n);
  return i ? Ct(i) : ct(), c;
}
function fo(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function bt(e, t) {
  if (!ee(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ce(e))) bt(e.value, t);
  else if (D(e)) for (let n = 0; n < e.length; n++) bt(e[n], t);
  else if (ai(e) || Dt(e))
    e.forEach(n => {
      bt(n, t);
    });
  else if (pi(e)) for (const n in e) bt(e[n], t);
  return e;
}
function ft(e) {
  return k(e) ? { setup: e, name: e.name } : e;
}
const fn = e => !!e.type.__asyncLoader,
  ao = e => e.type.__isKeepAlive;
function ho(e, t) {
  mo(e, 'a', t);
}
function po(e, t) {
  mo(e, 'da', t);
}
function mo(e, t, n = re) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Cn(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      ao(s.parent.vnode) && al(r, t, n, s), (s = s.parent);
  }
}
function al(e, t, n, r) {
  const s = Cn(t, e, r, !0);
  Or(() => {
    hr(r[t], s);
  }, n);
}
function Cn(e, t, n = re, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          Tt(), Ct(n);
          const c = Pe(t, n, e, i);
          return ct(), It(), c;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const ke =
    e =>
    (t, n = re) =>
      (!Yt || e === 'sp') && Cn(e, (...r) => t(...r), n),
  dl = ke('bm'),
  go = ke('m'),
  hl = ke('bu'),
  pl = ke('u'),
  _o = ke('bum'),
  Or = ke('um'),
  ml = ke('sp'),
  gl = ke('rtg'),
  _l = ke('rtc');
function bl(e, t = re) {
  Cn('ec', e, t);
}
function nt(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    o && (c.oldValue = o[i].value);
    let l = c.dir[r];
    l && (Tt(), Pe(l, n, 8, [e.el, c, e, t]), It());
  }
}
const vl = Symbol(),
  Jn = e => (e ? (Io(e) ? $r(e) || e.proxy : Jn(e.parent)) : null),
  jt = fe(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Jn(e.parent),
    $root: e => Jn(e.root),
    $emit: e => e.emit,
    $options: e => Ar(e),
    $forceUpdate: e => e.f || (e.f = () => Rr(e.update)),
    $nextTick: e => e.n || (e.n = pn.bind(e.proxy)),
    $watch: e => fl.bind(e),
  }),
  Ln = (e, t) => e !== X && !e.__isScriptSetup && K(e, t),
  yl = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: c,
        appContext: l,
      } = e;
      let a;
      if (t[0] !== '$') {
        const v = i[t];
        if (v !== void 0)
          switch (v) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Ln(r, t)) return (i[t] = 1), r[t];
          if (s !== X && K(s, t)) return (i[t] = 2), s[t];
          if ((a = e.propsOptions[0]) && K(a, t)) return (i[t] = 3), o[t];
          if (n !== X && K(n, t)) return (i[t] = 4), n[t];
          Xn && (i[t] = 0);
        }
      }
      const f = jt[t];
      let h, p;
      if (f) return t === '$attrs' && ge(e, 'get', t), f(e);
      if ((h = c.__cssModules) && (h = h[t])) return h;
      if (n !== X && K(n, t)) return (i[t] = 4), n[t];
      if (((p = l.config.globalProperties), K(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return Ln(s, t)
        ? ((s[t] = n), !0)
        : r !== X && K(r, t)
        ? ((r[t] = n), !0)
        : K(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let c;
      return (
        !!n[i] ||
        (e !== X && K(e, i)) ||
        Ln(t, i) ||
        ((c = o[0]) && K(c, i)) ||
        K(r, i) ||
        K(jt, i) ||
        K(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : K(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Xn = !0;
function El(e) {
  const t = Ar(e),
    n = e.proxy,
    r = e.ctx;
  (Xn = !1), t.beforeCreate && Qr(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: o,
    methods: i,
    watch: c,
    provide: l,
    inject: a,
    created: f,
    beforeMount: h,
    mounted: p,
    beforeUpdate: v,
    updated: C,
    activated: A,
    deactivated: L,
    beforeDestroy: T,
    beforeUnmount: N,
    destroyed: F,
    unmounted: V,
    render: ie,
    renderTracked: pe,
    renderTriggered: Ce,
    errorCaptured: Me,
    serverPrefetch: at,
    expose: Oe,
    inheritAttrs: He,
    components: Ae,
    directives: dt,
    filters: et,
  } = t;
  if ((a && xl(a, r, null, e.appContext.config.unwrapInjectedRef), i))
    for (const Z in i) {
      const Y = i[Z];
      k(Y) && (r[Z] = Y.bind(n));
    }
  if (s) {
    const Z = s.call(n, n);
    ee(Z) && (e.data = Xe(Z));
  }
  if (((Xn = !0), o))
    for (const Z in o) {
      const Y = o[Z],
        _e = k(Y) ? Y.bind(n, n) : k(Y.get) ? Y.get.bind(n, n) : we,
        tt = !k(Y) && k(Y.set) ? Y.set.bind(n) : we,
        be = se({ get: _e, set: tt });
      Object.defineProperty(r, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => be.value,
        set: ae => (be.value = ae),
      });
    }
  if (c) for (const Z in c) bo(c[Z], r, n, Z);
  if (l) {
    const Z = k(l) ? l.call(n) : l;
    Reflect.ownKeys(Z).forEach(Y => {
      xt(Y, Z[Y]);
    });
  }
  f && Qr(f, e, 'c');
  function te(Z, Y) {
    D(Y) ? Y.forEach(_e => Z(_e.bind(n))) : Y && Z(Y.bind(n));
  }
  if (
    (te(dl, h),
    te(go, p),
    te(hl, v),
    te(pl, C),
    te(ho, A),
    te(po, L),
    te(bl, Me),
    te(_l, pe),
    te(gl, Ce),
    te(_o, N),
    te(Or, V),
    te(ml, at),
    D(Oe))
  )
    if (Oe.length) {
      const Z = e.exposed || (e.exposed = {});
      Oe.forEach(Y => {
        Object.defineProperty(Z, Y, {
          get: () => n[Y],
          set: _e => (n[Y] = _e),
        });
      });
    } else e.exposed || (e.exposed = {});
  ie && e.render === we && (e.render = ie),
    He != null && (e.inheritAttrs = He),
    Ae && (e.components = Ae),
    dt && (e.directives = dt);
}
function xl(e, t, n = we, r = !1) {
  D(e) && (e = Gn(e));
  for (const s in e) {
    const o = e[s];
    let i;
    ee(o)
      ? 'default' in o
        ? (i = he(o.from || s, o.default, !0))
        : (i = he(o.from || s))
      : (i = he(o)),
      ce(i) && r
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: c => (i.value = c),
          })
        : (t[s] = i);
  }
}
function Qr(e, t, n) {
  Pe(D(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function bo(e, t, n, r) {
  const s = r.includes('.') ? fo(n, r) : () => n[r];
  if (oe(e)) {
    const o = t[e];
    k(o) && Ze(s, o);
  } else if (k(e)) Ze(s, e.bind(n));
  else if (ee(e))
    if (D(e)) e.forEach(o => bo(o, t, n, r));
    else {
      const o = k(e.handler) ? e.handler.bind(n) : t[e.handler];
      k(o) && Ze(s, o, e);
    }
}
function Ar(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    c = o.get(t);
  let l;
  return (
    c
      ? (l = c)
      : !s.length && !n && !r
      ? (l = t)
      : ((l = {}), s.length && s.forEach(a => gn(l, a, i, !0)), gn(l, t, i)),
    ee(t) && o.set(t, l),
    l
  );
}
function gn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && gn(e, o, n, !0), s && s.forEach(i => gn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === 'expose')) {
      const c = wl[i] || (n && n[i]);
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const wl = {
  data: Zr,
  props: st,
  emits: st,
  methods: st,
  computed: st,
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  components: st,
  directives: st,
  watch: Rl,
  provide: Zr,
  inject: Pl,
};
function Zr(e, t) {
  return t
    ? e
      ? function () {
          return fe(
            k(e) ? e.call(this, this) : e,
            k(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Pl(e, t) {
  return st(Gn(e), Gn(t));
}
function Gn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function st(e, t) {
  return e ? fe(fe(Object.create(null), e), t) : t;
}
function Rl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = fe(Object.create(null), e);
  for (const r in t) n[r] = ue(e[r], t[r]);
  return n;
}
function Cl(e, t, n, r = !1) {
  const s = {},
    o = {};
  dn(o, An, 1), (e.propsDefaults = Object.create(null)), vo(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : Wi(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function Ol(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    c = W(s),
    [l] = e.propsOptions;
  let a = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let p = f[h];
        if (Rn(e.emitsOptions, p)) continue;
        const v = t[p];
        if (l)
          if (K(o, p)) v !== o[p] && ((o[p] = v), (a = !0));
          else {
            const C = wt(p);
            s[C] = er(l, c, C, v, e, !1);
          }
        else v !== o[p] && ((o[p] = v), (a = !0));
      }
    }
  } else {
    vo(e, t, s, o) && (a = !0);
    let f;
    for (const h in c)
      (!t || (!K(t, h) && ((f = St(h)) === h || !K(t, f)))) &&
        (l
          ? n &&
            (n[h] !== void 0 || n[f] !== void 0) &&
            (s[h] = er(l, c, h, void 0, e, !0))
          : delete s[h]);
    if (o !== c) for (const h in o) (!t || !K(t, h)) && (delete o[h], (a = !0));
  }
  a && je(e, 'set', '$attrs');
}
function vo(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    c;
  if (t)
    for (let l in t) {
      if (un(l)) continue;
      const a = t[l];
      let f;
      s && K(s, (f = wt(l)))
        ? !o || !o.includes(f)
          ? (n[f] = a)
          : ((c || (c = {}))[f] = a)
        : Rn(e.emitsOptions, l) ||
          ((!(l in r) || a !== r[l]) && ((r[l] = a), (i = !0)));
    }
  if (o) {
    const l = W(n),
      a = c || X;
    for (let f = 0; f < o.length; f++) {
      const h = o[f];
      n[h] = er(s, l, h, a[h], e, !K(a, h));
    }
  }
  return i;
}
function er(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const c = K(i, 'default');
    if (c && r === void 0) {
      const l = i.default;
      if (i.type !== Function && k(l)) {
        const { propsDefaults: a } = s;
        n in a ? (r = a[n]) : (Ct(s), (r = a[n] = l.call(null, t)), ct());
      } else r = l;
    }
    i[0] &&
      (o && !c ? (r = !1) : i[1] && (r === '' || r === St(n)) && (r = !0));
  }
  return r;
}
function yo(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    c = [];
  let l = !1;
  if (!k(e)) {
    const f = h => {
      l = !0;
      const [p, v] = yo(h, t, !0);
      fe(i, p), v && c.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  if (!o && !l) return ee(e) && r.set(e, vt), vt;
  if (D(o))
    for (let f = 0; f < o.length; f++) {
      const h = wt(o[f]);
      Jr(h) && (i[h] = X);
    }
  else if (o)
    for (const f in o) {
      const h = wt(f);
      if (Jr(h)) {
        const p = o[f],
          v = (i[h] = D(p) || k(p) ? { type: p } : Object.assign({}, p));
        if (v) {
          const C = es(Boolean, v.type),
            A = es(String, v.type);
          (v[0] = C > -1),
            (v[1] = A < 0 || C < A),
            (C > -1 || K(v, 'default')) && c.push(h);
        }
      }
    }
  const a = [i, c];
  return ee(e) && r.set(e, a), a;
}
function Jr(e) {
  return e[0] !== '$';
}
function Xr(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? 'null' : '';
}
function Gr(e, t) {
  return Xr(e) === Xr(t);
}
function es(e, t) {
  return D(t) ? t.findIndex(n => Gr(n, e)) : k(t) && Gr(t, e) ? 0 : -1;
}
const Eo = e => e[0] === '_' || e === '$stable',
  Sr = e => (D(e) ? e.map($e) : [$e(e)]),
  Al = (e, t, n) => {
    if (t._n) return t;
    const r = gt((...s) => Sr(t(...s)), n);
    return (r._c = !1), r;
  },
  xo = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Eo(s)) continue;
      const o = e[s];
      if (k(o)) t[s] = Al(s, o, r);
      else if (o != null) {
        const i = Sr(o);
        t[s] = () => i;
      }
    }
  },
  wo = (e, t) => {
    const n = Sr(t);
    e.slots.default = () => n;
  },
  Sl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = W(t)), dn(t, '_', n)) : xo(t, (e.slots = {}));
    } else (e.slots = {}), t && wo(e, t);
    dn(e.slots, An, 1);
  },
  Tl = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = X;
    if (r.shapeFlag & 32) {
      const c = t._;
      c
        ? n && c === 1
          ? (o = !1)
          : (fe(s, t), !n && c === 1 && delete s._)
        : ((o = !t.$stable), xo(t, s)),
        (i = t);
    } else t && (wo(e, t), (i = { default: 1 }));
    if (o) for (const c in s) !Eo(c) && !(c in i) && delete s[c];
  };
function Po() {
  return {
    app: null,
    config: {
      isNativeTag: ci,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Il = 0;
function $l(e, t) {
  return function (r, s = null) {
    k(r) || (r = Object.assign({}, r)), s != null && !ee(s) && (s = null);
    const o = Po(),
      i = new Set();
    let c = !1;
    const l = (o.app = {
      _uid: Il++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Jl,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...f) {
        return (
          i.has(a) ||
            (a && k(a.install)
              ? (i.add(a), a.install(l, ...f))
              : k(a) && (i.add(a), a(l, ...f))),
          l
        );
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), l;
      },
      component(a, f) {
        return f ? ((o.components[a] = f), l) : o.components[a];
      },
      directive(a, f) {
        return f ? ((o.directives[a] = f), l) : o.directives[a];
      },
      mount(a, f, h) {
        if (!c) {
          const p = z(r, s);
          return (
            (p.appContext = o),
            f && t ? t(p, a) : e(p, a, h),
            (c = !0),
            (l._container = a),
            (a.__vue_app__ = l),
            $r(p.component) || p.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(a, f) {
        return (o.provides[a] = f), l;
      },
    });
    return l;
  };
}
function tr(e, t, n, r, s = !1) {
  if (D(e)) {
    e.forEach((p, v) => tr(p, t && (D(t) ? t[v] : t), n, r, s));
    return;
  }
  if (fn(r) && !s) return;
  const o = r.shapeFlag & 4 ? $r(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: c, r: l } = e,
    a = t && t.r,
    f = c.refs === X ? (c.refs = {}) : c.refs,
    h = c.setupState;
  if (
    (a != null &&
      a !== l &&
      (oe(a)
        ? ((f[a] = null), K(h, a) && (h[a] = null))
        : ce(a) && (a.value = null)),
    k(l))
  )
    Qe(l, c, 12, [i, f]);
  else {
    const p = oe(l),
      v = ce(l);
    if (p || v) {
      const C = () => {
        if (e.f) {
          const A = p ? (K(h, l) ? h[l] : f[l]) : l.value;
          s
            ? D(A) && hr(A, o)
            : D(A)
            ? A.includes(o) || A.push(o)
            : p
            ? ((f[l] = [o]), K(h, l) && (h[l] = f[l]))
            : ((l.value = [o]), e.k && (f[e.k] = l.value));
        } else
          p
            ? ((f[l] = i), K(h, l) && (h[l] = i))
            : v && ((l.value = i), e.k && (f[e.k] = i));
      };
      i ? ((C.id = -1), de(C, n)) : C();
    }
  }
}
const de = cl;
function Bl(e) {
  return Fl(e);
}
function Fl(e, t) {
  const n = _i();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: c,
      createComment: l,
      setText: a,
      setElementText: f,
      parentNode: h,
      nextSibling: p,
      setScopeId: v = we,
      insertStaticContent: C,
    } = e,
    A = (
      u,
      d,
      m,
      g = null,
      b = null,
      x = null,
      R = !1,
      E = null,
      w = !!d.dynamicChildren
    ) => {
      if (u === d) return;
      u && !Ft(u, d) && ((g = P(u)), ae(u, b, x, !0), (u = null)),
        d.patchFlag === -2 && ((w = !1), (d.dynamicChildren = null));
      const { type: y, ref: $, shapeFlag: S } = d;
      switch (y) {
        case On:
          L(u, d, m, g);
          break;
        case ut:
          T(u, d, m, g);
          break;
        case Dn:
          u == null && N(d, m, g, R);
          break;
        case De:
          Ae(u, d, m, g, b, x, R, E, w);
          break;
        default:
          S & 1
            ? ie(u, d, m, g, b, x, R, E, w)
            : S & 6
            ? dt(u, d, m, g, b, x, R, E, w)
            : (S & 64 || S & 128) && y.process(u, d, m, g, b, x, R, E, w, U);
      }
      $ != null && b && tr($, u && u.ref, x, d || u, !d);
    },
    L = (u, d, m, g) => {
      if (u == null) r((d.el = c(d.children)), m, g);
      else {
        const b = (d.el = u.el);
        d.children !== u.children && a(b, d.children);
      }
    },
    T = (u, d, m, g) => {
      u == null ? r((d.el = l(d.children || '')), m, g) : (d.el = u.el);
    },
    N = (u, d, m, g) => {
      [u.el, u.anchor] = C(u.children, d, m, g, u.el, u.anchor);
    },
    F = ({ el: u, anchor: d }, m, g) => {
      let b;
      for (; u && u !== d; ) (b = p(u)), r(u, m, g), (u = b);
      r(d, m, g);
    },
    V = ({ el: u, anchor: d }) => {
      let m;
      for (; u && u !== d; ) (m = p(u)), s(u), (u = m);
      s(d);
    },
    ie = (u, d, m, g, b, x, R, E, w) => {
      (R = R || d.type === 'svg'),
        u == null ? pe(d, m, g, b, x, R, E, w) : at(u, d, b, x, R, E, w);
    },
    pe = (u, d, m, g, b, x, R, E) => {
      let w, y;
      const { type: $, props: S, shapeFlag: B, transition: M, dirs: H } = u;
      if (
        ((w = u.el = i(u.type, x, S && S.is, S)),
        B & 8
          ? f(w, u.children)
          : B & 16 &&
            Me(u.children, w, null, g, b, x && $ !== 'foreignObject', R, E),
        H && nt(u, null, g, 'created'),
        S)
      ) {
        for (const Q in S)
          Q !== 'value' &&
            !un(Q) &&
            o(w, Q, null, S[Q], x, u.children, g, b, O);
        'value' in S && o(w, 'value', null, S.value),
          (y = S.onVnodeBeforeMount) && Te(y, g, u);
      }
      Ce(w, u, u.scopeId, R, g), H && nt(u, null, g, 'beforeMount');
      const J = (!b || (b && !b.pendingBranch)) && M && !M.persisted;
      J && M.beforeEnter(w),
        r(w, d, m),
        ((y = S && S.onVnodeMounted) || J || H) &&
          de(() => {
            y && Te(y, g, u), J && M.enter(w), H && nt(u, null, g, 'mounted');
          }, b);
    },
    Ce = (u, d, m, g, b) => {
      if ((m && v(u, m), g)) for (let x = 0; x < g.length; x++) v(u, g[x]);
      if (b) {
        let x = b.subTree;
        if (d === x) {
          const R = b.vnode;
          Ce(u, R, R.scopeId, R.slotScopeIds, b.parent);
        }
      }
    },
    Me = (u, d, m, g, b, x, R, E, w = 0) => {
      for (let y = w; y < u.length; y++) {
        const $ = (u[y] = E ? ze(u[y]) : $e(u[y]));
        A(null, $, d, m, g, b, x, R, E);
      }
    },
    at = (u, d, m, g, b, x, R) => {
      const E = (d.el = u.el);
      let { patchFlag: w, dynamicChildren: y, dirs: $ } = d;
      w |= u.patchFlag & 16;
      const S = u.props || X,
        B = d.props || X;
      let M;
      m && rt(m, !1),
        (M = B.onVnodeBeforeUpdate) && Te(M, m, d, u),
        $ && nt(d, u, m, 'beforeUpdate'),
        m && rt(m, !0);
      const H = b && d.type !== 'foreignObject';
      if (
        (y
          ? Oe(u.dynamicChildren, y, E, m, g, H, x)
          : R || Y(u, d, E, null, m, g, H, x, !1),
        w > 0)
      ) {
        if (w & 16) He(E, d, S, B, m, g, b);
        else if (
          (w & 2 && S.class !== B.class && o(E, 'class', null, B.class, b),
          w & 4 && o(E, 'style', S.style, B.style, b),
          w & 8)
        ) {
          const J = d.dynamicProps;
          for (let Q = 0; Q < J.length; Q++) {
            const ne = J[Q],
              ve = S[ne],
              pt = B[ne];
            (pt !== ve || ne === 'value') &&
              o(E, ne, ve, pt, b, u.children, m, g, O);
          }
        }
        w & 1 && u.children !== d.children && f(E, d.children);
      } else !R && y == null && He(E, d, S, B, m, g, b);
      ((M = B.onVnodeUpdated) || $) &&
        de(() => {
          M && Te(M, m, d, u), $ && nt(d, u, m, 'updated');
        }, g);
    },
    Oe = (u, d, m, g, b, x, R) => {
      for (let E = 0; E < d.length; E++) {
        const w = u[E],
          y = d[E],
          $ =
            w.el && (w.type === De || !Ft(w, y) || w.shapeFlag & 70)
              ? h(w.el)
              : m;
        A(w, y, $, null, g, b, x, R, !0);
      }
    },
    He = (u, d, m, g, b, x, R) => {
      if (m !== g) {
        if (m !== X)
          for (const E in m)
            !un(E) && !(E in g) && o(u, E, m[E], null, R, d.children, b, x, O);
        for (const E in g) {
          if (un(E)) continue;
          const w = g[E],
            y = m[E];
          w !== y && E !== 'value' && o(u, E, y, w, R, d.children, b, x, O);
        }
        'value' in g && o(u, 'value', m.value, g.value);
      }
    },
    Ae = (u, d, m, g, b, x, R, E, w) => {
      const y = (d.el = u ? u.el : c('')),
        $ = (d.anchor = u ? u.anchor : c(''));
      let { patchFlag: S, dynamicChildren: B, slotScopeIds: M } = d;
      M && (E = E ? E.concat(M) : M),
        u == null
          ? (r(y, m, g), r($, m, g), Me(d.children, m, $, b, x, R, E, w))
          : S > 0 && S & 64 && B && u.dynamicChildren
          ? (Oe(u.dynamicChildren, B, m, b, x, R, E),
            (d.key != null || (b && d === b.subTree)) && Ro(u, d, !0))
          : Y(u, d, m, $, b, x, R, E, w);
    },
    dt = (u, d, m, g, b, x, R, E, w) => {
      (d.slotScopeIds = E),
        u == null
          ? d.shapeFlag & 512
            ? b.ctx.activate(d, m, g, R, w)
            : et(d, m, g, b, x, R, w)
          : $t(u, d, w);
    },
    et = (u, d, m, g, b, x, R) => {
      const E = (u.component = Kl(u, g, b));
      if ((ao(u) && (E.ctx.renderer = U), zl(E), E.asyncDep)) {
        if ((b && b.registerDep(E, te), !u.el)) {
          const w = (E.subTree = z(ut));
          T(null, w, d, m);
        }
        return;
      }
      te(E, u, d, m, b, x, R);
    },
    $t = (u, d, m) => {
      const g = (d.component = u.component);
      if (ol(u, d, m))
        if (g.asyncDep && !g.asyncResolved) {
          Z(g, d, m);
          return;
        } else (g.next = d), Gi(g.update), g.update();
      else (d.el = u.el), (g.vnode = d);
    },
    te = (u, d, m, g, b, x, R) => {
      const E = () => {
          if (u.isMounted) {
            let { next: $, bu: S, u: B, parent: M, vnode: H } = u,
              J = $,
              Q;
            rt(u, !1),
              $ ? (($.el = H.el), Z(u, $, R)) : ($ = H),
              S && Mn(S),
              (Q = $.props && $.props.onVnodeBeforeUpdate) && Te(Q, M, $, H),
              rt(u, !0);
            const ne = Nn(u),
              ve = u.subTree;
            (u.subTree = ne),
              A(ve, ne, h(ve.el), P(ve), u, b, x),
              ($.el = ne.el),
              J === null && il(u, ne.el),
              B && de(B, b),
              (Q = $.props && $.props.onVnodeUpdated) &&
                de(() => Te(Q, M, $, H), b);
          } else {
            let $;
            const { el: S, props: B } = d,
              { bm: M, m: H, parent: J } = u,
              Q = fn(d);
            if (
              (rt(u, !1),
              M && Mn(M),
              !Q && ($ = B && B.onVnodeBeforeMount) && Te($, J, d),
              rt(u, !0),
              S && j)
            ) {
              const ne = () => {
                (u.subTree = Nn(u)), j(S, u.subTree, u, b, null);
              };
              Q
                ? d.type.__asyncLoader().then(() => !u.isUnmounted && ne())
                : ne();
            } else {
              const ne = (u.subTree = Nn(u));
              A(null, ne, m, g, u, b, x), (d.el = ne.el);
            }
            if ((H && de(H, b), !Q && ($ = B && B.onVnodeMounted))) {
              const ne = d;
              de(() => Te($, J, ne), b);
            }
            (d.shapeFlag & 256 ||
              (J && fn(J.vnode) && J.vnode.shapeFlag & 256)) &&
              u.a &&
              de(u.a, b),
              (u.isMounted = !0),
              (d = m = g = null);
          }
        },
        w = (u.effect = new _r(E, () => Rr(y), u.scope)),
        y = (u.update = () => w.run());
      (y.id = u.uid), rt(u, !0), y();
    },
    Z = (u, d, m) => {
      d.component = u;
      const g = u.vnode.props;
      (u.vnode = d),
        (u.next = null),
        Ol(u, d.props, g, m),
        Tl(u, d.children, m),
        Tt(),
        qr(),
        It();
    },
    Y = (u, d, m, g, b, x, R, E, w = !1) => {
      const y = u && u.children,
        $ = u ? u.shapeFlag : 0,
        S = d.children,
        { patchFlag: B, shapeFlag: M } = d;
      if (B > 0) {
        if (B & 128) {
          tt(y, S, m, g, b, x, R, E, w);
          return;
        } else if (B & 256) {
          _e(y, S, m, g, b, x, R, E, w);
          return;
        }
      }
      M & 8
        ? ($ & 16 && O(y, b, x), S !== y && f(m, S))
        : $ & 16
        ? M & 16
          ? tt(y, S, m, g, b, x, R, E, w)
          : O(y, b, x, !0)
        : ($ & 8 && f(m, ''), M & 16 && Me(S, m, g, b, x, R, E, w));
    },
    _e = (u, d, m, g, b, x, R, E, w) => {
      (u = u || vt), (d = d || vt);
      const y = u.length,
        $ = d.length,
        S = Math.min(y, $);
      let B;
      for (B = 0; B < S; B++) {
        const M = (d[B] = w ? ze(d[B]) : $e(d[B]));
        A(u[B], M, m, null, b, x, R, E, w);
      }
      y > $ ? O(u, b, x, !0, !1, S) : Me(d, m, g, b, x, R, E, w, S);
    },
    tt = (u, d, m, g, b, x, R, E, w) => {
      let y = 0;
      const $ = d.length;
      let S = u.length - 1,
        B = $ - 1;
      for (; y <= S && y <= B; ) {
        const M = u[y],
          H = (d[y] = w ? ze(d[y]) : $e(d[y]));
        if (Ft(M, H)) A(M, H, m, null, b, x, R, E, w);
        else break;
        y++;
      }
      for (; y <= S && y <= B; ) {
        const M = u[S],
          H = (d[B] = w ? ze(d[B]) : $e(d[B]));
        if (Ft(M, H)) A(M, H, m, null, b, x, R, E, w);
        else break;
        S--, B--;
      }
      if (y > S) {
        if (y <= B) {
          const M = B + 1,
            H = M < $ ? d[M].el : g;
          for (; y <= B; )
            A(null, (d[y] = w ? ze(d[y]) : $e(d[y])), m, H, b, x, R, E, w), y++;
        }
      } else if (y > B) for (; y <= S; ) ae(u[y], b, x, !0), y++;
      else {
        const M = y,
          H = y,
          J = new Map();
        for (y = H; y <= B; y++) {
          const me = (d[y] = w ? ze(d[y]) : $e(d[y]));
          me.key != null && J.set(me.key, y);
        }
        let Q,
          ne = 0;
        const ve = B - H + 1;
        let pt = !1,
          Nr = 0;
        const Bt = new Array(ve);
        for (y = 0; y < ve; y++) Bt[y] = 0;
        for (y = M; y <= S; y++) {
          const me = u[y];
          if (ne >= ve) {
            ae(me, b, x, !0);
            continue;
          }
          let Se;
          if (me.key != null) Se = J.get(me.key);
          else
            for (Q = H; Q <= B; Q++)
              if (Bt[Q - H] === 0 && Ft(me, d[Q])) {
                Se = Q;
                break;
              }
          Se === void 0
            ? ae(me, b, x, !0)
            : ((Bt[Se - H] = y + 1),
              Se >= Nr ? (Nr = Se) : (pt = !0),
              A(me, d[Se], m, null, b, x, R, E, w),
              ne++);
        }
        const Lr = pt ? Ml(Bt) : vt;
        for (Q = Lr.length - 1, y = ve - 1; y >= 0; y--) {
          const me = H + y,
            Se = d[me],
            Dr = me + 1 < $ ? d[me + 1].el : g;
          Bt[y] === 0
            ? A(null, Se, m, Dr, b, x, R, E, w)
            : pt && (Q < 0 || y !== Lr[Q] ? be(Se, m, Dr, 2) : Q--);
        }
      }
    },
    be = (u, d, m, g, b = null) => {
      const { el: x, type: R, transition: E, children: w, shapeFlag: y } = u;
      if (y & 6) {
        be(u.component.subTree, d, m, g);
        return;
      }
      if (y & 128) {
        u.suspense.move(d, m, g);
        return;
      }
      if (y & 64) {
        R.move(u, d, m, U);
        return;
      }
      if (R === De) {
        r(x, d, m);
        for (let S = 0; S < w.length; S++) be(w[S], d, m, g);
        r(u.anchor, d, m);
        return;
      }
      if (R === Dn) {
        F(u, d, m);
        return;
      }
      if (g !== 2 && y & 1 && E)
        if (g === 0) E.beforeEnter(x), r(x, d, m), de(() => E.enter(x), b);
        else {
          const { leave: S, delayLeave: B, afterLeave: M } = E,
            H = () => r(x, d, m),
            J = () => {
              S(x, () => {
                H(), M && M();
              });
            };
          B ? B(x, H, J) : J();
        }
      else r(x, d, m);
    },
    ae = (u, d, m, g = !1, b = !1) => {
      const {
        type: x,
        props: R,
        ref: E,
        children: w,
        dynamicChildren: y,
        shapeFlag: $,
        patchFlag: S,
        dirs: B,
      } = u;
      if ((E != null && tr(E, null, m, u, !0), $ & 256)) {
        d.ctx.deactivate(u);
        return;
      }
      const M = $ & 1 && B,
        H = !fn(u);
      let J;
      if ((H && (J = R && R.onVnodeBeforeUnmount) && Te(J, d, u), $ & 6))
        _(u.component, m, g);
      else {
        if ($ & 128) {
          u.suspense.unmount(m, g);
          return;
        }
        M && nt(u, null, d, 'beforeUnmount'),
          $ & 64
            ? u.type.remove(u, d, m, b, U, g)
            : y && (x !== De || (S > 0 && S & 64))
            ? O(y, d, m, !1, !0)
            : ((x === De && S & 384) || (!b && $ & 16)) && O(w, d, m),
          g && ht(u);
      }
      ((H && (J = R && R.onVnodeUnmounted)) || M) &&
        de(() => {
          J && Te(J, d, u), M && nt(u, null, d, 'unmounted');
        }, m);
    },
    ht = u => {
      const { type: d, el: m, anchor: g, transition: b } = u;
      if (d === De) {
        Gt(m, g);
        return;
      }
      if (d === Dn) {
        V(u);
        return;
      }
      const x = () => {
        s(m), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (u.shapeFlag & 1 && b && !b.persisted) {
        const { leave: R, delayLeave: E } = b,
          w = () => R(m, x);
        E ? E(u.el, x, w) : w();
      } else x();
    },
    Gt = (u, d) => {
      let m;
      for (; u !== d; ) (m = p(u)), s(u), (u = m);
      s(d);
    },
    _ = (u, d, m) => {
      const { bum: g, scope: b, update: x, subTree: R, um: E } = u;
      g && Mn(g),
        b.stop(),
        x && ((x.active = !1), ae(R, u, d, m)),
        E && de(E, d),
        de(() => {
          u.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    O = (u, d, m, g = !1, b = !1, x = 0) => {
      for (let R = x; R < u.length; R++) ae(u[R], d, m, g, b);
    },
    P = u =>
      u.shapeFlag & 6
        ? P(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : p(u.anchor || u.el),
    I = (u, d, m) => {
      u == null
        ? d._vnode && ae(d._vnode, null, null, !0)
        : A(d._vnode || null, u, d, null, null, null, m),
        qr(),
        io(),
        (d._vnode = u);
    },
    U = {
      p: A,
      um: ae,
      m: be,
      r: ht,
      mt: et,
      mc: Me,
      pc: Y,
      pbc: Oe,
      n: P,
      o: e,
    };
  let G, j;
  return t && ([G, j] = t(U)), { render: I, hydrate: G, createApp: $l(I, G) };
}
function rt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ro(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (D(r) && D(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let c = s[o];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = s[o] = ze(s[o])), (c.el = i.el)),
        n || Ro(i, c)),
        c.type === On && (c.el = i.el);
    }
}
function Ml(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, c;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const a = e[r];
    if (a !== 0) {
      if (((s = n[n.length - 1]), e[s] < a)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (c = (o + i) >> 1), e[n[c]] < a ? (o = c + 1) : (i = c);
      a < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Nl = e => e.__isTeleport,
  De = Symbol(void 0),
  On = Symbol(void 0),
  ut = Symbol(void 0),
  Dn = Symbol(void 0),
  kt = [];
let xe = null;
function _n(e = !1) {
  kt.push((xe = e ? null : []));
}
function Ll() {
  kt.pop(), (xe = kt[kt.length - 1] || null);
}
let qt = 1;
function ts(e) {
  qt += e;
}
function Co(e) {
  return (
    (e.dynamicChildren = qt > 0 ? xe || vt : null),
    Ll(),
    qt > 0 && xe && xe.push(e),
    e
  );
}
function Oo(e, t, n, r, s, o) {
  return Co(To(e, t, n, r, s, o, !0));
}
function Ao(e, t, n, r, s) {
  return Co(z(e, t, n, r, s, !0));
}
function bn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const An = '__vInternal',
  So = ({ key: e }) => e ?? null,
  an = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? oe(e) || ce(e) || k(e)
        ? { i: Ee, r: e, k: t, f: !!n }
        : e
      : null;
function To(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === De ? 0 : 1,
  i = !1,
  c = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && So(t),
    ref: t && an(t),
    scopeId: uo,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ee,
  };
  return (
    c
      ? (Tr(l, n), o & 128 && e.normalize(l))
      : n && (l.shapeFlag |= oe(n) ? 8 : 16),
    qt > 0 &&
      !i &&
      xe &&
      (l.patchFlag > 0 || o & 6) &&
      l.patchFlag !== 32 &&
      xe.push(l),
    l
  );
}
const z = Dl;
function Dl(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === vl) && (e = ut), bn(e))) {
    const c = Rt(e, t, !0);
    return (
      n && Tr(c, n),
      qt > 0 &&
        !o &&
        xe &&
        (c.shapeFlag & 6 ? (xe[xe.indexOf(e)] = c) : xe.push(c)),
      (c.patchFlag |= -2),
      c
    );
  }
  if ((Yl(e) && (e = e.__vccOpts), t)) {
    t = jl(t);
    let { class: c, style: l } = t;
    c && !oe(c) && (t.class = ar(c)),
      ee(l) && (Xs(l) && !D(l) && (l = fe({}, l)), (t.style = fr(l)));
  }
  const i = oe(e) ? 1 : ll(e) ? 128 : Nl(e) ? 64 : ee(e) ? 4 : k(e) ? 2 : 0;
  return To(e, t, n, r, s, i, o, !0);
}
function jl(e) {
  return e ? (Xs(e) || An in e ? fe({}, e) : e) : null;
}
function Rt(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    c = t ? Ir(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && So(c),
    ref:
      t && t.ref ? (n && s ? (D(s) ? s.concat(an(t)) : [s, an(t)]) : an(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== De ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Rt(e.ssContent),
    ssFallback: e.ssFallback && Rt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
  };
}
function Lt(e = ' ', t = 0) {
  return z(On, null, e, t);
}
function kl(e = '', t = !1) {
  return t ? (_n(), Ao(ut, null, e)) : z(ut, null, e);
}
function $e(e) {
  return e == null || typeof e == 'boolean'
    ? z(ut)
    : D(e)
    ? z(De, null, e.slice())
    : typeof e == 'object'
    ? ze(e)
    : z(On, null, String(e));
}
function ze(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Rt(e);
}
function Tr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Tr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(An in t)
        ? (t._ctx = Ee)
        : s === 3 &&
          Ee &&
          (Ee.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    k(t)
      ? ((t = { default: t, _ctx: Ee }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Lt(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ir(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class')
        t.class !== r.class && (t.class = ar([t.class, r.class]));
      else if (s === 'style') t.style = fr([t.style, r.style]);
      else if (yn(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(D(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function Te(e, t, n, r = null) {
  Pe(e, t, 7, [n, r]);
}
const Hl = Po();
let Ul = 0;
function Kl(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Hl,
    o = {
      uid: Ul++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ks(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: yo(r, s),
      emitsOptions: co(r, s),
      emit: null,
      emitted: null,
      propsDefaults: X,
      inheritAttrs: r.inheritAttrs,
      ctx: X,
      data: X,
      props: X,
      attrs: X,
      slots: X,
      refs: X,
      setupState: X,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = nl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let re = null;
const Sn = () => re || Ee,
  Ct = e => {
    (re = e), e.scope.on();
  },
  ct = () => {
    re && re.scope.off(), (re = null);
  };
function Io(e) {
  return e.vnode.shapeFlag & 4;
}
let Yt = !1;
function zl(e, t = !1) {
  Yt = t;
  const { props: n, children: r } = e.vnode,
    s = Io(e);
  Cl(e, n, s, t), Sl(e, r);
  const o = s ? Wl(e, t) : void 0;
  return (Yt = !1), o;
}
function Wl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = xr(new Proxy(e.ctx, yl)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? ql(e) : null);
    Ct(e), Tt();
    const o = Qe(r, e, 0, [e.props, s]);
    if ((It(), ct(), Ls(o))) {
      if ((o.then(ct, ct), t))
        return o
          .then(i => {
            ns(e, i, t);
          })
          .catch(i => {
            Pn(i, e, 0);
          });
      e.asyncDep = o;
    } else ns(e, o, t);
  } else $o(e, t);
}
function ns(e, t, n) {
  k(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ee(t) && (e.setupState = no(t)),
    $o(e, n);
}
let rs;
function $o(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && rs && !r.render) {
      const s = r.template || Ar(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: c, compilerOptions: l } = r,
          a = fe(fe({ isCustomElement: o, delimiters: c }, i), l);
        r.render = rs(s, a);
      }
    }
    e.render = r.render || we;
  }
  Ct(e), Tt(), El(e), It(), ct();
}
function Vl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ge(e, 'get', '$attrs'), t[n];
    },
  });
}
function ql(e) {
  const t = r => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Vl(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function $r(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(no(xr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in jt) return jt[n](e);
        },
        has(t, n) {
          return n in t || n in jt;
        },
      }))
    );
}
function Yl(e) {
  return k(e) && '__vccOpts' in e;
}
const se = (e, t) => Zi(e, t, Yt);
function Bo(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? ee(t) && !D(t)
      ? bn(t)
        ? z(e, null, [t])
        : z(e, t)
      : z(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && bn(n) && (n = [n]),
      z(e, t, n));
}
const Ql = Symbol(''),
  Zl = () => he(Ql),
  Jl = '3.2.45',
  Xl = 'http://www.w3.org/2000/svg',
  it = typeof document < 'u' ? document : null,
  ss = it && it.createElement('template'),
  Gl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? it.createElementNS(Xl, e)
        : it.createElement(e, n ? { is: n } : void 0);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          s.setAttribute('multiple', r.multiple),
        s
      );
    },
    createText: e => it.createTextNode(e),
    createComment: e => it.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => it.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        ss.innerHTML = r ? `<svg>${e}</svg>` : e;
        const c = ss.content;
        if (r) {
          const l = c.firstChild;
          for (; l.firstChild; ) c.appendChild(l.firstChild);
          c.removeChild(l);
        }
        t.insertBefore(c, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function ec(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
function tc(e, t, n) {
  const r = e.style,
    s = oe(n);
  if (n && !s) {
    for (const o in n) nr(r, o, n[o]);
    if (t && !oe(t)) for (const o in t) n[o] == null && nr(r, o, '');
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'),
      '_vod' in e && (r.display = o);
  }
}
const os = /\s*!important$/;
function nr(e, t, n) {
  if (D(n)) n.forEach(r => nr(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = nc(e, t);
    os.test(n)
      ? e.setProperty(St(r), n.replace(os, ''), 'important')
      : (e[r] = n);
  }
}
const is = ['Webkit', 'Moz', 'ms'],
  jn = {};
function nc(e, t) {
  const n = jn[t];
  if (n) return n;
  let r = wt(t);
  if (r !== 'filter' && r in e) return (jn[t] = r);
  r = Ds(r);
  for (let s = 0; s < is.length; s++) {
    const o = is[s] + r;
    if (o in e) return (jn[t] = o);
  }
  return t;
}
const ls = 'http://www.w3.org/1999/xlink';
function rc(e, t, n, r, s) {
  if (r && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(ls, t.slice(6, t.length))
      : e.setAttributeNS(ls, t, n);
  else {
    const o = li(t);
    n == null || (o && !Ns(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? '' : n);
  }
}
function sc(e, t, n, r, s, o, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, s, o), (e[t] = n ?? '');
    return;
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n;
    const l = n ?? '';
    (e.value !== l || e.tagName === 'OPTION') && (e.value = l),
      n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === '' || n == null) {
    const l = typeof e[t];
    l === 'boolean'
      ? (n = Ns(n))
      : n == null && l === 'string'
      ? ((n = ''), (c = !0))
      : l === 'number' && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function oc(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function ic(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function lc(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [c, l] = cc(t);
    if (r) {
      const a = (o[t] = ac(r, s));
      oc(e, c, a, l);
    } else i && (ic(e, c, i, l), (o[t] = void 0));
  }
}
const cs = /(?:Once|Passive|Capture)$/;
function cc(e) {
  let t;
  if (cs.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(cs)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : St(e.slice(2)), t];
}
let kn = 0;
const uc = Promise.resolve(),
  fc = () => kn || (uc.then(() => (kn = 0)), (kn = Date.now()));
function ac(e, t) {
  const n = r => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Pe(dc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = fc()), n;
}
function dc(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map(r => s => !s._stopped && r && r(s))
    );
  } else return t;
}
const us = /^on[a-z]/,
  hc = (e, t, n, r, s = !1, o, i, c, l) => {
    t === 'class'
      ? ec(e, r, s)
      : t === 'style'
      ? tc(e, n, r)
      : yn(t)
      ? dr(t) || lc(e, t, n, r, i)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : pc(e, t, r, s)
        )
      ? sc(e, t, r, o, i, c, l)
      : (t === 'true-value'
          ? (e._trueValue = r)
          : t === 'false-value' && (e._falseValue = r),
        rc(e, t, r, s));
  };
function pc(e, t, n, r) {
  return r
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && us.test(t) && k(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (us.test(t) && oe(n))
    ? !1
    : t in e;
}
const mc = fe({ patchProp: hc }, Gl);
let fs;
function gc() {
  return fs || (fs = Bl(mc));
}
const _c = (...e) => {
  const t = gc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = r => {
      const s = bc(r);
      if (!s) return;
      const o = t._component;
      !k(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = '');
      const i = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
        i
      );
    }),
    t
  );
};
function bc(e) {
  return oe(e) ? document.querySelector(e) : e;
}
var vc = !1;
/*!
 * pinia v2.0.28
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const yc = Symbol();
var as;
(function (e) {
  (e.direct = 'direct'),
    (e.patchObject = 'patch object'),
    (e.patchFunction = 'patch function');
})(as || (as = {}));
function Ec() {
  const e = bi(!0),
    t = e.run(() => Fe({}));
  let n = [],
    r = [];
  const s = xr({
    install(o) {
      (s._a = o),
        o.provide(yc, s),
        (o.config.globalProperties.$pinia = s),
        r.forEach(i => n.push(i)),
        (r = []);
    },
    use(o) {
      return !this._a && !vc ? r.push(o) : n.push(o), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const _t = typeof window < 'u';
function xc(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module';
}
const q = Object.assign;
function Hn(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Re(s) ? s.map(e) : e(s);
  }
  return n;
}
const Ht = () => {},
  Re = Array.isArray,
  wc = /\/$/,
  Pc = e => e.replace(wc, '');
function Un(e, t, n = '/') {
  let r,
    s = {},
    o = '',
    i = '';
  const c = t.indexOf('#');
  let l = t.indexOf('?');
  return (
    c < l && c >= 0 && (l = -1),
    l > -1 &&
      ((r = t.slice(0, l)),
      (o = t.slice(l + 1, c > -1 ? c : t.length)),
      (s = e(o))),
    c > -1 && ((r = r || t.slice(0, c)), (i = t.slice(c, t.length))),
    (r = Ac(r ?? t, n)),
    { fullPath: r + (o && '?') + o + i, path: r, query: s, hash: i }
  );
}
function Rc(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function ds(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function Cc(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    Ot(t.matched[r], n.matched[s]) &&
    Fo(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Ot(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Fo(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Oc(e[n], t[n])) return !1;
  return !0;
}
function Oc(e, t) {
  return Re(e) ? hs(e, t) : Re(t) ? hs(t, e) : e === t;
}
function hs(e, t) {
  return Re(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Ac(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/');
  let s = n.length - 1,
    o,
    i;
  for (o = 0; o < r.length; o++)
    if (((i = r[o]), i !== '.'))
      if (i === '..') s > 1 && s--;
      else break;
  return (
    n.slice(0, s).join('/') +
    '/' +
    r.slice(o - (o === r.length ? 1 : 0)).join('/')
  );
}
var Qt;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(Qt || (Qt = {}));
var Ut;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(Ut || (Ut = {}));
function Sc(e) {
  if (!e)
    if (_t) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), Pc(e);
}
const Tc = /^[^#]+#/;
function Ic(e, t) {
  return e.replace(Tc, '#') + t;
}
function $c(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Tn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Bc(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = $c(s, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function ps(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const rr = new Map();
function Fc(e, t) {
  rr.set(e, t);
}
function Mc(e) {
  const t = rr.get(e);
  return rr.delete(e), t;
}
let Nc = () => location.protocol + '//' + location.host;
function Mo(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf('#');
  if (o > -1) {
    let c = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      l = s.slice(c);
    return l[0] !== '/' && (l = '/' + l), ds(l, '');
  }
  return ds(n, e) + r + s;
}
function Lc(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const c = ({ state: p }) => {
    const v = Mo(e, location),
      C = n.value,
      A = t.value;
    let L = 0;
    if (p) {
      if (((n.value = v), (t.value = p), i && i === C)) {
        i = null;
        return;
      }
      L = A ? p.position - A.position : 0;
    } else r(v);
    s.forEach(T => {
      T(n.value, C, {
        delta: L,
        type: Qt.pop,
        direction: L ? (L > 0 ? Ut.forward : Ut.back) : Ut.unknown,
      });
    });
  };
  function l() {
    i = n.value;
  }
  function a(p) {
    s.push(p);
    const v = () => {
      const C = s.indexOf(p);
      C > -1 && s.splice(C, 1);
    };
    return o.push(v), v;
  }
  function f() {
    const { history: p } = window;
    p.state && p.replaceState(q({}, p.state, { scroll: Tn() }), '');
  }
  function h() {
    for (const p of o) p();
    (o = []),
      window.removeEventListener('popstate', c),
      window.removeEventListener('beforeunload', f);
  }
  return (
    window.addEventListener('popstate', c),
    window.addEventListener('beforeunload', f),
    { pauseListeners: l, listen: a, destroy: h }
  );
}
function ms(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Tn() : null,
  };
}
function Dc(e) {
  const { history: t, location: n } = window,
    r = { value: Mo(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(l, a, f) {
    const h = e.indexOf('#'),
      p =
        h > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(h)) + l
          : Nc() + e + l;
    try {
      t[f ? 'replaceState' : 'pushState'](a, '', p), (s.value = a);
    } catch (v) {
      console.error(v), n[f ? 'replace' : 'assign'](p);
    }
  }
  function i(l, a) {
    const f = q({}, t.state, ms(s.value.back, l, s.value.forward, !0), a, {
      position: s.value.position,
    });
    o(l, f, !0), (r.value = l);
  }
  function c(l, a) {
    const f = q({}, s.value, t.state, { forward: l, scroll: Tn() });
    o(f.current, f, !0);
    const h = q({}, ms(r.value, l, null), { position: f.position + 1 }, a);
    o(l, h, !1), (r.value = l);
  }
  return { location: r, state: s, push: c, replace: i };
}
function jc(e) {
  e = Sc(e);
  const t = Dc(e),
    n = Lc(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = q(
    { location: '', base: e, go: r, createHref: Ic.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function kc(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ''),
    e.includes('#') || (e += '#'),
    jc(e)
  );
}
function Hc(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function No(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const Ke = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Lo = Symbol('');
var gs;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(gs || (gs = {}));
function At(e, t) {
  return q(new Error(), { type: e, [Lo]: !0 }, t);
}
function Ne(e, t) {
  return e instanceof Error && Lo in e && (t == null || !!(e.type & t));
}
const _s = '[^/]+?',
  Uc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Kc = /[.+*?^${}()[\]/\\]/g;
function zc(e, t) {
  const n = q({}, Uc, t),
    r = [];
  let s = n.start ? '^' : '';
  const o = [];
  for (const a of e) {
    const f = a.length ? [] : [90];
    n.strict && !a.length && (s += '/');
    for (let h = 0; h < a.length; h++) {
      const p = a[h];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        h || (s += '/'), (s += p.value.replace(Kc, '\\$&')), (v += 40);
      else if (p.type === 1) {
        const { value: C, repeatable: A, optional: L, regexp: T } = p;
        o.push({ name: C, repeatable: A, optional: L });
        const N = T || _s;
        if (N !== _s) {
          v += 10;
          try {
            new RegExp(`(${N})`);
          } catch (V) {
            throw new Error(
              `Invalid custom RegExp for param "${C}" (${N}): ` + V.message
            );
          }
        }
        let F = A ? `((?:${N})(?:/(?:${N}))*)` : `(${N})`;
        h || (F = L && a.length < 2 ? `(?:/${F})` : '/' + F),
          L && (F += '?'),
          (s += F),
          (v += 20),
          L && (v += -8),
          A && (v += -20),
          N === '.*' && (v += -50);
      }
      f.push(v);
    }
    r.push(f);
  }
  if (n.strict && n.end) {
    const a = r.length - 1;
    r[a][r[a].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += '/?'), n.end ? (s += '$') : n.strict && (s += '(?:/|$)');
  const i = new RegExp(s, n.sensitive ? '' : 'i');
  function c(a) {
    const f = a.match(i),
      h = {};
    if (!f) return null;
    for (let p = 1; p < f.length; p++) {
      const v = f[p] || '',
        C = o[p - 1];
      h[C.name] = v && C.repeatable ? v.split('/') : v;
    }
    return h;
  }
  function l(a) {
    let f = '',
      h = !1;
    for (const p of e) {
      (!h || !f.endsWith('/')) && (f += '/'), (h = !1);
      for (const v of p)
        if (v.type === 0) f += v.value;
        else if (v.type === 1) {
          const { value: C, repeatable: A, optional: L } = v,
            T = C in a ? a[C] : '';
          if (Re(T) && !A)
            throw new Error(
              `Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`
            );
          const N = Re(T) ? T.join('/') : T;
          if (!N)
            if (L)
              p.length < 2 &&
                (f.endsWith('/') ? (f = f.slice(0, -1)) : (h = !0));
            else throw new Error(`Missing required param "${C}"`);
          f += N;
        }
    }
    return f || '/';
  }
  return { re: i, score: r, keys: o, parse: c, stringify: l };
}
function Wc(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Vc(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = Wc(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (bs(r)) return 1;
    if (bs(s)) return -1;
  }
  return s.length - r.length;
}
function bs(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const qc = { type: 0, value: '' },
  Yc = /[a-zA-Z0-9_]/;
function Qc(e) {
  if (!e) return [[]];
  if (e === '/') return [[qc]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${a}": ${v}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let c = 0,
    l,
    a = '',
    f = '';
  function h() {
    a &&
      (n === 0
        ? o.push({ type: 0, value: a })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (l === '*' || l === '+') &&
            t(
              `A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: a,
            regexp: f,
            repeatable: l === '*' || l === '+',
            optional: l === '*' || l === '?',
          }))
        : t('Invalid state to consume buffer'),
      (a = ''));
  }
  function p() {
    a += l;
  }
  for (; c < e.length; ) {
    if (((l = e[c++]), l === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === '/' ? (a && h(), i()) : l === ':' ? (h(), (n = 1)) : p();
        break;
      case 4:
        p(), (n = r);
        break;
      case 1:
        l === '('
          ? (n = 2)
          : Yc.test(l)
          ? p()
          : (h(), (n = 0), l !== '*' && l !== '?' && l !== '+' && c--);
        break;
      case 2:
        l === ')'
          ? f[f.length - 1] == '\\'
            ? (f = f.slice(0, -1) + l)
            : (n = 3)
          : (f += l);
        break;
      case 3:
        h(), (n = 0), l !== '*' && l !== '?' && l !== '+' && c--, (f = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${a}"`), h(), i(), s;
}
function Zc(e, t, n) {
  const r = zc(Qc(e.path), n),
    s = q(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Jc(e, t) {
  const n = [],
    r = new Map();
  t = Es({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(f) {
    return r.get(f);
  }
  function o(f, h, p) {
    const v = !p,
      C = Xc(f);
    C.aliasOf = p && p.record;
    const A = Es(t, f),
      L = [C];
    if ('alias' in f) {
      const F = typeof f.alias == 'string' ? [f.alias] : f.alias;
      for (const V of F)
        L.push(
          q({}, C, {
            components: p ? p.record.components : C.components,
            path: V,
            aliasOf: p ? p.record : C,
          })
        );
    }
    let T, N;
    for (const F of L) {
      const { path: V } = F;
      if (h && V[0] !== '/') {
        const ie = h.record.path,
          pe = ie[ie.length - 1] === '/' ? '' : '/';
        F.path = h.record.path + (V && pe + V);
      }
      if (
        ((T = Zc(F, h, A)),
        p
          ? p.alias.push(T)
          : ((N = N || T),
            N !== T && N.alias.push(T),
            v && f.name && !ys(T) && i(f.name)),
        C.children)
      ) {
        const ie = C.children;
        for (let pe = 0; pe < ie.length; pe++)
          o(ie[pe], T, p && p.children[pe]);
      }
      (p = p || T),
        ((T.record.components && Object.keys(T.record.components).length) ||
          T.record.name ||
          T.record.redirect) &&
          l(T);
    }
    return N
      ? () => {
          i(N);
        }
      : Ht;
  }
  function i(f) {
    if (No(f)) {
      const h = r.get(f);
      h &&
        (r.delete(f),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(i),
        h.alias.forEach(i));
    } else {
      const h = n.indexOf(f);
      h > -1 &&
        (n.splice(h, 1),
        f.record.name && r.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function c() {
    return n;
  }
  function l(f) {
    let h = 0;
    for (
      ;
      h < n.length &&
      Vc(f, n[h]) >= 0 &&
      (f.record.path !== n[h].record.path || !Do(f, n[h]));

    )
      h++;
    n.splice(h, 0, f), f.record.name && !ys(f) && r.set(f.record.name, f);
  }
  function a(f, h) {
    let p,
      v = {},
      C,
      A;
    if ('name' in f && f.name) {
      if (((p = r.get(f.name)), !p)) throw At(1, { location: f });
      (A = p.record.name),
        (v = q(
          vs(
            h.params,
            p.keys.filter(N => !N.optional).map(N => N.name)
          ),
          f.params &&
            vs(
              f.params,
              p.keys.map(N => N.name)
            )
        )),
        (C = p.stringify(v));
    } else if ('path' in f)
      (C = f.path),
        (p = n.find(N => N.re.test(C))),
        p && ((v = p.parse(C)), (A = p.record.name));
    else {
      if (((p = h.name ? r.get(h.name) : n.find(N => N.re.test(h.path))), !p))
        throw At(1, { location: f, currentLocation: h });
      (A = p.record.name),
        (v = q({}, h.params, f.params)),
        (C = p.stringify(v));
    }
    const L = [];
    let T = p;
    for (; T; ) L.unshift(T.record), (T = T.parent);
    return { name: A, path: C, params: v, matched: L, meta: eu(L) };
  }
  return (
    e.forEach(f => o(f)),
    {
      addRoute: o,
      resolve: a,
      removeRoute: i,
      getRoutes: c,
      getRecordMatcher: s,
    }
  );
}
function vs(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Xc(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Gc(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && { default: e.component },
  };
}
function Gc(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'boolean' ? n : n[r];
  return t;
}
function ys(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function eu(e) {
  return e.reduce((t, n) => q(t, n.meta), {});
}
function Es(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Do(e, t) {
  return t.children.some(n => n === e || Do(e, n));
}
const jo = /#/g,
  tu = /&/g,
  nu = /\//g,
  ru = /=/g,
  su = /\?/g,
  ko = /\+/g,
  ou = /%5B/g,
  iu = /%5D/g,
  Ho = /%5E/g,
  lu = /%60/g,
  Uo = /%7B/g,
  cu = /%7C/g,
  Ko = /%7D/g,
  uu = /%20/g;
function Br(e) {
  return encodeURI('' + e)
    .replace(cu, '|')
    .replace(ou, '[')
    .replace(iu, ']');
}
function fu(e) {
  return Br(e).replace(Uo, '{').replace(Ko, '}').replace(Ho, '^');
}
function sr(e) {
  return Br(e)
    .replace(ko, '%2B')
    .replace(uu, '+')
    .replace(jo, '%23')
    .replace(tu, '%26')
    .replace(lu, '`')
    .replace(Uo, '{')
    .replace(Ko, '}')
    .replace(Ho, '^');
}
function au(e) {
  return sr(e).replace(ru, '%3D');
}
function du(e) {
  return Br(e).replace(jo, '%23').replace(su, '%3F');
}
function hu(e) {
  return e == null ? '' : du(e).replace(nu, '%2F');
}
function vn(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
function pu(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(ko, ' '),
      i = o.indexOf('='),
      c = vn(i < 0 ? o : o.slice(0, i)),
      l = i < 0 ? null : vn(o.slice(i + 1));
    if (c in t) {
      let a = t[c];
      Re(a) || (a = t[c] = [a]), a.push(l);
    } else t[c] = l;
  }
  return t;
}
function xs(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = au(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (Re(r) ? r.map(o => o && sr(o)) : [r && sr(r)]).forEach(o => {
      o !== void 0 &&
        ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o));
    });
  }
  return t;
}
function mu(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Re(r)
        ? r.map(s => (s == null ? null : '' + s))
        : r == null
        ? r
        : '' + r);
  }
  return t;
}
const gu = Symbol(''),
  ws = Symbol(''),
  In = Symbol(''),
  Fr = Symbol(''),
  or = Symbol('');
function Mt() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function We(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((i, c) => {
      const l = h => {
          h === !1
            ? c(At(4, { from: n, to: t }))
            : h instanceof Error
            ? c(h)
            : Hc(h)
            ? c(At(2, { from: t, to: h }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof h == 'function' &&
                o.push(h),
              i());
        },
        a = e.call(r && r.instances[s], t, n, l);
      let f = Promise.resolve(a);
      e.length < 3 && (f = f.then(l)), f.catch(h => c(h));
    });
}
function Kn(e, t, n, r) {
  const s = [];
  for (const o of e)
    for (const i in o.components) {
      let c = o.components[i];
      if (!(t !== 'beforeRouteEnter' && !o.instances[i]))
        if (_u(c)) {
          const a = (c.__vccOpts || c)[t];
          a && s.push(We(a, n, r, o, i));
        } else {
          let l = c();
          s.push(() =>
            l.then(a => {
              if (!a)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const f = xc(a) ? a.default : a;
              o.components[i] = f;
              const p = (f.__vccOpts || f)[t];
              return p && We(p, n, r, o, i)();
            })
          );
        }
    }
  return s;
}
function _u(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function Ps(e) {
  const t = he(In),
    n = he(Fr),
    r = se(() => t.resolve(Ye(e.to))),
    s = se(() => {
      const { matched: l } = r.value,
        { length: a } = l,
        f = l[a - 1],
        h = n.matched;
      if (!f || !h.length) return -1;
      const p = h.findIndex(Ot.bind(null, f));
      if (p > -1) return p;
      const v = Rs(l[a - 2]);
      return a > 1 && Rs(f) === v && h[h.length - 1].path !== v
        ? h.findIndex(Ot.bind(null, l[a - 2]))
        : p;
    }),
    o = se(() => s.value > -1 && Eu(n.params, r.value.params)),
    i = se(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        Fo(n.params, r.value.params)
    );
  function c(l = {}) {
    return yu(l)
      ? t[Ye(e.replace) ? 'replace' : 'push'](Ye(e.to)).catch(Ht)
      : Promise.resolve();
  }
  return {
    route: r,
    href: se(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: c,
  };
}
const bu = ft({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: Ps,
    setup(e, { slots: t }) {
      const n = Xe(Ps(e)),
        { options: r } = he(In),
        s = se(() => ({
          [Cs(e.activeClass, r.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [Cs(
            e.exactActiveClass,
            r.linkExactActiveClass,
            'router-link-exact-active'
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Bo(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              o
            );
      };
    },
  }),
  vu = bu;
function yu(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Eu(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == 'string') {
      if (r !== s) return !1;
    } else if (!Re(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function Rs(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const Cs = (e, t, n) => e ?? t ?? n,
  xu = ft({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = he(or),
        s = se(() => e.route || r.value),
        o = he(ws, 0),
        i = se(() => {
          let a = Ye(o);
          const { matched: f } = s.value;
          let h;
          for (; (h = f[a]) && !h.components; ) a++;
          return a;
        }),
        c = se(() => s.value.matched[i.value]);
      xt(
        ws,
        se(() => i.value + 1)
      ),
        xt(gu, c),
        xt(or, s);
      const l = Fe();
      return (
        Ze(
          () => [l.value, c.value, e.name],
          ([a, f, h], [p, v, C]) => {
            f &&
              ((f.instances[h] = a),
              v &&
                v !== f &&
                a &&
                a === p &&
                (f.leaveGuards.size || (f.leaveGuards = v.leaveGuards),
                f.updateGuards.size || (f.updateGuards = v.updateGuards))),
              a &&
                f &&
                (!v || !Ot(f, v) || !p) &&
                (f.enterCallbacks[h] || []).forEach(A => A(a));
          },
          { flush: 'post' }
        ),
        () => {
          const a = s.value,
            f = e.name,
            h = c.value,
            p = h && h.components[f];
          if (!p) return Os(n.default, { Component: p, route: a });
          const v = h.props[f],
            C = v
              ? v === !0
                ? a.params
                : typeof v == 'function'
                ? v(a)
                : v
              : null,
            L = Bo(
              p,
              q({}, C, t, {
                onVnodeUnmounted: T => {
                  T.component.isUnmounted && (h.instances[f] = null);
                },
                ref: l,
              })
            );
          return Os(n.default, { Component: L, route: a }) || L;
        }
      );
    },
  });
function Os(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const zo = xu;
function wu(e) {
  const t = Jc(e.routes, e),
    n = e.parseQuery || pu,
    r = e.stringifyQuery || xs,
    s = e.history,
    o = Mt(),
    i = Mt(),
    c = Mt(),
    l = Vi(Ke);
  let a = Ke;
  _t &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const f = Hn.bind(null, _ => '' + _),
    h = Hn.bind(null, hu),
    p = Hn.bind(null, vn);
  function v(_, O) {
    let P, I;
    return (
      No(_) ? ((P = t.getRecordMatcher(_)), (I = O)) : (I = _), t.addRoute(I, P)
    );
  }
  function C(_) {
    const O = t.getRecordMatcher(_);
    O && t.removeRoute(O);
  }
  function A() {
    return t.getRoutes().map(_ => _.record);
  }
  function L(_) {
    return !!t.getRecordMatcher(_);
  }
  function T(_, O) {
    if (((O = q({}, O || l.value)), typeof _ == 'string')) {
      const u = Un(n, _, O.path),
        d = t.resolve({ path: u.path }, O),
        m = s.createHref(u.fullPath);
      return q(u, d, {
        params: p(d.params),
        hash: vn(u.hash),
        redirectedFrom: void 0,
        href: m,
      });
    }
    let P;
    if ('path' in _) P = q({}, _, { path: Un(n, _.path, O.path).path });
    else {
      const u = q({}, _.params);
      for (const d in u) u[d] == null && delete u[d];
      (P = q({}, _, { params: h(_.params) })), (O.params = h(O.params));
    }
    const I = t.resolve(P, O),
      U = _.hash || '';
    I.params = f(p(I.params));
    const G = Rc(r, q({}, _, { hash: fu(U), path: I.path })),
      j = s.createHref(G);
    return q(
      { fullPath: G, hash: U, query: r === xs ? mu(_.query) : _.query || {} },
      I,
      { redirectedFrom: void 0, href: j }
    );
  }
  function N(_) {
    return typeof _ == 'string' ? Un(n, _, l.value.path) : q({}, _);
  }
  function F(_, O) {
    if (a !== _) return At(8, { from: O, to: _ });
  }
  function V(_) {
    return Ce(_);
  }
  function ie(_) {
    return V(q(N(_), { replace: !0 }));
  }
  function pe(_) {
    const O = _.matched[_.matched.length - 1];
    if (O && O.redirect) {
      const { redirect: P } = O;
      let I = typeof P == 'function' ? P(_) : P;
      return (
        typeof I == 'string' &&
          ((I = I.includes('?') || I.includes('#') ? (I = N(I)) : { path: I }),
          (I.params = {})),
        q(
          { query: _.query, hash: _.hash, params: 'path' in I ? {} : _.params },
          I
        )
      );
    }
  }
  function Ce(_, O) {
    const P = (a = T(_)),
      I = l.value,
      U = _.state,
      G = _.force,
      j = _.replace === !0,
      u = pe(P);
    if (u)
      return Ce(
        q(N(u), {
          state: typeof u == 'object' ? q({}, U, u.state) : U,
          force: G,
          replace: j,
        }),
        O || P
      );
    const d = P;
    d.redirectedFrom = O;
    let m;
    return (
      !G && Cc(r, I, P) && ((m = At(16, { to: d, from: I })), tt(I, I, !0, !1)),
      (m ? Promise.resolve(m) : at(d, I))
        .catch(g => (Ne(g) ? (Ne(g, 2) ? g : _e(g)) : Z(g, d, I)))
        .then(g => {
          if (g) {
            if (Ne(g, 2))
              return Ce(
                q({ replace: j }, N(g.to), {
                  state: typeof g.to == 'object' ? q({}, U, g.to.state) : U,
                  force: G,
                }),
                O || d
              );
          } else g = He(d, I, !0, j, U);
          return Oe(d, I, g), g;
        })
    );
  }
  function Me(_, O) {
    const P = F(_, O);
    return P ? Promise.reject(P) : Promise.resolve();
  }
  function at(_, O) {
    let P;
    const [I, U, G] = Pu(_, O);
    P = Kn(I.reverse(), 'beforeRouteLeave', _, O);
    for (const u of I)
      u.leaveGuards.forEach(d => {
        P.push(We(d, _, O));
      });
    const j = Me.bind(null, _, O);
    return (
      P.push(j),
      mt(P)
        .then(() => {
          P = [];
          for (const u of o.list()) P.push(We(u, _, O));
          return P.push(j), mt(P);
        })
        .then(() => {
          P = Kn(U, 'beforeRouteUpdate', _, O);
          for (const u of U)
            u.updateGuards.forEach(d => {
              P.push(We(d, _, O));
            });
          return P.push(j), mt(P);
        })
        .then(() => {
          P = [];
          for (const u of _.matched)
            if (u.beforeEnter && !O.matched.includes(u))
              if (Re(u.beforeEnter))
                for (const d of u.beforeEnter) P.push(We(d, _, O));
              else P.push(We(u.beforeEnter, _, O));
          return P.push(j), mt(P);
        })
        .then(
          () => (
            _.matched.forEach(u => (u.enterCallbacks = {})),
            (P = Kn(G, 'beforeRouteEnter', _, O)),
            P.push(j),
            mt(P)
          )
        )
        .then(() => {
          P = [];
          for (const u of i.list()) P.push(We(u, _, O));
          return P.push(j), mt(P);
        })
        .catch(u => (Ne(u, 8) ? u : Promise.reject(u)))
    );
  }
  function Oe(_, O, P) {
    for (const I of c.list()) I(_, O, P);
  }
  function He(_, O, P, I, U) {
    const G = F(_, O);
    if (G) return G;
    const j = O === Ke,
      u = _t ? history.state : {};
    P &&
      (I || j
        ? s.replace(_.fullPath, q({ scroll: j && u && u.scroll }, U))
        : s.push(_.fullPath, U)),
      (l.value = _),
      tt(_, O, P, j),
      _e();
  }
  let Ae;
  function dt() {
    Ae ||
      (Ae = s.listen((_, O, P) => {
        if (!Gt.listening) return;
        const I = T(_),
          U = pe(I);
        if (U) {
          Ce(q(U, { replace: !0 }), I).catch(Ht);
          return;
        }
        a = I;
        const G = l.value;
        _t && Fc(ps(G.fullPath, P.delta), Tn()),
          at(I, G)
            .catch(j =>
              Ne(j, 12)
                ? j
                : Ne(j, 2)
                ? (Ce(j.to, I)
                    .then(u => {
                      Ne(u, 20) &&
                        !P.delta &&
                        P.type === Qt.pop &&
                        s.go(-1, !1);
                    })
                    .catch(Ht),
                  Promise.reject())
                : (P.delta && s.go(-P.delta, !1), Z(j, I, G))
            )
            .then(j => {
              (j = j || He(I, G, !1)),
                j &&
                  (P.delta && !Ne(j, 8)
                    ? s.go(-P.delta, !1)
                    : P.type === Qt.pop && Ne(j, 20) && s.go(-1, !1)),
                Oe(I, G, j);
            })
            .catch(Ht);
      }));
  }
  let et = Mt(),
    $t = Mt(),
    te;
  function Z(_, O, P) {
    _e(_);
    const I = $t.list();
    return (
      I.length ? I.forEach(U => U(_, O, P)) : console.error(_),
      Promise.reject(_)
    );
  }
  function Y() {
    return te && l.value !== Ke
      ? Promise.resolve()
      : new Promise((_, O) => {
          et.add([_, O]);
        });
  }
  function _e(_) {
    return (
      te ||
        ((te = !_),
        dt(),
        et.list().forEach(([O, P]) => (_ ? P(_) : O())),
        et.reset()),
      _
    );
  }
  function tt(_, O, P, I) {
    const { scrollBehavior: U } = e;
    if (!_t || !U) return Promise.resolve();
    const G =
      (!P && Mc(ps(_.fullPath, 0))) ||
      ((I || !P) && history.state && history.state.scroll) ||
      null;
    return pn()
      .then(() => U(_, O, G))
      .then(j => j && Bc(j))
      .catch(j => Z(j, _, O));
  }
  const be = _ => s.go(_);
  let ae;
  const ht = new Set(),
    Gt = {
      currentRoute: l,
      listening: !0,
      addRoute: v,
      removeRoute: C,
      hasRoute: L,
      getRoutes: A,
      resolve: T,
      options: e,
      push: V,
      replace: ie,
      go: be,
      back: () => be(-1),
      forward: () => be(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: c.add,
      onError: $t.add,
      isReady: Y,
      install(_) {
        const O = this;
        _.component('RouterLink', vu),
          _.component('RouterView', zo),
          (_.config.globalProperties.$router = O),
          Object.defineProperty(_.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => Ye(l),
          }),
          _t &&
            !ae &&
            l.value === Ke &&
            ((ae = !0), V(s.location).catch(U => {}));
        const P = {};
        for (const U in Ke) P[U] = se(() => l.value[U]);
        _.provide(In, O), _.provide(Fr, Xe(P)), _.provide(or, l);
        const I = _.unmount;
        ht.add(_),
          (_.unmount = function () {
            ht.delete(_),
              ht.size < 1 &&
                ((a = Ke),
                Ae && Ae(),
                (Ae = null),
                (l.value = Ke),
                (ae = !1),
                (te = !1)),
              I();
          });
      },
    };
  return Gt;
}
function mt(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Pu(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const c = t.matched[i];
    c && (e.matched.find(a => Ot(a, c)) ? r.push(c) : n.push(c));
    const l = e.matched[i];
    l && (t.matched.find(a => Ot(a, l)) || s.push(l));
  }
  return [n, r, s];
}
function $f() {
  return he(In);
}
function Ru() {
  return he(Fr);
}
const Zt = e => e != null,
  ir = e => typeof e == 'function',
  $n = e => e !== null && typeof e == 'object',
  Cu = e => $n(e) && ir(e.then) && ir(e.catch),
  Wo = e => typeof e == 'number' || /^\d+(\.\d+)?$/.test(e),
  Ou = () =>
    qo ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
function Au() {}
const Vo = Object.assign,
  qo = typeof window < 'u';
function As(e, t) {
  const n = t.split('.');
  let r = e;
  return (
    n.forEach(s => {
      var o;
      r = $n(r) && (o = r[s]) != null ? o : '';
    }),
    r
  );
}
const Ge = [Number, String],
  lr = { type: Boolean, default: !0 },
  Su = e => ({ type: Ge, default: e }),
  Jt = e => ({ type: String, default: e });
var Tu = typeof window < 'u',
  Iu = e => e === window,
  Ss = (e, t) => ({
    top: 0,
    left: 0,
    right: e,
    bottom: t,
    width: e,
    height: t,
  }),
  $u = e => {
    const t = Ye(e);
    if (Iu(t)) {
      const n = t.innerWidth,
        r = t.innerHeight;
      return Ss(n, r);
    }
    return t != null && t.getBoundingClientRect
      ? t.getBoundingClientRect()
      : Ss(0, 0);
  };
function Bu(e) {
  const t = he(e, null);
  if (t) {
    const n = Sn(),
      { link: r, unlink: s, internalChildren: o } = t;
    r(n), Or(() => s(n));
    const i = se(() => o.indexOf(n));
    return { parent: t, index: i };
  }
  return { parent: null, index: Fe(-1) };
}
function Fu(e) {
  const t = [],
    n = r => {
      Array.isArray(r) &&
        r.forEach(s => {
          var o;
          bn(s) &&
            (t.push(s),
            (o = s.component) != null &&
              o.subTree &&
              (t.push(s.component.subTree), n(s.component.subTree.children)),
            s.children && n(s.children));
        });
    };
  return n(e), t;
}
function Mu(e, t, n) {
  const r = Fu(e.subTree.children);
  n.sort((o, i) => r.indexOf(o.vnode) - r.indexOf(i.vnode));
  const s = n.map(o => o.proxy);
  t.sort((o, i) => {
    const c = s.indexOf(o),
      l = s.indexOf(i);
    return c - l;
  });
}
function Nu(e) {
  const t = Xe([]),
    n = Xe([]),
    r = Sn();
  return {
    children: t,
    linkChildren: o => {
      xt(
        e,
        Object.assign(
          {
            link: l => {
              l.proxy && (n.push(l), t.push(l.proxy), Mu(r, t, n));
            },
            unlink: l => {
              const a = n.indexOf(l);
              t.splice(a, 1), n.splice(a, 1);
            },
            children: t,
            internalChildren: n,
          },
          o
        )
      );
    },
  };
}
var ln, zn;
function Lu() {
  if (!ln && ((ln = Fe(0)), (zn = Fe(0)), Tu)) {
    const e = () => {
      (ln.value = window.innerWidth), (zn.value = window.innerHeight);
    };
    e(),
      window.addEventListener('resize', e, { passive: !0 }),
      window.addEventListener('orientationchange', e, { passive: !0 });
  }
  return { width: ln, height: zn };
}
Ou();
const Du = e => e.stopPropagation();
function Bf(e, t) {
  (typeof e.cancelable != 'boolean' || e.cancelable) && e.preventDefault(),
    t && Du(e);
}
const { width: ju, height: ku } = Lu();
function Ve(e) {
  if (Zt(e)) return Wo(e) ? `${e}px` : String(e);
}
function Ff(e) {
  if (Zt(e)) {
    if (Array.isArray(e)) return { width: Ve(e[0]), height: Ve(e[1]) };
    const t = Ve(e);
    return { width: t, height: t };
  }
}
function Hu(e) {
  const t = {};
  return e !== void 0 && (t.zIndex = +e), t;
}
const Uu = /-(\w)/g,
  Yo = e => e.replace(Uu, (t, n) => n.toUpperCase()),
  Ku = e =>
    e
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, ''),
  { hasOwnProperty: zu } = Object.prototype;
function Wu(e, t, n) {
  const r = t[n];
  Zt(r) &&
    (!zu.call(e, n) || !$n(r) ? (e[n] = r) : (e[n] = Qo(Object(e[n]), r)));
}
function Qo(e, t) {
  return (
    Object.keys(t).forEach(n => {
      Wu(e, t, n);
    }),
    e
  );
}
var Vu = {
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  loading: '加载中...',
  noCoupon: '暂无优惠券',
  nameEmpty: '请填写姓名',
  addContact: '添加联系人',
  telInvalid: '请填写正确的电话',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (e, t) => `${e}年${t}月`,
    rangePrompt: e => `最多选择 ${e} 天`,
  },
  vanCascader: { select: '请选择' },
  vanPagination: { prev: '上一页', next: '下一页' },
  vanPullRefresh: { pulling: '下拉即可刷新...', loosing: '释放即可刷新...' },
  vanSubmitBar: { label: '合计:' },
  vanCoupon: {
    unlimited: '无门槛',
    discount: e => `${e}折`,
    condition: e => `满${e}元可用`,
  },
  vanCouponCell: { title: '优惠券', count: e => `${e}张可用` },
  vanCouponList: {
    exchange: '兑换',
    close: '不使用',
    enable: '可用',
    disabled: '不可用',
    placeholder: '输入优惠码',
  },
  vanAddressEdit: {
    area: '地区',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    addressDetail: '详细地址',
    defaultAddress: '设为默认收货地址',
  },
  vanAddressList: { add: '新增地址' },
};
const Ts = Fe('zh-CN'),
  Is = Xe({ 'zh-CN': Vu }),
  qu = {
    messages() {
      return Is[Ts.value];
    },
    use(e, t) {
      (Ts.value = e), this.add({ [e]: t });
    },
    add(e = {}) {
      Qo(Is, e);
    },
  };
var Yu = qu;
function Qu(e) {
  const t = Yo(e) + '.';
  return (n, ...r) => {
    const s = Yu.messages(),
      o = As(s, t + n) || As(s, n);
    return ir(o) ? o(...r) : o;
  };
}
function cr(e, t) {
  return t
    ? typeof t == 'string'
      ? ` ${e}--${t}`
      : Array.isArray(t)
      ? t.reduce((n, r) => n + cr(e, r), '')
      : Object.keys(t).reduce((n, r) => n + (t[r] ? cr(e, r) : ''), '')
    : '';
}
function Zu(e) {
  return (t, n) => (
    t && typeof t != 'string' && ((n = t), (t = '')),
    (t = t ? `${e}__${t}` : e),
    `${t}${cr(t, n)}`
  );
}
function Xt(e) {
  const t = `van-${e}`;
  return [t, Zu(t), Qu(t)];
}
const Zo = 'van-hairline',
  Mf = `${Zo}--surround`,
  Ju = `${Zo}--top-bottom`;
function Xu(e, { args: t = [], done: n, canceled: r }) {
  if (e) {
    const s = e.apply(null, t);
    Cu(s)
      ? s
          .then(o => {
            o ? n() : r && r();
          })
          .catch(Au)
      : s
      ? n()
      : r && r();
  } else n();
}
function Bn(e) {
  return (
    (e.install = t => {
      const { name: n } = e;
      n && (t.component(n, e), t.component(Yo(`-${n}`), e));
    }),
    e
  );
}
const Gu = Symbol();
function ef(e) {
  const t = he(Gu, null);
  t &&
    Ze(t, n => {
      n && e();
    });
}
const tf = (e, t) => {
  const n = Fe(),
    r = () => {
      n.value = $u(e).height;
    };
  return (
    go(() => {
      if ((pn(r), t)) for (let s = 1; s <= 3; s++) setTimeout(r, 100 * s);
    }),
    ef(() => pn(r)),
    Ze([ju, ku], r),
    n
  );
};
function nf(e, t) {
  const n = tf(e, !0);
  return r =>
    z(
      'div',
      {
        class: t('placeholder'),
        style: { height: n.value ? `${n.value}px` : void 0 },
      },
      [r()]
    );
}
const rf = { to: [String, Object], url: String, replace: Boolean };
function sf({ to: e, url: t, replace: n, $router: r }) {
  e && r
    ? r[n ? 'replace' : 'push'](e)
    : t && (n ? location.replace(t) : (location.href = t));
}
function of() {
  const e = Sn().proxy;
  return () => sf(e);
}
const [lf, $s] = Xt('badge'),
  cf = {
    dot: Boolean,
    max: Ge,
    tag: Jt('div'),
    color: String,
    offset: Array,
    content: Ge,
    showZero: lr,
    position: Jt('top-right'),
  };
var uf = ft({
  name: lf,
  props: cf,
  setup(e, { slots: t }) {
    const n = () => {
        if (t.content) return !0;
        const { content: i, showZero: c } = e;
        return Zt(i) && i !== '' && (c || (i !== 0 && i !== '0'));
      },
      r = () => {
        const { dot: i, max: c, content: l } = e;
        if (!i && n())
          return t.content
            ? t.content()
            : Zt(c) && Wo(l) && +l > c
            ? `${c}+`
            : l;
      },
      s = se(() => {
        const i = { background: e.color };
        if (e.offset) {
          const [c, l] = e.offset;
          t.default
            ? ((i.top = Ve(l)),
              typeof c == 'number'
                ? (i.right = Ve(-c))
                : (i.right = c.startsWith('-') ? c.replace('-', '') : `-${c}`))
            : ((i.marginTop = Ve(l)), (i.marginLeft = Ve(c)));
        }
        return i;
      }),
      o = () => {
        if (n() || e.dot)
          return z(
            'div',
            {
              class: $s([e.position, { dot: e.dot, fixed: !!t.default }]),
              style: s.value,
            },
            [r()]
          );
      };
    return () => {
      if (t.default) {
        const { tag: i } = e;
        return z(
          i,
          { class: $s('wrapper') },
          { default: () => [t.default(), o()] }
        );
      }
      return o();
    };
  },
});
const Jo = Bn(uf),
  ff = e => {},
  [Xo, af] = Xt('config-provider'),
  Go = Symbol(Xo),
  df = {
    tag: Jt('div'),
    theme: Jt('light'),
    zIndex: Number,
    themeVars: Object,
    themeVarsDark: Object,
    themeVarsLight: Object,
    iconPrefix: String,
  };
function hf(e) {
  const t = {};
  return (
    Object.keys(e).forEach(n => {
      t[`--van-${Ku(n)}`] = e[n];
    }),
    t
  );
}
ft({
  name: Xo,
  props: df,
  setup(e, { slots: t }) {
    const n = se(() =>
      hf(
        Vo(
          {},
          e.themeVars,
          e.theme === 'dark' ? e.themeVarsDark : e.themeVarsLight
        )
      )
    );
    if (qo) {
      const r = () => {
          document.documentElement.classList.add(`van-theme-${e.theme}`);
        },
        s = (o = e.theme) => {
          document.documentElement.classList.remove(`van-theme-${o}`);
        };
      Ze(
        () => e.theme,
        (o, i) => {
          i && s(i), r();
        },
        { immediate: !0 }
      ),
        ho(r),
        po(s),
        _o(s);
    }
    return (
      xt(Go, e),
      ul(() => {
        e.zIndex !== void 0 && ff(e.zIndex);
      }),
      () =>
        z(
          e.tag,
          { class: af(), style: n.value },
          {
            default: () => {
              var r;
              return [(r = t.default) == null ? void 0 : r.call(t)];
            },
          }
        )
    );
  },
});
const [pf, Bs] = Xt('icon'),
  mf = e => (e == null ? void 0 : e.includes('/')),
  gf = {
    dot: Boolean,
    tag: Jt('i'),
    name: String,
    size: Ge,
    badge: Ge,
    color: String,
    badgeProps: Object,
    classPrefix: String,
  };
var _f = ft({
  name: pf,
  props: gf,
  setup(e, { slots: t }) {
    const n = he(Go, null),
      r = se(
        () => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || Bs()
      );
    return () => {
      const { tag: s, dot: o, name: i, size: c, badge: l, color: a } = e,
        f = mf(i);
      return z(
        Jo,
        Ir(
          {
            dot: o,
            tag: s,
            class: [r.value, f ? '' : `${r.value}-${i}`],
            style: { color: a, fontSize: Ve(c) },
            content: l,
          },
          e.badgeProps
        ),
        {
          default: () => {
            var h;
            return [
              (h = t.default) == null ? void 0 : h.call(t),
              f && z('img', { class: Bs('image'), src: i }, null),
            ];
          },
        }
      );
    };
  },
});
const bf = Bn(_f),
  [ei, Fs] = Xt('tabbar'),
  vf = {
    route: Boolean,
    fixed: lr,
    border: lr,
    zIndex: Ge,
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    modelValue: Su(0),
    safeAreaInsetBottom: { type: Boolean, default: null },
  },
  ti = Symbol(ei);
var yf = ft({
  name: ei,
  props: vf,
  emits: ['change', 'update:modelValue'],
  setup(e, { emit: t, slots: n }) {
    const r = Fe(),
      { linkChildren: s } = Nu(ti),
      o = nf(r, Fs),
      i = () => {
        var a;
        return (a = e.safeAreaInsetBottom) != null ? a : e.fixed;
      },
      c = () => {
        var a;
        const { fixed: f, zIndex: h, border: p } = e;
        return z(
          'div',
          {
            ref: r,
            role: 'tablist',
            style: Hu(h),
            class: [Fs({ fixed: f }), { [Ju]: p, 'van-safe-area-bottom': i() }],
          },
          [(a = n.default) == null ? void 0 : a.call(n)]
        );
      };
    return (
      s({
        props: e,
        setActive: (a, f) => {
          Xu(e.beforeChange, {
            args: [a],
            done() {
              t('update:modelValue', a), t('change', a), f();
            },
          });
        },
      }),
      () => (e.fixed && e.placeholder ? o(c) : c())
    );
  },
});
const Ef = Bn(yf),
  [xf, Wn] = Xt('tabbar-item'),
  wf = Vo({}, rf, {
    dot: Boolean,
    icon: String,
    name: Ge,
    badge: Ge,
    badgeProps: Object,
    iconPrefix: String,
  });
var Pf = ft({
  name: xf,
  props: wf,
  emits: ['click'],
  setup(e, { emit: t, slots: n }) {
    const r = of(),
      s = Sn().proxy,
      { parent: o, index: i } = Bu(ti);
    if (!o) return;
    const c = se(() => {
        var f;
        const { route: h, modelValue: p } = o.props;
        if (h && '$route' in s) {
          const { $route: v } = s,
            { to: C } = e,
            A = $n(C) ? C : { path: C };
          return !!v.matched.find(L => {
            const T = 'path' in A && A.path === L.path,
              N = 'name' in A && A.name === L.name;
            return T || N;
          });
        }
        return ((f = e.name) != null ? f : i.value) === p;
      }),
      l = f => {
        var h;
        c.value || o.setActive((h = e.name) != null ? h : i.value, r),
          t('click', f);
      },
      a = () => {
        if (n.icon) return n.icon({ active: c.value });
        if (e.icon)
          return z(bf, { name: e.icon, classPrefix: e.iconPrefix }, null);
      };
    return () => {
      var f;
      const { dot: h, badge: p } = e,
        { activeColor: v, inactiveColor: C } = o.props,
        A = c.value ? v : C;
      return z(
        'div',
        {
          role: 'tab',
          class: Wn({ active: c.value }),
          style: { color: A },
          tabindex: 0,
          'aria-selected': c.value,
          onClick: l,
        },
        [
          z(Jo, Ir({ dot: h, class: Wn('icon'), content: p }, e.badgeProps), {
            default: a,
          }),
          z('div', { class: Wn('text') }, [
            (f = n.default) == null ? void 0 : f.call(n, { active: c.value }),
          ]),
        ]
      );
    };
  },
});
const Rf = Bn(Pf);
const Cf = {
    __name: 'TabBar',
    setup(e) {
      const t = Fe(0);
      return (n, r) => {
        const s = Rf,
          o = Ef;
        return (
          _n(),
          Oo('div', null, [
            z(
              o,
              {
                modelValue: t.value,
                'onUpdate:modelValue': r[0] || (r[0] = i => (t.value = i)),
                route: '',
              },
              {
                default: gt(() => [
                  z(
                    s,
                    { icon: 'home-o', to: '/home', replace: '' },
                    { default: gt(() => [Lt('首页')]), _: 1 }
                  ),
                  z(
                    s,
                    { icon: 'balance-list-o', to: '/recommend', replace: '' },
                    { default: gt(() => [Lt('种草文章')]), _: 1 }
                  ),
                  z(
                    s,
                    { icon: 'cart-o', to: '/cart', replace: '' },
                    { default: gt(() => [Lt('购物车')]), _: 1 }
                  ),
                  z(
                    s,
                    { icon: 'user-o', to: '/user', replace: '' },
                    { default: gt(() => [Lt('我的')]), _: 1 }
                  ),
                ]),
                _: 1,
              },
              8,
              ['modelValue']
            ),
          ])
        );
      };
    },
  },
  Of = { id: 'app' },
  Af = {
    __name: 'App',
    setup(e) {
      const t = Ru(),
        n = Fe(!1);
      return (
        Ze(t, r => {
          n.value = r.meta.isShowNav;
        }),
        (r, s) => (
          _n(),
          Oo('div', Of, [
            z(Ye(zo)),
            n.value ? (_n(), Ao(Cf, { key: 0 })) : kl('', !0),
          ])
        )
      );
    },
  },
  Sf = 'modulepreload',
  Tf = function (e, t) {
    return new URL(e, t).href;
  },
  Ms = {},
  cn = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      n.map(o => {
        if (((o = Tf(o, r)), o in Ms)) return;
        Ms[o] = !0;
        const i = o.endsWith('.css'),
          c = i ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let f = s.length - 1; f >= 0; f--) {
            const h = s[f];
            if (h.href === o && (!i || h.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${o}"]${c}`)) return;
        const a = document.createElement('link');
        if (
          ((a.rel = i ? 'stylesheet' : Sf),
          i || ((a.as = 'script'), (a.crossOrigin = '')),
          (a.href = o),
          document.head.appendChild(a),
          i)
        )
          return new Promise((f, h) => {
            a.addEventListener('load', f),
              a.addEventListener('error', () =>
                h(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    ).then(() => t());
  },
  If = wu({
    history: kc('./'),
    routes: [
      { path: '/', name: 'root', redirect: '/home' },
      {
        path: '/home',
        name: 'home',
        component: () =>
          cn(() => import('./Home-01bec28a.js'), [], import.meta.url),
        meta: { isShowNav: !0 },
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: () =>
          cn(
            () => import('./Recommend-01be0e9d.js'),
            [
              './Recommend-01be0e9d.js',
              './_plugin-vue_export-helper-c27b6911.js',
            ],
            import.meta.url
          ),
        meta: { isShowNav: !0 },
      },
      {
        path: '/cart',
        name: 'cart',
        component: () =>
          cn(
            () => import('./Cart-8336ce85.js'),
            ['./Cart-8336ce85.js', './_plugin-vue_export-helper-c27b6911.js'],
            import.meta.url
          ),
        meta: { isShowNav: !0 },
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          cn(
            () => import('./User-25fafdea.js'),
            ['./User-25fafdea.js', './_plugin-vue_export-helper-c27b6911.js'],
            import.meta.url
          ),
        meta: { isShowNav: !0 },
      },
      { path: '/:toHome*', name: 'toHome', redirect: '/home' },
    ],
  });
(function (t, n) {
  var r = n.documentElement,
    s = t.devicePixelRatio || 1;
  function o() {
    n.body
      ? (n.body.style.fontSize = 12 * s + 'px')
      : n.addEventListener('DOMContentLoaded', o);
  }
  o();
  function i() {
    var a = r.clientWidth / 10;
    r.style.fontSize = a + 'px';
  }
  if (
    (i(),
    t.addEventListener('resize', i),
    t.addEventListener('pageshow', function (a) {
      a.persisted && i();
    }),
    s >= 2)
  ) {
    var c = n.createElement('body'),
      l = n.createElement('div');
    (l.style.border = '.5px solid transparent'),
      c.appendChild(l),
      r.appendChild(c),
      l.offsetHeight === 1 && r.classList.add('hairlines'),
      r.removeChild(c);
  }
})(window, document);
const Mr = _c(Af);
Mr.use(Ec());
Mr.use(If);
Mr.mount('#app');
export {
  Mf as B,
  De as F,
  bf as I,
  z as a,
  se as b,
  Xt as c,
  ft as d,
  Vo as e,
  Ve as f,
  Ff as g,
  $f as h,
  Oo as i,
  gt as j,
  To as k,
  Lt as l,
  Jt as m,
  Ge as n,
  _n as o,
  Bf as p,
  rf as r,
  of as u,
  Bn as w,
};
