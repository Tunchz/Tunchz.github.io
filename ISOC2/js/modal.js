if (function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    var n = [],
        r = n.slice,
        i = n.concat,
        o = n.push,
        a = n.indexOf,
        u = {},
        s = u.toString,
        l = u.hasOwnProperty,
        c = {},
        f = "1.11.2",
        h = function(t, e) {
            return new h.fn.init(t, e)
        },
        d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        g = /-([\da-z])/gi,
        v = function(t, e) {
            return e.toUpperCase()
        };

    function y(t) {
        var e = t.length,
            n = h.type(t);
        return "function" !== n && !h.isWindow(t) && (!(1 !== t.nodeType || !e) || "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
    }
    h.fn = h.prototype = {
        jquery: f,
        constructor: h,
        selector: "",
        length: 0,
        toArray: function() {
            return r.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : r.call(this)
        },
        pushStack: function(t) {
            var e = h.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return h.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(h.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return this.pushStack(r.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                n = +t + (0 > t ? e : 0);
            return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: o,
        sort: n.sort,
        splice: n.splice
    }, h.extend = h.fn.extend = function() {
        var t, e, n, r, i, o, a = arguments[0] || {},
            u = 1,
            s = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[u] || {}, u++), "object" == typeof a || h.isFunction(a) || (a = {}), u === s && (a = this, u--); s > u; u++)
            if (null != (i = arguments[u]))
                for (r in i) t = a[r], a !== (n = i[r]) && (l && n && (h.isPlainObject(n) || (e = h.isArray(n))) ? (e ? (e = !1, o = t && h.isArray(t) ? t : []) : o = t && h.isPlainObject(t) ? t : {}, a[r] = h.extend(l, o, n)) : void 0 !== n && (a[r] = n));
        return a
    }, h.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === h.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === h.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !h.isArray(t) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== h.type(t) || t.nodeType || h.isWindow(t)) return !1;
            try {
                if (t.constructor && !l.call(t, "constructor") && !l.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            if (c.ownLast)
                for (e in t) return l.call(t, e);
            for (e in t);
            return void 0 === e || l.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? u[s.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && h.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(p, "ms-").replace(g, v)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, n) {
            var r = 0,
                i = t.length,
                o = y(t);
            if (n) {
                if (o)
                    for (; i > r && !1 !== e.apply(t[r], n); r++);
                else
                    for (r in t)
                        if (!1 === e.apply(t[r], n)) break
            } else if (o)
                for (; i > r && !1 !== e.call(t[r], r, t[r]); r++);
            else
                for (r in t)
                    if (!1 === e.call(t[r], r, t[r])) break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(d, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (y(Object(t)) ? h.merge(n, "string" == typeof t ? [t] : t) : o.call(n, t)), n
        },
        inArray: function(t, e, n) {
            var r;
            if (e) {
                if (a) return a.call(e, t, n);
                for (r = e.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                    if (n in e && e[n] === t) return n
            }
            return -1
        },
        merge: function(t, e) {
            for (var n = +e.length, r = 0, i = t.length; n > r;) t[i++] = e[r++];
            if (n != n)
                for (; void 0 !== e[r];) t[i++] = e[r++];
            return t.length = i, t
        },
        grep: function(t, e, n) {
            for (var r = [], i = 0, o = t.length, a = !n; o > i; i++) !e(t[i], i) !== a && r.push(t[i]);
            return r
        },
        map: function(t, e, n) {
            var r, o = 0,
                a = t.length,
                u = [];
            if (y(t))
                for (; a > o; o++) null != (r = e(t[o], o, n)) && u.push(r);
            else
                for (o in t) null != (r = e(t[o], o, n)) && u.push(r);
            return i.apply([], u)
        },
        guid: 1,
        proxy: function(t, e) {
            var n, i, o;
            return "string" == typeof e && (o = t[e], e = t, t = o), h.isFunction(t) ? (n = r.call(arguments, 2), (i = function() {
                return t.apply(e || this, n.concat(r.call(arguments)))
            }).guid = t.guid = t.guid || h.guid++, i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: c
    }), h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        u["[object " + e + "]"] = e.toLowerCase()
    });
    var m = function(t) {
        var e, n, r, i, o, a, u, s, l, c, f, h, d, p, g, v, y, m, x, b = "sizzle" + 1 * new Date,
            w = t.document,
            A = 0,
            M = 0,
            k = at(),
            _ = at(),
            C = at(),
            T = function(t, e) {
                return t === e && (f = !0), 0
            },
            E = 1 << 31,
            S = {}.hasOwnProperty,
            N = [],
            D = N.pop,
            L = N.push,
            R = N.push,
            O = N.slice,
            $ = function(t, e) {
                for (var n = 0, r = t.length; r > n; n++)
                    if (t[n] === e) return n;
                return -1
            },
            j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            H = "[\\x20\\t\\r\\n\\f]",
            q = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            F = q.replace("w", "w#"),
            P = "\\[" + H + "*(" + q + ")(?:" + H + "*([*^$|!~]?=)" + H + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + H + "*\\]",
            I = ":(" + q + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)",
            z = new RegExp(H + "+", "g"),
            B = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
            U = new RegExp("^" + H + "*," + H + "*"),
            W = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
            Y = new RegExp("=" + H + "*([^\\]'\"]*?)" + H + "*\\]", "g"),
            V = new RegExp(I),
            G = new RegExp("^" + F + "$"),
            X = {
                ID: new RegExp("^#(" + q + ")"),
                CLASS: new RegExp("^\\.(" + q + ")"),
                TAG: new RegExp("^(" + q.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + I),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + j + ")$", "i"),
                needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i")
            },
            Z = /^(?:input|select|textarea|button)$/i,
            Q = /^h\d$/i,
            K = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            tt = /[+~]/,
            et = /'|\\/g,
            nt = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
            rt = function(t, e, n) {
                var r = "0x" + e - 65536;
                return r != r || n ? e : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            it = function() {
                h()
            };
        try {
            R.apply(N = O.call(w.childNodes), w.childNodes), N[w.childNodes.length].nodeType
        } catch (t) {
            R = {
                apply: N.length ? function(t, e) {
                    L.apply(t, O.call(e))
                } : function(t, e) {
                    for (var n = t.length, r = 0; t[n++] = e[r++];);
                    t.length = n - 1
                }
            }
        }

        function ot(t, e, r, i) {
            var o, u, l, c, f, p, y, m, A, M;
            if ((e ? e.ownerDocument || e : w) !== d && h(e), r = r || [], c = (e = e || d).nodeType, "string" != typeof t || !t || 1 !== c && 9 !== c && 11 !== c) return r;
            if (!i && g) {
                if (11 !== c && (o = J.exec(t)))
                    if (l = o[1]) {
                        if (9 === c) {
                            if (!(u = e.getElementById(l)) || !u.parentNode) return r;
                            if (u.id === l) return r.push(u), r
                        } else if (e.ownerDocument && (u = e.ownerDocument.getElementById(l)) && x(e, u) && u.id === l) return r.push(u), r
                    } else {
                        if (o[2]) return R.apply(r, e.getElementsByTagName(t)), r;
                        if ((l = o[3]) && n.getElementsByClassName) return R.apply(r, e.getElementsByClassName(l)), r
                    } if (n.qsa && (!v || !v.test(t))) {
                    if (m = y = b, A = e, M = 1 !== c && t, 1 === c && "object" !== e.nodeName.toLowerCase()) {
                        for (p = a(t), (y = e.getAttribute("id")) ? m = y.replace(et, "\\$&") : e.setAttribute("id", m), m = "[id='" + m + "'] ", f = p.length; f--;) p[f] = m + vt(p[f]);
                        A = tt.test(t) && pt(e.parentNode) || e, M = p.join(",")
                    }
                    if (M) try {
                        return R.apply(r, A.querySelectorAll(M)), r
                    } catch (t) {} finally {
                        y || e.removeAttribute("id")
                    }
                }
            }
            return s(t.replace(B, "$1"), e, r, i)
        }

        function at() {
            var t = [];
            return function e(n, i) {
                return t.push(n + " ") > r.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
        }

        function ut(t) {
            return t[b] = !0, t
        }

        function st(t) {
            var e = d.createElement("div");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function lt(t, e) {
            for (var n = t.split("|"), i = t.length; i--;) r.attrHandle[n[i]] = e
        }

        function ct(t, e) {
            var n = e && t,
                r = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || E) - (~t.sourceIndex || E);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === e) return -1;
            return t ? 1 : -1
        }

        function ft(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function ht(t) {
            return function(e) {
                var n = e.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && e.type === t
            }
        }

        function dt(t) {
            return ut(function(e) {
                return e = +e, ut(function(n, r) {
                    for (var i, o = t([], n.length, e), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function pt(t) {
            return t && void 0 !== t.getElementsByTagName && t
        }
        for (e in n = ot.support = {}, o = ot.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, h = ot.setDocument = function(t) {
                var e, i, a = t ? t.ownerDocument || t : w;
                return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, p = a.documentElement, (i = a.defaultView) && i !== i.top && (i.addEventListener ? i.addEventListener("unload", it, !1) : i.attachEvent && i.attachEvent("onunload", it)), g = !o(a), n.attributes = st(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), n.getElementsByTagName = st(function(t) {
                    return t.appendChild(a.createComment("")), !t.getElementsByTagName("*").length
                }), n.getElementsByClassName = K.test(a.getElementsByClassName), n.getById = st(function(t) {
                    return p.appendChild(t).id = b, !a.getElementsByName || !a.getElementsByName(b).length
                }), n.getById ? (r.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && g) {
                        var n = e.getElementById(t);
                        return n && n.parentNode ? [n] : []
                    }
                }, r.filter.ID = function(t) {
                    var e = t.replace(nt, rt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete r.find.ID, r.filter.ID = function(t) {
                    var e = t.replace(nt, rt);
                    return function(t) {
                        var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), r.find.TAG = n.getElementsByTagName ? function(t, e) {
                    return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : n.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var n, r = [],
                        i = 0,
                        o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, r.find.CLASS = n.getElementsByClassName && function(t, e) {
                    return g ? e.getElementsByClassName(t) : void 0
                }, y = [], v = [], (n.qsa = K.test(a.querySelectorAll)) && (st(function(t) {
                    p.appendChild(t).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + H + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || v.push("\\[" + H + "*(?:value|" + j + ")"), t.querySelectorAll("[id~=" + b + "-]").length || v.push("~="), t.querySelectorAll(":checked").length || v.push(":checked"), t.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]")
                }), st(function(t) {
                    var e = a.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && v.push("name" + H + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), v.push(",.*:")
                })), (n.matchesSelector = K.test(m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && st(function(t) {
                    n.disconnectedMatch = m.call(t, "div"), m.call(t, "[s!='']:x"), y.push("!=", I)
                }), v = v.length && new RegExp(v.join("|")), y = y.length && new RegExp(y.join("|")), e = K.test(p.compareDocumentPosition), x = e || K.test(p.contains) ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        r = e && e.parentNode;
                    return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, T = e ? function(t, e) {
                    if (t === e) return f = !0, 0;
                    var r = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return r || (1 & (r = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !n.sortDetached && e.compareDocumentPosition(t) === r ? t === a || t.ownerDocument === w && x(w, t) ? -1 : e === a || e.ownerDocument === w && x(w, e) ? 1 : c ? $(c, t) - $(c, e) : 0 : 4 & r ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return f = !0, 0;
                    var n, r = 0,
                        i = t.parentNode,
                        o = e.parentNode,
                        u = [t],
                        s = [e];
                    if (!i || !o) return t === a ? -1 : e === a ? 1 : i ? -1 : o ? 1 : c ? $(c, t) - $(c, e) : 0;
                    if (i === o) return ct(t, e);
                    for (n = t; n = n.parentNode;) u.unshift(n);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (; u[r] === s[r];) r++;
                    return r ? ct(u[r], s[r]) : u[r] === w ? -1 : s[r] === w ? 1 : 0
                }, a) : d
            }, ot.matches = function(t, e) {
                return ot(t, null, null, e)
            }, ot.matchesSelector = function(t, e) {
                if ((t.ownerDocument || t) !== d && h(t), e = e.replace(Y, "='$1']"), !(!n.matchesSelector || !g || y && y.test(e) || v && v.test(e))) try {
                    var r = m.call(t, e);
                    if (r || n.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                } catch (t) {}
                return ot(e, d, null, [t]).length > 0
            }, ot.contains = function(t, e) {
                return (t.ownerDocument || t) !== d && h(t), x(t, e)
            }, ot.attr = function(t, e) {
                (t.ownerDocument || t) !== d && h(t);
                var i = r.attrHandle[e.toLowerCase()],
                    o = i && S.call(r.attrHandle, e.toLowerCase()) ? i(t, e, !g) : void 0;
                return void 0 !== o ? o : n.attributes || !g ? t.getAttribute(e) : (o = t.getAttributeNode(e)) && o.specified ? o.value : null
            }, ot.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, ot.uniqueSort = function(t) {
                var e, r = [],
                    i = 0,
                    o = 0;
                if (f = !n.detectDuplicates, c = !n.sortStable && t.slice(0), t.sort(T), f) {
                    for (; e = t[o++];) e === t[o] && (i = r.push(o));
                    for (; i--;) t.splice(r[i], 1)
                }
                return c = null, t
            }, i = ot.getText = function(t) {
                var e, n = "",
                    r = 0,
                    o = t.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += i(t)
                    } else if (3 === o || 4 === o) return t.nodeValue
                } else
                    for (; e = t[r++];) n += i(e);
                return n
            }, (r = ot.selectors = {
                cacheLength: 50,
                createPseudo: ut,
                match: X,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(nt, rt), t[3] = (t[3] || t[4] || t[5] || "").replace(nt, rt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || ot.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && ot.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n = !t[6] && t[2];
                        return X.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && V.test(n) && (e = a(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(nt, rt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = k[t + " "];
                        return e || (e = new RegExp("(^|" + H + ")" + t + "(" + H + "|$)")) && k(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, e, n) {
                        return function(r) {
                            var i = ot.attr(r, t);
                            return null == i ? "!=" === e : !e || (i += "", "=" === e ? i === n : "!=" === e ? i !== n : "^=" === e ? n && 0 === i.indexOf(n) : "*=" === e ? n && i.indexOf(n) > -1 : "$=" === e ? n && i.slice(-n.length) === n : "~=" === e ? (" " + i.replace(z, " ") + " ").indexOf(n) > -1 : "|=" === e && (i === n || i.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, n, r, i) {
                        var o = "nth" !== t.slice(0, 3),
                            a = "last" !== t.slice(-4),
                            u = "of-type" === e;
                        return 1 === r && 0 === i ? function(t) {
                            return !!t.parentNode
                        } : function(e, n, s) {
                            var l, c, f, h, d, p, g = o !== a ? "nextSibling" : "previousSibling",
                                v = e.parentNode,
                                y = u && e.nodeName.toLowerCase(),
                                m = !s && !u;
                            if (v) {
                                if (o) {
                                    for (; g;) {
                                        for (f = e; f = f[g];)
                                            if (u ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                                        p = g = "only" === t && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [a ? v.firstChild : v.lastChild], a && m) {
                                    for (d = (l = (c = v[b] || (v[b] = {}))[t] || [])[0] === A && l[1], h = l[0] === A && l[2], f = d && v.childNodes[d]; f = ++d && f && f[g] || (h = d = 0) || p.pop();)
                                        if (1 === f.nodeType && ++h && f === e) {
                                            c[t] = [A, d, h];
                                            break
                                        }
                                } else if (m && (l = (e[b] || (e[b] = {}))[t]) && l[0] === A) h = l[1];
                                else
                                    for (;
                                        (f = ++d && f && f[g] || (h = d = 0) || p.pop()) && ((u ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++h || (m && ((f[b] || (f[b] = {}))[t] = [A, h]), f !== e)););
                                return (h -= i) === r || h % r == 0 && h / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, e) {
                        var n, i = r.pseudos[t] || r.setFilters[t.toLowerCase()] || ot.error("unsupported pseudo: " + t);
                        return i[b] ? i(e) : i.length > 1 ? (n = [t, t, "", e], r.setFilters.hasOwnProperty(t.toLowerCase()) ? ut(function(t, n) {
                            for (var r, o = i(t, e), a = o.length; a--;) t[r = $(t, o[a])] = !(n[r] = o[a])
                        }) : function(t) {
                            return i(t, 0, n)
                        }) : i
                    }
                },
                pseudos: {
                    not: ut(function(t) {
                        var e = [],
                            n = [],
                            r = u(t.replace(B, "$1"));
                        return r[b] ? ut(function(t, e, n, i) {
                            for (var o, a = r(t, null, i, []), u = t.length; u--;)(o = a[u]) && (t[u] = !(e[u] = o))
                        }) : function(t, i, o) {
                            return e[0] = t, r(e, null, o, n), e[0] = null, !n.pop()
                        }
                    }),
                    has: ut(function(t) {
                        return function(e) {
                            return ot(t, e).length > 0
                        }
                    }),
                    contains: ut(function(t) {
                        return t = t.replace(nt, rt),
                            function(e) {
                                return (e.textContent || e.innerText || i(e)).indexOf(t) > -1
                            }
                    }),
                    lang: ut(function(t) {
                        return G.test(t || "") || ot.error("unsupported lang: " + t), t = t.replace(nt, rt).toLowerCase(),
                            function(e) {
                                var n;
                                do {
                                    if (n = g ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === p
                    },
                    focus: function(t) {
                        return t === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return !1 === t.disabled
                    },
                    disabled: function(t) {
                        return !0 === t.disabled
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !r.pseudos.empty(t)
                    },
                    header: function(t) {
                        return Q.test(t.nodeName)
                    },
                    input: function(t) {
                        return Z.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: dt(function() {
                        return [0]
                    }),
                    last: dt(function(t, e) {
                        return [e - 1]
                    }),
                    eq: dt(function(t, e, n) {
                        return [0 > n ? n + e : n]
                    }),
                    even: dt(function(t, e) {
                        for (var n = 0; e > n; n += 2) t.push(n);
                        return t
                    }),
                    odd: dt(function(t, e) {
                        for (var n = 1; e > n; n += 2) t.push(n);
                        return t
                    }),
                    lt: dt(function(t, e, n) {
                        for (var r = 0 > n ? n + e : n; --r >= 0;) t.push(r);
                        return t
                    }),
                    gt: dt(function(t, e, n) {
                        for (var r = 0 > n ? n + e : n; ++r < e;) t.push(r);
                        return t
                    })
                }
            }).pseudos.nth = r.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[e] = ft(e);
        for (e in {
                submit: !0,
                reset: !0
            }) r.pseudos[e] = ht(e);

        function gt() {}

        function vt(t) {
            for (var e = 0, n = t.length, r = ""; n > e; e++) r += t[e].value;
            return r
        }

        function yt(t, e, n) {
            var r = e.dir,
                i = n && "parentNode" === r,
                o = M++;
            return e.first ? function(e, n, o) {
                for (; e = e[r];)
                    if (1 === e.nodeType || i) return t(e, n, o)
            } : function(e, n, a) {
                var u, s, l = [A, o];
                if (a) {
                    for (; e = e[r];)
                        if ((1 === e.nodeType || i) && t(e, n, a)) return !0
                } else
                    for (; e = e[r];)
                        if (1 === e.nodeType || i) {
                            if ((u = (s = e[b] || (e[b] = {}))[r]) && u[0] === A && u[1] === o) return l[2] = u[2];
                            if (s[r] = l, l[2] = t(e, n, a)) return !0
                        }
            }
        }

        function mt(t) {
            return t.length > 1 ? function(e, n, r) {
                for (var i = t.length; i--;)
                    if (!t[i](e, n, r)) return !1;
                return !0
            } : t[0]
        }

        function xt(t, e, n, r, i) {
            for (var o, a = [], u = 0, s = t.length, l = null != e; s > u; u++)(o = t[u]) && (!n || n(o, r, i)) && (a.push(o), l && e.push(u));
            return a
        }

        function bt(t, e, n, r, i, o) {
            return r && !r[b] && (r = bt(r)), i && !i[b] && (i = bt(i, o)), ut(function(o, a, u, s) {
                var l, c, f, h = [],
                    d = [],
                    p = a.length,
                    g = o || function(t, e, n) {
                        for (var r = 0, i = e.length; i > r; r++) ot(t, e[r], n);
                        return n
                    }(e || "*", u.nodeType ? [u] : u, []),
                    v = !t || !o && e ? g : xt(g, h, t, u, s),
                    y = n ? i || (o ? t : p || r) ? [] : a : v;
                if (n && n(v, y, u, s), r)
                    for (l = xt(y, d), r(l, [], u, s), c = l.length; c--;)(f = l[c]) && (y[d[c]] = !(v[d[c]] = f));
                if (o) {
                    if (i || t) {
                        if (i) {
                            for (l = [], c = y.length; c--;)(f = y[c]) && l.push(v[c] = f);
                            i(null, y = [], l, s)
                        }
                        for (c = y.length; c--;)(f = y[c]) && (l = i ? $(o, f) : h[c]) > -1 && (o[l] = !(a[l] = f))
                    }
                } else y = xt(y === a ? y.splice(p, y.length) : y), i ? i(null, a, y, s) : R.apply(a, y)
            })
        }

        function wt(t) {
            for (var e, n, i, o = t.length, a = r.relative[t[0].type], u = a || r.relative[" "], s = a ? 1 : 0, c = yt(function(t) {
                    return t === e
                }, u, !0), f = yt(function(t) {
                    return $(e, t) > -1
                }, u, !0), h = [function(t, n, r) {
                    var i = !a && (r || n !== l) || ((e = n).nodeType ? c(t, n, r) : f(t, n, r));
                    return e = null, i
                }]; o > s; s++)
                if (n = r.relative[t[s].type]) h = [yt(mt(h), n)];
                else {
                    if ((n = r.filter[t[s].type].apply(null, t[s].matches))[b]) {
                        for (i = ++s; o > i && !r.relative[t[i].type]; i++);
                        return bt(s > 1 && mt(h), s > 1 && vt(t.slice(0, s - 1).concat({
                            value: " " === t[s - 2].type ? "*" : ""
                        })).replace(B, "$1"), n, i > s && wt(t.slice(s, i)), o > i && wt(t = t.slice(i)), o > i && vt(t))
                    }
                    h.push(n)
                } return mt(h)
        }
        return gt.prototype = r.filters = r.pseudos, r.setFilters = new gt, a = ot.tokenize = function(t, e) {
            var n, i, o, a, u, s, l, c = _[t + " "];
            if (c) return e ? 0 : c.slice(0);
            for (u = t, s = [], l = r.preFilter; u;) {
                for (a in (!n || (i = U.exec(u))) && (i && (u = u.slice(i[0].length) || u), s.push(o = [])), n = !1, (i = W.exec(u)) && (n = i.shift(), o.push({
                        value: n,
                        type: i[0].replace(B, " ")
                    }), u = u.slice(n.length)), r.filter) !(i = X[a].exec(u)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: a,
                    matches: i
                }), u = u.slice(n.length));
                if (!n) break
            }
            return e ? u.length : u ? ot.error(t) : _(t, s).slice(0)
        }, u = ot.compile = function(t, e) {
            var n, i, o, u, s, c, f = [],
                h = [],
                p = C[t + " "];
            if (!p) {
                for (e || (e = a(t)), n = e.length; n--;)(p = wt(e[n]))[b] ? f.push(p) : h.push(p);
                (p = C(t, (i = h, u = (o = f).length > 0, s = i.length > 0, c = function(t, e, n, a, c) {
                    var f, h, p, g = 0,
                        v = "0",
                        y = t && [],
                        m = [],
                        x = l,
                        b = t || s && r.find.TAG("*", c),
                        w = A += null == x ? 1 : Math.random() || .1,
                        M = b.length;
                    for (c && (l = e !== d && e); v !== M && null != (f = b[v]); v++) {
                        if (s && f) {
                            for (h = 0; p = i[h++];)
                                if (p(f, e, n)) {
                                    a.push(f);
                                    break
                                } c && (A = w)
                        }
                        u && ((f = !p && f) && g--, t && y.push(f))
                    }
                    if (g += v, u && v !== g) {
                        for (h = 0; p = o[h++];) p(y, m, e, n);
                        if (t) {
                            if (g > 0)
                                for (; v--;) y[v] || m[v] || (m[v] = D.call(a));
                            m = xt(m)
                        }
                        R.apply(a, m), c && !t && m.length > 0 && g + o.length > 1 && ot.uniqueSort(a)
                    }
                    return c && (A = w, l = x), y
                }, u ? ut(c) : c))).selector = t
            }
            return p
        }, s = ot.select = function(t, e, i, o) {
            var s, l, c, f, h, d = "function" == typeof t && t,
                p = !o && a(t = d.selector || t);
            if (i = i || [], 1 === p.length) {
                if ((l = p[0] = p[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && n.getById && 9 === e.nodeType && g && r.relative[l[1].type]) {
                    if (!(e = (r.find.ID(c.matches[0].replace(nt, rt), e) || [])[0])) return i;
                    d && (e = e.parentNode), t = t.slice(l.shift().value.length)
                }
                for (s = X.needsContext.test(t) ? 0 : l.length; s-- && (c = l[s], !r.relative[f = c.type]);)
                    if ((h = r.find[f]) && (o = h(c.matches[0].replace(nt, rt), tt.test(l[0].type) && pt(e.parentNode) || e))) {
                        if (l.splice(s, 1), !(t = o.length && vt(l))) return R.apply(i, o), i;
                        break
                    }
            }
            return (d || u(t, p))(o, e, !g, i, tt.test(t) && pt(e.parentNode) || e), i
        }, n.sortStable = b.split("").sort(T).join("") === b, n.detectDuplicates = !!f, h(), n.sortDetached = st(function(t) {
            return 1 & t.compareDocumentPosition(d.createElement("div"))
        }), st(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || lt("type|href|height|width", function(t, e, n) {
            return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), n.attributes && st(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || lt("value", function(t, e, n) {
            return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
        }), st(function(t) {
            return null == t.getAttribute("disabled")
        }) || lt(j, function(t, e, n) {
            var r;
            return n ? void 0 : !0 === t[e] ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
        }), ot
    }(t);
    h.find = m, h.expr = m.selectors, h.expr[":"] = h.expr.pseudos, h.unique = m.uniqueSort, h.text = m.getText, h.isXMLDoc = m.isXML, h.contains = m.contains;
    var x = h.expr.match.needsContext,
        b = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        w = /^.[^:#\[\.,]*$/;

    function A(t, e, n) {
        if (h.isFunction(e)) return h.grep(t, function(t, r) {
            return !!e.call(t, r, t) !== n
        });
        if (e.nodeType) return h.grep(t, function(t) {
            return t === e !== n
        });
        if ("string" == typeof e) {
            if (w.test(e)) return h.filter(e, t, n);
            e = h.filter(e, t)
        }
        return h.grep(t, function(t) {
            return h.inArray(t, e) >= 0 !== n
        })
    }
    h.filter = function(t, e, n) {
        var r = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? h.find.matchesSelector(r, t) ? [r] : [] : h.find.matches(t, h.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, h.fn.extend({
        find: function(t) {
            var e, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof t) return this.pushStack(h(t).filter(function() {
                for (e = 0; i > e; e++)
                    if (h.contains(r[e], this)) return !0
            }));
            for (e = 0; i > e; e++) h.find(t, r[e], n);
            return (n = this.pushStack(i > 1 ? h.unique(n) : n)).selector = this.selector ? this.selector + " " + t : t, n
        },
        filter: function(t) {
            return this.pushStack(A(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(A(this, t || [], !0))
        },
        is: function(t) {
            return !!A(this, "string" == typeof t && x.test(t) ? h(t) : t || [], !1).length
        }
    });
    var M, k = t.document,
        _ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (h.fn.init = function(t, e) {
        var n, r;
        if (!t) return this;
        if ("string" == typeof t) {
            if (!(n = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : _.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || M).find(t) : this.constructor(e).find(t);
            if (n[1]) {
                if (e = e instanceof h ? e[0] : e, h.merge(this, h.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : k, !0)), b.test(n[1]) && h.isPlainObject(e))
                    for (n in e) h.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this
            }
            if ((r = k.getElementById(n[2])) && r.parentNode) {
                if (r.id !== n[2]) return M.find(t);
                this.length = 1, this[0] = r
            }
            return this.context = k, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : h.isFunction(t) ? void 0 !== M.ready ? M.ready(t) : t(h) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), h.makeArray(t, this))
    }).prototype = h.fn, M = h(k);
    var C = /^(?:parents|prev(?:Until|All))/,
        T = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function E(t, e) {
        do {
            t = t[e]
        } while (t && 1 !== t.nodeType);
        return t
    }
    h.extend({
        dir: function(t, e, n) {
            for (var r = [], i = t[e]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !h(i).is(n));) 1 === i.nodeType && r.push(i), i = i[e];
            return r
        },
        sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }
    }), h.fn.extend({
        has: function(t) {
            var e, n = h(t, this),
                r = n.length;
            return this.filter(function() {
                for (e = 0; r > e; e++)
                    if (h.contains(this, n[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var n, r = 0, i = this.length, o = [], a = x.test(t) || "string" != typeof t ? h(t, e || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && h.find.matchesSelector(n, t))) {
                        o.push(n);
                        break
                    } return this.pushStack(o.length > 1 ? h.unique(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? h.inArray(this[0], h(t)) : h.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(h.unique(h.merge(this.get(), h(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), h.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return h.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return h.dir(t, "parentNode", n)
        },
        next: function(t) {
            return E(t, "nextSibling")
        },
        prev: function(t) {
            return E(t, "previousSibling")
        },
        nextAll: function(t) {
            return h.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return h.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return h.dir(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return h.dir(t, "previousSibling", n)
        },
        siblings: function(t) {
            return h.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return h.sibling(t.firstChild)
        },
        contents: function(t) {
            return h.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : h.merge([], t.childNodes)
        }
    }, function(t, e) {
        h.fn[t] = function(n, r) {
            var i = h.map(this, e, n);
            return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (i = h.filter(r, i)), this.length > 1 && (T[t] || (i = h.unique(i)), C.test(t) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var S, N = /\S+/g,
        D = {};

    function L() {
        k.addEventListener ? (k.removeEventListener("DOMContentLoaded", R, !1), t.removeEventListener("load", R, !1)) : (k.detachEvent("onreadystatechange", R), t.detachEvent("onload", R))
    }

    function R() {
        (k.addEventListener || "load" === event.type || "complete" === k.readyState) && (L(), h.ready())
    }
    h.Callbacks = function(t) {
        var e, n, r, i, o, a, u, s, l = [],
            c = !(t = "string" == typeof t ? D[t] || (n = D[e = t] = {}, h.each(e.match(N) || [], function(t, e) {
                n[e] = !0
            }), n) : h.extend({}, t)).once && [],
            f = function(e) {
                for (i = t.memory && e, o = !0, u = s || 0, s = 0, a = l.length, r = !0; l && a > u; u++)
                    if (!1 === l[u].apply(e[0], e[1]) && t.stopOnFalse) {
                        i = !1;
                        break
                    } r = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : d.disable())
            },
            d = {
                add: function() {
                    if (l) {
                        var e = l.length;
                        ! function e(n) {
                            h.each(n, function(n, r) {
                                var i = h.type(r);
                                "function" === i ? t.unique && d.has(r) || l.push(r) : r && r.length && "string" !== i && e(r)
                            })
                        }(arguments), r ? a = l.length : i && (s = e, f(i))
                    }
                    return this
                },
                remove: function() {
                    return l && h.each(arguments, function(t, e) {
                        for (var n;
                            (n = h.inArray(e, l, n)) > -1;) l.splice(n, 1), r && (a >= n && a--, u >= n && u--)
                    }), this
                },
                has: function(t) {
                    return t ? h.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], a = 0, this
                },
                disable: function() {
                    return l = c = i = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return c = void 0, i || d.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, e) {
                    return !l || o && !c || (e = [t, (e = e || []).slice ? e.slice() : e], r ? c.push(e) : f(e)), this
                },
                fire: function() {
                    return d.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return d
    }, h.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", h.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", h.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", h.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return h.Deferred(function(n) {
                            h.each(e, function(e, o) {
                                var a = h.isFunction(t[e]) && t[e];
                                i[o[1]](function() {
                                    var t = a && a.apply(this, arguments);
                                    t && h.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? h.extend(t, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, h.each(e, function(t, o) {
                var a = o[2],
                    u = o[3];
                r[o[1]] = a.add, u && a.add(function() {
                    n = u
                }, e[1 ^ t][2].disable, e[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), t && t.call(i, i), i
        },
        when: function(t) {
            var e, n, i, o = 0,
                a = r.call(arguments),
                u = a.length,
                s = 1 !== u || t && h.isFunction(t.promise) ? u : 0,
                l = 1 === s ? t : h.Deferred(),
                c = function(t, n, i) {
                    return function(o) {
                        n[t] = this, i[t] = arguments.length > 1 ? r.call(arguments) : o, i === e ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                    }
                };
            if (u > 1)
                for (e = new Array(u), n = new Array(u), i = new Array(u); u > o; o++) a[o] && h.isFunction(a[o].promise) ? a[o].promise().done(c(o, i, a)).fail(l.reject).progress(c(o, n, e)) : --s;
            return s || l.resolveWith(i, a), l.promise()
        }
    }), h.fn.ready = function(t) {
        return h.ready.promise().done(t), this
    }, h.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? h.readyWait++ : h.ready(!0)
        },
        ready: function(t) {
            if (!0 === t ? !--h.readyWait : !h.isReady) {
                if (!k.body) return setTimeout(h.ready);
                h.isReady = !0, !0 !== t && --h.readyWait > 0 || (S.resolveWith(k, [h]), h.fn.triggerHandler && (h(k).triggerHandler("ready"), h(k).off("ready")))
            }
        }
    }), h.ready.promise = function(e) {
        if (!S)
            if (S = h.Deferred(), "complete" === k.readyState) setTimeout(h.ready);
            else if (k.addEventListener) k.addEventListener("DOMContentLoaded", R, !1), t.addEventListener("load", R, !1);
        else {
            k.attachEvent("onreadystatechange", R), t.attachEvent("onload", R);
            var n = !1;
            try {
                n = null == t.frameElement && k.documentElement
            } catch (t) {}
            n && n.doScroll && function t() {
                if (!h.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(t, 50)
                    }
                    L(), h.ready()
                }
            }()
        }
        return S.promise(e)
    };
    var O, $ = "undefined";
    for (O in h(c)) break;
    c.ownLast = "0" !== O, c.inlineBlockNeedsLayout = !1, h(function() {
            var t, e, n, r;
            (n = k.getElementsByTagName("body")[0]) && n.style && (e = k.createElement("div"), (r = k.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(e), typeof e.style.zoom !== $ && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", c.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(r))
        }),
        function() {
            var t = k.createElement("div");
            if (null == c.deleteExpando) {
                c.deleteExpando = !0;
                try {
                    delete t.test
                } catch (t) {
                    c.deleteExpando = !1
                }
            }
            t = null
        }(), h.acceptData = function(t) {
            var e = h.noData[(t.nodeName + " ").toLowerCase()],
                n = +t.nodeType || 1;
            return (1 === n || 9 === n) && (!e || !0 !== e && t.getAttribute("classid") === e)
        };
    var j = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        H = /([A-Z])/g;

    function q(t, e, n) {
        if (void 0 === n && 1 === t.nodeType) {
            var r = "data-" + e.replace(H, "-$1").toLowerCase();
            if ("string" == typeof(n = t.getAttribute(r))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : j.test(n) ? h.parseJSON(n) : n)
                } catch (t) {}
                h.data(t, e, n)
            } else n = void 0
        }
        return n
    }

    function F(t) {
        var e;
        for (e in t)
            if (("data" !== e || !h.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function P(t, e, r, i) {
        if (h.acceptData(t)) {
            var o, a, u = h.expando,
                s = t.nodeType,
                l = s ? h.cache : t,
                c = s ? t[u] : t[u] && u;
            if (c && l[c] && (i || l[c].data) || void 0 !== r || "string" != typeof e) return c || (c = s ? t[u] = n.pop() || h.guid++ : u), l[c] || (l[c] = s ? {} : {
                toJSON: h.noop
            }), ("object" == typeof e || "function" == typeof e) && (i ? l[c] = h.extend(l[c], e) : l[c].data = h.extend(l[c].data, e)), a = l[c], i || (a.data || (a.data = {}), a = a.data), void 0 !== r && (a[h.camelCase(e)] = r), "string" == typeof e ? null == (o = a[e]) && (o = a[h.camelCase(e)]) : o = a, o
        }
    }

    function I(t, e, n) {
        if (h.acceptData(t)) {
            var r, i, o = t.nodeType,
                a = o ? h.cache : t,
                u = o ? t[h.expando] : h.expando;
            if (a[u]) {
                if (e && (r = n ? a[u] : a[u].data)) {
                    i = (e = h.isArray(e) ? e.concat(h.map(e, h.camelCase)) : e in r ? [e] : (e = h.camelCase(e)) in r ? [e] : e.split(" ")).length;
                    for (; i--;) delete r[e[i]];
                    if (n ? !F(r) : !h.isEmptyObject(r)) return
                }(n || (delete a[u].data, F(a[u]))) && (o ? h.cleanData([t], !0) : c.deleteExpando || a != a.window ? delete a[u] : a[u] = null)
            }
        }
    }
    h.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return !!(t = t.nodeType ? h.cache[t[h.expando]] : t[h.expando]) && !F(t)
        },
        data: function(t, e, n) {
            return P(t, e, n)
        },
        removeData: function(t, e) {
            return I(t, e)
        },
        _data: function(t, e, n) {
            return P(t, e, n, !0)
        },
        _removeData: function(t, e) {
            return I(t, e, !0)
        }
    }), h.fn.extend({
        data: function(t, e) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (i = h.data(o), 1 === o.nodeType && !h._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && q(o, r = h.camelCase(r.slice(5)), i[r]);
                    h._data(o, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof t ? this.each(function() {
                h.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                h.data(this, t, e)
            }) : o ? q(o, t, h.data(o, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                h.removeData(this, t)
            })
        }
    }), h.extend({
        queue: function(t, e, n) {
            var r;
            return t ? (e = (e || "fx") + "queue", r = h._data(t, e), n && (!r || h.isArray(n) ? r = h._data(t, e, h.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = h.queue(t, e),
                r = n.length,
                i = n.shift(),
                o = h._queueHooks(t, e);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete o.stop, i.call(t, function() {
                h.dequeue(t, e)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return h._data(t, n) || h._data(t, n, {
                empty: h.Callbacks("once memory").add(function() {
                    h._removeData(t, e + "queue"), h._removeData(t, n)
                })
            })
        }
    }), h.fn.extend({
        queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? h.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = h.queue(this, t, e);
                h._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && h.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                h.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, r = 1,
                i = h.Deferred(),
                o = this,
                a = this.length,
                u = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;)(n = h._data(o[a], t + "queueHooks")) && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(e)
        }
    });
    var z = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        B = ["Top", "Right", "Bottom", "Left"],
        U = function(t, e) {
            return t = e || t, "none" === h.css(t, "display") || !h.contains(t.ownerDocument, t)
        },
        W = h.access = function(t, e, n, r, i, o, a) {
            var u = 0,
                s = t.length,
                l = null == n;
            if ("object" === h.type(n))
                for (u in i = !0, n) h.access(t, e, u, n[u], !0, o, a);
            else if (void 0 !== r && (i = !0, h.isFunction(r) || (a = !0), l && (a ? (e.call(t, r), e = null) : (l = e, e = function(t, e, n) {
                    return l.call(h(t), n)
                })), e))
                for (; s > u; u++) e(t[u], n, a ? r : r.call(t[u], u, e(t[u], n)));
            return i ? t : l ? e.call(t) : s ? e(t[0], n) : o
        },
        Y = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = k.createElement("input"),
            e = k.createElement("div"),
            n = k.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c.leadingWhitespace = 3 === e.firstChild.nodeType, c.tbody = !e.getElementsByTagName("tbody").length, c.htmlSerialize = !!e.getElementsByTagName("link").length, c.html5Clone = "<:nav></:nav>" !== k.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, n.appendChild(t), c.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", c.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, n.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", c.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, c.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
                c.noCloneEvent = !1
            }), e.cloneNode(!0).click()), null == c.deleteExpando) {
            c.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                c.deleteExpando = !1
            }
        }
    }(),
    function() {
        var e, n, r = k.createElement("div");
        for (e in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + e, (c[e + "Bubbles"] = n in t) || (r.setAttribute(n, "t"), c[e + "Bubbles"] = !1 === r.attributes[n].expando);
        r = null
    }();
    var V = /^(?:input|select|textarea)$/i,
        G = /^key/,
        X = /^(?:mouse|pointer|contextmenu)|click/,
        Z = /^(?:focusinfocus|focusoutblur)$/,
        Q = /^([^.]*)(?:\.(.+)|)$/;

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function tt() {
        try {
            return k.activeElement
        } catch (t) {}
    }

    function et(t) {
        var e = nt.split("|"),
            n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length;) n.createElement(e.pop());
        return n
    }
    h.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, u, s, l, c, f, d, p, g, v, y = h._data(t);
            if (y) {
                for (n.handler && (n = (s = n).handler, i = s.selector), n.guid || (n.guid = h.guid++), (a = y.events) || (a = y.events = {}), (c = y.handle) || ((c = y.handle = function(t) {
                        return typeof h === $ || t && h.event.triggered === t.type ? void 0 : h.event.dispatch.apply(c.elem, arguments)
                    }).elem = t), u = (e = (e || "").match(N) || [""]).length; u--;) p = v = (o = Q.exec(e[u]) || [])[1], g = (o[2] || "").split(".").sort(), p && (l = h.event.special[p] || {}, p = (i ? l.delegateType : l.bindType) || p, l = h.event.special[p] || {}, f = h.extend({
                    type: p,
                    origType: v,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && h.expr.match.needsContext.test(i),
                    namespace: g.join(".")
                }, s), (d = a[p]) || ((d = a[p] = []).delegateCount = 0, l.setup && !1 !== l.setup.call(t, r, g, c) || (t.addEventListener ? t.addEventListener(p, c, !1) : t.attachEvent && t.attachEvent("on" + p, c))), l.add && (l.add.call(t, f), f.handler.guid || (f.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, f) : d.push(f), h.event.global[p] = !0);
                t = null
            }
        },
        remove: function(t, e, n, r, i) {
            var o, a, u, s, l, c, f, d, p, g, v, y = h.hasData(t) && h._data(t);
            if (y && (c = y.events)) {
                for (l = (e = (e || "").match(N) || [""]).length; l--;)
                    if (p = v = (u = Q.exec(e[l]) || [])[1], g = (u[2] || "").split(".").sort(), p) {
                        for (f = h.event.special[p] || {}, d = c[p = (r ? f.delegateType : f.bindType) || p] || [], u = u[2] && new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) a = d[o], !i && v !== a.origType || n && n.guid !== a.guid || u && !u.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (d.splice(o, 1), a.selector && d.delegateCount--, f.remove && f.remove.call(t, a));
                        s && !d.length && (f.teardown && !1 !== f.teardown.call(t, g, y.handle) || h.removeEvent(t, p, y.handle), delete c[p])
                    } else
                        for (p in c) h.event.remove(t, p + e[l], n, r, !0);
                h.isEmptyObject(c) && (delete y.handle, h._removeData(t, "events"))
            }
        },
        trigger: function(e, n, r, i) {
            var o, a, u, s, c, f, d, p = [r || k],
                g = l.call(e, "type") ? e.type : e,
                v = l.call(e, "namespace") ? e.namespace.split(".") : [];
            if (u = f = r = r || k, 3 !== r.nodeType && 8 !== r.nodeType && !Z.test(g + h.event.triggered) && (g.indexOf(".") >= 0 && (g = (v = g.split(".")).shift(), v.sort()), a = g.indexOf(":") < 0 && "on" + g, (e = e[h.expando] ? e : new h.Event(g, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = v.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : h.makeArray(n, [e]), c = h.event.special[g] || {}, i || !c.trigger || !1 !== c.trigger.apply(r, n))) {
                if (!i && !c.noBubble && !h.isWindow(r)) {
                    for (s = c.delegateType || g, Z.test(s + g) || (u = u.parentNode); u; u = u.parentNode) p.push(u), f = u;
                    f === (r.ownerDocument || k) && p.push(f.defaultView || f.parentWindow || t)
                }
                for (d = 0;
                    (u = p[d++]) && !e.isPropagationStopped();) e.type = d > 1 ? s : c.bindType || g, (o = (h._data(u, "events") || {})[e.type] && h._data(u, "handle")) && o.apply(u, n), (o = a && u[a]) && o.apply && h.acceptData(u) && (e.result = o.apply(u, n), !1 === e.result && e.preventDefault());
                if (e.type = g, !i && !e.isDefaultPrevented() && (!c._default || !1 === c._default.apply(p.pop(), n)) && h.acceptData(r) && a && r[g] && !h.isWindow(r)) {
                    (f = r[a]) && (r[a] = null), h.event.triggered = g;
                    try {
                        r[g]()
                    } catch (t) {}
                    h.event.triggered = void 0, f && (r[a] = f)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = h.event.fix(t);
            var e, n, i, o, a, u = [],
                s = r.call(arguments),
                l = (h._data(this, "events") || {})[t.type] || [],
                c = h.event.special[t.type] || {};
            if (s[0] = t, t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
                for (u = h.event.handlers.call(this, t, l), e = 0;
                    (o = u[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = o.elem, a = 0;
                        (i = o.handlers[a++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(i.namespace)) && (t.handleObj = i, t.data = i.data, void 0 !== (n = ((h.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, s)) && !1 === (t.result = n) && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var n, r, i, o, a = [],
                u = e.delegateCount,
                s = t.target;
            if (u && s.nodeType && (!t.button || "click" !== t.type))
                for (; s != this; s = s.parentNode || this)
                    if (1 === s.nodeType && (!0 !== s.disabled || "click" !== t.type)) {
                        for (i = [], o = 0; u > o; o++) void 0 === i[n = (r = e[o]).selector + " "] && (i[n] = r.needsContext ? h(n, this).index(s) >= 0 : h.find(n, this, null, [s]).length), i[n] && i.push(r);
                        i.length && a.push({
                            elem: s,
                            handlers: i
                        })
                    } return u < e.length && a.push({
                elem: this,
                handlers: e.slice(u)
            }), a
        },
        fix: function(t) {
            if (t[h.expando]) return t;
            var e, n, r, i = t.type,
                o = t,
                a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = X.test(i) ? this.mouseHooks : G.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, t = new h.Event(o), e = r.length; e--;) t[n = r[e]] = o[n];
            return t.target || (t.target = o.srcElement || k), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, o) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var n, r, i, o = e.button,
                    a = e.fromElement;
                return null == t.pageX && null != e.clientX && (i = (r = t.target.ownerDocument || k).documentElement, n = r.body, t.pageX = e.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== tt() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === tt() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return h.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return h.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, n, r) {
            var i = h.extend(new h.Event, n, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? h.event.trigger(i, null, e) : h.event.dispatch.call(e, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, h.removeEvent = k.removeEventListener ? function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n, !1)
    } : function(t, e, n) {
        var r = "on" + e;
        t.detachEvent && (typeof t[r] === $ && (t[r] = null), t.detachEvent(r, n))
    }, h.Event = function(t, e) {
        return this instanceof h.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? K : J) : this.type = t, e && h.extend(this, e), this.timeStamp = t && t.timeStamp || h.now(), void(this[h.expando] = !0)) : new h.Event(t, e)
    }, h.Event.prototype = {
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = K, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = K, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = K, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, h.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        h.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, r = t.relatedTarget,
                    i = t.handleObj;
                return (!r || r !== this && !h.contains(this, r)) && (t.type = i.origType, n = i.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), c.submitBubbles || (h.event.special.submit = {
        setup: function() {
            return !h.nodeName(this, "form") && void h.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    n = h.nodeName(e, "input") || h.nodeName(e, "button") ? e.form : void 0;
                n && !h._data(n, "submitBubbles") && (h.event.add(n, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), h._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && h.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function() {
            return !h.nodeName(this, "form") && void h.event.remove(this, "._submit")
        }
    }), c.changeBubbles || (h.event.special.change = {
        setup: function() {
            return V.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (h.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), h.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), h.event.simulate("change", this, t, !0)
            })), !1) : void h.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                V.test(e.nodeName) && !h._data(e, "changeBubbles") && (h.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || h.event.simulate("change", this.parentNode, t, !0)
                }), h._data(e, "changeBubbles", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return h.event.remove(this, "._change"), !V.test(this.nodeName)
        }
    }), c.focusinBubbles || h.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var n = function(t) {
            h.event.simulate(e, t.target, h.event.fix(t), !0)
        };
        h.event.special[e] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = h._data(r, e);
                i || r.addEventListener(t, n, !0), h._data(r, e, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = h._data(r, e) - 1;
                i ? h._data(r, e, i) : (r.removeEventListener(t, n, !0), h._removeData(r, e))
            }
        }
    }), h.fn.extend({
        on: function(t, e, n, r, i) {
            var o, a;
            if ("object" == typeof t) {
                for (o in "string" != typeof e && (n = n || e, e = void 0), t) this.on(o, e, n, t[o], i);
                return this
            }
            if (null == n && null == r ? (r = e, n = e = void 0) : null == r && ("string" == typeof e ? (r = n, n = void 0) : (r = n, n = e, e = void 0)), !1 === r) r = J;
            else if (!r) return this;
            return 1 === i && (a = r, (r = function(t) {
                return h().off(t), a.apply(this, arguments)
            }).guid = a.guid || (a.guid = h.guid++)), this.each(function() {
                h.event.add(this, t, r, n, e)
            })
        },
        one: function(t, e, n, r) {
            return this.on(t, e, n, r, 1)
        },
        off: function(t, e, n) {
            var r, i;
            if (t && t.preventDefault && t.handleObj) return r = t.handleObj, h(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof t) {
                for (i in t) this.off(i, e, t[i]);
                return this
            }
            return (!1 === e || "function" == typeof e) && (n = e, e = void 0), !1 === n && (n = J), this.each(function() {
                h.event.remove(this, t, n, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                h.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            return n ? h.event.trigger(t, e, n, !0) : void 0
        }
    });
    var nt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rt = / jQuery\d+="(?:null|\d+)"/g,
        it = new RegExp("<(?:" + nt + ")[\\s/>]", "i"),
        ot = /^\s+/,
        at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ut = /<([\w:]+)/,
        st = /<tbody/i,
        lt = /<|&#?\w+;/,
        ct = /<(?:script|style|link)/i,
        ft = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ht = /^$|\/(?:java|ecma)script/i,
        dt = /^true\/(.*)/,
        pt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        gt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: c.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        vt = et(k).appendChild(k.createElement("div"));

    function yt(t, e) {
        var n, r, i = 0,
            o = typeof t.getElementsByTagName !== $ ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== $ ? t.querySelectorAll(e || "*") : void 0;
        if (!o)
            for (o = [], n = t.childNodes || t; null != (r = n[i]); i++) !e || h.nodeName(r, e) ? o.push(r) : h.merge(o, yt(r, e));
        return void 0 === e || e && h.nodeName(t, e) ? h.merge([t], o) : o
    }

    function mt(t) {
        Y.test(t.type) && (t.defaultChecked = t.checked)
    }

    function xt(t, e) {
        return h.nodeName(t, "table") && h.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function bt(t) {
        return t.type = (null !== h.find.attr(t, "type")) + "/" + t.type, t
    }

    function wt(t) {
        var e = dt.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function At(t, e) {
        for (var n, r = 0; null != (n = t[r]); r++) h._data(n, "globalEval", !e || h._data(e[r], "globalEval"))
    }

    function Mt(t, e) {
        if (1 === e.nodeType && h.hasData(t)) {
            var n, r, i, o = h._data(t),
                a = h._data(e, o),
                u = o.events;
            if (u)
                for (n in delete a.handle, a.events = {}, u)
                    for (r = 0, i = u[n].length; i > r; r++) h.event.add(e, n, u[n][r]);
            a.data && (a.data = h.extend({}, a.data))
        }
    }

    function kt(t, e) {
        var n, r, i;
        if (1 === e.nodeType) {
            if (n = e.nodeName.toLowerCase(), !c.noCloneEvent && e[h.expando]) {
                for (r in (i = h._data(e)).events) h.removeEvent(e, r, i.handle);
                e.removeAttribute(h.expando)
            }
            "script" === n && e.text !== t.text ? (bt(e).text = t.text, wt(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), c.html5Clone && t.innerHTML && !h.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Y.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
        }
    }
    gt.optgroup = gt.option, gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead, gt.th = gt.td, h.extend({
        clone: function(t, e, n) {
            var r, i, o, a, u, s = h.contains(t.ownerDocument, t);
            if (c.html5Clone || h.isXMLDoc(t) || !it.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (vt.innerHTML = t.outerHTML, vt.removeChild(o = vt.firstChild)), !(c.noCloneEvent && c.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || h.isXMLDoc(t)))
                for (r = yt(o), u = yt(t), a = 0; null != (i = u[a]); ++a) r[a] && kt(i, r[a]);
            if (e)
                if (n)
                    for (u = u || yt(t), r = r || yt(o), a = 0; null != (i = u[a]); a++) Mt(i, r[a]);
                else Mt(t, o);
            return (r = yt(o, "script")).length > 0 && At(r, !s && yt(t, "script")), r = u = i = null, o
        },
        buildFragment: function(t, e, n, r) {
            for (var i, o, a, u, s, l, f, d = t.length, p = et(e), g = [], v = 0; d > v; v++)
                if ((o = t[v]) || 0 === o)
                    if ("object" === h.type(o)) h.merge(g, o.nodeType ? [o] : o);
                    else if (lt.test(o)) {
                for (u = u || p.appendChild(e.createElement("div")), s = (ut.exec(o) || ["", ""])[1].toLowerCase(), f = gt[s] || gt._default, u.innerHTML = f[1] + o.replace(at, "<$1></$2>") + f[2], i = f[0]; i--;) u = u.lastChild;
                if (!c.leadingWhitespace && ot.test(o) && g.push(e.createTextNode(ot.exec(o)[0])), !c.tbody)
                    for (i = (o = "table" !== s || st.test(o) ? "<table>" !== f[1] || st.test(o) ? 0 : u : u.firstChild) && o.childNodes.length; i--;) h.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
                for (h.merge(g, u.childNodes), u.textContent = ""; u.firstChild;) u.removeChild(u.firstChild);
                u = p.lastChild
            } else g.push(e.createTextNode(o));
            for (u && p.removeChild(u), c.appendChecked || h.grep(yt(g, "input"), mt), v = 0; o = g[v++];)
                if ((!r || -1 === h.inArray(o, r)) && (a = h.contains(o.ownerDocument, o), u = yt(p.appendChild(o), "script"), a && At(u), n))
                    for (i = 0; o = u[i++];) ht.test(o.type || "") && n.push(o);
            return u = null, p
        },
        cleanData: function(t, e) {
            for (var r, i, o, a, u = 0, s = h.expando, l = h.cache, f = c.deleteExpando, d = h.event.special; null != (r = t[u]); u++)
                if ((e || h.acceptData(r)) && (a = (o = r[s]) && l[o])) {
                    if (a.events)
                        for (i in a.events) d[i] ? h.event.remove(r, i) : h.removeEvent(r, i, a.handle);
                    l[o] && (delete l[o], f ? delete r[s] : typeof r.removeAttribute !== $ ? r.removeAttribute(s) : r[s] = null, n.push(o))
                }
        }
    }), h.fn.extend({
        text: function(t) {
            return W(this, function(t) {
                return void 0 === t ? h.text(this) : this.empty().append((this[0] && this[0].ownerDocument || k).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || xt(this, t).appendChild(t)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = xt(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var n, r = t ? h.filter(t, this) : this, i = 0; null != (n = r[i]); i++) e || 1 !== n.nodeType || h.cleanData(yt(n)), n.parentNode && (e && h.contains(n.ownerDocument, n) && At(yt(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && h.cleanData(yt(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && h.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return h.clone(this, t, e)
            })
        },
        html: function(t) {
            return W(this, function(t) {
                var e = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(rt, "") : void 0;
                if (!("string" != typeof t || ct.test(t) || !c.htmlSerialize && it.test(t) || !c.leadingWhitespace && ot.test(t) || gt[(ut.exec(t) || ["", ""])[1].toLowerCase()])) {
                    t = t.replace(at, "<$1></$2>");
                    try {
                        for (; r > n; n++) 1 === (e = this[n] || {}).nodeType && (h.cleanData(yt(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, h.cleanData(yt(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = i.apply([], t);
            var n, r, o, a, u, s, l = 0,
                f = this.length,
                d = this,
                p = f - 1,
                g = t[0],
                v = h.isFunction(g);
            if (v || f > 1 && "string" == typeof g && !c.checkClone && ft.test(g)) return this.each(function(n) {
                var r = d.eq(n);
                v && (t[0] = g.call(this, n, r.html())), r.domManip(t, e)
            });
            if (f && (n = (s = h.buildFragment(t, this[0].ownerDocument, !1, this)).firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = (a = h.map(yt(s, "script"), bt)).length; f > l; l++) r = s, l !== p && (r = h.clone(r, !0, !0), o && h.merge(a, yt(r, "script"))), e.call(this[l], r, l);
                if (o)
                    for (u = a[a.length - 1].ownerDocument, h.map(a, wt), l = 0; o > l; l++) r = a[l], ht.test(r.type || "") && !h._data(r, "globalEval") && h.contains(u, r) && (r.src ? h._evalUrl && h._evalUrl(r.src) : h.globalEval((r.text || r.textContent || r.innerHTML || "").replace(pt, "")));
                s = n = null
            }
            return this
        }
    }), h.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        h.fn[t] = function(t) {
            for (var n, r = 0, i = [], a = h(t), u = a.length - 1; u >= r; r++) n = r === u ? this : this.clone(!0), h(a[r])[e](n), o.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var _t, Ct, Tt = {};

    function Et(e, n) {
        var r, i = h(n.createElement(e)).appendTo(n.body),
            o = t.getDefaultComputedStyle && (r = t.getDefaultComputedStyle(i[0])) ? r.display : h.css(i[0], "display");
        return i.detach(), o
    }

    function St(t) {
        var e = k,
            n = Tt[t];
        return n || ("none" !== (n = Et(t, e)) && n || ((e = ((_t = (_t || h("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement))[0].contentWindow || _t[0].contentDocument).document).write(), e.close(), n = Et(t, e), _t.detach()), Tt[t] = n), n
    }
    c.shrinkWrapBlocks = function() {
        return null != Ct ? Ct : (Ct = !1, (e = k.getElementsByTagName("body")[0]) && e.style ? (t = k.createElement("div"), (n = k.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", e.appendChild(n).appendChild(t), typeof t.style.zoom !== $ && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(k.createElement("div")).style.width = "5px", Ct = 3 !== t.offsetWidth), e.removeChild(n), Ct) : void 0);
        var t, e, n
    };
    var Nt, Dt, Lt = /^margin/,
        Rt = new RegExp("^(" + z + ")(?!px)[a-z%]+$", "i"),
        Ot = /^(top|right|bottom|left)$/;

    function $t(t, e) {
        return {
            get: function() {
                var n = t();
                if (null != n) return n ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }
    t.getComputedStyle ? (Nt = function(e) {
            return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
        }, Dt = function(t, e, n) {
            var r, i, o, a, u = t.style;
            return a = (n = n || Nt(t)) ? n.getPropertyValue(e) || n[e] : void 0, n && ("" !== a || h.contains(t.ownerDocument, t) || (a = h.style(t, e)), Rt.test(a) && Lt.test(e) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = n.width, u.width = r, u.minWidth = i, u.maxWidth = o)), void 0 === a ? a : a + ""
        }) : k.documentElement.currentStyle && (Nt = function(t) {
            return t.currentStyle
        }, Dt = function(t, e, n) {
            var r, i, o, a, u = t.style;
            return null == (a = (n = n || Nt(t)) ? n[e] : void 0) && u && u[e] && (a = u[e]), Rt.test(a) && !Ot.test(e) && (r = u.left, (o = (i = t.runtimeStyle) && i.left) && (i.left = t.currentStyle.left), u.left = "fontSize" === e ? "1em" : a, a = u.pixelLeft + "px", u.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
        }),
        function() {
            var e, n, r, i, o, a, u;
            if ((e = k.createElement("div")).innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = (r = e.getElementsByTagName("a")[0]) && r.style) {
                function s() {
                    var e, n, r, s;
                    (n = k.getElementsByTagName("body")[0]) && n.style && (e = k.createElement("div"), (r = k.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i = o = !1, u = !0, t.getComputedStyle && (i = "1%" !== (t.getComputedStyle(e, null) || {}).top, o = "4px" === (t.getComputedStyle(e, null) || {
                        width: "4px"
                    }).width, (s = e.appendChild(k.createElement("div"))).style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", s.style.marginRight = s.style.width = "0", e.style.width = "1px", u = !parseFloat((t.getComputedStyle(s, null) || {}).marginRight), e.removeChild(s)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (s = e.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (a = 0 === s[0].offsetHeight) && (s[0].style.display = "", s[1].style.display = "none", a = 0 === s[0].offsetHeight), n.removeChild(r))
                }
                n.cssText = "float:left;opacity:.5", c.opacity = "0.5" === n.opacity, c.cssFloat = !!n.cssFloat, e.style.backgroundClip = "content-box", e.cloneNode(!0).style.backgroundClip = "", c.clearCloneStyle = "content-box" === e.style.backgroundClip, c.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, h.extend(c, {
                    reliableHiddenOffsets: function() {
                        return null == a && s(), a
                    },
                    boxSizingReliable: function() {
                        return null == o && s(), o
                    },
                    pixelPosition: function() {
                        return null == i && s(), i
                    },
                    reliableMarginRight: function() {
                        return null == u && s(), u
                    }
                })
            }
        }(), h.swap = function(t, e, n, r) {
            var i, o, a = {};
            for (o in e) a[o] = t.style[o], t.style[o] = e[o];
            for (o in i = n.apply(t, r || []), e) t.style[o] = a[o];
            return i
        };
    var jt = /alpha\([^)]*\)/i,
        Ht = /opacity\s*=\s*([^)]*)/,
        qt = /^(none|table(?!-c[ea]).+)/,
        Ft = new RegExp("^(" + z + ")(.*)$", "i"),
        Pt = new RegExp("^([+-])=(" + z + ")", "i"),
        It = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        zt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Bt = ["Webkit", "O", "Moz", "ms"];

    function Ut(t, e) {
        if (e in t) return e;
        for (var n = e.charAt(0).toUpperCase() + e.slice(1), r = e, i = Bt.length; i--;)
            if ((e = Bt[i] + n) in t) return e;
        return r
    }

    function Wt(t, e) {
        for (var n, r, i, o = [], a = 0, u = t.length; u > a; a++)(r = t[a]).style && (o[a] = h._data(r, "olddisplay"), n = r.style.display, e ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && U(r) && (o[a] = h._data(r, "olddisplay", St(r.nodeName)))) : (i = U(r), (n && "none" !== n || !i) && h._data(r, "olddisplay", i ? n : h.css(r, "display"))));
        for (a = 0; u > a; a++)(r = t[a]).style && (e && "none" !== r.style.display && "" !== r.style.display || (r.style.display = e ? o[a] || "" : "none"));
        return t
    }

    function Yt(t, e, n) {
        var r = Ft.exec(e);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : e
    }

    function Vt(t, e, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += h.css(t, n + B[o], !0, i)), r ? ("content" === n && (a -= h.css(t, "padding" + B[o], !0, i)), "margin" !== n && (a -= h.css(t, "border" + B[o] + "Width", !0, i))) : (a += h.css(t, "padding" + B[o], !0, i), "padding" !== n && (a += h.css(t, "border" + B[o] + "Width", !0, i)));
        return a
    }

    function Gt(t, e, n) {
        var r = !0,
            i = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = Nt(t),
            a = c.boxSizing && "border-box" === h.css(t, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if ((0 > (i = Dt(t, e, o)) || null == i) && (i = t.style[e]), Rt.test(i)) return i;
            r = a && (c.boxSizingReliable() || i === t.style[e]), i = parseFloat(i) || 0
        }
        return i + Vt(t, e, n || (a ? "border" : "content"), r, o) + "px"
    }

    function Xt(t, e, n, r, i) {
        return new Xt.prototype.init(t, e, n, r, i)
    }
    h.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = Dt(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: c.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, n, r) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var i, o, a, u = h.camelCase(e),
                    s = t.style;
                if (e = h.cssProps[u] || (h.cssProps[u] = Ut(s, u)), a = h.cssHooks[e] || h.cssHooks[u], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(t, !1, r)) ? i : s[e];
                if ("string" == (o = typeof n) && (i = Pt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(h.css(t, e)), o = "number"), null != n && n == n && ("number" !== o || h.cssNumber[u] || (n += "px"), c.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (s[e] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(t, n, r))))) try {
                    s[e] = n
                } catch (t) {}
            }
        },
        css: function(t, e, n, r) {
            var i, o, a, u = h.camelCase(e);
            return e = h.cssProps[u] || (h.cssProps[u] = Ut(t.style, u)), (a = h.cssHooks[e] || h.cssHooks[u]) && "get" in a && (o = a.get(t, !0, n)), void 0 === o && (o = Dt(t, e, r)), "normal" === o && e in zt && (o = zt[e]), "" === n || n ? (i = parseFloat(o), !0 === n || h.isNumeric(i) ? i || 0 : o) : o
        }
    }), h.each(["height", "width"], function(t, e) {
        h.cssHooks[e] = {
            get: function(t, n, r) {
                return n ? qt.test(h.css(t, "display")) && 0 === t.offsetWidth ? h.swap(t, It, function() {
                    return Gt(t, e, r)
                }) : Gt(t, e, r) : void 0
            },
            set: function(t, n, r) {
                var i = r && Nt(t);
                return Yt(0, n, r ? Vt(t, e, r, c.boxSizing && "border-box" === h.css(t, "boxSizing", !1, i), i) : 0)
            }
        }
    }), c.opacity || (h.cssHooks.opacity = {
        get: function(t, e) {
            return Ht.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var n = t.style,
                r = t.currentStyle,
                i = h.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1, (e >= 1 || "" === e) && "" === h.trim(o.replace(jt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || r && !r.filter) || (n.filter = jt.test(o) ? o.replace(jt, i) : o + " " + i)
        }
    }), h.cssHooks.marginRight = $t(c.reliableMarginRight, function(t, e) {
        return e ? h.swap(t, {
            display: "inline-block"
        }, Dt, [t, "marginRight"]) : void 0
    }), h.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        h.cssHooks[t + e] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[t + B[r] + e] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, Lt.test(t) || (h.cssHooks[t + e].set = Yt)
    }), h.fn.extend({
        css: function(t, e) {
            return W(this, function(t, e, n) {
                var r, i, o = {},
                    a = 0;
                if (h.isArray(e)) {
                    for (r = Nt(t), i = e.length; i > a; a++) o[e[a]] = h.css(t, e[a], !1, r);
                    return o
                }
                return void 0 !== n ? h.style(t, e, n) : h.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return Wt(this, !0)
        },
        hide: function() {
            return Wt(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                U(this) ? h(this).show() : h(this).hide()
            })
        }
    }), h.Tween = Xt, Xt.prototype = {
        constructor: Xt,
        init: function(t, e, n, r, i, o) {
            this.elem = t, this.prop = n, this.easing = i || "swing", this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = o || (h.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = Xt.propHooks[this.prop];
            return t && t.get ? t.get(this) : Xt.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = Xt.propHooks[this.prop];
            return this.pos = e = this.options.duration ? h.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Xt.propHooks._default.set(this), this
        }
    }, Xt.prototype.init.prototype = Xt.prototype, Xt.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = h.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0 : t.elem[t.prop]
            },
            set: function(t) {
                h.fx.step[t.prop] ? h.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[h.cssProps[t.prop]] || h.cssHooks[t.prop]) ? h.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, Xt.propHooks.scrollTop = Xt.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, h.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, h.fx = Xt.prototype.init, h.fx.step = {};
    var Zt, Qt, Kt, Jt, te, ee, ne, re = /^(?:toggle|show|hide)$/,
        ie = new RegExp("^(?:([+-])=|)(" + z + ")([a-z%]*)$", "i"),
        oe = /queueHooks$/,
        ae = [function(t, e, n) {
            var r, i, o, a, u, s, l, f = this,
                d = {},
                p = t.style,
                g = t.nodeType && U(t),
                v = h._data(t, "fxshow");
            for (r in n.queue || (null == (u = h._queueHooks(t, "fx")).unqueued && (u.unqueued = 0, s = u.empty.fire, u.empty.fire = function() {
                    u.unqueued || s()
                }), u.unqueued++, f.always(function() {
                    f.always(function() {
                        u.unqueued--, h.queue(t, "fx").length || u.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (l = h.css(t, "display")) ? h._data(t, "olddisplay") || St(t.nodeName) : l) && "none" === h.css(t, "float") && (c.inlineBlockNeedsLayout && "inline" !== St(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.shrinkWrapBlocks() || f.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                })), e)
                if (i = e[r], re.exec(i)) {
                    if (delete e[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r]) continue;
                        g = !0
                    }
                    d[r] = v && v[r] || h.style(t, r)
                } else l = void 0;
            if (h.isEmptyObject(d)) "inline" === ("none" === l ? St(t.nodeName) : l) && (p.display = l);
            else
                for (r in v ? "hidden" in v && (g = v.hidden) : v = h._data(t, "fxshow", {}), o && (v.hidden = !g), g ? h(t).show() : f.done(function() {
                        h(t).hide()
                    }), f.done(function() {
                        var e;
                        for (e in h._removeData(t, "fxshow"), d) h.style(t, e, d[e])
                    }), d) a = ce(g ? v[r] : 0, r, f), r in v || (v[r] = a.start, g && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }],
        ue = {
            "*": [function(t, e) {
                var n = this.createTween(t, e),
                    r = n.cur(),
                    i = ie.exec(e),
                    o = i && i[3] || (h.cssNumber[t] ? "" : "px"),
                    a = (h.cssNumber[t] || "px" !== o && +r) && ie.exec(h.css(n.elem, t)),
                    u = 1,
                    s = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do {
                        a /= u = u || ".5", h.style(n.elem, t, a + o)
                    } while (u !== (u = n.cur() / r) && 1 !== u && --s)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };

    function se() {
        return setTimeout(function() {
            Zt = void 0
        }), Zt = h.now()
    }

    function le(t, e) {
        var n, r = {
                height: t
            },
            i = 0;
        for (e = e ? 1 : 0; 4 > i; i += 2 - e) r["margin" + (n = B[i])] = r["padding" + n] = t;
        return e && (r.opacity = r.width = t), r
    }

    function ce(t, e, n) {
        for (var r, i = (ue[e] || []).concat(ue["*"]), o = 0, a = i.length; a > o; o++)
            if (r = i[o].call(n, e, t)) return r
    }

    function fe(t, e, n) {
        var r, i, o = 0,
            a = ae.length,
            u = h.Deferred().always(function() {
                delete s.elem
            }),
            s = function() {
                if (i) return !1;
                for (var e = Zt || se(), n = Math.max(0, l.startTime + l.duration - e), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; a > o; o++) l.tweens[o].run(r);
                return u.notifyWith(t, [l, r, n]), 1 > r && a ? n : (u.resolveWith(t, [l]), !1)
            },
            l = u.promise({
                elem: t,
                props: h.extend({}, e),
                opts: h.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: Zt || se(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n) {
                    var r = h.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(e) {
                    var n = 0,
                        r = e ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return e ? u.resolveWith(t, [l, e]) : u.rejectWith(t, [l, e]), this
                }
            }),
            c = l.props;
        for (function(t, e) {
                var n, r, i, o, a;
                for (n in t)
                    if (i = e[r = h.camelCase(n)], o = t[n], h.isArray(o) && (i = o[1], o = t[n] = o[0]), n !== r && (t[r] = o, delete t[n]), (a = h.cssHooks[r]) && "expand" in a)
                        for (n in o = a.expand(o), delete t[r], o) n in t || (t[n] = o[n], e[n] = i);
                    else e[r] = i
            }(c, l.opts.specialEasing); a > o; o++)
            if (r = ae[o].call(l, t, c, l.opts)) return r;
        return h.map(c, ce, l), h.isFunction(l.opts.start) && l.opts.start.call(t, l), h.fx.timer(h.extend(s, {
            elem: t,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    h.Animation = h.extend(fe, {
        tweener: function(t, e) {
            h.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
            for (var n, r = 0, i = t.length; i > r; r++) n = t[r], ue[n] = ue[n] || [], ue[n].unshift(e)
        },
        prefilter: function(t, e) {
            e ? ae.unshift(t) : ae.push(t)
        }
    }), h.speed = function(t, e, n) {
        var r = t && "object" == typeof t ? h.extend({}, t) : {
            complete: n || !n && e || h.isFunction(t) && t,
            duration: t,
            easing: n && e || e && !h.isFunction(e) && e
        };
        return r.duration = h.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in h.fx.speeds ? h.fx.speeds[r.duration] : h.fx.speeds._default, (null == r.queue || !0 === r.queue) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            h.isFunction(r.old) && r.old.call(this), r.queue && h.dequeue(this, r.queue)
        }, r
    }, h.fn.extend({
        fadeTo: function(t, e, n, r) {
            return this.filter(U).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, n, r)
        },
        animate: function(t, e, n, r) {
            var i = h.isEmptyObject(t),
                o = h.speed(e, n, r),
                a = function() {
                    var e = fe(this, h.extend({}, t), o);
                    (i || h._data(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(t, e, n) {
            var r = function(t) {
                var e = t.stop;
                delete t.stop, e(n)
            };
            return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                var e = !0,
                    i = null != t && t + "queueHooks",
                    o = h.timers,
                    a = h._data(this);
                if (i) a[i] && a[i].stop && r(a[i]);
                else
                    for (i in a) a[i] && a[i].stop && oe.test(i) && r(a[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(n), e = !1, o.splice(i, 1));
                (e || !n) && h.dequeue(this, t)
            })
        },
        finish: function(t) {
            return !1 !== t && (t = t || "fx"), this.each(function() {
                var e, n = h._data(this),
                    r = n[t + "queue"],
                    i = n[t + "queueHooks"],
                    o = h.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, h.queue(this, t, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; a > e; e++) r[e] && r[e].finish && r[e].finish.call(this);
                delete n.finish
            })
        }
    }), h.each(["toggle", "show", "hide"], function(t, e) {
        var n = h.fn[e];
        h.fn[e] = function(t, r, i) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(le(e, !0), t, r, i)
        }
    }), h.each({
        slideDown: le("show"),
        slideUp: le("hide"),
        slideToggle: le("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        h.fn[t] = function(t, n, r) {
            return this.animate(e, t, n, r)
        }
    }), h.timers = [], h.fx.tick = function() {
        var t, e = h.timers,
            n = 0;
        for (Zt = h.now(); n < e.length; n++)(t = e[n])() || e[n] !== t || e.splice(n--, 1);
        e.length || h.fx.stop(), Zt = void 0
    }, h.fx.timer = function(t) {
        h.timers.push(t), t() ? h.fx.start() : h.timers.pop()
    }, h.fx.interval = 13, h.fx.start = function() {
        Qt || (Qt = setInterval(h.fx.tick, h.fx.interval))
    }, h.fx.stop = function() {
        clearInterval(Qt), Qt = null
    }, h.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, h.fn.delay = function(t, e) {
        return t = h.fx && h.fx.speeds[t] || t, e = e || "fx", this.queue(e, function(e, n) {
            var r = setTimeout(e, t);
            n.stop = function() {
                clearTimeout(r)
            }
        })
    }, (Jt = k.createElement("div")).setAttribute("className", "t"), Jt.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ee = Jt.getElementsByTagName("a")[0], ne = (te = k.createElement("select")).appendChild(k.createElement("option")), Kt = Jt.getElementsByTagName("input")[0], ee.style.cssText = "top:1px", c.getSetAttribute = "t" !== Jt.className, c.style = /top/.test(ee.getAttribute("style")), c.hrefNormalized = "/a" === ee.getAttribute("href"), c.checkOn = !!Kt.value, c.optSelected = ne.selected, c.enctype = !!k.createElement("form").enctype, te.disabled = !0, c.optDisabled = !ne.disabled, (Kt = k.createElement("input")).setAttribute("value", ""), c.input = "" === Kt.getAttribute("value"), Kt.value = "t", Kt.setAttribute("type", "radio"), c.radioValue = "t" === Kt.value;
    var he = /\r/g;
    h.fn.extend({
        val: function(t) {
            var e, n, r, i = this[0];
            return arguments.length ? (r = h.isFunction(t), this.each(function(n) {
                var i;
                1 === this.nodeType && (null == (i = r ? t.call(this, n, h(this).val()) : t) ? i = "" : "number" == typeof i ? i += "" : h.isArray(i) && (i = h.map(i, function(t) {
                    return null == t ? "" : t + ""
                })), (e = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, i, "value") || (this.value = i))
            })) : i ? (e = h.valHooks[i.type] || h.valHooks[i.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(i, "value")) ? n : "string" == typeof(n = i.value) ? n.replace(he, "") : null == n ? "" : n : void 0
        }
    }), h.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = h.find.attr(t, "value");
                    return null != e ? e : h.trim(h.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, r = t.options, i = t.selectedIndex, o = "select-one" === t.type || 0 > i, a = o ? null : [], u = o ? i + 1 : r.length, s = 0 > i ? u : o ? i : 0; u > s; s++)
                        if (!(!(n = r[s]).selected && s !== i || (c.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && h.nodeName(n.parentNode, "optgroup"))) {
                            if (e = h(n).val(), o) return e;
                            a.push(e)
                        } return a
                },
                set: function(t, e) {
                    for (var n, r, i = t.options, o = h.makeArray(e), a = i.length; a--;)
                        if (r = i[a], h.inArray(h.valHooks.option.get(r), o) >= 0) try {
                            r.selected = n = !0
                        } catch (t) {
                            r.scrollHeight
                        } else r.selected = !1;
                    return n || (t.selectedIndex = -1), i
                }
            }
        }
    }), h.each(["radio", "checkbox"], function() {
        h.valHooks[this] = {
            set: function(t, e) {
                return h.isArray(e) ? t.checked = h.inArray(h(t).val(), e) >= 0 : void 0
            }
        }, c.checkOn || (h.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var de, pe, ge = h.expr.attrHandle,
        ve = /^(?:checked|selected)$/i,
        ye = c.getSetAttribute,
        me = c.input;
    h.fn.extend({
        attr: function(t, e) {
            return W(this, h.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                h.removeAttr(this, t)
            })
        }
    }), h.extend({
        attr: function(t, e, n) {
            var r, i, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === $ ? h.prop(t, e, n) : (1 === o && h.isXMLDoc(t) || (e = e.toLowerCase(), r = h.attrHooks[e] || (h.expr.match.bool.test(e) ? pe : de)), void 0 === n ? r && "get" in r && null !== (i = r.get(t, e)) ? i : null == (i = h.find.attr(t, e)) ? void 0 : i : null !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : void h.removeAttr(t, e))
        },
        removeAttr: function(t, e) {
            var n, r, i = 0,
                o = e && e.match(N);
            if (o && 1 === t.nodeType)
                for (; n = o[i++];) r = h.propFix[n] || n, h.expr.match.bool.test(n) ? me && ye || !ve.test(n) ? t[r] = !1 : t[h.camelCase("default-" + n)] = t[r] = !1 : h.attr(t, n, ""), t.removeAttribute(ye ? n : r)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!c.radioValue && "radio" === e && h.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        }
    }), pe = {
        set: function(t, e, n) {
            return !1 === e ? h.removeAttr(t, n) : me && ye || !ve.test(n) ? t.setAttribute(!ye && h.propFix[n] || n, n) : t[h.camelCase("default-" + n)] = t[n] = !0, n
        }
    }, h.each(h.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = ge[e] || h.find.attr;
        ge[e] = me && ye || !ve.test(e) ? function(t, e, r) {
            var i, o;
            return r || (o = ge[e], ge[e] = i, i = null != n(t, e, r) ? e.toLowerCase() : null, ge[e] = o), i
        } : function(t, e, n) {
            return n ? void 0 : t[h.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), me && ye || (h.attrHooks.value = {
        set: function(t, e, n) {
            return h.nodeName(t, "input") ? void(t.defaultValue = e) : de && de.set(t, e, n)
        }
    }), ye || (de = {
        set: function(t, e, n) {
            var r = t.getAttributeNode(n);
            return r || t.setAttributeNode(r = t.ownerDocument.createAttribute(n)), r.value = e += "", "value" === n || e === t.getAttribute(n) ? e : void 0
        }
    }, ge.id = ge.name = ge.coords = function(t, e, n) {
        var r;
        return n ? void 0 : (r = t.getAttributeNode(e)) && "" !== r.value ? r.value : null
    }, h.valHooks.button = {
        get: function(t, e) {
            var n = t.getAttributeNode(e);
            return n && n.specified ? n.value : void 0
        },
        set: de.set
    }, h.attrHooks.contenteditable = {
        set: function(t, e, n) {
            de.set(t, "" !== e && e, n)
        }
    }, h.each(["width", "height"], function(t, e) {
        h.attrHooks[e] = {
            set: function(t, n) {
                return "" === n ? (t.setAttribute(e, "auto"), n) : void 0
            }
        }
    })), c.style || (h.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var xe = /^(?:input|select|textarea|button|object)$/i,
        be = /^(?:a|area)$/i;
    h.fn.extend({
        prop: function(t, e) {
            return W(this, h.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = h.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (t) {}
            })
        }
    }), h.extend({
        propFix: {
            for: "htmlFor",
            class: "className"
        },
        prop: function(t, e, n) {
            var r, i, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o) return (1 !== o || !h.isXMLDoc(t)) && (e = h.propFix[e] || e, i = h.propHooks[e]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : t[e] = n : i && "get" in i && null !== (r = i.get(t, e)) ? r : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = h.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : xe.test(t.nodeName) || be.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), c.hrefNormalized || h.each(["href", "src"], function(t, e) {
        h.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), c.optSelected || (h.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), h.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        h.propFix[this.toLowerCase()] = this
    }), c.enctype || (h.propFix.enctype = "encoding");
    var we = /[\t\r\n\f]/g;
    h.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, u = 0,
                s = this.length,
                l = "string" == typeof t && t;
            if (h.isFunction(t)) return this.each(function(e) {
                h(this).addClass(t.call(this, e, this.className))
            });
            if (l)
                for (e = (t || "").match(N) || []; s > u; u++)
                    if (r = 1 === (n = this[u]).nodeType && (n.className ? (" " + n.className + " ").replace(we, " ") : " ")) {
                        for (o = 0; i = e[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        a = h.trim(r), n.className !== a && (n.className = a)
                    } return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, u = 0,
                s = this.length,
                l = 0 === arguments.length || "string" == typeof t && t;
            if (h.isFunction(t)) return this.each(function(e) {
                h(this).removeClass(t.call(this, e, this.className))
            });
            if (l)
                for (e = (t || "").match(N) || []; s > u; u++)
                    if (r = 1 === (n = this[u]).nodeType && (n.className ? (" " + n.className + " ").replace(we, " ") : "")) {
                        for (o = 0; i = e[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        a = t ? h.trim(r) : "", n.className !== a && (n.className = a)
                    } return this
        },
        toggleClass: function(t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : this.each(h.isFunction(t) ? function(n) {
                h(this).toggleClass(t.call(this, n, this.className, e), e)
            } : function() {
                if ("string" === n)
                    for (var e, r = 0, i = h(this), o = t.match(N) || []; e = o[r++];) i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                else(n === $ || "boolean" === n) && (this.className && h._data(this, "__className__", this.className), this.className = this.className || !1 === t ? "" : h._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(we, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        h.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    }), h.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, r) {
            return this.on(e, t, n, r)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    });
    var Ae = h.now(),
        Me = /\?/,
        ke = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    h.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var n, r = null,
            i = h.trim(e + "");
        return i && !h.trim(i.replace(ke, function(t, e, i, o) {
            return n && e && (r = 0), 0 === r ? t : (n = i || e, r += !o - !i, "")
        })) ? Function("return " + i)() : h.error("Invalid JSON: " + e)
    }, h.parseXML = function(e) {
        var n;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? n = (new DOMParser).parseFromString(e, "text/xml") : ((n = new ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(e))
        } catch (t) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || h.error("Invalid XML: " + e), n
    };
    var _e, Ce, Te = /#.*$/,
        Ee = /([?&])_=[^&]*/,
        Se = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ne = /^(?:GET|HEAD)$/,
        De = /^\/\//,
        Le = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Re = {},
        Oe = {},
        $e = "*/".concat("*");
    try {
        Ce = location.href
    } catch (t) {
        (Ce = k.createElement("a")).href = "", Ce = Ce.href
    }

    function je(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var r, i = 0,
                o = e.toLowerCase().match(N) || [];
            if (h.isFunction(n))
                for (; r = o[i++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
        }
    }

    function He(t, e, n, r) {
        var i = {},
            o = t === Oe;

        function a(u) {
            var s;
            return i[u] = !0, h.each(t[u] || [], function(t, u) {
                var l = u(e, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(s = l) : void 0 : (e.dataTypes.unshift(l), a(l), !1)
            }), s
        }
        return a(e.dataTypes[0]) || !i["*"] && a("*")
    }

    function qe(t, e) {
        var n, r, i = h.ajaxSettings.flatOptions || {};
        for (r in e) void 0 !== e[r] && ((i[r] ? t : n || (n = {}))[r] = e[r]);
        return n && h.extend(!0, t, n), t
    }
    _e = Le.exec(Ce.toLowerCase()) || [], h.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ce,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(_e[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $e,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": h.parseJSON,
                "text xml": h.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? qe(qe(t, h.ajaxSettings), e) : qe(h.ajaxSettings, t)
        },
        ajaxPrefilter: je(Re),
        ajaxTransport: je(Oe),
        ajax: function(t, e) {
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var n, r, i, o, a, u, s, l, c = h.ajaxSetup({}, e),
                f = c.context || c,
                d = c.context && (f.nodeType || f.jquery) ? h(f) : h.event,
                p = h.Deferred(),
                g = h.Callbacks("once memory"),
                v = c.statusCode || {},
                y = {},
                m = {},
                x = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === x) {
                            if (!l)
                                for (l = {}; e = Se.exec(o);) l[e[1].toLowerCase()] = e[2];
                            e = l[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? o : null
                    },
                    setRequestHeader: function(t, e) {
                        var n = t.toLowerCase();
                        return x || (t = m[n] = m[n] || t, y[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return x || (c.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (2 > x)
                                for (e in t) v[e] = [v[e], t[e]];
                            else w.always(t[w.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || b;
                        return s && s.abort(e), A(0, e), this
                    }
                };
            if (p.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, c.url = ((t || c.url || Ce) + "").replace(Te, "").replace(De, _e[1] + "//"), c.type = e.method || e.type || c.method || c.type, c.dataTypes = h.trim(c.dataType || "*").toLowerCase().match(N) || [""], null == c.crossDomain && (n = Le.exec(c.url.toLowerCase()), c.crossDomain = !(!n || n[1] === _e[1] && n[2] === _e[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (_e[3] || ("http:" === _e[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = h.param(c.data, c.traditional)), He(Re, c, e, w), 2 === x) return w;
            for (r in (u = h.event && c.global) && 0 == h.active++ && h.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Ne.test(c.type), i = c.url, c.hasContent || (c.data && (i = c.url += (Me.test(i) ? "&" : "?") + c.data, delete c.data), !1 === c.cache && (c.url = Ee.test(i) ? i.replace(Ee, "$1_=" + Ae++) : i + (Me.test(i) ? "&" : "?") + "_=" + Ae++)), c.ifModified && (h.lastModified[i] && w.setRequestHeader("If-Modified-Since", h.lastModified[i]), h.etag[i] && w.setRequestHeader("If-None-Match", h.etag[i])), (c.data && c.hasContent && !1 !== c.contentType || e.contentType) && w.setRequestHeader("Content-Type", c.contentType), w.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + $e + "; q=0.01" : "") : c.accepts["*"]), c.headers) w.setRequestHeader(r, c.headers[r]);
            if (c.beforeSend && (!1 === c.beforeSend.call(f, w, c) || 2 === x)) return w.abort();
            for (r in b = "abort", {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[r](c[r]);
            if (s = He(Oe, c, e, w)) {
                w.readyState = 1, u && d.trigger("ajaxSend", [w, c]), c.async && c.timeout > 0 && (a = setTimeout(function() {
                    w.abort("timeout")
                }, c.timeout));
                try {
                    x = 1, s.send(y, A)
                } catch (t) {
                    if (!(2 > x)) throw t;
                    A(-1, t)
                }
            } else A(-1, "No Transport");

            function A(t, e, n, r) {
                var l, y, m, b, A, M = e;
                2 !== x && (x = 2, a && clearTimeout(a), s = void 0, o = r || "", w.readyState = t > 0 ? 4 : 0, l = t >= 200 && 300 > t || 304 === t, n && (b = function(t, e, n) {
                    for (var r, i, o, a, u = t.contents, s = t.dataTypes;
                        "*" === s[0];) s.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                    if (i)
                        for (a in u)
                            if (u[a] && u[a].test(i)) {
                                s.unshift(a);
                                break
                            } if (s[0] in n) o = s[0];
                    else {
                        for (a in n) {
                            if (!s[0] || t.converters[a + " " + s[0]]) {
                                o = a;
                                break
                            }
                            r || (r = a)
                        }
                        o = o || r
                    }
                    return o ? (o !== s[0] && s.unshift(o), n[o]) : void 0
                }(c, w, n)), b = function(t, e, n, r) {
                    var i, o, a, u, s, l = {},
                        c = t.dataTypes.slice();
                    if (c[1])
                        for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
                    for (o = c.shift(); o;)
                        if (t.responseFields[o] && (n[t.responseFields[o]] = e), !s && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), s = o, o = c.shift())
                            if ("*" === o) o = s;
                            else if ("*" !== s && s !== o) {
                        if (!(a = l[s + " " + o] || l["* " + o]))
                            for (i in l)
                                if ((u = i.split(" "))[1] === o && (a = l[s + " " + u[0]] || l["* " + u[0]])) {
                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = u[0], c.unshift(u[1]));
                                    break
                                } if (!0 !== a)
                            if (a && t.throws) e = a(e);
                            else try {
                                e = a(e)
                            } catch (t) {
                                return {
                                    state: "parsererror",
                                    error: a ? t : "No conversion from " + s + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: e
                    }
                }(c, b, w, l), l ? (c.ifModified && ((A = w.getResponseHeader("Last-Modified")) && (h.lastModified[i] = A), (A = w.getResponseHeader("etag")) && (h.etag[i] = A)), 204 === t || "HEAD" === c.type ? M = "nocontent" : 304 === t ? M = "notmodified" : (M = b.state, y = b.data, l = !(m = b.error))) : (m = M, (t || !M) && (M = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (e || M) + "", l ? p.resolveWith(f, [y, M, w]) : p.rejectWith(f, [w, M, m]), w.statusCode(v), v = void 0, u && d.trigger(l ? "ajaxSuccess" : "ajaxError", [w, c, l ? y : m]), g.fireWith(f, [w, M]), u && (d.trigger("ajaxComplete", [w, c]), --h.active || h.event.trigger("ajaxStop")))
            }
            return w
        },
        getJSON: function(t, e, n) {
            return h.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return h.get(t, void 0, e, "script")
        }
    }), h.each(["get", "post"], function(t, e) {
        h[e] = function(t, n, r, i) {
            return h.isFunction(n) && (i = i || r, r = n, n = void 0), h.ajax({
                url: t,
                type: e,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), h._evalUrl = function(t) {
        return h.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    }, h.fn.extend({
        wrapAll: function(t) {
            if (h.isFunction(t)) return this.each(function(e) {
                h(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = h(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return this.each(h.isFunction(t) ? function(e) {
                h(this).wrapInner(t.call(this, e))
            } : function() {
                var e = h(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = h.isFunction(t);
            return this.each(function(n) {
                h(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                h.nodeName(this, "body") || h(this).replaceWith(this.childNodes)
            }).end()
        }
    }), h.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !c.reliableHiddenOffsets() && "none" === (t.style && t.style.display || h.css(t, "display"))
    }, h.expr.filters.visible = function(t) {
        return !h.expr.filters.hidden(t)
    };
    var Fe = /%20/g,
        Pe = /\[\]$/,
        Ie = /\r?\n/g,
        ze = /^(?:submit|button|image|reset|file)$/i,
        Be = /^(?:input|select|textarea|keygen)/i;

    function Ue(t, e, n, r) {
        var i;
        if (h.isArray(e)) h.each(e, function(e, i) {
            n || Pe.test(t) ? r(t, i) : Ue(t + "[" + ("object" == typeof i ? e : "") + "]", i, n, r)
        });
        else if (n || "object" !== h.type(e)) r(t, e);
        else
            for (i in e) Ue(t + "[" + i + "]", e[i], n, r)
    }
    h.param = function(t, e) {
        var n, r = [],
            i = function(t, e) {
                e = h.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = h.ajaxSettings && h.ajaxSettings.traditional), h.isArray(t) || t.jquery && !h.isPlainObject(t)) h.each(t, function() {
            i(this.name, this.value)
        });
        else
            for (n in t) Ue(n, t[n], e, i);
        return r.join("&").replace(Fe, "+")
    }, h.fn.extend({
        serialize: function() {
            return h.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = h.prop(this, "elements");
                return t ? h.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !h(this).is(":disabled") && Be.test(this.nodeName) && !ze.test(t) && (this.checked || !Y.test(t))
            }).map(function(t, e) {
                var n = h(this).val();
                return null == n ? null : h.isArray(n) ? h.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Ie, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Ie, "\r\n")
                }
            }).get()
        }
    }), h.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Ge() || function() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }()
    } : Ge;
    var We = 0,
        Ye = {},
        Ve = h.ajaxSettings.xhr();

    function Ge() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    }
    t.attachEvent && t.attachEvent("onunload", function() {
        for (var t in Ye) Ye[t](void 0, !0)
    }), c.cors = !!Ve && "withCredentials" in Ve, (Ve = c.ajax = !!Ve) && h.ajaxTransport(function(t) {
        var e;
        if (!t.crossDomain || c.cors) return {
            send: function(n, r) {
                var i, o = t.xhr(),
                    a = ++We;
                if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (i in t.xhrFields) o[i] = t.xhrFields[i];
                for (i in t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest"), n) void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                o.send(t.hasContent && t.data || null), e = function(n, i) {
                    var u, s, l;
                    if (e && (i || 4 === o.readyState))
                        if (delete Ye[a], e = void 0, o.onreadystatechange = h.noop, i) 4 !== o.readyState && o.abort();
                        else {
                            l = {}, u = o.status, "string" == typeof o.responseText && (l.text = o.responseText);
                            try {
                                s = o.statusText
                            } catch (t) {
                                s = ""
                            }
                            u || !t.isLocal || t.crossDomain ? 1223 === u && (u = 204) : u = l.text ? 200 : 404
                        } l && r(u, s, l, o.getAllResponseHeaders())
                }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Ye[a] = e : e()
            },
            abort: function() {
                e && e(void 0, !0)
            }
        }
    }), h.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return h.globalEval(t), t
            }
        }
    }), h.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), h.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, n = k.head || h("head")[0] || k.documentElement;
            return {
                send: function(r, i) {
                    (e = k.createElement("script")).async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, n) {
                        (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || i(200, "success"))
                    }, n.insertBefore(e, n.firstChild)
                },
                abort: function() {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var Xe = [],
        Ze = /(=)\?(?=&|$)|\?\?/;
    h.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Xe.pop() || h.expando + "_" + Ae++;
            return this[t] = !0, t
        }
    }), h.ajaxPrefilter("json jsonp", function(e, n, r) {
        var i, o, a, u = !1 !== e.jsonp && (Ze.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ze.test(e.data) && "data");
        return u || "jsonp" === e.dataTypes[0] ? (i = e.jsonpCallback = h.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, u ? e[u] = e[u].replace(Ze, "$1" + i) : !1 !== e.jsonp && (e.url += (Me.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
            return a || h.error(i + " was not called"), a[0]
        }, e.dataTypes[0] = "json", o = t[i], t[i] = function() {
            a = arguments
        }, r.always(function() {
            t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, Xe.push(i)), a && h.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), h.parseHTML = function(t, e, n) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (n = e, e = !1), e = e || k;
        var r = b.exec(t),
            i = !n && [];
        return r ? [e.createElement(r[1])] : (r = h.buildFragment([t], e, i), i && i.length && h(i).remove(), h.merge([], r.childNodes))
    };
    var Qe = h.fn.load;
    h.fn.load = function(t, e, n) {
        if ("string" != typeof t && Qe) return Qe.apply(this, arguments);
        var r, i, o, a = this,
            u = t.indexOf(" ");
        return u >= 0 && (r = h.trim(t.slice(u, t.length)), t = t.slice(0, u)), h.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), a.length > 0 && h.ajax({
            url: t,
            type: o,
            dataType: "html",
            data: e
        }).done(function(t) {
            i = arguments, a.html(r ? h("<div>").append(h.parseHTML(t)).find(r) : t)
        }).complete(n && function(t, e) {
            a.each(n, i || [t.responseText, e, t])
        }), this
    }, h.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        h.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), h.expr.filters.animated = function(t) {
        return h.grep(h.timers, function(e) {
            return t === e.elem
        }).length
    };
    var Ke = t.document.documentElement;

    function Je(t) {
        return h.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }
    h.offset = {
        setOffset: function(t, e, n) {
            var r, i, o, a, u, s, l = h.css(t, "position"),
                c = h(t),
                f = {};
            "static" === l && (t.style.position = "relative"), u = c.offset(), o = h.css(t, "top"), s = h.css(t, "left"), ("absolute" === l || "fixed" === l) && h.inArray("auto", [o, s]) > -1 ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(s) || 0), h.isFunction(e) && (e = e.call(t, n, u)), null != e.top && (f.top = e.top - u.top + a), null != e.left && (f.left = e.left - u.left + i), "using" in e ? e.using.call(t, f) : c.css(f)
        }
    }, h.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                h.offset.setOffset(this, t, e)
            });
            var e, n, r = {
                    top: 0,
                    left: 0
                },
                i = this[0],
                o = i && i.ownerDocument;
            return o ? (e = o.documentElement, h.contains(e, i) ? (typeof i.getBoundingClientRect !== $ && (r = i.getBoundingClientRect()), n = Je(o), {
                top: r.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: r.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : r) : void 0
        },
        position: function() {
            if (this[0]) {
                var t, e, n = {
                        top: 0,
                        left: 0
                    },
                    r = this[0];
                return "fixed" === h.css(r, "position") ? e = r.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), h.nodeName(t[0], "html") || (n = t.offset()), n.top += h.css(t[0], "borderTopWidth", !0), n.left += h.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - n.top - h.css(r, "marginTop", !0),
                    left: e.left - n.left - h.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || Ke; t && !h.nodeName(t, "html") && "static" === h.css(t, "position");) t = t.offsetParent;
                return t || Ke
            })
        }
    }), h.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var n = /Y/.test(e);
        h.fn[t] = function(r) {
            return W(this, function(t, r, i) {
                var o = Je(t);
                return void 0 === i ? o ? e in o ? o[e] : o.document.documentElement[r] : t[r] : void(o ? o.scrollTo(n ? h(o).scrollLeft() : i, n ? i : h(o).scrollTop()) : t[r] = i)
            }, t, r, arguments.length, null)
        }
    }), h.each(["top", "left"], function(t, e) {
        h.cssHooks[e] = $t(c.pixelPosition, function(t, n) {
            return n ? (n = Dt(t, e), Rt.test(n) ? h(t).position()[e] + "px" : n) : void 0
        })
    }), h.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        h.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(n, r) {
            h.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    a = n || (!0 === r || !0 === i ? "margin" : "border");
                return W(this, function(e, n, r) {
                    var i;
                    return h.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + t], i["scroll" + t], e.body["offset" + t], i["offset" + t], i["client" + t])) : void 0 === r ? h.css(e, n, a) : h.style(e, n, r, a)
                }, e, o ? r : void 0, o, null)
            }
        })
    }), h.fn.size = function() {
        return this.length
    }, h.fn.andSelf = h.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return h
    });
    var tn = t.jQuery,
        en = t.$;
    return h.noConflict = function(e) {
        return t.$ === h && (t.$ = en), e && t.jQuery === h && (t.jQuery = tn), h
    }, typeof e === $ && (t.jQuery = t.$ = h), h
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
! function(t) {
"use strict";
var e = jQuery.fn.jquery.split(" ")[0].split(".");
if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(),
//----modal----
function(t) {
"use strict";

function e(e, r) {
    return this.each(function() {
        var i = t(this),
            o = i.data("bs.modal"),
            a = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
        o || i.data("bs.modal", o = new n(this, a)), "string" == typeof e ? o[e](r) : a.show && o.show(r)
    })
}
var n = function(e, n) {
    this.options = n, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
        this.$element.trigger("loaded.bs.modal")
    }, this))
};
n.VERSION = "3.3.2", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
}, n.prototype.toggle = function(t) {
    return this.isShown ? this.hide() : this.show(t)
}, n.prototype.show = function(e) {
    var r = this,
        i = t.Event("show.bs.modal", {
            relatedTarget: e
        });
    this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
        var i = t.support.transition && r.$element.hasClass("fade");
        r.$element.parent().length || r.$element.appendTo(r.$body), r.$element.show().scrollTop(0), r.options.backdrop && r.adjustBackdrop(), r.adjustDialog(), i && r.$element[0].offsetWidth, r.$element.addClass("in").attr("aria-hidden", !1), r.enforceFocus();
        var o = t.Event("shown.bs.modal", {
            relatedTarget: e
        });
        i ? r.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
            r.$element.trigger("focus").trigger(o)
        }).emulateTransitionEnd(n.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(o)
    }))
}, n.prototype.hide = function(e) {
    e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
}, n.prototype.enforceFocus = function() {
    t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
        this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
    }, this))
}, n.prototype.escape = function() {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
        27 == t.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
}, n.prototype.resize = function() {
    this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
}, n.prototype.hideModal = function() {
    var t = this;
    this.$element.hide(), this.backdrop(function() {
        t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
    })
}, n.prototype.removeBackdrop = function() {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
}, n.prototype.backdrop = function(e) {
    var r = this,
        i = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
        var o = t.support.transition && i;
        if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function(t) {
                t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
        o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
    } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        var a = function() {
            r.removeBackdrop(), e && e()
        };
        t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
    } else e && e()
}, n.prototype.handleUpdate = function() {
    this.options.backdrop && this.adjustBackdrop(), this.adjustDialog()
}, n.prototype.adjustBackdrop = function() {
    this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
}, n.prototype.adjustDialog = function() {
    var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
        paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
        paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
    })
}, n.prototype.resetAdjustments = function() {
    this.$element.css({
        paddingLeft: "",
        paddingRight: ""
    })
}, n.prototype.checkScrollbar = function() {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, this.scrollbarWidth = this.measureScrollbar()
}, n.prototype.setScrollbar = function() {
    var t = parseInt(this.$body.css("padding-right") || 0, 10);
    this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
}, n.prototype.resetScrollbar = function() {
    this.$body.css("padding-right", "")
}, n.prototype.measureScrollbar = function() {
    var t = document.createElement("div");
    t.className = "modal-scrollbar-measure", this.$body.append(t);
    var e = t.offsetWidth - t.clientWidth;
    return this.$body[0].removeChild(t), e
};
var r = t.fn.modal;
t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function() {
    return t.fn.modal = r, this
}, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
    var r = t(this),
        i = r.attr("href"),
        o = t(r.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
        a = o.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(i) && i
        }, o.data(), r.data());
    r.is("a") && n.preventDefault(), o.one("show.bs.modal", function(t) {
        t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
            r.is(":visible") && r.trigger("focus")
        })
    }), e.call(o, a, this)
})
}(jQuery)