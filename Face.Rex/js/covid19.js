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
            return "function" !== n && !h.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
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
                        if (!1 === e.call(t[r], r, t[r])) break; return t
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
                if ((e ? e.ownerDocument || e : w) !== d && h(e), e = e || d, r = r || [], c = e.nodeType, "string" != typeof t || !t || 1 !== c && 9 !== c && 11 !== c) return r;
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
                        }
                    if (n.qsa && (!v || !v.test(t))) {
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
                    }
                return mt(h)
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
                                    }
                                c && (A = w)
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
                        }
                return this.pushStack(o.length > 1 ? h.unique(o) : o)
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
                        }
                    r = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : d.disable())
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
                        h.isArray(e) ? e = e.concat(h.map(e, h.camelCase)) : e in r ? e = [e] : e = (e = h.camelCase(e)) in r ? [e] : e.split(" "), i = e.length;
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
                        for (n = a.length; n--;) a[n] && (0 === (r = a[n].name).indexOf("data-") && q(o, r = h.camelCase(r.slice(5)), i[r]));
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
                        }
                return u < e.length && a.push({
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
                    if ("string" === (o = typeof n) && (i = Pt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(h.css(t, e)), o = "number"), null != n && n == n && ("number" !== o || h.cssNumber[u] || (n += "px"), c.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (s[e] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(t, n, r))))) try {
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
                    })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = h.css(t, "display"), "inline" === ("none" === l ? h._data(t, "olddisplay") || St(t.nodeName) : l) && "none" === h.css(t, "float") && (c.inlineBlockNeedsLayout && "inline" !== St(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.shrinkWrapBlocks() || f.always(function() {
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
                            }
                        return a
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
                        }
                return this
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
                        }
                return this
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
            var n, r;
            if (!e || "string" != typeof e) return null;
            try {
                t.DOMParser ? (r = new DOMParser, n = r.parseFromString(e, "text/xml")) : ((n = new ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(e))
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
                                }
                        if (s[0] in n) o = s[0];
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
                                    }
                            if (!0 !== a)
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
                            }
                        l && r(u, s, l, o.getAllResponseHeaders())
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
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery),
function(t) {
    "use strict";
    t.fn.emulateTransitionEnd = function(e) {
        var n = !1,
            r = this;
        t(this).one("bsTransitionEnd", function() {
            n = !0
        });
        return setTimeout(function() {
            n || t(r).trigger(t.support.transition.end)
        }, e), this
    }, t(function() {
        t.support.transition = function() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in e)
                if (void 0 !== t.style[n]) return {
                    end: e[n]
                };
            return !1
        }(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
function(t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        n = function(n) {
            t(n).on("click", e, this.close)
        };
    n.VERSION = "3.3.2", n.TRANSITION_DURATION = 150, n.prototype.close = function(e) {
        function r() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var i = t(this),
            o = i.attr("data-target");
        o || (o = (o = i.attr("href")) && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(o);
        e && e.preventDefault(), a.length || (a = i.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r())
    };
    var r = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.alert");
            i || r.data("bs.alert", i = new n(this)), "string" == typeof e && i[e].call(r)
        })
    }, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function() {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", e, n.prototype.close)
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.button"),
                o = "object" == typeof e && e;
            i || r.data("bs.button", i = new n(this, o)), "toggle" == e ? i.toggle() : e && i.setState(e)
        })
    }
    var n = function(e, r) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, r), this.isLoading = !1
    };
    n.VERSION = "3.3.2", n.DEFAULTS = {
        loadingText: "loading..."
    }, n.prototype.setState = function(e) {
        var n = "disabled",
            r = this.$element,
            i = r.is("input") ? "val" : "html",
            o = r.data();
        e += "Text", null == o.resetText && r.data("resetText", r[i]()), setTimeout(t.proxy(function() {
            r[i](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, r.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, r.removeClass(n).removeAttr(n))
        }, this), 0)
    }, n.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var r = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function() {
        return t.fn.button = r, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var r = t(n.target);
        r.hasClass("btn") || (r = r.closest(".btn")), e.call(r, "toggle"), n.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.carousel"),
                o = t.extend({}, n.DEFAULTS, r.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : o.slide;
            i || r.data("bs.carousel", i = new n(this, o)), "number" == typeof e ? i.to(e) : a ? i[a]() : o.interval && i.pause().cycle()
        })
    }
    var n = function(e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.2", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function(t, e) {
        var n = this.getItemIndex(e);
        if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
        var r = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(r)
    }, n.prototype.to = function(t) {
        var e = this,
            n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, n.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, n.prototype.slide = function(e, r) {
        var i = this.$element.find(".item.active"),
            o = r || this.getItemForDirection(e, i),
            a = this.interval,
            u = "next" == e ? "left" : "right",
            s = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var l = o[0],
            c = t.Event("slide.bs.carousel", {
                relatedTarget: l,
                direction: u
            });
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var f = t(this.$indicators.children()[this.getItemIndex(o)]);
                f && f.addClass("active")
            }
            var h = t.Event("slid.bs.carousel", {
                relatedTarget: l,
                direction: u
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, i.addClass(u), o.addClass(u), i.one("bsTransitionEnd", function() {
                o.removeClass([e, u].join(" ")).addClass("active"), i.removeClass(["active", u].join(" ")), s.sliding = !1, setTimeout(function() {
                    s.$element.trigger(h)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (i.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(h)), a && this.cycle(), this
        }
    };
    var r = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = r, this
    };
    var i = function(n) {
        var r, i = t(this),
            o = t(i.attr("data-target") || (r = i.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({}, o.data(), i.data()),
                u = i.attr("data-slide-to");
            u && (a.interval = !1), e.call(o, a), u && o.data("bs.carousel").to(u), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", i).on("click.bs.carousel.data-api", "[data-slide-to]", i), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        var n, r = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(r)
    }

    function n(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("bs.collapse"),
                o = t.extend({}, r.DEFAULTS, n.data(), "object" == typeof e && e);
            !i && o.toggle && "show" == e && (o.toggle = !1), i || n.data("bs.collapse", i = new r(this, o)), "string" == typeof e && i[e]()
        })
    }
    var r = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, r.DEFAULTS, n), this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    r.VERSION = "3.3.2", r.TRANSITION_DURATION = 350, r.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, r.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, r.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, i = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(i && i.length && (e = i.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    i && i.length && (n.call(i, "hide"), e || i.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var u = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return u.call(this);
                    var s = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(u, this)).emulateTransitionEnd(r.TRANSITION_DURATION)[a](this.$element[0][s])
                }
            }
        }
    }, r.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(r.TRANSITION_DURATION) : i.call(this)
            }
        }
    }, r.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, r.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(n, r) {
            var i = t(r);
            this.addAriaAndCollapsedClass(e(i), i)
        }, this)).end()
    }, r.prototype.addAriaAndCollapsedClass = function(t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var i = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = r, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = i, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(r) {
        var i = t(this);
        i.attr("data-target") || r.preventDefault();
        var o = e(i),
            a = o.data("bs.collapse") ? "toggle" : t.extend({}, i.data(), {
                trigger: this
            });
        n.call(o, a)
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        e && 3 === e.which || (t(r).remove(), t(i).each(function() {
            var r = t(this),
                i = n(r),
                o = {
                    relatedTarget: this
                };
            i.hasClass("open") && (i.trigger(e = t.Event("hide.bs.dropdown", o)), e.isDefaultPrevented() || (r.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }

    function n(e) {
        var n = e.attr("data-target");
        n || (n = (n = e.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = n && t(n);
        return r && r.length ? r : e.parent()
    }
    var r = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        o = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    o.VERSION = "3.3.2", o.prototype.toggle = function(r) {
        var i = t(this);
        if (!i.is(".disabled, :disabled")) {
            var o = n(i),
                a = o.hasClass("open");
            if (e(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var u = {
                    relatedTarget: this
                };
                if (o.trigger(r = t.Event("show.bs.dropdown", u)), r.isDefaultPrevented()) return;
                i.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", u)
            }
            return !1
        }
    }, o.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var r = t(this);
            if (e.preventDefault(), e.stopPropagation(), !r.is(".disabled, :disabled")) {
                var o = n(r),
                    a = o.hasClass("open");
                if (!a && 27 != e.which || a && 27 == e.which) return 27 == e.which && o.find(i).trigger("focus"), r.trigger("click");
                var u = " li:not(.divider):visible a",
                    s = o.find('[role="menu"]' + u + ', [role="listbox"]' + u);
                if (s.length) {
                    var l = s.index(e.target);
                    38 == e.which && l > 0 && l--, 40 == e.which && l < s.length - 1 && l++, ~l || (l = 0), s.eq(l).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = function(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.dropdown");
            r || n.data("bs.dropdown", r = new o(this)), "string" == typeof e && r[e].call(n)
        })
    }, t.fn.dropdown.Constructor = o, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, o.prototype.toggle).on("keydown.bs.dropdown.data-api", i, o.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', o.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', o.prototype.keydown)
}(jQuery),
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
}(jQuery),
function(t) {
    "use strict";
    var e = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    e.VERSION = "3.3.2", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, e.prototype.init = function(e, n, r) {
        this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(r), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var i = this.options.trigger.split(" "), o = i.length; o--;) {
            var a = i[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var u = "hover" == a ? "mouseenter" : "focusin",
                    s = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(u + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.getOptions = function(e) {
        return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function() {
        var e = {},
            n = this.getDefaults();
        return this._options && t.each(this._options, function(t, r) {
            n[t] != r && (e[t] = r)
        }), e
    }, e.prototype.enter = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n && n.$tip && n.$tip.is(":visible") ? void(n.hoverState = "in") : (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, e.prototype.leave = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, e.prototype.show = function() {
        var n = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(n);
            var r = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (n.isDefaultPrevented() || !r) return;
            var i = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var u = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                s = /\s?auto?\s?/i,
                l = s.test(u);
            l && (u = u.replace(s, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(u).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var c = this.getPosition(),
                f = o[0].offsetWidth,
                h = o[0].offsetHeight;
            if (l) {
                var d = u,
                    p = this.options.container ? t(this.options.container) : this.$element.parent(),
                    g = this.getPosition(p);
                u = "bottom" == u && c.bottom + h > g.bottom ? "top" : "top" == u && c.top - h < g.top ? "bottom" : "right" == u && c.right + f > g.width ? "left" : "left" == u && c.left - f < g.left ? "right" : u, o.removeClass(d).addClass(u)
            }
            var v = this.getCalculatedOffset(u, c, f, h);
            this.applyPlacement(v, u);
            var y = function() {
                var t = i.hoverState;
                i.$element.trigger("shown.bs." + i.type), i.hoverState = null, "out" == t && i.leave(i)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", y).emulateTransitionEnd(e.TRANSITION_DURATION) : y()
        }
    }, e.prototype.applyPlacement = function(e, n) {
        var r = this.tip(),
            i = r[0].offsetWidth,
            o = r[0].offsetHeight,
            a = parseInt(r.css("margin-top"), 10),
            u = parseInt(r.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(u) && (u = 0), e.top = e.top + a, e.left = e.left + u, t.offset.setOffset(r[0], t.extend({
            using: function(t) {
                r.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), r.addClass("in");
        var s = r[0].offsetWidth,
            l = r[0].offsetHeight;
        "top" == n && l != o && (e.top = e.top + o - l);
        var c = this.getViewportAdjustedDelta(n, e, s, l);
        c.left ? e.left += c.left : e.top += c.top;
        var f = /top|bottom/.test(n),
            h = f ? 2 * c.left - i + s : 2 * c.top - o + l,
            d = f ? "offsetWidth" : "offsetHeight";
        r.offset(e), this.replaceArrow(h, r[0][d], f)
    }, e.prototype.replaceArrow = function(t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function(n) {
        function r() {
            "in" != i.hoverState && o.detach(), i.$element.removeAttr("aria-describedby").trigger("hidden.bs." + i.type), n && n()
        }
        var i = this,
            o = this.tip(),
            a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", r).emulateTransitionEnd(e.TRANSITION_DURATION) : r(), this.hoverState = null, this)
    }, e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function() {
        return this.getTitle()
    }, e.prototype.getPosition = function(e) {
        var n = (e = e || this.$element)[0],
            r = "BODY" == n.tagName,
            i = n.getBoundingClientRect();
        null == i.width && (i = t.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var o = r ? {
                top: 0,
                left: 0
            } : e.offset(),
            a = {
                scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            u = r ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, i, a, u, o)
    }, e.prototype.getCalculatedOffset = function(t, e, n, r) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - r,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - r / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - r / 2,
            left: e.left + e.width
        }
    }, e.prototype.getViewportAdjustedDelta = function(t, e, n, r) {
        var i = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return i;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var u = e.top - o - a.scroll,
                s = e.top + o - a.scroll + r;
            u < a.top ? i.top = a.top - u : s > a.top + a.height && (i.top = a.top + a.height - s)
        } else {
            var l = e.left - o,
                c = e.left + o + n;
            l < a.left ? i.left = a.left - l : c > a.width && (i.left = a.left + a.width - c)
        }
        return i
    }, e.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, e.prototype.getUID = function(t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, e.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.enable = function() {
        this.enabled = !0
    }, e.prototype.disable = function() {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function(e) {
        var n = this;
        e && ((n = t(e.currentTarget).data("bs." + this.type)) || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, e.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = function(n) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.tooltip"),
                o = "object" == typeof n && n;
            (i || "destroy" != n) && (i || r.data("bs.tooltip", i = new e(this, o)), "string" == typeof n && i[n]())
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n, this
    }
}(jQuery),
function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.3.2", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, e.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var n = t.fn.popover;
    t.fn.popover = function(n) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.popover"),
                o = "object" == typeof n && n;
            (i || "destroy" != n) && (i || r.data("bs.popover", i = new e(this, o)), "string" == typeof n && i[n]())
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(jQuery),
function(t) {
    "use strict";

    function e(n, r) {
        var i = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(t(n).is("body") ? window : n), this.options = t.extend({}, e.DEFAULTS, r), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", i), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.scrollspy"),
                o = "object" == typeof n && n;
            i || r.data("bs.scrollspy", i = new e(this, o)), "string" == typeof n && i[n]()
        })
    }
    e.VERSION = "3.3.2", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = "offset",
            n = 0;
        t.isWindow(this.$scrollElement[0]) || (e = "position", n = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var r = this;
        this.$body.find(this.selector).map(function() {
            var r = t(this),
                i = r.data("target") || r.attr("href"),
                o = /^#./.test(i) && t(i);
            return o && o.length && o.is(":visible") && [
                [o[e]().top + n, i]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            r.offsets.push(this[0]), r.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.getScrollHeight(),
            r = this.options.offset + n - this.$scrollElement.height(),
            i = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= r) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < i[0]) return this.activeTarget = null, this.clear();
        for (t = i.length; t--;) a != o[t] && e >= i[t] && (!i[t + 1] || e <= i[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            r = t(n).parents("li").addClass("active");
        r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")), r.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = r, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.tab");
            i || r.data("bs.tab", i = new n(this)), "string" == typeof e && i[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.2", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
        var e = this.element,
            n = e.closest("ul:not(.dropdown-menu)"),
            r = e.data("target");
        if (r || (r = (r = e.attr("href")) && r.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var i = n.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: i[0]
                });
            if (i.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var u = t(r);
                this.activate(e.closest("li"), n), this.activate(u, u.parent(), function() {
                    i.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function(e, r, i) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), u ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), i && i()
        }
        var a = r.find("> .active"),
            u = i && t.support.transition && (a.length && a.hasClass("fade") || !!r.find("> .fade").length);
        a.length && u ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var r = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
        return t.fn.tab = r, this
    };
    var i = function(n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var r = t(this),
                i = r.data("bs.affix"),
                o = "object" == typeof e && e;
            i || r.data("bs.affix", i = new n(this, o)), "string" == typeof e && i[e]()
        })
    }
    var n = function(e, r) {
        this.options = t.extend({}, n.DEFAULTS, r), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.2", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function(t, e, n, r) {
        var i = this.$target.scrollTop(),
            o = this.$element.offset(),
            a = this.$target.height();
        if (null != n && "top" == this.affixed) return n > i && "top";
        if ("bottom" == this.affixed) return null != n ? !(i + this.unpin <= o.top) && "bottom" : !(t - r >= i + a) && "bottom";
        var u = null == this.affixed,
            s = u ? i : o.top;
        return null != n && n >= i ? "top" : null != r && s + (u ? a : e) >= t - r && "bottom"
    }, n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                r = this.options.offset,
                i = r.top,
                o = r.bottom,
                a = t("body").height();
            "object" != typeof r && (o = i = r), "function" == typeof i && (i = r.top(this.$element)), "function" == typeof o && (o = r.bottom(this.$element));
            var u = this.getState(a, e, i, o);
            if (this.affixed != u) {
                null != this.unpin && this.$element.css("top", "");
                var s = "affix" + (u ? "-" + u : ""),
                    l = t.Event(s + ".bs.affix");
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                this.affixed = u, this.unpin = "bottom" == u ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(s).trigger(s.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == u && this.$element.offset({
                top: a - e - o
            })
        }
    };
    var r = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function() {
        return t.fn.affix = r, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var n = t(this),
                r = n.data();
            r.offset = r.offset || {}, null != r.offsetBottom && (r.offset.bottom = r.offsetBottom), null != r.offsetTop && (r.offset.top = r.offsetTop), e.call(n, r)
        })
    })
}(jQuery),
function() {
    function t(t) {
        return t && (t.ownerDocument || t.document || t).documentElement
    }

    function e(t) {
        return t && (t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView)
    }

    function n(t, e) {
        return e > t ? -1 : t > e ? 1 : t >= e ? 0 : NaN
    }

    function r(t) {
        return null === t ? NaN : +t
    }

    function i(t) {
        return !isNaN(t)
    }

    function o(t) {
        return {
            left: function(e, n, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = e.length); i > r;) {
                    var o = r + i >>> 1;
                    t(e[o], n) < 0 ? r = o + 1 : i = o
                }
                return r
            },
            right: function(e, n, r, i) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = e.length); i > r;) {
                    var o = r + i >>> 1;
                    t(e[o], n) > 0 ? i = o : r = o + 1
                }
                return r
            }
        }
    }

    function a(t) {
        return t.length
    }

    function u(t, e) {
        for (var n in e) Object.defineProperty(t.prototype, n, {
            value: e[n],
            enumerable: !1
        })
    }

    function s() {
        this._ = Object.create(null)
    }

    function l(t) {
        return (t += "") === Zi || t[0] === Qi ? Qi + t : t
    }

    function c(t) {
        return (t += "")[0] === Qi ? t.slice(1) : t
    }

    function f(t) {
        return l(t) in this._
    }

    function h(t) {
        return (t = l(t)) in this._ && delete this._[t]
    }

    function d() {
        var t = [];
        for (var e in this._) t.push(c(e));
        return t
    }

    function p() {
        var t = 0;
        for (var e in this._) ++t;
        return t
    }

    function g() {
        for (var t in this._) return !1;
        return !0
    }

    function v() {
        this._ = Object.create(null)
    }

    function y(t) {
        return t
    }

    function m(t, e, n) {
        return function() {
            var r = n.apply(e, arguments);
            return r === e ? t : r
        }
    }

    function x(t, e) {
        if (e in t) return e;
        e = e.charAt(0).toUpperCase() + e.slice(1);
        for (var n = 0, r = Ki.length; r > n; ++n) {
            var i = Ki[n] + e;
            if (i in t) return i
        }
    }

    function b() {}

    function w() {}

    function A(t) {
        function e() {
            for (var e, r = n, i = -1, o = r.length; ++i < o;)(e = r[i].on) && e.apply(this, arguments);
            return t
        }
        var n = [],
            r = new s;
        return e.on = function(e, i) {
            var o, a = r.get(e);
            return arguments.length < 2 ? a && a.on : (a && (a.on = null, n = n.slice(0, o = n.indexOf(a)).concat(n.slice(o + 1)), r.remove(e)), i && n.push(r.set(e, {
                on: i
            })), t)
        }, e
    }

    function M() {
        Fi.event.preventDefault()
    }

    function k() {
        for (var t, e = Fi.event; t = e.sourceEvent;) e = t;
        return e
    }

    function _(t) {
        for (var e = new w, n = 0, r = arguments.length; ++n < r;) e[arguments[n]] = A(e);
        return e.of = function(n, r) {
            return function(i) {
                try {
                    var o = i.sourceEvent = Fi.event;
                    i.target = t, Fi.event = i, e[i.type].apply(n, r)
                } finally {
                    Fi.event = o
                }
            }
        }, e
    }

    function C(t) {
        return to(t, io), t
    }

    function T(t) {
        return "function" == typeof t ? t : function() {
            return eo(t, this)
        }
    }

    function E(t) {
        return "function" == typeof t ? t : function() {
            return no(t, this)
        }
    }

    function S(t, e) {
        return t = Fi.ns.qualify(t), null == e ? t.local ? function() {
            this.removeAttributeNS(t.space, t.local)
        } : function() {
            this.removeAttribute(t)
        } : "function" == typeof e ? t.local ? function() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
        } : function() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
        } : t.local ? function() {
            this.setAttributeNS(t.space, t.local, e)
        } : function() {
            this.setAttribute(t, e)
        }
    }

    function N(t) {
        return t.trim().replace(/\s+/g, " ")
    }

    function D(t) {
        return new RegExp("(?:^|\\s+)" + Fi.requote(t) + "(?:\\s+|$)", "g")
    }

    function L(t) {
        return (t + "").trim().split(/^|\s+/)
    }

    function R(t, e) {
        var n = (t = L(t).map(O)).length;
        return "function" == typeof e ? function() {
            for (var r = -1, i = e.apply(this, arguments); ++r < n;) t[r](this, i)
        } : function() {
            for (var r = -1; ++r < n;) t[r](this, e)
        }
    }

    function O(t) {
        var e = D(t);
        return function(n, r) {
            if (i = n.classList) return r ? i.add(t) : i.remove(t);
            var i = n.getAttribute("class") || "";
            r ? (e.lastIndex = 0, e.test(i) || n.setAttribute("class", N(i + " " + t))) : n.setAttribute("class", N(i.replace(e, " ")))
        }
    }

    function $(t, e, n) {
        return null == e ? function() {
            this.style.removeProperty(t)
        } : "function" == typeof e ? function() {
            var r = e.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, n)
        } : function() {
            this.style.setProperty(t, e, n)
        }
    }

    function j(t, e) {
        return null == e ? function() {
            delete this[t]
        } : "function" == typeof e ? function() {
            var n = e.apply(this, arguments);
            null == n ? delete this[t] : this[t] = n
        } : function() {
            this[t] = e
        }
    }

    function H(t) {
        return "function" == typeof t ? t : (t = Fi.ns.qualify(t)).local ? function() {
            return this.ownerDocument.createElementNS(t.space, t.local)
        } : function() {
            var e = this.ownerDocument,
                n = this.namespaceURI;
            return n ? e.createElementNS(n, t) : e.createElement(t)
        }
    }

    function q() {
        var t = this.parentNode;
        t && t.removeChild(this)
    }

    function F(t) {
        return {
            __data__: t
        }
    }

    function P(t) {
        return function() {
            return ro(this, t)
        }
    }

    function I(t, e) {
        for (var n = 0, r = t.length; r > n; n++)
            for (var i, o = t[n], a = 0, u = o.length; u > a; a++)(i = o[a]) && e(i, a, n);
        return t
    }

    function z(t) {
        return to(t, ao), t
    }

    function B(t, e, n) {
        function r() {
            var e = this[i];
            e && (this.removeEventListener(t, e, e.$), delete this[i])
        }
        var i = "__on" + t,
            o = t.indexOf("."),
            a = U;
        o > 0 && (t = t.slice(0, o));
        var u = uo.get(t);
        return u && (t = u, a = W), o ? e ? function() {
            var o = a(e, Ii(arguments));
            r.call(this), this.addEventListener(t, this[i] = o, o.$ = n), o._ = e
        } : r : e ? b : function() {
            var e, n = new RegExp("^__on([^.]+)" + Fi.requote(t) + "$");
            for (var r in this)
                if (e = r.match(n)) {
                    var i = this[r];
                    this.removeEventListener(e[1], i, i.$), delete this[r]
                }
        }
    }

    function U(t, e) {
        return function(n) {
            var r = Fi.event;
            Fi.event = n, e[0] = this.__data__;
            try {
                t.apply(this, e)
            } finally {
                Fi.event = r
            }
        }
    }

    function W(t, e) {
        var n = U(t, e);
        return function(t) {
            var e = t.relatedTarget;
            e && (e === this || 8 & e.compareDocumentPosition(this)) || n.call(this, t)
        }
    }

    function Y(n) {
        var r = ".dragsuppress-" + ++lo,
            i = "click" + r,
            o = Fi.select(e(n)).on("touchmove" + r, M).on("dragstart" + r, M).on("selectstart" + r, M);
        if (null == so && (so = !("onselectstart" in n) && x(n.style, "userSelect")), so) {
            var a = t(n).style,
                u = a[so];
            a[so] = "none"
        }
        return function(t) {
            if (o.on(r, null), so && (a[so] = u), t) {
                var e = function() {
                    o.on(i, null)
                };
                o.on(i, function() {
                    M(), e()
                }, !0), setTimeout(e, 0)
            }
        }
    }

    function V(t, n) {
        n.changedTouches && (n = n.changedTouches[0]);
        var r = t.ownerSVGElement || t;
        if (r.createSVGPoint) {
            var i = r.createSVGPoint();
            if (0 > co) {
                var o = e(t);
                if (o.scrollX || o.scrollY) {
                    var a = (r = Fi.select("body").append("svg").style({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                        border: "none"
                    }, "important"))[0][0].getScreenCTM();
                    co = !(a.f || a.e), r.remove()
                }
            }
            return co ? (i.x = n.pageX, i.y = n.pageY) : (i.x = n.clientX, i.y = n.clientY), [(i = i.matrixTransform(t.getScreenCTM().inverse())).x, i.y]
        }
        var u = t.getBoundingClientRect();
        return [n.clientX - u.left - t.clientLeft, n.clientY - u.top - t.clientTop]
    }

    function G() {
        return Fi.event.changedTouches[0].identifier
    }

    function X(t) {
        return t > 0 ? 1 : 0 > t ? -1 : 0
    }

    function Z(t, e, n) {
        return (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0])
    }

    function Q(t) {
        return t > 1 ? 0 : -1 > t ? po : Math.acos(t)
    }

    function K(t) {
        return t > 1 ? yo : -1 > t ? -yo : Math.asin(t)
    }

    function J(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }

    function tt(t) {
        return (t = Math.sin(t / 2)) * t
    }

    function et() {}

    function nt(t, e, n) {
        return this instanceof nt ? (this.h = +t, this.s = +e, void(this.l = +n)) : arguments.length < 2 ? t instanceof nt ? new nt(t.h, t.s, t.l) : vt("" + t, yt, nt) : new nt(t, e, n)
    }

    function rt(t, e, n) {
        function r(t) {
            return Math.round(255 * ((e = t) > 360 ? e -= 360 : 0 > e && (e += 360), 60 > e ? i + (o - i) * e / 60 : 180 > e ? o : 240 > e ? i + (o - i) * (240 - e) / 60 : i));
            var e
        }
        var i, o;
        return t = isNaN(t) ? 0 : (t %= 360) < 0 ? t + 360 : t, e = isNaN(e) ? 0 : 0 > e ? 0 : e > 1 ? 1 : e, i = 2 * (n = 0 > n ? 0 : n > 1 ? 1 : n) - (o = .5 >= n ? n * (1 + e) : n + e - n * e), new ht(r(t + 120), r(t), r(t - 120))
    }

    function it(t, e, n) {
        return this instanceof it ? (this.h = +t, this.c = +e, void(this.l = +n)) : arguments.length < 2 ? t instanceof it ? new it(t.h, t.c, t.l) : st(t instanceof at ? t.l : (t = mt((t = Fi.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : new it(t, e, n)
    }

    function ot(t, e, n) {
        return isNaN(t) && (t = 0), isNaN(e) && (e = 0), new at(n, Math.cos(t *= mo) * e, Math.sin(t) * e)
    }

    function at(t, e, n) {
        return this instanceof at ? (this.l = +t, this.a = +e, void(this.b = +n)) : arguments.length < 2 ? t instanceof at ? new at(t.l, t.a, t.b) : t instanceof it ? ot(t.h, t.c, t.l) : mt((t = ht(t)).r, t.g, t.b) : new at(t, e, n)
    }

    function ut(t, e, n) {
        var r = (t + 16) / 116,
            i = r + e / 500,
            o = r - n / 200;
        return new ht(ft(3.2404542 * (i = lt(i) * Eo) - 1.5371385 * (r = lt(r) * So) - .4985314 * (o = lt(o) * No)), ft(-.969266 * i + 1.8760108 * r + .041556 * o), ft(.0556434 * i - .2040259 * r + 1.0572252 * o))
    }

    function st(t, e, n) {
        return t > 0 ? new it(Math.atan2(n, e) * xo, Math.sqrt(e * e + n * n), t) : new it(NaN, NaN, t)
    }

    function lt(t) {
        return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
    }

    function ct(t) {
        return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
    }

    function ft(t) {
        return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
    }

    function ht(t, e, n) {
        return this instanceof ht ? (this.r = ~~t, this.g = ~~e, void(this.b = ~~n)) : arguments.length < 2 ? t instanceof ht ? new ht(t.r, t.g, t.b) : vt("" + t, ht, rt) : new ht(t, e, n)
    }

    function dt(t) {
        return new ht(t >> 16, t >> 8 & 255, 255 & t)
    }

    function pt(t) {
        return dt(t) + ""
    }

    function gt(t) {
        return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
    }

    function vt(t, e, n) {
        var r, i, o, a = 0,
            u = 0,
            s = 0;
        if (r = /([a-z]+)\((.*)\)/i.exec(t)) switch (i = r[2].split(","), r[1]) {
            case "hsl":
                return n(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
            case "rgb":
                return e(bt(i[0]), bt(i[1]), bt(i[2]))
        }
        return (o = Ro.get(t.toLowerCase())) ? e(o.r, o.g, o.b) : (null == t || "#" !== t.charAt(0) || isNaN(o = parseInt(t.slice(1), 16)) || (4 === t.length ? (a = (3840 & o) >> 4, a |= a >> 4, u = 240 & o, u |= u >> 4, s = 15 & o, s |= s << 4) : 7 === t.length && (a = (16711680 & o) >> 16, u = (65280 & o) >> 8, s = 255 & o)), e(a, u, s))
    }

    function yt(t, e, n) {
        var r, i, o = Math.min(t /= 255, e /= 255, n /= 255),
            a = Math.max(t, e, n),
            u = a - o,
            s = (a + o) / 2;
        return u ? (i = .5 > s ? u / (a + o) : u / (2 - a - o), r = t == a ? (e - n) / u + (n > e ? 6 : 0) : e == a ? (n - t) / u + 2 : (t - e) / u + 4, r *= 60) : (r = NaN, i = s > 0 && 1 > s ? 0 : r), new nt(r, i, s)
    }

    function mt(t, e, n) {
        var r = ct((.4124564 * (t = xt(t)) + .3575761 * (e = xt(e)) + .1804375 * (n = xt(n))) / Eo),
            i = ct((.2126729 * t + .7151522 * e + .072175 * n) / So);
        return at(116 * i - 16, 500 * (r - i), 200 * (i - ct((.0193339 * t + .119192 * e + .9503041 * n) / No)))
    }

    function xt(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function bt(t) {
        var e = parseFloat(t);
        return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * e) : e
    }

    function wt(t) {
        return "function" == typeof t ? t : function() {
            return t
        }
    }

    function At(t) {
        return function(e, n, r) {
            return 2 === arguments.length && "function" == typeof n && (r = n, n = null), Mt(e, n, t, r)
        }
    }

    function Mt(t, e, n, r) {
        function i() {
            var t, e, r, i = l.status;
            if (!i && ((r = (e = l).responseType) && "text" !== r ? e.response : e.responseText) || i >= 200 && 300 > i || 304 === i) {
                try {
                    t = n.call(a, l)
                } catch (t) {
                    return void u.error.call(a, t)
                }
                u.load.call(a, t)
            } else u.error.call(a, l)
        }
        var o, a = {},
            u = Fi.dispatch("beforesend", "progress", "load", "error"),
            s = {},
            l = new XMLHttpRequest,
            c = null;
        return !this.XDomainRequest || "withCredentials" in l || !/^(http(s)?:)?\/\//.test(t) || (l = new XDomainRequest), "onload" in l ? l.onload = l.onerror = i : l.onreadystatechange = function() {
            l.readyState > 3 && i()
        }, l.onprogress = function(t) {
            var e = Fi.event;
            Fi.event = t;
            try {
                u.progress.call(a, l)
            } finally {
                Fi.event = e
            }
        }, a.header = function(t, e) {
            return t = (t + "").toLowerCase(), arguments.length < 2 ? s[t] : (null == e ? delete s[t] : s[t] = e + "", a)
        }, a.mimeType = function(t) {
            return arguments.length ? (e = null == t ? null : t + "", a) : e
        }, a.responseType = function(t) {
            return arguments.length ? (c = t, a) : c
        }, a.response = function(t) {
            return n = t, a
        }, ["get", "post"].forEach(function(t) {
            a[t] = function() {
                return a.send.apply(a, [t].concat(Ii(arguments)))
            }
        }), a.send = function(n, r, i) {
            if (2 === arguments.length && "function" == typeof r && (i = r, r = null), l.open(n, t, !0), null == e || "accept" in s || (s.accept = e + ",*/*"), l.setRequestHeader)
                for (var o in s) l.setRequestHeader(o, s[o]);
            return null != e && l.overrideMimeType && l.overrideMimeType(e), null != c && (l.responseType = c), null != i && a.on("error", i).on("load", function(t) {
                i(null, t)
            }), u.beforesend.call(a, l), l.send(null == r ? null : r), a
        }, a.abort = function() {
            return l.abort(), a
        }, Fi.rebind(a, u, "on"), null == r ? a : a.get(1 === (o = r).length ? function(t, e) {
            o(null == t ? e : null)
        } : o)
    }

    function kt() {
        var t = _t(),
            e = Ct() - t;
        e > 24 ? (isFinite(e) && (clearTimeout(Ho), Ho = setTimeout(kt, e)), jo = 0) : (jo = 1, Fo(kt))
    }

    function _t() {
        var t = Date.now();
        for (qo = Oo; qo;) t >= qo.t && (qo.f = qo.c(t - qo.t)), qo = qo.n;
        return t
    }

    function Ct() {
        for (var t, e = Oo, n = 1 / 0; e;) e.f ? e = t ? t.n = e.n : Oo = e.n : (e.t < n && (n = e.t), e = (t = e).n);
        return $o = t, n
    }

    function Tt(t, e) {
        return e - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1)
    }

    function Et(t) {
        return t + ""
    }

    function St() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Nt(t, e, n) {
        function r(e) {
            var n = t(e),
                r = o(n, 1);
            return r - e > e - n ? n : r
        }

        function i(n) {
            return e(n = t(new Uo(n - 1)), 1), n
        }

        function o(t, n) {
            return e(t = new Uo(+t), n), t
        }

        function a(t, r, o) {
            var a = i(t),
                u = [];
            if (o > 1)
                for (; r > a;) n(a) % o || u.push(new Date(+a)), e(a, 1);
            else
                for (; r > a;) u.push(new Date(+a)), e(a, 1);
            return u
        }
        t.floor = t, t.round = r, t.ceil = i, t.offset = o, t.range = a;
        var u = t.utc = Dt(t);
        return u.floor = u, u.round = Dt(r), u.ceil = Dt(i), u.offset = Dt(o), u.range = function(t, e, n) {
            try {
                Uo = St;
                var r = new St;
                return r._ = t, a(r, e, n)
            } finally {
                Uo = Date
            }
        }, t
    }

    function Dt(t) {
        return function(e, n) {
            try {
                Uo = St;
                var r = new St;
                return r._ = e, t(r, n)._
            } finally {
                Uo = Date
            }
        }
    }

    function Lt(t, e, n) {
        var r = 0 > t ? "-" : "",
            i = (r ? -t : t) + "",
            o = i.length;
        return r + (n > o ? new Array(n - o + 1).join(e) + i : i)
    }

    function Rt(t) {
        return new RegExp("^(?:" + t.map(Fi.requote).join("|") + ")", "i")
    }

    function Ot(t) {
        for (var e = new s, n = -1, r = t.length; ++n < r;) e.set(t[n].toLowerCase(), n);
        return e
    }

    function $t(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 1));
        return r ? (t.w = +r[0], n + r[0].length) : -1
    }

    function jt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n));
        return r ? (t.U = +r[0], n + r[0].length) : -1
    }

    function Ht(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n));
        return r ? (t.W = +r[0], n + r[0].length) : -1
    }

    function qt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 4));
        return r ? (t.y = +r[0], n + r[0].length) : -1
    }

    function Ft(t, e, n) {
        Vo.lastIndex = 0;
        var r, i = Vo.exec(e.slice(n, n + 2));
        return i ? (t.y = (r = +i[0]) + (r > 68 ? 1900 : 2e3), n + i[0].length) : -1
    }

    function Pt(t, e, n) {
        return /^[+-]\d{4}$/.test(e = e.slice(n, n + 5)) ? (t.Z = -e, n + 5) : -1
    }

    function It(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 2));
        return r ? (t.m = r[0] - 1, n + r[0].length) : -1
    }

    function zt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 2));
        return r ? (t.d = +r[0], n + r[0].length) : -1
    }

    function Bt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 3));
        return r ? (t.j = +r[0], n + r[0].length) : -1
    }

    function Ut(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 2));
        return r ? (t.H = +r[0], n + r[0].length) : -1
    }

    function Wt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 2));
        return r ? (t.M = +r[0], n + r[0].length) : -1
    }

    function Yt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 2));
        return r ? (t.S = +r[0], n + r[0].length) : -1
    }

    function Vt(t, e, n) {
        Vo.lastIndex = 0;
        var r = Vo.exec(e.slice(n, n + 3));
        return r ? (t.L = +r[0], n + r[0].length) : -1
    }

    function Gt(t) {
        var e = t.getTimezoneOffset(),
            n = e > 0 ? "-" : "+",
            r = Xi(e) / 60 | 0,
            i = Xi(e) % 60;
        return n + Lt(r, "0", 2) + Lt(i, "0", 2)
    }

    function Xt(t, e, n) {
        Go.lastIndex = 0;
        var r = Go.exec(e.slice(n, n + 1));
        return r ? n + r[0].length : -1
    }

    function Zt(t) {
        for (var e = t.length, n = -1; ++n < e;) t[n][0] = this(t[n][0]);
        return function(e) {
            for (var n = 0, r = t[n]; !r[1](e);) r = t[++n];
            return r[0](e)
        }
    }

    function Qt() {}

    function Kt(t, e, n) {
        var r = n.s = t + e,
            i = r - t,
            o = r - i;
        n.t = t - o + (e - i)
    }

    function Jt(t, e) {
        t && Ko.hasOwnProperty(t.type) && Ko[t.type](t, e)
    }

    function te(t, e, n) {
        var r, i = -1,
            o = t.length - n;
        for (e.lineStart(); ++i < o;) r = t[i], e.point(r[0], r[1], r[2]);
        e.lineEnd()
    }

    function ee(t, e) {
        var n = -1,
            r = t.length;
        for (e.polygonStart(); ++n < r;) te(t[n], e, 1);
        e.polygonEnd()
    }

    function ne() {
        function t(t, e) {
            e = e * mo / 2 + po / 4;
            var n = (t *= mo) - r,
                a = n >= 0 ? 1 : -1,
                u = a * n,
                s = Math.cos(e),
                l = Math.sin(e),
                c = o * l,
                f = i * s + c * Math.cos(u),
                h = c * a * Math.sin(u);
            ta.add(Math.atan2(h, f)), r = t, i = s, o = l
        }
        var e, n, r, i, o;
        ea.point = function(a, u) {
            ea.point = t, r = (e = a) * mo, i = Math.cos(u = (n = u) * mo / 2 + po / 4), o = Math.sin(u)
        }, ea.lineEnd = function() {
            t(e, n)
        }
    }

    function re(t) {
        var e = t[0],
            n = t[1],
            r = Math.cos(n);
        return [r * Math.cos(e), r * Math.sin(e), Math.sin(n)]
    }

    function ie(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }

    function oe(t, e) {
        return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
    }

    function ae(t, e) {
        t[0] += e[0], t[1] += e[1], t[2] += e[2]
    }

    function ue(t, e) {
        return [t[0] * e, t[1] * e, t[2] * e]
    }

    function se(t) {
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= e, t[1] /= e, t[2] /= e
    }

    function le(t) {
        return [Math.atan2(t[1], t[0]), K(t[2])]
    }

    function ce(t, e) {
        return Xi(t[0] - e[0]) < fo && Xi(t[1] - e[1]) < fo
    }

    function fe(t, e) {
        t *= mo;
        var n = Math.cos(e *= mo);
        he(n * Math.cos(t), n * Math.sin(t), Math.sin(e))
    }

    function he(t, e, n) {
        ia += (t - ia) / ++na, oa += (e - oa) / na, aa += (n - aa) / na
    }

    function de() {
        function t(t, i) {
            t *= mo;
            var o = Math.cos(i *= mo),
                a = o * Math.cos(t),
                u = o * Math.sin(t),
                s = Math.sin(i),
                l = Math.atan2(Math.sqrt((l = n * s - r * u) * l + (l = r * a - e * s) * l + (l = e * u - n * a) * l), e * a + n * u + r * s);
            ra += l, ua += l * (e + (e = a)), sa += l * (n + (n = u)), la += l * (r + (r = s)), he(e, n, r)
        }
        var e, n, r;
        da.point = function(i, o) {
            i *= mo;
            var a = Math.cos(o *= mo);
            e = a * Math.cos(i), n = a * Math.sin(i), r = Math.sin(o), da.point = t, he(e, n, r)
        }
    }

    function pe() {
        da.point = fe
    }

    function ge() {
        function t(t, e) {
            t *= mo;
            var n = Math.cos(e *= mo),
                a = n * Math.cos(t),
                u = n * Math.sin(t),
                s = Math.sin(e),
                l = i * s - o * u,
                c = o * a - r * s,
                f = r * u - i * a,
                h = Math.sqrt(l * l + c * c + f * f),
                d = r * a + i * u + o * s,
                p = h && -Q(d) / h,
                g = Math.atan2(h, d);
            ca += p * l, fa += p * c, ha += p * f, ra += g, ua += g * (r + (r = a)), sa += g * (i + (i = u)), la += g * (o + (o = s)), he(r, i, o)
        }
        var e, n, r, i, o;
        da.point = function(a, u) {
            e = a, n = u, da.point = t, a *= mo;
            var s = Math.cos(u *= mo);
            r = s * Math.cos(a), i = s * Math.sin(a), o = Math.sin(u), he(r, i, o)
        }, da.lineEnd = function() {
            t(e, n), da.lineEnd = pe, da.point = fe
        }
    }

    function ve(t, e) {
        function n(n, r) {
            return n = t(n, r), e(n[0], n[1])
        }
        return t.invert && e.invert && (n.invert = function(n, r) {
            return (n = e.invert(n, r)) && t.invert(n[0], n[1])
        }), n
    }

    function ye() {
        return !0
    }

    function me(t, e, n, r, i) {
        var o = [],
            a = [];
        if (t.forEach(function(t) {
                if (!((e = t.length - 1) <= 0)) {
                    var e, n = t[0],
                        r = t[e];
                    if (ce(n, r)) {
                        i.lineStart();
                        for (var u = 0; e > u; ++u) i.point((n = t[u])[0], n[1]);
                        return void i.lineEnd()
                    }
                    var s = new be(n, t, null, !0),
                        l = new be(n, null, s, !1);
                    s.o = l, o.push(s), a.push(l), l = new be(r, null, s = new be(r, t, null, !1), !0), s.o = l, o.push(s), a.push(l)
                }
            }), a.sort(e), xe(o), xe(a), o.length) {
            for (var u = 0, s = n, l = a.length; l > u; ++u) a[u].e = s = !s;
            for (var c, f, h = o[0];;) {
                for (var d = h, p = !0; d.v;)
                    if ((d = d.n) === h) return;
                c = d.z, i.lineStart();
                do {
                    if (d.v = d.o.v = !0, d.e) {
                        if (p)
                            for (u = 0, l = c.length; l > u; ++u) i.point((f = c[u])[0], f[1]);
                        else r(d.x, d.n.x, 1, i);
                        d = d.n
                    } else {
                        if (p)
                            for (u = (c = d.p.z).length - 1; u >= 0; --u) i.point((f = c[u])[0], f[1]);
                        else r(d.x, d.p.x, -1, i);
                        d = d.p
                    }
                    c = (d = d.o).z, p = !p
                } while (!d.v);
                i.lineEnd()
            }
        }
    }

    function xe(t) {
        if (e = t.length) {
            for (var e, n, r = 0, i = t[0]; ++r < e;) i.n = n = t[r], n.p = i, i = n;
            i.n = n = t[0], n.p = i
        }
    }

    function be(t, e, n, r) {
        this.x = t, this.z = e, this.o = n, this.e = r, this.v = !1, this.n = this.p = null
    }

    function we(t, e, n, r) {
        return function(i, o) {
            function a(e, n) {
                var r = i(e, n);
                t(e = r[0], n = r[1]) && o.point(e, n)
            }

            function u(t, e) {
                var n = i(t, e);
                v.point(n[0], n[1])
            }

            function s() {
                m.point = u, v.lineStart()
            }

            function l() {
                m.point = a, v.lineEnd()
            }

            function c(t, e) {
                g.push([t, e]);
                var n = i(t, e);
                b.point(n[0], n[1])
            }

            function f() {
                b.lineStart(), g = []
            }

            function h() {
                c(g[0][0], g[0][1]), b.lineEnd();
                var t, e = b.clean(),
                    n = x.buffer(),
                    r = n.length;
                if (g.pop(), p.push(g), g = null, r)
                    if (1 & e) {
                        var i, a = -1;
                        if ((r = (t = n[0]).length - 1) > 0) {
                            for (w || (o.polygonStart(), w = !0), o.lineStart(); ++a < r;) o.point((i = t[a])[0], i[1]);
                            o.lineEnd()
                        }
                    } else r > 1 && 2 & e && n.push(n.pop().concat(n.shift())), d.push(n.filter(Ae))
            }
            var d, p, g, v = e(o),
                y = i.invert(r[0], r[1]),
                m = {
                    point: a,
                    lineStart: s,
                    lineEnd: l,
                    polygonStart: function() {
                        m.point = c, m.lineStart = f, m.lineEnd = h, d = [], p = []
                    },
                    polygonEnd: function() {
                        m.point = a, m.lineStart = s, m.lineEnd = l, d = Fi.merge(d);
                        var t = function(t, e) {
                            var n = t[0],
                                r = t[1],
                                i = [Math.sin(n), -Math.cos(n), 0],
                                o = 0,
                                a = 0;
                            ta.reset();
                            for (var u = 0, s = e.length; s > u; ++u) {
                                var l = e[u],
                                    c = l.length;
                                if (c)
                                    for (var f = l[0], h = f[0], d = f[1] / 2 + po / 4, p = Math.sin(d), g = Math.cos(d), v = 1;;) {
                                        v === c && (v = 0);
                                        var y = (t = l[v])[0],
                                            m = t[1] / 2 + po / 4,
                                            x = Math.sin(m),
                                            b = Math.cos(m),
                                            w = y - h,
                                            A = w >= 0 ? 1 : -1,
                                            M = A * w,
                                            k = M > po,
                                            _ = p * x;
                                        if (ta.add(Math.atan2(_ * A * Math.sin(M), g * b + _ * Math.cos(M))), o += k ? w + A * go : w, k ^ h >= n ^ y >= n) {
                                            var C = oe(re(f), re(t));
                                            se(C);
                                            var T = oe(i, C);
                                            se(T);
                                            var E = (k ^ w >= 0 ? -1 : 1) * K(T[2]);
                                            (r > E || r === E && (C[0] || C[1])) && (a += k ^ w >= 0 ? 1 : -1)
                                        }
                                        if (!v++) break;
                                        h = y, p = x, g = b, f = t
                                    }
                            }
                            return (-fo > o || fo > o && 0 > ta) ^ 1 & a
                        }(y, p);
                        d.length ? (w || (o.polygonStart(), w = !0), me(d, ke, t, n, o)) : t && (w || (o.polygonStart(), w = !0), o.lineStart(), n(null, null, 1, o), o.lineEnd()), w && (o.polygonEnd(), w = !1), d = p = null
                    },
                    sphere: function() {
                        o.polygonStart(), o.lineStart(), n(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                    }
                },
                x = Me(),
                b = e(x),
                w = !1;
            return m
        }
    }

    function Ae(t) {
        return t.length > 1
    }

    function Me() {
        var t, e = [];
        return {
            lineStart: function() {
                e.push(t = [])
            },
            point: function(e, n) {
                t.push([e, n])
            },
            lineEnd: b,
            buffer: function() {
                var n = e;
                return e = [], t = null, n
            },
            rejoin: function() {
                e.length > 1 && e.push(e.pop().concat(e.shift()))
            }
        }
    }

    function ke(t, e) {
        return ((t = t.x)[0] < 0 ? t[1] - yo - fo : yo - t[1]) - ((e = e.x)[0] < 0 ? e[1] - yo - fo : yo - e[1])
    }

    function _e(t, e, n, r) {
        return function(i) {
            var o, a = i.a,
                u = i.b,
                s = a.x,
                l = a.y,
                c = 0,
                f = 1,
                h = u.x - s,
                d = u.y - l;
            if (o = t - s, h || !(o > 0)) {
                if (o /= h, 0 > h) {
                    if (c > o) return;
                    f > o && (f = o)
                } else if (h > 0) {
                    if (o > f) return;
                    o > c && (c = o)
                }
                if (o = n - s, h || !(0 > o)) {
                    if (o /= h, 0 > h) {
                        if (o > f) return;
                        o > c && (c = o)
                    } else if (h > 0) {
                        if (c > o) return;
                        f > o && (f = o)
                    }
                    if (o = e - l, d || !(o > 0)) {
                        if (o /= d, 0 > d) {
                            if (c > o) return;
                            f > o && (f = o)
                        } else if (d > 0) {
                            if (o > f) return;
                            o > c && (c = o)
                        }
                        if (o = r - l, d || !(0 > o)) {
                            if (o /= d, 0 > d) {
                                if (o > f) return;
                                o > c && (c = o)
                            } else if (d > 0) {
                                if (c > o) return;
                                f > o && (f = o)
                            }
                            return c > 0 && (i.a = {
                                x: s + c * h,
                                y: l + c * d
                            }), 1 > f && (i.b = {
                                x: s + f * h,
                                y: l + f * d
                            }), i
                        }
                    }
                }
            }
        }
    }

    function Ce(t, e, n, r) {
        function i(r, i) {
            return Xi(r[0] - t) < fo ? i > 0 ? 0 : 3 : Xi(r[0] - n) < fo ? i > 0 ? 2 : 1 : Xi(r[1] - e) < fo ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }

        function o(t, e) {
            return a(t.x, e.x)
        }

        function a(t, e) {
            var n = i(t, 1),
                r = i(e, 1);
            return n !== r ? n - r : 0 === n ? e[1] - t[1] : 1 === n ? t[0] - e[0] : 2 === n ? t[1] - e[1] : e[0] - t[0]
        }
        return function(u) {
            function s(o, u, s, l) {
                var c = 0,
                    f = 0;
                if (null == o || (c = i(o, s)) !== (f = i(u, s)) || a(o, u) < 0 ^ s > 0)
                    do {
                        l.point(0 === c || 3 === c ? t : n, c > 1 ? r : e)
                    } while ((c = (c + s + 4) % 4) !== f);
                else l.point(u[0], u[1])
            }

            function l(i, o) {
                return i >= t && n >= i && o >= e && r >= o
            }

            function c(t, e) {
                l(t, e) && u.point(t, e)
            }

            function f(t, e) {
                var n = l(t = Math.max(-ga, Math.min(ga, t)), e = Math.max(-ga, Math.min(ga, e)));
                if (d && p.push([t, e]), w) g = t, v = e, y = n, w = !1, n && (u.lineStart(), u.point(t, e));
                else if (n && b) u.point(t, e);
                else {
                    var r = {
                        a: {
                            x: m,
                            y: x
                        },
                        b: {
                            x: t,
                            y: e
                        }
                    };
                    _(r) ? (b || (u.lineStart(), u.point(r.a.x, r.a.y)), u.point(r.b.x, r.b.y), n || u.lineEnd(), A = !1) : n && (u.lineStart(), u.point(t, e), A = !1)
                }
                m = t, x = e, b = n
            }
            var h, d, p, g, v, y, m, x, b, w, A, M = u,
                k = Me(),
                _ = _e(t, e, n, r),
                C = {
                    point: c,
                    lineStart: function() {
                        C.point = f, d && d.push(p = []), w = !0, b = !1, m = x = NaN
                    },
                    lineEnd: function() {
                        h && (f(g, v), y && b && k.rejoin(), h.push(k.buffer())), C.point = c, b && u.lineEnd()
                    },
                    polygonStart: function() {
                        u = k, h = [], d = [], A = !0
                    },
                    polygonEnd: function() {
                        u = M, h = Fi.merge(h);
                        var e = function(t) {
                                for (var e = 0, n = d.length, r = t[1], i = 0; n > i; ++i)
                                    for (var o, a = 1, u = d[i], s = u.length, l = u[0]; s > a; ++a) o = u[a], l[1] <= r ? o[1] > r && Z(l, o, t) > 0 && ++e : o[1] <= r && Z(l, o, t) < 0 && --e, l = o;
                                return 0 !== e
                            }([t, r]),
                            n = A && e,
                            i = h.length;
                        (n || i) && (u.polygonStart(), n && (u.lineStart(), s(null, null, 1, u), u.lineEnd()), i && me(h, o, e, s, u), u.polygonEnd()), h = d = p = null
                    }
                };
            return C
        }
    }

    function Te(t) {
        var e = 0,
            n = po / 3,
            r = Fe(t),
            i = r(e, n);
        return i.parallels = function(t) {
            return arguments.length ? r(e = t[0] * po / 180, n = t[1] * po / 180) : [e / po * 180, n / po * 180]
        }, i
    }

    function Ee(t, e) {
        function n(t, e) {
            var n = Math.sqrt(o - 2 * i * Math.sin(e)) / i;
            return [n * Math.sin(t *= i), a - n * Math.cos(t)]
        }
        var r = Math.sin(t),
            i = (r + Math.sin(e)) / 2,
            o = 1 + r * (2 * i - r),
            a = Math.sqrt(o) / i;
        return n.invert = function(t, e) {
            var n = a - e;
            return [Math.atan2(t, n) / i, K((o - (t * t + n * n) * i * i) / (2 * i))]
        }, n
    }

    function Se() {
        function t(t, e) {
            ya += i * t - r * e, r = t, i = e
        }
        var e, n, r, i;
        Aa.point = function(o, a) {
            Aa.point = t, e = r = o, n = i = a
        }, Aa.lineEnd = function() {
            t(e, n)
        }
    }

    function Ne(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }

    function De(t, e) {
        ia += t, oa += e, ++aa
    }

    function Le() {
        function t(t, r) {
            var i = t - e,
                o = r - n,
                a = Math.sqrt(i * i + o * o);
            ua += a * (e + t) / 2, sa += a * (n + r) / 2, la += a, De(e = t, n = r)
        }
        var e, n;
        ka.point = function(r, i) {
            ka.point = t, De(e = r, n = i)
        }
    }

    function Re() {
        ka.point = De
    }

    function Oe() {
        function t(t, e) {
            var n = t - r,
                o = e - i,
                a = Math.sqrt(n * n + o * o);
            ua += a * (r + t) / 2, sa += a * (i + e) / 2, la += a, ca += (a = i * t - r * e) * (r + t), fa += a * (i + e), ha += 3 * a, De(r = t, i = e)
        }
        var e, n, r, i;
        ka.point = function(o, a) {
            ka.point = t, De(e = r = o, n = i = a)
        }, ka.lineEnd = function() {
            t(e, n)
        }
    }

    function $e(t) {
        function e(e) {
            return (o ? function(e) {
                function r(n, r) {
                    n = t(n, r), e.point(n[0], n[1])
                }

                function i() {
                    m = NaN, M.point = a, e.lineStart()
                }

                function a(r, i) {
                    var a = re([r, i]),
                        u = t(r, i);
                    n(m, x, y, b, w, A, m = u[0], x = u[1], y = r, b = a[0], w = a[1], A = a[2], o, e), e.point(m, x)
                }

                function u() {
                    M.point = r, e.lineEnd()
                }

                function s() {
                    i(), M.point = l, M.lineEnd = c
                }

                function l(t, e) {
                    a(f = t, e), h = m, d = x, p = b, g = w, v = A, M.point = a
                }

                function c() {
                    n(m, x, y, b, w, A, h, d, f, p, g, v, o, e), M.lineEnd = u, u()
                }
                var f, h, d, p, g, v, y, m, x, b, w, A, M = {
                    point: r,
                    lineStart: i,
                    lineEnd: u,
                    polygonStart: function() {
                        e.polygonStart(), M.lineStart = s
                    },
                    polygonEnd: function() {
                        e.polygonEnd(), M.lineStart = i
                    }
                };
                return M
            } : function(e) {
                return He(e, function(n, r) {
                    n = t(n, r), e.point(n[0], n[1])
                })
            })(e)
        }

        function n(e, o, a, u, s, l, c, f, h, d, p, g, v, y) {
            var m = c - e,
                x = f - o,
                b = m * m + x * x;
            if (b > 4 * r && v--) {
                var w = u + d,
                    A = s + p,
                    M = l + g,
                    k = Math.sqrt(w * w + A * A + M * M),
                    _ = Math.asin(M /= k),
                    C = Xi(Xi(M) - 1) < fo || Xi(a - h) < fo ? (a + h) / 2 : Math.atan2(A, w),
                    T = t(C, _),
                    E = T[0],
                    S = T[1],
                    N = E - e,
                    D = S - o,
                    L = x * N - m * D;
                (L * L / b > r || Xi((m * N + x * D) / b - .5) > .3 || i > u * d + s * p + l * g) && (n(e, o, a, u, s, l, E, S, C, w /= k, A /= k, M, v, y), y.point(E, S), n(E, S, C, w, A, M, c, f, h, d, p, g, v, y))
            }
        }
        var r = .5,
            i = Math.cos(30 * mo),
            o = 16;
        return e.precision = function(t) {
            return arguments.length ? (o = (r = t * t) > 0 && 16, e) : Math.sqrt(r)
        }, e
    }

    function je(t) {
        this.stream = t
    }

    function He(t, e) {
        return {
            point: e,
            sphere: function() {
                t.sphere()
            },
            lineStart: function() {
                t.lineStart()
            },
            lineEnd: function() {
                t.lineEnd()
            },
            polygonStart: function() {
                t.polygonStart()
            },
            polygonEnd: function() {
                t.polygonEnd()
            }
        }
    }

    function qe(t) {
        return Fe(function() {
            return t
        })()
    }

    function Fe(t) {
        function e(t) {
            return [(t = u(t[0] * mo, t[1] * mo))[0] * h + s, l - t[1] * h]
        }

        function n(t) {
            return (t = u.invert((t[0] - s) / h, (l - t[1]) / h)) && [t[0] * xo, t[1] * xo]
        }

        function r() {
            u = ve(a = Be(m, x, b), o);
            var t = o(g, v);
            return s = d - t[0] * h, l = p + t[1] * h, i()
        }

        function i() {
            return c && (c.valid = !1, c = null), e
        }
        var o, a, u, s, l, c, f = $e(function(t, e) {
                return [(t = o(t, e))[0] * h + s, l - t[1] * h]
            }),
            h = 150,
            d = 480,
            p = 250,
            g = 0,
            v = 0,
            m = 0,
            x = 0,
            b = 0,
            w = pa,
            A = y,
            M = null,
            k = null;
        return e.stream = function(t) {
                return c && (c.valid = !1), (c = Pe(w(a, f(A(t))))).valid = !0, c
            }, e.clipAngle = function(t) {
                return arguments.length ? (w = null == t ? (M = t, pa) : function(t) {
                    function e(t, e) {
                        return Math.cos(t) * Math.cos(e) > i
                    }

                    function n(t, e, n) {
                        var r = [1, 0, 0],
                            o = oe(re(t), re(e)),
                            a = ie(o, o),
                            u = o[0],
                            s = a - u * u;
                        if (!s) return !n && t;
                        var l = i * a / s,
                            c = -i * u / s,
                            f = oe(r, o),
                            h = ue(r, l);
                        ae(h, ue(o, c));
                        var d = f,
                            p = ie(h, d),
                            g = ie(d, d),
                            v = p * p - g * (ie(h, h) - 1);
                        if (!(0 > v)) {
                            var y = Math.sqrt(v),
                                m = ue(d, (-p - y) / g);
                            if (ae(m, h), m = le(m), !n) return m;
                            var x, b = t[0],
                                w = e[0],
                                A = t[1],
                                M = e[1];
                            b > w && (x = b, b = w, w = x);
                            var k = w - b,
                                _ = Xi(k - po) < fo;
                            if (!_ && A > M && (x = A, A = M, M = x), _ || fo > k ? _ ? A + M > 0 ^ m[1] < (Xi(m[0] - b) < fo ? A : M) : A <= m[1] && m[1] <= M : k > po ^ (b <= m[0] && m[0] <= w)) {
                                var C = ue(d, (-p + y) / g);
                                return ae(C, h), [m, le(C)]
                            }
                        }
                    }

                    function r(e, n) {
                        var r = o ? t : po - t,
                            i = 0;
                        return -r > e ? i |= 1 : e > r && (i |= 2), -r > n ? i |= 4 : n > r && (i |= 8), i
                    }
                    var i = Math.cos(t),
                        o = i > 0,
                        a = Xi(i) > fo;
                    return we(e, function(t) {
                        var i, u, s, l, c;
                        return {
                            lineStart: function() {
                                l = s = !1, c = 1
                            },
                            point: function(f, h) {
                                var d, p = [f, h],
                                    g = e(f, h),
                                    v = o ? g ? 0 : r(f, h) : g ? r(f + (0 > f ? po : -po), h) : 0;
                                if (!i && (l = s = g) && t.lineStart(), g !== s && (d = n(i, p), (ce(i, d) || ce(p, d)) && (p[0] += fo, p[1] += fo, g = e(p[0], p[1]))), g !== s) c = 0, g ? (t.lineStart(), d = n(p, i), t.point(d[0], d[1])) : (d = n(i, p), t.point(d[0], d[1]), t.lineEnd()), i = d;
                                else if (a && i && o ^ g) {
                                    var y;
                                    v & u || !(y = n(p, i, !0)) || (c = 0, o ? (t.lineStart(), t.point(y[0][0], y[0][1]), t.point(y[1][0], y[1][1]), t.lineEnd()) : (t.point(y[1][0], y[1][1]), t.lineEnd(), t.lineStart(), t.point(y[0][0], y[0][1])))
                                }!g || i && ce(i, p) || t.point(p[0], p[1]), i = p, s = g, u = v
                            },
                            lineEnd: function() {
                                s && t.lineEnd(), i = null
                            },
                            clean: function() {
                                return c | (l && s) << 1
                            }
                        }
                    }, Ve(t, 6 * mo), o ? [0, -t] : [-po, t - po])
                }((M = +t) * mo), i()) : M
            }, e.clipExtent = function(t) {
                return arguments.length ? (k = t, A = t ? Ce(t[0][0], t[0][1], t[1][0], t[1][1]) : y, i()) : k
            }, e.scale = function(t) {
                return arguments.length ? (h = +t, r()) : h
            }, e.translate = function(t) {
                return arguments.length ? (d = +t[0], p = +t[1], r()) : [d, p]
            }, e.center = function(t) {
                return arguments.length ? (g = t[0] % 360 * mo, v = t[1] % 360 * mo, r()) : [g * xo, v * xo]
            }, e.rotate = function(t) {
                return arguments.length ? (m = t[0] % 360 * mo, x = t[1] % 360 * mo, b = t.length > 2 ? t[2] % 360 * mo : 0, r()) : [m * xo, x * xo, b * xo]
            }, Fi.rebind(e, f, "precision"),
            function() {
                return o = t.apply(this, arguments), e.invert = o.invert && n, r()
            }
    }

    function Pe(t) {
        return He(t, function(e, n) {
            t.point(e * mo, n * mo)
        })
    }

    function Ie(t, e) {
        return [t, e]
    }

    function ze(t, e) {
        return [t > po ? t - go : -po > t ? t + go : t, e]
    }

    function Be(t, e, n) {
        return t ? e || n ? ve(We(t), Ye(e, n)) : We(t) : e || n ? Ye(e, n) : ze
    }

    function Ue(t) {
        return function(e, n) {
            return [(e += t) > po ? e - go : -po > e ? e + go : e, n]
        }
    }

    function We(t) {
        var e = Ue(t);
        return e.invert = Ue(-t), e
    }

    function Ye(t, e) {
        function n(t, e) {
            var n = Math.cos(e),
                u = Math.cos(t) * n,
                s = Math.sin(t) * n,
                l = Math.sin(e),
                c = l * r + u * i;
            return [Math.atan2(s * o - c * a, u * r - l * i), K(c * o + s * a)]
        }
        var r = Math.cos(t),
            i = Math.sin(t),
            o = Math.cos(e),
            a = Math.sin(e);
        return n.invert = function(t, e) {
            var n = Math.cos(e),
                u = Math.cos(t) * n,
                s = Math.sin(t) * n,
                l = Math.sin(e),
                c = l * o - s * a;
            return [Math.atan2(s * o + l * a, u * r + c * i), K(c * r - u * i)]
        }, n
    }

    function Ve(t, e) {
        var n = Math.cos(t),
            r = Math.sin(t);
        return function(i, o, a, u) {
            var s = a * e;
            null != i ? (i = Ge(n, i), o = Ge(n, o), (a > 0 ? o > i : i > o) && (i += a * go)) : (i = t + a * go, o = t - .5 * s);
            for (var l, c = i; a > 0 ? c > o : o > c; c -= s) u.point((l = le([n, -r * Math.cos(c), -r * Math.sin(c)]))[0], l[1])
        }
    }

    function Ge(t, e) {
        var n = re(e);
        n[0] -= t, se(n);
        var r = Q(-n[1]);
        return ((-n[2] < 0 ? -r : r) + 2 * Math.PI - fo) % (2 * Math.PI)
    }

    function Xe(t, e, n) {
        var r = Fi.range(t, e - fo, n).concat(e);
        return function(t) {
            return r.map(function(e) {
                return [t, e]
            })
        }
    }

    function Ze(t, e, n) {
        var r = Fi.range(t, e - fo, n).concat(e);
        return function(t) {
            return r.map(function(e) {
                return [e, t]
            })
        }
    }

    function Qe(t) {
        return t.source
    }

    function Ke(t) {
        return t.target
    }

    function Je(t, e) {
        function n(e, n) {
            var r = Math.cos(e),
                i = Math.cos(n),
                o = t(r * i);
            return [o * i * Math.sin(e), o * Math.sin(n)]
        }
        return n.invert = function(t, n) {
            var r = Math.sqrt(t * t + n * n),
                i = e(r),
                o = Math.sin(i),
                a = Math.cos(i);
            return [Math.atan2(t * o, r * a), Math.asin(r && n * o / r)]
        }, n
    }

    function tn(t, e) {
        function n(t, e) {
            a > 0 ? -yo + fo > e && (e = -yo + fo) : e > yo - fo && (e = yo - fo);
            var n = a / Math.pow(i(e), o);
            return [n * Math.sin(o * t), a - n * Math.cos(o * t)]
        }
        var r = Math.cos(t),
            i = function(t) {
                return Math.tan(po / 4 + t / 2)
            },
            o = t === e ? Math.sin(t) : Math.log(r / Math.cos(e)) / Math.log(i(e) / i(t)),
            a = r * Math.pow(i(t), o) / o;
        return o ? (n.invert = function(t, e) {
            var n = a - e,
                r = X(o) * Math.sqrt(t * t + n * n);
            return [Math.atan2(t, n) / o, 2 * Math.atan(Math.pow(a / r, 1 / o)) - yo]
        }, n) : nn
    }

    function en(t, e) {
        function n(t, e) {
            var n = o - e;
            return [n * Math.sin(i * t), o - n * Math.cos(i * t)]
        }
        var r = Math.cos(t),
            i = t === e ? Math.sin(t) : (r - Math.cos(e)) / (e - t),
            o = r / i + t;
        return Xi(i) < fo ? Ie : (n.invert = function(t, e) {
            var n = o - e;
            return [Math.atan2(t, n) / i, o - X(i) * Math.sqrt(t * t + n * n)]
        }, n)
    }

    function nn(t, e) {
        return [t, Math.log(Math.tan(po / 4 + e / 2))]
    }

    function rn(t) {
        var e, n = qe(t),
            r = n.scale,
            i = n.translate,
            o = n.clipExtent;
        return n.scale = function() {
            var t = r.apply(n, arguments);
            return t === n ? e ? n.clipExtent(null) : n : t
        }, n.translate = function() {
            var t = i.apply(n, arguments);
            return t === n ? e ? n.clipExtent(null) : n : t
        }, n.clipExtent = function(t) {
            var a = o.apply(n, arguments);
            if (a === n) {
                if (e = null == t) {
                    var u = po * r(),
                        s = i();
                    o([
                        [s[0] - u, s[1] - u],
                        [s[0] + u, s[1] + u]
                    ])
                }
            } else e && (a = null);
            return a
        }, n.clipExtent(null)
    }

    function on(t, e) {
        return [Math.log(Math.tan(po / 4 + e / 2)), -t]
    }

    function an(t) {
        return t[0]
    }

    function un(t) {
        return t[1]
    }

    function sn(t) {
        for (var e = t.length, n = [0, 1], r = 2, i = 2; e > i; i++) {
            for (; r > 1 && Z(t[n[r - 2]], t[n[r - 1]], t[i]) <= 0;) --r;
            n[r++] = i
        }
        return n.slice(0, r)
    }

    function ln(t, e) {
        return t[0] - e[0] || t[1] - e[1]
    }

    function cn(t, e, n) {
        return (n[0] - e[0]) * (t[1] - e[1]) < (n[1] - e[1]) * (t[0] - e[0])
    }

    function fn(t, e, n, r) {
        var i = t[0],
            o = n[0],
            a = e[0] - i,
            u = r[0] - o,
            s = t[1],
            l = n[1],
            c = e[1] - s,
            f = r[1] - l,
            h = (u * (s - l) - f * (i - o)) / (f * a - u * c);
        return [i + h * a, s + h * c]
    }

    function hn(t) {
        var e = t[0],
            n = t[t.length - 1];
        return !(e[0] - n[0] || e[1] - n[1])
    }

    function dn(t) {
        var e = qa.pop() || new function() {
            Sn(this), this.edge = this.site = this.circle = null
        };
        return e.site = t, e
    }

    function pn(t) {
        An(t), $a.remove(t), qa.push(t), Sn(t)
    }

    function gn(t) {
        var e = t.circle,
            n = e.x,
            r = e.cy,
            i = {
                x: n,
                y: r
            },
            o = t.P,
            a = t.N,
            u = [t];
        pn(t);
        for (var s = o; s.circle && Xi(n - s.circle.x) < fo && Xi(r - s.circle.cy) < fo;) o = s.P, u.unshift(s), pn(s), s = o;
        u.unshift(s), An(s);
        for (var l = a; l.circle && Xi(n - l.circle.x) < fo && Xi(r - l.circle.cy) < fo;) a = l.N, u.push(l), pn(l), l = a;
        u.push(l), An(l);
        var c, f = u.length;
        for (c = 1; f > c; ++c) l = u[c], s = u[c - 1], Cn(l.edge, s.site, l.site, i);
        s = u[0], (l = u[f - 1]).edge = _n(s.site, l.site, null, i), wn(s), wn(l)
    }

    function vn(t) {
        for (var e, n, r, i, o = t.x, a = t.y, u = $a._; u;)
            if ((r = yn(u, a) - o) > fo) u = u.L;
            else {
                if (!((i = o - mn(u, a)) > fo)) {
                    r > -fo ? (e = u.P, n = u) : i > -fo ? (e = u, n = u.N) : e = n = u;
                    break
                }
                if (!u.R) {
                    e = u;
                    break
                }
                u = u.R
            }
        var s = dn(t);
        if ($a.insert(e, s), e || n) {
            if (e === n) return An(e), n = dn(e.site), $a.insert(s, n), s.edge = n.edge = _n(e.site, s.site), wn(e), void wn(n);
            if (!n) return void(s.edge = _n(e.site, s.site));
            An(e), An(n);
            var l = e.site,
                c = l.x,
                f = l.y,
                h = t.x - c,
                d = t.y - f,
                p = n.site,
                g = p.x - c,
                v = p.y - f,
                y = 2 * (h * v - d * g),
                m = h * h + d * d,
                x = g * g + v * v,
                b = {
                    x: (v * m - d * x) / y + c,
                    y: (h * x - g * m) / y + f
                };
            Cn(n.edge, l, p, b), s.edge = _n(l, t, null, b), n.edge = _n(t, p, null, b), wn(e), wn(n)
        }
    }

    function yn(t, e) {
        var n = t.site,
            r = n.x,
            i = n.y,
            o = i - e;
        if (!o) return r;
        var a = t.P;
        if (!a) return -1 / 0;
        var u = (n = a.site).x,
            s = n.y,
            l = s - e;
        if (!l) return u;
        var c = u - r,
            f = 1 / o - 1 / l,
            h = c / l;
        return f ? (-h + Math.sqrt(h * h - 2 * f * (c * c / (-2 * l) - s + l / 2 + i - o / 2))) / f + r : (r + u) / 2
    }

    function mn(t, e) {
        var n = t.N;
        if (n) return yn(n, e);
        var r = t.site;
        return r.y === e ? r.x : 1 / 0
    }

    function xn(t) {
        this.site = t, this.edges = []
    }

    function bn(t, e) {
        return e.angle - t.angle
    }

    function wn(t) {
        var e = t.P,
            n = t.N;
        if (e && n) {
            var r = e.site,
                i = t.site,
                o = n.site;
            if (r !== o) {
                var a = i.x,
                    u = i.y,
                    s = r.x - a,
                    l = r.y - u,
                    c = o.x - a,
                    f = 2 * (s * (v = o.y - u) - l * c);
                if (!(f >= -ho)) {
                    var h = s * s + l * l,
                        d = c * c + v * v,
                        p = (v * h - l * d) / f,
                        g = (s * d - c * h) / f,
                        v = g + u,
                        y = Fa.pop() || new function() {
                            Sn(this), this.x = this.y = this.arc = this.site = this.cy = null
                        };
                    y.arc = t, y.site = i, y.x = p + a, y.y = v + Math.sqrt(p * p + g * g), y.cy = v, t.circle = y;
                    for (var m = null, x = Ha._; x;)
                        if (y.y < x.y || y.y === x.y && y.x <= x.x) {
                            if (!x.L) {
                                m = x.P;
                                break
                            }
                            x = x.L
                        } else {
                            if (!x.R) {
                                m = x;
                                break
                            }
                            x = x.R
                        }
                    Ha.insert(m, y), m || (ja = y)
                }
            }
        }
    }

    function An(t) {
        var e = t.circle;
        e && (e.P || (ja = e.N), Ha.remove(e), Fa.push(e), Sn(e), t.circle = null)
    }

    function Mn(t, e) {
        var n = t.b;
        if (n) return !0;
        var r, i, o = t.a,
            a = e[0][0],
            u = e[1][0],
            s = e[0][1],
            l = e[1][1],
            c = t.l,
            f = t.r,
            h = c.x,
            d = c.y,
            p = f.x,
            g = f.y,
            v = (h + p) / 2,
            y = (d + g) / 2;
        if (g === d) {
            if (a > v || v >= u) return;
            if (h > p) {
                if (o) {
                    if (o.y >= l) return
                } else o = {
                    x: v,
                    y: s
                };
                n = {
                    x: v,
                    y: l
                }
            } else {
                if (o) {
                    if (o.y < s) return
                } else o = {
                    x: v,
                    y: l
                };
                n = {
                    x: v,
                    y: s
                }
            }
        } else if (i = y - (r = (h - p) / (g - d)) * v, -1 > r || r > 1)
            if (h > p) {
                if (o) {
                    if (o.y >= l) return
                } else o = {
                    x: (s - i) / r,
                    y: s
                };
                n = {
                    x: (l - i) / r,
                    y: l
                }
            } else {
                if (o) {
                    if (o.y < s) return
                } else o = {
                    x: (l - i) / r,
                    y: l
                };
                n = {
                    x: (s - i) / r,
                    y: s
                }
            } else if (g > d) {
            if (o) {
                if (o.x >= u) return
            } else o = {
                x: a,
                y: r * a + i
            };
            n = {
                x: u,
                y: r * u + i
            }
        } else {
            if (o) {
                if (o.x < a) return
            } else o = {
                x: u,
                y: r * u + i
            };
            n = {
                x: a,
                y: r * a + i
            }
        }
        return t.a = o, t.b = n, !0
    }

    function kn(t, e) {
        this.l = t, this.r = e, this.a = this.b = null
    }

    function _n(t, e, n, r) {
        var i = new kn(t, e);
        return Ra.push(i), n && Cn(i, t, e, n), r && Cn(i, e, t, r), Oa[t.i].edges.push(new Tn(i, t, e)), Oa[e.i].edges.push(new Tn(i, e, t)), i
    }

    function Cn(t, e, n, r) {
        t.a || t.b ? t.l === n ? t.b = r : t.a = r : (t.a = r, t.l = e, t.r = n)
    }

    function Tn(t, e, n) {
        var r = t.a,
            i = t.b;
        this.edge = t, this.site = e, this.angle = n ? Math.atan2(n.y - e.y, n.x - e.x) : t.l === e ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y)
    }

    function En() {
        this._ = null
    }

    function Sn(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null
    }

    function Nn(t, e) {
        var n = e,
            r = e.R,
            i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.R = r.L, n.R && (n.R.U = n), r.L = n
    }

    function Dn(t, e) {
        var n = e,
            r = e.L,
            i = n.U;
        i ? i.L === n ? i.L = r : i.R = r : t._ = r, r.U = i, n.U = r, n.L = r.R, n.L && (n.L.U = n), r.R = n
    }

    function Ln(t) {
        for (; t.L;) t = t.L;
        return t
    }

    function Rn(t, e) {
        var n, r, i, o = t.sort(On).pop();
        for (Ra = [], Oa = new Array(t.length), $a = new En, Ha = new En;;)
            if (i = ja, o && (!i || o.y < i.y || o.y === i.y && o.x < i.x))(o.x !== n || o.y !== r) && (Oa[o.i] = new xn(o), vn(o), n = o.x, r = o.y), o = t.pop();
            else {
                if (!i) break;
                gn(i.arc)
            }
        e && (function(t) {
            for (var e, n = Ra, r = _e(t[0][0], t[0][1], t[1][0], t[1][1]), i = n.length; i--;)(!Mn(e = n[i], t) || !r(e) || Xi(e.a.x - e.b.x) < fo && Xi(e.a.y - e.b.y) < fo) && (e.a = e.b = null, n.splice(i, 1))
        }(e), function(t) {
            for (var e, n, r, i, o, a, u, s, l, c, f = t[0][0], h = t[1][0], d = t[0][1], p = t[1][1], g = Oa, v = g.length; v--;)
                if ((o = g[v]) && o.prepare())
                    for (s = (u = o.edges).length, a = 0; s > a;) r = (c = u[a].end()).x, i = c.y, e = (l = u[++a % s].start()).x, n = l.y, (Xi(r - e) > fo || Xi(i - n) > fo) && (u.splice(a, 0, new Tn((y = o.site, m = c, x = Xi(r - f) < fo && p - i > fo ? {
                        x: f,
                        y: Xi(e - f) < fo ? n : p
                    } : Xi(i - p) < fo && h - r > fo ? {
                        x: Xi(n - p) < fo ? e : h,
                        y: p
                    } : Xi(r - h) < fo && i - d > fo ? {
                        x: h,
                        y: Xi(e - h) < fo ? n : d
                    } : Xi(i - d) < fo && r - f > fo ? {
                        x: Xi(n - d) < fo ? e : f,
                        y: d
                    } : null, b = void 0, (b = new kn(y, null)).a = m, b.b = x, Ra.push(b), b), o.site, null)), ++s);
            var y, m, x, b
        }(e));
        var a = {
            cells: Oa,
            edges: Ra
        };
        return $a = Ha = Ra = Oa = null, a
    }

    function On(t, e) {
        return e.y - t.y || e.x - t.x
    }

    function $n(t) {
        return t.x
    }

    function jn(t) {
        return t.y
    }

    function Hn(t, e) {
        t = Fi.rgb(t), e = Fi.rgb(e);
        var n = t.r,
            r = t.g,
            i = t.b,
            o = e.r - n,
            a = e.g - r,
            u = e.b - i;
        return function(t) {
            return "#" + gt(Math.round(n + o * t)) + gt(Math.round(r + a * t)) + gt(Math.round(i + u * t))
        }
    }

    function qn(t, e) {
        var n, r = {},
            i = {};
        for (n in t) n in e ? r[n] = In(t[n], e[n]) : i[n] = t[n];
        for (n in e) n in t || (i[n] = e[n]);
        return function(t) {
            for (n in r) i[n] = r[n](t);
            return i
        }
    }

    function Fn(t, e) {
        return t = +t, e = +e,
            function(n) {
                return t * (1 - n) + e * n
            }
    }

    function Pn(t, e) {
        var n, r, i, o = Ia.lastIndex = za.lastIndex = 0,
            a = -1,
            u = [],
            s = [];
        for (t += "", e += "";
            (n = Ia.exec(t)) && (r = za.exec(e));)(i = r.index) > o && (i = e.slice(o, i), u[a] ? u[a] += i : u[++a] = i), (n = n[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null, s.push({
            i: a,
            x: Fn(n, r)
        })), o = za.lastIndex;
        return o < e.length && (i = e.slice(o), u[a] ? u[a] += i : u[++a] = i), u.length < 2 ? s[0] ? (e = s[0].x, function(t) {
            return e(t) + ""
        }) : function() {
            return e
        } : (e = s.length, function(t) {
            for (var n, r = 0; e > r; ++r) u[(n = s[r]).i] = n.x(t);
            return u.join("")
        })
    }

    function In(t, e) {
        for (var n, r = Fi.interpolators.length; --r >= 0 && !(n = Fi.interpolators[r](t, e)););
        return n
    }

    function zn(t, e) {
        var n, r = [],
            i = [],
            o = t.length,
            a = e.length,
            u = Math.min(t.length, e.length);
        for (n = 0; u > n; ++n) r.push(In(t[n], e[n]));
        for (; o > n; ++n) i[n] = t[n];
        for (; a > n; ++n) i[n] = e[n];
        return function(t) {
            for (n = 0; u > n; ++n) i[n] = r[n](t);
            return i
        }
    }

    function Bn(t) {
        return function(e) {
            return 1 - t(1 - e)
        }
    }

    function Un(t) {
        return function(e) {
            return .5 * (.5 > e ? t(2 * e) : 2 - t(2 - 2 * e))
        }
    }

    function Wn(t) {
        return t * t
    }

    function Yn(t) {
        return t * t * t
    }

    function Vn(t) {
        if (0 >= t) return 0;
        if (t >= 1) return 1;
        var e = t * t,
            n = e * t;
        return 4 * (.5 > t ? n : 3 * (t - e) + n - .75)
    }

    function Gn(t) {
        return 1 - Math.cos(t * yo)
    }

    function Xn(t) {
        return Math.pow(2, 10 * (t - 1))
    }

    function Zn(t) {
        return 1 - Math.sqrt(1 - t * t)
    }

    function Qn(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }

    function Kn(t, e) {
        return e -= t,
            function(n) {
                return Math.round(t + e * n)
            }
    }

    function Jn(t) {
        var e, n, r, i = [t.a, t.b],
            o = [t.c, t.d],
            a = er(i),
            u = tr(i, o),
            s = er(((e = o)[0] += (r = -u) * (n = i)[0], e[1] += r * n[1], e)) || 0;
        i[0] * o[1] < o[0] * i[1] && (i[0] *= -1, i[1] *= -1, a *= -1, u *= -1), this.rotate = (a ? Math.atan2(i[1], i[0]) : Math.atan2(-o[0], o[1])) * xo, this.translate = [t.e, t.f], this.scale = [a, s], this.skew = s ? Math.atan2(u, s) * xo : 0
    }

    function tr(t, e) {
        return t[0] * e[0] + t[1] * e[1]
    }

    function er(t) {
        var e = Math.sqrt(tr(t, t));
        return e && (t[0] /= e, t[1] /= e), e
    }

    function nr(t, e) {
        var n, r = [],
            i = [],
            o = Fi.transform(t),
            a = Fi.transform(e),
            u = o.translate,
            s = a.translate,
            l = o.rotate,
            c = a.rotate,
            f = o.skew,
            h = a.skew,
            d = o.scale,
            p = a.scale;
        return u[0] != s[0] || u[1] != s[1] ? (r.push("translate(", null, ",", null, ")"), i.push({
                i: 1,
                x: Fn(u[0], s[0])
            }, {
                i: 3,
                x: Fn(u[1], s[1])
            })) : r.push(s[0] || s[1] ? "translate(" + s + ")" : ""), l != c ? (l - c > 180 ? c += 360 : c - l > 180 && (l += 360), i.push({
                i: r.push(r.pop() + "rotate(", null, ")") - 2,
                x: Fn(l, c)
            })) : c && r.push(r.pop() + "rotate(" + c + ")"), f != h ? i.push({
                i: r.push(r.pop() + "skewX(", null, ")") - 2,
                x: Fn(f, h)
            }) : h && r.push(r.pop() + "skewX(" + h + ")"), d[0] != p[0] || d[1] != p[1] ? (n = r.push(r.pop() + "scale(", null, ",", null, ")"), i.push({
                i: n - 4,
                x: Fn(d[0], p[0])
            }, {
                i: n - 2,
                x: Fn(d[1], p[1])
            })) : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + "scale(" + p + ")"), n = i.length,
            function(t) {
                for (var e, o = -1; ++o < n;) r[(e = i[o]).i] = e.x(t);
                return r.join("")
            }
    }

    function rr(t, e) {
        return e = (e -= t = +t) || 1 / e,
            function(n) {
                return (n - t) / e
            }
    }

    function ir(t, e) {
        return e = (e -= t = +t) || 1 / e,
            function(n) {
                return Math.max(0, Math.min(1, (n - t) / e))
            }
    }

    function or(t) {
        for (var e = t.source, n = t.target, r = function(t, e) {
                if (t === e) return t;
                for (var n = ar(t), r = ar(e), i = n.pop(), o = r.pop(), a = null; i === o;) a = i, i = n.pop(), o = r.pop();
                return a
            }(e, n), i = [e]; e !== r;) e = e.parent, i.push(e);
        for (var o = i.length; n !== r;) i.splice(o, 0, n), n = n.parent;
        return i
    }

    function ar(t) {
        for (var e = [], n = t.parent; null != n;) e.push(t), t = n, n = n.parent;
        return e.push(t), e
    }

    function ur(t) {
        t.fixed |= 2
    }

    function sr(t) {
        t.fixed &= -7
    }

    function lr(t) {
        t.fixed |= 4, t.px = t.x, t.py = t.y
    }

    function cr(t) {
        t.fixed &= -5
    }

    function fr(t, e) {
        return Fi.rebind(t, e, "sort", "children", "value"), t.nodes = t, t.links = yr, t
    }

    function hr(t, e) {
        for (var n = [t]; null != (t = n.pop());)
            if (e(t), (i = t.children) && (r = i.length))
                for (var r, i; --r >= 0;) n.push(i[r])
    }

    function dr(t, e) {
        for (var n = [t], r = []; null != (t = n.pop());)
            if (r.push(t), (o = t.children) && (i = o.length))
                for (var i, o, a = -1; ++a < i;) n.push(o[a]);
        for (; null != (t = r.pop());) e(t)
    }

    function pr(t) {
        return t.children
    }

    function gr(t) {
        return t.value
    }

    function vr(t, e) {
        return e.value - t.value
    }

    function yr(t) {
        return Fi.merge(t.map(function(t) {
            return (t.children || []).map(function(e) {
                return {
                    source: t,
                    target: e
                }
            })
        }))
    }

    function mr(t) {
        return t.x
    }

    function xr(t) {
        return t.y
    }

    function br(t, e, n) {
        t.y0 = e, t.y = n
    }

    function wr(t) {
        return Fi.range(t.length)
    }

    function Ar(t) {
        for (var e = -1, n = t[0].length, r = []; ++e < n;) r[e] = 0;
        return r
    }

    function Mr(t) {
        for (var e, n = 1, r = 0, i = t[0][1], o = t.length; o > n; ++n)(e = t[n][1]) > i && (r = n, i = e);
        return r
    }

    function kr(t) {
        return t.reduce(_r, 0)
    }

    function _r(t, e) {
        return t + e[1]
    }

    function Cr(t, e) {
        return Tr(t, Math.ceil(Math.log(e.length) / Math.LN2 + 1))
    }

    function Tr(t, e) {
        for (var n = -1, r = +t[0], i = (t[1] - r) / e, o = []; ++n <= e;) o[n] = i * n + r;
        return o
    }

    function Er(t) {
        return [Fi.min(t), Fi.max(t)]
    }

    function Sr(t, e) {
        return t.value - e.value
    }

    function Nr(t, e) {
        var n = t._pack_next;
        t._pack_next = e, e._pack_prev = t, e._pack_next = n, n._pack_prev = e
    }

    function Dr(t, e) {
        t._pack_next = e, e._pack_prev = t
    }

    function Lr(t, e) {
        var n = e.x - t.x,
            r = e.y - t.y,
            i = t.r + e.r;
        return .999 * i * i > n * n + r * r
    }

    function Rr(t) {
        function e(t) {
            c = Math.min(t.x - t.r, c), f = Math.max(t.x + t.r, f), h = Math.min(t.y - t.r, h), d = Math.max(t.y + t.r, d)
        }
        if ((n = t.children) && (l = n.length)) {
            var n, r, i, o, a, u, s, l, c = 1 / 0,
                f = -1 / 0,
                h = 1 / 0,
                d = -1 / 0;
            if (n.forEach(Or), (r = n[0]).x = -r.r, r.y = 0, e(r), l > 1 && ((i = n[1]).x = i.r, i.y = 0, e(i), l > 2))
                for (jr(r, i, o = n[2]), e(o), Nr(r, o), r._pack_prev = o, Nr(o, i), i = r._pack_next, a = 3; l > a; a++) {
                    jr(r, i, o = n[a]);
                    var p = 0,
                        g = 1,
                        v = 1;
                    for (u = i._pack_next; u !== i; u = u._pack_next, g++)
                        if (Lr(u, o)) {
                            p = 1;
                            break
                        }
                    if (1 == p)
                        for (s = r._pack_prev; s !== u._pack_prev && !Lr(s, o); s = s._pack_prev, v++);
                    p ? (v > g || g == v && i.r < r.r ? Dr(r, i = u) : Dr(r = s, i), a--) : (Nr(r, o), i = o, e(o))
                }
            var y = (c + f) / 2,
                m = (h + d) / 2,
                x = 0;
            for (a = 0; l > a; a++)(o = n[a]).x -= y, o.y -= m, x = Math.max(x, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
            t.r = x, n.forEach($r)
        }
    }

    function Or(t) {
        t._pack_next = t._pack_prev = t
    }

    function $r(t) {
        delete t._pack_next, delete t._pack_prev
    }

    function jr(t, e, n) {
        var r = t.r + n.r,
            i = e.x - t.x,
            o = e.y - t.y;
        if (r && (i || o)) {
            var a = e.r + n.r,
                u = i * i + o * o,
                s = .5 + ((r *= r) - (a *= a)) / (2 * u),
                l = Math.sqrt(Math.max(0, 2 * a * (r + u) - (r -= u) * r - a * a)) / (2 * u);
            n.x = t.x + s * i + l * o, n.y = t.y + s * o - l * i
        } else n.x = t.x + r, n.y = t.y
    }

    function Hr(t, e) {
        return t.parent == e.parent ? 1 : 2
    }

    function qr(t) {
        var e = t.children;
        return e.length ? e[0] : t.t
    }

    function Fr(t) {
        var e, n = t.children;
        return (e = n.length) ? n[e - 1] : t.t
    }

    function Pr(t) {
        return {
            x: t.x,
            y: t.y,
            dx: t.dx,
            dy: t.dy
        }
    }

    function Ir(t, e) {
        var n = t.x + e[3],
            r = t.y + e[0],
            i = t.dx - e[1] - e[3],
            o = t.dy - e[0] - e[2];
        return 0 > i && (n += i / 2, i = 0), 0 > o && (r += o / 2, o = 0), {
            x: n,
            y: r,
            dx: i,
            dy: o
        }
    }

    function zr(t) {
        var e = t[0],
            n = t[t.length - 1];
        return n > e ? [e, n] : [n, e]
    }

    function Br(t) {
        return t.rangeExtent ? t.rangeExtent() : zr(t.range())
    }

    function Ur(t, e, n, r) {
        var i = n(t[0], t[1]),
            o = r(e[0], e[1]);
        return function(t) {
            return o(i(t))
        }
    }

    function Wr(t, e) {
        var n, r = 0,
            i = t.length - 1,
            o = t[r],
            a = t[i];
        return o > a && (n = r, r = i, i = n, n = o, o = a, a = n), t[r] = e.floor(o), t[i] = e.ceil(a), t
    }

    function Yr(t, e, n, r) {
        var i = [],
            o = [],
            a = 0,
            u = Math.min(t.length, e.length) - 1;
        for (t[u] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a <= u;) i.push(n(t[a - 1], t[a])), o.push(r(e[a - 1], e[a]));
        return function(e) {
            var n = Fi.bisect(t, e, 1, u) - 1;
            return o[n](i[n](e))
        }
    }

    function Vr(t, e) {
        return Fi.rebind(t, e, "range", "rangeRound", "interpolate", "clamp")
    }

    function Gr(t, e) {
        return Wr(t, (n = Xr(t, e)[2]) ? {
            floor: function(t) {
                return Math.floor(t / n) * n
            },
            ceil: function(t) {
                return Math.ceil(t / n) * n
            }
        } : Ja);
        var n
    }

    function Xr(t, e) {
        null == e && (e = 10);
        var n = zr(t),
            r = n[1] - n[0],
            i = Math.pow(10, Math.floor(Math.log(r / e) / Math.LN10)),
            o = e / r * i;
        return .15 >= o ? i *= 10 : .35 >= o ? i *= 5 : .75 >= o && (i *= 2), n[0] = Math.ceil(n[0] / i) * i, n[1] = Math.floor(n[1] / i) * i + .5 * i, n[2] = i, n
    }

    function Zr(t, e) {
        return Fi.range.apply(Fi, Xr(t, e))
    }

    function Qr(t, e, n) {
        var r, i, o, a = Xr(t, e);
        if (n) {
            var u = Io.exec(n);
            if (u.shift(), "s" === u[8]) {
                var s = Fi.formatPrefix(Math.max(Xi(a[0]), Xi(a[1])));
                return u[7] || (u[7] = "." + Kr(s.scale(a[2]))), u[8] = "f", n = Fi.format(u.join("")),
                    function(t) {
                        return n(s.scale(t)) + s.symbol
                    }
            }
            u[7] || (u[7] = "." + (r = u[8], o = Kr((i = a)[2]), r in tu ? Math.abs(o - Kr(Math.max(Xi(i[0]), Xi(i[1])))) + +("e" !== r) : o - 2 * ("%" === r))), n = u.join("")
        } else n = ",." + Kr(a[2]) + "f";
        return Fi.format(n)
    }

    function Kr(t) {
        return -Math.floor(Math.log(t) / Math.LN10 + .01)
    }

    function Jr(t) {
        return function(e) {
            return 0 > e ? -Math.pow(-e, t) : Math.pow(e, t)
        }
    }

    function ti() {
        return 0
    }

    function ei(t) {
        return t.innerRadius
    }

    function ni(t) {
        return t.outerRadius
    }

    function ri(t) {
        return t.startAngle
    }

    function ii(t) {
        return t.endAngle
    }

    function oi(t) {
        return t && t.padAngle
    }

    function ai(t, e, n, r) {
        return (t - n) * e - (e - r) * t > 0 ? 0 : 1
    }

    function ui(t, e, n, r, i) {
        var o = t[0] - e[0],
            a = t[1] - e[1],
            u = (i ? r : -r) / Math.sqrt(o * o + a * a),
            s = u * a,
            l = -u * o,
            c = t[0] + s,
            f = t[1] + l,
            h = e[0] + s,
            d = e[1] + l,
            p = (c + h) / 2,
            g = (f + d) / 2,
            v = h - c,
            y = d - f,
            m = v * v + y * y,
            x = n - r,
            b = c * d - h * f,
            w = (0 > y ? -1 : 1) * Math.sqrt(x * x * m - b * b),
            A = (b * y - v * w) / m,
            M = (-b * v - y * w) / m,
            k = (b * y + v * w) / m,
            _ = (-b * v + y * w) / m,
            C = A - p,
            T = M - g,
            E = k - p,
            S = _ - g;
        return C * C + T * T > E * E + S * S && (A = k, M = _), [
            [A - s, M - l],
            [A * n / x, M * n / x]
        ]
    }

    function si(t) {
        function e(e) {
            function a() {
                l.push("M", o(t(c), u))
            }
            for (var s, l = [], c = [], f = -1, h = e.length, d = wt(n), p = wt(r); ++f < h;) i.call(this, s = e[f], f) ? c.push([+d.call(this, s, f), +p.call(this, s, f)]) : c.length && (a(), c = []);
            return c.length && a(), l.length ? l.join("") : null
        }
        var n = an,
            r = un,
            i = ye,
            o = li,
            a = o.key,
            u = .7;
        return e.x = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.y = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e.defined = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e.interpolate = function(t) {
            return arguments.length ? (a = "function" == typeof t ? o = t : (o = su.get(t) || li).key, e) : a
        }, e.tension = function(t) {
            return arguments.length ? (u = t, e) : u
        }, e
    }

    function li(t) {
        return t.join("L")
    }

    function ci(t) {
        for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; ++e < n;) i.push("V", (r = t[e])[1], "H", r[0]);
        return i.join("")
    }

    function fi(t) {
        for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; ++e < n;) i.push("H", (r = t[e])[0], "V", r[1]);
        return i.join("")
    }

    function hi(t, e) {
        if (e.length < 1 || t.length != e.length && t.length != e.length + 2) return li(t);
        var n = t.length != e.length,
            r = "",
            i = t[0],
            o = t[1],
            a = e[0],
            u = a,
            s = 1;
        if (n && (r += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1], i = t[1], s = 2), e.length > 1) {
            u = e[1], o = t[s], s++, r += "C" + (i[0] + a[0]) + "," + (i[1] + a[1]) + "," + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1];
            for (var l = 2; l < e.length; l++, s++) o = t[s], u = e[l], r += "S" + (o[0] - u[0]) + "," + (o[1] - u[1]) + "," + o[0] + "," + o[1]
        }
        if (n) {
            var c = t[s];
            r += "Q" + (o[0] + 2 * u[0] / 3) + "," + (o[1] + 2 * u[1] / 3) + "," + c[0] + "," + c[1]
        }
        return r
    }

    function di(t, e) {
        for (var n, r = [], i = (1 - e) / 2, o = t[0], a = t[1], u = 1, s = t.length; ++u < s;) n = o, o = a, a = t[u], r.push([i * (a[0] - n[0]), i * (a[1] - n[1])]);
        return r
    }

    function pi(t) {
        if (t.length < 3) return li(t);
        var e = 1,
            n = t.length,
            r = t[0],
            i = r[0],
            o = r[1],
            a = [i, i, i, (r = t[1])[0]],
            u = [o, o, o, r[1]],
            s = [i, ",", o, "L", gi(fu, a), ",", gi(fu, u)];
        for (t.push(t[n - 1]); ++e <= n;) r = t[e], a.shift(), a.push(r[0]), u.shift(), u.push(r[1]), vi(s, a, u);
        return t.pop(), s.push("L", r), s.join("")
    }

    function gi(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
    }

    function vi(t, e, n) {
        t.push("C", gi(lu, e), ",", gi(lu, n), ",", gi(cu, e), ",", gi(cu, n), ",", gi(fu, e), ",", gi(fu, n))
    }

    function yi(t, e) {
        return (e[1] - t[1]) / (e[0] - t[0])
    }

    function mi(t) {
        for (var e, n, r, i, o = [], a = function(t) {
                for (var e = 0, n = t.length - 1, r = [], i = t[0], o = t[1], a = r[0] = yi(i, o); ++e < n;) r[e] = (a + (a = yi(i = o, o = t[e + 1]))) / 2;
                return r[e] = a, r
            }(t), u = -1, s = t.length - 1; ++u < s;) e = yi(t[u], t[u + 1]), Xi(e) < fo ? a[u] = a[u + 1] = 0 : (i = (n = a[u] / e) * n + (r = a[u + 1] / e) * r) > 9 && (i = 3 * e / Math.sqrt(i), a[u] = i * n, a[u + 1] = i * r);
        for (u = -1; ++u <= s;) i = (t[Math.min(s, u + 1)][0] - t[Math.max(0, u - 1)][0]) / (6 * (1 + a[u] * a[u])), o.push([i || 0, a[u] * i || 0]);
        return o
    }

    function xi(t) {
        for (var e, n, r, i = -1, o = t.length; ++i < o;) n = (e = t[i])[0], r = e[1] - yo, e[0] = n * Math.cos(r), e[1] = n * Math.sin(r);
        return t
    }

    function bi(t) {
        function e(e) {
            function s() {
                g.push("M", u(t(y), f), c, l(t(v.reverse()), f), "Z")
            }
            for (var h, d, p, g = [], v = [], y = [], m = -1, x = e.length, b = wt(n), w = wt(i), A = n === r ? function() {
                    return d
                } : wt(r), M = i === o ? function() {
                    return p
                } : wt(o); ++m < x;) a.call(this, h = e[m], m) ? (v.push([d = +b.call(this, h, m), p = +w.call(this, h, m)]), y.push([+A.call(this, h, m), +M.call(this, h, m)])) : v.length && (s(), v = [], y = []);
            return v.length && s(), g.length ? g.join("") : null
        }
        var n = an,
            r = an,
            i = 0,
            o = un,
            a = ye,
            u = li,
            s = u.key,
            l = u,
            c = "L",
            f = .7;
        return e.x = function(t) {
            return arguments.length ? (n = r = t, e) : r
        }, e.x0 = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.x1 = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e.y = function(t) {
            return arguments.length ? (i = o = t, e) : o
        }, e.y0 = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e.y1 = function(t) {
            return arguments.length ? (o = t, e) : o
        }, e.defined = function(t) {
            return arguments.length ? (a = t, e) : a
        }, e.interpolate = function(t) {
            return arguments.length ? (s = "function" == typeof t ? u = t : (u = su.get(t) || li).key, l = u.reverse || u, c = u.closed ? "M" : "L", e) : s
        }, e.tension = function(t) {
            return arguments.length ? (f = t, e) : f
        }, e
    }

    function wi(t) {
        return t.radius
    }

    function Ai(t) {
        return [t.x, t.y]
    }

    function Mi() {
        return 64
    }

    function ki() {
        return "circle"
    }

    function _i(t) {
        var e = Math.sqrt(t / po);
        return "M0," + e + "A" + e + "," + e + " 0 1,1 0," + -e + "A" + e + "," + e + " 0 1,1 0," + e + "Z"
    }

    function Ci(t) {
        return function() {
            var e, n;
            (e = this[t]) && (n = e[e.active]) && (--e.count ? delete e[e.active] : delete this[t], e.active += .5, n.event && n.event.interrupt.call(this, this.__data__, n.index))
        }
    }

    function Ti(t, e, n) {
        return to(t, mu), t.namespace = e, t.id = n, t
    }

    function Ei(t, e, n, r) {
        var i = t.id,
            o = t.namespace;
        return I(t, "function" == typeof n ? function(t, a, u) {
            t[o][i].tween.set(e, r(n.call(t, t.__data__, a, u)))
        } : (n = r(n), function(t) {
            t[o][i].tween.set(e, n)
        }))
    }

    function Si(t) {
        return null == t && (t = ""),
            function() {
                this.textContent = t
            }
    }

    function Ni(t) {
        return null == t ? "__transition__" : "__transition_" + t + "__"
    }

    function Di(t, e, n, r, i) {
        var o = t[n] || (t[n] = {
                active: 0,
                count: 0
            }),
            a = o[r];
        if (!a) {
            var u = i.time;
            a = o[r] = {
                tween: new s,
                time: u,
                delay: i.delay,
                duration: i.duration,
                ease: i.ease,
                index: e
            }, i = null, ++o.count, Fi.timer(function(i) {
                function s(n) {
                    if (o.active > r) return c();
                    var i = o[o.active];
                    i && (--o.count, delete o[o.active], i.event && i.event.interrupt.call(t, t.__data__, i.index)), o.active = r, a.event && a.event.start.call(t, t.__data__, e), a.tween.forEach(function(n, r) {
                        (r = r.call(t, t.__data__, e)) && g.push(r)
                    }), h = a.ease, f = a.duration, Fi.timer(function() {
                        return p.c = l(n || 1) ? ye : l, 1
                    }, 0, u)
                }

                function l(n) {
                    if (o.active !== r) return 1;
                    for (var i = n / f, u = h(i), s = g.length; s > 0;) g[--s].call(t, u);
                    return i >= 1 ? (a.event && a.event.end.call(t, t.__data__, e), c()) : void 0
                }

                function c() {
                    return --o.count ? delete o[r] : delete t[n], 1
                }
                var f, h, d = a.delay,
                    p = qo,
                    g = [];
                return p.t = d + u, i >= d ? s(i - d) : void(p.c = s)
            }, 0, u)
        }
    }

    function Li(t, e, n) {
        t.attr("transform", function(t) {
            var r = e(t);
            return "translate(" + (isFinite(r) ? r : n(t)) + ",0)"
        })
    }

    function Ri(t, e, n) {
        t.attr("transform", function(t) {
            var r = e(t);
            return "translate(0," + (isFinite(r) ? r : n(t)) + ")"
        })
    }

    function Oi(t) {
        return t.toISOString()
    }

    function $i(t, e, n) {
        function r(e) {
            return t(e)
        }

        function i(t, n) {
            var r = (t[1] - t[0]) / n,
                i = Fi.bisect(Tu, r);
            return i == Tu.length ? [e.year, Xr(t.map(function(t) {
                return t / 31536e6
            }), n)[2]] : i ? e[r / Tu[i - 1] < Tu[i] / r ? i - 1 : i] : [Nu, Xr(t, n)[2]]
        }
        return r.invert = function(e) {
            return ji(t.invert(e))
        }, r.domain = function(e) {
            return arguments.length ? (t.domain(e), r) : t.domain().map(ji)
        }, r.nice = function(t, e) {
            function n(n) {
                return !isNaN(n) && !t.range(n, ji(+n + 1), e).length
            }
            var o = r.domain(),
                a = zr(o),
                u = null == t ? i(a, 10) : "number" == typeof t && i(a, t);
            return u && (t = u[0], e = u[1]), r.domain(Wr(o, e > 1 ? {
                floor: function(e) {
                    for (; n(e = t.floor(e));) e = ji(e - 1);
                    return e
                },
                ceil: function(e) {
                    for (; n(e = t.ceil(e));) e = ji(+e + 1);
                    return e
                }
            } : t))
        }, r.ticks = function(t, e) {
            var n = zr(r.domain()),
                o = null == t ? i(n, 10) : "number" == typeof t ? i(n, t) : !t.range && [{
                    range: t
                }, e];
            return o && (t = o[0], e = o[1]), t.range(n[0], ji(+n[1] + 1), 1 > e ? 1 : e)
        }, r.tickFormat = function() {
            return n
        }, r.copy = function() {
            return $i(t.copy(), e, n)
        }, Vr(r, t)
    }

    function ji(t) {
        return new Date(t)
    }

    function Hi(t) {
        return JSON.parse(t.responseText)
    }

    function qi(t) {
        var e = zi.createRange();
        return e.selectNode(zi.body), e.createContextualFragment(t.responseText)
    }
    var Fi = {
            version: "3.5.5"
        },
        Pi = [].slice,
        Ii = function(t) {
            return Pi.call(t)
        },
        zi = this.document;
    if (zi) try {
        Ii(zi.documentElement.childNodes)[0].nodeType
    } catch (t) {
        Ii = function(t) {
            for (var e = t.length, n = new Array(e); e--;) n[e] = t[e];
            return n
        }
    }
    if (Date.now || (Date.now = function() {
            return +new Date
        }), zi) try {
        zi.createElement("DIV").style.setProperty("opacity", 0, "")
    } catch (t) {
        var Bi = this.Element.prototype,
            Ui = Bi.setAttribute,
            Wi = Bi.setAttributeNS,
            Yi = this.CSSStyleDeclaration.prototype,
            Vi = Yi.setProperty;
        Bi.setAttribute = function(t, e) {
            Ui.call(this, t, e + "")
        }, Bi.setAttributeNS = function(t, e, n) {
            Wi.call(this, t, e, n + "")
        }, Yi.setProperty = function(t, e, n) {
            Vi.call(this, t, e + "", n)
        }
    }
    Fi.ascending = n, Fi.descending = function(t, e) {
        return t > e ? -1 : e > t ? 1 : e >= t ? 0 : NaN
    }, Fi.min = function(t, e) {
        var n, r, i = -1,
            o = t.length;
        if (1 === arguments.length) {
            for (; ++i < o;)
                if (null != (r = t[i]) && r >= r) {
                    n = r;
                    break
                }
            for (; ++i < o;) null != (r = t[i]) && n > r && (n = r)
        } else {
            for (; ++i < o;)
                if (null != (r = e.call(t, t[i], i)) && r >= r) {
                    n = r;
                    break
                }
            for (; ++i < o;) null != (r = e.call(t, t[i], i)) && n > r && (n = r)
        }
        return n
    }, Fi.max = function(t, e) {
        var n, r, i = -1,
            o = t.length;
        if (1 === arguments.length) {
            for (; ++i < o;)
                if (null != (r = t[i]) && r >= r) {
                    n = r;
                    break
                }
            for (; ++i < o;) null != (r = t[i]) && r > n && (n = r)
        } else {
            for (; ++i < o;)
                if (null != (r = e.call(t, t[i], i)) && r >= r) {
                    n = r;
                    break
                }
            for (; ++i < o;) null != (r = e.call(t, t[i], i)) && r > n && (n = r)
        }
        return n
    }, Fi.extent = function(t, e) {
        var n, r, i, o = -1,
            a = t.length;
        if (1 === arguments.length) {
            for (; ++o < a;)
                if (null != (r = t[o]) && r >= r) {
                    n = i = r;
                    break
                }
            for (; ++o < a;) null != (r = t[o]) && (n > r && (n = r), r > i && (i = r))
        } else {
            for (; ++o < a;)
                if (null != (r = e.call(t, t[o], o)) && r >= r) {
                    n = i = r;
                    break
                }
            for (; ++o < a;) null != (r = e.call(t, t[o], o)) && (n > r && (n = r), r > i && (i = r))
        }
        return [n, i]
    }, Fi.sum = function(t, e) {
        var n, r = 0,
            o = t.length,
            a = -1;
        if (1 === arguments.length)
            for (; ++a < o;) i(n = +t[a]) && (r += n);
        else
            for (; ++a < o;) i(n = +e.call(t, t[a], a)) && (r += n);
        return r
    }, Fi.mean = function(t, e) {
        var n, o = 0,
            a = t.length,
            u = -1,
            s = a;
        if (1 === arguments.length)
            for (; ++u < a;) i(n = r(t[u])) ? o += n : --s;
        else
            for (; ++u < a;) i(n = r(e.call(t, t[u], u))) ? o += n : --s;
        return s ? o / s : void 0
    }, Fi.quantile = function(t, e) {
        var n = (t.length - 1) * e + 1,
            r = Math.floor(n),
            i = +t[r - 1],
            o = n - r;
        return o ? i + o * (t[r] - i) : i
    }, Fi.median = function(t, e) {
        var o, a = [],
            u = t.length,
            s = -1;
        if (1 === arguments.length)
            for (; ++s < u;) i(o = r(t[s])) && a.push(o);
        else
            for (; ++s < u;) i(o = r(e.call(t, t[s], s))) && a.push(o);
        return a.length ? Fi.quantile(a.sort(n), .5) : void 0
    }, Fi.variance = function(t, e) {
        var n, o, a = t.length,
            u = 0,
            s = 0,
            l = -1,
            c = 0;
        if (1 === arguments.length)
            for (; ++l < a;) i(n = r(t[l])) && (s += (o = n - u) * (n - (u += o / ++c)));
        else
            for (; ++l < a;) i(n = r(e.call(t, t[l], l))) && (s += (o = n - u) * (n - (u += o / ++c)));
        return c > 1 ? s / (c - 1) : void 0
    }, Fi.deviation = function() {
        var t = Fi.variance.apply(this, arguments);
        return t ? Math.sqrt(t) : t
    };
    var Gi = o(n);
    Fi.bisectLeft = Gi.left, Fi.bisect = Fi.bisectRight = Gi.right, Fi.bisector = function(t) {
        return o(1 === t.length ? function(e, r) {
            return n(t(e), r)
        } : t)
    }, Fi.shuffle = function(t, e, n) {
        (o = arguments.length) < 3 && (n = t.length, 2 > o && (e = 0));
        for (var r, i, o = n - e; o;) i = Math.random() * o-- | 0, r = t[o + e], t[o + e] = t[i + e], t[i + e] = r;
        return t
    }, Fi.permute = function(t, e) {
        for (var n = e.length, r = new Array(n); n--;) r[n] = t[e[n]];
        return r
    }, Fi.pairs = function(t) {
        for (var e = 0, n = t.length - 1, r = t[0], i = new Array(0 > n ? 0 : n); n > e;) i[e] = [r, r = t[++e]];
        return i
    }, Fi.zip = function() {
        if (!(r = arguments.length)) return [];
        for (var t = -1, e = Fi.min(arguments, a), n = new Array(e); ++t < e;)
            for (var r, i = -1, o = n[t] = new Array(r); ++i < r;) o[i] = arguments[i][t];
        return n
    }, Fi.transpose = function(t) {
        return Fi.zip.apply(Fi, t)
    }, Fi.keys = function(t) {
        var e = [];
        for (var n in t) e.push(n);
        return e
    }, Fi.values = function(t) {
        var e = [];
        for (var n in t) e.push(t[n]);
        return e
    }, Fi.entries = function(t) {
        var e = [];
        for (var n in t) e.push({
            key: n,
            value: t[n]
        });
        return e
    }, Fi.merge = function(t) {
        for (var e, n, r, i = t.length, o = -1, a = 0; ++o < i;) a += t[o].length;
        for (n = new Array(a); --i >= 0;)
            for (e = (r = t[i]).length; --e >= 0;) n[--a] = r[e];
        return n
    };
    var Xi = Math.abs;
    Fi.range = function(t, e, n) {
        if (arguments.length < 3 && (n = 1, arguments.length < 2 && (e = t, t = 0)), (e - t) / n == 1 / 0) throw new Error("infinite range");
        var r, i = [],
            o = function(t) {
                for (var e = 1; t * e % 1;) e *= 10;
                return e
            }(Xi(n)),
            a = -1;
        if (t *= o, e *= o, 0 > (n *= o))
            for (;
                (r = t + n * ++a) > e;) i.push(r / o);
        else
            for (;
                (r = t + n * ++a) < e;) i.push(r / o);
        return i
    }, Fi.map = function(t, e) {
        var n = new s;
        if (t instanceof s) t.forEach(function(t, e) {
            n.set(t, e)
        });
        else if (Array.isArray(t)) {
            var r, i = -1,
                o = t.length;
            if (1 === arguments.length)
                for (; ++i < o;) n.set(i, t[i]);
            else
                for (; ++i < o;) n.set(e.call(t, r = t[i], i), r)
        } else
            for (var a in t) n.set(a, t[a]);
        return n
    };
    var Zi = "__proto__",
        Qi = "\0";
    u(s, {
        has: f,
        get: function(t) {
            return this._[l(t)]
        },
        set: function(t, e) {
            return this._[l(t)] = e
        },
        remove: h,
        keys: d,
        values: function() {
            var t = [];
            for (var e in this._) t.push(this._[e]);
            return t
        },
        entries: function() {
            var t = [];
            for (var e in this._) t.push({
                key: c(e),
                value: this._[e]
            });
            return t
        },
        size: p,
        empty: g,
        forEach: function(t) {
            for (var e in this._) t.call(this, c(e), this._[e])
        }
    }), Fi.nest = function() {
        function t(o, a, u) {
            if (u >= i.length) return n ? n.call(r, a) : e ? a.sort(e) : a;
            for (var l, c, f, h, d = -1, p = a.length, g = i[u++], v = new s; ++d < p;)(h = v.get(l = g(c = a[d]))) ? h.push(c) : v.set(l, [c]);
            return o ? (c = o(), f = function(e, n) {
                c.set(e, t(o, n, u))
            }) : (c = {}, f = function(e, n) {
                c[e] = t(o, n, u)
            }), v.forEach(f), c
        }
        var e, n, r = {},
            i = [],
            o = [];
        return r.map = function(e, n) {
            return t(n, e, 0)
        }, r.entries = function(e) {
            return function t(e, n) {
                if (n >= i.length) return e;
                var r = [],
                    a = o[n++];
                return e.forEach(function(e, i) {
                    r.push({
                        key: e,
                        values: t(i, n)
                    })
                }), a ? r.sort(function(t, e) {
                    return a(t.key, e.key)
                }) : r
            }(t(Fi.map, e, 0), 0)
        }, r.key = function(t) {
            return i.push(t), r
        }, r.sortKeys = function(t) {
            return o[i.length - 1] = t, r
        }, r.sortValues = function(t) {
            return e = t, r
        }, r.rollup = function(t) {
            return n = t, r
        }, r
    }, Fi.set = function(t) {
        var e = new v;
        if (t)
            for (var n = 0, r = t.length; r > n; ++n) e.add(t[n]);
        return e
    }, u(v, {
        has: f,
        add: function(t) {
            return this._[l(t += "")] = !0, t
        },
        remove: h,
        values: d,
        size: p,
        empty: g,
        forEach: function(t) {
            for (var e in this._) t.call(this, c(e))
        }
    }), Fi.behavior = {}, Fi.rebind = function(t, e) {
        for (var n, r = 1, i = arguments.length; ++r < i;) t[n = arguments[r]] = m(t, e, e[n]);
        return t
    };
    var Ki = ["webkit", "ms", "moz", "Moz", "o", "O"];
    Fi.dispatch = function() {
        for (var t = new w, e = -1, n = arguments.length; ++e < n;) t[arguments[e]] = A(t);
        return t
    }, w.prototype.on = function(t, e) {
        var n = t.indexOf("."),
            r = "";
        if (n >= 0 && (r = t.slice(n + 1), t = t.slice(0, n)), t) return arguments.length < 2 ? this[t].on(r) : this[t].on(r, e);
        if (2 === arguments.length) {
            if (null == e)
                for (t in this) this.hasOwnProperty(t) && this[t].on(r, null);
            return this
        }
    }, Fi.event = null, Fi.requote = function(t) {
        return t.replace(Ji, "\\$&")
    };
    var Ji = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
        to = {}.__proto__ ? function(t, e) {
            t.__proto__ = e
        } : function(t, e) {
            for (var n in e) t[n] = e[n]
        },
        eo = function(t, e) {
            return e.querySelector(t)
        },
        no = function(t, e) {
            return e.querySelectorAll(t)
        },
        ro = function(t, e) {
            var n = t.matches || t[x(t, "matchesSelector")];
            return (ro = function(t, e) {
                return n.call(t, e)
            })(t, e)
        };
    "function" == typeof Sizzle && (eo = function(t, e) {
        return Sizzle(t, e)[0] || null
    }, no = Sizzle, ro = Sizzle.matchesSelector), Fi.selection = function() {
        return Fi.select(zi.documentElement)
    };
    var io = Fi.selection.prototype = [];
    io.select = function(t) {
        var e, n, r, i, o = [];
        t = T(t);
        for (var a = -1, u = this.length; ++a < u;) {
            o.push(e = []), e.parentNode = (r = this[a]).parentNode;
            for (var s = -1, l = r.length; ++s < l;)(i = r[s]) ? (e.push(n = t.call(i, i.__data__, s, a)), n && "__data__" in i && (n.__data__ = i.__data__)) : e.push(null)
        }
        return C(o)
    }, io.selectAll = function(t) {
        var e, n, r = [];
        t = E(t);
        for (var i = -1, o = this.length; ++i < o;)
            for (var a = this[i], u = -1, s = a.length; ++u < s;)(n = a[u]) && (r.push(e = Ii(t.call(n, n.__data__, u, i))), e.parentNode = n);
        return C(r)
    };
    var oo = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    Fi.ns = {
        prefix: oo,
        qualify: function(t) {
            var e = t.indexOf(":"),
                n = t;
            return e >= 0 && (n = t.slice(0, e), t = t.slice(e + 1)), oo.hasOwnProperty(n) ? {
                space: oo[n],
                local: t
            } : t
        }
    }, io.attr = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var n = this.node();
                return (t = Fi.ns.qualify(t)).local ? n.getAttributeNS(t.space, t.local) : n.getAttribute(t)
            }
            for (e in t) this.each(S(e, t[e]));
            return this
        }
        return this.each(S(t, e))
    }, io.classed = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var n = this.node(),
                    r = (t = L(t)).length,
                    i = -1;
                if (e = n.classList) {
                    for (; ++i < r;)
                        if (!e.contains(t[i])) return !1
                } else
                    for (e = n.getAttribute("class"); ++i < r;)
                        if (!D(t[i]).test(e)) return !1; return !0
            }
            for (e in t) this.each(R(e, t[e]));
            return this
        }
        return this.each(R(t, e))
    }, io.style = function(t, n, r) {
        var i = arguments.length;
        if (3 > i) {
            if ("string" != typeof t) {
                for (r in 2 > i && (n = ""), t) this.each($(r, t[r], n));
                return this
            }
            if (2 > i) {
                var o = this.node();
                return e(o).getComputedStyle(o, null).getPropertyValue(t)
            }
            r = ""
        }
        return this.each($(t, n, r))
    }, io.property = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) return this.node()[t];
            for (e in t) this.each(j(e, t[e]));
            return this
        }
        return this.each(j(t, e))
    }, io.text = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            this.textContent = null == e ? "" : e
        } : null == t ? function() {
            this.textContent = ""
        } : function() {
            this.textContent = t
        }) : this.node().textContent
    }, io.html = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            this.innerHTML = null == e ? "" : e
        } : null == t ? function() {
            this.innerHTML = ""
        } : function() {
            this.innerHTML = t
        }) : this.node().innerHTML
    }, io.append = function(t) {
        return t = H(t), this.select(function() {
            return this.appendChild(t.apply(this, arguments))
        })
    }, io.insert = function(t, e) {
        return t = H(t), e = T(e), this.select(function() {
            return this.insertBefore(t.apply(this, arguments), e.apply(this, arguments) || null)
        })
    }, io.remove = function() {
        return this.each(q)
    }, io.data = function(t, e) {
        function n(t, n) {
            var r, i, o, a = t.length,
                f = n.length,
                h = Math.min(a, f),
                d = new Array(f),
                p = new Array(f),
                g = new Array(a);
            if (e) {
                var v, y = new s,
                    m = new Array(a);
                for (r = -1; ++r < a;) y.has(v = e.call(i = t[r], i.__data__, r)) ? g[r] = i : y.set(v, i), m[r] = v;
                for (r = -1; ++r < f;)(i = y.get(v = e.call(n, o = n[r], r))) ? !0 !== i && (d[r] = i, i.__data__ = o) : p[r] = F(o), y.set(v, !0);
                for (r = -1; ++r < a;) !0 !== y.get(m[r]) && (g[r] = t[r])
            } else {
                for (r = -1; ++r < h;) i = t[r], o = n[r], i ? (i.__data__ = o, d[r] = i) : p[r] = F(o);
                for (; f > r; ++r) p[r] = F(n[r]);
                for (; a > r; ++r) g[r] = t[r]
            }
            p.update = d, p.parentNode = d.parentNode = g.parentNode = t.parentNode, u.push(p), l.push(d), c.push(g)
        }
        var r, i, o = -1,
            a = this.length;
        if (!arguments.length) {
            for (t = new Array(a = (r = this[0]).length); ++o < a;)(i = r[o]) && (t[o] = i.__data__);
            return t
        }
        var u = z([]),
            l = C([]),
            c = C([]);
        if ("function" == typeof t)
            for (; ++o < a;) n(r = this[o], t.call(r, r.parentNode.__data__, o));
        else
            for (; ++o < a;) n(r = this[o], t);
        return l.enter = function() {
            return u
        }, l.exit = function() {
            return c
        }, l
    }, io.datum = function(t) {
        return arguments.length ? this.property("__data__", t) : this.property("__data__")
    }, io.filter = function(t) {
        var e, n, r, i = [];
        "function" != typeof t && (t = P(t));
        for (var o = 0, a = this.length; a > o; o++) {
            i.push(e = []), e.parentNode = (n = this[o]).parentNode;
            for (var u = 0, s = n.length; s > u; u++)(r = n[u]) && t.call(r, r.__data__, u, o) && e.push(r)
        }
        return C(i)
    }, io.order = function() {
        for (var t = -1, e = this.length; ++t < e;)
            for (var n, r = this[t], i = r.length - 1, o = r[i]; --i >= 0;)(n = r[i]) && (o && o !== n.nextSibling && o.parentNode.insertBefore(n, o), o = n);
        return this
    }, io.sort = function(t) {
        t = function(t) {
            return arguments.length || (t = n),
                function(e, n) {
                    return e && n ? t(e.__data__, n.__data__) : !e - !n
                }
        }.apply(this, arguments);
        for (var e = -1, r = this.length; ++e < r;) this[e].sort(t);
        return this.order()
    }, io.each = function(t) {
        return I(this, function(e, n, r) {
            t.call(e, e.__data__, n, r)
        })
    }, io.call = function(t) {
        var e = Ii(arguments);
        return t.apply(e[0] = this, e), this
    }, io.empty = function() {
        return !this.node()
    }, io.node = function() {
        for (var t = 0, e = this.length; e > t; t++)
            for (var n = this[t], r = 0, i = n.length; i > r; r++) {
                var o = n[r];
                if (o) return o
            }
        return null
    }, io.size = function() {
        var t = 0;
        return I(this, function() {
            ++t
        }), t
    };
    var ao = [];
    Fi.selection.enter = z, Fi.selection.enter.prototype = ao, ao.append = io.append, ao.empty = io.empty, ao.node = io.node, ao.call = io.call, ao.size = io.size, ao.select = function(t) {
        for (var e, n, r, i, o, a = [], u = -1, s = this.length; ++u < s;) {
            r = (i = this[u]).update, a.push(e = []), e.parentNode = i.parentNode;
            for (var l = -1, c = i.length; ++l < c;)(o = i[l]) ? (e.push(r[l] = n = t.call(i.parentNode, o.__data__, l, u)), n.__data__ = o.__data__) : e.push(null)
        }
        return C(a)
    }, ao.insert = function(t, e) {
        return arguments.length < 2 && (n = this, e = function(t, e, o) {
            var a, u = n[o].update,
                s = u.length;
            for (o != i && (i = o, r = 0), e >= r && (r = e + 1); !(a = u[r]) && ++r < s;);
            return a
        }), io.insert.call(this, t, e);
        var n, r, i
    }, Fi.select = function(e) {
        var n;
        return "string" == typeof e ? (n = [eo(e, zi)]).parentNode = zi.documentElement : (n = [e]).parentNode = t(e), C([n])
    }, Fi.selectAll = function(t) {
        var e;
        return "string" == typeof t ? (e = Ii(no(t, zi))).parentNode = zi.documentElement : (e = t).parentNode = null, C([e])
    }, io.on = function(t, e, n) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                for (n in 2 > r && (e = !1), t) this.each(B(n, t[n], e));
                return this
            }
            if (2 > r) return (r = this.node()["__on" + t]) && r._;
            n = !1
        }
        return this.each(B(t, e, n))
    };
    var uo = Fi.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    zi && uo.forEach(function(t) {
        "on" + t in zi && uo.remove(t)
    });
    var so, lo = 0;
    Fi.mouse = function(t) {
        return V(t, k())
    };
    var co = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
    Fi.touch = function(t, e, n) {
        if (arguments.length < 3 && (n = e, e = k().changedTouches), e)
            for (var r, i = 0, o = e.length; o > i; ++i)
                if ((r = e[i]).identifier === n) return V(t, r)
    }, Fi.behavior.drag = function() {
        function t() {
            this.on("mousedown.drag", o).on("touchstart.drag", a)
        }

        function n(t, e, n, o, a) {
            return function() {
                var u, s = Fi.event.target,
                    l = this.parentNode,
                    c = r.of(this, arguments),
                    f = 0,
                    h = t(),
                    d = ".drag" + (null == h ? "" : "-" + h),
                    p = Fi.select(n(s)).on(o + d, function() {
                        var t, n, r = e(l, h);
                        r && (t = r[0] - v[0], n = r[1] - v[1], f |= t | n, v = r, c({
                            type: "drag",
                            x: r[0] + u[0],
                            y: r[1] + u[1],
                            dx: t,
                            dy: n
                        }))
                    }).on(a + d, function() {
                        e(l, h) && (p.on(o + d, null).on(a + d, null), g(f && Fi.event.target === s), c({
                            type: "dragend"
                        }))
                    }),
                    g = Y(s),
                    v = e(l, h);
                i ? u = [(u = i.apply(this, arguments)).x - v[0], u.y - v[1]] : u = [0, 0], c({
                    type: "dragstart"
                })
            }
        }
        var r = _(t, "drag", "dragstart", "dragend"),
            i = null,
            o = n(b, Fi.mouse, e, "mousemove", "mouseup"),
            a = n(G, Fi.touch, y, "touchmove", "touchend");
        return t.origin = function(e) {
            return arguments.length ? (i = e, t) : i
        }, Fi.rebind(t, r, "on")
    }, Fi.touches = function(t, e) {
        return arguments.length < 2 && (e = k().touches), e ? Ii(e).map(function(e) {
            var n = V(t, e);
            return n.identifier = e.identifier, n
        }) : []
    };
    var fo = 1e-6,
        ho = fo * fo,
        po = Math.PI,
        go = 2 * po,
        vo = go - fo,
        yo = po / 2,
        mo = po / 180,
        xo = 180 / po,
        bo = Math.SQRT2,
        wo = 2;
    Fi.interpolateZoom = function(t, e) {
        function n(t) {
            var e, n, a = t * y;
            if (v) {
                var u = J(g),
                    s = o / (wo * h) * (u * (n = bo * a + g, ((n = Math.exp(2 * n)) - 1) / (n + 1)) - (e = g, ((e = Math.exp(e)) - 1 / e) / 2));
                return [r + s * l, i + s * c, o * u / J(bo * a + g)]
            }
            return [r + t * l, i + t * c, o * Math.exp(bo * a)]
        }
        var r = t[0],
            i = t[1],
            o = t[2],
            a = e[0],
            u = e[1],
            s = e[2],
            l = a - r,
            c = u - i,
            f = l * l + c * c,
            h = Math.sqrt(f),
            d = (s * s - o * o + 4 * f) / (2 * o * wo * h),
            p = (s * s - o * o - 4 * f) / (2 * s * wo * h),
            g = Math.log(Math.sqrt(d * d + 1) - d),
            v = Math.log(Math.sqrt(p * p + 1) - p) - g,
            y = (v || Math.log(s / o)) / bo;
        return n.duration = 1e3 * y, n
    }, Fi.behavior.zoom = function() {
        function t(t) {
            t.on(N, c).on(Mo + ".zoom", h).on("dblclick.zoom", d).on(R, f)
        }

        function n(t) {
            return [(t[0] - k.x) / k.k, (t[1] - k.y) / k.k]
        }

        function r(t) {
            k.k = Math.max(T[0], Math.min(T[1], t))
        }

        function i(t, e) {
            var n;
            e = [(n = e)[0] * k.k + k.x, n[1] * k.k + k.y], k.x += t[0] - e[0], k.y += t[1] - e[1]
        }

        function o(e, n, o, a) {
            e.__chart__ = {
                x: k.x,
                y: k.y,
                k: k.k
            }, r(Math.pow(2, a)), i(g = n, o), e = Fi.select(e), E > 0 && (e = e.transition().duration(E)), e.call(t.event)
        }

        function a() {
            b && b.domain(x.range().map(function(t) {
                return (t - k.x) / k.k
            }).map(x.invert)), A && A.domain(w.range().map(function(t) {
                return (t - k.y) / k.k
            }).map(w.invert))
        }

        function u(t) {
            S++ || t({
                type: "zoomstart"
            })
        }

        function s(t) {
            a(), t({
                type: "zoom",
                scale: k.k,
                translate: [k.x, k.y]
            })
        }

        function l(t) {
            --S || t({
                type: "zoomend"
            }), g = null
        }

        function c() {
            var t = this,
                r = Fi.event.target,
                o = O.of(t, arguments),
                a = 0,
                c = Fi.select(e(t)).on(D, function() {
                    a = 1, i(Fi.mouse(t), f), s(o)
                }).on(L, function() {
                    c.on(D, null).on(L, null), h(a && Fi.event.target === r), l(o)
                }),
                f = n(Fi.mouse(t)),
                h = Y(t);
            yu.call(t), u(o)
        }

        function f() {
            function t() {
                var t = Fi.touches(p);
                return d = k.k, t.forEach(function(t) {
                    t.identifier in v && (v[t.identifier] = n(t))
                }), t
            }

            function e() {
                var e = Fi.event.target;
                Fi.select(e).on(b, a).on(w, h), A.push(e);
                for (var n = Fi.event.changedTouches, r = 0, i = n.length; i > r; ++r) v[n[r].identifier] = null;
                var u = t(),
                    s = Date.now();
                if (1 === u.length) {
                    if (500 > s - m) {
                        var l = u[0];
                        o(p, l, v[l.identifier], Math.floor(Math.log(k.k) / Math.LN2) + 1), M()
                    }
                    m = s
                } else if (u.length > 1) {
                    l = u[0];
                    var c = u[1],
                        f = l[0] - c[0],
                        d = l[1] - c[1];
                    y = f * f + d * d
                }
            }

            function a() {
                var t, e, n, o, a = Fi.touches(p);
                yu.call(p);
                for (var u = 0, l = a.length; l > u; ++u, o = null)
                    if (n = a[u], o = v[n.identifier]) {
                        if (e) break;
                        t = n, e = o
                    }
                if (o) {
                    var c = (c = n[0] - t[0]) * c + (c = n[1] - t[1]) * c,
                        f = y && Math.sqrt(c / y);
                    t = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], r(f * d)
                }
                m = null, i(t, e), s(g)
            }

            function h() {
                if (Fi.event.touches.length) {
                    for (var e = Fi.event.changedTouches, n = 0, r = e.length; r > n; ++n) delete v[e[n].identifier];
                    for (var i in v) return void t()
                }
                Fi.selectAll(A).on(x, null), _.on(N, c).on(R, f), C(), l(g)
            }
            var d, p = this,
                g = O.of(p, arguments),
                v = {},
                y = 0,
                x = ".zoom-" + Fi.event.changedTouches[0].identifier,
                b = "touchmove" + x,
                w = "touchend" + x,
                A = [],
                _ = Fi.select(p),
                C = Y(p);
            e(), u(g), _.on(N, null).on(R, e)
        }

        function h() {
            var t = O.of(this, arguments);
            y ? clearTimeout(y) : (p = n(g = v || Fi.mouse(this)), yu.call(this), u(t)), y = setTimeout(function() {
                y = null, l(t)
            }, 50), M(), r(Math.pow(2, .002 * Ao()) * k.k), i(g, p), s(t)
        }

        function d() {
            var t = Fi.mouse(this),
                e = Math.log(k.k) / Math.LN2;
            o(this, t, n(t), Fi.event.shiftKey ? Math.ceil(e) - 1 : Math.floor(e) + 1)
        }
        var p, g, v, y, m, x, b, w, A, k = {
                x: 0,
                y: 0,
                k: 1
            },
            C = [960, 500],
            T = ko,
            E = 250,
            S = 0,
            N = "mousedown.zoom",
            D = "mousemove.zoom",
            L = "mouseup.zoom",
            R = "touchstart.zoom",
            O = _(t, "zoomstart", "zoom", "zoomend");
        return Mo || (Mo = "onwheel" in zi ? (Ao = function() {
            return -Fi.event.deltaY * (Fi.event.deltaMode ? 120 : 1)
        }, "wheel") : "onmousewheel" in zi ? (Ao = function() {
            return Fi.event.wheelDelta
        }, "mousewheel") : (Ao = function() {
            return -Fi.event.detail
        }, "MozMousePixelScroll")), t.event = function(t) {
            t.each(function() {
                var t = O.of(this, arguments),
                    e = k;
                gu ? Fi.select(this).transition().each("start.zoom", function() {
                    k = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    }, u(t)
                }).tween("zoom:zoom", function() {
                    var n = C[0],
                        r = C[1],
                        i = g ? g[0] : n / 2,
                        o = g ? g[1] : r / 2,
                        a = Fi.interpolateZoom([(i - k.x) / k.k, (o - k.y) / k.k, n / k.k], [(i - e.x) / e.k, (o - e.y) / e.k, n / e.k]);
                    return function(e) {
                        var r = a(e),
                            u = n / r[2];
                        this.__chart__ = k = {
                            x: i - r[0] * u,
                            y: o - r[1] * u,
                            k: u
                        }, s(t)
                    }
                }).each("interrupt.zoom", function() {
                    l(t)
                }).each("end.zoom", function() {
                    l(t)
                }) : (this.__chart__ = k, u(t), s(t), l(t))
            })
        }, t.translate = function(e) {
            return arguments.length ? (k = {
                x: +e[0],
                y: +e[1],
                k: k.k
            }, a(), t) : [k.x, k.y]
        }, t.scale = function(e) {
            return arguments.length ? (k = {
                x: k.x,
                y: k.y,
                k: +e
            }, a(), t) : k.k
        }, t.scaleExtent = function(e) {
            return arguments.length ? (T = null == e ? ko : [+e[0], +e[1]], t) : T
        }, t.center = function(e) {
            return arguments.length ? (v = e && [+e[0], +e[1]], t) : v
        }, t.size = function(e) {
            return arguments.length ? (C = e && [+e[0], +e[1]], t) : C
        }, t.duration = function(e) {
            return arguments.length ? (E = +e, t) : E
        }, t.x = function(e) {
            return arguments.length ? (b = e, x = e.copy(), k = {
                x: 0,
                y: 0,
                k: 1
            }, t) : b
        }, t.y = function(e) {
            return arguments.length ? (A = e, w = e.copy(), k = {
                x: 0,
                y: 0,
                k: 1
            }, t) : A
        }, Fi.rebind(t, O, "on")
    };
    var Ao, Mo, ko = [0, 1 / 0];
    Fi.color = et, et.prototype.toString = function() {
        return this.rgb() + ""
    }, Fi.hsl = nt;
    var _o = nt.prototype = new et;
    _o.brighter = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), new nt(this.h, this.s, this.l / t)
    }, _o.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), new nt(this.h, this.s, t * this.l)
    }, _o.rgb = function() {
        return rt(this.h, this.s, this.l)
    }, Fi.hcl = it;
    var Co = it.prototype = new et;
    Co.brighter = function(t) {
        return new it(this.h, this.c, Math.min(100, this.l + To * (arguments.length ? t : 1)))
    }, Co.darker = function(t) {
        return new it(this.h, this.c, Math.max(0, this.l - To * (arguments.length ? t : 1)))
    }, Co.rgb = function() {
        return ot(this.h, this.c, this.l).rgb()
    }, Fi.lab = at;
    var To = 18,
        Eo = .95047,
        So = 1,
        No = 1.08883,
        Do = at.prototype = new et;
    Do.brighter = function(t) {
        return new at(Math.min(100, this.l + To * (arguments.length ? t : 1)), this.a, this.b)
    }, Do.darker = function(t) {
        return new at(Math.max(0, this.l - To * (arguments.length ? t : 1)), this.a, this.b)
    }, Do.rgb = function() {
        return ut(this.l, this.a, this.b)
    }, Fi.rgb = ht;
    var Lo = ht.prototype = new et;
    Lo.brighter = function(t) {
        t = Math.pow(.7, arguments.length ? t : 1);
        var e = this.r,
            n = this.g,
            r = this.b;
        return e || n || r ? (e && 30 > e && (e = 30), n && 30 > n && (n = 30), r && 30 > r && (r = 30), new ht(Math.min(255, e / t), Math.min(255, n / t), Math.min(255, r / t))) : new ht(30, 30, 30)
    }, Lo.darker = function(t) {
        return new ht((t = Math.pow(.7, arguments.length ? t : 1)) * this.r, t * this.g, t * this.b)
    }, Lo.hsl = function() {
        return yt(this.r, this.g, this.b)
    }, Lo.toString = function() {
        return "#" + gt(this.r) + gt(this.g) + gt(this.b)
    };
    var Ro = Fi.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    Ro.forEach(function(t, e) {
        Ro.set(t, dt(e))
    }), Fi.functor = wt, Fi.xhr = At(y), Fi.dsv = function(t, e) {
        function n(t, n, o) {
            arguments.length < 3 && (o = n, n = null);
            var a = Mt(t, e, null == n ? r : i(n), o);
            return a.row = function(t) {
                return arguments.length ? a.response(null == (n = t) ? r : i(t)) : n
            }, a
        }

        function r(t) {
            return n.parse(t.responseText)
        }

        function i(t) {
            return function(e) {
                return n.parse(e.responseText, t)
            }
        }

        function o(e) {
            return e.map(a).join(t)
        }

        function a(t) {
            return u.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
        }
        var u = new RegExp('["' + t + "\n]"),
            s = t.charCodeAt(0);
        return n.parse = function(t, e) {
            var r;
            return n.parseRows(t, function(t, n) {
                if (r) return r(t, n - 1);
                var i = new Function("d", "return {" + t.map(function(t, e) {
                    return JSON.stringify(t) + ": d[" + e + "]"
                }).join(",") + "}");
                r = e ? function(t, n) {
                    return e(i(t), n)
                } : i
            })
        }, n.parseRows = function(t, e) {
            function n() {
                if (c >= l) return a;
                if (i) return i = !1, o;
                var e = c;
                if (34 === t.charCodeAt(e)) {
                    for (var n = e; n++ < l;)
                        if (34 === t.charCodeAt(n)) {
                            if (34 !== t.charCodeAt(n + 1)) break;
                            ++n
                        }
                    return c = n + 2, 13 === (r = t.charCodeAt(n + 1)) ? (i = !0, 10 === t.charCodeAt(n + 2) && ++c) : 10 === r && (i = !0), t.slice(e + 1, n).replace(/""/g, '"')
                }
                for (; l > c;) {
                    var r, u = 1;
                    if (10 === (r = t.charCodeAt(c++))) i = !0;
                    else if (13 === r) i = !0, 10 === t.charCodeAt(c) && (++c, ++u);
                    else if (r !== s) continue;
                    return t.slice(e, c - u)
                }
                return t.slice(e)
            }
            for (var r, i, o = {}, a = {}, u = [], l = t.length, c = 0, f = 0;
                (r = n()) !== a;) {
                for (var h = []; r !== o && r !== a;) h.push(r), r = n();
                e && null == (h = e(h, f++)) || u.push(h)
            }
            return u
        }, n.format = function(e) {
            if (Array.isArray(e[0])) return n.formatRows(e);
            var r = new v,
                i = [];
            return e.forEach(function(t) {
                for (var e in t) r.has(e) || i.push(r.add(e))
            }), [i.map(a).join(t)].concat(e.map(function(e) {
                return i.map(function(t) {
                    return a(e[t])
                }).join(t)
            })).join("\n")
        }, n.formatRows = function(t) {
            return t.map(o).join("\n")
        }, n
    }, Fi.csv = Fi.dsv(",", "text/csv"), Fi.tsv = Fi.dsv("\t", "text/tab-separated-values");
    var Oo, $o, jo, Ho, qo, Fo = this[x(this, "requestAnimationFrame")] || function(t) {
        setTimeout(t, 17)
    };
    Fi.timer = function(t, e, n) {
        var r = arguments.length;
        2 > r && (e = 0), 3 > r && (n = Date.now());
        var i = {
            c: t,
            t: n + e,
            f: !1,
            n: null
        };
        $o ? $o.n = i : Oo = i, $o = i, jo || (Ho = clearTimeout(Ho), jo = 1, Fo(kt))
    }, Fi.timer.flush = function() {
        _t(), Ct()
    }, Fi.round = function(t, e) {
        return e ? Math.round(t * (e = Math.pow(10, e))) / e : Math.round(t)
    };
    var Po = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(function(t, e) {
        var n = Math.pow(10, 3 * Xi(8 - e));
        return {
            scale: e > 8 ? function(t) {
                return t / n
            } : function(t) {
                return t * n
            },
            symbol: t
        }
    });
    Fi.formatPrefix = function(t, e) {
        var n = 0;
        return t && (0 > t && (t *= -1), e && (t = Fi.round(t, Tt(t, e))), n = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), n = Math.max(-24, Math.min(24, 3 * Math.floor((n - 1) / 3)))), Po[8 + n / 3]
    };
    var Io = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
        zo = Fi.map({
            b: function(t) {
                return t.toString(2)
            },
            c: function(t) {
                return String.fromCharCode(t)
            },
            o: function(t) {
                return t.toString(8)
            },
            x: function(t) {
                return t.toString(16)
            },
            X: function(t) {
                return t.toString(16).toUpperCase()
            },
            g: function(t, e) {
                return t.toPrecision(e)
            },
            e: function(t, e) {
                return t.toExponential(e)
            },
            f: function(t, e) {
                return t.toFixed(e)
            },
            r: function(t, e) {
                return (t = Fi.round(t, Tt(t, e))).toFixed(Math.max(0, Math.min(20, Tt(t * (1 + 1e-15), e))))
            }
        }),
        Bo = Fi.time = {},
        Uo = Date;
    St.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            Wo.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            Wo.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            Wo.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            Wo.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            Wo.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            Wo.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            Wo.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            Wo.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            Wo.setTime.apply(this._, arguments)
        }
    };
    var Wo = Date.prototype;
    Bo.year = Nt(function(t) {
        return (t = Bo.day(t)).setMonth(0, 1), t
    }, function(t, e) {
        t.setFullYear(t.getFullYear() + e)
    }, function(t) {
        return t.getFullYear()
    }), Bo.years = Bo.year.range, Bo.years.utc = Bo.year.utc.range, Bo.day = Nt(function(t) {
        var e = new Uo(2e3, 0);
        return e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), e
    }, function(t, e) {
        t.setDate(t.getDate() + e)
    }, function(t) {
        return t.getDate() - 1
    }), Bo.days = Bo.day.range, Bo.days.utc = Bo.day.utc.range, Bo.dayOfYear = function(t) {
        var e = Bo.year(t);
        return Math.floor((t - e - 6e4 * (t.getTimezoneOffset() - e.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(t, e) {
        e = 7 - e;
        var n = Bo[t] = Nt(function(t) {
            return (t = Bo.day(t)).setDate(t.getDate() - (t.getDay() + e) % 7), t
        }, function(t, e) {
            t.setDate(t.getDate() + 7 * Math.floor(e))
        }, function(t) {
            var n = Bo.year(t).getDay();
            return Math.floor((Bo.dayOfYear(t) + (n + e) % 7) / 7) - (n !== e)
        });
        Bo[t + "s"] = n.range, Bo[t + "s"].utc = n.utc.range, Bo[t + "OfYear"] = function(t) {
            var n = Bo.year(t).getDay();
            return Math.floor((Bo.dayOfYear(t) + (n + e) % 7) / 7)
        }
    }), Bo.week = Bo.sunday, Bo.weeks = Bo.sunday.range, Bo.weeks.utc = Bo.sunday.utc.range, Bo.weekOfYear = Bo.sundayOfYear;
    var Yo = {
            "-": "",
            _: " ",
            0: "0"
        },
        Vo = /^\s*\d+/,
        Go = /^%/;
    Fi.locale = function(t) {
        return {
            numberFormat: (e = t, n = e.decimal, r = e.thousands, i = e.grouping, o = e.currency, a = i && r ? function(t, e) {
                for (var n = t.length, o = [], a = 0, u = i[0], s = 0; n > 0 && u > 0 && (s + u + 1 > e && (u = Math.max(1, e - s)), o.push(t.substring(n -= u, n + u)), !((s += u + 1) > e));) u = i[a = (a + 1) % i.length];
                return o.reverse().join(r)
            } : y, function(t) {
                var e = Io.exec(t),
                    r = e[1] || " ",
                    i = e[2] || ">",
                    u = e[3] || "-",
                    s = e[4] || "",
                    l = e[5],
                    c = +e[6],
                    f = e[7],
                    h = e[8],
                    d = e[9],
                    p = 1,
                    g = "",
                    v = "",
                    y = !1,
                    m = !0;
                switch (h && (h = +h.substring(1)), (l || "0" === r && "=" === i) && (l = r = "0", i = "="), d) {
                    case "n":
                        f = !0, d = "g";
                        break;
                    case "%":
                        p = 100, v = "%", d = "f";
                        break;
                    case "p":
                        p = 100, v = "%", d = "r";
                        break;
                    case "b":
                    case "o":
                    case "x":
                    case "X":
                        "#" === s && (g = "0" + d.toLowerCase());
                    case "c":
                        m = !1;
                    case "d":
                        y = !0, h = 0;
                        break;
                    case "s":
                        p = -1, d = "r"
                }
                "$" === s && (g = o[0], v = o[1]), "r" != d || h || (d = "g"), null != h && ("g" == d ? h = Math.max(1, Math.min(21, h)) : ("e" == d || "f" == d) && (h = Math.max(0, Math.min(20, h)))), d = zo.get(d) || Et;
                var x = l && f;
                return function(t) {
                    var e = v;
                    if (y && t % 1) return "";
                    var o = 0 > t || 0 === t && 0 > 1 / t ? (t = -t, "-") : "-" === u ? "" : u;
                    if (0 > p) {
                        var s = Fi.formatPrefix(t, h);
                        t = s.scale(t), e = s.symbol + v
                    } else t *= p;
                    var b, w, A = (t = d(t, h)).lastIndexOf(".");
                    if (0 > A) {
                        var M = m ? t.lastIndexOf("e") : -1;
                        0 > M ? (b = t, w = "") : (b = t.substring(0, M), w = t.substring(M))
                    } else b = t.substring(0, A), w = n + t.substring(A + 1);
                    !l && f && (b = a(b, 1 / 0));
                    var k = g.length + b.length + w.length + (x ? 0 : o.length),
                        _ = c > k ? new Array(k = c - k + 1).join(r) : "";
                    return x && (b = a(_ + b, _.length ? c - w.length : 1 / 0)), o += g, t = b + w, ("<" === i ? o + t + _ : ">" === i ? _ + o + t : "^" === i ? _.substring(0, k >>= 1) + o + t + _.substring(k) : o + (x ? t : _ + t)) + e
                }
            }),
            timeFormat: function(t) {
                function e(t) {
                    function e(e) {
                        for (var n, i, o, a = [], u = -1, s = 0; ++u < r;) 37 === t.charCodeAt(u) && (a.push(t.slice(s, u)), null != (i = Yo[n = t.charAt(++u)]) && (n = t.charAt(++u)), (o = b[n]) && (n = o(e, null == i ? "e" === n ? " " : "0" : i)), a.push(n), s = u + 1);
                        return a.push(t.slice(s, u)), a.join("")
                    }
                    var r = t.length;
                    return e.parse = function(e) {
                        var r = {
                            y: 1900,
                            m: 0,
                            d: 1,
                            H: 0,
                            M: 0,
                            S: 0,
                            L: 0,
                            Z: null
                        };
                        if (n(r, t, e, 0) != e.length) return null;
                        "p" in r && (r.H = r.H % 12 + 12 * r.p);
                        var i = null != r.Z && Uo !== St,
                            o = new(i ? St : Uo);
                        return "j" in r ? o.setFullYear(r.y, 0, r.j) : "w" in r && ("W" in r || "U" in r) ? (o.setFullYear(r.y, 0, 1), o.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (o.getDay() + 5) % 7 : r.w + 7 * r.U - (o.getDay() + 6) % 7)) : o.setFullYear(r.y, r.m, r.d), o.setHours(r.H + (r.Z / 100 | 0), r.M + r.Z % 100, r.S, r.L), i ? o._ : o
                    }, e.toString = function() {
                        return t
                    }, e
                }

                function n(t, e, n, r) {
                    for (var i, o, a, u = 0, s = e.length, l = n.length; s > u;) {
                        if (r >= l) return -1;
                        if (37 === (i = e.charCodeAt(u++))) {
                            if (a = e.charAt(u++), !(o = w[a in Yo ? e.charAt(u++) : a]) || (r = o(t, n, r)) < 0) return -1
                        } else if (i != n.charCodeAt(r++)) return -1
                    }
                    return r
                }
                var r = t.dateTime,
                    i = t.date,
                    o = t.time,
                    a = t.periods,
                    u = t.days,
                    s = t.shortDays,
                    l = t.months,
                    c = t.shortMonths;
                e.utc = function(t) {
                    function n(t) {
                        try {
                            var e = new(Uo = St);
                            return e._ = t, r(e)
                        } finally {
                            Uo = Date
                        }
                    }
                    var r = e(t);
                    return n.parse = function(t) {
                        try {
                            Uo = St;
                            var e = r.parse(t);
                            return e && e._
                        } finally {
                            Uo = Date
                        }
                    }, n.toString = r.toString, n
                }, e.multi = e.utc.multi = Zt;
                var f = Fi.map(),
                    h = Rt(u),
                    d = Ot(u),
                    p = Rt(s),
                    g = Ot(s),
                    v = Rt(l),
                    y = Ot(l),
                    m = Rt(c),
                    x = Ot(c);
                a.forEach(function(t, e) {
                    f.set(t.toLowerCase(), e)
                });
                var b = {
                        a: function(t) {
                            return s[t.getDay()]
                        },
                        A: function(t) {
                            return u[t.getDay()]
                        },
                        b: function(t) {
                            return c[t.getMonth()]
                        },
                        B: function(t) {
                            return l[t.getMonth()]
                        },
                        c: e(r),
                        d: function(t, e) {
                            return Lt(t.getDate(), e, 2)
                        },
                        e: function(t, e) {
                            return Lt(t.getDate(), e, 2)
                        },
                        H: function(t, e) {
                            return Lt(t.getHours(), e, 2)
                        },
                        I: function(t, e) {
                            return Lt(t.getHours() % 12 || 12, e, 2)
                        },
                        j: function(t, e) {
                            return Lt(1 + Bo.dayOfYear(t), e, 3)
                        },
                        L: function(t, e) {
                            return Lt(t.getMilliseconds(), e, 3)
                        },
                        m: function(t, e) {
                            return Lt(t.getMonth() + 1, e, 2)
                        },
                        M: function(t, e) {
                            return Lt(t.getMinutes(), e, 2)
                        },
                        p: function(t) {
                            return a[+(t.getHours() >= 12)]
                        },
                        S: function(t, e) {
                            return Lt(t.getSeconds(), e, 2)
                        },
                        U: function(t, e) {
                            return Lt(Bo.sundayOfYear(t), e, 2)
                        },
                        w: function(t) {
                            return t.getDay()
                        },
                        W: function(t, e) {
                            return Lt(Bo.mondayOfYear(t), e, 2)
                        },
                        x: e(i),
                        X: e(o),
                        y: function(t, e) {
                            return Lt(t.getFullYear() % 100, e, 2)
                        },
                        Y: function(t, e) {
                            return Lt(t.getFullYear() % 1e4, e, 4)
                        },
                        Z: Gt,
                        "%": function() {
                            return "%"
                        }
                    },
                    w = {
                        a: function(t, e, n) {
                            p.lastIndex = 0;
                            var r = p.exec(e.slice(n));
                            return r ? (t.w = g.get(r[0].toLowerCase()), n + r[0].length) : -1
                        },
                        A: function(t, e, n) {
                            h.lastIndex = 0;
                            var r = h.exec(e.slice(n));
                            return r ? (t.w = d.get(r[0].toLowerCase()), n + r[0].length) : -1
                        },
                        b: function(t, e, n) {
                            m.lastIndex = 0;
                            var r = m.exec(e.slice(n));
                            return r ? (t.m = x.get(r[0].toLowerCase()), n + r[0].length) : -1
                        },
                        B: function(t, e, n) {
                            v.lastIndex = 0;
                            var r = v.exec(e.slice(n));
                            return r ? (t.m = y.get(r[0].toLowerCase()), n + r[0].length) : -1
                        },
                        c: function(t, e, r) {
                            return n(t, b.c.toString(), e, r)
                        },
                        d: zt,
                        e: zt,
                        H: Ut,
                        I: Ut,
                        j: Bt,
                        L: Vt,
                        m: It,
                        M: Wt,
                        p: function(t, e, n) {
                            var r = f.get(e.slice(n, n += 2).toLowerCase());
                            return null == r ? -1 : (t.p = r, n)
                        },
                        S: Yt,
                        U: jt,
                        w: $t,
                        W: Ht,
                        x: function(t, e, r) {
                            return n(t, b.x.toString(), e, r)
                        },
                        X: function(t, e, r) {
                            return n(t, b.X.toString(), e, r)
                        },
                        y: Ft,
                        Y: qt,
                        Z: Pt,
                        "%": Xt
                    };
                return e
            }(t)
        };
        var e, n, r, i, o, a
    };
    var Xo = Fi.locale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    Fi.format = Xo.numberFormat, Fi.geo = {}, Qt.prototype = {
        s: 0,
        t: 0,
        add: function(t) {
            Kt(t, this.t, Zo), Kt(Zo.s, this.s, this), this.s ? this.t += Zo.t : this.s = Zo.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var Zo = new Qt;
    Fi.geo.stream = function(t, e) {
        t && Qo.hasOwnProperty(t.type) ? Qo[t.type](t, e) : Jt(t, e)
    };
    var Qo = {
            Feature: function(t, e) {
                Jt(t.geometry, e)
            },
            FeatureCollection: function(t, e) {
                for (var n = t.features, r = -1, i = n.length; ++r < i;) Jt(n[r].geometry, e)
            }
        },
        Ko = {
            Sphere: function(t, e) {
                e.sphere()
            },
            Point: function(t, e) {
                t = t.coordinates, e.point(t[0], t[1], t[2])
            },
            MultiPoint: function(t, e) {
                for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) t = n[r], e.point(t[0], t[1], t[2])
            },
            LineString: function(t, e) {
                te(t.coordinates, e, 0)
            },
            MultiLineString: function(t, e) {
                for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) te(n[r], e, 0)
            },
            Polygon: function(t, e) {
                ee(t.coordinates, e)
            },
            MultiPolygon: function(t, e) {
                for (var n = t.coordinates, r = -1, i = n.length; ++r < i;) ee(n[r], e)
            },
            GeometryCollection: function(t, e) {
                for (var n = t.geometries, r = -1, i = n.length; ++r < i;) Jt(n[r], e)
            }
        };
    Fi.geo.area = function(t) {
        return Jo = 0, Fi.geo.stream(t, ea), Jo
    };
    var Jo, ta = new Qt,
        ea = {
            sphere: function() {
                Jo += 4 * po
            },
            point: b,
            lineStart: b,
            lineEnd: b,
            polygonStart: function() {
                ta.reset(), ea.lineStart = ne
            },
            polygonEnd: function() {
                var t = 2 * ta;
                Jo += 0 > t ? 4 * po + t : t, ea.lineStart = ea.lineEnd = ea.point = b
            }
        };
    Fi.geo.bounds = function() {
        function t(t, e) {
            x.push(b = [c = t, h = t]), f > e && (f = e), e > d && (d = e)
        }

        function e(e, n) {
            var r = re([e * mo, n * mo]);
            if (y) {
                var i = oe(y, r),
                    o = oe([i[1], -i[0], 0], i);
                se(o), o = le(o);
                var a = e - p,
                    s = a > 0 ? 1 : -1,
                    l = o[0] * xo * s,
                    g = Xi(a) > 180;
                if (g ^ (l > s * p && s * e > l))(v = o[1] * xo) > d && (d = v);
                else if (g ^ ((l = (l + 360) % 360 - 180) > s * p && s * e > l)) {
                    var v = -o[1] * xo;
                    f > v && (f = v)
                } else f > n && (f = n), n > d && (d = n);
                g ? p > e ? u(c, e) > u(c, h) && (h = e) : u(e, h) > u(c, h) && (c = e) : h >= c ? (c > e && (c = e), e > h && (h = e)) : e > p ? u(c, e) > u(c, h) && (h = e) : u(e, h) > u(c, h) && (c = e)
            } else t(e, n);
            y = r, p = e
        }

        function n() {
            w.point = e
        }

        function r() {
            b[0] = c, b[1] = h, w.point = t, y = null
        }

        function i(t, n) {
            if (y) {
                var r = t - p;
                m += Xi(r) > 180 ? r + (r > 0 ? 360 : -360) : r
            } else g = t, v = n;
            ea.point(t, n), e(t, n)
        }

        function o() {
            ea.lineStart()
        }

        function a() {
            i(g, v), ea.lineEnd(), Xi(m) > fo && (c = -(h = 180)), b[0] = c, b[1] = h, y = null
        }

        function u(t, e) {
            return (e -= t) < 0 ? e + 360 : e
        }

        function s(t, e) {
            return t[0] - e[0]
        }

        function l(t, e) {
            return e[0] <= e[1] ? e[0] <= t && t <= e[1] : t < e[0] || e[1] < t
        }
        var c, f, h, d, p, g, v, y, m, x, b, w = {
            point: t,
            lineStart: n,
            lineEnd: r,
            polygonStart: function() {
                w.point = i, w.lineStart = o, w.lineEnd = a, m = 0, ea.polygonStart()
            },
            polygonEnd: function() {
                ea.polygonEnd(), w.point = t, w.lineStart = n, w.lineEnd = r, 0 > ta ? (c = -(h = 180), f = -(d = 90)) : m > fo ? d = 90 : -fo > m && (f = -90), b[0] = c, b[1] = h
            }
        };
        return function(t) {
            if (d = h = -(c = f = 1 / 0), x = [], Fi.geo.stream(t, w), o = x.length) {
                x.sort(s);
                for (var e = 1, n = [p = x[0]]; o > e; ++e) l((i = x[e])[0], p) || l(i[1], p) ? (u(p[0], i[1]) > u(p[0], p[1]) && (p[1] = i[1]), u(i[0], p[1]) > u(p[0], p[1]) && (p[0] = i[0])) : n.push(p = i);
                for (var r, i, o, a = -1 / 0, p = (e = 0, n[o = n.length - 1]); o >= e; p = i, ++e) i = n[e], (r = u(p[1], i[0])) > a && (a = r, c = i[0], h = p[1])
            }
            return x = b = null, 1 / 0 === c || 1 / 0 === f ? [
                [NaN, NaN],
                [NaN, NaN]
            ] : [
                [c, f],
                [h, d]
            ]
        }
    }(), Fi.geo.centroid = function(t) {
        na = ra = ia = oa = aa = ua = sa = la = ca = fa = ha = 0, Fi.geo.stream(t, da);
        var e = ca,
            n = fa,
            r = ha,
            i = e * e + n * n + r * r;
        return ho > i && (e = ua, n = sa, r = la, fo > ra && (e = ia, n = oa, r = aa), ho > (i = e * e + n * n + r * r)) ? [NaN, NaN] : [Math.atan2(n, e) * xo, K(r / Math.sqrt(i)) * xo]
    };
    var na, ra, ia, oa, aa, ua, sa, la, ca, fa, ha, da = {
            sphere: b,
            point: fe,
            lineStart: de,
            lineEnd: pe,
            polygonStart: function() {
                da.lineStart = ge
            },
            polygonEnd: function() {
                da.lineStart = de
            }
        },
        pa = we(ye, function(t) {
            var e, n = NaN,
                r = NaN,
                i = NaN;
            return {
                lineStart: function() {
                    t.lineStart(), e = 1
                },
                point: function(o, a) {
                    var u, s, l, c, f, h, d, p = o > 0 ? po : -po,
                        g = Xi(o - n);
                    Xi(g - po) < fo ? (t.point(n, r = (r + a) / 2 > 0 ? yo : -yo), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(p, r), t.point(o, r), e = 0) : i !== p && g >= po && (Xi(n - i) < fo && (n -= i * fo), Xi(o - p) < fo && (o -= p * fo), u = n, s = r, l = o, c = a, d = Math.sin(u - l), r = Xi(d) > fo ? Math.atan((Math.sin(s) * (h = Math.cos(c)) * Math.sin(l) - Math.sin(c) * (f = Math.cos(s)) * Math.sin(u)) / (f * h * d)) : (s + c) / 2, t.point(i, r), t.lineEnd(), t.lineStart(), t.point(p, r), e = 0), t.point(n = o, r = a), i = p
                },
                lineEnd: function() {
                    t.lineEnd(), n = r = NaN
                },
                clean: function() {
                    return 2 - e
                }
            }
        }, function(t, e, n, r) {
            var i;
            if (null == t) i = n * yo, r.point(-po, i), r.point(0, i), r.point(po, i), r.point(po, 0), r.point(po, -i), r.point(0, -i), r.point(-po, -i), r.point(-po, 0), r.point(-po, i);
            else if (Xi(t[0] - e[0]) > fo) {
                var o = t[0] < e[0] ? po : -po;
                i = n * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
            } else r.point(e[0], e[1])
        }, [-po, -po / 2]),
        ga = 1e9;
    Fi.geo.clipExtent = function() {
        var t, e, n, r, i, o, a = {
            stream: function(t) {
                return i && (i.valid = !1), (i = o(t)).valid = !0, i
            },
            extent: function(u) {
                return arguments.length ? (o = Ce(t = +u[0][0], e = +u[0][1], n = +u[1][0], r = +u[1][1]), i && (i.valid = !1, i = null), a) : [
                    [t, e],
                    [n, r]
                ]
            }
        };
        return a.extent([
            [0, 0],
            [960, 500]
        ])
    }, (Fi.geo.conicEqualArea = function() {
        return Te(Ee)
    }).raw = Ee, Fi.geo.albers = function() {
        return Fi.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, Fi.geo.albersUsa = function() {
        function t(t) {
            var o = t[0],
                a = t[1];
            return e = null, n(o, a), e || (r(o, a), e) || i(o, a), e
        }
        var e, n, r, i, o = Fi.geo.albers(),
            a = Fi.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
            u = Fi.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
            s = {
                point: function(t, n) {
                    e = [t, n]
                }
            };
        return t.invert = function(t) {
            var e = o.scale(),
                n = o.translate(),
                r = (t[0] - n[0]) / e,
                i = (t[1] - n[1]) / e;
            return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? a : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? u : o).invert(t)
        }, t.stream = function(t) {
            var e = o.stream(t),
                n = a.stream(t),
                r = u.stream(t);
            return {
                point: function(t, i) {
                    e.point(t, i), n.point(t, i), r.point(t, i)
                },
                sphere: function() {
                    e.sphere(), n.sphere(), r.sphere()
                },
                lineStart: function() {
                    e.lineStart(), n.lineStart(), r.lineStart()
                },
                lineEnd: function() {
                    e.lineEnd(), n.lineEnd(), r.lineEnd()
                },
                polygonStart: function() {
                    e.polygonStart(), n.polygonStart(), r.polygonStart()
                },
                polygonEnd: function() {
                    e.polygonEnd(), n.polygonEnd(), r.polygonEnd()
                }
            }
        }, t.precision = function(e) {
            return arguments.length ? (o.precision(e), a.precision(e), u.precision(e), t) : o.precision()
        }, t.scale = function(e) {
            return arguments.length ? (o.scale(e), a.scale(.35 * e), u.scale(e), t.translate(o.translate())) : o.scale()
        }, t.translate = function(e) {
            if (!arguments.length) return o.translate();
            var l = o.scale(),
                c = +e[0],
                f = +e[1];
            return n = o.translate(e).clipExtent([
                [c - .455 * l, f - .238 * l],
                [c + .455 * l, f + .238 * l]
            ]).stream(s).point, r = a.translate([c - .307 * l, f + .201 * l]).clipExtent([
                [c - .425 * l + fo, f + .12 * l + fo],
                [c - .214 * l - fo, f + .234 * l - fo]
            ]).stream(s).point, i = u.translate([c - .205 * l, f + .212 * l]).clipExtent([
                [c - .214 * l + fo, f + .166 * l + fo],
                [c - .115 * l - fo, f + .234 * l - fo]
            ]).stream(s).point, t
        }, t.scale(1070)
    };
    var va, ya, ma, xa, ba, wa, Aa = {
            point: b,
            lineStart: b,
            lineEnd: b,
            polygonStart: function() {
                ya = 0, Aa.lineStart = Se
            },
            polygonEnd: function() {
                Aa.lineStart = Aa.lineEnd = Aa.point = b, va += Xi(ya / 2)
            }
        },
        Ma = {
            point: function(t, e) {
                ma > t && (ma = t), t > ba && (ba = t), xa > e && (xa = e), e > wa && (wa = e)
            },
            lineStart: b,
            lineEnd: b,
            polygonStart: b,
            polygonEnd: b
        },
        ka = {
            point: De,
            lineStart: Le,
            lineEnd: Re,
            polygonStart: function() {
                ka.lineStart = Oe
            },
            polygonEnd: function() {
                ka.point = De, ka.lineStart = Le, ka.lineEnd = Re
            }
        };
    Fi.geo.path = function() {
        function t(t) {
            return t && ("function" == typeof u && o.pointRadius(+u.apply(this, arguments)), a && a.valid || (a = i(o)), Fi.geo.stream(t, a)), o.result()
        }

        function e() {
            return a = null, t
        }
        var n, r, i, o, a, u = 4.5;
        return t.area = function(t) {
            return va = 0, Fi.geo.stream(t, i(Aa)), va
        }, t.centroid = function(t) {
            return ia = oa = aa = ua = sa = la = ca = fa = ha = 0, Fi.geo.stream(t, i(ka)), ha ? [ca / ha, fa / ha] : la ? [ua / la, sa / la] : aa ? [ia / aa, oa / aa] : [NaN, NaN]
        }, t.bounds = function(t) {
            return ba = wa = -(ma = xa = 1 / 0), Fi.geo.stream(t, i(Ma)), [
                [ma, xa],
                [ba, wa]
            ]
        }, t.projection = function(t) {
            return arguments.length ? (i = (n = t) ? t.stream || (r = t, o = $e(function(t, e) {
                return r([t * xo, e * xo])
            }), function(t) {
                return Pe(o(t))
            }) : y, e()) : n;
            var r, o
        }, t.context = function(t) {
            return arguments.length ? (o = null == (r = t) ? new function() {
                function t(t, e) {
                    a.push("M", t, ",", e, o)
                }

                function e(t, e) {
                    a.push("M", t, ",", e), u.point = n
                }

                function n(t, e) {
                    a.push("L", t, ",", e)
                }

                function r() {
                    u.point = t
                }

                function i() {
                    a.push("Z")
                }
                var o = Ne(4.5),
                    a = [],
                    u = {
                        point: t,
                        lineStart: function() {
                            u.point = e
                        },
                        lineEnd: r,
                        polygonStart: function() {
                            u.lineEnd = i
                        },
                        polygonEnd: function() {
                            u.lineEnd = r, u.point = t
                        },
                        pointRadius: function(t) {
                            return o = Ne(t), u
                        },
                        result: function() {
                            if (a.length) {
                                var t = a.join("");
                                return a = [], t
                            }
                        }
                    };
                return u
            } : new function(t) {
                function e(e, n) {
                    t.moveTo(e + a, n), t.arc(e, n, a, 0, go)
                }

                function n(e, n) {
                    t.moveTo(e, n), u.point = r
                }

                function r(e, n) {
                    t.lineTo(e, n)
                }

                function i() {
                    u.point = e
                }

                function o() {
                    t.closePath()
                }
                var a = 4.5,
                    u = {
                        point: e,
                        lineStart: function() {
                            u.point = n
                        },
                        lineEnd: i,
                        polygonStart: function() {
                            u.lineEnd = o
                        },
                        polygonEnd: function() {
                            u.lineEnd = i, u.point = e
                        },
                        pointRadius: function(t) {
                            return a = t, u
                        },
                        result: b
                    };
                return u
            }(t), "function" != typeof u && o.pointRadius(u), e()) : r
        }, t.pointRadius = function(e) {
            return arguments.length ? (u = "function" == typeof e ? e : (o.pointRadius(+e), +e), t) : u
        }, t.projection(Fi.geo.albersUsa()).context(null)
    }, Fi.geo.transform = function(t) {
        return {
            stream: function(e) {
                var n = new je(e);
                for (var r in t) n[r] = t[r];
                return n
            }
        }
    }, je.prototype = {
        point: function(t, e) {
            this.stream.point(t, e)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    }, Fi.geo.projection = qe, Fi.geo.projectionMutator = Fe, (Fi.geo.equirectangular = function() {
        return qe(Ie)
    }).raw = Ie.invert = Ie, Fi.geo.rotation = function(t) {
        function e(e) {
            return (e = t(e[0] * mo, e[1] * mo))[0] *= xo, e[1] *= xo, e
        }
        return t = Be(t[0] % 360 * mo, t[1] * mo, t.length > 2 ? t[2] * mo : 0), e.invert = function(e) {
            return (e = t.invert(e[0] * mo, e[1] * mo))[0] *= xo, e[1] *= xo, e
        }, e
    }, ze.invert = Ie, Fi.geo.circle = function() {
        function t() {
            var t = "function" == typeof r ? r.apply(this, arguments) : r,
                e = Be(-t[0] * mo, -t[1] * mo, 0).invert,
                i = [];
            return n(null, null, 1, {
                point: function(t, n) {
                    i.push(t = e(t, n)), t[0] *= xo, t[1] *= xo
                }
            }), {
                type: "Polygon",
                coordinates: [i]
            }
        }
        var e, n, r = [0, 0],
            i = 6;
        return t.origin = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.angle = function(r) {
            return arguments.length ? (n = Ve((e = +r) * mo, i * mo), t) : e
        }, t.precision = function(r) {
            return arguments.length ? (n = Ve(e * mo, (i = +r) * mo), t) : i
        }, t.angle(90)
    }, Fi.geo.distance = function(t, e) {
        var n, r = (e[0] - t[0]) * mo,
            i = t[1] * mo,
            o = e[1] * mo,
            a = Math.sin(r),
            u = Math.cos(r),
            s = Math.sin(i),
            l = Math.cos(i),
            c = Math.sin(o),
            f = Math.cos(o);
        return Math.atan2(Math.sqrt((n = f * a) * n + (n = l * c - s * f * u) * n), s * c + l * f * u)
    }, Fi.geo.graticule = function() {
        function t() {
            return {
                type: "MultiLineString",
                coordinates: e()
            }
        }

        function e() {
            return Fi.range(Math.ceil(o / v) * v, i, v).map(h).concat(Fi.range(Math.ceil(l / y) * y, s, y).map(d)).concat(Fi.range(Math.ceil(r / p) * p, n, p).filter(function(t) {
                return Xi(t % v) > fo
            }).map(c)).concat(Fi.range(Math.ceil(u / g) * g, a, g).filter(function(t) {
                return Xi(t % y) > fo
            }).map(f))
        }
        var n, r, i, o, a, u, s, l, c, f, h, d, p = 10,
            g = p,
            v = 90,
            y = 360,
            m = 2.5;
        return t.lines = function() {
            return e().map(function(t) {
                return {
                    type: "LineString",
                    coordinates: t
                }
            })
        }, t.outline = function() {
            return {
                type: "Polygon",
                coordinates: [h(o).concat(d(s).slice(1), h(i).reverse().slice(1), d(l).reverse().slice(1))]
            }
        }, t.extent = function(e) {
            return arguments.length ? t.majorExtent(e).minorExtent(e) : t.minorExtent()
        }, t.majorExtent = function(e) {
            return arguments.length ? (o = +e[0][0], i = +e[1][0], l = +e[0][1], s = +e[1][1], o > i && (e = o, o = i, i = e), l > s && (e = l, l = s, s = e), t.precision(m)) : [
                [o, l],
                [i, s]
            ]
        }, t.minorExtent = function(e) {
            return arguments.length ? (r = +e[0][0], n = +e[1][0], u = +e[0][1], a = +e[1][1], r > n && (e = r, r = n, n = e), u > a && (e = u, u = a, a = e), t.precision(m)) : [
                [r, u],
                [n, a]
            ]
        }, t.step = function(e) {
            return arguments.length ? t.majorStep(e).minorStep(e) : t.minorStep()
        }, t.majorStep = function(e) {
            return arguments.length ? (v = +e[0], y = +e[1], t) : [v, y]
        }, t.minorStep = function(e) {
            return arguments.length ? (p = +e[0], g = +e[1], t) : [p, g]
        }, t.precision = function(e) {
            return arguments.length ? (m = +e, c = Xe(u, a, 90), f = Ze(r, n, m), h = Xe(l, s, 90), d = Ze(o, i, m), t) : m
        }, t.majorExtent([
            [-180, -90 + fo],
            [180, 90 - fo]
        ]).minorExtent([
            [-180, -80 - fo],
            [180, 80 + fo]
        ])
    }, Fi.geo.greatArc = function() {
        function t() {
            return {
                type: "LineString",
                coordinates: [e || r.apply(this, arguments), n || i.apply(this, arguments)]
            }
        }
        var e, n, r = Qe,
            i = Ke;
        return t.distance = function() {
            return Fi.geo.distance(e || r.apply(this, arguments), n || i.apply(this, arguments))
        }, t.source = function(n) {
            return arguments.length ? (r = n, e = "function" == typeof n ? null : n, t) : r
        }, t.target = function(e) {
            return arguments.length ? (i = e, n = "function" == typeof e ? null : e, t) : i
        }, t.precision = function() {
            return arguments.length ? t : 0
        }, t
    }, Fi.geo.interpolate = function(t, e) {
        return n = t[0] * mo, r = t[1] * mo, i = e[0] * mo, o = e[1] * mo, a = Math.cos(r), u = Math.sin(r), s = Math.cos(o), l = Math.sin(o), c = a * Math.cos(n), f = a * Math.sin(n), h = s * Math.cos(i), d = s * Math.sin(i), p = 2 * Math.asin(Math.sqrt(tt(o - r) + a * s * tt(i - n))), g = 1 / Math.sin(p), (v = p ? function(t) {
            var e = Math.sin(t *= p) * g,
                n = Math.sin(p - t) * g,
                r = n * c + e * h,
                i = n * f + e * d,
                o = n * u + e * l;
            return [Math.atan2(i, r) * xo, Math.atan2(o, Math.sqrt(r * r + i * i)) * xo]
        } : function() {
            return [n * xo, r * xo]
        }).distance = p, v;
        var n, r, i, o, a, u, s, l, c, f, h, d, p, g, v
    }, Fi.geo.length = function(t) {
        return _a = 0, Fi.geo.stream(t, Ca), _a
    };
    var _a, Ca = {
            sphere: b,
            point: b,
            lineStart: function() {
                function t(t, i) {
                    var o = Math.sin(i *= mo),
                        a = Math.cos(i),
                        u = Xi((t *= mo) - e),
                        s = Math.cos(u);
                    _a += Math.atan2(Math.sqrt((u = a * Math.sin(u)) * u + (u = r * o - n * a * s) * u), n * o + r * a * s), e = t, n = o, r = a
                }
                var e, n, r;
                Ca.point = function(i, o) {
                    e = i * mo, n = Math.sin(o *= mo), r = Math.cos(o), Ca.point = t
                }, Ca.lineEnd = function() {
                    Ca.point = Ca.lineEnd = b
                }
            },
            lineEnd: b,
            polygonStart: b,
            polygonEnd: b
        },
        Ta = Je(function(t) {
            return Math.sqrt(2 / (1 + t))
        }, function(t) {
            return 2 * Math.asin(t / 2)
        });
    (Fi.geo.azimuthalEqualArea = function() {
        return qe(Ta)
    }).raw = Ta;
    var Ea = Je(function(t) {
        var e = Math.acos(t);
        return e && e / Math.sin(e)
    }, y);
    (Fi.geo.azimuthalEquidistant = function() {
        return qe(Ea)
    }).raw = Ea, (Fi.geo.conicConformal = function() {
        return Te(tn)
    }).raw = tn, (Fi.geo.conicEquidistant = function() {
        return Te(en)
    }).raw = en;
    var Sa = Je(function(t) {
        return 1 / t
    }, Math.atan);
    (Fi.geo.gnomonic = function() {
        return qe(Sa)
    }).raw = Sa, nn.invert = function(t, e) {
        return [t, 2 * Math.atan(Math.exp(e)) - yo]
    }, (Fi.geo.mercator = function() {
        return rn(nn)
    }).raw = nn;
    var Na = Je(function() {
        return 1
    }, Math.asin);
    (Fi.geo.orthographic = function() {
        return qe(Na)
    }).raw = Na;
    var Da = Je(function(t) {
        return 1 / (1 + t)
    }, function(t) {
        return 2 * Math.atan(t)
    });
    (Fi.geo.stereographic = function() {
        return qe(Da)
    }).raw = Da, on.invert = function(t, e) {
        return [-e, 2 * Math.atan(Math.exp(t)) - yo]
    }, (Fi.geo.transverseMercator = function() {
        var t = rn(on),
            e = t.center,
            n = t.rotate;
        return t.center = function(t) {
            return t ? e([-t[1], t[0]]) : [(t = e())[1], -t[0]]
        }, t.rotate = function(t) {
            return t ? n([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : [(t = n())[0], t[1], t[2] - 90]
        }, n([0, 0, 90])
    }).raw = on, Fi.geom = {}, Fi.geom.hull = function(t) {
        function e(t) {
            if (t.length < 3) return [];
            var e, i = wt(n),
                o = wt(r),
                a = t.length,
                u = [],
                s = [];
            for (e = 0; a > e; e++) u.push([+i.call(this, t[e], e), +o.call(this, t[e], e), e]);
            for (u.sort(ln), e = 0; a > e; e++) s.push([u[e][0], -u[e][1]]);
            var l = sn(u),
                c = sn(s),
                f = c[0] === l[0],
                h = c[c.length - 1] === l[l.length - 1],
                d = [];
            for (e = l.length - 1; e >= 0; --e) d.push(t[u[l[e]][2]]);
            for (e = +f; e < c.length - h; ++e) d.push(t[u[c[e]][2]]);
            return d
        }
        var n = an,
            r = un;
        return arguments.length ? e(t) : (e.x = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.y = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e)
    }, Fi.geom.polygon = function(t) {
        return to(t, La), t
    };
    var La = Fi.geom.polygon.prototype = [];
    La.area = function() {
        for (var t, e = -1, n = this.length, r = this[n - 1], i = 0; ++e < n;) t = r, r = this[e], i += t[1] * r[0] - t[0] * r[1];
        return .5 * i
    }, La.centroid = function(t) {
        var e, n, r = -1,
            i = this.length,
            o = 0,
            a = 0,
            u = this[i - 1];
        for (arguments.length || (t = -1 / (6 * this.area())); ++r < i;) e = u, u = this[r], n = e[0] * u[1] - u[0] * e[1], o += (e[0] + u[0]) * n, a += (e[1] + u[1]) * n;
        return [o * t, a * t]
    }, La.clip = function(t) {
        for (var e, n, r, i, o, a, u = hn(t), s = -1, l = this.length - hn(this), c = this[l - 1]; ++s < l;) {
            for (e = t.slice(), t.length = 0, i = this[s], o = e[(r = e.length - u) - 1], n = -1; ++n < r;) cn(a = e[n], c, i) ? (cn(o, c, i) || t.push(fn(o, a, c, i)), t.push(a)) : cn(o, c, i) && t.push(fn(o, a, c, i)), o = a;
            u && t.push(t[0]), c = i
        }
        return t
    };
    var Ra, Oa, $a, ja, Ha, qa = [],
        Fa = [];
    xn.prototype.prepare = function() {
        for (var t, e = this.edges, n = e.length; n--;)(t = e[n].edge).b && t.a || e.splice(n, 1);
        return e.sort(bn), e.length
    }, Tn.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    }, En.prototype = {
        insert: function(t, e) {
            var n, r, i;
            if (t) {
                if (e.P = t, e.N = t.N, t.N && (t.N.P = e), t.N = e, t.R) {
                    for (t = t.R; t.L;) t = t.L;
                    t.L = e
                } else t.R = e;
                n = t
            } else this._ ? (t = Ln(this._), e.P = null, e.N = t, t.P = t.L = e, n = t) : (e.P = e.N = null, this._ = e, n = null);
            for (e.L = e.R = null, e.U = n, e.C = !0, t = e; n && n.C;) n === (r = n.U).L ? (i = r.R) && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.R && (Nn(this, n), n = (t = n).U), n.C = !1, r.C = !0, Dn(this, r)) : (i = r.L) && i.C ? (n.C = i.C = !1, r.C = !0, t = r) : (t === n.L && (Dn(this, n), n = (t = n).U), n.C = !1, r.C = !0, Nn(this, r)), n = t.U;
            this._.C = !1
        },
        remove: function(t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
            var e, n, r, i = t.U,
                o = t.L,
                a = t.R;
            if (n = o ? a ? Ln(a) : o : a, i ? i.L === t ? i.L = n : i.R = n : this._ = n, o && a ? (r = n.C, n.C = t.C, n.L = o, o.U = n, n !== a ? (i = n.U, n.U = t.U, t = n.R, i.L = t, n.R = a, a.U = n) : (n.U = i, i = n, t = n.R)) : (r = t.C, t = n), t && (t.U = i), !r) {
                if (t && t.C) return void(t.C = !1);
                do {
                    if (t === this._) break;
                    if (t === i.L) {
                        if ((e = i.R).C && (e.C = !1, i.C = !0, Nn(this, i), e = i.R), e.L && e.L.C || e.R && e.R.C) {
                            e.R && e.R.C || (e.L.C = !1, e.C = !0, Dn(this, e), e = i.R), e.C = i.C, i.C = e.R.C = !1, Nn(this, i), t = this._;
                            break
                        }
                    } else if ((e = i.L).C && (e.C = !1, i.C = !0, Dn(this, i), e = i.L), e.L && e.L.C || e.R && e.R.C) {
                        e.L && e.L.C || (e.R.C = !1, e.C = !0, Nn(this, e), e = i.L), e.C = i.C, i.C = e.L.C = !1, Dn(this, i), t = this._;
                        break
                    }
                    e.C = !0, t = i, i = i.U
                } while (!t.C);
                t && (t.C = !1)
            }
        }
    }, Fi.geom.voronoi = function(t) {
        function e(t) {
            var e = new Array(t.length),
                r = u[0][0],
                i = u[0][1],
                o = u[1][0],
                a = u[1][1];
            return Rn(n(t), u).cells.forEach(function(n, u) {
                var s = n.edges,
                    l = n.site;
                (e[u] = s.length ? s.map(function(t) {
                    var e = t.start();
                    return [e.x, e.y]
                }) : l.x >= r && l.x <= o && l.y >= i && l.y <= a ? [
                    [r, a],
                    [o, a],
                    [o, i],
                    [r, i]
                ] : []).point = t[u]
            }), e
        }

        function n(t) {
            return t.map(function(t, e) {
                return {
                    x: Math.round(o(t, e) / fo) * fo,
                    y: Math.round(a(t, e) / fo) * fo,
                    i: e
                }
            })
        }
        var r = an,
            i = un,
            o = r,
            a = i,
            u = Pa;
        return t ? e(t) : (e.links = function(t) {
            return Rn(n(t)).edges.filter(function(t) {
                return t.l && t.r
            }).map(function(e) {
                return {
                    source: t[e.l.i],
                    target: t[e.r.i]
                }
            })
        }, e.triangles = function(t) {
            var e = [];
            return Rn(n(t)).cells.forEach(function(n, r) {
                for (var i, o = n.site, a = n.edges.sort(bn), u = -1, s = a.length, l = a[s - 1].edge, c = l.l === o ? l.r : l.l; ++u < s;) l, i = c, c = (l = a[u].edge).l === o ? l.r : l.l, r < i.i && r < c.i && (h = i, d = c, ((f = o).x - d.x) * (h.y - f.y) - (f.x - h.x) * (d.y - f.y) < 0) && e.push([t[r], t[i.i], t[c.i]]);
                var f, h, d
            }), e
        }, e.x = function(t) {
            return arguments.length ? (o = wt(r = t), e) : r
        }, e.y = function(t) {
            return arguments.length ? (a = wt(i = t), e) : i
        }, e.clipExtent = function(t) {
            return arguments.length ? (u = null == t ? Pa : t, e) : u === Pa ? null : u
        }, e.size = function(t) {
            return arguments.length ? e.clipExtent(t && [
                [0, 0], t
            ]) : u === Pa ? null : u && u[1]
        }, e)
    };
    var Pa = [
        [-1e6, -1e6],
        [1e6, 1e6]
    ];
    Fi.geom.delaunay = function(t) {
        return Fi.geom.voronoi().triangles(t)
    }, Fi.geom.quadtree = function(t, e, n, r, i) {
        function o(t) {
            function o(t, e, n, r, i, o, a, u) {
                if (!isNaN(n) && !isNaN(r))
                    if (t.leaf) {
                        var s = t.x,
                            c = t.y;
                        if (null != s)
                            if (Xi(s - n) + Xi(c - r) < .01) l(t, e, n, r, i, o, a, u);
                            else {
                                var f = t.point;
                                t.x = t.y = t.point = null, l(t, f, s, c, i, o, a, u), l(t, e, n, r, i, o, a, u)
                            } else t.x = n, t.y = r, t.point = e
                    } else l(t, e, n, r, i, o, a, u)
            }

            function l(t, e, n, r, i, a, u, s) {
                var l = .5 * (i + u),
                    c = .5 * (a + s),
                    f = n >= l,
                    h = r >= c,
                    d = h << 1 | f;
                t.leaf = !1, t = t.nodes[d] || (t.nodes[d] = {
                    leaf: !0,
                    nodes: [],
                    point: null,
                    x: null,
                    y: null,
                    add: function(t) {
                        o(_, t, +x(t, ++d), +b(t, d), g, v, y, m)
                    }
                }), f ? i = l : u = l, h ? a = c : s = c, o(t, e, n, r, i, a, u, s)
            }
            var c, f, h, d, p, g, v, y, m, x = wt(u),
                b = wt(s);
            if (null != e) g = e, v = n, y = r, m = i;
            else if (y = m = -(g = v = 1 / 0), f = [], h = [], p = t.length, a)
                for (d = 0; p > d; ++d)(c = t[d]).x < g && (g = c.x), c.y < v && (v = c.y), c.x > y && (y = c.x), c.y > m && (m = c.y), f.push(c.x), h.push(c.y);
            else
                for (d = 0; p > d; ++d) {
                    var w = +x(c = t[d], d),
                        A = +b(c, d);
                    g > w && (g = w), v > A && (v = A), w > y && (y = w), A > m && (m = A), f.push(w), h.push(A)
                }
            var M = y - g,
                k = m - v;
            M > k ? m = v + M : y = g + k;
            var _ = {
                leaf: !0,
                nodes: [],
                point: null,
                x: null,
                y: null,
                add: function(t) {
                    o(_, t, +x(t, ++d), +b(t, d), g, v, y, m)
                }
            };
            if (_.visit = function(t) {
                    ! function t(e, n, r, i, o, a) {
                        if (!e(n, r, i, o, a)) {
                            var u = .5 * (r + o),
                                s = .5 * (i + a),
                                l = n.nodes;
                            l[0] && t(e, l[0], r, i, u, s), l[1] && t(e, l[1], u, i, o, s), l[2] && t(e, l[2], r, s, u, a), l[3] && t(e, l[3], u, s, o, a)
                        }
                    }(t, _, g, v, y, m)
                }, _.find = function(t) {
                    return e = _, n = t[0], r = t[1], l = 1 / 0,
                        function t(e, c, f, h, d) {
                            if (!(c > a || f > u || i > h || o > d)) {
                                if (p = e.point) {
                                    var p, g = n - e.x,
                                        v = r - e.y,
                                        y = g * g + v * v;
                                    if (l > y) {
                                        var m = Math.sqrt(l = y);
                                        i = n - m, o = r - m, a = n + m, u = r + m, s = p
                                    }
                                }
                                for (var x = e.nodes, b = .5 * (c + h), w = .5 * (f + d), A = (r >= w) << 1 | n >= b, M = A + 4; M > A; ++A)
                                    if (e = x[3 & A]) switch (3 & A) {
                                        case 0:
                                            t(e, c, f, b, w);
                                            break;
                                        case 1:
                                            t(e, b, f, h, w);
                                            break;
                                        case 2:
                                            t(e, c, w, b, d);
                                            break;
                                        case 3:
                                            t(e, b, w, h, d)
                                    }
                            }
                        }(e, i = g, o = v, a = y, u = m), s;
                    var e, n, r, i, o, a, u, s, l
                }, d = -1, null == e) {
                for (; ++d < p;) o(_, t[d], f[d], h[d], g, v, y, m);
                --d
            } else t.forEach(_.add);
            return f = h = t = c = null, _
        }
        var a, u = an,
            s = un;
        return (a = arguments.length) ? (u = $n, s = jn, 3 === a && (i = n, r = e, n = e = 0), o(t)) : (o.x = function(t) {
            return arguments.length ? (u = t, o) : u
        }, o.y = function(t) {
            return arguments.length ? (s = t, o) : s
        }, o.extent = function(t) {
            return arguments.length ? (null == t ? e = n = r = i = null : (e = +t[0][0], n = +t[0][1], r = +t[1][0], i = +t[1][1]), o) : null == e ? null : [
                [e, n],
                [r, i]
            ]
        }, o.size = function(t) {
            return arguments.length ? (null == t ? e = n = r = i = null : (e = n = 0, r = +t[0], i = +t[1]), o) : null == e ? null : [r - e, i - n]
        }, o)
    }, Fi.interpolateRgb = Hn, Fi.interpolateObject = qn, Fi.interpolateNumber = Fn, Fi.interpolateString = Pn;
    var Ia = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        za = new RegExp(Ia.source, "g");
    Fi.interpolate = In, Fi.interpolators = [function(t, e) {
        var n = typeof e;
        return ("string" === n ? Ro.has(e) || /^(#|rgb\(|hsl\()/.test(e) ? Hn : Pn : e instanceof et ? Hn : Array.isArray(e) ? zn : "object" === n && isNaN(e) ? qn : Fn)(t, e)
    }], Fi.interpolateArray = zn;
    var Ba = function() {
            return y
        },
        Ua = Fi.map({
            linear: Ba,
            poly: function(t) {
                return function(e) {
                    return Math.pow(e, t)
                }
            },
            quad: function() {
                return Wn
            },
            cubic: function() {
                return Yn
            },
            sin: function() {
                return Gn
            },
            exp: function() {
                return Xn
            },
            circle: function() {
                return Zn
            },
            elastic: function(t, e) {
                var n;
                return arguments.length < 2 && (e = .45), arguments.length ? n = e / go * Math.asin(1 / t) : (t = 1, n = e / 4),
                    function(r) {
                        return 1 + t * Math.pow(2, -10 * r) * Math.sin((r - n) * go / e)
                    }
            },
            back: function(t) {
                return t || (t = 1.70158),
                    function(e) {
                        return e * e * ((t + 1) * e - t)
                    }
            },
            bounce: function() {
                return Qn
            }
        }),
        Wa = Fi.map({ in : y, out: Bn, "in-out": Un, "out-in": function(t) {
                return Un(Bn(t))
            }
        });
    Fi.ease = function(t) {
        var e, n = t.indexOf("-"),
            r = n >= 0 ? t.slice(0, n) : t,
            i = n >= 0 ? t.slice(n + 1) : "in";
        return r = Ua.get(r) || Ba, i = Wa.get(i) || y, e = i(r.apply(null, Pi.call(arguments, 1))),
            function(t) {
                return 0 >= t ? 0 : t >= 1 ? 1 : e(t)
            }
    }, Fi.interpolateHcl = function(t, e) {
        t = Fi.hcl(t), e = Fi.hcl(e);
        var n = t.h,
            r = t.c,
            i = t.l,
            o = e.h - n,
            a = e.c - r,
            u = e.l - i;
        return isNaN(a) && (a = 0, r = isNaN(r) ? e.c : r), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360),
            function(t) {
                return ot(n + o * t, r + a * t, i + u * t) + ""
            }
    }, Fi.interpolateHsl = function(t, e) {
        t = Fi.hsl(t), e = Fi.hsl(e);
        var n = t.h,
            r = t.s,
            i = t.l,
            o = e.h - n,
            a = e.s - r,
            u = e.l - i;
        return isNaN(a) && (a = 0, r = isNaN(r) ? e.s : r), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360),
            function(t) {
                return rt(n + o * t, r + a * t, i + u * t) + ""
            }
    }, Fi.interpolateLab = function(t, e) {
        t = Fi.lab(t), e = Fi.lab(e);
        var n = t.l,
            r = t.a,
            i = t.b,
            o = e.l - n,
            a = e.a - r,
            u = e.b - i;
        return function(t) {
            return ut(n + o * t, r + a * t, i + u * t) + ""
        }
    }, Fi.interpolateRound = Kn, Fi.transform = function(t) {
        var e = zi.createElementNS(Fi.ns.prefix.svg, "g");
        return (Fi.transform = function(t) {
            if (null != t) {
                e.setAttribute("transform", t);
                var n = e.transform.baseVal.consolidate()
            }
            return new Jn(n ? n.matrix : Ya)
        })(t)
    }, Jn.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var Ya = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    Fi.interpolateTransform = nr, Fi.layout = {}, Fi.layout.bundle = function() {
        return function(t) {
            for (var e = [], n = -1, r = t.length; ++n < r;) e.push(or(t[n]));
            return e
        }
    }, Fi.layout.chord = function() {
        function t() {
            var t, l, f, h, d, p = {},
                g = [],
                v = Fi.range(o),
                y = [];
            for (n = [], r = [], t = 0, h = -1; ++h < o;) {
                for (l = 0, d = -1; ++d < o;) l += i[h][d];
                g.push(l), y.push(Fi.range(o)), t += l
            }
            for (a && v.sort(function(t, e) {
                    return a(g[t], g[e])
                }), u && y.forEach(function(t, e) {
                    t.sort(function(t, n) {
                        return u(i[e][t], i[e][n])
                    })
                }), t = (go - c * o) / t, l = 0, h = -1; ++h < o;) {
                for (f = l, d = -1; ++d < o;) {
                    var m = v[h],
                        x = y[m][d],
                        b = i[m][x],
                        w = l,
                        A = l += b * t;
                    p[m + "-" + x] = {
                        index: m,
                        subindex: x,
                        startAngle: w,
                        endAngle: A,
                        value: b
                    }
                }
                r[m] = {
                    index: m,
                    startAngle: f,
                    endAngle: l,
                    value: (l - f) / t
                }, l += c
            }
            for (h = -1; ++h < o;)
                for (d = h - 1; ++d < o;) {
                    var M = p[h + "-" + d],
                        k = p[d + "-" + h];
                    (M.value || k.value) && n.push(M.value < k.value ? {
                        source: k,
                        target: M
                    } : {
                        source: M,
                        target: k
                    })
                }
            s && e()
        }

        function e() {
            n.sort(function(t, e) {
                return s((t.source.value + t.target.value) / 2, (e.source.value + e.target.value) / 2)
            })
        }
        var n, r, i, o, a, u, s, l = {},
            c = 0;
        return l.matrix = function(t) {
            return arguments.length ? (o = (i = t) && i.length, n = r = null, l) : i
        }, l.padding = function(t) {
            return arguments.length ? (c = t, n = r = null, l) : c
        }, l.sortGroups = function(t) {
            return arguments.length ? (a = t, n = r = null, l) : a
        }, l.sortSubgroups = function(t) {
            return arguments.length ? (u = t, n = null, l) : u
        }, l.sortChords = function(t) {
            return arguments.length ? (s = t, n && e(), l) : s
        }, l.chords = function() {
            return n || t(), n
        }, l.groups = function() {
            return r || t(), r
        }, l
    }, Fi.layout.force = function() {
        function t(t) {
            return function(e, n, r, i) {
                if (e.point !== t) {
                    var o = e.cx - t.x,
                        a = e.cy - t.y,
                        u = i - n,
                        s = o * o + a * a;
                    if (s > u * u / v) {
                        if (p > s) {
                            var l = e.charge / s;
                            t.px -= o * l, t.py -= a * l
                        }
                        return !0
                    }
                    if (e.point && s && p > s) {
                        l = e.pointCharge / s;
                        t.px -= o * l, t.py -= a * l
                    }
                }
                return !e.charge
            }
        }

        function e(t) {
            t.px = Fi.event.x, t.py = Fi.event.y, u.resume()
        }
        var n, r, i, o, a, u = {},
            s = Fi.dispatch("start", "tick", "end"),
            l = [1, 1],
            c = .9,
            f = Va,
            h = Ga,
            d = -30,
            p = Xa,
            g = .1,
            v = .64,
            m = [],
            x = [];
        return u.tick = function() {
            if ((r *= .99) < .005) return s.end({
                type: "end",
                alpha: r = 0
            }), !0;
            var e, n, u, f, h, p, v, y, b, w = m.length,
                A = x.length;
            for (n = 0; A > n; ++n) f = (u = x[n]).source, (p = (y = (h = u.target).x - f.x) * y + (b = h.y - f.y) * b) && (y *= p = r * o[n] * ((p = Math.sqrt(p)) - i[n]) / p, b *= p, h.x -= y * (v = f.weight / (h.weight + f.weight)), h.y -= b * v, f.x += y * (v = 1 - v), f.y += b * v);
            if ((v = r * g) && (y = l[0] / 2, b = l[1] / 2, n = -1, v))
                for (; ++n < w;)(u = m[n]).x += (y - u.x) * v, u.y += (b - u.y) * v;
            if (d)
                for (function t(e, n, r) {
                        var i = 0,
                            o = 0;
                        if (e.charge = 0, !e.leaf)
                            for (var a, u = e.nodes, s = u.length, l = -1; ++l < s;) null != (a = u[l]) && (t(a, n, r), e.charge += a.charge, i += a.charge * a.cx, o += a.charge * a.cy);
                        if (e.point) {
                            e.leaf || (e.point.x += Math.random() - .5, e.point.y += Math.random() - .5);
                            var c = n * r[e.point.index];
                            e.charge += e.pointCharge = c, i += c * e.point.x, o += c * e.point.y
                        }
                        e.cx = i / e.charge, e.cy = o / e.charge
                    }(e = Fi.geom.quadtree(m), r, a), n = -1; ++n < w;)(u = m[n]).fixed || e.visit(t(u));
            for (n = -1; ++n < w;)(u = m[n]).fixed ? (u.x = u.px, u.y = u.py) : (u.x -= (u.px - (u.px = u.x)) * c, u.y -= (u.py - (u.py = u.y)) * c);
            s.tick({
                type: "tick",
                alpha: r
            })
        }, u.nodes = function(t) {
            return arguments.length ? (m = t, u) : m
        }, u.links = function(t) {
            return arguments.length ? (x = t, u) : x
        }, u.size = function(t) {
            return arguments.length ? (l = t, u) : l
        }, u.linkDistance = function(t) {
            return arguments.length ? (f = "function" == typeof t ? t : +t, u) : f
        }, u.distance = u.linkDistance, u.linkStrength = function(t) {
            return arguments.length ? (h = "function" == typeof t ? t : +t, u) : h
        }, u.friction = function(t) {
            return arguments.length ? (c = +t, u) : c
        }, u.charge = function(t) {
            return arguments.length ? (d = "function" == typeof t ? t : +t, u) : d
        }, u.chargeDistance = function(t) {
            return arguments.length ? (p = t * t, u) : Math.sqrt(p)
        }, u.gravity = function(t) {
            return arguments.length ? (g = +t, u) : g
        }, u.theta = function(t) {
            return arguments.length ? (v = t * t, u) : Math.sqrt(v)
        }, u.alpha = function(t) {
            return arguments.length ? (t = +t, r ? r = t > 0 ? t : 0 : t > 0 && (s.start({
                type: "start",
                alpha: r = t
            }), Fi.timer(u.tick)), u) : r
        }, u.start = function() {
            function t(t, r) {
                if (!n) {
                    for (n = new Array(s), u = 0; s > u; ++u) n[u] = [];
                    for (u = 0; c > u; ++u) {
                        var i = x[u];
                        n[i.source.index].push(i.target), n[i.target.index].push(i.source)
                    }
                }
                for (var o, a = n[e], u = -1, l = a.length; ++u < l;)
                    if (!isNaN(o = a[u][t])) return o;
                return Math.random() * r
            }
            var e, n, r, s = m.length,
                c = x.length,
                p = l[0],
                g = l[1];
            for (e = 0; s > e; ++e)(r = m[e]).index = e, r.weight = 0;
            for (e = 0; c > e; ++e) "number" == typeof(r = x[e]).source && (r.source = m[r.source]), "number" == typeof r.target && (r.target = m[r.target]), ++r.source.weight, ++r.target.weight;
            for (e = 0; s > e; ++e) r = m[e], isNaN(r.x) && (r.x = t("x", p)), isNaN(r.y) && (r.y = t("y", g)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
            if (i = [], "function" == typeof f)
                for (e = 0; c > e; ++e) i[e] = +f.call(this, x[e], e);
            else
                for (e = 0; c > e; ++e) i[e] = f;
            if (o = [], "function" == typeof h)
                for (e = 0; c > e; ++e) o[e] = +h.call(this, x[e], e);
            else
                for (e = 0; c > e; ++e) o[e] = h;
            if (a = [], "function" == typeof d)
                for (e = 0; s > e; ++e) a[e] = +d.call(this, m[e], e);
            else
                for (e = 0; s > e; ++e) a[e] = d;
            return u.resume()
        }, u.resume = function() {
            return u.alpha(.1)
        }, u.stop = function() {
            return u.alpha(0)
        }, u.drag = function() {
            return n || (n = Fi.behavior.drag().origin(y).on("dragstart.force", ur).on("drag.force", e).on("dragend.force", sr)), arguments.length ? void this.on("mouseover.force", lr).on("mouseout.force", cr).call(n) : n
        }, Fi.rebind(u, s, "on")
    };
    var Va = 20,
        Ga = 1,
        Xa = 1 / 0;
    Fi.layout.hierarchy = function() {
        function t(i) {
            var o, a = [i],
                u = [];
            for (i.depth = 0; null != (o = a.pop());)
                if (u.push(o), (l = n.call(t, o, o.depth)) && (s = l.length)) {
                    for (var s, l, c; --s >= 0;) a.push(c = l[s]), c.parent = o, c.depth = o.depth + 1;
                    r && (o.value = 0), o.children = l
                } else r && (o.value = +r.call(t, o, o.depth) || 0), delete o.children;
            return dr(i, function(t) {
                var n, i;
                e && (n = t.children) && n.sort(e), r && (i = t.parent) && (i.value += t.value)
            }), u
        }
        var e = vr,
            n = pr,
            r = gr;
        return t.sort = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.children = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.value = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.revalue = function(e) {
            return r && (hr(e, function(t) {
                t.children && (t.value = 0)
            }), dr(e, function(e) {
                var n;
                e.children || (e.value = +r.call(t, e, e.depth) || 0), (n = e.parent) && (n.value += e.value)
            })), e
        }, t
    }, Fi.layout.partition = function() {
        function t(t, r) {
            var i = e.call(this, t, r);
            return function t(e, n, r, i) {
                var o = e.children;
                if (e.x = n, e.y = e.depth * i, e.dx = r, e.dy = i, o && (a = o.length)) {
                    var a, u, s, l = -1;
                    for (r = e.value ? r / e.value : 0; ++l < a;) t(u = o[l], n, s = u.value * r, i), n += s
                }
            }(i[0], 0, n[0], n[1] / function t(e) {
                var n = e.children,
                    r = 0;
                if (n && (i = n.length))
                    for (var i, o = -1; ++o < i;) r = Math.max(r, t(n[o]));
                return 1 + r
            }(i[0])), i
        }
        var e = Fi.layout.hierarchy(),
            n = [1, 1];
        return t.size = function(e) {
            return arguments.length ? (n = e, t) : n
        }, fr(t, e)
    }, Fi.layout.pie = function() {
        function t(a) {
            var u, s = a.length,
                l = a.map(function(n, r) {
                    return +e.call(t, n, r)
                }),
                c = +("function" == typeof r ? r.apply(this, arguments) : r),
                f = ("function" == typeof i ? i.apply(this, arguments) : i) - c,
                h = Math.min(Math.abs(f) / s, +("function" == typeof o ? o.apply(this, arguments) : o)),
                d = h * (0 > f ? -1 : 1),
                p = (f - s * d) / Fi.sum(l),
                g = Fi.range(s),
                v = [];
            return null != n && g.sort(n === Za ? function(t, e) {
                return l[e] - l[t]
            } : function(t, e) {
                return n(a[t], a[e])
            }), g.forEach(function(t) {
                v[t] = {
                    data: a[t],
                    value: u = l[t],
                    startAngle: c,
                    endAngle: c += u * p + d,
                    padAngle: h
                }
            }), v
        }
        var e = Number,
            n = Za,
            r = 0,
            i = go,
            o = 0;
        return t.value = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.sort = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.startAngle = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.endAngle = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t.padAngle = function(e) {
            return arguments.length ? (o = e, t) : o
        }, t
    };
    var Za = {};
    Fi.layout.stack = function() {
        function t(u, s) {
            if (!(h = u.length)) return u;
            var l = u.map(function(n, r) {
                    return e.call(t, n, r)
                }),
                c = l.map(function(e) {
                    return e.map(function(e, n) {
                        return [o.call(t, e, n), a.call(t, e, n)]
                    })
                }),
                f = n.call(t, c, s);
            l = Fi.permute(l, f), c = Fi.permute(c, f);
            var h, d, p, g, v = r.call(t, c, s),
                y = l[0].length;
            for (p = 0; y > p; ++p)
                for (i.call(t, l[0][p], g = v[p], c[0][p][1]), d = 1; h > d; ++d) i.call(t, l[d][p], g += c[d - 1][p][1], c[d][p][1]);
            return u
        }
        var e = y,
            n = wr,
            r = Ar,
            i = br,
            o = mr,
            a = xr;
        return t.values = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.order = function(e) {
            return arguments.length ? (n = "function" == typeof e ? e : Qa.get(e) || wr, t) : n
        }, t.offset = function(e) {
            return arguments.length ? (r = "function" == typeof e ? e : Ka.get(e) || Ar, t) : r
        }, t.x = function(e) {
            return arguments.length ? (o = e, t) : o
        }, t.y = function(e) {
            return arguments.length ? (a = e, t) : a
        }, t.out = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t
    };
    var Qa = Fi.map({
            "inside-out": function(t) {
                var e, n, r = t.length,
                    i = t.map(Mr),
                    o = t.map(kr),
                    a = Fi.range(r).sort(function(t, e) {
                        return i[t] - i[e]
                    }),
                    u = 0,
                    s = 0,
                    l = [],
                    c = [];
                for (e = 0; r > e; ++e) n = a[e], s > u ? (u += o[n], l.push(n)) : (s += o[n], c.push(n));
                return c.reverse().concat(l)
            },
            reverse: function(t) {
                return Fi.range(t.length).reverse()
            },
            default: wr
        }),
        Ka = Fi.map({
            silhouette: function(t) {
                var e, n, r, i = t.length,
                    o = t[0].length,
                    a = [],
                    u = 0,
                    s = [];
                for (n = 0; o > n; ++n) {
                    for (e = 0, r = 0; i > e; e++) r += t[e][n][1];
                    r > u && (u = r), a.push(r)
                }
                for (n = 0; o > n; ++n) s[n] = (u - a[n]) / 2;
                return s
            },
            wiggle: function(t) {
                var e, n, r, i, o, a, u, s, l, c = t.length,
                    f = t[0],
                    h = f.length,
                    d = [];
                for (d[0] = s = l = 0, n = 1; h > n; ++n) {
                    for (e = 0, i = 0; c > e; ++e) i += t[e][n][1];
                    for (e = 0, o = 0, u = f[n][0] - f[n - 1][0]; c > e; ++e) {
                        for (r = 0, a = (t[e][n][1] - t[e][n - 1][1]) / (2 * u); e > r; ++r) a += (t[r][n][1] - t[r][n - 1][1]) / u;
                        o += a * t[e][n][1]
                    }
                    d[n] = s -= i ? o / i * u : 0, l > s && (l = s)
                }
                for (n = 0; h > n; ++n) d[n] -= l;
                return d
            },
            expand: function(t) {
                var e, n, r, i = t.length,
                    o = t[0].length,
                    a = 1 / i,
                    u = [];
                for (n = 0; o > n; ++n) {
                    for (e = 0, r = 0; i > e; e++) r += t[e][n][1];
                    if (r)
                        for (e = 0; i > e; e++) t[e][n][1] /= r;
                    else
                        for (e = 0; i > e; e++) t[e][n][1] = a
                }
                for (n = 0; o > n; ++n) u[n] = 0;
                return u
            },
            zero: Ar
        });
    Fi.layout.histogram = function() {
        function t(t, o) {
            for (var a, u, s = [], l = t.map(n, this), c = r.call(this, l, o), f = i.call(this, c, l, o), h = (o = -1, l.length), d = f.length - 1, p = e ? 1 : 1 / h; ++o < d;)(a = s[o] = []).dx = f[o + 1] - (a.x = f[o]), a.y = 0;
            if (d > 0)
                for (o = -1; ++o < h;)(u = l[o]) >= c[0] && u <= c[1] && ((a = s[Fi.bisect(f, u, 1, d) - 1]).y += p, a.push(t[o]));
            return s
        }
        var e = !0,
            n = Number,
            r = Er,
            i = Cr;
        return t.value = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.range = function(e) {
            return arguments.length ? (r = wt(e), t) : r
        }, t.bins = function(e) {
            return arguments.length ? (i = "number" == typeof e ? function(t) {
                return Tr(t, e)
            } : wt(e), t) : i
        }, t.frequency = function(n) {
            return arguments.length ? (e = !!n, t) : e
        }, t
    }, Fi.layout.pack = function() {
        function t(t, o) {
            var a = n.call(this, t, o),
                u = a[0],
                s = i[0],
                l = i[1],
                c = null == e ? Math.sqrt : "function" == typeof e ? e : function() {
                    return e
                };
            if (u.x = u.y = 0, dr(u, function(t) {
                    t.r = +c(t.value)
                }), dr(u, Rr), r) {
                var f = r * (e ? 1 : Math.max(2 * u.r / s, 2 * u.r / l)) / 2;
                dr(u, function(t) {
                    t.r += f
                }), dr(u, Rr), dr(u, function(t) {
                    t.r -= f
                })
            }
            return function t(e, n, r, i) {
                var o = e.children;
                if (e.x = n += i * e.x, e.y = r += i * e.y, e.r *= i, o)
                    for (var a = -1, u = o.length; ++a < u;) t(o[a], n, r, i)
            }(u, s / 2, l / 2, e ? 1 : 1 / Math.max(2 * u.r / s, 2 * u.r / l)), a
        }
        var e, n = Fi.layout.hierarchy().sort(Sr),
            r = 0,
            i = [1, 1];
        return t.size = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t.radius = function(n) {
            return arguments.length ? (e = null == n || "function" == typeof n ? n : +n, t) : e
        }, t.padding = function(e) {
            return arguments.length ? (r = +e, t) : r
        }, fr(t, n)
    }, Fi.layout.tree = function() {
        function t(t, s) {
            var l = i.call(this, t, s),
                c = l[0],
                f = function(t) {
                    for (var e, n = {
                            A: null,
                            children: [t]
                        }, r = [n]; null != (e = r.pop());)
                        for (var i, o = e.children, a = 0, u = o.length; u > a; ++a) r.push((o[a] = i = {
                            _: o[a],
                            parent: e,
                            children: (i = o[a].children) && i.slice() || [],
                            A: null,
                            a: null,
                            z: 0,
                            m: 0,
                            c: 0,
                            s: 0,
                            t: null,
                            i: a
                        }).a = i);
                    return n.children[0]
                }(c);
            if (dr(f, e), f.parent.m = -f.z, hr(f, n), u) hr(c, r);
            else {
                var h = c,
                    d = c,
                    p = c;
                hr(c, function(t) {
                    t.x < h.x && (h = t), t.x > d.x && (d = t), t.depth > p.depth && (p = t)
                });
                var g = o(h, d) / 2 - h.x,
                    v = a[0] / (d.x + o(d, h) / 2 + g),
                    y = a[1] / (p.depth || 1);
                hr(c, function(t) {
                    t.x = (t.x + g) * v, t.y = t.depth * y
                })
            }
            return l
        }

        function e(t) {
            var e = t.children,
                n = t.parent.children,
                r = t.i ? n[t.i - 1] : null;
            if (e.length) {
                ! function(t) {
                    for (var e, n = 0, r = 0, i = t.children, o = i.length; --o >= 0;)(e = i[o]).z += n, e.m += n, n += e.s + (r += e.c)
                }(t);
                var i = (e[0].z + e[e.length - 1].z) / 2;
                r ? (t.z = r.z + o(t._, r._), t.m = t.z - i) : t.z = i
            } else r && (t.z = r.z + o(t._, r._));
            t.parent.A = function(t, e, n) {
                if (e) {
                    for (var r, i = t, a = t, u = e, s = i.parent.children[0], l = i.m, c = a.m, f = u.m, h = s.m; u = Fr(u), i = qr(i), u && i;) s = qr(s), (a = Fr(a)).a = t, (r = u.z + f - i.z - l + o(u._, i._)) > 0 && (m = t, x = n, d = (y = u).a.parent === m.parent ? y.a : x, void 0, v = (g = r) / ((p = t).i - d.i), p.c -= v, p.s += g, d.c += v, p.z += g, p.m += g, l += r, c += r), f += u.m, l += i.m, h += s.m, c += a.m;
                    u && !Fr(a) && (a.t = u, a.m += f - c), i && !qr(s) && (s.t = i, s.m += l - h, n = t)
                }
                var d, p, g, v;
                var y, m, x;
                return n
            }(t, r, t.parent.A || n[0])
        }

        function n(t) {
            t._.x = t.z + t.parent.m, t.m += t.parent.m
        }

        function r(t) {
            t.x *= a[0], t.y = t.depth * a[1]
        }
        var i = Fi.layout.hierarchy().sort(null).value(null),
            o = Hr,
            a = [1, 1],
            u = null;
        return t.separation = function(e) {
            return arguments.length ? (o = e, t) : o
        }, t.size = function(e) {
            return arguments.length ? (u = null == (a = e) ? r : null, t) : u ? null : a
        }, t.nodeSize = function(e) {
            return arguments.length ? (u = null == (a = e) ? null : r, t) : u ? a : null
        }, fr(t, i)
    }, Fi.layout.cluster = function() {
        function t(t, o) {
            var a, u = e.call(this, t, o),
                s = u[0],
                l = 0;
            dr(s, function(t) {
                var e, r, i = t.children;
                i && i.length ? (t.x = (r = i).reduce(function(t, e) {
                    return t + e.x
                }, 0) / r.length, t.y = (e = i, 1 + Fi.max(e, function(t) {
                    return t.y
                }))) : (t.x = a ? l += n(t, a) : 0, t.y = 0, a = t)
            });
            var c = function t(e) {
                    var n = e.children;
                    return n && n.length ? t(n[0]) : e
                }(s),
                f = function t(e) {
                    var n, r = e.children;
                    return r && (n = r.length) ? t(r[n - 1]) : e
                }(s),
                h = c.x - n(c, f) / 2,
                d = f.x + n(f, c) / 2;
            return dr(s, i ? function(t) {
                t.x = (t.x - s.x) * r[0], t.y = (s.y - t.y) * r[1]
            } : function(t) {
                t.x = (t.x - h) / (d - h) * r[0], t.y = (1 - (s.y ? t.y / s.y : 1)) * r[1]
            }), u
        }
        var e = Fi.layout.hierarchy().sort(null).value(null),
            n = Hr,
            r = [1, 1],
            i = !1;
        return t.separation = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.size = function(e) {
            return arguments.length ? (i = null == (r = e), t) : i ? null : r
        }, t.nodeSize = function(e) {
            return arguments.length ? (i = null != (r = e), t) : i ? r : null
        }, fr(t, e)
    }, Fi.layout.treemap = function() {
        function t(t, e) {
            for (var n, r, i = -1, o = t.length; ++i < o;) r = (n = t[i]).value * (0 > e ? 0 : e), n.area = isNaN(r) || 0 >= r ? 0 : r
        }

        function e(n) {
            var o = n.children;
            if (o && o.length) {
                var a, u, s, l = f(n),
                    c = [],
                    h = o.slice(),
                    p = 1 / 0,
                    g = "slice" === d ? l.dx : "dice" === d ? l.dy : "slice-dice" === d ? 1 & n.depth ? l.dy : l.dx : Math.min(l.dx, l.dy);
                for (t(h, l.dx * l.dy / n.value), c.area = 0;
                    (s = h.length) > 0;) c.push(a = h[s - 1]), c.area += a.area, "squarify" !== d || (u = r(c, g)) <= p ? (h.pop(), p = u) : (c.area -= c.pop().area, i(c, g, l, !1), g = Math.min(l.dx, l.dy), c.length = c.area = 0, p = 1 / 0);
                c.length && (i(c, g, l, !0), c.length = c.area = 0), o.forEach(e)
            }
        }

        function n(e) {
            var r = e.children;
            if (r && r.length) {
                var o, a = f(e),
                    u = r.slice(),
                    s = [];
                for (t(u, a.dx * a.dy / e.value), s.area = 0; o = u.pop();) s.push(o), s.area += o.area, null != o.z && (i(s, o.z ? a.dx : a.dy, a, !u.length), s.length = s.area = 0);
                r.forEach(n)
            }
        }

        function r(t, e) {
            for (var n, r = t.area, i = 0, o = 1 / 0, a = -1, u = t.length; ++a < u;)(n = t[a].area) && (o > n && (o = n), n > i && (i = n));
            return e *= e, (r *= r) ? Math.max(e * i * p / r, r / (e * o * p)) : 1 / 0
        }

        function i(t, e, n, r) {
            var i, o = -1,
                a = t.length,
                u = n.x,
                l = n.y,
                c = e ? s(t.area / e) : 0;
            if (e == n.dx) {
                for ((r || c > n.dy) && (c = n.dy); ++o < a;)(i = t[o]).x = u, i.y = l, i.dy = c, u += i.dx = Math.min(n.x + n.dx - u, c ? s(i.area / c) : 0);
                i.z = !0, i.dx += n.x + n.dx - u, n.y += c, n.dy -= c
            } else {
                for ((r || c > n.dx) && (c = n.dx); ++o < a;)(i = t[o]).x = u, i.y = l, i.dx = c, l += i.dy = Math.min(n.y + n.dy - l, c ? s(i.area / c) : 0);
                i.z = !1, i.dy += n.y + n.dy - l, n.x += c, n.dx -= c
            }
        }

        function o(r) {
            var i = a || u(r),
                o = i[0];
            return o.x = 0, o.y = 0, o.dx = l[0], o.dy = l[1], a && u.revalue(o), t([o], o.dx * o.dy / o.value), (a ? n : e)(o), h && (a = i), i
        }
        var a, u = Fi.layout.hierarchy(),
            s = Math.round,
            l = [1, 1],
            c = null,
            f = Pr,
            h = !1,
            d = "squarify",
            p = .5 * (1 + Math.sqrt(5));
        return o.size = function(t) {
            return arguments.length ? (l = t, o) : l
        }, o.padding = function(t) {
            function e(e) {
                return Ir(e, t)
            }
            return arguments.length ? (f = null == (c = t) ? Pr : "function" == (n = typeof t) ? function(e) {
                var n = t.call(o, e, e.depth);
                return null == n ? Pr(e) : Ir(e, "number" == typeof n ? [n, n, n, n] : n)
            } : "number" === n ? (t = [t, t, t, t], e) : e, o) : c;
            var n
        }, o.round = function(t) {
            return arguments.length ? (s = t ? Math.round : Number, o) : s != Number
        }, o.sticky = function(t) {
            return arguments.length ? (h = t, a = null, o) : h
        }, o.ratio = function(t) {
            return arguments.length ? (p = t, o) : p
        }, o.mode = function(t) {
            return arguments.length ? (d = t + "", o) : d
        }, fr(o, u)
    }, Fi.random = {
        normal: function(t, e) {
            var n = arguments.length;
            return 2 > n && (e = 1), 1 > n && (t = 0),
                function() {
                    var n, r, i;
                    do {
                        i = (n = 2 * Math.random() - 1) * n + (r = 2 * Math.random() - 1) * r
                    } while (!i || i > 1);
                    return t + e * n * Math.sqrt(-2 * Math.log(i) / i)
                }
        },
        logNormal: function() {
            var t = Fi.random.normal.apply(Fi, arguments);
            return function() {
                return Math.exp(t())
            }
        },
        bates: function(t) {
            var e = Fi.random.irwinHall(t);
            return function() {
                return e() / t
            }
        },
        irwinHall: function(t) {
            return function() {
                for (var e = 0, n = 0; t > n; n++) e += Math.random();
                return e
            }
        }
    }, Fi.scale = {};
    var Ja = {
        floor: y,
        ceil: y
    };
    Fi.scale.linear = function() {
        return function t(e, n, r, i) {
            function o() {
                var t = Math.min(e.length, n.length) > 2 ? Yr : Ur,
                    o = i ? ir : rr;
                return u = t(e, n, o, r), s = t(n, e, o, In), a
            }

            function a(t) {
                return u(t)
            }
            var u, s;
            return a.invert = function(t) {
                return s(t)
            }, a.domain = function(t) {
                return arguments.length ? (e = t.map(Number), o()) : e
            }, a.range = function(t) {
                return arguments.length ? (n = t, o()) : n
            }, a.rangeRound = function(t) {
                return a.range(t).interpolate(Kn)
            }, a.clamp = function(t) {
                return arguments.length ? (i = t, o()) : i
            }, a.interpolate = function(t) {
                return arguments.length ? (r = t, o()) : r
            }, a.ticks = function(t) {
                return Zr(e, t)
            }, a.tickFormat = function(t, n) {
                return Qr(e, t, n)
            }, a.nice = function(t) {
                return Gr(e, t), o()
            }, a.copy = function() {
                return t(e, n, r, i)
            }, o()
        }([0, 1], [0, 1], In, !1)
    };
    var tu = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    Fi.scale.log = function() {
        return function t(e, n, r, i) {
            function o(t) {
                return (r ? Math.log(0 > t ? 0 : t) : -Math.log(t > 0 ? 0 : -t)) / Math.log(n)
            }

            function a(t) {
                return r ? Math.pow(n, t) : -Math.pow(n, -t)
            }

            function u(t) {
                return e(o(t))
            }
            return u.invert = function(t) {
                return a(e.invert(t))
            }, u.domain = function(t) {
                return arguments.length ? (r = t[0] >= 0, e.domain((i = t.map(Number)).map(o)), u) : i
            }, u.base = function(t) {
                return arguments.length ? (n = +t, e.domain(i.map(o)), u) : n
            }, u.nice = function() {
                var t = Wr(i.map(o), r ? Math : nu);
                return e.domain(t), i = t.map(a), u
            }, u.ticks = function() {
                var t = zr(i),
                    e = [],
                    u = t[0],
                    s = t[1],
                    l = Math.floor(o(u)),
                    c = Math.ceil(o(s)),
                    f = n % 1 ? 2 : n;
                if (isFinite(c - l)) {
                    if (r) {
                        for (; c > l; l++)
                            for (var h = 1; f > h; h++) e.push(a(l) * h);
                        e.push(a(l))
                    } else
                        for (e.push(a(l)); l++ < c;)
                            for (h = f - 1; h > 0; h--) e.push(a(l) * h);
                    for (l = 0; e[l] < u; l++);
                    for (c = e.length; e[c - 1] > s; c--);
                    e = e.slice(l, c)
                }
                return e
            }, u.tickFormat = function(t, e) {
                if (!arguments.length) return eu;
                arguments.length < 2 ? e = eu : "function" != typeof e && (e = Fi.format(e));
                var n, i = Math.max(.1, t / u.ticks().length),
                    s = r ? (n = 1e-12, Math.ceil) : (n = -1e-12, Math.floor);
                return function(t) {
                    return t / a(s(o(t) + n)) <= i ? e(t) : ""
                }
            }, u.copy = function() {
                return t(e.copy(), n, r, i)
            }, Vr(u, e)
        }(Fi.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var eu = Fi.format(".0e"),
        nu = {
            floor: function(t) {
                return -Math.ceil(-t)
            },
            ceil: function(t) {
                return -Math.floor(-t)
            }
        };
    Fi.scale.pow = function() {
        return function t(e, n, r) {
            function i(t) {
                return e(o(t))
            }
            var o = Jr(n),
                a = Jr(1 / n);
            return i.invert = function(t) {
                return a(e.invert(t))
            }, i.domain = function(t) {
                return arguments.length ? (e.domain((r = t.map(Number)).map(o)), i) : r
            }, i.ticks = function(t) {
                return Zr(r, t)
            }, i.tickFormat = function(t, e) {
                return Qr(r, t, e)
            }, i.nice = function(t) {
                return i.domain(Gr(r, t))
            }, i.exponent = function(t) {
                return arguments.length ? (o = Jr(n = t), a = Jr(1 / n), e.domain(r.map(o)), i) : n
            }, i.copy = function() {
                return t(e.copy(), n, r)
            }, Vr(i, e)
        }(Fi.scale.linear(), 1, [0, 1])
    }, Fi.scale.sqrt = function() {
        return Fi.scale.pow().exponent(.5)
    }, Fi.scale.ordinal = function() {
        return function t(e, n) {
            function r(t) {
                return a[((o.get(t) || ("range" === n.t ? o.set(t, e.push(t)) : NaN)) - 1) % a.length]
            }

            function i(t, n) {
                return Fi.range(e.length).map(function(e) {
                    return t + n * e
                })
            }
            var o, a, u;
            return r.domain = function(t) {
                if (!arguments.length) return e;
                e = [], o = new s;
                for (var i, a = -1, u = t.length; ++a < u;) o.has(i = t[a]) || o.set(i, e.push(i));
                return r[n.t].apply(r, n.a)
            }, r.range = function(t) {
                return arguments.length ? (a = t, u = 0, n = {
                    t: "range",
                    a: arguments
                }, r) : a
            }, r.rangePoints = function(t, o) {
                arguments.length < 2 && (o = 0);
                var s = t[0],
                    l = t[1],
                    c = e.length < 2 ? (s = (s + l) / 2, 0) : (l - s) / (e.length - 1 + o);
                return a = i(s + c * o / 2, c), u = 0, n = {
                    t: "rangePoints",
                    a: arguments
                }, r
            }, r.rangeRoundPoints = function(t, o) {
                arguments.length < 2 && (o = 0);
                var s = t[0],
                    l = t[1],
                    c = e.length < 2 ? (s = l = Math.round((s + l) / 2), 0) : (l - s) / (e.length - 1 + o) | 0;
                return a = i(s + Math.round(c * o / 2 + (l - s - (e.length - 1 + o) * c) / 2), c), u = 0, n = {
                    t: "rangeRoundPoints",
                    a: arguments
                }, r
            }, r.rangeBands = function(t, o, s) {
                arguments.length < 2 && (o = 0), arguments.length < 3 && (s = o);
                var l = t[1] < t[0],
                    c = t[l - 0],
                    f = (t[1 - l] - c) / (e.length - o + 2 * s);
                return a = i(c + f * s, f), l && a.reverse(), u = f * (1 - o), n = {
                    t: "rangeBands",
                    a: arguments
                }, r
            }, r.rangeRoundBands = function(t, o, s) {
                arguments.length < 2 && (o = 0), arguments.length < 3 && (s = o);
                var l = t[1] < t[0],
                    c = t[l - 0],
                    f = t[1 - l],
                    h = Math.floor((f - c) / (e.length - o + 2 * s));
                return a = i(c + Math.round((f - c - (e.length - o) * h) / 2), h), l && a.reverse(), u = Math.round(h * (1 - o)), n = {
                    t: "rangeRoundBands",
                    a: arguments
                }, r
            }, r.rangeBand = function() {
                return u
            }, r.rangeExtent = function() {
                return zr(n.a[0])
            }, r.copy = function() {
                return t(e, n)
            }, r.domain(e)
        }([], {
            t: "range",
            a: [
                []
            ]
        })
    }, Fi.scale.category10 = function() {
        return Fi.scale.ordinal().range(ru)
    }, Fi.scale.category20 = function() {
        return Fi.scale.ordinal().range(iu)
    }, Fi.scale.category20b = function() {
        return Fi.scale.ordinal().range(ou)
    }, Fi.scale.category20c = function() {
        return Fi.scale.ordinal().range(au)
    };
    var ru = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(pt),
        iu = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(pt),
        ou = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(pt),
        au = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(pt);
    Fi.scale.quantile = function() {
        return function t(e, o) {
            function a() {
                var t = 0,
                    n = o.length;
                for (s = []; ++t < n;) s[t - 1] = Fi.quantile(e, t / n);
                return u
            }

            function u(t) {
                return isNaN(t = +t) ? void 0 : o[Fi.bisect(s, t)]
            }
            var s;
            return u.domain = function(t) {
                return arguments.length ? (e = t.map(r).filter(i).sort(n), a()) : e
            }, u.range = function(t) {
                return arguments.length ? (o = t, a()) : o
            }, u.quantiles = function() {
                return s
            }, u.invertExtent = function(t) {
                return 0 > (t = o.indexOf(t)) ? [NaN, NaN] : [t > 0 ? s[t - 1] : e[0], t < s.length ? s[t] : e[e.length - 1]]
            }, u.copy = function() {
                return t(e, o)
            }, a()
        }([], [])
    }, Fi.scale.quantize = function() {
        return function t(e, n, r) {
            function i(t) {
                return r[Math.max(0, Math.min(u, Math.floor(a * (t - e))))]
            }

            function o() {
                return a = r.length / (n - e), u = r.length - 1, i
            }
            var a, u;
            return i.domain = function(t) {
                return arguments.length ? (e = +t[0], n = +t[t.length - 1], o()) : [e, n]
            }, i.range = function(t) {
                return arguments.length ? (r = t, o()) : r
            }, i.invertExtent = function(t) {
                return [t = 0 > (t = r.indexOf(t)) ? NaN : t / a + e, t + 1 / a]
            }, i.copy = function() {
                return t(e, n, r)
            }, o()
        }(0, 1, [0, 1])
    }, Fi.scale.threshold = function() {
        return function t(e, n) {
            function r(t) {
                return t >= t ? n[Fi.bisect(e, t)] : void 0
            }
            return r.domain = function(t) {
                return arguments.length ? (e = t, r) : e
            }, r.range = function(t) {
                return arguments.length ? (n = t, r) : n
            }, r.invertExtent = function(t) {
                return t = n.indexOf(t), [e[t - 1], e[t]]
            }, r.copy = function() {
                return t(e, n)
            }, r
        }([.5], [0, 1])
    }, Fi.scale.identity = function() {
        return function t(e) {
            function n(t) {
                return +t
            }
            return n.invert = n, n.domain = n.range = function(t) {
                return arguments.length ? (e = t.map(n), n) : e
            }, n.ticks = function(t) {
                return Zr(e, t)
            }, n.tickFormat = function(t, n) {
                return Qr(e, t, n)
            }, n.copy = function() {
                return t(e)
            }, n
        }([0, 1])
    }, Fi.svg = {}, Fi.svg.arc = function() {
        function t() {
            var t = Math.max(0, +n.apply(this, arguments)),
                l = Math.max(0, +r.apply(this, arguments)),
                c = a.apply(this, arguments) - yo,
                f = u.apply(this, arguments) - yo,
                h = Math.abs(f - c),
                d = c > f ? 0 : 1;
            if (t > l && (p = l, l = t, t = p), h >= vo) return e(l, d) + (t ? e(t, 1 - d) : "") + "Z";
            var p, g, v, y, m, x, b, w, A, M, k, _, C = 0,
                T = 0,
                E = [];
            if ((y = (+s.apply(this, arguments) || 0) / 2) && (v = o === uu ? Math.sqrt(t * t + l * l) : +o.apply(this, arguments), d || (T *= -1), l && (T = K(v / l * Math.sin(y))), t && (C = K(v / t * Math.sin(y)))), l) {
                m = l * Math.cos(c + T), x = l * Math.sin(c + T), b = l * Math.cos(f - T), w = l * Math.sin(f - T);
                var S = Math.abs(f - c - 2 * T) <= po ? 0 : 1;
                if (T && ai(m, x, b, w) === d ^ S) {
                    var N = (c + f) / 2;
                    m = l * Math.cos(N), x = l * Math.sin(N), b = w = null
                }
            } else m = x = 0;
            if (t) {
                A = t * Math.cos(f - C), M = t * Math.sin(f - C), k = t * Math.cos(c + C), _ = t * Math.sin(c + C);
                var D = Math.abs(c - f + 2 * C) <= po ? 0 : 1;
                if (C && ai(A, M, k, _) === 1 - d ^ D) {
                    var L = (c + f) / 2;
                    A = t * Math.cos(L), M = t * Math.sin(L), k = _ = null
                }
            } else A = M = 0;
            if ((p = Math.min(Math.abs(l - t) / 2, +i.apply(this, arguments))) > .001) {
                g = l > t ^ d ? 0 : 1;
                var R = null == k ? [A, M] : null == b ? [m, x] : fn([m, x], [k, _], [b, w], [A, M]),
                    O = m - R[0],
                    $ = x - R[1],
                    j = b - R[0],
                    H = w - R[1],
                    q = 1 / Math.sin(Math.acos((O * j + $ * H) / (Math.sqrt(O * O + $ * $) * Math.sqrt(j * j + H * H))) / 2),
                    F = Math.sqrt(R[0] * R[0] + R[1] * R[1]);
                if (null != b) {
                    var P = Math.min(p, (l - F) / (q + 1)),
                        I = ui(null == k ? [A, M] : [k, _], [m, x], l, P, d),
                        z = ui([b, w], [A, M], l, P, d);
                    p === P ? E.push("M", I[0], "A", P, ",", P, " 0 0,", g, " ", I[1], "A", l, ",", l, " 0 ", 1 - d ^ ai(I[1][0], I[1][1], z[1][0], z[1][1]), ",", d, " ", z[1], "A", P, ",", P, " 0 0,", g, " ", z[0]) : E.push("M", I[0], "A", P, ",", P, " 0 1,", g, " ", z[0])
                } else E.push("M", m, ",", x);
                if (null != k) {
                    var B = Math.min(p, (t - F) / (q - 1)),
                        U = ui([m, x], [k, _], t, -B, d),
                        W = ui([A, M], null == b ? [m, x] : [b, w], t, -B, d);
                    p === B ? E.push("L", W[0], "A", B, ",", B, " 0 0,", g, " ", W[1], "A", t, ",", t, " 0 ", d ^ ai(W[1][0], W[1][1], U[1][0], U[1][1]), ",", 1 - d, " ", U[1], "A", B, ",", B, " 0 0,", g, " ", U[0]) : E.push("L", W[0], "A", B, ",", B, " 0 0,", g, " ", U[0])
                } else E.push("L", A, ",", M)
            } else E.push("M", m, ",", x), null != b && E.push("A", l, ",", l, " 0 ", S, ",", d, " ", b, ",", w), E.push("L", A, ",", M), null != k && E.push("A", t, ",", t, " 0 ", D, ",", 1 - d, " ", k, ",", _);
            return E.push("Z"), E.join("")
        }

        function e(t, e) {
            return "M0," + t + "A" + t + "," + t + " 0 1," + e + " 0," + -t + "A" + t + "," + t + " 0 1," + e + " 0," + t
        }
        var n = ei,
            r = ni,
            i = ti,
            o = uu,
            a = ri,
            u = ii,
            s = oi;
        return t.innerRadius = function(e) {
            return arguments.length ? (n = wt(e), t) : n
        }, t.outerRadius = function(e) {
            return arguments.length ? (r = wt(e), t) : r
        }, t.cornerRadius = function(e) {
            return arguments.length ? (i = wt(e), t) : i
        }, t.padRadius = function(e) {
            return arguments.length ? (o = e == uu ? uu : wt(e), t) : o
        }, t.startAngle = function(e) {
            return arguments.length ? (a = wt(e), t) : a
        }, t.endAngle = function(e) {
            return arguments.length ? (u = wt(e), t) : u
        }, t.padAngle = function(e) {
            return arguments.length ? (s = wt(e), t) : s
        }, t.centroid = function() {
            var t = (+n.apply(this, arguments) + +r.apply(this, arguments)) / 2,
                e = (+a.apply(this, arguments) + +u.apply(this, arguments)) / 2 - yo;
            return [Math.cos(e) * t, Math.sin(e) * t]
        }, t
    };
    var uu = "auto";
    Fi.svg.line = function() {
        return si(y)
    };
    var su = Fi.map({
        linear: li,
        "linear-closed": function(t) {
            return li(t) + "Z"
        },
        step: function(t) {
            for (var e = 0, n = t.length, r = t[0], i = [r[0], ",", r[1]]; ++e < n;) i.push("H", (r[0] + (r = t[e])[0]) / 2, "V", r[1]);
            return n > 1 && i.push("H", r[0]), i.join("")
        },
        "step-before": ci,
        "step-after": fi,
        basis: pi,
        "basis-open": function(t) {
            if (t.length < 4) return li(t);
            for (var e, n = [], r = -1, i = t.length, o = [0], a = [0]; ++r < 3;) e = t[r], o.push(e[0]), a.push(e[1]);
            for (n.push(gi(fu, o) + "," + gi(fu, a)), --r; ++r < i;) e = t[r], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), vi(n, o, a);
            return n.join("")
        },
        "basis-closed": function(t) {
            for (var e, n, r = -1, i = t.length, o = i + 4, a = [], u = []; ++r < 4;) n = t[r % i], a.push(n[0]), u.push(n[1]);
            for (e = [gi(fu, a), ",", gi(fu, u)], --r; ++r < o;) n = t[r % i], a.shift(), a.push(n[0]), u.shift(), u.push(n[1]), vi(e, a, u);
            return e.join("")
        },
        bundle: function(t, e) {
            var n = t.length - 1;
            if (n)
                for (var r, i, o = t[0][0], a = t[0][1], u = t[n][0] - o, s = t[n][1] - a, l = -1; ++l <= n;) i = l / n, (r = t[l])[0] = e * r[0] + (1 - e) * (o + i * u), r[1] = e * r[1] + (1 - e) * (a + i * s);
            return pi(t)
        },
        cardinal: function(t, e) {
            return t.length < 3 ? li(t) : t[0] + hi(t, di(t, e))
        },
        "cardinal-open": function(t, e) {
            return t.length < 4 ? li(t) : t[1] + hi(t.slice(1, -1), di(t, e))
        },
        "cardinal-closed": function(t, e) {
            return t.length < 3 ? li(t) : t[0] + hi((t.push(t[0]), t), di([t[t.length - 2]].concat(t, [t[1]]), e))
        },
        monotone: function(t) {
            return t.length < 3 ? li(t) : t[0] + hi(t, mi(t))
        }
    });
    su.forEach(function(t, e) {
        e.key = t, e.closed = /-closed$/.test(t)
    });
    var lu = [0, 2 / 3, 1 / 3, 0],
        cu = [0, 1 / 3, 2 / 3, 0],
        fu = [0, 1 / 6, 2 / 3, 1 / 6];
    Fi.svg.line.radial = function() {
        var t = si(xi);
        return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
    }, ci.reverse = fi, fi.reverse = ci, Fi.svg.area = function() {
        return bi(y)
    }, Fi.svg.area.radial = function() {
        var t = bi(xi);
        return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
    }, Fi.svg.chord = function() {
        function t(t, a) {
            var u, s, l = e(this, i, t, a),
                c = e(this, o, t, a);
            return "M" + l.p0 + n(l.r, l.p1, l.a1 - l.a0) + (s = c, (u = l).a0 == s.a0 && u.a1 == s.a1 ? r(l.r, l.p1, l.r, l.p0) : r(l.r, l.p1, c.r, c.p0) + n(c.r, c.p1, c.a1 - c.a0) + r(c.r, c.p1, l.r, l.p0)) + "Z"
        }

        function e(t, e, n, r) {
            var i = e.call(t, n, r),
                o = a.call(t, i, r),
                l = u.call(t, i, r) - yo,
                c = s.call(t, i, r) - yo;
            return {
                r: o,
                a0: l,
                a1: c,
                p0: [o * Math.cos(l), o * Math.sin(l)],
                p1: [o * Math.cos(c), o * Math.sin(c)]
            }
        }

        function n(t, e, n) {
            return "A" + t + "," + t + " 0 " + +(n > po) + ",1 " + e
        }

        function r(t, e, n, r) {
            return "Q 0,0 " + r
        }
        var i = Qe,
            o = Ke,
            a = wi,
            u = ri,
            s = ii;
        return t.radius = function(e) {
            return arguments.length ? (a = wt(e), t) : a
        }, t.source = function(e) {
            return arguments.length ? (i = wt(e), t) : i
        }, t.target = function(e) {
            return arguments.length ? (o = wt(e), t) : o
        }, t.startAngle = function(e) {
            return arguments.length ? (u = wt(e), t) : u
        }, t.endAngle = function(e) {
            return arguments.length ? (s = wt(e), t) : s
        }, t
    }, Fi.svg.diagonal = function() {
        function t(t, i) {
            var o = e.call(this, t, i),
                a = n.call(this, t, i),
                u = (o.y + a.y) / 2,
                s = [o, {
                    x: o.x,
                    y: u
                }, {
                    x: a.x,
                    y: u
                }, a];
            return "M" + (s = s.map(r))[0] + "C" + s[1] + " " + s[2] + " " + s[3]
        }
        var e = Qe,
            n = Ke,
            r = Ai;
        return t.source = function(n) {
            return arguments.length ? (e = wt(n), t) : e
        }, t.target = function(e) {
            return arguments.length ? (n = wt(e), t) : n
        }, t.projection = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t
    }, Fi.svg.diagonal.radial = function() {
        var t = Fi.svg.diagonal(),
            e = Ai,
            n = t.projection;
        return t.projection = function(t) {
            return arguments.length ? n((r = e = t, function() {
                var t = r.apply(this, arguments),
                    e = t[0],
                    n = t[1] - yo;
                return [e * Math.cos(n), e * Math.sin(n)]
            })) : e;
            var r
        }, t
    }, Fi.svg.symbol = function() {
        function t(t, r) {
            return (hu.get(e.call(this, t, r)) || _i)(n.call(this, t, r))
        }
        var e = ki,
            n = Mi;
        return t.type = function(n) {
            return arguments.length ? (e = wt(n), t) : e
        }, t.size = function(e) {
            return arguments.length ? (n = wt(e), t) : n
        }, t
    };
    var hu = Fi.map({
        circle: _i,
        cross: function(t) {
            var e = Math.sqrt(t / 5) / 2;
            return "M" + -3 * e + "," + -e + "H" + -e + "V" + -3 * e + "H" + e + "V" + -e + "H" + 3 * e + "V" + e + "H" + e + "V" + 3 * e + "H" + -e + "V" + e + "H" + -3 * e + "Z"
        },
        diamond: function(t) {
            var e = Math.sqrt(t / (2 * pu)),
                n = e * pu;
            return "M0," + -e + "L" + n + ",0 0," + e + " " + -n + ",0Z"
        },
        square: function(t) {
            var e = Math.sqrt(t) / 2;
            return "M" + -e + "," + -e + "L" + e + "," + -e + " " + e + "," + e + " " + -e + "," + e + "Z"
        },
        "triangle-down": function(t) {
            var e = Math.sqrt(t / du),
                n = e * du / 2;
            return "M0," + n + "L" + e + "," + -n + " " + -e + "," + -n + "Z"
        },
        "triangle-up": function(t) {
            var e = Math.sqrt(t / du),
                n = e * du / 2;
            return "M0," + -n + "L" + e + "," + n + " " + -e + "," + n + "Z"
        }
    });
    Fi.svg.symbolTypes = hu.keys();
    var du = Math.sqrt(3),
        pu = Math.tan(30 * mo);
    io.transition = function(t) {
        for (var e, n, r = gu || ++xu, i = Ni(t), o = [], a = vu || {
                time: Date.now(),
                ease: Vn,
                delay: 0,
                duration: 250
            }, u = -1, s = this.length; ++u < s;) {
            o.push(e = []);
            for (var l = this[u], c = -1, f = l.length; ++c < f;)(n = l[c]) && Di(n, c, i, r, a), e.push(n)
        }
        return Ti(o, i, r)
    }, io.interrupt = function(t) {
        return this.each(null == t ? yu : Ci(Ni(t)))
    };
    var gu, vu, yu = Ci(Ni()),
        mu = [],
        xu = 0;
    mu.call = io.call, mu.empty = io.empty, mu.node = io.node, mu.size = io.size, Fi.transition = function(t, e) {
        return t && t.transition ? gu ? t.transition(e) : t : Fi.selection().transition(t)
    }, Fi.transition.prototype = mu, mu.select = function(t) {
        var e, n, r, i = this.id,
            o = this.namespace,
            a = [];
        t = T(t);
        for (var u = -1, s = this.length; ++u < s;) {
            a.push(e = []);
            for (var l = this[u], c = -1, f = l.length; ++c < f;)(r = l[c]) && (n = t.call(r, r.__data__, c, u)) ? ("__data__" in r && (n.__data__ = r.__data__), Di(n, c, o, i, r[o][i]), e.push(n)) : e.push(null)
        }
        return Ti(a, o, i)
    }, mu.selectAll = function(t) {
        var e, n, r, i, o, a = this.id,
            u = this.namespace,
            s = [];
        t = E(t);
        for (var l = -1, c = this.length; ++l < c;)
            for (var f = this[l], h = -1, d = f.length; ++h < d;)
                if (r = f[h]) {
                    o = r[u][a], n = t.call(r, r.__data__, h, l), s.push(e = []);
                    for (var p = -1, g = n.length; ++p < g;)(i = n[p]) && Di(i, p, u, a, o), e.push(i)
                }
        return Ti(s, u, a)
    }, mu.filter = function(t) {
        var e, n, r = [];
        "function" != typeof t && (t = P(t));
        for (var i = 0, o = this.length; o > i; i++) {
            r.push(e = []);
            for (var a, u = 0, s = (a = this[i]).length; s > u; u++)(n = a[u]) && t.call(n, n.__data__, u, i) && e.push(n)
        }
        return Ti(r, this.namespace, this.id)
    }, mu.tween = function(t, e) {
        var n = this.id,
            r = this.namespace;
        return arguments.length < 2 ? this.node()[r][n].tween.get(t) : I(this, null == e ? function(e) {
            e[r][n].tween.remove(t)
        } : function(i) {
            i[r][n].tween.set(t, e)
        })
    }, mu.attr = function(t, e) {
        function n() {
            this.removeAttribute(o)
        }

        function r() {
            this.removeAttributeNS(o.space, o.local)
        }
        if (arguments.length < 2) {
            for (e in t) this.attr(e, t[e]);
            return this
        }
        var i = "transform" == t ? nr : In,
            o = Fi.ns.qualify(t);
        return Ei(this, "attr." + t, e, o.local ? function(t) {
            return null == t ? r : (t += "", function() {
                var e, n = this.getAttributeNS(o.space, o.local);
                return n !== t && (e = i(n, t), function(t) {
                    this.setAttributeNS(o.space, o.local, e(t))
                })
            })
        } : function(t) {
            return null == t ? n : (t += "", function() {
                var e, n = this.getAttribute(o);
                return n !== t && (e = i(n, t), function(t) {
                    this.setAttribute(o, e(t))
                })
            })
        })
    }, mu.attrTween = function(t, e) {
        var n = Fi.ns.qualify(t);
        return this.tween("attr." + t, n.local ? function(t, r) {
            var i = e.call(this, t, r, this.getAttributeNS(n.space, n.local));
            return i && function(t) {
                this.setAttributeNS(n.space, n.local, i(t))
            }
        } : function(t, r) {
            var i = e.call(this, t, r, this.getAttribute(n));
            return i && function(t) {
                this.setAttribute(n, i(t))
            }
        })
    }, mu.style = function(t, n, r) {
        function i() {
            this.style.removeProperty(t)
        }
        var o = arguments.length;
        if (3 > o) {
            if ("string" != typeof t) {
                for (r in 2 > o && (n = ""), t) this.style(r, t[r], n);
                return this
            }
            r = ""
        }
        return Ei(this, "style." + t, n, function(n) {
            return null == n ? i : (n += "", function() {
                var i, o = e(this).getComputedStyle(this, null).getPropertyValue(t);
                return o !== n && (i = In(o, n), function(e) {
                    this.style.setProperty(t, i(e), r)
                })
            })
        })
    }, mu.styleTween = function(t, n, r) {
        return arguments.length < 3 && (r = ""), this.tween("style." + t, function(i, o) {
            var a = n.call(this, i, o, e(this).getComputedStyle(this, null).getPropertyValue(t));
            return a && function(e) {
                this.style.setProperty(t, a(e), r)
            }
        })
    }, mu.text = function(t) {
        return Ei(this, "text", t, Si)
    }, mu.remove = function() {
        var t = this.namespace;
        return this.each("end.transition", function() {
            var e;
            this[t].count < 2 && (e = this.parentNode) && e.removeChild(this)
        })
    }, mu.ease = function(t) {
        var e = this.id,
            n = this.namespace;
        return arguments.length < 1 ? this.node()[n][e].ease : ("function" != typeof t && (t = Fi.ease.apply(Fi, arguments)), I(this, function(r) {
            r[n][e].ease = t
        }))
    }, mu.delay = function(t) {
        var e = this.id,
            n = this.namespace;
        return arguments.length < 1 ? this.node()[n][e].delay : I(this, "function" == typeof t ? function(r, i, o) {
            r[n][e].delay = +t.call(r, r.__data__, i, o)
        } : (t = +t, function(r) {
            r[n][e].delay = t
        }))
    }, mu.duration = function(t) {
        var e = this.id,
            n = this.namespace;
        return arguments.length < 1 ? this.node()[n][e].duration : I(this, "function" == typeof t ? function(r, i, o) {
            r[n][e].duration = Math.max(1, t.call(r, r.__data__, i, o))
        } : (t = Math.max(1, t), function(r) {
            r[n][e].duration = t
        }))
    }, mu.each = function(t, e) {
        var n = this.id,
            r = this.namespace;
        if (arguments.length < 2) {
            var i = vu,
                o = gu;
            try {
                gu = n, I(this, function(e, i, o) {
                    vu = e[r][n], t.call(e, e.__data__, i, o)
                })
            } finally {
                vu = i, gu = o
            }
        } else I(this, function(i) {
            var o = i[r][n];
            (o.event || (o.event = Fi.dispatch("start", "end", "interrupt"))).on(t, e)
        });
        return this
    }, mu.transition = function() {
        for (var t, e, n, r = this.id, i = ++xu, o = this.namespace, a = [], u = 0, s = this.length; s > u; u++) {
            a.push(t = []);
            for (var l, c = 0, f = (l = this[u]).length; f > c; c++)(e = l[c]) && Di(e, c, o, i, {
                time: (n = e[o][r]).time,
                ease: n.ease,
                delay: n.delay + n.duration,
                duration: n.duration
            }), t.push(e)
        }
        return Ti(a, o, i)
    }, Fi.svg.axis = function() {
        function t(t) {
            t.each(function() {
                var t, l = Fi.select(this),
                    c = this.__chart__ || n,
                    f = this.__chart__ = n.copy(),
                    h = null == s ? f.ticks ? f.ticks.apply(f, u) : f.domain() : s,
                    d = null == e ? f.tickFormat ? f.tickFormat.apply(f, u) : y : e,
                    p = l.selectAll(".tick").data(h, f),
                    g = p.enter().insert("g", ".domain").attr("class", "tick").style("opacity", fo),
                    v = Fi.transition(p.exit()).style("opacity", fo).remove(),
                    m = Fi.transition(p.order()).style("opacity", 1),
                    x = Math.max(i, 0) + a,
                    b = Br(f),
                    w = l.selectAll(".domain").data([0]),
                    A = (w.enter().append("path").attr("class", "domain"), Fi.transition(w));
                g.append("line"), g.append("text");
                var M, k, _, C, T = g.select("line"),
                    E = m.select("line"),
                    S = p.select("text").text(d),
                    N = g.select("text"),
                    D = m.select("text"),
                    L = "top" === r || "left" === r ? -1 : 1;
                if ("bottom" === r || "top" === r ? (t = Li, M = "x", _ = "y", k = "x2", C = "y2", S.attr("dy", 0 > L ? "0em" : ".71em").style("text-anchor", "middle"), A.attr("d", "M" + b[0] + "," + L * o + "V0H" + b[1] + "V" + L * o)) : (t = Ri, M = "y", _ = "x", k = "y2", C = "x2", S.attr("dy", ".32em").style("text-anchor", 0 > L ? "end" : "start"), A.attr("d", "M" + L * o + "," + b[0] + "H0V" + b[1] + "H" + L * o)), T.attr(C, L * i), N.attr(_, L * x), E.attr(k, 0).attr(C, L * i), D.attr(M, 0).attr(_, L * x), f.rangeBand) {
                    var R = f,
                        O = R.rangeBand() / 2;
                    c = f = function(t) {
                        return R(t) + O
                    }
                } else c.rangeBand ? c = f : v.call(t, f, c);
                g.call(t, c, f), m.call(t, f, f)
            })
        }
        var e, n = Fi.scale.linear(),
            r = bu,
            i = 6,
            o = 6,
            a = 3,
            u = [10],
            s = null;
        return t.scale = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.orient = function(e) {
            return arguments.length ? (r = e in wu ? e + "" : bu, t) : r
        }, t.ticks = function() {
            return arguments.length ? (u = arguments, t) : u
        }, t.tickValues = function(e) {
            return arguments.length ? (s = e, t) : s
        }, t.tickFormat = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.tickSize = function(e) {
            var n = arguments.length;
            return n ? (i = +e, o = +arguments[n - 1], t) : i
        }, t.innerTickSize = function(e) {
            return arguments.length ? (i = +e, t) : i
        }, t.outerTickSize = function(e) {
            return arguments.length ? (o = +e, t) : o
        }, t.tickPadding = function(e) {
            return arguments.length ? (a = +e, t) : a
        }, t.tickSubdivide = function() {
            return arguments.length && t
        }, t
    };
    var bu = "bottom",
        wu = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        };
    Fi.svg.brush = function() {
        function t(e) {
            e.each(function() {
                var e = Fi.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", o).on("touchstart.brush", o),
                    a = e.selectAll(".background").data([0]);
                a.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), e.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var u = e.selectAll(".resize").data(g, y);
                u.exit().remove(), u.enter().append("g").attr("class", function(t) {
                    return "resize " + t
                }).style("cursor", function(t) {
                    return Au[t]
                }).append("rect").attr("x", function(t) {
                    return /[ew]$/.test(t) ? -3 : null
                }).attr("y", function(t) {
                    return /^[ns]/.test(t) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), u.style("display", t.empty() ? "none" : null);
                var s, f = Fi.transition(e),
                    h = Fi.transition(a);
                l && (s = Br(l), h.attr("x", s[0]).attr("width", s[1] - s[0]), r(f)), c && (s = Br(c), h.attr("y", s[0]).attr("height", s[1] - s[0]), i(f)), n(f)
            })
        }

        function n(t) {
            t.selectAll(".resize").attr("transform", function(t) {
                return "translate(" + f[+/e$/.test(t)] + "," + h[+/^s/.test(t)] + ")"
            })
        }

        function r(t) {
            t.select(".extent").attr("x", f[0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", f[1] - f[0])
        }

        function i(t) {
            t.select(".extent").attr("y", h[0]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0])
        }

        function o() {
            function o() {
                var t = Fi.mouse(x),
                    e = !1;
                m && (t[0] += m[0], t[1] += m[1]), T || (Fi.event.altKey ? (y || (y = [(f[0] + f[1]) / 2, (h[0] + h[1]) / 2]), S[0] = f[+(t[0] < y[0])], S[1] = h[+(t[1] < y[1])]) : y = null), _ && g(t, l, 0) && (r(A), e = !0), C && g(t, c, 1) && (i(A), e = !0), e && (n(A), w({
                    type: "brush",
                    mode: T ? "move" : "resize"
                }))
            }

            function g(t, e, n) {
                var r, i, o = Br(e),
                    s = o[0],
                    l = o[1],
                    c = S[n],
                    g = n ? h : f,
                    v = g[1] - g[0];
                return T && (s -= c, l -= v + c), r = (n ? p : d) ? Math.max(s, Math.min(l, t[n])) : t[n], T ? i = (r += c) + v : (y && (c = Math.max(s, Math.min(l, 2 * y[n] - r))), r > c ? (i = r, r = c) : i = c), g[0] != r || g[1] != i ? (n ? u = null : a = null, g[0] = r, g[1] = i, !0) : void 0
            }

            function v() {
                o(), A.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), Fi.select("body").style("cursor", null), N.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), E(), w({
                    type: "brushend"
                })
            }
            var y, m, x = this,
                b = Fi.select(Fi.event.target),
                w = s.of(x, arguments),
                A = Fi.select(x),
                k = b.datum(),
                _ = !/^(n|s)$/.test(k) && l,
                C = !/^(e|w)$/.test(k) && c,
                T = b.classed("extent"),
                E = Y(x),
                S = Fi.mouse(x),
                N = Fi.select(e(x)).on("keydown.brush", function() {
                    32 == Fi.event.keyCode && (T || (y = null, S[0] -= f[1], S[1] -= h[1], T = 2), M())
                }).on("keyup.brush", function() {
                    32 == Fi.event.keyCode && 2 == T && (S[0] += f[1], S[1] += h[1], T = 0, M())
                });
            if (Fi.event.changedTouches ? N.on("touchmove.brush", o).on("touchend.brush", v) : N.on("mousemove.brush", o).on("mouseup.brush", v), A.interrupt().selectAll("*").interrupt(), T) S[0] = f[0] - S[0], S[1] = h[0] - S[1];
            else if (k) {
                var D = +/w$/.test(k),
                    L = +/^n/.test(k);
                m = [f[1 - D] - S[0], h[1 - L] - S[1]], S[0] = f[D], S[1] = h[L]
            } else Fi.event.altKey && (y = S.slice());
            A.style("pointer-events", "none").selectAll(".resize").style("display", null), Fi.select("body").style("cursor", b.style("cursor")), w({
                type: "brushstart"
            }), o()
        }
        var a, u, s = _(t, "brushstart", "brush", "brushend"),
            l = null,
            c = null,
            f = [0, 0],
            h = [0, 0],
            d = !0,
            p = !0,
            g = Mu[0];
        return t.event = function(t) {
            t.each(function() {
                var t = s.of(this, arguments),
                    e = {
                        x: f,
                        y: h,
                        i: a,
                        j: u
                    },
                    n = this.__chart__ || e;
                this.__chart__ = e, gu ? Fi.select(this).transition().each("start.brush", function() {
                    a = n.i, u = n.j, f = n.x, h = n.y, t({
                        type: "brushstart"
                    })
                }).tween("brush:brush", function() {
                    var n = zn(f, e.x),
                        r = zn(h, e.y);
                    return a = u = null,
                        function(i) {
                            f = e.x = n(i), h = e.y = r(i), t({
                                type: "brush",
                                mode: "resize"
                            })
                        }
                }).each("end.brush", function() {
                    a = e.i, u = e.j, t({
                        type: "brush",
                        mode: "resize"
                    }), t({
                        type: "brushend"
                    })
                }) : (t({
                    type: "brushstart"
                }), t({
                    type: "brush",
                    mode: "resize"
                }), t({
                    type: "brushend"
                }))
            })
        }, t.x = function(e) {
            return arguments.length ? (g = Mu[!(l = e) << 1 | !c], t) : l
        }, t.y = function(e) {
            return arguments.length ? (g = Mu[!l << 1 | !(c = e)], t) : c
        }, t.clamp = function(e) {
            return arguments.length ? (l && c ? (d = !!e[0], p = !!e[1]) : l ? d = !!e : c && (p = !!e), t) : l && c ? [d, p] : l ? d : c ? p : null
        }, t.extent = function(e) {
            var n, r, i, o, s;
            return arguments.length ? (l && (n = e[0], r = e[1], c && (n = n[0], r = r[0]), a = [n, r], l.invert && (n = l(n), r = l(r)), n > r && (s = n, n = r, r = s), (n != f[0] || r != f[1]) && (f = [n, r])), c && (i = e[0], o = e[1], l && (i = i[1], o = o[1]), u = [i, o], c.invert && (i = c(i), o = c(o)), i > o && (s = i, i = o, o = s), (i != h[0] || o != h[1]) && (h = [i, o])), t) : (l && (a ? (n = a[0], r = a[1]) : (n = f[0], r = f[1], l.invert && (n = l.invert(n), r = l.invert(r)), n > r && (s = n, n = r, r = s))), c && (u ? (i = u[0], o = u[1]) : (i = h[0], o = h[1], c.invert && (i = c.invert(i), o = c.invert(o)), i > o && (s = i, i = o, o = s))), l && c ? [
                [n, i],
                [r, o]
            ] : l ? [n, r] : c && [i, o])
        }, t.clear = function() {
            return t.empty() || (f = [0, 0], h = [0, 0], a = u = null), t
        }, t.empty = function() {
            return !!l && f[0] == f[1] || !!c && h[0] == h[1]
        }, Fi.rebind(t, s, "on")
    };
    var Au = {
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        },
        Mu = [
            ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
            ["e", "w"],
            ["n", "s"],
            []
        ],
        ku = Bo.format = Xo.timeFormat,
        _u = ku.utc,
        Cu = _u("%Y-%m-%dT%H:%M:%S.%LZ");
    ku.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Oi : Cu, Oi.parse = function(t) {
        var e = new Date(t);
        return isNaN(e) ? null : e
    }, Oi.toString = Cu.toString, Bo.second = Nt(function(t) {
        return new Uo(1e3 * Math.floor(t / 1e3))
    }, function(t, e) {
        t.setTime(t.getTime() + 1e3 * Math.floor(e))
    }, function(t) {
        return t.getSeconds()
    }), Bo.seconds = Bo.second.range, Bo.seconds.utc = Bo.second.utc.range, Bo.minute = Nt(function(t) {
        return new Uo(6e4 * Math.floor(t / 6e4))
    }, function(t, e) {
        t.setTime(t.getTime() + 6e4 * Math.floor(e))
    }, function(t) {
        return t.getMinutes()
    }), Bo.minutes = Bo.minute.range, Bo.minutes.utc = Bo.minute.utc.range, Bo.hour = Nt(function(t) {
        var e = t.getTimezoneOffset() / 60;
        return new Uo(36e5 * (Math.floor(t / 36e5 - e) + e))
    }, function(t, e) {
        t.setTime(t.getTime() + 36e5 * Math.floor(e))
    }, function(t) {
        return t.getHours()
    }), Bo.hours = Bo.hour.range, Bo.hours.utc = Bo.hour.utc.range, Bo.month = Nt(function(t) {
        return (t = Bo.day(t)).setDate(1), t
    }, function(t, e) {
        t.setMonth(t.getMonth() + e)
    }, function(t) {
        return t.getMonth()
    }), Bo.months = Bo.month.range, Bo.months.utc = Bo.month.utc.range;
    var Tu = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
        Eu = [
            [Bo.second, 1],
            [Bo.second, 5],
            [Bo.second, 15],
            [Bo.second, 30],
            [Bo.minute, 1],
            [Bo.minute, 5],
            [Bo.minute, 15],
            [Bo.minute, 30],
            [Bo.hour, 1],
            [Bo.hour, 3],
            [Bo.hour, 6],
            [Bo.hour, 12],
            [Bo.day, 1],
            [Bo.day, 2],
            [Bo.week, 1],
            [Bo.month, 1],
            [Bo.month, 3],
            [Bo.year, 1]
        ],
        Su = ku.multi([
            [".%L", function(t) {
                return t.getMilliseconds()
            }],
            [":%S", function(t) {
                return t.getSeconds()
            }],
            ["%I:%M", function(t) {
                return t.getMinutes()
            }],
            ["%I %p", function(t) {
                return t.getHours()
            }],
            ["%a %d", function(t) {
                return t.getDay() && 1 != t.getDate()
            }],
            ["%b %d", function(t) {
                return 1 != t.getDate()
            }],
            ["%B", function(t) {
                return t.getMonth()
            }],
            ["%Y", ye]
        ]),
        Nu = {
            range: function(t, e, n) {
                return Fi.range(Math.ceil(t / n) * n, +e, n).map(ji)
            },
            floor: y,
            ceil: y
        };
    Eu.year = Bo.year, Bo.scale = function() {
        return $i(Fi.scale.linear(), Eu, Su)
    };
    var Du = Eu.map(function(t) {
            return [t[0].utc, t[1]]
        }),
        Lu = _u.multi([
            [".%L", function(t) {
                return t.getUTCMilliseconds()
            }],
            [":%S", function(t) {
                return t.getUTCSeconds()
            }],
            ["%I:%M", function(t) {
                return t.getUTCMinutes()
            }],
            ["%I %p", function(t) {
                return t.getUTCHours()
            }],
            ["%a %d", function(t) {
                return t.getUTCDay() && 1 != t.getUTCDate()
            }],
            ["%b %d", function(t) {
                return 1 != t.getUTCDate()
            }],
            ["%B", function(t) {
                return t.getUTCMonth()
            }],
            ["%Y", ye]
        ]);
    Du.year = Bo.year.utc, Bo.scale.utc = function() {
        return $i(Fi.scale.linear(), Du, Lu)
    }, Fi.text = At(function(t) {
        return t.responseText
    }), Fi.json = function(t, e) {
        return Mt(t, "application/json", Hi, e)
    }, Fi.html = function(t, e) {
        return Mt(t, "text/html", qi, e)
    }, Fi.xml = At(function(t) {
        return t.responseXML
    }), "function" == typeof define && define.amd ? define(Fi) : "object" == typeof module && module.exports && (module.exports = Fi), this.d3 = Fi
}(),
function(t) {
    function e(t) {
        return t
    }

    function n(t, e) {
        for (var n = 0, r = e.length, i = Array(r); r > n; ++n) i[n] = t[e[n]];
        return i
    }

    function r(t) {
        function e(e, n, r, i) {
            for (; i > r;) {
                var o = r + i >>> 1;
                n < t(e[o]) ? i = o : r = o + 1
            }
            return r
        }
        return e.right = e, e.left = function(e, n, r, i) {
            for (; i > r;) {
                var o = r + i >>> 1;
                t(e[o]) < n ? r = o + 1 : i = o
            }
            return r
        }, e
    }

    function i(t) {
        function e(t, e, r) {
            for (var i = r - e, o = 1 + (i >>> 1); --o > 0;) n(t, o, i, e);
            return t
        }

        function n(e, n, r, i) {
            for (var o, a = e[--i + n], u = t(a);
                (o = n << 1) <= r && (r > o && t(e[i + o]) > t(e[i + o + 1]) && o++, !(u <= t(e[i + o])));) e[i + n] = e[i + o], n = o;
            e[i + n] = a
        }
        return e.sort = function(t, e, r) {
            for (var i, o = r - e; --o > 0;) i = t[e], t[e] = t[e + o], t[e + o] = i, n(t, 1, o, e);
            return t
        }, e
    }

    function o(t) {
        var e = i(t);
        return function(n, r, i, o) {
            var a, u, s, l = Array(o = Math.min(i - r, o));
            for (u = 0; o > u; ++u) l[u] = n[r++];
            if (e(l, 0, o), i > r) {
                a = t(l[0]);
                do {
                    t(s = n[r]) > a && (l[0] = s, a = t(e(l, 0, o)[0]))
                } while (++r < i)
            }
            return l
        }
    }

    function a(t) {
        return function(e, n, r) {
            for (var i = n + 1; r > i; ++i) {
                for (var o = i, a = e[i], u = t(a); o > n && t(e[o - 1]) > u; --o) e[o] = e[o - 1];
                e[o] = a
            }
            return e
        }
    }

    function u(t) {
        function e(r, i, o) {
            return (b > o - i ? n : function(n, r, i) {
                var o, a = 0 | (i - r) / 6,
                    u = r + a,
                    s = i - 1 - a,
                    l = r + i - 1 >> 1,
                    c = l - a,
                    f = l + a,
                    h = n[u],
                    d = t(h),
                    p = n[c],
                    g = t(p),
                    v = n[l],
                    y = t(v),
                    m = n[f],
                    x = t(m),
                    b = n[s],
                    w = t(b);
                d > g && (o = h, h = p, p = o, o = d, d = g, g = o), x > w && (o = m, m = b, b = o, o = x, x = w, w = o), d > y && (o = h, h = v, v = o, o = d, d = y, y = o), g > y && (o = p, p = v, v = o, o = g, g = y, y = o), d > x && (o = h, h = m, m = o, o = d, d = x, x = o), y > x && (o = v, v = m, m = o, o = y, y = x, x = o), g > w && (o = p, p = b, b = o, o = g, g = w, w = o), g > y && (o = p, p = v, v = o, o = g, g = y, y = o), x > w && (o = m, m = b, b = o, o = x, x = w, w = o);
                var A = p,
                    M = g,
                    k = m,
                    _ = x;
                n[u] = h, n[c] = n[r], n[l] = v, n[f] = n[i - 1], n[s] = b;
                var C = r + 1,
                    T = i - 2,
                    E = _ >= M && M >= _;
                if (E)
                    for (var S = C; T >= S; ++S) {
                        var N = n[S],
                            D = t(N);
                        if (M > D) S !== C && (n[S] = n[C], n[C] = N), ++C;
                        else if (D > M)
                            for (;;) {
                                var L = t(n[T]);
                                if (!(L > M)) {
                                    if (M > L) {
                                        n[S] = n[C], n[C++] = n[T], n[T--] = N;
                                        break
                                    }
                                    n[S] = n[T], n[T--] = N;
                                    break
                                }
                                T--
                            }
                    } else
                        for (var S = C; T >= S; S++) {
                            var N = n[S],
                                D = t(N);
                            if (M > D) S !== C && (n[S] = n[C], n[C] = N), ++C;
                            else if (D > _)
                                for (;;) {
                                    var L = t(n[T]);
                                    if (!(L > _)) {
                                        M > L ? (n[S] = n[C], n[C++] = n[T], n[T--] = N) : (n[S] = n[T], n[T--] = N);
                                        break
                                    }
                                    if (S > --T) break
                                }
                        }
                if (n[r] = n[C - 1], n[C - 1] = A, n[i - 1] = n[T + 1], n[T + 1] = k, e(n, r, C - 1), e(n, T + 2, i), E) return n;
                if (u > C && T > s) {
                    for (var R;
                        (R = t(n[C])) <= M && R >= M;) ++C;
                    for (;
                        (L = t(n[T])) <= _ && L >= _;) --T;
                    for (var S = C; T >= S; S++) {
                        var N = n[S],
                            D = t(N);
                        if (M >= D && D >= M) S !== C && (n[S] = n[C], n[C] = N), C++;
                        else if (_ >= D && D >= _)
                            for (;;) {
                                var L = t(n[T]);
                                if (!(_ >= L && L >= _)) {
                                    M > L ? (n[S] = n[C], n[C++] = n[T], n[T--] = N) : (n[S] = n[T], n[T--] = N);
                                    break
                                }
                                if (S > --T) break
                            }
                    }
                }
                return e(n, C, T + 1)
            })(r, i, o)
        }
        var n = a(t);
        return e
    }

    function s(t) {
        for (var e = Array(t), n = -1; ++n < t;) e[n] = 0;
        return e
    }

    function l(t) {
        return [0, t.length]
    }

    function c() {
        return null
    }

    function f() {
        return 0
    }

    function h(t) {
        return t + 1
    }

    function d(t) {
        return t - 1
    }

    function p(t) {
        return function(e, n) {
            return e + +t(n)
        }
    }

    function g(t) {
        return function(e, n) {
            return e - t(n)
        }
    }

    function v() {
        function t(t) {
            var e = s,
                n = t.length;
            return n && (a = a.concat(t), A = k(A, s += n), C.forEach(function(r) {
                r(t, e, n)
            })), r
        }
        var r = {
                add: t,
                remove: function() {
                    for (var t = y(s, s), e = [], n = 0, r = 0; s > n; ++n) A[n] ? t[n] = r++ : e.push(n);
                    var i;
                    for (M.forEach(function(t) {
                            t(0, [], e)
                        }), T.forEach(function(e) {
                            e(t)
                        }), n = 0, r = 0; s > n; ++n)(i = A[n]) && (n !== r && (A[r] = i, a[r] = a[n]), ++r);
                    for (a.length = r; s > r;) A[--s] = 0
                },
                dimension: function(t) {
                    function r(e, r, i) {
                        F = e.map(t), P = W(function(t) {
                            for (var e = y(t, t), n = -1; ++n < t;) e[n] = n;
                            return e
                        }(i), 0, i), F = n(F, P);
                        var o, a = Y(F),
                            u = a[0],
                            l = a[1];
                        if (I)
                            for (o = 0; i > o; ++o) I(F[o], o) || (A[P[o] + r] |= B);
                        else {
                            for (o = 0; u > o; ++o) A[P[o] + r] |= B;
                            for (o = l; i > o; ++o) A[P[o] + r] |= B
                        }
                        if (!r) return H = F, q = P, X = u, void(Z = l);
                        var c = H,
                            f = q,
                            h = 0,
                            d = 0;
                        for (H = Array(s), q = y(s, s), o = 0; r > h && i > d; ++o) c[h] < F[d] ? (H[o] = c[h], q[o] = f[h++]) : (H[o] = F[d], q[o] = P[d++] + r);
                        for (; r > h; ++h, ++o) H[o] = c[h], q[o] = f[h];
                        for (; i > d; ++d, ++o) H[o] = F[d], q[o] = P[d] + r;
                        a = Y(H), X = a[0], Z = a[1]
                    }

                    function w(t, e, n) {
                        V.forEach(function(t) {
                            t(F, P, e, n)
                        }), F = P = null
                    }

                    function E(t) {
                        for (var e, n = 0, r = 0; s > n; ++n) A[e = q[n]] && (n !== r && (H[r] = H[n]), q[r] = t[e], ++r);
                        for (H.length = r; s > r;) q[r++] = 0;
                        var i = Y(H);
                        X = i[0], Z = i[1]
                    }

                    function S(t) {
                        var e = t[0],
                            n = t[1];
                        if (I) return I = null, O(function(t, r) {
                            return r >= e && n > r
                        }), X = e, Z = n, z;
                        var r, i, o, a = [],
                            u = [];
                        if (X > e)
                            for (r = e, i = Math.min(X, n); i > r; ++r) A[o = q[r]] ^= B, a.push(o);
                        else if (e > X)
                            for (r = X, i = Math.min(e, Z); i > r; ++r) A[o = q[r]] ^= B, u.push(o);
                        if (n > Z)
                            for (r = Math.max(e, Z), i = n; i > r; ++r) A[o = q[r]] ^= B, a.push(o);
                        else if (Z > n)
                            for (r = Math.max(X, n), i = Z; i > r; ++r) A[o = q[r]] ^= B, u.push(o);
                        return X = e, Z = n, M.forEach(function(t) {
                            t(B, a, u)
                        }), z
                    }

                    function N(t) {
                        return S((e = x, n = t, Y = function(t) {
                            var r = t.length;
                            return [e.left(t, n, 0, r), e.right(t, n, 0, r)]
                        })(H));
                        var e, n
                    }

                    function D(t) {
                        return S((e = x, r = (n = t)[0], i = n[1], Y = function(t) {
                            var n = t.length;
                            return [e.left(t, r, 0, n), e.left(t, i, 0, n)]
                        })(H));
                        var e, n, r, i
                    }

                    function L() {
                        return S((Y = l)(H))
                    }

                    function R(t) {
                        return Y = l, O(I = t), X = 0, Z = s, z
                    }

                    function O(t) {
                        var e, n, r, i = [],
                            o = [];
                        for (e = 0; s > e; ++e) !(A[n = q[e]] & B) ^ !!(r = t(H[e], e)) && (r ? (A[n] &= U, i.push(n)) : (A[n] |= B, o.push(n)));
                        M.forEach(function(t) {
                            t(B, i, o)
                        })
                    }

                    function $(t) {
                        function n(e, n, r, i) {
                            function o() {
                                ++z === I && (C = _(C, P <<= 1), L = _(L, P), I = m(P))
                            }
                            var f, h, d, p, g, b, w = D,
                                C = y(z, I),
                                T = $,
                                E = F,
                                S = z,
                                N = 0,
                                R = 0;
                            for (X && (T = E = c), D = Array(z), z = 0, L = S > 1 ? k(L, s) : y(s, I), S && (d = (h = w[0]).key); i > R && !((p = t(e[R])) >= p);) ++R;
                            for (; i > R;) {
                                for (h && p >= d ? (g = h, b = d, C[N] = z, (h = w[++N]) && (d = h.key)) : (g = {
                                        key: p,
                                        value: E()
                                    }, b = p), D[z] = g; !(p > b || (L[f = n[R] + r] = z, A[f] & U || (g.value = T(g.value, a[f])), ++R >= i));) p = t(e[R]);
                                o()
                            }
                            for (; S > N;) D[C[N] = z] = w[N++], o();
                            if (z > N)
                                for (N = 0; r > N; ++N) L[N] = C[L[N]];
                            f = M.indexOf(W), z > 1 ? (W = u, Y = v) : (!z && Z && (z = 1, D = [{
                                key: null,
                                value: E()
                            }]), 1 === z ? (W = l, Y = x) : (W = c, Y = c), L = null), M[f] = W
                        }

                        function r() {
                            if (z > 1) {
                                for (var t = z, e = D, n = y(t, t), r = 0, i = 0; s > r; ++r) A[r] && (n[L[i] = L[r]] = 1, ++i);
                                for (D = [], z = 0, r = 0; t > r; ++r) n[r] && (n[r] = z++, D.push(e[r]));
                                if (z > 1)
                                    for (r = 0; i > r; ++r) L[r] = n[L[r]];
                                else L = null;
                                M[M.indexOf(W)] = z > 1 ? (Y = v, W = u) : 1 === z ? (Y = x, W = l) : Y = W = c
                            } else if (1 === z) {
                                if (Z) return;
                                for (r = 0; s > r; ++r)
                                    if (A[r]) return;
                                D = [], z = 0, M[M.indexOf(W)] = W = Y = c
                            }
                        }

                        function u(t, e, n) {
                            if (t !== B && !X) {
                                var r, i, o, u;
                                for (r = 0, o = e.length; o > r; ++r) A[i = e[r]] & U || ((u = D[L[i]]).value = $(u.value, a[i]));
                                for (r = 0, o = n.length; o > r; ++r)(A[i = n[r]] & U) === t && ((u = D[L[i]]).value = j(u.value, a[i]))
                            }
                        }

                        function l(t, e, n) {
                            if (t !== B && !X) {
                                var r, i, o, u = D[0];
                                for (r = 0, o = e.length; o > r; ++r) A[i = e[r]] & U || (u.value = $(u.value, a[i]));
                                for (r = 0, o = n.length; o > r; ++r)(A[i = n[r]] & U) === t && (u.value = j(u.value, a[i]))
                            }
                        }

                        function v() {
                            var t, e;
                            for (t = 0; z > t; ++t) D[t].value = F();
                            for (t = 0; s > t; ++t) A[t] & U || ((e = D[L[t]]).value = $(e.value, a[t]))
                        }

                        function x() {
                            var t, e = D[0];
                            for (e.value = F(), t = 0; s > t; ++t) A[t] & U || (e.value = $(e.value, a[t]))
                        }

                        function b() {
                            return X && (Y(), X = !1), D
                        }

                        function w(t, e, n) {
                            return $ = t, j = e, F = n, X = !0, N
                        }

                        function C() {
                            return w(h, d, f)
                        }

                        function E(t) {
                            function e(e) {
                                return t(e.value)
                            }
                            return R = o(e), O = i(e), N
                        }

                        function S() {
                            var t = M.indexOf(W);
                            return t >= 0 && M.splice(t, 1), (t = V.indexOf(n)) >= 0 && V.splice(t, 1), (t = T.indexOf(r)) >= 0 && T.splice(t, 1), N
                        }
                        var N = {
                            top: function(t) {
                                var e = R(b(), 0, D.length, t);
                                return O.sort(e, 0, e.length)
                            },
                            all: b,
                            reduce: w,
                            reduceCount: C,
                            reduceSum: function(t) {
                                return w(p(t), g(t), f)
                            },
                            order: E,
                            orderNatural: function() {
                                return E(e)
                            },
                            size: function() {
                                return z
                            },
                            dispose: S,
                            remove: S
                        };
                        G.push(N);
                        var D, L, R, O, $, j, F, P = 8,
                            I = m(P),
                            z = 0,
                            W = c,
                            Y = c,
                            X = !0,
                            Z = t === c;
                        return arguments.length < 1 && (t = e), M.push(W), V.push(n), T.push(r), n(H, q, 0, s), C().orderNatural()
                    }

                    function j() {
                        G.forEach(function(t) {
                            t.dispose()
                        });
                        var t = C.indexOf(r);
                        return t >= 0 && C.splice(t, 1), (t = C.indexOf(w)) >= 0 && C.splice(t, 1), (t = T.indexOf(E)) >= 0 && T.splice(t, 1), v &= U, L()
                    }
                    var H, q, F, P, I, z = {
                            filter: function(t) {
                                return null == t ? L() : Array.isArray(t) ? D(t) : "function" == typeof t ? R(t) : N(t)
                            },
                            filterExact: N,
                            filterRange: D,
                            filterFunction: R,
                            filterAll: L,
                            top: function(t) {
                                for (var e, n = [], r = Z; --r >= X && t > 0;) A[e = q[r]] || (n.push(a[e]), --t);
                                return n
                            },
                            bottom: function(t) {
                                for (var e, n = [], r = X; Z > r && t > 0;) A[e = q[r]] || (n.push(a[e]), --t), r++;
                                return n
                            },
                            group: $,
                            groupAll: function() {
                                var t = $(c),
                                    e = t.all;
                                return delete t.all, delete t.top, delete t.order, delete t.orderNatural, delete t.size, t.value = function() {
                                    return e()[0].value
                                }, t
                            },
                            dispose: j,
                            remove: j
                        },
                        B = ~v & -~v,
                        U = ~B,
                        W = u(function(t) {
                            return F[t]
                        }),
                        Y = l,
                        V = [],
                        G = [],
                        X = 0,
                        Z = 0;
                    return C.unshift(r), C.push(w), T.push(E), v |= B, (b >= 32 ? !B : v & (1 << b) - 1) && (A = _(A, b <<= 1)), r(a, 0, s), w(0, 0, s), z
                },
                groupAll: function() {
                    function t(t, e) {
                        var n;
                        if (!y)
                            for (n = e; s > n; ++n) A[n] || (o = u(o, a[n]))
                    }

                    function e(t, e, n) {
                        var r, i, s;
                        if (!y) {
                            for (r = 0, s = e.length; s > r; ++r) A[i = e[r]] || (o = u(o, a[i]));
                            for (r = 0, s = n.length; s > r; ++r) A[i = n[r]] === t && (o = l(o, a[i]))
                        }
                    }

                    function n(t, e, n) {
                        return u = t, l = e, c = n, y = !0, v
                    }

                    function r() {
                        return n(h, d, f)
                    }

                    function i() {
                        var n = M.indexOf(e);
                        return n >= 0 && M.splice(n), (n = C.indexOf(t)) >= 0 && C.splice(n), v
                    }
                    var o, u, l, c, v = {
                            reduce: n,
                            reduceCount: r,
                            reduceSum: function(t) {
                                return n(p(t), g(t), f)
                            },
                            value: function() {
                                return y && (function() {
                                    var t;
                                    for (o = c(), t = 0; s > t; ++t) A[t] || (o = u(o, a[t]))
                                }(), y = !1), o
                            },
                            dispose: i,
                            remove: i
                        },
                        y = !0;
                    return M.push(e), C.push(t), t(0, 0), r()
                },
                size: function() {
                    return s
                }
            },
            a = [],
            s = 0,
            v = 0,
            b = 8,
            A = w(0),
            M = [],
            C = [],
            T = [];
        return arguments.length ? t(arguments[0]) : r
    }

    function y(t, e) {
        return (257 > e ? w : 65537 > e ? A : M)(t)
    }

    function m(t) {
        return 8 === t ? 256 : 16 === t ? 65536 : 4294967296
    }
    v.version = "1.3.11", v.permute = n;
    var x = v.bisect = r(e);
    x.by = r, (v.heap = i(e)).by = i, (v.heapselect = o(e)).by = o, (v.insertionsort = a(e)).by = a, (v.quicksort = u(e)).by = u;
    var b = 32,
        w = s,
        A = s,
        M = s,
        k = function(t, e) {
            for (var n = t.length; e > n;) t[n++] = 0;
            return t
        },
        _ = function(t, e) {
            if (e > 32) throw Error("invalid array width!");
            return t
        };
    "undefined" != typeof Uint8Array && (w = function(t) {
        return new Uint8Array(t)
    }, A = function(t) {
        return new Uint16Array(t)
    }, M = function(t) {
        return new Uint32Array(t)
    }, k = function(t, e) {
        if (t.length >= e) return t;
        var n = new t.constructor(e);
        return n.set(t), n
    }, _ = function(t, e) {
        var n;
        switch (e) {
            case 16:
                n = A(t.length);
                break;
            case 32:
                n = M(t.length);
                break;
            default:
                throw Error("invalid array width!")
        }
        return n.set(t), n
    }), t.crossfilter = v
}("undefined" != typeof exports && exports || this),
function() {
    function t(t, e) {
        "use strict";
        var n = {
            version: "2.1.0-dev",
            constants: {
                CHART_CLASS: "dc-chart",
                DEBUG_GROUP_CLASS: "debug",
                STACK_CLASS: "stack",
                DESELECTED_CLASS: "deselected",
                SELECTED_CLASS: "selected",
                NODE_INDEX_NAME: "__index__",
                GROUP_INDEX_NAME: "__group_index__",
                DEFAULT_CHART_GROUP: "__default_chart_group__",
                EVENT_DELAY: 40,
                NEGLIGIBLE_NUMBER: 1e-10
            },
            _renderlet: null
        };
        n.chartRegistry = function() {
            function t(t) {
                return t || (t = n.constants.DEFAULT_CHART_GROUP), e[t] || (e[t] = []), t
            }
            var e = {};
            return {
                has: function(t) {
                    for (var n in e)
                        if (e[n].indexOf(t) >= 0) return !0;
                    return !1
                },
                register: function(n, r) {
                    r = t(r), e[r].push(n)
                },
                deregister: function(n, r) {
                    r = t(r);
                    for (var i = 0; i < e[r].length; i++)
                        if (e[r][i].anchorName() === n.anchorName()) {
                            e[r].splice(i, 1);
                            break
                        }
                },
                clear: function(t) {
                    t ? delete e[t] : e = {}
                },
                list: function(n) {
                    return n = t(n), e[n]
                }
            }
        }(), n.registerChart = function(t, e) {
            n.chartRegistry.register(t, e)
        }, n.deregisterChart = function(t, e) {
            n.chartRegistry.deregister(t, e)
        }, n.hasChart = function(t) {
            return n.chartRegistry.has(t)
        }, n.deregisterAllCharts = function(t) {
            n.chartRegistry.clear(t)
        }, n.filterAll = function(t) {
            for (var e = n.chartRegistry.list(t), r = 0; r < e.length; ++r) e[r].filterAll()
        }, n.refocusAll = function(t) {
            for (var e = n.chartRegistry.list(t), r = 0; r < e.length; ++r) e[r].focus && e[r].focus()
        }, n.renderAll = function(t) {
            for (var e = n.chartRegistry.list(t), r = 0; r < e.length; ++r) e[r].render();
            null !== n._renderlet && n._renderlet(t)
        }, n.redrawAll = function(t) {
            for (var e = n.chartRegistry.list(t), r = 0; r < e.length; ++r) e[r].redraw();
            null !== n._renderlet && n._renderlet(t)
        }, n.disableTransitions = !1, n.transition = function(t, e, r) {
            if (0 >= e || void 0 === e || n.disableTransitions) return t;
            var i = t.transition().duration(e);
            return "function" == typeof r && r(i), i
        }, n.units = {}, n.units.integers = function(t, e) {
            return Math.abs(e - t)
        }, n.units.ordinal = function(t, e, n) {
            return n
        }, n.units.fp = {}, n.units.fp.precision = function(t) {
            var e = function(t, r) {
                var i = Math.abs((r - t) / e.resolution);
                return n.utils.isNegligible(i - Math.floor(i)) ? Math.floor(i) : Math.ceil(i)
            };
            return e.resolution = t, e
        }, n.round = {}, n.round.floor = function(t) {
            return Math.floor(t)
        }, n.round.ceil = function(t) {
            return Math.ceil(t)
        }, n.round.round = function(t) {
            return Math.round(t)
        }, n.override = function(t, e, n) {
            var r = t[e];
            t["_" + e] = r, t[e] = n
        }, n.renderlet = function(t) {
            return arguments.length ? (n._renderlet = t, n) : n._renderlet
        }, n.instanceOfChart = function(t) {
            return t instanceof Object && t.__dcFlag__ && !0
        }, n.errors = {}, n.errors.Exception = function(t) {
            var e = t || "Unexpected internal error";
            this.message = e, this.toString = function() {
                return e
            }
        }, n.errors.InvalidStateException = function() {
            n.errors.Exception.apply(this, arguments)
        }, n.dateFormat = t.time.format("%m/%d/%Y"), n.printers = {}, n.printers.filters = function(t) {
            for (var e = "", r = 0; r < t.length; ++r) r > 0 && (e += ", "), e += n.printers.filter(t[r]);
            return e
        }, n.printers.filter = function(t) {
            var e = "";
            return void 0 !== t && null !== t && (t instanceof Array ? t.length >= 2 ? e = "[" + n.utils.printSingleValue(t[0]) + " -> " + n.utils.printSingleValue(t[1]) + "]" : t.length >= 1 && (e = n.utils.printSingleValue(t[0])) : e = n.utils.printSingleValue(t)), e
        }, n.pluck = function(t, e) {
            return e ? function(n, r) {
                return e.call(n, n[t], r)
            } : function(e) {
                return e[t]
            }
        }, n.utils = {}, n.utils.printSingleValue = function(t) {
            var e = "" + t;
            return t instanceof Date ? e = n.dateFormat(t) : "string" == typeof t ? e = t : n.utils.isFloat(t) ? e = n.utils.printSingleValue.fformat(t) : n.utils.isInteger(t) && (e = Math.round(t)), e
        }, n.utils.printSingleValue.fformat = t.format(".2f"), n.utils.add = function(t, e) {
            if ("string" == typeof e && (e = e.replace("%", "")), t instanceof Date) {
                "string" == typeof e && (e = +e);
                var n = new Date;
                return n.setTime(t.getTime()), n.setDate(t.getDate() + e), n
            }
            if ("string" == typeof e) {
                var r = +e / 100;
                return t > 0 ? t * (1 + r) : t * (1 - r)
            }
            return t + e
        }, n.utils.subtract = function(t, e) {
            if ("string" == typeof e && (e = e.replace("%", "")), t instanceof Date) {
                "string" == typeof e && (e = +e);
                var n = new Date;
                return n.setTime(t.getTime()), n.setDate(t.getDate() - e), n
            }
            if ("string" == typeof e) {
                var r = +e / 100;
                return 0 > t ? t * (1 + r) : t * (1 - r)
            }
            return t - e
        }, n.utils.isNumber = function(t) {
            return t === +t
        }, n.utils.isFloat = function(t) {
            return t === +t && t !== (0 | t)
        }, n.utils.isInteger = function(t) {
            return t === +t && t === (0 | t)
        }, n.utils.isNegligible = function(t) {
            return !n.utils.isNumber(t) || t < n.constants.NEGLIGIBLE_NUMBER && t > -n.constants.NEGLIGIBLE_NUMBER
        }, n.utils.clamp = function(t, e, n) {
            return e > t ? e : t > n ? n : t
        };
        var r = 0;
        return n.utils.uniqueId = function() {
                return ++r
            }, n.utils.nameToId = function(t) {
                return t.toLowerCase().replace(/[\s]/g, "_").replace(/[\.']/g, "")
            }, n.utils.appendOrSelect = function(t, e, n) {
                n = n || e;
                var r = t.select(e);
                return r.empty() && (r = t.append(n)), r
            }, n.utils.safeNumber = function(t) {
                return n.utils.isNumber(+t) ? +t : 0
            }, n.logger = {}, n.logger.enableDebugLog = !1, n.logger.warn = function(t) {
                return console && (console.warn ? console.warn(t) : console.log && console.log(t)), n.logger
            }, n.logger.debug = function(t) {
                return n.logger.enableDebugLog && console && (console.debug ? console.debug(t) : console.log && console.log(t)), n.logger
            }, n.logger.deprecate = function(t, e) {
                var r = !1;
                return function() {
                    return r || (n.logger.warn(e), r = !0), t.apply(this, arguments)
                }
            }, n.events = {
                current: null
            }, n.events.trigger = function(t, e) {
                return e ? (n.events.current = t, void setTimeout(function() {
                    t === n.events.current && t()
                }, e)) : void t()
            }, n.filters = {}, n.filters.RangedFilter = function(t, e) {
                var n = new Array(t, e);
                return n.isFiltered = function(t) {
                    return t >= this[0] && t < this[1]
                }, n
            }, n.filters.TwoDimensionalFilter = function(t) {
                if (null === t) return null;
                var e = t;
                return e.isFiltered = function(t) {
                    return t.length && t.length === e.length && t[0] === e[0] && t[1] === e[1]
                }, e
            }, n.filters.RangedTwoDimensionalFilter = function(t) {
                if (null === t) return null;
                var e, n = t;
                return e = n[0] instanceof Array ? [
                    [Math.min(t[0][0], t[1][0]), Math.min(t[0][1], t[1][1])],
                    [Math.max(t[0][0], t[1][0]), Math.max(t[0][1], t[1][1])]
                ] : [
                    [t[0], -1 / 0],
                    [t[1], 1 / 0]
                ], n.isFiltered = function(t) {
                    var n, r;
                    if (t instanceof Array) {
                        if (2 !== t.length) return !1;
                        n = t[0], r = t[1]
                    } else n = t, r = e[0][1];
                    return n >= e[0][0] && n < e[1][0] && r >= e[0][1] && r < e[1][1]
                }, n
            }, n.baseMixin = function(r) {
                function i(t) {
                    if (!r[t] || !r[t]()) throw new n.errors.InvalidStateException("Mandatory attribute chart." + t + " is missing on chart[#" + r.anchorName() + "]")
                }
                r.__dcFlag__ = n.utils.uniqueId();
                var o, a, u, s, l, c, f, h = 200,
                    d = function(t) {
                        var e = t && t.getBoundingClientRect && t.getBoundingClientRect().width;
                        return e && e > h ? e : h
                    },
                    p = d,
                    g = 200,
                    v = function(t) {
                        var e = t && t.getBoundingClientRect && t.getBoundingClientRect().height;
                        return e && e > g ? e : g
                    },
                    y = v,
                    m = n.pluck("key"),
                    x = n.pluck("value"),
                    b = n.pluck("key"),
                    w = n.pluck("key"),
                    A = !1,
                    M = function(t) {
                        return r.keyAccessor()(t) + ": " + r.valueAccessor()(t)
                    },
                    k = !0,
                    _ = 750,
                    C = n.printers.filters,
                    T = ["dimension", "group"],
                    E = n.constants.DEFAULT_CHART_GROUP,
                    S = t.dispatch("preRender", "postRender", "preRedraw", "postRedraw", "filtered", "zoomed", "renderlet"),
                    N = [],
                    D = function(t, e) {
                        return t.filter(null), 0 === e.length ? t.filter(null) : t.filterFunction(function(t) {
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                if (r.isFiltered && r.isFiltered(t)) return !0;
                                if (t >= r && r >= t) return !0
                            }
                            return !1
                        }), e
                    },
                    L = function(t) {
                        return t.all()
                    };
                r.width = function(e) {
                    return arguments.length ? (p = t.functor(e || d), r) : p(s.node())
                }, r.height = function(e) {
                    return arguments.length ? (y = t.functor(e || v), r) : y(s.node())
                }, r.minWidth = function(t) {
                    return arguments.length ? (h = t, r) : h
                }, r.minHeight = function(t) {
                    return arguments.length ? (g = t, r) : g
                }, r.dimension = function(t) {
                    return arguments.length ? (o = t, r.expireCache(), r) : o
                }, r.data = function(e) {
                    return arguments.length ? (L = t.functor(e), r.expireCache(), r) : L.call(r, a)
                }, r.group = function(t, e) {
                    return arguments.length ? (a = t, r._groupName = e, r.expireCache(), r) : a
                }, r.ordering = function(t) {
                    return arguments.length ? (w = t, c = e.quicksort.by(w), r.expireCache(), r) : w
                }, r._computeOrderedGroups = function(t) {
                    var n = t.slice(0);
                    return n.length <= 1 ? n : (c || (c = e.quicksort.by(w)), c(n, 0, n.length))
                }, r.filterAll = function() {
                    return r.filter(null)
                }, r.select = function(t) {
                    return s.select(t)
                }, r.selectAll = function(t) {
                    return s ? s.selectAll(t) : null
                }, r.anchor = function(e, i) {
                    return arguments.length ? (n.instanceOfChart(e) ? (u = e.anchor(), s = e.root()) : (u = e, (s = t.select(u)).classed(n.constants.CHART_CLASS, !0), n.registerChart(r, i)), E = i, r) : u
                }, r.anchorName = function() {
                    var t = r.anchor();
                    return t && t.id ? t.id : t && t.replace ? t.replace("#", "") : "dc-chart" + r.chartID()
                }, r.root = function(t) {
                    return arguments.length ? (s = t, r) : s
                }, r.svg = function(t) {
                    return arguments.length ? (l = t, r) : l
                }, r.resetSvg = function() {
                    return r.select("svg").remove(), l = r.root().append("svg").attr("width", r.width()).attr("height", r.height())
                }, r.filterPrinter = function(t) {
                    return arguments.length ? (C = t, r) : C
                }, r.turnOnControls = function() {
                    return s && (r.selectAll(".reset").style("display", null), r.selectAll(".filter").text(C(r.filters())).style("display", null)), r
                }, r.turnOffControls = function() {
                    return s && (r.selectAll(".reset").style("display", "none"), r.selectAll(".filter").style("display", "none").text(r.filter())), r
                }, r.transitionDuration = function(t) {
                    return arguments.length ? (_ = t, r) : _
                }, r._mandatoryAttributes = function(t) {
                    return arguments.length ? (T = t, r) : T
                }, r.render = function() {
                    S.preRender(r), T && T.forEach(i);
                    var t = r._doRender();
                    return f && f.render(), r._activateRenderlets("postRender"), t
                }, r._activateRenderlets = function(t) {
                    r.transitionDuration() > 0 && l ? l.transition().duration(r.transitionDuration()).each("end", function() {
                        S.renderlet(r), t && S[t](r)
                    }) : (S.renderlet(r), t && S[t](r))
                }, r.redraw = function() {
                    S.preRedraw(r);
                    var t = r._doRedraw();
                    return f && f.render(), r._activateRenderlets("postRedraw"), t
                }, r.redrawGroup = function() {
                    n.redrawAll(r.chartGroup())
                }, r.renderGroup = function() {
                    n.renderAll(r.chartGroup())
                }, r._invokeFilteredListener = function(t) {
                    void 0 !== t && S.filtered(r, t)
                }, r._invokeZoomedListener = function() {
                    S.zoomed(r)
                };
                var R = function(t, e) {
                    return null === e || void 0 === e ? t.length > 0 : t.some(function(t) {
                        return t >= e && e >= t
                    })
                };
                r.hasFilterHandler = function(t) {
                    return arguments.length ? (R = t, r) : R
                }, r.hasFilter = function(t) {
                    return R(N, t)
                };
                var O = function(t, e) {
                    for (var n = 0; n < t.length; n++)
                        if (t[n] <= e && t[n] >= e) {
                            t.splice(n, 1);
                            break
                        }
                    return t
                };
                r.removeFilterHandler = function(t) {
                    return arguments.length ? (O = t, r) : O
                };
                var $ = function(t, e) {
                    return t.push(e), t
                };
                r.addFilterHandler = function(t) {
                    return arguments.length ? ($ = t, r) : $
                };
                var j = function() {
                    return []
                };
                return r.resetFilterHandler = function(t) {
                    return arguments.length ? (j = t, r) : j
                }, r.replaceFilter = function(t) {
                    N = [], r.filter(t)
                }, r.filter = function(t) {
                    return arguments.length ? (t instanceof Array && t[0] instanceof Array && !t.isFiltered ? t[0].forEach(function(t) {
                        r.hasFilter(t) ? O(N, t) : $(N, t)
                    }) : null === t ? N = j(N) : r.hasFilter(t) ? O(N, t) : $(N, t), function() {
                        if (r.dimension() && r.dimension().filter) {
                            var t = D(r.dimension(), N);
                            N = t || N
                        }
                    }(), r._invokeFilteredListener(t), null !== s && r.hasFilter() ? r.turnOnControls() : r.turnOffControls(), r) : N.length > 0 ? N[0] : null
                }, r.filters = function() {
                    return N
                }, r.highlightSelected = function(e) {
                    t.select(e).classed(n.constants.SELECTED_CLASS, !0), t.select(e).classed(n.constants.DESELECTED_CLASS, !1)
                }, r.fadeDeselected = function(e) {
                    t.select(e).classed(n.constants.SELECTED_CLASS, !1), t.select(e).classed(n.constants.DESELECTED_CLASS, !0)
                }, r.resetHighlight = function(e) {
                    t.select(e).classed(n.constants.SELECTED_CLASS, !1), t.select(e).classed(n.constants.DESELECTED_CLASS, !1)
                }, r.onClick = function(t) {
                    var e = r.keyAccessor()(t);
                    n.events.trigger(function() {
                        r.filter(e), r.redrawGroup()
                    })
                }, r.filterHandler = function(t) {
                    return arguments.length ? (D = t, r) : D
                }, r._doRender = function() {
                    return r
                }, r._doRedraw = function() {
                    return r
                }, r.legendables = function() {
                    return []
                }, r.legendHighlight = function() {}, r.legendReset = function() {}, r.legendToggle = function() {}, r.isLegendableHidden = function() {
                    return !1
                }, r.keyAccessor = function(t) {
                    return arguments.length ? (m = t, r) : m
                }, r.valueAccessor = function(t) {
                    return arguments.length ? (x = t, r) : x
                }, r.label = function(t) {
                    return arguments.length ? (b = t, A = !0, r) : b
                }, r.renderLabel = function(t) {
                    return arguments.length ? (A = t, r) : A
                }, r.title = function(t) {
                    return arguments.length ? (M = t, r) : M
                }, r.renderTitle = function(t) {
                    return arguments.length ? (k = t, r) : k
                }, r.renderlet = n.logger.deprecate(function(t) {
                    return r.on("renderlet." + n.utils.uniqueId(), t), r
                }, 'chart.renderlet has been deprecated.  Please use chart.on("renderlet.<renderletKey>", renderletFunction)'), r.chartGroup = function(t) {
                    return arguments.length ? (E = t, r) : E
                }, r.expireCache = function() {
                    return r
                }, r.legend = function(t) {
                    return arguments.length ? ((f = t).parent(r), r) : f
                }, r.chartID = function() {
                    return r.__dcFlag__
                }, r.options = function(t) {
                    for (var e in t) "function" == typeof r[e] ? r[e].call(r, t[e]) : n.logger.debug("Not a valid option setter name: " + e);
                    return r
                }, r.on = function(t, e) {
                    return S.on(t, e), r
                }, r
            }, n.marginMixin = function(t) {
                var e = {
                    top: 10,
                    right: 50,
                    bottom: 30,
                    left: 30
                };
                return t.margins = function(n) {
                    return arguments.length ? (e = n, t) : e
                }, t.effectiveWidth = function() {
                    return t.width() - t.margins().left - t.margins().right
                }, t.effectiveHeight = function() {
                    return t.height() - t.margins().top - t.margins().bottom
                }, t
            }, n.colorMixin = function(e) {
                var n = t.scale.category20c(),
                    r = !0,
                    i = function(t) {
                        return e.keyAccessor()(t)
                    };
                return e.colors = function(r) {
                    return arguments.length ? (n = r instanceof Array ? t.scale.quantize().range(r) : t.functor(r), e) : n
                }, e.ordinalColors = function(n) {
                    return e.colors(t.scale.ordinal().range(n))
                }, e.linearColors = function(n) {
                    return e.colors(t.scale.linear().range(n).interpolate(t.interpolateHcl))
                }, e.colorAccessor = function(t) {
                    return arguments.length ? (i = t, r = !1, e) : i
                }, e.defaultColorAccessor = function() {
                    return r
                }, e.colorDomain = function(t) {
                    return arguments.length ? (n.domain(t), e) : n.domain()
                }, e.calculateColorDomain = function() {
                    var r = [t.min(e.data(), e.colorAccessor()), t.max(e.data(), e.colorAccessor())];
                    return n.domain(r), e
                }, e.getColor = function(t, e) {
                    return n(i.call(this, t, e))
                }, e.colorCalculator = function(t) {
                    return arguments.length ? (e.getColor = t, e) : e.getColor
                }, e
            }, n.coordinateGridMixin = function(e) {
                function r() {
                    B = !0, W && (e.x().domain(c(e.x().domain(), w)), E && e.x().domain(c(e.x().domain(), E.x().domain())));
                    var t = e.x().domain(),
                        r = n.filters.RangedFilter(t[0], t[1]);
                    e.replaceFilter(r), e.rescale(), e.redraw(), E && !f(e.filter(), E.filter()) && n.events.trigger(function() {
                        E.replaceFilter(r), E.redraw()
                    }), e._invokeZoomedListener(), n.events.trigger(function() {
                        e.redrawGroup()
                    }, n.constants.EVENT_DELAY), B = !f(t, w)
                }

                function i(t) {
                    e.isOrdinal() ? (e.elasticX() || 0 === b.domain().length) && b.domain(e._ordinalXDomain()) : e.elasticX() && b.domain([e.xAxisMin(), e.xAxisMax()]);
                    var r = b.domain();
                    (!M || r.some(function(t, e) {
                        return t !== M[e]
                    })) && e.rescale(), M = r, e.isOrdinal() ? b.rangeBands([0, e.xAxisLength()], K, e._useOuterPadding() ? Q : 0) : b.range([0, e.xAxisLength()]), N = N.scale(e.x()),
                        function(t) {
                            var r = t.selectAll("g." + p);
                            if (z) {
                                r.empty() && (r = t.insert("g", ":first-child").attr("class", h + " " + p).attr("transform", "translate(" + e.margins().left + "," + e.margins().top + ")"));
                                var i = N.tickValues() ? N.tickValues() : "function" == typeof b.ticks ? b.ticks(N.ticks()[0]) : b.domain(),
                                    o = r.selectAll("line").data(i),
                                    a = o.enter().append("line").attr("x1", function(t) {
                                        return b(t)
                                    }).attr("y1", e._xAxisY() - e.margins().top).attr("x2", function(t) {
                                        return b(t)
                                    }).attr("y2", 0).attr("opacity", 0);
                                n.transition(a, e.transitionDuration()).attr("opacity", 1), n.transition(o, e.transitionDuration()).attr("x1", function(t) {
                                    return b(t)
                                }).attr("y1", e._xAxisY() - e.margins().top).attr("x2", function(t) {
                                    return b(t)
                                }).attr("y2", 0), o.exit().remove()
                            } else r.selectAll("line").remove()
                        }(t)
                }

                function o() {
                    return e._xAxisY() - e.margins().top
                }

                function a() {
                    return e.anchorName().replace(/[ .#]/g, "-") + "-clip"
                }

                function u() {
                    var t = n.utils.appendOrSelect(y, "defs"),
                        r = a(),
                        i = n.utils.appendOrSelect(t, "#" + r, "clipPath").attr("id", r),
                        o = 2 * Z;
                    n.utils.appendOrSelect(i, "rect").attr("width", e.xAxisLength() + o).attr("height", e.yAxisHeight() + o).attr("transform", "translate(-" + Z + ", -" + Z + ")")
                }

                function s(t) {
                    e.isOrdinal() && (P = !1), i(e.g()), e._prepareYAxis(e.g()), e.plotData(), (e.elasticX() || B || t) && e.renderXAxis(e.g()), (e.elasticY() || t) && e.renderYAxis(e.g()), t ? e.renderBrush(e.g()) : e.redrawBrush(e.g())
                }

                function l() {
                    X ? e._enableMouseZoom() : G && e._disableMouseZoom()
                }

                function c(e, n) {
                    var r = [];
                    return r[0] = t.max([e[0], n[0]]), r[1] = t.min([e[1], n[1]]), r
                }

                function f(t, e) {
                    return !t && !e || !(!t || !e) && (0 === t.length && 0 === e.length || t[0].valueOf() === e[0].valueOf() && t[1].valueOf() === e[1].valueOf())
                }
                var h = "grid-line",
                    d = "horizontal",
                    p = "vertical",
                    g = "y-axis-label",
                    v = "x-axis-label";
                (e = n.colorMixin(n.marginMixin(n.baseMixin(e)))).colors(t.scale.category10()), e._mandatoryAttributes().push("x");
                var y, m, x, b, w, A, M, k, _, C, T, E, S, N = t.svg.axis().orient("bottom"),
                    D = n.units.integers,
                    L = 0,
                    R = !1,
                    O = 0,
                    $ = t.svg.axis().orient("left"),
                    j = 0,
                    H = !1,
                    q = 0,
                    F = t.svg.brush(),
                    P = !0,
                    I = !1,
                    z = !1,
                    B = !1,
                    U = [1, 1 / 0],
                    W = !0,
                    Y = t.behavior.zoom().on("zoom", r),
                    V = t.behavior.zoom().on("zoom", null),
                    G = !1,
                    X = !1,
                    Z = 0,
                    Q = .5,
                    K = 0,
                    J = !1;
                return e.rescale = function() {
                    T = void 0
                }, e.rangeChart = function(t) {
                    return arguments.length ? ((E = t).focusChart(e), e) : E
                }, e.zoomScale = function(t) {
                    return arguments.length ? (U = t, e) : U
                }, e.zoomOutRestrict = function(t) {
                    return arguments.length ? (U[0] = t ? 1 : 0, W = t, e) : W
                }, e._generateG = function(t) {
                    return y = void 0 === t ? e.svg() : t, m = y.append("g"), x = m.append("g").attr("class", "chart-body").attr("transform", "translate(" + e.margins().left + ", " + e.margins().top + ")").attr("clip-path", "url(#" + a() + ")"), m
                }, e.g = function(t) {
                    return arguments.length ? (m = t, e) : m
                }, e.mouseZoomable = function(t) {
                    return arguments.length ? (X = t, e) : X
                }, e.chartBodyG = function(t) {
                    return arguments.length ? (x = t, e) : x
                }, e.x = function(t) {
                    return arguments.length ? (w = (b = t).domain(), e) : b
                }, e.xOriginalDomain = function() {
                    return w
                }, e.xUnits = function(t) {
                    return arguments.length ? (D = t, e) : D
                }, e.xAxis = function(t) {
                    return arguments.length ? (N = t, e) : N
                }, e.elasticX = function(t) {
                    return arguments.length ? (R = t, e) : R
                }, e.xAxisPadding = function(t) {
                    return arguments.length ? (L = t, e) : L
                }, e.xUnitCount = function() {
                    if (void 0 === T) {
                        var t = e.xUnits()(e.x().domain()[0], e.x().domain()[1], e.x().domain());
                        T = t instanceof Array ? t.length : t
                    }
                    return T
                }, e.useRightYAxis = function(t) {
                    return arguments.length ? (J = t, e) : J
                }, e.isOrdinal = function() {
                    return e.xUnits() === n.units.ordinal
                }, e._useOuterPadding = function() {
                    return !0
                }, e._ordinalXDomain = function() {
                    return e._computeOrderedGroups(e.data()).map(e.keyAccessor())
                }, e.renderXAxis = function(t) {
                    var r = t.selectAll("g.x");
                    r.empty() && (r = t.append("g").attr("class", "axis x").attr("transform", "translate(" + e.margins().left + "," + e._xAxisY() + ")"));
                    var i = t.selectAll("text." + v);
                    i.empty() && e.xAxisLabel() && (i = t.append("text").attr("transform", "translate(" + (e.margins().left + e.xAxisLength() / 2) + "," + (e.height() - O) + ")").attr("class", v).attr("text-anchor", "middle").text(e.xAxisLabel())), e.xAxisLabel() && i.text() !== e.xAxisLabel() && i.text(e.xAxisLabel()), n.transition(r, e.transitionDuration()).call(N)
                }, e._xAxisY = function() {
                    return e.height() - e.margins().bottom
                }, e.xAxisLength = function() {
                    return e.effectiveWidth()
                }, e.xAxisLabel = function(t, n) {
                    return arguments.length ? (A = t, e.margins().bottom -= O, O = void 0 === n ? 12 : n, e.margins().bottom += O, e) : A
                }, e._prepareYAxis = function(n) {
                    if (void 0 === k || e.elasticY()) {
                        k = t.scale.linear();
                        var r = e.yAxisMin() || 0,
                            i = e.yAxisMax() || 0;
                        k.domain([r, i]).rangeRound([e.yAxisHeight(), 0])
                    }
                    k.range([e.yAxisHeight(), 0]), $ = $.scale(k), J && $.orient("right"), e._renderHorizontalGridLinesForAxis(n, k, $)
                }, e.renderYAxisLabel = function(t, n, r, i) {
                    i = i || q;
                    var o = e.g().selectAll("text." + g + "." + t + "-label");
                    if (o.empty() && n) {
                        var a = e.margins().top + e.yAxisHeight() / 2;
                        o = e.g().append("text").attr("transform", "translate(" + i + "," + a + "),rotate(" + r + ")").attr("class", g + " " + t + "-label").attr("text-anchor", "middle").text(n)
                    }
                    n && o.text() !== n && o.text(n)
                }, e.renderYAxisAt = function(t, r, i) {
                    var o = e.g().selectAll("g." + t);
                    o.empty() && (o = e.g().append("g").attr("class", "axis " + t).attr("transform", "translate(" + i + "," + e.margins().top + ")")), n.transition(o, e.transitionDuration()).call(r)
                }, e.renderYAxis = function() {
                    var t = J ? e.width() - e.margins().right : e._yAxisX();
                    e.renderYAxisAt("y", $, t);
                    var n = J ? e.width() - q : q,
                        r = J ? 90 : -90;
                    e.renderYAxisLabel("y", e.yAxisLabel(), r, n)
                }, e._renderHorizontalGridLinesForAxis = function(t, r, i) {
                    var o = t.selectAll("g." + d);
                    if (I) {
                        var a = i.tickValues() ? i.tickValues() : r.ticks(i.ticks()[0]);
                        o.empty() && (o = t.insert("g", ":first-child").attr("class", h + " " + d).attr("transform", "translate(" + e.margins().left + "," + e.margins().top + ")"));
                        var u = o.selectAll("line").data(a),
                            s = u.enter().append("line").attr("x1", 1).attr("y1", function(t) {
                                return r(t)
                            }).attr("x2", e.xAxisLength()).attr("y2", function(t) {
                                return r(t)
                            }).attr("opacity", 0);
                        n.transition(s, e.transitionDuration()).attr("opacity", 1), n.transition(u, e.transitionDuration()).attr("x1", 1).attr("y1", function(t) {
                            return r(t)
                        }).attr("x2", e.xAxisLength()).attr("y2", function(t) {
                            return r(t)
                        }), u.exit().remove()
                    } else o.selectAll("line").remove()
                }, e._yAxisX = function() {
                    return e.useRightYAxis() ? e.width() - e.margins().right : e.margins().left
                }, e.yAxisLabel = function(t, n) {
                    return arguments.length ? (_ = t, e.margins().left -= q, q = void 0 === n ? 12 : n, e.margins().left += q, e) : _
                }, e.y = function(t) {
                    return arguments.length ? (k = t, e) : k
                }, e.yAxis = function(t) {
                    return arguments.length ? ($ = t, e) : $
                }, e.elasticY = function(t) {
                    return arguments.length ? (H = t, e) : H
                }, e.renderHorizontalGridLines = function(t) {
                    return arguments.length ? (I = t, e) : I
                }, e.renderVerticalGridLines = function(t) {
                    return arguments.length ? (z = t, e) : z
                }, e.xAxisMin = function() {
                    var r = t.min(e.data(), function(t) {
                        return e.keyAccessor()(t)
                    });
                    return n.utils.subtract(r, L)
                }, e.xAxisMax = function() {
                    var r = t.max(e.data(), function(t) {
                        return e.keyAccessor()(t)
                    });
                    return n.utils.add(r, L)
                }, e.yAxisMin = function() {
                    var r = t.min(e.data(), function(t) {
                        return e.valueAccessor()(t)
                    });
                    return n.utils.subtract(r, j)
                }, e.yAxisMax = function() {
                    var r = t.max(e.data(), function(t) {
                        return e.valueAccessor()(t)
                    });
                    return n.utils.add(r, j)
                }, e.yAxisPadding = function(t) {
                    return arguments.length ? (j = t, e) : j
                }, e.yAxisHeight = function() {
                    return e.effectiveHeight()
                }, e.round = function(t) {
                    return arguments.length ? (C = t, e) : C
                }, e._rangeBandPadding = function(t) {
                    return arguments.length ? (K = t, e) : K
                }, e._outerRangeBandPadding = function(t) {
                    return arguments.length ? (Q = t, e) : Q
                }, n.override(e, "filter", function(t) {
                    return arguments.length ? (e._filter(t), t ? e.brush().extent(t) : e.brush().clear(), e) : e._filter()
                }), e.brush = function(t) {
                    return arguments.length ? (F = t, e) : F
                }, e.renderBrush = function(t) {
                    if (P) {
                        F.on("brush", e._brushing), F.on("brushstart", e._disableMouseZoom), F.on("brushend", l);
                        var n = t.append("g").attr("class", "brush").attr("transform", "translate(" + e.margins().left + "," + e.margins().top + ")").call(F.x(e.x()));
                        e.setBrushY(n), e.setHandlePaths(n), e.hasFilter() && e.redrawBrush(t)
                    }
                }, e.setHandlePaths = function(t) {
                    t.selectAll(".resize").append("path").attr("d", e.resizeHandlePath)
                }, e.setBrushY = function(t) {
                    t.selectAll("rect").attr("height", o())
                }, e.extendBrush = function() {
                    var t = F.extent();
                    return e.round() && (t[0] = t.map(e.round())[0], t[1] = t.map(e.round())[1], m.select(".brush").call(F.extent(t))), t
                }, e.brushIsEmpty = function(t) {
                    return F.empty() || !t || t[1] <= t[0]
                }, e._brushing = function() {
                    var t = e.extendBrush();
                    if (e.redrawBrush(m), e.brushIsEmpty(t)) n.events.trigger(function() {
                        e.filter(null), e.redrawGroup()
                    }, n.constants.EVENT_DELAY);
                    else {
                        var r = n.filters.RangedFilter(t[0], t[1]);
                        n.events.trigger(function() {
                            e.replaceFilter(r), e.redrawGroup()
                        }, n.constants.EVENT_DELAY)
                    }
                }, e.redrawBrush = function(t) {
                    if (P) {
                        e.filter() && e.brush().empty() && e.brush().extent(e.filter());
                        var n = t.select("g.brush");
                        n.call(e.brush().x(e.x())), e.setBrushY(n)
                    }
                    e.fadeDeselectedArea()
                }, e.fadeDeselectedArea = function() {}, e.resizeHandlePath = function(t) {
                    var e = +("e" === t),
                        n = e ? 1 : -1,
                        r = o() / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + e + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + e + " " + .5 * n + "," + 2 * r + "ZM" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8)
                }, e.clipPadding = function(t) {
                    return arguments.length ? (Z = t, e) : Z
                }, e._preprocessData = function() {}, e._doRender = function() {
                    return e.resetSvg(), e._preprocessData(), e._generateG(), u(), s(!0), l(), e
                }, e._doRedraw = function() {
                    return e._preprocessData(), s(!1), u(), e
                }, e._enableMouseZoom = function() {
                    G = !0, Y.x(e.x()).scaleExtent(U).size([e.width(), e.height()]).duration(e.transitionDuration()), e.root().call(Y)
                }, e._disableMouseZoom = function() {
                    e.root().call(V)
                }, e.focus = function(t) {
                    var n;
                    e.x().domain((n = t) instanceof Array && n.length > 1 ? t : w), Y.x(e.x()), r()
                }, e.refocused = function() {
                    return B
                }, e.focusChart = function(t) {
                    return arguments.length ? (S = t, e.on("filtered", function(t) {
                        t.filter() ? f(t.filter(), S.filter()) || n.events.trigger(function() {
                            S.focus(t.filter())
                        }) : n.events.trigger(function() {
                            S.x().domain(S.xOriginalDomain())
                        })
                    }), e) : S
                }, e.brushOn = function(t) {
                    return arguments.length ? (P = t, e) : P
                }, e
            }, n.stackMixin = function(e) {
                function r(t) {
                    var e = u.map(n.pluck("name")).indexOf(t);
                    return u[e]
                }

                function i() {
                    return e.data().reduce(function(t, e) {
                        return t.concat(e.values)
                    }, [])
                }

                function o(t) {
                    return !t.hidden
                }
                var a = t.layout.stack().values(function(n, r) {
                        var i = n.accessor || e.valueAccessor();
                        return n.name = String(n.name || r), n.values = n.group.all().map(function(t, r) {
                            return {
                                x: e.keyAccessor()(t, r),
                                y: n.hidden ? null : i(t, r),
                                data: t,
                                layer: n.name,
                                hidden: n.hidden
                            }
                        }), n.values = n.values.filter(function() {
                            if (!e.x()) return t.functor(!0);
                            var n = e.x().domain();
                            return e.isOrdinal() ? function() {
                                return !0
                            } : e.elasticX() ? function() {
                                return !0
                            } : function(t) {
                                return t.x >= n[0] && t.x <= n[n.length - 1]
                            }
                        }()), n.values
                    }),
                    u = [],
                    s = {},
                    l = !1;
                return e.stack = function(t, n, r) {
                    if (!arguments.length) return u;
                    arguments.length <= 2 && (r = n);
                    var i = {
                        group: t
                    };
                    return "string" == typeof n && (i.name = n), "function" == typeof r && (i.accessor = r), u.push(i), e
                }, n.override(e, "group", function(t, n, r) {
                    return arguments.length ? (u = [], s = {}, e.stack(t, n), r && e.valueAccessor(r), e._group(t, n)) : e._group()
                }), e.hidableStacks = function(t) {
                    return arguments.length ? (l = t, e) : l
                }, e.hideStack = function(t) {
                    var n = r(t);
                    return n && (n.hidden = !0), e
                }, e.showStack = function(t) {
                    var n = r(t);
                    return n && (n.hidden = !1), e
                }, e.getValueAccessorByIndex = function(t) {
                    return u[t].accessor || e.valueAccessor()
                }, e.yAxisMin = function() {
                    var r = t.min(i(), function(t) {
                        return t.y + t.y0 < t.y0 ? t.y + t.y0 : t.y0
                    });
                    return n.utils.subtract(r, e.yAxisPadding())
                }, e.yAxisMax = function() {
                    var r = t.max(i(), function(t) {
                        return t.y + t.y0
                    });
                    return n.utils.add(r, e.yAxisPadding())
                }, e.xAxisMin = function() {
                    var r = t.min(i(), n.pluck("x"));
                    return n.utils.subtract(r, e.xAxisPadding())
                }, e.xAxisMax = function() {
                    var r = t.max(i(), n.pluck("x"));
                    return n.utils.add(r, e.xAxisPadding())
                }, n.override(e, "title", function(t, n) {
                    return t ? "function" == typeof t ? e._title(t) : t === e._groupName && "function" == typeof n ? e._title(n) : "function" != typeof n ? s[t] || e._title() : (s[t] = n, e) : e._title()
                }), e.stackLayout = function(t) {
                    return arguments.length ? (a = t, e) : a
                }, e.data(function() {
                    var t = u.filter(o);
                    return t.length ? e.stackLayout()(t) : []
                }), e._ordinalXDomain = function() {
                    return i().map(n.pluck("x"))
                }, e.colorAccessor(function(t) {
                    return this.layer || this.name || t.name || t.layer
                }), e.legendables = function() {
                    return u.map(function(t, n) {
                        return {
                            chart: e,
                            name: t.name,
                            hidden: t.hidden || !1,
                            color: e.getColor.call(t, t.values, n)
                        }
                    })
                }, e.isLegendableHidden = function(t) {
                    var e = r(t.name);
                    return !!e && e.hidden
                }, e.legendToggle = function(t) {
                    l && (e.isLegendableHidden(t) ? e.showStack(t.name) : e.hideStack(t.name), e.renderGroup())
                }, e
            }, n.capMixin = function(e) {
                var r = 1 / 0,
                    i = "Others",
                    o = function(n) {
                        var r = t.sum(n, e.valueAccessor()),
                            o = e.group().all(),
                            a = t.sum(o, e.valueAccessor()),
                            u = n.map(e.keyAccessor()),
                            s = o.map(e.keyAccessor()),
                            l = t.set(u),
                            c = s.filter(function(t) {
                                return !l.has(t)
                            });
                        return a > r ? n.concat([{
                            others: c,
                            key: i,
                            value: a - r
                        }]) : n
                    };
                return e.cappedKeyAccessor = function(t, n) {
                    return t.others ? t.key : e.keyAccessor()(t, n)
                }, e.cappedValueAccessor = function(t, n) {
                    return t.others ? t.value : e.valueAccessor()(t, n)
                }, e.data(function(t) {
                    if (1 / 0 === r) return e._computeOrderedGroups(t.all());
                    var n = t.top(r);
                    return n = e._computeOrderedGroups(n), o ? o(n) : n
                }), e.cap = function(t) {
                    return arguments.length ? (r = t, e) : r
                }, e.othersLabel = function(t) {
                    return arguments.length ? (i = t, e) : i
                }, e.othersGrouper = function(t) {
                    return arguments.length ? (o = t, e) : o
                }, n.override(e, "onClick", function(t) {
                    t.others && e.filter([t.others]), e._onClick(t)
                }), e
            }, n.bubbleMixin = function(e) {
                var r = .3,
                    i = 10;
                e.BUBBLE_NODE_CLASS = "node", e.BUBBLE_CLASS = "bubble", e.MIN_RADIUS = 10, (e = n.colorMixin(e)).renderLabel(!0), e.data(function(t) {
                    return t.top(1 / 0)
                });
                var o = t.scale.linear().domain([0, 100]),
                    a = function(t) {
                        return t.r
                    };
                e.r = function(t) {
                    return arguments.length ? (o = t, e) : o
                }, e.radiusValueAccessor = function(t) {
                    return arguments.length ? (a = t, e) : a
                }, e.rMin = function() {
                    return t.min(e.data(), function(t) {
                        return e.radiusValueAccessor()(t)
                    })
                }, e.rMax = function() {
                    return t.max(e.data(), function(t) {
                        return e.radiusValueAccessor()(t)
                    })
                }, e.bubbleR = function(t) {
                    var n = e.radiusValueAccessor()(t),
                        r = e.r()(n);
                    return (isNaN(r) || 0 >= n) && (r = 0), r
                };
                var u = function(t) {
                        return e.label()(t)
                    },
                    s = function(t) {
                        return e.bubbleR(t) > i ? 1 : 0
                    };
                e._doRenderLabel = function(t) {
                    if (e.renderLabel()) {
                        var r = t.select("text");
                        r.empty() && (r = t.append("text").attr("text-anchor", "middle").attr("dy", ".3em").on("click", e.onClick)), r.attr("opacity", 0).text(u), n.transition(r, e.transitionDuration()).attr("opacity", s)
                    }
                }, e.doUpdateLabels = function(t) {
                    if (e.renderLabel()) {
                        var r = t.selectAll("text").text(u);
                        n.transition(r, e.transitionDuration()).attr("opacity", s)
                    }
                };
                var l = function(t) {
                    return e.title()(t)
                };
                return e._doRenderTitles = function(t) {
                    e.renderTitle() && (t.select("title").empty() && t.append("title").text(l))
                }, e.doUpdateTitles = function(t) {
                    e.renderTitle() && t.selectAll("title").text(l)
                }, e.minRadiusWithLabel = function(t) {
                    return arguments.length ? (i = t, e) : i
                }, e.maxBubbleRelativeSize = function(t) {
                    return arguments.length ? (r = t, e) : r
                }, e.fadeDeselectedArea = function() {
                    e.selectAll("g." + e.BUBBLE_NODE_CLASS).each(e.hasFilter() ? function(t) {
                        e.isSelectedNode(t) ? e.highlightSelected(this) : e.fadeDeselected(this)
                    } : function() {
                        e.resetHighlight(this)
                    })
                }, e.isSelectedNode = function(t) {
                    return e.hasFilter(t.key)
                }, e.onClick = function(t) {
                    var r = t.key;
                    n.events.trigger(function() {
                        e.filter(r), e.redrawGroup()
                    })
                }, e
            }, n.pieChart = function(e, r) {
                function i() {
                    d = d || t.min([M.width(), M.height()]) / 2;
                    var e, r, i, h, g, v, w, A, k, _, C, T, E, S = a(),
                        N = t.layout.pie().sort(null).value(M.cappedValueAccessor);
                    if (t.sum(M.data(), M.valueAccessor()) ? (e = N(M.data()), p.classed(x, !1)) : (e = N([{
                            key: b,
                            value: 1,
                            others: [b]
                        }]), p.classed(x, !0)), p) {
                        var D = p.selectAll("g." + m).data(e);
                        A = S, k = e, _ = D.enter().append("g").attr("class", function(t, e) {
                                return m + " _" + e
                            }), T = A, E = _.append("path").attr("fill", l).on("click", c).attr("d", function(t, e) {
                                return f(t, e, T)
                            }), n.transition(E, M.transitionDuration(), function(t) {
                                t.attrTween("d", s)
                            }), C = _, M.renderTitle() && C.append("title").text(function(t) {
                                return M.title()(t)
                            }),
                            function(t, e) {
                                if (M.renderLabel()) {
                                    var n = p.selectAll("text." + m).data(t);
                                    n.exit().remove();
                                    var r = n.enter().append("text").attr("class", function(t, e) {
                                        var n = m + " _" + e;
                                        return y && (n += " external"), n
                                    }).on("click", c);
                                    o(r, e)
                                }
                            }(k, A), g = r = e, v = i = S, w = p.selectAll("g." + m).data(g).select("path").attr("d", function(t, e) {
                                return f(t, e, v)
                            }), n.transition(w, M.transitionDuration(), function(t) {
                                t.attrTween("d", s)
                            }).attr("fill", l),
                            function(t, e) {
                                if (M.renderLabel()) {
                                    var n = p.selectAll("text." + m).data(t);
                                    o(n, e)
                                }
                            }(r, i), h = r, M.renderTitle() && p.selectAll("g." + m).data(h).select("title").text(function(t) {
                                return M.title()(t.data)
                            }), D.exit().remove(), M.selectAll("g." + m).each(M.hasFilter() ? function(t) {
                                u(t) ? M.highlightSelected(this) : M.fadeDeselected(this)
                            } : function() {
                                M.resetHighlight(this)
                            })
                    }
                }

                function o(e, r) {
                    n.transition(e, M.transitionDuration()).attr("transform", function(e) {
                        return n = e, i = r, o = y ? t.svg.arc().outerRadius(d + y).innerRadius(d + y).centroid(n) : i.centroid(n), isNaN(o[0]) || isNaN(o[1]) ? "translate(0,0)" : "translate(" + o + ")";
                        var n, i, o
                    }).attr("text-anchor", "middle").text(function(t) {
                        var e, n, r, i = t.data;
                        return r = i, 0 !== M.cappedValueAccessor(r) && (n = (e = t).endAngle - e.startAngle, !(isNaN(n) || A > n)) || u(t) ? M.label()(t.data) : ""
                    })
                }

                function a() {
                    return t.svg.arc().outerRadius(d).innerRadius(w)
                }

                function u(t) {
                    return M.hasFilter(M.cappedKeyAccessor(t.data))
                }

                function s(e) {
                    e.innerRadius = w;
                    var n, r = this._current;
                    (!(n = r) || isNaN(n.startAngle) || isNaN(n.endAngle)) && (r = {
                        startAngle: 0,
                        endAngle: 0
                    });
                    var i = t.interpolate(r, e);
                    return this._current = i(0),
                        function(t) {
                            return f(i(t), 0, a())
                        }
                }

                function l(t, e) {
                    return M.getColor(t.data, e)
                }

                function c(t, e) {
                    p.attr("class") !== x && M.onClick(t.data, e)
                }

                function f(t, e, n) {
                    var r = n(t, e);
                    return r.indexOf("NaN") >= 0 && (r = "M0,0"), r
                }

                function h(e, n) {
                    M.selectAll("g.pie-slice").each(function(r) {
                        e.name === r.data.key && t.select(this).classed("highlight", n)
                    })
                }
                var d, p, g, v, y, m = "pie-slice",
                    x = "empty-chart",
                    b = "empty",
                    w = 0,
                    A = .5,
                    M = n.capMixin(n.colorMixin(n.baseMixin({})));
                return M.colorAccessor(M.cappedKeyAccessor), M.title(function(t) {
                    return M.cappedKeyAccessor(t) + ": " + M.cappedValueAccessor(t)
                }), M.slicesCap = M.cap, M.label(M.cappedKeyAccessor), M.renderLabel(!0), M.transitionDuration(350), M._doRender = function() {
                    return M.resetSvg(), p = M.svg().append("g").attr("transform", "translate(" + M.cx() + "," + M.cy() + ")"), i(), M
                }, M.innerRadius = function(t) {
                    return arguments.length ? (w = t, M) : w
                }, M.radius = function(t) {
                    return arguments.length ? (d = t, M) : d
                }, M.cx = function(t) {
                    return arguments.length ? (g = t, M) : g || M.width() / 2
                }, M.cy = function(t) {
                    return arguments.length ? (v = t, M) : v || M.height() / 2
                }, M._doRedraw = function() {
                    return i(), M
                }, M.minAngleForLabel = function(t) {
                    return arguments.length ? (A = t, M) : A
                }, M.emptyTitle = function(t) {
                    return 0 === arguments.length ? b : (b = t, M)
                }, M.externalLabels = function(t) {
                    return 0 === arguments.length ? y : (y = t || void 0, M)
                }, M.legendables = function() {
                    return M.data().map(function(t, e) {
                        var n = {
                            name: t.key,
                            data: t.value,
                            others: t.others,
                            chart: M
                        };
                        return n.color = M.getColor(t, e), n
                    })
                }, M.legendHighlight = function(t) {
                    h(t, !0)
                }, M.legendReset = function(t) {
                    h(t, !1)
                }, M.legendToggle = function(t) {
                    M.onClick({
                        key: t.name,
                        others: t.others
                    })
                }, M.anchor(e, r)
            }, n.barChart = function(e, r) {
                function i(t) {
                    return n.utils.safeNumber(Math.abs(s.y()(t.y + t.y0) - s.y()(t.y0)))
                }

                function o(e, n) {
                    return function() {
                        var r = t.select(this).attr("fill") === e;
                        return n ? !r : r
                    }
                }
                var a, u = 1,
                    s = n.stackMixin(n.coordinateGridMixin({})),
                    l = 2,
                    c = !1,
                    f = !1;
                return n.override(s, "rescale", function() {
                    s._rescale(), a = void 0
                }), n.override(s, "render", function() {
                    s.round() && c && !f && n.logger.warn("By default, brush rounding is disabled if bars are centered. See dc.js bar chart API documentation for details."), s._render()
                }), s.plotData = function() {
                    var e = s.chartBodyG().selectAll("g.stack").data(s.data());
                    (function() {
                        if (void 0 === a) {
                            var t = s.xUnitCount();
                            (1 / 0 === (a = Math.floor(s.isOrdinal() && void 0 === l ? s.x().rangeBand() : l ? (s.xAxisLength() - (t - 1) * l) / t : s.xAxisLength() / (1 + s.barPadding()) / t)) || isNaN(a) || u > a) && (a = u)
                        }
                    })(), e.enter().append("g").attr("class", function(t, e) {
                        return "stack _" + e
                    }), e.each(function(e, r) {
                        var o, u, f, h = t.select(this);
                        o = e, u = h.selectAll("rect.bar").data(o.values, n.pluck("x")), f = u.enter().append("rect").attr("class", "bar").attr("fill", n.pluck("data", s.getColor)).attr("y", s.yAxisHeight()).attr("height", 0), s.renderTitle() && f.append("title").text(n.pluck("data", s.title(o.name))), s.isOrdinal() && u.on("click", s.onClick), n.transition(u, s.transitionDuration()).attr("x", function(t) {
                            var e = s.x()(t.x);
                            return c && (e -= a / 2), s.isOrdinal() && void 0 !== l && (e += l / 2), n.utils.safeNumber(e)
                        }).attr("y", function(t) {
                            var e = s.y()(t.y + t.y0);
                            return t.y < 0 && (e -= i(t)), n.utils.safeNumber(e)
                        }).attr("width", a).attr("height", function(t) {
                            return i(t)
                        }).attr("fill", n.pluck("data", s.getColor)).select("title").text(n.pluck("data", s.title(o.name))), n.transition(u.exit(), s.transitionDuration()).attr("height", 0).remove()
                    })
                }, s.fadeDeselectedArea = function() {
                    var t = s.chartBodyG().selectAll("rect.bar"),
                        e = s.brush().extent();
                    if (s.isOrdinal()) s.hasFilter() ? (t.classed(n.constants.SELECTED_CLASS, function(t) {
                        return s.hasFilter(t.x)
                    }), t.classed(n.constants.DESELECTED_CLASS, function(t) {
                        return !s.hasFilter(t.x)
                    })) : (t.classed(n.constants.SELECTED_CLASS, !1), t.classed(n.constants.DESELECTED_CLASS, !1));
                    else if (s.brushIsEmpty(e)) t.classed(n.constants.DESELECTED_CLASS, !1);
                    else {
                        var r = e[0],
                            i = e[1];
                        t.classed(n.constants.DESELECTED_CLASS, function(t) {
                            return t.x < r || t.x >= i
                        })
                    }
                }, s.centerBar = function(t) {
                    return arguments.length ? (c = t, s) : c
                }, n.override(s, "onClick", function(t) {
                    s._onClick(t.data)
                }), s.barPadding = function(t) {
                    return arguments.length ? (s._rangeBandPadding(t), l = void 0, s) : s._rangeBandPadding()
                }, s._useOuterPadding = function() {
                    return void 0 === l
                }, s.outerPadding = s._outerRangeBandPadding, s.gap = function(t) {
                    return arguments.length ? (l = t, s) : l
                }, s.extendBrush = function() {
                    var t = s.brush().extent();
                    return !s.round() || c && !f || (t[0] = t.map(s.round())[0], t[1] = t.map(s.round())[1], s.chartBodyG().select(".brush").call(s.brush().extent(t))), t
                }, s.alwaysUseRounding = function(t) {
                    return arguments.length ? (f = t, s) : f
                }, s.legendHighlight = function(t) {
                    s.isLegendableHidden(t) || s.g().selectAll("rect.bar").classed("highlight", o(t.color)).classed("fadeout", o(t.color, !0))
                }, s.legendReset = function() {
                    s.g().selectAll("rect.bar").classed("highlight", !1).classed("fadeout", !1)
                }, n.override(s, "xAxisMax", function() {
                    var t = this._xAxisMax();
                    "resolution" in s.xUnits() && (t += s.xUnits().resolution);
                    return t
                }), s.anchor(e, r)
            }, n.lineChart = function(e, r) {
                function i(t, e) {
                    return v.getColor.call(t, t.values, e)
                }

                function o(t) {
                    return !t || t.indexOf("NaN") >= 0 ? "M0,0" : t
                }

                function a(e, r) {
                    if (!v.brushOn()) {
                        var i = h + "-list",
                            o = e.select("g." + i);
                        o.empty() && (o = e.append("g").attr("class", i)), r.each(function(e, r) {
                            var i = e.values;
                            c && (i = i.filter(c));
                            var a, l = o.select("g." + h + "._" + r);
                            l.empty() && (l = o.append("g").attr("class", h + " _" + r)), ((a = l).select("path." + p).empty() ? a.append("path").attr("class", p) : a.select("path." + p)).style("display", "none").attr("stroke-dasharray", "5,5"), (a.select("path." + g).empty() ? a.append("path").attr("class", g) : a.select("path." + g)).style("display", "none").attr("stroke-dasharray", "5,5");
                            var f = l.selectAll("circle." + d).data(i, n.pluck("x"));
                            f.enter().append("circle").attr("class", d).attr("r", u()).style("fill-opacity", b).style("stroke-opacity", w).on("mousemove", function() {
                                var e, n, r, i, o, a, u, s = t.select(this);
                                (u = s).style("fill-opacity", .8), u.style("stroke-opacity", .8), u.attr("r", m), n = l, r = (e = s).attr("cx"), i = e.attr("cy"), o = "M" + (v._yAxisX() - v.margins().left) + " " + i + "L" + r + " " + i, a = "M" + r + " " + v.yAxisHeight() + "L" + r + " " + i, n.select("path." + p).style("display", "").attr("d", o), n.select("path." + g).style("display", "").attr("d", a)
                            }).on("mouseout", function() {
                                var e, n = t.select(this);
                                n.style("fill-opacity", b).style("stroke-opacity", w).attr("r", u()), (e = l).select("path." + p).style("display", "none"), e.select("path." + g).style("display", "none")
                            }), f.attr("cx", function(t) {
                                return n.utils.safeNumber(v.x()(t.x))
                            }).attr("cy", function(t) {
                                return n.utils.safeNumber(v.y()(t.y + t.y0))
                            }).attr("fill", v.getColor).call(s, e), f.exit().remove()
                        })
                    }
                }

                function u() {
                    return x || m
                }

                function s(t, e) {
                    v.renderTitle() && (t.selectAll("title").remove(), t.append("title").text(n.pluck("data", v.title(e.name))))
                }

                function l(e, n, r) {
                    return function() {
                        var i = t.select(this),
                            o = i.attr("stroke") === e && i.attr("stroke-dasharray") === (n instanceof Array ? n.join(",") : null) || i.attr("fill") === e;
                        return r ? !o : o
                    }
                }
                var c, f, h = "dc-tooltip",
                    d = "dot",
                    p = "yRef",
                    g = "xRef",
                    v = n.stackMixin(n.coordinateGridMixin({})),
                    y = !1,
                    m = 5,
                    x = null,
                    b = 1e-6,
                    w = 1e-6,
                    A = "linear",
                    M = .7;
                return v.transitionDuration(500), v._rangeBandPadding(1), v.plotData = function() {
                    var e = v.chartBodyG(),
                        r = e.selectAll("g.stack-list");
                    r.empty() && (r = e.append("g").attr("class", "stack-list"));
                    var u = r.selectAll("g.stack").data(v.data()),
                        s = u.enter().append("g").attr("class", function(t, e) {
                            return "stack _" + e
                        });
                    (function(e, r) {
                        var a = t.svg.line().x(function(t) {
                            return v.x()(t.x)
                        }).y(function(t) {
                            return v.y()(t.y + t.y0)
                        }).interpolate(A).tension(M);
                        c && a.defined(c);
                        var u = e.append("path").attr("class", "line").attr("stroke", i);
                        f && u.attr("stroke-dasharray", f), n.transition(r.select("path.line"), v.transitionDuration()).attr("stroke", i).attr("d", function(t) {
                            return o(a(t.values))
                        })
                    })(s, u),
                    function(e, r) {
                        if (y) {
                            var a = t.svg.area().x(function(t) {
                                return v.x()(t.x)
                            }).y(function(t) {
                                return v.y()(t.y + t.y0)
                            }).y0(function(t) {
                                return v.y()(t.y0)
                            }).interpolate(A).tension(M);
                            c && a.defined(c), e.append("path").attr("class", "area").attr("fill", i).attr("d", function(t) {
                                return o(a(t.values))
                            }), n.transition(r.select("path.area"), v.transitionDuration()).attr("fill", i).attr("d", function(t) {
                                return o(a(t.values))
                            })
                        }
                    }(s, u), a(e, u)
                }, v.interpolate = function(t) {
                    return arguments.length ? (A = t, v) : A
                }, v.tension = function(t) {
                    return arguments.length ? (M = t, v) : M
                }, v.defined = function(t) {
                    return arguments.length ? (c = t, v) : c
                }, v.dashStyle = function(t) {
                    return arguments.length ? (f = t, v) : f
                }, v.renderArea = function(t) {
                    return arguments.length ? (y = t, v) : y
                }, v.dotRadius = function(t) {
                    return arguments.length ? (m = t, v) : m
                }, v.renderDataPoints = function(t) {
                    return arguments.length ? (t ? (b = t.fillOpacity || .8, w = t.strokeOpacity || .8, x = t.radius || 2) : (b = 1e-6, w = 1e-6, x = null), v) : {
                        fillOpacity: b,
                        strokeOpacity: w,
                        radius: x
                    }
                }, v.legendHighlight = function(t) {
                    v.isLegendableHidden(t) || v.g().selectAll("path.line, path.area").classed("highlight", l(t.color, t.dashstyle)).classed("fadeout", l(t.color, t.dashstyle, !0))
                }, v.legendReset = function() {
                    v.g().selectAll("path.line, path.area").classed("highlight", !1).classed("fadeout", !1)
                }, n.override(v, "legendables", function() {
                    var t = v._legendables();
                    return f ? t.map(function(t) {
                        return t.dashstyle = f, t
                    }) : t
                }), v.anchor(e, r)
            }, n.dataCount = function(e, r) {
                var i = t.format(",d"),
                    o = n.baseMixin({}),
                    a = {
                        some: "",
                        all: ""
                    };
                return o.html = function(t) {
                    return arguments.length ? (t.all && (a.all = t.all), t.some && (a.some = t.some), o) : a
                }, o.formatNumber = function(t) {
                    return arguments.length ? (i = t, o) : i
                }, o._doRender = function() {
                    var t = o.dimension().size(),
                        e = o.group().value(),
                        n = i(t),
                        r = i(e);
                    return t === e && "" !== a.all ? o.root().html(a.all.replace("%total-count", n).replace("%filter-count", r)) : "" !== a.some ? o.root().html(a.some.replace("%total-count", n).replace("%filter-count", r)) : (o.selectAll(".total-count").text(n), o.selectAll(".filter-count").text(r)), o
                }, o._doRedraw = function() {
                    return o._doRender()
                }, o.anchor(e, r)
            }, n.dataTable = function(e, r) {
                function i() {
                    var e = !0;
                    (h.forEach(function(t) {
                        e &= "function" == typeof t
                    }), e) || (c.selectAll("th").remove(), c.root().selectAll("th").data(h).enter().append("th").attr("class", l).html(function(t) {
                        return c._doColumnHeaderFormat(t)
                    }));
                    var n, r = c.root().selectAll("tbody").data((n = p === t.ascending ? c.dimension().bottom(f) : c.dimension().top(f), t.nest().key(c.group()).sortKeys(p).entries(n.sort(function(t, e) {
                            return p(d(t), d(e))
                        }))), function(t) {
                            return c.keyAccessor()(t)
                        }),
                        i = r.enter().append("tbody");
                    return i.append("tr").attr("class", s).append("td").attr("class", o).attr("colspan", h.length).html(function(t) {
                        return c.keyAccessor()(t)
                    }), r.exit().remove(), i
                }
                var o = "dc-table-label",
                    a = "dc-table-row",
                    u = "dc-table-column",
                    s = "dc-table-group",
                    l = "dc-table-head",
                    c = n.baseMixin({}),
                    f = 25,
                    h = [],
                    d = function(t) {
                        return t
                    },
                    p = t.ascending;
                return c._doRender = function() {
                    return c.selectAll("tbody").remove(), t = i(), e = t.order().selectAll("tr." + a).data(function(t) {
                        return t.values
                    }), n = e.enter().append("tr").attr("class", a), h.forEach(function(t, e) {
                        n.append("td").attr("class", u + " _" + e).html(function(e) {
                            return c._doColumnValueFormat(t, e)
                        })
                    }), e.exit().remove(), c;
                    var t, e, n
                }, c._doColumnValueFormat = function(t, e) {
                    return "function" == typeof t ? t(e) : "string" == typeof t ? e[t] : t.format(e)
                }, c._doColumnHeaderFormat = function(t) {
                    return "function" == typeof t ? c._doColumnHeaderFnToString(t) : "string" == typeof t ? c._doColumnHeaderCapitalize(t) : String(t.label)
                }, c._doColumnHeaderCapitalize = function(t) {
                    return t.charAt(0).toUpperCase() + t.slice(1)
                }, c._doColumnHeaderFnToString = function(t) {
                    var e = String(t),
                        n = e.indexOf("return ");
                    if (n >= 0) {
                        var r = e.lastIndexOf(";");
                        if (r >= 0)(e = e.substring(n + 7, r)).indexOf("numberFormat") >= 0 && (e = e.replace("numberFormat", ""))
                    }
                    return e
                }, c._doRedraw = function() {
                    return c._doRender()
                }, c.size = function(t) {
                    return arguments.length ? (f = t, c) : f
                }, c.columns = function(t) {
                    return arguments.length ? (h = t, c) : h
                }, c.sortBy = function(t) {
                    return arguments.length ? (d = t, c) : d
                }, c.order = function(t) {
                    return arguments.length ? (p = t, c) : p
                }, c.anchor(e, r)
            }, n.dataGrid = function(e, r) {
                function i() {
                    var e, n = u.root().selectAll("div." + a).data((e = u.dimension().top(s), t.nest().key(u.group()).sortKeys(f).entries(e.sort(function(t, e) {
                            return f(c(t), c(e))
                        }))), function(t) {
                            return u.keyAccessor()(t)
                        }),
                        r = n.enter().append("div").attr("class", a);
                    return h && r.html(function(t) {
                        return h(t)
                    }), n.exit().remove(), r
                }
                var o = "dc-grid-item",
                    a = "dc-grid-top",
                    u = n.baseMixin({}),
                    s = 999,
                    l = function(t) {
                        return "you need to provide an html() handling param:  " + JSON.stringify(t)
                    },
                    c = function(t) {
                        return t
                    },
                    f = t.ascending,
                    h = function(t) {
                        return "<div class='dc-grid-group'><h1 class='dc-grid-label'>" + u.keyAccessor()(t) + "</h1></div>"
                    };
                return u._doRender = function() {
                    return u.selectAll("div." + a).remove(), t = i(), (e = t.order().selectAll("div." + o).data(function(t) {
                        return t.values
                    })).enter().append("div").attr("class", o).html(function(t) {
                        return l(t)
                    }), e.exit().remove(), u;
                    var t, e
                }, u._doRedraw = function() {
                    return u._doRender()
                }, u.size = function(t) {
                    return arguments.length ? (s = t, u) : s
                }, u.html = function(t) {
                    return arguments.length ? (l = t, u) : l
                }, u.htmlGroup = function(t) {
                    return arguments.length ? (h = t, u) : h
                }, u.sortBy = function(t) {
                    return arguments.length ? (c = t, u) : c
                }, u.order = function(t) {
                    return arguments.length ? (f = t, u) : f
                }, u.anchor(e, r)
            }, n.bubbleChart = function(t, e) {
                var r = n.bubbleMixin(n.coordinateGridMixin({})),
                    i = !1;
                r.transitionDuration(750);
                var o = function(t) {
                    return "translate(" + (i = t, o = r.x()(r.keyAccessor()(i)), isNaN(o) && (o = 0), o) + "," + (e = t, n = r.y()(r.valueAccessor()(e)), isNaN(n) && (n = 0), n) + ")";
                    var e, n, i, o
                };
                return r.elasticRadius = function(t) {
                    return arguments.length ? (i = t, r) : i
                }, r.plotData = function() {
                    i && r.r().domain([r.rMin(), r.rMax()]), r.r().range([r.MIN_RADIUS, r.xAxisLength() * r.maxBubbleRelativeSize()]);
                    var t, e, a, u = r.chartBodyG().selectAll("g." + r.BUBBLE_NODE_CLASS).data(r.data(), function(t) {
                        return t.key
                    });
                    (a = (e = u).enter().append("g")).attr("class", r.BUBBLE_NODE_CLASS).attr("transform", o).append("circle").attr("class", function(t, e) {
                        return r.BUBBLE_CLASS + " _" + e
                    }).on("click", r.onClick).attr("fill", r.getColor).attr("r", 0), n.transition(e, r.transitionDuration()).selectAll("circle." + r.BUBBLE_CLASS).attr("r", function(t) {
                        return r.bubbleR(t)
                    }).attr("opacity", function(t) {
                        return r.bubbleR(t) > 0 ? 1 : 0
                    }), r._doRenderLabel(a), r._doRenderTitles(a), t = u, n.transition(t, r.transitionDuration()).attr("transform", o).selectAll("circle." + r.BUBBLE_CLASS).attr("fill", r.getColor).attr("r", function(t) {
                        return r.bubbleR(t)
                    }).attr("opacity", function(t) {
                        return r.bubbleR(t) > 0 ? 1 : 0
                    }), r.doUpdateLabels(t), r.doUpdateTitles(t), u.exit().remove(), r.fadeDeselectedArea()
                }, r.renderBrush = function() {}, r.redrawBrush = function() {
                    r.fadeDeselectedArea()
                }, r.anchor(t, e)
            }, n.compositeChart = function(e, r) {
                function i() {
                    (void 0 === d.rightY() || d.elasticY()) && (d.rightY(t.scale.linear()), d.rightY().domain([t.min(l(s())), n.utils.add(t.max(c(s())), d.yAxisPadding())]).rangeRound([d.yAxisHeight(), 0])), d.rightY().range([d.yAxisHeight(), 0]), d.rightYAxis(d.rightYAxis().scale(d.rightY())), d.rightYAxis().orient("right")
                }

                function o() {
                    (void 0 === d.y() || d.elasticY()) && (d.y(t.scale.linear()), d.y().domain([t.min(l(u())), n.utils.add(t.max(c(u())), d.yAxisPadding())]).rangeRound([d.yAxisHeight(), 0])), d.y().range([d.yAxisHeight(), 0]), d.yAxis(d.yAxis().scale(d.y())), d.yAxis().orient("left")
                }

                function a(t, e) {
                    t._generateG(d.g()), t.g().attr("class", h + " _" + e)
                }

                function u() {
                    return p.filter(function(t) {
                        return !t.useRightYAxis()
                    })
                }

                function s() {
                    return p.filter(function(t) {
                        return t.useRightYAxis()
                    })
                }

                function l(t) {
                    return t.map(function(t) {
                        return t.yAxisMin()
                    })
                }

                function c(t) {
                    return t.map(function(t) {
                        return t.yAxisMax()
                    })
                }
                var f, h = "sub",
                    d = n.coordinateGridMixin({}),
                    p = [],
                    g = {},
                    v = !1,
                    y = !0,
                    m = t.svg.axis(),
                    x = 0,
                    b = 12,
                    w = !1;
                return d._mandatoryAttributes([]), d.transitionDuration(500), n.override(d, "_generateG", function() {
                    for (var t = this.__generateG(), e = 0; e < p.length; ++e) {
                        var n = p[e];
                        a(n, e), n.dimension() || n.dimension(d.dimension()), n.group() || n.group(d.group()), n.chartGroup(d.chartGroup()), n.svg(d.svg()), n.xUnits(d.xUnits()), n.transitionDuration(d.transitionDuration()), n.brushOn(d.brushOn()), n.renderTitle(d.renderTitle())
                    }
                    return t
                }), d._brushing = function() {
                    for (var t = d.extendBrush(), e = d.brushIsEmpty(t), n = 0; n < p.length; ++n) p[n].filter(null), e || p[n].filter(t)
                }, d._prepareYAxis = function() {
                    0 !== u().length && o(), 0 !== s().length && i(), u().length > 0 && !w ? d._renderHorizontalGridLinesForAxis(d.g(), d.y(), d.yAxis()) : s().length > 0 && d._renderHorizontalGridLinesForAxis(d.g(), f, m)
                }, d.renderYAxis = function() {
                    0 !== u().length && (d.renderYAxisAt("y", d.yAxis(), d.margins().left), d.renderYAxisLabel("y", d.yAxisLabel(), -90)), 0 !== s().length && (d.renderYAxisAt("yr", d.rightYAxis(), d.width() - d.margins().right), d.renderYAxisLabel("yr", d.rightYAxisLabel(), 90, d.width() - b))
                }, d.plotData = function() {
                    for (var t = 0; t < p.length; ++t) {
                        var e = p[t];
                        e.g() || a(e, t), v && e.colors(d.colors()), e.x(d.x()), e.xAxis(d.xAxis()), e.useRightYAxis() ? (e.y(d.rightY()), e.yAxis(d.rightYAxis())) : (e.y(d.y()), e.yAxis(d.yAxis())), e.plotData(), e._activateRenderlets()
                    }
                }, d.useRightAxisGridLines = function(t) {
                    return arguments ? (w = t, d) : w
                }, d.childOptions = function(t) {
                    return arguments.length ? (g = t, p.forEach(function(t) {
                        t.options(g)
                    }), d) : g
                }, d.fadeDeselectedArea = function() {
                    for (var t = 0; t < p.length; ++t) {
                        var e = p[t];
                        e.brush(d.brush()), e.fadeDeselectedArea()
                    }
                }, d.rightYAxisLabel = function(t, e) {
                    return arguments.length ? (x = t, d.margins().right -= b, b = void 0 === e ? 12 : e, d.margins().right += b, d) : x
                }, d.compose = function(t) {
                    return (p = t).forEach(function(t) {
                        t.height(d.height()), t.width(d.width()), t.margins(d.margins()), y && t.title(d.title()), t.options(g)
                    }), d
                }, d.children = function() {
                    return p
                }, d.shareColors = function(t) {
                    return arguments.length ? (v = t, d) : v
                }, d.shareTitle = function(t) {
                    return arguments.length ? (y = t, d) : y
                }, d.rightY = function(t) {
                    return arguments.length ? (f = t, d) : f
                }, delete d.yAxisMin, delete d.yAxisMax, n.override(d, "xAxisMin", function() {
                    return n.utils.subtract(t.min(p.map(function(t) {
                        return t.xAxisMin()
                    })), d.xAxisPadding())
                }), n.override(d, "xAxisMax", function() {
                    return n.utils.add(t.max(p.map(function(t) {
                        return t.xAxisMax()
                    })), d.xAxisPadding())
                }), d.legendables = function() {
                    return p.reduce(function(t, e) {
                        return v && e.colors(d.colors()), t.push.apply(t, e.legendables()), t
                    }, [])
                }, d.legendHighlight = function(t) {
                    for (var e = 0; e < p.length; ++e) {
                        p[e].legendHighlight(t)
                    }
                }, d.legendReset = function(t) {
                    for (var e = 0; e < p.length; ++e) {
                        p[e].legendReset(t)
                    }
                }, d.legendToggle = function() {
                    console.log("composite should not be getting legendToggle itself")
                }, d.rightYAxis = function(t) {
                    return arguments.length ? (m = t, d) : m
                }, d.anchor(e, r)
            }, n.seriesChart = function(e, r) {
                function i(t) {
                    s[t].g() && s[t].g().remove(), delete s[t]
                }

                function o() {
                    Object.keys(s).map(i), s = {}
                }
                var a, u = n.compositeChart(e, r),
                    s = {},
                    l = n.lineChart,
                    c = t.ascending,
                    f = function(e, n) {
                        return t.ascending(u.keyAccessor()(e), u.keyAccessor()(n))
                    };
                return u._mandatoryAttributes().push("seriesAccessor", "chart"), u.shareColors(!0), u._preprocessData = function() {
                    var e, n = [],
                        o = t.nest().key(a);
                    c && o.sortKeys(c), f && o.sortValues(f);
                    var h = o.entries(u.data()).map(function(i, o) {
                        var a = s[i.key] || l.call(u, u, r, i.key, o);
                        return s[i.key] || (e = !0), s[i.key] = a, n.push(i.key), a.dimension(u.dimension()).group({
                            all: t.functor(i.values)
                        }, i.key).keyAccessor(u.keyAccessor()).valueAccessor(u.valueAccessor()).brushOn(u.brushOn())
                    });
                    Object.keys(s).filter(function(t) {
                        return -1 === n.indexOf(t)
                    }).forEach(function(t) {
                        i(t), e = !0
                    }), u._compose(h), e && u.legend() && u.legend().render()
                }, u.chart = function(t) {
                    return arguments.length ? (l = t, o(), u) : l
                }, u.seriesAccessor = function(t) {
                    return arguments.length ? (a = t, o(), u) : a
                }, u.seriesSort = function(t) {
                    return arguments.length ? (c = t, o(), u) : c
                }, u.valueSort = function(t) {
                    return arguments.length ? (f = t, o(), u) : f
                }, u._compose = u.compose, delete u.compose, u
            }, n.geoChoroplethChart = function(e, r) {
                function i(e) {
                    var r, i, c, f, h, d, p, g, v = function() {
                        for (var t = {}, e = l.data(), n = 0; n < e.length; ++n) t[l.keyAccessor()(e[n])] = l.valueAccessor()(e[n]);
                        return t
                    }();
                    if (s(e).keyAccessor) {
                        var y = (p = e, l.svg().selectAll((g = p, "g.layer" + g + " g." + s(g).name)).classed("selected", function(t) {
                            return o(p, t)
                        }).classed("deselected", function(t) {
                            return a(p, t)
                        }).attr("class", function(t) {
                            var e = s(p).name,
                                r = n.utils.nameToId(s(p).keyAccessor(t)),
                                i = e + " " + r;
                            return o(p, t) && (i += " selected"), a(p, t) && (i += " deselected"), i
                        }));
                        f = e, h = v, d = y.select("path").attr("fill", function() {
                            var e = t.select(this).attr("fill");
                            return e || "none"
                        }).on("click", function(t) {
                            return l.onClick(t, f)
                        }), n.transition(d, l.transitionDuration()).attr("fill", function(t, e) {
                            return l.getColor(h[s(f).keyAccessor(t)], e)
                        }), r = y, i = e, c = v, l.renderTitle() && r.selectAll("title").text(function(t) {
                            var e = u(i, t),
                                n = c[e];
                            return l.title()({
                                key: e,
                                value: n
                            })
                        })
                    }
                }

                function o(t, e) {
                    return l.hasFilter() && l.hasFilter(u(t, e))
                }

                function a(t, e) {
                    return l.hasFilter() && !l.hasFilter(u(t, e))
                }

                function u(t, e) {
                    return s(t).keyAccessor(e)
                }

                function s(t) {
                    return h[t]
                }
                var l = n.colorMixin(n.baseMixin({}));
                l.colorAccessor(function(t) {
                    return t || 0
                });
                var c, f = t.geo.path(),
                    h = [];
                return l._doRender = function() {
                    l.resetSvg();
                    for (var t = 0; t < h.length; ++t) {
                        var e = l.svg().append("g").attr("class", "layer" + t).selectAll("g." + s(t).name).data(s(t).data).enter().append("g").attr("class", s(t).name);
                        e.append("path").attr("fill", "white").attr("d", f), e.append("title"), i(t)
                    }
                    c = !1
                }, l.onClick = function(t, e) {
                    var r = s(e).keyAccessor(t);
                    n.events.trigger(function() {
                        l.filter(r), l.redrawGroup()
                    })
                }, l._doRedraw = function() {
                    for (var t = 0; t < h.length; ++t) i(t), c && l.svg().selectAll("g." + s(t).name + " path").attr("d", f);
                    c = !1
                }, l.overlayGeoJson = function(t, e, n) {
                    for (var r = 0; r < h.length; ++r)
                        if (h[r].name === e) return h[r].data = t, h[r].keyAccessor = n, l;
                    return h.push({
                        name: e,
                        data: t,
                        keyAccessor: n
                    }), l
                }, l.projection = function(t) {
                    return f.projection(t), c = !0, l
                }, l.geoJsons = function() {
                    return h
                }, l.geoPath = function() {
                    return f
                }, l.removeGeoJson = function(t) {
                    for (var e = [], n = 0; n < h.length; ++n) {
                        var r = h[n];
                        r.name !== t && e.push(r)
                    }
                    return h = e, l
                }, l.anchor(e, r)
            }, n.bubbleOverlay = function(e, r) {
                function i() {
                    var t = {};
                    return c.data().forEach(function(e) {
                        t[c.keyAccessor()(e)] = e
                    }), t
                }

                function o(t, e) {
                    var r = s + " " + n.utils.nameToId(t.name),
                        i = a.select("g." + n.utils.nameToId(t.name));
                    return i.empty() && (i = a.append("g").attr("class", r).attr("transform", "translate(" + t.x + "," + t.y + ")")), i.datum(e[t.name]), i
                }
                var a, u = "bubble-overlay",
                    s = "node",
                    l = "bubble",
                    c = n.bubbleMixin(n.baseMixin({})),
                    f = [];
                return c.transitionDuration(750), c.radiusValueAccessor(function(t) {
                    return t.value
                }), c.point = function(t, e, n) {
                    return f.push({
                        name: t,
                        x: e,
                        y: n
                    }), c
                }, c._doRender = function() {
                    return (a = c.select("g." + u)).empty() && (a = c.svg().append("g").attr("class", u)), a = a, c.r().range([c.MIN_RADIUS, c.width() * c.maxBubbleRelativeSize()]), t = i(), f.forEach(function(e) {
                        var r = o(e, t),
                            i = r.select("circle." + l);
                        i.empty() && (i = r.append("circle").attr("class", l).attr("r", 0).attr("fill", c.getColor).on("click", c.onClick)), n.transition(i, c.transitionDuration()).attr("r", function(t) {
                            return c.bubbleR(t)
                        }), c._doRenderLabel(r), c._doRenderTitles(r)
                    }), c.fadeDeselectedArea(), c;
                    var t
                }, c._doRedraw = function() {
                    return t = i(), f.forEach(function(e) {
                        var r = o(e, t),
                            i = r.select("circle." + l);
                        n.transition(i, c.transitionDuration()).attr("r", function(t) {
                            return c.bubbleR(t)
                        }).attr("fill", c.getColor), c.doUpdateLabels(r), c.doUpdateTitles(r)
                    }), c.fadeDeselectedArea(), c;
                    var t
                }, c.debug = function(e) {
                    if (e) {
                        var r = c.select("g." + n.constants.DEBUG_GROUP_CLASS);
                        r.empty() && (r = c.svg().append("g").attr("class", n.constants.DEBUG_GROUP_CLASS));
                        var i = r.append("text").attr("x", 10).attr("y", 20);
                        r.append("rect").attr("width", c.width()).attr("height", c.height()).on("mousemove", function() {
                            var e = t.mouse(r.node()),
                                n = e[0] + ", " + e[1];
                            i.text(n)
                        })
                    } else c.selectAll(".debug").remove();
                    return c
                }, c.anchor(e, r), c
            }, n.rowChart = function(e, r) {
                function i() {
                    var e = f.select("g.axis");
                    (function() {
                        if (!h || d) {
                            var e = t.extent(p, _.cappedValueAccessor);
                            e[0] > 0 && (e[0] = 0), h = t.scale.linear().domain(e).range([0, _.effectiveWidth()])
                        }
                        C.scale(h)
                    })(), e.empty() && (e = f.append("g").attr("class", "axis").attr("transform", "translate(0, " + _.effectiveHeight() + ")")), n.transition(e, _.transitionDuration()).call(C)
                }

                function o() {
                    p = _.data(), i(), f.selectAll("g.tick").select("line.grid-line").remove(), f.selectAll("g.tick").append("line").attr("class", "grid-line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", function() {
                        return -_.effectiveHeight()
                    });
                    var t, e, r, o = f.selectAll("g." + A).data(p);
                    (e = (t = o).enter().append("g").attr("class", function(t, e) {
                        return A + " _" + e
                    })).append("rect").attr("width", 0), r = e, _.renderLabel() && r.append("text").on("click", s), _.renderTitleLabel() && r.append("text").attr("class", M).on("click", s), u(t), o.exit().remove(),
                        function(t) {
                            var e, r = p.length;
                            e = w || (_.effectiveHeight() - (r + 1) * b) / r, y || (v = e / 2);
                            var i = t.attr("transform", function(t, n) {
                                return "translate(0," + ((n + 1) * b + n * e) + ")"
                            }).select("rect").attr("height", e).attr("fill", _.getColor).on("click", s).classed("deselected", function(t) {
                                return !!_.hasFilter() && !c(t)
                            }).classed("selected", function(t) {
                                return !!_.hasFilter() && c(t)
                            });
                            n.transition(i, _.transitionDuration()).attr("width", function(t) {
                                return Math.abs(a() - h(_.valueAccessor()(t)))
                            }).attr("transform", l), o = t, _.renderTitle() && (o.selectAll("title").remove(), o.append("title").text(_.title())), u(t);
                            var o
                        }(o)
                }

                function a() {
                    var t = h(0);
                    return t === -1 / 0 || t != t ? h(1) : t
                }

                function u(t) {
                    if (_.renderLabel()) {
                        var e = t.select("text").attr("x", g).attr("y", v).attr("dy", m).on("click", s).attr("class", function(t, e) {
                            return A + " _" + e
                        }).text(function(t) {
                            return _.label()(t)
                        });
                        n.transition(e, _.transitionDuration()).attr("transform", l)
                    }
                    if (_.renderTitleLabel()) {
                        var r = t.select("." + M).attr("x", _.effectiveWidth() - x).attr("y", v).attr("text-anchor", "end").on("click", s).attr("class", function(t, e) {
                            return M + " _" + e
                        }).text(function(t) {
                            return _.title()(t)
                        });
                        n.transition(r, _.transitionDuration()).attr("transform", l)
                    }
                }

                function s(t) {
                    _.onClick(t)
                }

                function l(t) {
                    var e = h(_.cappedValueAccessor(t)),
                        n = a();
                    return "translate(" + (e > n ? n : e) + ",0)"
                }

                function c(t) {
                    return _.hasFilter(_.cappedKeyAccessor(t))
                }
                var f, h, d, p, g = 10,
                    v = 15,
                    y = !1,
                    m = "0.35em",
                    x = 2,
                    b = 5,
                    w = !1,
                    A = "row",
                    M = "titlerow",
                    k = !1,
                    _ = n.capMixin(n.marginMixin(n.colorMixin(n.baseMixin({})))),
                    C = t.svg.axis().orient("bottom");
                return _.rowsCap = _.cap, _._doRender = function() {
                    return _.resetSvg(), f = _.svg().append("g").attr("transform", "translate(" + _.margins().left + "," + _.margins().top + ")"), o(), _
                }, _.title(function(t) {
                    return _.cappedKeyAccessor(t) + ": " + _.cappedValueAccessor(t)
                }), _.label(_.cappedKeyAccessor), _.x = function(t) {
                    return arguments.length ? (h = t, _) : h
                }, _.renderTitleLabel = function(t) {
                    return arguments.length ? (k = t, _) : k
                }, _._doRedraw = function() {
                    return o(), _
                }, _.xAxis = function() {
                    return C
                }, _.fixedBarHeight = function(t) {
                    return arguments.length ? (w = t, _) : w
                }, _.gap = function(t) {
                    return arguments.length ? (b = t, _) : b
                }, _.elasticX = function(t) {
                    return arguments.length ? (d = t, _) : d
                }, _.labelOffsetX = function(t) {
                    return arguments.length ? (g = t, _) : g
                }, _.labelOffsetY = function(t) {
                    return arguments.length ? (v = t, y = !0, _) : v
                }, _.titleLabelOffsetX = function(t) {
                    return arguments.length ? (x = t, _) : x
                }, _.anchor(e, r)
            }, n.legend = function() {
                function t() {
                    return s + u
                }
                var e, r, i = {},
                    o = 0,
                    a = 0,
                    u = 12,
                    s = 5,
                    l = !1,
                    c = 560,
                    f = 70,
                    h = !1;
                return i.parent = function(t) {
                    return arguments.length ? (e = t, i) : e
                }, i.render = function() {
                    e.svg().select("g.dc-legend").remove(), r = e.svg().append("g").attr("class", "dc-legend").attr("transform", "translate(" + o + "," + a + ")");
                    var i = e.legendables(),
                        d = r.selectAll("g.dc-legend-item").data(i).enter().append("g").attr("class", "dc-legend-item").on("mouseover", function(t) {
                            e.legendHighlight(t)
                        }).on("mouseout", function(t) {
                            e.legendReset(t)
                        }).on("click", function(t) {
                            t.chart.legendToggle(t)
                        });
                    r.selectAll("g.dc-legend-item").classed("fadeout", function(t) {
                        return t.chart.isLegendableHidden(t)
                    }), i.some(n.pluck("dashstyle")) ? d.append("line").attr("x1", 0).attr("y1", u / 2).attr("x2", u).attr("y2", u / 2).attr("stroke-width", 2).attr("stroke-dasharray", n.pluck("dashstyle")).attr("stroke", n.pluck("color")) : d.append("rect").attr("width", u).attr("height", u).attr("fill", function(t) {
                        return t ? t.color : "blue"
                    }), d.append("text").text(n.pluck("name")).attr("x", u + 2).attr("y", function() {
                        return u / 2 + (this.clientHeight ? this.clientHeight : 13) / 2 - 2
                    });
                    var p = 0,
                        g = 0;
                    d.attr("transform", function(e, n) {
                        if (l) {
                            var r = "translate(" + p + "," + g * t() + ")",
                                i = !0 === h ? this.getBBox().width + s : f;
                            return p + i >= c ? (++g, p = 0) : p += i, r
                        }
                        return "translate(0," + n * t() + ")"
                    })
                }, i.x = function(t) {
                    return arguments.length ? (o = t, i) : o
                }, i.y = function(t) {
                    return arguments.length ? (a = t, i) : a
                }, i.gap = function(t) {
                    return arguments.length ? (s = t, i) : s
                }, i.itemHeight = function(t) {
                    return arguments.length ? (u = t, i) : u
                }, i.horizontal = function(t) {
                    return arguments.length ? (l = t, i) : l
                }, i.legendWidth = function(t) {
                    return arguments.length ? (c = t, i) : c
                }, i.itemWidth = function(t) {
                    return arguments.length ? (f = t, i) : f
                }, i.autoItemWidth = function(t) {
                    return arguments.length ? (h = t, i) : h
                }, i
            }, n.scatterPlot = function(e, r) {
                function i(e, r) {
                    var i = a.selectAll(".chart-body path.symbol").filter(function() {
                            return e(t.select(this))
                        }),
                        o = u.size();
                    u.size(Math.pow(r, 2)), n.transition(i, a.transitionDuration()).attr("d", u), u.size(o)
                }

                function o(t) {
                    var e = a.selectAll(".chart-body path.symbol").each(function(e) {
                        this.filtered = t && t.isFiltered(e.key)
                    });
                    n.transition(e, a.transitionDuration()).attr("d", u)
                }
                var a = n.coordinateGridMixin({}),
                    u = t.svg.symbol(),
                    s = function(t) {
                        return t.value
                    },
                    l = a.keyAccessor();
                a.keyAccessor(function(t) {
                    return l(t)[0]
                }), a.valueAccessor(function(t) {
                    return l(t)[1]
                }), a.colorAccessor(function() {
                    return a._groupName
                });
                var c = function(t) {
                        return "translate(" + a.x()(a.keyAccessor()(t)) + "," + a.y()(a.valueAccessor()(t)) + ")"
                    },
                    f = 3,
                    h = 5,
                    d = 0;
                return u.size(function(t) {
                    return s(t) ? this.filtered ? Math.pow(h, 2) : Math.pow(f, 2) : d
                }), n.override(a, "_filter", function(t) {
                    return arguments.length ? a.__filter(n.filters.RangedTwoDimensionalFilter(t)) : a.__filter()
                }), a.plotData = function() {
                    var t = a.chartBodyG().selectAll("path.symbol").data(a.data());
                    t.enter().append("path").attr("class", "symbol").attr("opacity", 0).attr("fill", a.getColor).attr("transform", c), n.transition(t, a.transitionDuration()).attr("opacity", function(t) {
                        return s(t) ? 1 : 0
                    }).attr("fill", a.getColor).attr("transform", c).attr("d", u), n.transition(t.exit(), a.transitionDuration()).attr("opacity", 0).remove()
                }, a.existenceAccessor = function(t) {
                    return arguments.length ? (s = t, this) : s
                }, a.symbol = function(t) {
                    return arguments.length ? (u.type(t), a) : u.type()
                }, a.symbolSize = function(t) {
                    return arguments.length ? (f = t, a) : f
                }, a.highlightedSize = function(t) {
                    return arguments.length ? (h = t, a) : h
                }, a.hiddenSize = function(t) {
                    return arguments.length ? (d = t, a) : d
                }, a.legendables = function() {
                    return [{
                        chart: a,
                        name: a._groupName,
                        color: a.getColor()
                    }]
                }, a.legendHighlight = function(e) {
                    i(function(t) {
                        return t.attr("fill") === e.color
                    }, h), a.selectAll(".chart-body path.symbol").filter(function() {
                        return t.select(this).attr("fill") !== e.color
                    }).classed("fadeout", !0)
                }, a.legendReset = function(e) {
                    i(function(t) {
                        return t.attr("fill") === e.color
                    }, f), a.selectAll(".chart-body path.symbol").filter(function() {
                        return t.select(this).attr("fill") !== e.color
                    }).classed("fadeout", !1)
                }, a.setHandlePaths = function() {}, a.extendBrush = function() {
                    var t = a.brush().extent();
                    return a.round() && (t[0] = t[0].map(a.round()), t[1] = t[1].map(a.round()), a.g().select(".brush").call(a.brush().extent(t))), t
                }, a.brushIsEmpty = function(t) {
                    return a.brush().empty() || !t || t[0][0] >= t[1][0] || t[0][1] >= t[1][1]
                }, a._brushing = function() {
                    var t = a.extendBrush();
                    if (a.redrawBrush(a.g()), a.brushIsEmpty(t)) n.events.trigger(function() {
                        a.filter(null), a.redrawGroup()
                    }), o(!1);
                    else {
                        var e = n.filters.RangedTwoDimensionalFilter(t);
                        n.events.trigger(function() {
                            a.filter(null), a.filter(e), a.redrawGroup()
                        }, n.constants.EVENT_DELAY), o(e)
                    }
                }, a.setBrushY = function(t) {
                    t.call(a.brush().y(a.y()))
                }, a.anchor(e, r)
            }, n.numberDisplay = function(e, r) {
                var i = "number-display",
                    o = t.format(".2s"),
                    a = n.baseMixin({}),
                    u = {
                        one: "",
                        some: "",
                        none: ""
                    };
                return a._mandatoryAttributes(["group"]), a.html = function(t) {
                    return arguments.length ? (t.none ? u.none = t.none : t.one ? u.none = t.one : t.some && (u.none = t.some), t.one ? u.one = t.one : t.some && (u.one = t.some), t.some ? u.some = t.some : t.one && (u.some = t.one), a) : u
                }, a.value = function() {
                    return a.data()
                }, a.data(function(t) {
                    var e = t.value ? t.value() : t.top(1)[0];
                    return a.valueAccessor()(e)
                }), a.transitionDuration(250), a._doRender = function() {
                    var e = a.value(),
                        n = a.selectAll("." + i);
                    n.empty() && (n = n.data([0]).enter().append("span").attr("class", i)), n.transition().duration(a.transitionDuration()).ease("quad-out-in").tween("text", function() {
                        var n = t.interpolateNumber(this.lastValue || 0, e);
                        return this.lastValue = e,
                            function(t) {
                                var r = null,
                                    i = a.formatNumber()(n(t));
                                0 === e && "" !== u.none ? r = u.none : 1 === e && "" !== u.one ? r = u.one : "" !== u.some && (r = u.some), this.innerHTML = r ? r.replace("%number", i) : i
                            }
                    })
                }, a._doRedraw = function() {
                    return a._doRender()
                }, a.formatNumber = function(t) {
                    return arguments.length ? (o = t, a) : o
                }, a.anchor(e, r)
            }, n.heatMap = function(e, r) {
                function i(t, e) {
                    var r = f.selectAll(".box-group").filter(function(n) {
                            return n.key[t] === e
                        }),
                        i = r.filter(function(t) {
                            return !f.hasFilter(t.key)
                        });
                    n.events.trigger(function() {
                        i.empty() ? r.each(function(t) {
                            f.filter(t.key)
                        }) : i.each(function(t) {
                            f.filter(t.key)
                        }), f.redrawGroup()
                    })
                }

                function o(t, e, n) {
                    return !e || n[e - 1] !== t
                }
                var a, u, s, l = 6.75,
                    c = 6.75,
                    f = n.colorMixin(n.marginMixin(n.baseMixin({})));
                f._mandatoryAttributes(["group"]), f.title(f.colorAccessor());
                var h = function(t) {
                        return t
                    },
                    d = function(t) {
                        return t
                    };
                f.colsLabel = function(t) {
                    return arguments.length ? (h = t, f) : h
                }, f.rowsLabel = function(t) {
                    return arguments.length ? (d = t, f) : d
                };
                var p = function(t) {
                        i(0, t)
                    },
                    g = function(t) {
                        i(1, t)
                    },
                    v = function(t) {
                        var e = t.key;
                        n.events.trigger(function() {
                            f.filter(e), f.redrawGroup()
                        })
                    };
                return n.override(f, "filter", function(t) {
                    return arguments.length ? f._filter(n.filters.TwoDimensionalFilter(t)) : f._filter()
                }), f.rows = function(e) {
                    if (arguments.length) return s = e, f;
                    if (s) return s;
                    var n = f.data().map(f.valueAccessor());
                    return n.sort(t.ascending), t.scale.ordinal().domain(n.filter(o))
                }, f.cols = function(e) {
                    if (arguments.length) return u = e, f;
                    if (u) return u;
                    var n = f.data().map(f.keyAccessor());
                    return n.sort(t.ascending), t.scale.ordinal().domain(n.filter(o))
                }, f._doRender = function() {
                    return f.resetSvg(), a = f.svg().append("g").attr("class", "heatmap").attr("transform", "translate(" + f.margins().left + "," + f.margins().top + ")"), f._doRedraw()
                }, f._doRedraw = function() {
                    var t = f.rows(),
                        e = f.cols(),
                        r = t.domain().length,
                        i = e.domain().length,
                        o = Math.floor(f.effectiveWidth() / i),
                        u = Math.floor(f.effectiveHeight() / r);
                    e.rangeRoundBands([0, f.effectiveWidth()]), t.rangeRoundBands([f.effectiveHeight(), 0]);
                    var s = a.selectAll("g.box-group").data(f.data(), function(t, e) {
                            return f.keyAccessor()(t, e) + "\0" + f.valueAccessor()(t, e)
                        }),
                        h = s.enter().append("g").attr("class", "box-group");
                    h.append("rect").attr("class", "heat-box").attr("fill", "white").on("click", f.boxOnClick()), f.renderTitle() && h.append("title").text(f.title()), n.transition(s.selectAll("rect"), f.transitionDuration()).attr("x", function(t, n) {
                        return e(f.keyAccessor()(t, n))
                    }).attr("y", function(e, n) {
                        return t(f.valueAccessor()(e, n))
                    }).attr("rx", l).attr("ry", c).attr("fill", f.getColor).attr("width", o).attr("height", u), s.exit().remove();
                    var d = a.selectAll("g.cols");
                    d.empty() && (d = a.append("g").attr("class", "cols axis"));
                    var p = d.selectAll("text").data(e.domain());
                    p.enter().append("text").attr("x", function(t) {
                        return e(t) + o / 2
                    }).style("text-anchor", "middle").attr("y", f.effectiveHeight()).attr("dy", 12).on("click", f.xAxisOnClick()).text(f.colsLabel()), n.transition(p, f.transitionDuration()).text(f.colsLabel()).attr("x", function(t) {
                        return e(t) + o / 2
                    }), p.exit().remove();
                    var g = a.selectAll("g.rows");
                    g.empty() && (g = a.append("g").attr("class", "rows axis"));
                    var v = g.selectAll("text").data(t.domain());
                    return v.enter().append("text").attr("dy", 6).style("text-anchor", "end").attr("x", 0).attr("dx", -2).on("click", f.yAxisOnClick()).text(f.rowsLabel()), n.transition(v, f.transitionDuration()).text(f.rowsLabel()).attr("y", function(e) {
                        return t(e) + u / 2
                    }), v.exit().remove(), f.selectAll("g.box-group").each(f.hasFilter() ? function(t) {
                        f.isSelectedNode(t) ? f.highlightSelected(this) : f.fadeDeselected(this)
                    } : function() {
                        f.resetHighlight(this)
                    }), f
                }, f.boxOnClick = function(t) {
                    return arguments.length ? (v = t, f) : v
                }, f.xAxisOnClick = function(t) {
                    return arguments.length ? (p = t, f) : p
                }, f.yAxisOnClick = function(t) {
                    return arguments.length ? (g = t, f) : g
                }, f.xBorderRadius = function(t) {
                    return arguments.length ? (l = t, f) : l
                }, f.yBorderRadius = function(t) {
                    return arguments.length ? (c = t, f) : c
                }, f.isSelectedNode = function(t) {
                    return f.hasFilter(t.key)
                }, f.anchor(e, r)
            },
            function() {
                function e(t) {
                    return [0, t.length - 1]
                }

                function n(e) {
                    return [t.quantile(e, .25), t.quantile(e, .5), t.quantile(e, .75)]
                }
                t.box = function() {
                    function r(e) {
                        e.each(function(e, n) {
                            e = e.map(s).sort(t.ascending);
                            var r = t.select(this),
                                h = e.length,
                                d = e[0],
                                p = e[h - 1],
                                g = e.quartiles = c(e),
                                v = l && l.call(this, e, n),
                                y = v && v.map(function(t) {
                                    return e[t]
                                }),
                                m = v ? t.range(0, v[0]).concat(t.range(v[1] + 1, h)) : t.range(h),
                                x = t.scale.linear().domain(u && u.call(this, e, n) || [d, p]).range([o, 0]),
                                b = this.__chart__ || t.scale.linear().domain([0, 1 / 0]).range(x.range());
                            this.__chart__ = x;
                            var w = r.selectAll("line.center").data(y ? [y] : []);
                            w.enter().insert("line", "rect").attr("class", "center").attr("x1", i / 2).attr("y1", function(t) {
                                return b(t[0])
                            }).attr("x2", i / 2).attr("y2", function(t) {
                                return b(t[1])
                            }).style("opacity", 1e-6).transition().duration(a).style("opacity", 1).attr("y1", function(t) {
                                return x(t[0])
                            }).attr("y2", function(t) {
                                return x(t[1])
                            }), w.transition().duration(a).style("opacity", 1).attr("y1", function(t) {
                                return x(t[0])
                            }).attr("y2", function(t) {
                                return x(t[1])
                            }), w.exit().transition().duration(a).style("opacity", 1e-6).attr("y1", function(t) {
                                return x(t[0])
                            }).attr("y2", function(t) {
                                return x(t[1])
                            }).remove();
                            var A = r.selectAll("rect.box").data([g]);
                            A.enter().append("rect").attr("class", "box").attr("x", 0).attr("y", function(t) {
                                return b(t[2])
                            }).attr("width", i).attr("height", function(t) {
                                return b(t[0]) - b(t[2])
                            }).transition().duration(a).attr("y", function(t) {
                                return x(t[2])
                            }).attr("height", function(t) {
                                return x(t[0]) - x(t[2])
                            }), A.transition().duration(a).attr("y", function(t) {
                                return x(t[2])
                            }).attr("height", function(t) {
                                return x(t[0]) - x(t[2])
                            });
                            var M = r.selectAll("line.median").data([g[1]]);
                            M.enter().append("line").attr("class", "median").attr("x1", 0).attr("y1", b).attr("x2", i).attr("y2", b).transition().duration(a).attr("y1", x).attr("y2", x), M.transition().duration(a).attr("y1", x).attr("y2", x);
                            var k = r.selectAll("line.whisker").data(y || []);
                            k.enter().insert("line", "circle, text").attr("class", "whisker").attr("x1", 0).attr("y1", b).attr("x2", i).attr("y2", b).style("opacity", 1e-6).transition().duration(a).attr("y1", x).attr("y2", x).style("opacity", 1), k.transition().duration(a).attr("y1", x).attr("y2", x).style("opacity", 1), k.exit().transition().duration(a).attr("y1", x).attr("y2", x).style("opacity", 1e-6).remove();
                            var _ = r.selectAll("circle.outlier").data(m, Number);
                            _.enter().insert("circle", "text").attr("class", "outlier").attr("r", 5).attr("cx", i / 2).attr("cy", function(t) {
                                return b(e[t])
                            }).style("opacity", 1e-6).transition().duration(a).attr("cy", function(t) {
                                return x(e[t])
                            }).style("opacity", 1), _.transition().duration(a).attr("cy", function(t) {
                                return x(e[t])
                            }).style("opacity", 1), _.exit().transition().duration(a).attr("cy", function(t) {
                                return x(e[t])
                            }).style("opacity", 1e-6).remove();
                            var C = f || x.tickFormat(8),
                                T = r.selectAll("text.box").data(g);
                            T.enter().append("text").attr("class", "box").attr("dy", ".3em").attr("dx", function(t, e) {
                                return 1 & e ? 6 : -6
                            }).attr("x", function(t, e) {
                                return 1 & e ? i : 0
                            }).attr("y", b).attr("text-anchor", function(t, e) {
                                return 1 & e ? "start" : "end"
                            }).text(C).transition().duration(a).attr("y", x), T.transition().duration(a).text(C).attr("y", x);
                            var E = r.selectAll("text.whisker").data(y || []);
                            E.enter().append("text").attr("class", "whisker").attr("dy", ".3em").attr("dx", 6).attr("x", i).attr("y", b).text(C).style("opacity", 1e-6).transition().duration(a).attr("y", x).style("opacity", 1), E.transition().duration(a).text(C).attr("y", x).style("opacity", 1), E.exit().transition().duration(a).attr("y", x).style("opacity", 1e-6).remove()
                        }), t.timer.flush()
                    }
                    var i = 1,
                        o = 1,
                        a = 0,
                        u = null,
                        s = Number,
                        l = e,
                        c = n,
                        f = null;
                    return r.width = function(t) {
                        return arguments.length ? (i = t, r) : i
                    }, r.height = function(t) {
                        return arguments.length ? (o = t, r) : o
                    }, r.tickFormat = function(t) {
                        return arguments.length ? (f = t, r) : f
                    }, r.duration = function(t) {
                        return arguments.length ? (a = t, r) : a
                    }, r.domain = function(e) {
                        return arguments.length ? (u = null === e ? e : t.functor(e), r) : u
                    }, r.value = function(t) {
                        return arguments.length ? (s = t, r) : s
                    }, r.whiskers = function(t) {
                        return arguments.length ? (l = t, r) : l
                    }, r.quartiles = function(t) {
                        return arguments.length ? (c = t, r) : c
                    }, r
                }
            }(), n.boxPlot = function(e, r) {
                var i = n.coordinateGridMixin({}),
                    o = function(t) {
                        return function(e) {
                            for (var n = e.quartiles[0], r = e.quartiles[2], i = (r - n) * t, o = -1, a = e.length; e[++o] < n - i;);
                            for (; e[--a] > r + i;);
                            return [o, a]
                        }
                    }(1.5),
                    a = t.box(),
                    u = null,
                    s = function(t, e) {
                        return i.isOrdinal() ? i.x().rangeBand() : t / (1 + i.boxPadding()) / e
                    };
                i.yAxisPadding(12), i.x(t.scale.ordinal()), i.xUnits(n.units.ordinal), i.data(function(t) {
                    return t.all().map(function(t) {
                        return t.map = function(e) {
                            return e.call(t, t)
                        }, t
                    }).filter(function(t) {
                        return 0 !== i.valueAccessor()(t).length
                    })
                }), i.boxPadding = i._rangeBandPadding, i.boxPadding(.8), i.outerPadding = i._outerRangeBandPadding, i.outerPadding(.5), i.boxWidth = function(e) {
                    return arguments.length ? (s = t.functor(e), i) : s
                };
                var l = function(t, e) {
                    return "translate(" + i.x()(i.keyAccessor()(t, e)) + ", 0)"
                };
                return i._preprocessData = function() {
                    i.elasticX() && i.x().domain([])
                }, i.plotData = function() {
                    var e = s(i.effectiveWidth(), i.xUnitCount());
                    a.whiskers(o).width(e).height(i.effectiveHeight()).value(i.valueAccessor()).domain(i.y().domain()).duration(i.transitionDuration()).tickFormat(u);
                    var r, c = i.chartBodyG().selectAll("g.box").data(i.data(), function(t) {
                        return t.key
                    });
                    c.enter().append("g").attr("class", "box").attr("transform", l).call(a).on("click", function(t) {
                        i.filter(t.key), i.redrawGroup()
                    }), r = c, n.transition(r, i.transitionDuration()).attr("transform", l).call(a).each(function() {
                        t.select(this).select("rect.box").attr("fill", i.getColor)
                    }), c.exit().remove().call(a), i.fadeDeselectedArea()
                }, i.fadeDeselectedArea = function() {
                    i.g().selectAll("g.box").each(i.hasFilter() ? function(t) {
                        i.isSelectedNode(t) ? i.highlightSelected(this) : i.fadeDeselected(this)
                    } : function() {
                        i.resetHighlight(this)
                    })
                }, i.isSelectedNode = function(t) {
                    return i.hasFilter(t.key)
                }, i.yAxisMin = function() {
                    var e = t.min(i.data(), function(e) {
                        return t.min(i.valueAccessor()(e))
                    });
                    return n.utils.subtract(e, i.yAxisPadding())
                }, i.yAxisMax = function() {
                    var e = t.max(i.data(), function(e) {
                        return t.max(i.valueAccessor()(e))
                    });
                    return n.utils.add(e, i.yAxisPadding())
                }, i.tickFormat = function(t) {
                    return arguments.length ? (u = t, i) : u
                }, i.anchor(e, r)
            }, n.abstractBubbleChart = n.bubbleMixin, n.baseChart = n.baseMixin, n.capped = n.capMixin, n.colorChart = n.colorMixin, n.coordinateGridChart = n.coordinateGridMixin, n.marginable = n.marginMixin, n.stackableChart = n.stackMixin, n.d3 = t, n.crossfilter = e, n
    }
    if ("function" == typeof define && define.amd) define(["d3", "crossfilter"], t);
    else if ("object" == typeof module && module.exports) {
        var e = require("d3"),
            n = require("crossfilter");
        "function" != typeof n && (n = n.crossfilter), module.exports = t(e, n)
    } else this.dc = t(d3, crossfilter)
}(),
function() {
    var t, e, n, r, i, o, a, u, s, l, c, f, h, d, p, g, v, y, m, x, b, w, A, M, k, _, C, T, E, S, N, D, L, R, O, $, j, H, q, F, P, I, z, B, U, W, Y, V, G = [].slice,
        X = {}.hasOwnProperty,
        Z = function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e) X.call(e, r) && (t[r] = e[r]);
            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        },
        Q = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    for (b = {
            catchupTime: 100,
            initialRate: .03,
            minTime: 250,
            ghostTime: 100,
            maxProgressPerFrame: 20,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !0,
            restartOnRequestAfter: 500,
            target: "body",
            elements: {
                checkInterval: 100,
                selectors: ["body"]
            },
            eventLag: {
                minSamples: 10,
                sampleCount: 3,
                lagThreshold: 3
            },
            ajax: {
                trackMethods: ["GET"],
                trackWebSockets: !0,
                ignoreURLs: []
            }
        }, E = function() {
            var t;
            return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
        }, N = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, x = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == N && (N = function(t) {
            return setTimeout(t, 50)
        }, x = function(t) {
            return clearTimeout(t)
        }), L = function(t) {
            var e, n;
            return e = E(), (n = function() {
                var r;
                return (r = E() - e) >= 33 ? (e = E(), t(r, function() {
                    return N(n)
                })) : setTimeout(n, 33 - r)
            })()
        }, D = function() {
            var t, e, n;
            return n = arguments[0], e = arguments[1], t = 3 <= arguments.length ? G.call(arguments, 2) : [], "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
        }, w = function() {
            var t, e, n, r, i, o, a;
            for (e = arguments[0], o = 0, a = (r = 2 <= arguments.length ? G.call(arguments, 1) : []).length; a > o; o++)
                if (n = r[o])
                    for (t in n) X.call(n, t) && (i = n[t], null != e[t] && "object" == typeof e[t] && null != i && "object" == typeof i ? w(e[t], i) : e[t] = i);
            return e
        }, v = function(t) {
            var e, n, r, i, o;
            for (n = e = 0, i = 0, o = t.length; o > i; i++) r = t[i], n += Math.abs(r), e++;
            return n / e
        }, M = function(t, e) {
            var n, r, i;
            if (null == t && (t = "options"), null == e && (e = !0), i = document.querySelector("[data-pace-" + t + "]")) {
                if (n = i.getAttribute("data-pace-" + t), !e) return n;
                try {
                    return JSON.parse(n)
                } catch (t) {
                    return r = t, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
                }
            }
        }, a = function() {
            function t() {}
            return t.prototype.on = function(t, e, n, r) {
                var i;
                return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[t] && (i[t] = []), this.bindings[t].push({
                    handler: e,
                    ctx: n,
                    once: r
                })
            }, t.prototype.once = function(t, e, n) {
                return this.on(t, e, n, !0)
            }, t.prototype.off = function(t, e) {
                var n, r, i;
                if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
                    if (null == e) return delete this.bindings[t];
                    for (n = 0, i = []; n < this.bindings[t].length;) i.push(this.bindings[t][n].handler === e ? this.bindings[t].splice(n, 1) : n++);
                    return i
                }
            }, t.prototype.trigger = function() {
                var t, e, n, r, i, o, a, u, s;
                if (n = arguments[0], t = 2 <= arguments.length ? G.call(arguments, 1) : [], null != (a = this.bindings) ? a[n] : void 0) {
                    for (i = 0, s = []; i < this.bindings[n].length;) r = (u = this.bindings[n][i]).handler, e = u.ctx, o = u.once, r.apply(null != e ? e : this, t), s.push(o ? this.bindings[n].splice(i, 1) : i++);
                    return s
                }
            }, t
        }(), l = window.Pace || {}, window.Pace = l, w(l, a.prototype), S = l.options = w({}, b, window.paceOptions, M()), z = 0, U = (Y = ["ajax", "document", "eventLag", "elements"]).length; U > z; z++) !0 === S[j = Y[z]] && (S[j] = b[j]);
    s = function(t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return Z(e, t), e
    }(Error), e = function() {
        function t() {
            this.progress = 0
        }
        return t.prototype.getElement = function() {
            var t;
            if (null == this.el) {
                if (!(t = document.querySelector(S.target))) throw new s;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
            }
            return this.el
        }, t.prototype.finish = function() {
            var t;
            return (t = this.getElement()).className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, t.prototype.update = function(t) {
            return this.progress = t, this.render()
        }, t.prototype.destroy = function() {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (t) {
                s = t
            }
            return this.el = void 0
        }, t.prototype.render = function() {
            var t, e, n, r, i, o, a;
            if (null == document.querySelector(S.target)) return !1;
            for (t = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", i = 0, o = (a = ["webkitTransform", "msTransform", "transform"]).length; o > i; i++) e = a[i], t.children[0].style[e] = r;
            return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), this.progress >= 100 ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), this.lastRenderedProgress = this.progress
        }, t.prototype.done = function() {
            return this.progress >= 100
        }, t
    }(), u = function() {
        function t() {
            this.bindings = {}
        }
        return t.prototype.trigger = function(t, e) {
            var n, r, i, o, a;
            if (null != this.bindings[t]) {
                for (a = [], r = 0, i = (o = this.bindings[t]).length; i > r; r++) n = o[r], a.push(n.call(this, e));
                return a
            }
        }, t.prototype.on = function(t, e) {
            var n;
            return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
        }, t
    }(), I = window.XMLHttpRequest, P = window.XDomainRequest, F = window.WebSocket, A = function(t, e) {
        var n, r, i;
        for (n in i = [], e.prototype) try {
            r = e.prototype[n], i.push(null == t[n] && "function" != typeof r ? t[n] = r : void 0)
        } catch (t) {
            t
        }
        return i
    }, C = [], l.ignore = function() {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? G.call(arguments, 1) : [], C.unshift("ignore"), n = e.apply(null, t), C.shift(), n
    }, l.track = function() {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? G.call(arguments, 1) : [], C.unshift("track"), n = e.apply(null, t), C.shift(), n
    }, $ = function(t) {
        var e;
        if (null == t && (t = "GET"), "track" === C[0]) return "force";
        if (!C.length && S.ajax) {
            if ("socket" === t && S.ajax.trackWebSockets) return !0;
            if (e = t.toUpperCase(), Q.call(S.ajax.trackMethods, e) >= 0) return !0
        }
        return !1
    }, c = function(t) {
        function e() {
            var t, n = this;
            e.__super__.constructor.apply(this, arguments), t = function(t) {
                var e;
                return e = t.open, t.open = function(r, i) {
                    return $(r) && n.trigger("request", {
                        type: r,
                        url: i,
                        request: t
                    }), e.apply(t, arguments)
                }
            }, window.XMLHttpRequest = function(e) {
                var n;
                return n = new I(e), t(n), n
            };
            try {
                A(window.XMLHttpRequest, I)
            } catch (t) {}
            if (null != P) {
                window.XDomainRequest = function() {
                    var e;
                    return e = new P, t(e), e
                };
                try {
                    A(window.XDomainRequest, P)
                } catch (t) {}
            }
            if (null != F && S.ajax.trackWebSockets) {
                window.WebSocket = function(t, e) {
                    var r;
                    return r = null != e ? new F(t, e) : new F(t), $("socket") && n.trigger("request", {
                        type: "socket",
                        url: t,
                        protocols: e,
                        request: r
                    }), r
                };
                try {
                    A(window.WebSocket, F)
                } catch (t) {}
            }
        }
        return Z(e, u), e
    }(), B = null, O = function(t) {
        var e, n, r, i;
        for (n = 0, r = (i = S.ajax.ignoreURLs).length; r > n; n++)
            if ("string" == typeof(e = i[n])) {
                if (-1 !== t.indexOf(e)) return !0
            } else if (e.test(t)) return !0;
        return !1
    }, (k = function() {
        return null == B && (B = new c), B
    })().on("request", function(e) {
        var n, r, i, o, a;
        return o = e.type, i = e.request, a = e.url, O(a) ? void 0 : l.running || !1 === S.restartOnRequestAfter && "force" !== $(o) ? void 0 : (r = arguments, "boolean" == typeof(n = S.restartOnRequestAfter || 0) && (n = 0), setTimeout(function() {
            var e, n, a, u, s;
            if ("socket" === o ? i.readyState < 2 : 0 < (a = i.readyState) && 4 > a) {
                for (l.restart(), s = [], e = 0, n = (u = l.sources).length; n > e; e++) {
                    if ((j = u[e]) instanceof t) {
                        j.watch.apply(j, r);
                        break
                    }
                    s.push(void 0)
                }
                return s
            }
        }, n))
    }), t = function() {
        function t() {
            var t = this;
            this.elements = [], k().on("request", function() {
                return t.watch.apply(t, arguments)
            })
        }
        return t.prototype.watch = function(t) {
            var e, n, r, i;
            return r = t.type, e = t.request, i = t.url, O(i) ? void 0 : (n = "socket" === r ? new d(e) : new p(e), this.elements.push(n))
        }, t
    }(), p = function() {
        return function(t) {
            var e, n, r, i, o, a = this;
            if (this.progress = 0, null != window.ProgressEvent)
                for (t.addEventListener("progress", function(t) {
                        return a.progress = t.lengthComputable ? 100 * t.loaded / t.total : a.progress + (100 - a.progress) / 2
                    }, !1), n = 0, r = (o = ["load", "abort", "timeout", "error"]).length; r > n; n++) e = o[n], t.addEventListener(e, function() {
                    return a.progress = 100
                }, !1);
            else i = t.onreadystatechange, t.onreadystatechange = function() {
                var e;
                return 0 === (e = t.readyState) || 4 === e ? a.progress = 100 : 3 === t.readyState && (a.progress = 50), "function" == typeof i ? i.apply(null, arguments) : void 0
            }
        }
    }(), d = function() {
        return function(t) {
            var e, n, r, i, o = this;
            for (this.progress = 0, n = 0, r = (i = ["error", "open"]).length; r > n; n++) e = i[n], t.addEventListener(e, function() {
                return o.progress = 100
            }, !1)
        }
    }(), r = function() {
        return function(t) {
            var e, n, r, o;
            for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), n = 0, r = (o = t.selectors).length; r > n; n++) e = o[n], this.elements.push(new i(e))
        }
    }(), i = function() {
        function t(t) {
            this.selector = t, this.progress = 0, this.check()
        }
        return t.prototype.check = function() {
            var t = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                return t.check()
            }, S.elements.checkInterval)
        }, t.prototype.done = function() {
            return this.progress = 100
        }, t
    }(), n = function() {
        function t() {
            var t, e, n = this;
            this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function() {
                return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
            }
        }
        return t.prototype.states = {
            loading: 0,
            interactive: 50,
            complete: 100
        }, t
    }(), o = function() {
        return function() {
            var t, e, n, r, i, o = this;
            this.progress = 0, t = 0, i = [], r = 0, n = E(), e = setInterval(function() {
                var a;
                return a = E() - n - 50, n = E(), i.push(a), i.length > S.eventLag.sampleCount && i.shift(), t = v(i), ++r >= S.eventLag.minSamples && t < S.eventLag.lagThreshold ? (o.progress = 100, clearInterval(e)) : o.progress = 3 / (t + 3) * 100
            }, 50)
        }
    }(), h = function() {
        function t(t) {
            this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = S.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = D(this.source, "progress"))
        }
        return t.prototype.tick = function(t, e) {
            var n;
            return null == e && (e = D(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / S.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), n = 1 - Math.pow(this.progress / 100, S.easeFactor), this.progress += n * this.rate * t, this.progress = Math.min(this.lastProgress + S.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, t
    }(), H = null, R = null, y = null, q = null, g = null, m = null, l.running = !1, _ = function() {
        return S.restartOnPushState ? l.restart() : void 0
    }, null != window.history.pushState && (W = window.history.pushState, window.history.pushState = function() {
        return _(), W.apply(window.history, arguments)
    }), null != window.history.replaceState && (V = window.history.replaceState, window.history.replaceState = function() {
        return _(), V.apply(window.history, arguments)
    }), f = {
        ajax: t,
        elements: r,
        document: n,
        eventLag: o
    }, (T = function() {
        var t, n, r, i, o, a, u, s;
        for (l.sources = H = [], n = 0, i = (a = ["ajax", "elements", "document", "eventLag"]).length; i > n; n++) !1 !== S[t = a[n]] && H.push(new f[t](S[t]));
        for (r = 0, o = (s = null != (u = S.extraSources) ? u : []).length; o > r; r++) j = s[r], H.push(new j(S));
        return l.bar = y = new e, R = [], q = new h
    })(), l.stop = function() {
        return l.trigger("stop"), l.running = !1, y.destroy(), m = !0, null != g && ("function" == typeof x && x(g), g = null), T()
    }, l.restart = function() {
        return l.trigger("restart"), l.stop(), l.start()
    }, l.go = function() {
        var t;
        return l.running = !0, y.render(), t = E(), m = !1, g = L(function(e, n) {
            var r, i, o, a, u, s, c, f, d, p, g, v, x, b, w;
            for (100 - y.progress, i = p = 0, o = !0, s = g = 0, x = H.length; x > g; s = ++g)
                for (j = H[s], d = null != R[s] ? R[s] : R[s] = [], c = v = 0, b = (u = null != (w = j.elements) ? w : [j]).length; b > v; c = ++v) a = u[c], o &= (f = null != d[c] ? d[c] : d[c] = new h(a)).done, f.done || (i++, p += f.tick(e));
            return r = p / i, y.update(q.tick(e, r)), y.done() || o || m ? (y.update(100), l.trigger("done"), setTimeout(function() {
                return y.finish(), l.running = !1, l.trigger("hide")
            }, Math.max(S.ghostTime, Math.max(S.minTime - (E() - t), 0)))) : n()
        })
    }, l.start = function(t) {
        w(S, t), l.running = !0;
        try {
            y.render()
        } catch (t) {
            s = t
        }
        return document.querySelector(".pace") ? (l.trigger("start"), l.go()) : setTimeout(l.start, 50)
    }, "function" == typeof define && define.amd ? define(function() {
        return l
    }) : "object" == typeof exports ? module.exports = l : S.startOnPageLoad && l.start()
}.call(this);