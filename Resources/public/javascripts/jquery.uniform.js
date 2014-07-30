(function(e, t) {
    "use strict";
    function n(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return e.prop ? e.prop.apply(e, t) : e.attr.apply(e, t)
    }
    function s(e, t, n) {
        var s, a;
        for (s in n)
            n.hasOwnProperty(s) && (a = s.replace(/ |$/g, t.eventNamespace), e.bind(a, n[s]))
    }
    function a(e, t, n) {
        s(e, n, {
            focus: function() {
                t.addClass(n.focusClass)
            },
            blur: function() {
                t.removeClass(n.focusClass), t.removeClass(n.activeClass)
            },
            mouseenter: function() {
                t.addClass(n.hoverClass)
            },
            mouseleave: function() {
                t.removeClass(n.hoverClass), t.removeClass(n.activeClass)
            },
            "mousedown touchbegin": function() {
                e.is(":disabled") || t.addClass(n.activeClass)
            },
            "mouseup touchend": function() {
                t.removeClass(n.activeClass)
            }
        })
    }
    function i(e, t) {
        e.removeClass(t.hoverClass + " " + t.focusClass + " " + t.activeClass)
    }
    function r(e, t, n) {
        n ? e.addClass(t) : e.removeClass(t)
    }
    function l(e, t, n) {
        var s = "checked", a = t.is(":" + s);
        t.prop ? t.prop(s, a) : a ? t.attr(s, s) : t.removeAttr(s), r(e, n.checkedClass, a)
    }
    function u(e, t, n) {
        r(e, n.disabledClass, t.is(":disabled"))
    }
    function o(e, t, n) {
        switch (n) {
        case"after":
            return e.after(t), e.next();
        case"before":
            return e.before(t), e.prev();
        case"wrap":
            return e.wrap(t), e.parent()
        }
        return null
    }
    function c(t, s, a) {
        var i, r, l;
        return a || (a = {}), a = e.extend({
            bind: {},
            divClass: null,
            divWrap: "wrap",
            spanClass: null,
            spanHtml: null,
            spanWrap: "wrap"
        }, a), i = e("<div />"), r = e("<span />"), s.autoHide && t.is(":hidden") && "none" === t.css("display") && i.hide(), a.divClass && i.addClass(a.divClass), s.wrapperClass && i.addClass(s.wrapperClass), a.spanClass && r.addClass(a.spanClass), l = n(t, "id"), s.useID && l && n(i, "id", s.idPrefix + "-" + l), a.spanHtml && r.html(a.spanHtml), i = o(t, i, a.divWrap), r = o(t, r, a.spanWrap), u(i, t, s), {
            div: i, span: r
        }
    }
    function d(t, n) {
        var s;
        return n.wrapperClass ? (s = e("<span />").addClass(n.wrapperClass), s = o(t, s, "wrap")) : null
    }
    function f() {
        var t, n, s, a;
        return a = "rgb(120,2,153)", n = e('<div style="width:0;height:0;color:' + a + '">'), e("body").append(n), s = n.get(0), t = document.getComputedStyle ? document.getComputedStyle(s, "").color : (s.currentStyle || s.style || {}).color, n.remove(), t.replace(/ /g, "") !== a
    }
    function p(t) {
        return t ? e("<span />").text(t).html() : ""
    }
    function m() {
        return navigator.cpuClass&&!navigator.product
    }
    function v() {
        return window.XMLHttpRequest !== void 0?!0 : !1
    }
    function h(e) {
        var t;
        return e[0].multiple?!0 : (t = n(e, "size"), !t || 1 >= t?!1 : !0)
    }
    function C() {
        return !1
    }
    function w(e, t) {
        var n = "none";
        s(e, t, {
            "selectstart dragstart mousedown": C
        }), e.css({
            MozUserSelect: n,
            msUserSelect: n,
            webkitUserSelect: n,
            userSelect: n
        })
    }
    function b(e, t, n) {
        var s = e.val();
        "" === s ? s = n.fileDefaultHtml : (s = s.split(/[\/\\]+/), s = s[s.length-1]), t.text(s)
    }
    function y(e, t, n) {
        var s, a;
        for (s = [], e.each(function() {
            var e;
            for (e in t)Object.prototype.hasOwnProperty.call(t, e) && (s.push({
                el: this, name: e, old: this.style[e]
            })
                , this.style[e] = t[e])
        }), n();
        s.length;
        )a = s.pop(), a.el.style[a.name] = a.old
    }
    function g(e, t) {
        var n;
        n = e.parents(), n.push(e[0]), n = n.not(":visible"), y(n, {
            visibility: "hidden",
            display: "block",
            position: "absolute"
        }, t)
    }
    function k(e, t) {
        return function() {
            e.unwrap().unwrap().unbind(t.eventNamespace)
        }
    }
    var H=!0, x=!1, A = [{
        match: function(e) {
            return e.is("a, button, :submit, :reset, input[type='button']")
        },
        apply: function(e, t) {
            var r, l, o, d, f;
            return l = t.submitDefaultHtml, e.is(":reset") && (l = t.resetDefaultHtml), d = e.is("a, button") ? function() {
                return e.html() || l
            } : function() {
                return p(n(e, "value")) || l
            }, o = c(e, t, {
                divClass: t.buttonClass,
                spanHtml: d()
            }), r = o.div, a(e, r, t), f=!1, s(r, t, {
                "click touchend": function() {
                    var t, s, a, i;
                    f || e.is(":disabled") || (f=!0, e[0].dispatchEvent ? (t = document.createEvent("MouseEvents"), t.initEvent("click", !0, !0), s = e[0].dispatchEvent(t), e.is("a") && s && (a = n(e, "target"), i = n(e, "href"), a && "_self" !== a ? window.open(i, a) : document.location.href = i)) : e.click(), f=!1)
                }
            }), w(r, t), {
                remove: function() {
                    return r.after(e), r.remove(), e.unbind(t.eventNamespace), e
                }, update: function() {
                    i(r, t), u(r, e, t), e.detach(), o.span.html(d()).append(e)
                }
            }
        }
    }, {
        match: function(e) {
            return e.is(":checkbox")
        },
        apply: function(e, t) {
            var n, r, o;
            return n = c(e, t, {
                divClass: t.checkboxClass
            }), r = n.div, o = n.span, a(e, r, t), s(e, t, {
                "click touchend": function() {
                    l(o, e, t)
                }
            }), l(o, e, t), {
                remove: k(e, t), update: function() {
                    i(r, t), o.removeClass(t.checkedClass), l(o, e, t), u(r, e, t)
                }
            }
        }
    }, {
        match: function(e) {
            return e.is(":file")
        },
        apply: function(t, r) {
            function l() {
                b(t, p, r)
            }
            var d, f, p, v;
            return d = c(t, r, {
                divClass: r.fileClass,
                spanClass: r.fileButtonClass,
                spanHtml: r.fileButtonHtml,
                spanWrap: "after"
            }), f = d.div, v = d.span, p = e("<span />").html(r.fileDefaultHtml), p.addClass(r.filenameClass), p = o(t, p, "after"), n(t, "size") || n(t, "size", f.width() / 10), a(t, f, r), l(), m() ? s(t, r, {
                click: function() {
                    t.trigger("change"), setTimeout(l, 0)
                }
            }) : s(t, r, {
                change: l
            }), w(p, r), w(v, r), {
                remove: function() {
                    return p.remove(), v.remove(), t.unwrap().unbind(r.eventNamespace)
                }, update: function() {
                    i(f, r), b(t, p, r), u(f, t, r)
                }
            }
        }
    }, {
        match: function(e) {
            if (e.is("input")) {
                var t = (" " + n(e, "type") + " ").toLowerCase(), s = " color date datetime datetime-local email month number password search tel text time url week ";
                return s.indexOf(t) >= 0
            }
            return !1
        },
        apply: function(e, t) {
            var s, i;
            return s = n(e, "type"), e.addClass(t.inputClass), i = d(e, t), a(e, e, t), t.inputAddTypeAsClass && e.addClass(s), {
                remove: function() {
                    e.removeClass(t.inputClass), t.inputAddTypeAsClass && e.removeClass(s), i && e.unwrap()
                }, update: C
            }
        }
    }, {
        match: function(e) {
            return e.is(":radio")
        },
        apply: function(t, r) {
            var o, d, f;
            return o = c(t, r, {
                divClass: r.radioClass
            }), d = o.div, f = o.span, a(t, d, r), s(t, r, {
                "click touchend": function() {
                    e.uniform.update(e(':radio[name="' + n(t, "name") + '"]'))
                }
            }), l(f, t, r), {
                remove: k(t, r), update: function() {
                    i(d, r), l(f, t, r), u(d, t, r)
                }
            }
        }
    }, {
        match: function(e) {
            return e.is("select")&&!h(e)?!0 : !1
        },
        apply: function(t, n) {
            var r, l, o, d;
            return n.selectAutoWidth && g(t, function() {
                d = t.width()
            }), r = c(t, n, {
                divClass: n.selectClass,
                spanHtml: (t.find(":selected:first") || t.find("option:first")).html(),
                spanWrap: "before"
            }), l = r.div, o = r.span, n.selectAutoWidth ? g(t, function() {
                y(e([o[0], l[0]]), {
                    display: "block"
                }, function() {
                    var e;
                    e = o.outerWidth() - o.width(), l.width(d + e), o.width(d)
                })
            }) : l.addClass("fixedWidth"), a(t, l, n), s(t, n, {
                change: function() {
                    o.html(t.find(":selected").html()), l.removeClass(n.activeClass)
                },
                "click touchend": function() {
                    var e = t.find(":selected").html();
                    o.html() !== e && t.trigger("change")
                },
                keyup: function() {
                    o.html(t.find(":selected").html())
                }
            }), w(o, n), {
                remove: function() {
                    return o.remove(), t.unwrap().unbind(n.eventNamespace), t
                }, update: function() {
                    n.selectAutoWidth ? (e.uniform.restore(t), t.uniform(n)) : (i(l, n), o.html(t.find(":selected").html()), u(l, t, n))
                }
            }
        }
    }, {
        match: function(e) {
            return e.is("select") && h(e)?!0 : !1
        },
        apply: function(e, t) {
            var n;
            return e.addClass(t.selectMultiClass), n = d(e, t), a(e, e, t), {
                remove: function() {
                    e.removeClass(t.selectMultiClass), n && e.unwrap()
                }, update: C
            }
        }
    }, {
        match: function(e) {
            return e.is("textarea")
        },
        apply: function(e, t) {
            var n;
            return e.addClass(t.textareaClass), n = d(e, t), a(e, e, t), {
                remove: function() {
                    e.removeClass(t.textareaClass), n && e.unwrap()
                }, update: C
            }
        }
    }
    ];
    m()&&!v() && (H=!1), e.uniform = {
        defaults: {
            activeClass: "active",
            autoHide: !0,
            buttonClass: "button",
            checkboxClass: "checker",
            checkedClass: "checked",
            disabledClass: "disabled",
            eventNamespace: ".uniform",
            fileButtonClass: "action",
            fileButtonHtml: "Charger un fichier",
            fileClass: "uploader",
            fileDefaultHtml: "Aucun fichier sélectionné",
            filenameClass: "filename",
            focusClass: "focus",
            hoverClass: "hover",
            idPrefix: "uniform",
            inputAddTypeAsClass: !0,
            inputClass: "uniform-input",
            radioClass: "radio",
            resetDefaultHtml: "Reset",
            resetSelector: !1,
            selectAutoWidth: !0,
            selectClass: "selector",
            selectMultiClass: "uniform-multiselect",
            submitDefaultHtml: "Submit",
            textareaClass: "uniform",
            useID: !0,
            wrapperClass: null
        },
        elements: []
    }, e.fn.uniform = function(t) {
        var n = this;
        return t = e.extend({}, e.uniform.defaults, t), x || (x=!0, f() && (H=!1)), H ? (t.resetSelector && e(t.resetSelector).mouseup(function() {
            window.setTimeout(function() {
                e.uniform.update(n)
            }, 10)
        }), this.each(function() {
            var n, s, a, i = e(this);
            if (i.data("uniformed"))return e.uniform.update(i), void 0;
            for (n = 0;
            A.length > n;
            n += 1)if (s = A[n], s.match(i, t))return a = s.apply(i, t), i.data("uniformed", a), e.uniform.elements.push(i.get(0)), void 0
        })) : this
    }, e.uniform.restore = e.fn.uniform.restore = function(n) {
        n === t && (n = e.uniform.elements), e(n).each(function() {
            var t, n, s = e(this);
            n = s.data("uniformed"), n && (n.remove(), t = e.inArray(this, e.uniform.elements), t >= 0 && e.uniform.elements.splice(t, 1), s.removeData("uniformed"))
        })
    }, e.uniform.update = e.fn.uniform.update = function(n) {
        n === t && (n = e.uniform.elements), e(n).each(function() {
            var t, n = e(this);
            t = n.data("uniformed"), t && t.update(n, t.options)
        })
    }
})(jQuery);