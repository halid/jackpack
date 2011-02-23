//XRegExp 1.5.0 <xregexp.com> MIT License
var XRegExp;
if (XRegExp) {
	throw Error("can't load XRegExp twice in the same frame")
}
(function() {
	XRegExp = function(w, r) {
		var q = [],u = XRegExp.OUTSIDE_CLASS,x = 0,p,s,v,t,y;
		if (XRegExp.isRegExp(w)) {
			if (r !== undefined) {
				throw TypeError("can't supply flags when constructing one RegExp from another")
			}
			return j(w)
		}
		if (g) {
			throw Error("can't call the XRegExp constructor within token definition functions")
		}
		r = r || "";
		p = {hasNamedCapture:false,captureNames:[],hasFlag:function(z) {
			return r.indexOf(z) > -1
		},setFlag:function(z) {
			r += z
		}};
		while (x < w.length) {
			s = o(w, x, u, p);
			if (s) {
				q.push(s.output);
				x += (s.match[0].length || 1)
			} else {
				if (v = m.exec.call(i[u], w.slice(x))) {
					q.push(v[0]);
					x += v[0].length
				} else {
					t = w.charAt(x);
					if (t === "[") {
						u = XRegExp.INSIDE_CLASS
					} else {
						if (t === "]") {
							u = XRegExp.OUTSIDE_CLASS
						}
					}
					q.push(t);
					x++
				}
			}
		}
		y = RegExp(q.join(""), m.replace.call(r, h, ""));
		y._xregexp = {source:w,captureNames:p.hasNamedCapture ? p.captureNames : null};
		return y
	};
	XRegExp.version = "1.5.0";
	XRegExp.INSIDE_CLASS = 1;
	XRegExp.OUTSIDE_CLASS = 2;
	var c = /\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,h = /[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,n = /^(?:[?*+]|{\d+(?:,\d*)?})\??/,g = false,k = [],m = {exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},a = m.exec.call(/()??/, "")[1] === undefined,e = function() {
		var p = /^/g;
		m.test.call(p, "");
		return !p.lastIndex
	}(),f = function() {
		var p = /x/g;
		m.replace.call("x", p, "");
		return !p.lastIndex
	}(),b = RegExp.prototype.sticky !== undefined,i = {};
	i[XRegExp.INSIDE_CLASS] = /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;
	i[XRegExp.OUTSIDE_CLASS] = /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;
	XRegExp.addToken = function(s, r, q, p) {
		k.push({pattern:j(s, "g" + (b ? "y" : "")),handler:r,scope:q || XRegExp.OUTSIDE_CLASS,trigger:p || null})
	};
	XRegExp.cache = function(r, p) {
		var q = r + "/" + (p || "");
		return XRegExp.cache[q] || (XRegExp.cache[q] = XRegExp(r, p))
	};
	XRegExp.copyAsGlobal = function(p) {
		return j(p, "g")
	};
	XRegExp.escape = function(p) {
		return p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	};
	XRegExp.execAt = function(s, r, t, q) {
		r = j(r, "g" + ((q && b) ? "y" : ""));
		r.lastIndex = t = t || 0;
		var p = r.exec(s);
		if (q) {
			return(p && p.index === t) ? p : null
		} else {
			return p
		}
	};
	XRegExp.freezeTokens = function() {
		XRegExp.addToken = function() {
			throw Error("can't run addToken after freezeTokens")
		}
	};
	XRegExp.isRegExp = function(p) {
		return Object.prototype.toString.call(p) === "[object RegExp]"
	};
	XRegExp.iterate = function(u, p, v, s) {
		var t = j(p, "g"),r = -1,q;
		while (q = t.exec(u)) {
			v.call(s, q, ++r, u, t);
			if (t.lastIndex === q.index) {
				t.lastIndex++
			}
		}
		if (p.global) {
			p.lastIndex = 0
		}
	};
	XRegExp.matchChain = function(q, p) {
		return function r(s, x) {
			var v = p[x].regex ? p[x] : {regex:p[x]},u = j(v.regex, "g"),w = [],t;
			for (t = 0; t < s.length; t++) {
				XRegExp.iterate(s[t], u, function(y) {
					w.push(v.backref ? (y[v.backref] || "") : y[0])
				})
			}
			return((x === p.length - 1) || !w.length) ? w : r(w, x + 1)
		}([q], 0)
	};
	RegExp.prototype.apply = function(q, p) {
		return this.exec(p[0])
	};
	RegExp.prototype.call = function(p, q) {
		return this.exec(q)
	};
	RegExp.prototype.exec = function(t) {
		var r = m.exec.apply(this, arguments),q,p;
		if (r) {
			if (!a && r.length > 1 && l(r, "") > -1) {
				p = RegExp(this.source, m.replace.call(d(this), "g", ""));
				m.replace.call(t.slice(r.index), p, function() {
					for (var u = 1; u < arguments.length - 2; u++) {
						if (arguments[u] === undefined) {
							r[u] = undefined
						}
					}
				})
			}
			if (this._xregexp && this._xregexp.captureNames) {
				for (var s = 1; s < r.length; s++) {
					q = this._xregexp.captureNames[s - 1];
					if (q) {
						r[q] = r[s]
					}
				}
			}
			if (!e && this.global && !r[0].length && (this.lastIndex > r.index)) {
				this.lastIndex--
			}
		}
		return r
	};
	if (!e) {
		RegExp.prototype.test = function(q) {
			var p = m.exec.call(this, q);
			if (p && this.global && !p[0].length && (this.lastIndex > p.index)) {
				this.lastIndex--
			}
			return !!p
		}
	}
	String.prototype.match = function(q) {
		if (!XRegExp.isRegExp(q)) {
			q = RegExp(q)
		}
		if (q.global) {
			var p = m.match.apply(this, arguments);
			q.lastIndex = 0;
			return p
		}
		return q.exec(this)
	};
	String.prototype.replace = function(r, s) {
		var t = XRegExp.isRegExp(r),q,p,u;
		if (t && typeof s.valueOf() === "string" && s.indexOf("${") === -1 && f) {
			return m.replace.apply(this, arguments)
		}
		if (!t) {
			r = r + ""
		} else {
			if (r._xregexp) {
				q = r._xregexp.captureNames
			}
		}
		if (typeof s === "function") {
			p = m.replace.call(this, r, function() {
				if (q) {
					arguments[0] = new String(arguments[0]);
					for (var v = 0; v < q.length; v++) {
						if (q[v]) {
							arguments[0][q[v]] = arguments[v + 1]
						}
					}
				}
				if (t && r.global) {
					r.lastIndex = arguments[arguments.length - 2] + arguments[0].length
				}
				return s.apply(null, arguments)
			})
		} else {
			u = this + "";
			p = m.replace.call(u, r, function() {
				var v = arguments;
				return m.replace.call(s, c, function(x, w, A) {
					if (w) {
						switch (w) {case"$":return"$";case"&":return v[0];case"`":return v[v.length - 1].slice(0, v[v.length - 2]);case"'":return v[v.length - 1].slice(v[v.length - 2] + v[0].length);default:var y = "";w = +w;if (!w) {
							return x
						}while (w > v.length - 3) {
							y = String.prototype.slice.call(w, -1) + y;
							w = Math.floor(w / 10)
						}return(w ? v[w] || "" : "$") + y
						}
					} else {
						var z = +A;
						if (z <= v.length - 3) {
							return v[z]
						}
						z = q ? l(q, A) : -1;
						return z > -1 ? v[z + 1] : x
					}
				})
			})
		}
		if (t && r.global) {
			r.lastIndex = 0
		}
		return p
	};
	String.prototype.split = function(u, p) {
		if (!XRegExp.isRegExp(u)) {
			return m.split.apply(this, arguments)
		}
		var w = this + "",r = [],v = 0,t,q;
		if (p === undefined || +p < 0) {
			p = Infinity
		} else {
			p = Math.floor(+p);
			if (!p) {
				return[]
			}
		}
		u = XRegExp.copyAsGlobal(u);
		while (t = u.exec(w)) {
			if (u.lastIndex > v) {
				r.push(w.slice(v, t.index));
				if (t.length > 1 && t.index < w.length) {
					Array.prototype.push.apply(r, t.slice(1))
				}
				q = t[0].length;
				v = u.lastIndex;
				if (r.length >= p) {
					break
				}
			}
			if (u.lastIndex === t.index) {
				u.lastIndex++
			}
		}
		if (v === w.length) {
			if (!m.test.call(u, "") || q) {
				r.push("")
			}
		} else {
			r.push(w.slice(v))
		}
		return r.length > p ? r.slice(0, p) : r
	};
	function j(r, q) {
		if (!XRegExp.isRegExp(r)) {
			throw TypeError("type RegExp expected")
		}
		var p = r._xregexp;
		r = XRegExp(r.source, d(r) + (q || ""));
		if (p) {
			r._xregexp = {source:p.source,captureNames:p.captureNames ? p.captureNames.slice(0) : null}
		}
		return r
	}

	function d(p) {
		return(p.global ? "g" : "") + (p.ignoreCase ? "i" : "") + (p.multiline ? "m" : "") + (p.extended ? "x" : "") + (p.sticky ? "y" : "")
	}

	function o(v, u, w, p) {
		var r = k.length,y,s,x;
		g = true;
		try {
			while (r--) {
				x = k[r];
				if ((w & x.scope) && (!x.trigger || x.trigger.call(p))) {
					x.pattern.lastIndex = u;
					s = x.pattern.exec(v);
					if (s && s.index === u) {
						y = {output:x.handler.call(p, s, w),match:s};
						break
					}
				}
			}
		} catch(q) {
			throw q
		} finally {
			g = false
		}
		return y
	}

	function l(s, q, r) {
		if (Array.prototype.indexOf) {
			return s.indexOf(q, r)
		}
		for (var p = r || 0; p < s.length; p++) {
			if (s[p] === q) {
				return p
			}
		}
		return -1
	}

	XRegExp.addToken(/\(\?#[^)]*\)/, function(p) {
		return m.test.call(n, p.input.slice(p.index + p[0].length)) ? "" : "(?:)"
	});
	XRegExp.addToken(/\((?!\?)/, function() {
		this.captureNames.push(null);
		return"("
	});
	XRegExp.addToken(/\(\?<([$\w]+)>/, function(p) {
		this.captureNames.push(p[1]);
		this.hasNamedCapture = true;
		return"("
	});
	XRegExp.addToken(/\\k<([\w$]+)>/, function(q) {
		var p = l(this.captureNames, q[1]);
		return p > -1 ? "\\" + (p + 1) + (isNaN(q.input.charAt(q.index + q[0].length)) ? "" : "(?:)") : q[0]
	});
	XRegExp.addToken(/\[\^?]/, function(p) {
		return p[0] === "[]" ? "\\b\\B" : "[\\s\\S]"
	});
	XRegExp.addToken(/^\(\?([imsx]+)\)/, function(p) {
		this.setFlag(p[1]);
		return""
	});
	XRegExp.addToken(/(?:\s+|#.*)+/, function(p) {
		return m.test.call(n, p.input.slice(p.index + p[0].length)) ? "" : "(?:)"
	}, XRegExp.OUTSIDE_CLASS, function() {
		return this.hasFlag("x")
	});
	XRegExp.addToken(/\./, function() {
		return"[\\s\\S]"
	}, XRegExp.OUTSIDE_CLASS, function() {
		return this.hasFlag("s")
	});
})();
