jQuery.cookie = function (a, c, d) {
    if (typeof c != "undefined") {
        d = d || {};
        if (c === null) {
            c = "";
            d.expires = -1
        }
        var b = "";
        if (d.expires && (typeof d.expires == "number" || d.expires.toUTCString)) {
            if (typeof d.expires == "number") {
                b = new Date;
                b.setTime(b.getTime() + d.expires * 24 * 60 * 60 * 1000)
            } else b = d.expires;
            b = "; expires=" + b.toUTCString()
        }
        var e = d.path ? "; path=" + d.path : "",
            f = d.domain ? "; domain=" + d.domain : "";
        d = d.secure ? "; secure" : "";
        document.cookie = [a, "=", encodeURIComponent(c), b, e, f, d].join("")
    } else {
        c = null;
        if (document.cookie && document.cookie != "") {
            d = document.cookie.split(";");
            for (b = 0; b < d.length; b++) {
                e = jQuery.trim(d[b]);
                if (e.substring(0, a.length + 1) == a + "=") {
                    c = decodeURIComponent(e.substring(a.length + 1));
                    break
                }
            }
        }
        return c
    }
};
(function (a) {
    a.fn.enhancedField = function (c) {
        a.extend({}, a.fn.enhancedField.defaults, c);
        return this.each(function () {
            var d = typeof this.onsearch == "object",
                b = a(this);
            d || b.addClass("notnative");
            b.bind("blur keyup", function () {
                a(this).val() == "" ? a(this).addClass("placeholder") : a(this).removeClass("placeholder")
            }).blur();
            b.focus(function () {
                a(this).removeClass("placeholder")
            })
        })
    };
    a.fn.enhancedField.defaults = {}
})(jQuery);
(function (a) {
    a.facebox = function (g, j) {
        a.facebox.loading();
        if (g.ajax) h(g.ajax, j);
        else if (g.image) i(g.image, j);
        else if (g.div) f(g.div, j);
        else a.isFunction(g) ? g.call(a) : a.facebox.reveal(g, j)
    };
    a.extend(a.facebox, {
        settings: {
            opacity: 0.2,
            overlay: true,
            loadingImage: "/facebox/loading.gif",
            closeImage: "/facebox/closelabel.png",
            imageTypes: ["png", "jpg", "jpeg", "gif"],
            faceboxHtml: '    <div id="facebox" style="display:none;">       <div class="popup">         <div class="content">         </div>         <a href="#" class="close"><img src="/facebox/closelabel.png" title="close" class="close_image" /></a>       </div>     </div>'
        },
        loading: function () {
            c();
            if (a("#facebox .loading").length == 1) return true;
            m();
            a("#facebox .content").empty();
            a("#facebox .content").append('<div class="loading"><img src="' + a.facebox.settings.loadingImage + '"/></div>');
            a("#facebox").css({
                top: d()[1] + b() / 10,
                left: a(window).width() / 2 - 205
            }).show();
            a(document).bind("keydown.facebox", function (g) {
                g.keyCode == 27 && a.facebox.close();
                return true
            });
            a(document).trigger("loading.facebox")
        },
        reveal: function (g, j) {
            a(document).trigger("beforeReveal.facebox");
            j && a("#facebox .content").addClass(j);
            a("#facebox .content").append(g);
            a("#facebox .loading").remove();
            a("#facebox .body").children().fadeIn("normal");
            a("#facebox").css("left", a(window).width() / 2 - a("#facebox .popup").width() / 2);
            a(document).trigger("reveal.facebox").trigger("afterReveal.facebox")
        },
        close: function () {
            a(document).trigger("close.facebox");
            return false
        }
    });
    a.fn.facebox = function (g) {
        if (a(this).length != 0) {
            function j() {
                a.facebox.loading(true);
                var l = this.rel.match(/facebox\[?\.(\w+)\]?/);
                if (l) l = l[1];
                f(this.href, l);
                return false
            }
            c(g);
            return this.bind("click.facebox", j)
        }
    };

    function c(g) {
        if (a.facebox.settings.inited) return true;
        else a.facebox.settings.inited = true;
        a(document).trigger("init.facebox");
        e();
        var j = a.facebox.settings.imageTypes.join("|");
        a.facebox.settings.imageTypesRegexp = new RegExp(".(" + j + ")$", "i");
        g && a.extend(a.facebox.settings, g);
        a("body").append(a.facebox.settings.faceboxHtml);
        var l = [new Image, new Image];
        l[0].src = a.facebox.settings.closeImage;
        l[1].src = a.facebox.settings.loadingImage;
        a("#facebox").find(".b:first, .bl").each(function () {
            l.push(new Image);
            l.slice(-1).src = a(this).css("background-image").replace(/url\((.+)\)/, "$1")
        });
        a("#facebox .close").click(a.facebox.close);
        a("#facebox .close_image").attr("src", a.facebox.settings.closeImage)
    }
    function d() {
        var g, j;
        if (self.pageYOffset) {
            j = self.pageYOffset;
            g = self.pageXOffset
        } else if (document.documentElement && document.documentElement.scrollTop) {
            j = document.documentElement.scrollTop;
            g = document.documentElement.scrollLeft
        } else if (document.body) {
            j = document.body.scrollTop;
            g = document.body.scrollLeft
        }
        return new Array(g, j)
    }
    function b() {
        var g;
        if (self.innerHeight) g = self.innerHeight;
        else if (document.documentElement && document.documentElement.clientHeight) g = document.documentElement.clientHeight;
        else if (document.body) g = document.body.clientHeight;
        return g
    }
    function e() {
        var g = a.facebox.settings;
        g.loadingImage = g.loading_image || g.loadingImage;
        g.closeImage = g.close_image || g.closeImage;
        g.imageTypes = g.image_types || g.imageTypes;
        g.faceboxHtml = g.facebox_html || g.faceboxHtml
    }
    function f(g, j) {
        if (g.match(/#/)) {
            var l = window.location.href.split("#")[0];
            g = g.replace(l, "");
            g != "#" && a.facebox.reveal(a(g).html(), j)
        } else g.match(a.facebox.settings.imageTypesRegexp) ? i(g, j) : h(g, j)
    }
    function i(g, j) {
        var l = new Image;
        l.onload = function () {
            a.facebox.reveal('<div class="image"><img src="' + l.src + '" /></div>', j)
        };
        l.src = g
    }
    function h(g, j) {
        a.get(g, function (l) {
            a.facebox.reveal(l, j)
        })
    }
    function k() {
        return a.facebox.settings.overlay == false || a.facebox.settings.opacity === null
    }
    function m() {
        if (!k()) {
            a("#facebox_overlay").length == 0 && a("body").append('<div id="facebox_overlay" class="facebox_hide"></div>');
            a("#facebox_overlay").hide().addClass("facebox_overlayBG").css("opacity", a.facebox.settings.opacity).click(function () {
                a(document).trigger("close.facebox")
            }).fadeIn(200);
            return false
        }
    }
    function n() {
        if (!k()) {
            a("#facebox_overlay").fadeOut(200, function () {
                a("#facebox_overlay").removeClass("facebox_overlayBG");
                a("#facebox_overlay").addClass("facebox_hide");
                a("#facebox_overlay").remove()
            });
            return false
        }
    }
    a(document).bind("close.facebox", function () {
        a(document).unbind("keydown.facebox");
        a("#facebox").fadeOut(function () {
            a("#facebox .content").removeClass().addClass("content");
            n();
            a("#facebox .loading").remove()
        })
    })
})(jQuery);
(function (a) {
    a.fn.ajaxSubmit = function (b) {
        if (typeof b == "function") b = {
            success: b
        };
        b = a.extend({
            url: this.attr("action") || window.location.toString(),
            type: this.attr("method") || "GET"
        }, b || {});
        var e = {};
        a.event.trigger("form.pre.serialize", [this, b, e]);
        if (e.veto) return this;
        var f = this.formToArray(b.semantic);
        if (b.data) for (var i in b.data) f.push({
            name: i,
            value: b.data[i]
        });
        if (b.beforeSubmit && b.beforeSubmit(f, this, b) === false) return this;
        a.event.trigger("form.submit.validate", [f, this, b, e]);
        if (e.veto) return this;
        e =
        a.param(f);
        if (b.type.toUpperCase() == "GET") {
            b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + e;
            b.data = null
        } else b.data = e;
        var h = this,
            k = [];
        b.resetForm && k.push(function () {
            h.resetForm()
        });
        b.clearForm && k.push(function () {
            h.clearForm()
        });
        if (!b.dataType && b.target) {
            var m = b.success ||
            function () {};
            k.push(function (g) {
                this.evalScripts ? a(b.target).attr("innerHTML", g).evalScripts().each(m, arguments) : a(b.target).html(g).each(m, arguments)
            })
        } else b.success && k.push(b.success);
        b.success = function (g, j) {
            for (var l = 0, t = k.length; l < t; l++) k[l](g, j, h)
        };
        e = a("input:file", this).fieldValue();
        f = false;
        for (i = 0; i < e.length; i++) if (e[i]) f = true;
        if (b.iframe || f) a.browser.safari && b.closeKeepAlive ? a.get(b.closeKeepAlive, n) : n();
        else a.ajax(b);
        a.event.trigger("form.submit.notify", [this, b]);
        return this;

        function n() {
            var g = h[0],
                j = a.extend({}, a.ajaxSettings, b),
                l = "jqFormIO" + a.fn.ajaxSubmit.counter++,
                t = a('<iframe id="' + l + '" name="' + l + '" />'),
                q = t[0],
                y = a.browser.opera && window.opera.version() < 9;
            if (a.browser.msie || y) q.src = 'javascript:false;document.write("");';
            t.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            });
            var p = {
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function () {},
                getResponseHeader: function () {},
                setRequestHeader: function () {}
            },
                u = j.global;
            u && !a.active++ && a.event.trigger("ajaxStart");
            u && a.event.trigger("ajaxSend", [p, j]);
            var z = 0,
                w = 0;
            setTimeout(function () {
                var s = g.encoding ? "encoding" : "enctype",
                    o = h.attr("target"),
                    r = h.attr("action");
                h.attr({
                    target: l,
                    method: "POST",
                    action: j.url
                });
                g[s] = "multipart/form-data";
                j.timeout && setTimeout(function () {
                    w =
                    true;
                    v()
                }, j.timeout);
                t.appendTo("body");
                q.attachEvent ? q.attachEvent("onload", v) : q.addEventListener("load", v, false);
                g.submit();
                h.attr({
                    action: r,
                    target: o
                })
            }, 10);

            function v() {
                if (!z++) {
                    q.detachEvent ? q.detachEvent("onload", v) : q.removeEventListener("load", v, false);
                    var s = true;
                    try {
                        if (w) throw "timeout";
                        var o, r;
                        r = q.contentWindow ? q.contentWindow.document : q.contentDocument ? q.contentDocument : q.document;
                        p.responseText = r.body ? r.body.innerHTML : null;
                        p.responseXML = r.XMLDocument ? r.XMLDocument : r;
                        if (j.dataType == "json" || j.dataType == "script") {
                            var x = r.getElementsByTagName("textarea")[0];
                            o = x ? x.value : p.responseText;
                            j.dataType == "json" ? eval("data = " + o) : a.globalEval(o)
                        } else if (j.dataType == "xml") {
                            o = p.responseXML;
                            if (!o && p.responseText != null) o = A(p.responseText)
                        } else o = p.responseText
                    } catch (B) {
                        s = false;
                        a.handleError(j, p, "error", B)
                    }
                    if (s) {
                        j.success(o, "success");
                        u && a.event.trigger("ajaxSuccess", [p, j])
                    }
                    u && a.event.trigger("ajaxComplete", [p, j]);
                    u && !--a.active && a.event.trigger("ajaxStop");
                    if (j.complete) j.complete(p, s ? "success" : "error");
                    setTimeout(function () {
                        t.remove();
                        p.responseXML = null
                    }, 100)
                }
            }
            function A(s, o) {
                if (window.ActiveXObject) {
                    o = new ActiveXObject("Microsoft.XMLDOM");
                    o.async = "false";
                    o.loadXML(s)
                } else o = (new DOMParser).parseFromString(s, "text/xml");
                return o && o.documentElement && o.documentElement.tagName != "parsererror" ? o : null
            }
        }
    };
    a.fn.ajaxSubmit.counter = 0;
    a.fn.ajaxForm = function (b) {
        return this.ajaxFormUnbind().submit(d).each(function () {
            this.formPluginId = a.fn.ajaxForm.counter++;
            a.fn.ajaxForm.optionHash[this.formPluginId] = b;
            a(":submit,input:image", this).click(c)
        })
    };
    a.fn.ajaxForm.counter = 1;
    a.fn.ajaxForm.optionHash = {};

    function c(b) {
        var e = this.form;
        e.clk = this;
        if (this.type == "image") if (b.offsetX != undefined) {
            e.clk_x = b.offsetX;
            e.clk_y = b.offsetY
        } else if (typeof a.fn.offset == "function") {
            var f = a(this).offset();
            e.clk_x = b.pageX - f.left;
            e.clk_y = b.pageY - f.top
        } else {
            e.clk_x = b.pageX - this.offsetLeft;
            e.clk_y = b.pageY - this.offsetTop
        }
        setTimeout(function () {
            e.clk = e.clk_x = e.clk_y = null
        }, 10)
    }
    function d() {
        var b = this.formPluginId;
        b = a.fn.ajaxForm.optionHash[b];
        a(this).ajaxSubmit(b);
        return false
    }
    a.fn.ajaxFormUnbind = function () {
        this.unbind("submit", d);
        return this.each(function () {
            a(":submit,input:image", this).unbind("click", c)
        })
    };
    a.fn.formToArray = function (b) {
        var e = [];
        if (this.length == 0) return e;
        var f = this[0],
            i = b ? f.getElementsByTagName("*") : f.elements;
        if (!i) return e;
        for (var h = 0, k = i.length; h < k; h++) {
            var m = i[h],
                n = m.name;
            if (n) if (b && f.clk && m.type == "image")!m.disabled && f.clk == m && e.push({
                name: n + ".x",
                value: f.clk_x
            }, {
                name: n + ".y",
                value: f.clk_y
            });
            else if ((m = a.fieldValue(m, true)) && m.constructor == Array) for (var g = 0, j = m.length; g < j; g++) e.push({
                name: n,
                value: m[g]
            });
            else m !== null && typeof m != "undefined" && e.push({
                name: n,
                value: m
            })
        }
        if (!b && f.clk) {
            b = f.getElementsByTagName("input");
            h = 0;
            for (k = b.length; h < k; h++) {
                i = b[h];
                (n = i.name) && !i.disabled && i.type == "image" && f.clk == i && e.push({
                    name: n + ".x",
                    value: f.clk_x
                }, {
                    name: n + ".y",
                    value: f.clk_y
                })
            }
        }
        return e
    };
    a.fn.formSerialize = function (b) {
        return a.param(this.formToArray(b))
    };
    a.fn.fieldSerialize = function (b) {
        var e = [];
        this.each(function () {
            var f = this.name;
            if (f) {
                var i = a.fieldValue(this, b);
                if (i && i.constructor == Array) for (var h = 0, k = i.length; h < k; h++) e.push({
                    name: f,
                    value: i[h]
                });
                else i !== null && typeof i != "undefined" && e.push({
                    name: this.name,
                    value: i
                })
            }
        });
        return a.param(e)
    };
    a.fn.fieldValue = function (b) {
        for (var e = [], f = 0, i = this.length; f < i; f++) {
            var h = this[f];
            h = a.fieldValue(h, b);
            h === null || typeof h == "undefined" || h.constructor == Array && !h.length || (h.constructor == Array ? a.merge(e, h) : e.push(h))
        }
        return e
    };
    a.fieldValue = function (b, e) {
        var f = b.name,
            i = b.type,
            h = b.tagName.toLowerCase();
        if (typeof e == "undefined") e = true;
        if (e && (!f || b.disabled || i == "reset" || i == "button" || (i == "checkbox" || i == "radio") && !b.checked || (i == "submit" || i == "image") && b.form && b.form.clk != b || h == "select" && b.selectedIndex == -1)) return null;
        if (h == "select") {
            h = b.selectedIndex;
            if (h < 0) return null;
            e = [];
            b = b.options;
            f = (i = i == "select-one") ? h + 1 : b.length;
            for (h = i ? h : 0; h < f; h++) {
                var k = b[h];
                if (k.selected) {
                    k = a.browser.msie && !k.attributes.value.specified ? k.text : k.value;
                    if (i) return k;
                    e.push(k)
                }
            }
            return e
        }
        return b.value
    };
    a.fn.clearForm = function () {
        return this.each(function () {
            a("input,select,textarea", this).clearFields()
        })
    };
    a.fn.clearFields = a.fn.clearInputs = function () {
        return this.each(function () {
            var b = this.type,
                e = this.tagName.toLowerCase();
            if (b == "text" || b == "password" || e == "textarea") this.value = "";
            else if (b == "checkbox" || b == "radio") this.checked = false;
            else if (e == "select") this.selectedIndex = -1
        })
    };
    a.fn.resetForm = function () {
        return this.each(function () {
            if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) this.reset()
        })
    };
    a.fn.enable = function (b) {
        if (b == undefined) b = true;
        return this.each(function () {
            this.disabled = !b
        })
    };
    a.fn.select = function (b) {
        if (b == undefined) b = true;
        return this.each(function () {
            var e = this.type;
            if (e == "checkbox" || e == "radio") this.checked = b;
            else if (this.tagName.toLowerCase() == "option") {
                e = a(this).parent("select");
                b && e[0] && e[0].type == "select-one" && e.find("option").select(false);
                this.selected = b
            }
        })
    }
})(jQuery);
(function (a) {
    a.fn.editableComment = function (c) {
        a.extend({}, a.fn.editableComment.defaults, c);
        return this.each(function () {
            var d = a(this),
                b = d.find(".formatted-content"),
                e = d.find(".form-content"),
                f = d.find(".context-loader"),
                i = e.find("form"),
                h = d.find(".error");
            if (!(e.length <= 0)) {
                var k = function () {
                    h.hide();
                    b.hide();
                    e.show()
                },
                    m = function () {
                        e.hide();
                        e.css("opacity", 1);
                        h.hide();
                        f.hide();
                        b.show()
                    };
                d.find(".edit-button").click(function () {
                    k();
                    return false
                });
                b.dblclick(function () {
                    k();
                    return false
                });
                // d.find(".delete-button").click(function () {
                //     if (confirm("Are you sure you want to delete this?")) {
                //         f.show();
                //         h.hide();
                //         a.del(i.attr("action"), {
                //             success: function () {
                //                 f.hide();
                //                 d.fadeOut()
                //             },
                //             error: function () {
                //                 f.hide();
                //                 h.show()
                //             }
                //         })
                //     }
                //     return false
                // });
                d.find(".cancel").click(function () {
                    m();
                    return false
                });
                // i.submit(function () {
                //     e.css("opacity", 0.5);
                //     f.show();
                //     h.hide();
                //     return false
                // });
                // i.ajaxForm({
                //     type: "PUT",
                //     dataType: "json",
                //     success: function (n) {
                //         n.title && d.find(".content-title").html(n.title);
                //         b.find(".content-body").html(n.body);
                //         m()
                //     },
                //     error: function () {
                //         f.hide();
                //         e.css("opacity", 1);
                //         h.show()
                //     }
                // })
            }
        })
    };
    a.fn.editableComment.defaults = {}
})(jQuery);
(function (a) {
    a.fn.previewableCommentForm = function (c) {
        var d = a.extend({}, a.fn.previewableCommentForm.defaults, c);
        return this.each(function () {
            var b = a(this),
                e = b.find("textarea"),
                f = b.find(".content-body"),
                i = b.prev(".comment-form-error"),
                h = b.find(".form-actions button"),
                k = e.val(),
                m = false,
                n = null;
            dirtyInputs = a.merge(b.find(".preview-dirty"), e);
            dirtyInputs.blur(function () {
                if (k != e.val()) {
                    m = true;
                    k = e.val()
                }
                g()
            });

            function g(j) {
                if (m || j) if (a.trim(k) == "") f.html("<p>Nothing to preview</p>");
                else {
                    f.html("<p>Loading preview&hellip;</p>");
                    n && n.abort();
                    j = a.extend({
                        text: k
                    }, d.previewOptions);
                    n = a.post(d.previewUrl, j, function (l) {
                        f.html(l);
                        d.onSuccess.call(f)
                    })
                }
            }
            g(true);
            b.closest("form").submit(function () {
                i.hide();
                if (a.trim(e.val()) == "") {
                    i.show();
                    return false
                }
                h.attr("disabled", "disabled")
            })
        })
    };
    a.fn.previewableCommentForm.defaults = {
        previewUrl: "/preview",
        previewOptions: {},
        onSuccess: function () {}
    }
})(jQuery);
(function (a) {
    a.hotkeys = function (c) {
        for (key in c) a.hotkey(key, c[key]);
        return this
    };
    a.hotkey = function (c, d) {
        c = a.hotkeys.special[c] == null ? c.charCodeAt(0) : a.hotkeys.special[c];
        a.hotkeys.cache[c] = d;
        return this
    };
    a.hotkeys.cache = {};
    a.hotkeys.special = {
        enter: 45,
        "?": 191,
        "/": 223,
        "\\": 252,
        "`": 224
    };
    if (a.browser.mozilla) a.hotkeys.special["?"] = 0
})(jQuery);
jQuery(document).ready(function (a) {
    a("a[hotkey]").each(function () {
        a.hotkey(a(this).attr("hotkey"), a(this).attr("href"))
    });
    a(document).bind("keydown.hotkey", function (c) {
        if (!a(c.target).is(":input")) {
            if (c.ctrlKey || c.altKey || c.metaKey) return true;
            c = c.shiftKey ? c.keyCode : c.keyCode + 32;
            if (c = a.hotkeys.cache[c]) {
                a.isFunction(c) ? c.call(this) : (window.location = c);
                return false
            }
        }
    })
});
(function (a) {
    a.keys = {
        escape: 27,
        tab: 9,
        space: 32,
        enter: 13,
        backspace: 8,
        scroll: 145,
        capslock: 20,
        numlock: 144,
        pause: 19,
        insert: 45,
        home: 36,
        del: 46,
        end: 35,
        pageup: 33,
        pagedown: 34,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        "-": 109,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        "/": 191
    }
})(jQuery);
(function (a) {
    a.fn.relatizeDate = function () {
        return a(this).each(function () {
            a(this).hasClass("relatized") || a(this).text(a.relatizeDate(this)).addClass("relatized")
        })
    };
    a.relatizeDate = function (c) {
        c = a(c).text();
        var d = new Date(c);
        if (isNaN(d)) {
            d = /(\d\d:\d\d:\d\d [+-]\d{4}) (\d{4})$/;
            d = new Date(c.replace(d, "$2 $1"));
            if (isNaN(d)) return c
        }
        return a.relatizeDate.timeAgoInWords(d)
    };
    $r = a.relatizeDate;
    a.extend(a.relatizeDate, {
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        strftime: function (c, d) {
            var b = c.getDay(),
                e = c.getMonth(),
                f = c.getHours(),
                i = c.getMinutes();

            function h(k) {
                k = k.toString(10);
                return (new Array(2 - k.length + 1)).join("0") + k
            }
            return d.replace(/\%([aAbBcdHImMpSwyY])/g, function (k) {
                switch (k.substr(1, 1)) {
                case "a":
                    return $r.shortDays[b];
                case "A":
                    return $r.days[b];
                case "b":
                    return $r.shortMonths[e];
                case "B":
                    return $r.months[e];
                case "c":
                    return c.toString();
                case "d":
                    return h(c.getDate());
                case "H":
                    return h(f);
                case "I":
                    return h((f + 12) % 12);
                case "m":
                    return h(e + 1);
                case "M":
                    return h(i);
                case "p":
                    return f > 12 ? "PM" : "AM";
                case "S":
                    return h(c.getSeconds());
                case "w":
                    return b;
                case "y":
                    return h(c.getFullYear() % 100);
                case "Y":
                    return c.getFullYear().toString()
                }
            })
        },
        timeAgoInWords: function (c, d) {
            return $r.distanceOfTimeInWords(c, new Date, d)
        },
        distanceOfTimeInWords: function (c, d, b) {
            d = parseInt((d.getTime() - c.getTime()) / 1000);
            if (d < 60) return "just now";
            else if (d < 120) return "about a minute ago";
            else if (d < 2700) return parseInt(d / 60).toString() + " minutes ago";
            else if (d < 7200) return "about an hour ago";
            else if (d < 86400) return "about " + parseInt(d / 3600).toString() + " hours ago";
            else if (d < 172800) return "1 day ago";
            else {
                d = parseInt(d / 86400).toString();
                if (d > 5) {
                    d = "%B %d, %Y";
                    if (b) d += " %I:%M %p";
                    return $r.strftime(c, d)
                } else return d + " days ago"
            }
        }
    })
})(jQuery);
(function (a) {
    a.put = function (c, d, b, e) {
        var f = null;
        if (jQuery.isFunction(d)) {
            b = d;
            d = {}
        }
        if (jQuery.isPlainObject(b)) {
            f = b.error;
            b = b.success
        }
        return jQuery.ajax({
            type: "PUT",
            url: c,
            data: d,
            success: b,
            error: f,
            dataType: e
        })
    };
    a.del = function (c, d, b, e) {
        var f = null;
        if (jQuery.isFunction(d)) {
            b = d;
            d = {}
        }
        if (jQuery.isPlainObject(b)) {
            f = b.error;
            b = b.success
        }
        return jQuery.ajax({
            type: "DELETE",
            url: c,
            data: d,
            success: b,
            error: f,
            dataType: e
        })
    }
})(jQuery);
jQuery.fn.tabs = function () {
    function a(d) {
        return /#([a-z][\w.:-]*)$/i.exec(d)[1]
    }
    var c = window.location.hash.substr(1);
    return this.each(function () {
        var d = null,
            b = null;
        $(this).find("li a").each(function () {
            var e = $("#" + a(this.href));
            if (e != []) {
                e.hide();
                $(this).click(function () {
                    var f = $(this);

                    function i() {
                        b && b.hide();
                        d && d.removeClass("selected");
                        b = e.show();
                        d = f.addClass("selected")
                    }
                    if (f.attr("ajax")) {
                        f.addClass("loading");
                        $.ajax({
                            url: f.attr("ajax"),
                            success: function (h) {
                                e.html(h);
                                f.removeClass("loading");
                                f[0].removeAttribute("ajax");
                                i()
                            },
                            failure: function () {
                                alert("An error occured, please reload the page")
                            }
                        })
                    } else i();
                    return false
                });
                $(this).hasClass("selected") && $(this).click()
            }
        });
        $(this).find("li a[href='#" + c + "']").click();
        b == null && $($(this).find("li a")[0]).click()
    })
};
$(function () {
    var a = false,
        c = false,
        d = false;

    function b() {
        if (!d) if (a && c) {
            d = true;
            $(document.body).addClass("usingMouse")
        }
    }
    $(document).mousemove(function () {
        a = true;
        b()
    });
    $(document).mousedown(function () {
        c = true;
        b()
    });
    $("button.classy, a.button.classy").mousedown(function () {
        $(this).addClass("mousedown")
    }).bind("mouseup mouseleave", function () {
        $(this).removeClass("mousedown")
    })
});
$.extend($.facebox.settings, {
    loadingImage: "/images/modules/facebox/loading.gif",
    closeImage: "/images/modules/facebox/closelabel.png",
    faceboxHtml: '    <div id="facebox" style="display:none;">       <div class="popup">         <div class="content">         </div>         <a href="#" class="close"><img src="/images/modules/facebox/closelabel.png" title="close" class="close_image" /></a>       </div>     </div>'
});
Date._isoRegexp = /(\d{4,})(?:-(\d{1,2})(?:-(\d{1,2})(?:[T ](\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d+))?)?(?:(Z)|([+-])(\d{1,2})(?::(\d{1,2}))?)?)?)?)?/;
Date.parseISO8601 = function (a) {
    a += "";
    if (typeof a != "string" || a.length === 0) return null;
    a = a.match(Date._isoRegexp);
    if (typeof a == "undefined" || a === null) return null;
    var c, d, b, e, f, i, h;
    c = parseInt(a[1], 10);
    if (typeof a[2] == "undefined" || a[2] === "") return new Date(c);
    d = parseInt(a[2], 10) - 1;
    b = parseInt(a[3], 10);
    if (typeof a[4] == "undefined" || a[4] === "") return new Date(c, d, b);
    e = parseInt(a[4], 10);
    f = parseInt(a[5], 10);
    i = typeof a[6] != "undefined" && a[6] !== "" ? parseInt(a[6], 10) : 0;
    h = typeof a[7] != "undefined" && a[7] !== "" ? Math.round(1000 * parseFloat("0." + a[7])) : 0;
    if ((typeof a[8] == "undefined" || a[8] === "") && (typeof a[9] == "undefined" || a[9] === "")) return new Date(c, d, b, e, f, i, h);
    var k;
    if (typeof a[9] != "undefined" && a[9] !== "") {
        k = parseInt(a[10], 10) * 3600000;
        if (typeof a[11] != "undefined" && a[11] !== "") k += parseInt(a[11], 10) * 60000;
        if (a[9] == "-") k = -k
    } else k = 0;
    return new Date(Date.UTC(c, d, b, e, f, i, h) - k)
};
$(function () {
    var a = $(".github-jobs-promotion");
    if (a.get(0) != null) {
        a.css({
            visibility: "hidden"
        });
        window.jobsWidgetCallback = function (c) {
            var d = Math.floor(Math.random() * c.jobs.length);
            c = c.jobs[d];
            a.find(".job-link").attr("href", c.url);
            a.find(".job-company").text(c.company);
            a.find(".job-position").text(c.position);
            a.find(".job-location").text(c.location);
            a.css({
                visibility: "visible"
            })
        };
        $.getScript(a.attr("url"))
    }
});
$(function () {
    var a = $.cookie("tracker"),
        c = null;
    if (a == null) c = document.referrer ? document.referrer : "direct";
    a = getParams();
    if (a.utm_campaign && $.trim(a.utm_campaign) != "") c = a.utm_campaign;
    if (a.referral_code && $.trim(a.referral_code) != "") c = a.referral_code;
    c != null && $.cookie("tracker", c, {
        expires: 7,
        path: "/"
    })
});

function getParams(a, c) {
    if (arguments.length < 2) c = location.href;
    if (arguments.length > 0 && a != "") {
        var d = a == "#" ? /[#]([^$]*)/ : a == "?" ? /[?]([^#$]*)/ : new RegExp("[?&]" + a + "=([^&#]*)"),
            b = d.exec(c);
        return b == null ? "" : b[1]
    } else {
        c = c.split("?");
        b = {};
        if (c.length > 1) {
            c = c[1].split("#");
            if (c.length > 1) b.hash = c[1];
            $.each(c[0].split("&"), function (e, f) {
                f = f.split("=");
                b[f[0]] = f[1]
            })
        }
        return b
    }
};