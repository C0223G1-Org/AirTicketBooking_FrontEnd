(function (t) {
    function e(e) {
        for (var s, r, a = e[0], c = e[1], l = e[2], d = 0, h = []; d < a.length; d++) r = a[d], Object.prototype.hasOwnProperty.call(i, r) && i[r] && h.push(i[r][0]), i[r] = 0;
        for (s in c) Object.prototype.hasOwnProperty.call(c, s) && (t[s] = c[s]);
        u && u(e);
        while (h.length) h.shift()();
        return o.push.apply(o, l || []), n()
    }

    function n() {
        for (var t, e = 0; e < o.length; e++) {
            for (var n = o[e], s = !0, a = 1; a < n.length; a++) {
                var c = n[a];
                0 !== i[c] && (s = !1)
            }
            s && (o.splice(e--, 1), t = r(r.s = n[0]))
        }
        return t
    }

    var s = {}, i = {app: 0}, o = [];

    function r(e) {
        if (s[e]) return s[e].exports;
        var n = s[e] = {i: e, l: !1, exports: {}};
        return t[e].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }

    r.m = t, r.c = s, r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
    }, r.r = function (t) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, r.t = function (t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" === typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var s in t) r.d(n, s, function (e) {
            return t[e]
        }.bind(null, s));
        return n
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t["default"]
        } : function () {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "/v36/src/";
    var a = window["webpackJsonp"] = window["webpackJsonp"] || [], c = a.push.bind(a);
    a.push = e, a = a.slice();
    for (var l = 0; l < a.length; l++) e(a[l]);
    var u = c;
    o.push([0, "chunk-vendors"]), n()
})({
    0: function (t, e, n) {
        t.exports = n("56d7")
    }, "005c": function (t, e, n) {
        "use strict";
        var s = n("61d4"), i = n.n(s);
        i.a
    }, "0178": function (t, e, n) {
        "use strict";
        var s = n("71ad"), i = n.n(s);
        i.a
    }, "034f": function (t, e, n) {
        "use strict";
        var s = n("1356"), i = n.n(s);
        i.a
    }, "0780": function (t, e, n) {
    }, "0c0b": function (t, e, n) {
        "use strict";
        var s = n("80e0"), i = n.n(s);
        i.a
    }, 1356: function (t, e, n) {
    }, "37ba": function (t, e, n) {
        "use strict";
        var s = n("be79"), i = n.n(s);
        i.a
    }, "39f7": function (t, e, n) {
        "use strict";
        var s = n("6e69"), i = n.n(s);
        i.a
    }, 4274: function (t, e, n) {
    }, "434f": function (t, e, n) {
    }, "487d": function (t, e, n) {
        "use strict";
        var s = n("93b4"), i = n.n(s);
        i.a
    }, "56d7": function (t, e, n) {
        "use strict";
        n.r(e);
        n("cadf"), n("551c"), n("f751"), n("097d");
        var s, i, o = n("2b0e"), r = function () {
                var t = this, e = t.$createElement, n = t._self._c || e;
                return n("v-app", {staticStyle: {width: "100%"}}, [n("router-view"), t.display_required_form ? n("div", {staticClass: "dl-required-form"}, [n("img", {
                    staticClass: "bot-icon",
                    attrs: {src: t.styles.customerLogo, alt: "logo"}
                }), n("div", {
                    staticStyle: {
                        color: "#8d8b91",
                        "margin-bottom": "15px"
                    }
                }, [t._v(t._s(t.styles.customerWelcomeText))]), t.styles.prefixEnable ? ["radio" === t.styles.prefixType ? n("div", [n("v-radio-group", {
                    staticClass: "ma-0 pa-0",
                    attrs: {row: ""},
                    model: {
                        value: t.prefix, callback: function (e) {
                            t.prefix = e
                        }, expression: "prefix"
                    }
                }, t._l(t.styles.prefixOptions, (function (t, e) {
                    return n("v-radio", {key: e, attrs: {label: t, value: t}})
                })), 1)], 1) : n("div", [n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.prefix,
                        expression: "prefix"
                    }],
                    staticClass: "input-name",
                    attrs: {type: "text", placeholder: t.styles.prefixPlaceholder, maxlength: "24"},
                    domProps: {value: t.prefix},
                    on: {
                        input: function (e) {
                            e.target.composing || (t.prefix = e.target.value)
                        }
                    }
                })])] : t._e(), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.username,
                        expression: "username"
                    }],
                    ref: "txt_required_name",
                    staticClass: "input-name",
                    attrs: {placeholder: t.styles.customerWelcomePlaceholder, autocomplete: "off", maxlength: "255"},
                    domProps: {value: t.username},
                    on: {
                        keypress: function (e) {
                            return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.enter_users_name(e)
                        }, input: function (e) {
                            e.target.composing || (t.username = e.target.value)
                        }
                    }
                }), t.extra_infomarion && t.extra_infomarion.length > 0 ? n("div", {staticClass: "extra-information"}, t._l(t.extra_infomarion, (function (e, s) {
                    return n("div", {key: s}, ["dropdown" === e.type ? n("select", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.value,
                            expression: "info.value"
                        }],
                        ref: "txt_" + e.variable,
                        refInFor: !0,
                        staticClass: "input-extra-info",
                        attrs: {placeholder: e.label, required: e.required},
                        on: {
                            change: function (n) {
                                var s = Array.prototype.filter.call(n.target.options, (function (t) {
                                    return t.selected
                                })).map((function (t) {
                                    var e = "_value" in t ? t._value : t.value;
                                    return e
                                }));
                                t.$set(e, "value", n.target.multiple ? s : s[0])
                            }
                        }
                    }, t._l(e.options, (function (e) {
                        return n("option", {
                            attrs: {disabled: e.disabled},
                            domProps: {value: e.value}
                        }, [t._v("\n                " + t._s(e.text) + "\n              ")])
                    })), 0) : "checkbox" === e.type ? n("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.value,
                            expression: "info.value"
                        }],
                        ref: "txt_" + e.variable,
                        refInFor: !0,
                        staticClass: "input-extra-info",
                        attrs: {
                            placeholder: e.label,
                            autocomplete: "off",
                            maxlength: "100",
                            required: e.required,
                            pattern: e.pattern,
                            title: e.title,
                            type: "checkbox"
                        },
                        domProps: {checked: Array.isArray(e.value) ? t._i(e.value, null) > -1 : e.value},
                        on: {
                            blur: function (n) {
                                return t.validate_data(e)
                            }, change: function (n) {
                                var s = e.value, i = n.target, o = !!i.checked;
                                if (Array.isArray(s)) {
                                    var r = null, a = t._i(s, r);
                                    i.checked ? a < 0 && t.$set(e, "value", s.concat([r])) : a > -1 && t.$set(e, "value", s.slice(0, a).concat(s.slice(a + 1)))
                                } else t.$set(e, "value", o)
                            }
                        }
                    }) : "radio" === e.type ? n("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.value,
                            expression: "info.value"
                        }],
                        ref: "txt_" + e.variable,
                        refInFor: !0,
                        staticClass: "input-extra-info",
                        attrs: {
                            placeholder: e.label,
                            autocomplete: "off",
                            maxlength: "100",
                            required: e.required,
                            pattern: e.pattern,
                            title: e.title,
                            type: "radio"
                        },
                        domProps: {checked: t._q(e.value, null)},
                        on: {
                            blur: function (n) {
                                return t.validate_data(e)
                            }, change: function (n) {
                                return t.$set(e, "value", null)
                            }
                        }
                    }) : n("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.value,
                            expression: "info.value"
                        }],
                        ref: "txt_" + e.variable,
                        refInFor: !0,
                        staticClass: "input-extra-info",
                        attrs: {
                            placeholder: e.label,
                            autocomplete: "off",
                            maxlength: "100",
                            required: e.required,
                            pattern: e.pattern,
                            title: e.title,
                            type: e.type
                        },
                        domProps: {value: e.value},
                        on: {
                            blur: function (n) {
                                return t.validate_data(e)
                            }, input: function (n) {
                                n.target.composing || t.$set(e, "value", n.target.value)
                            }
                        }
                    })])
                })), 0) : t._e(), n("div", {
                    staticClass: "btn-start",
                    style: {background: t.styles.primaryColor, color: t.styles.primaryTextColor},
                    on: {click: t.enter_users_name}
                }, [t._v("\n            " + t._s(t.styles.customerButtonText) + "\n        ")]), n("div", {
                    staticClass: "item-fpt",
                    on: {click: t.gotoFpt}
                }, [t._v("\n            Powered by FPT.AI\n        ")])], 2) : t._e(), n("v-dialog", {
                    attrs: {
                        persistent: "",
                        "max-width": "390"
                    }, model: {
                        value: t.display_reconnect_form, callback: function (e) {
                            t.display_reconnect_form = e
                        }, expression: "display_reconnect_form"
                    }
                }, [n("v-card", [n("v-card-text", {staticClass: "pa-1"}, [n("v-btn", {
                    staticStyle: {width: "100%"},
                    attrs: {color: "primary", text: ""},
                    on: {click: t.reconnectSocket}
                }, [t._v("Reconnect")])], 1)], 1)], 1), n("v-dialog", {
                    attrs: {persistent: "", "max-width": "390"},
                    model: {
                        value: t.display_connecting_form, callback: function (e) {
                            t.display_connecting_form = e
                        }, expression: "display_connecting_form"
                    }
                }, [n("v-card", [n("v-card-text", {staticClass: "pa-1 dl-connecting"}, [n("span", [t._v("CONNECTING")]), n("div", {staticClass: "lds-facebook"}, [n("div"), n("div"), n("div")])])], 1)], 1), n("v-dialog", {
                    attrs: {
                        id: "dl_display_webview",
                        persistent: "",
                        "max-width": "600"
                    }, model: {
                        value: t.display_webview, callback: function (e) {
                            t.display_webview = e
                        }, expression: "display_webview"
                    }
                }, [n("v-card", {
                    staticStyle: {
                        width: "100%",
                        height: "100%",
                        overflow: "hidden"
                    }
                }, [n("v-toolbar", {
                    staticStyle: {height: "35px"},
                    attrs: {dark: "", color: "primary"}
                }, [n("v-toolbar-title", [t._v(t._s(t.webview_header))]), n("v-spacer"), n("v-btn", {
                    attrs: {
                        icon: "",
                        dark: "",
                        small: ""
                    }, on: {
                        click: function (e) {
                            t.display_webview = !1
                        }
                    }
                }, [n("v-icon", [t._v("mdi-close")])], 1)], 1), n("iframe", {
                    ref: "ifr_display_webview",
                    staticStyle: {width: "100%", height: "calc(100% - 35px)", border: "0"},
                    attrs: {id: "ifr_display_webview", name: t.ifrm_webview_name, src: t.webview_url}
                })], 1)], 1), n("a", {
                    attrs: {
                        id: "ctr_link",
                        href: "#",
                        target: "_blank",
                        hidden: ""
                    }
                }), n("a", {
                    attrs: {
                        id: "ctr_phone",
                        href: "#",
                        hidden: "",
                        target: "_blank"
                    }
                }), n("input", {attrs: {id: "ctr_upload_file", hidden: "", type: "file", name: "upload_file"}})], 1)
            }, a = [], c = (n("8e6e"), n("ac6a"), n("456d"), n("bd86")), l = (n("96cf"), n("3b8d")),
            u = (n("7f7f"), n("3b2b"), n("a481"), n("1157")), d = n.n(u), h = n("75fc"), p = n("2f62");
        o["a"].use(p["a"]);
        var f = {SET_LIGHT_BOX_DATA_THEN_SHOW: "SET_LIGHT_BOX_DATA_THEN_SHOW", SET_CUSTOM_STYLES: "SET_CUSTOM_STYLES"};
        o["a"].prototype.$ActionTypes = f;
        var m = new p["a"].Store({
            state: {
                scClient: null,
                scSubscribeChannel: null,
                clientId: "",
                clientName: "",
                clientToken: "",
                botCode: "",
                subChannel: "",
                componentsMainChatBox: null,
                componentsMainApp: null,
                bot_icon: "",
                styles: {
                    headerBackground: "linear-gradient(86.7deg, #3353a2ff 0.85%, #31b7b7ff 98.94%)",
                    headerTextColor: "#ffffffff",
                    headerLogoEnable: !1,
                    headerLogoLink: "img/Icon-fpt-ai.png",
                    headerText: "Há»— trá»£ trá»±c tuyáº¿n",
                    primaryColor: "#6d9ccbff",
                    secondaryColor: "#ecececff",
                    primaryTextColor: "#ffffffff",
                    secondaryTextColor: "#000000DE",
                    buttonColor: "#b4b4b4",
                    buttonColorHover: null,
                    buttonOpacityHover: .7,
                    buttonTextColor: "#ffffffff",
                    buttonTextColorHover: null,
                    buttonAlign: "center",
                    buttonWeight: "normal",
                    bodyBackgroundEnable: !1,
                    bodyBackgroundLink: "",
                    avatarBot: "img/bot.png",
                    sendMessagePlaceholder: "Nháº­p tin nháº¯n",
                    customerLogo: "img/bot.png",
                    customerWelcomeText: "Vui lÃ²ng nháº­p tÃªn cá»§a báº¡n",
                    customerWelcomePlaceholder: "",
                    customerButtonText: "Báº¯t Ä‘áº§u",
                    prefixEnable: !1,
                    prefixType: "radio",
                    prefixOptions: ["Anh", "Chá»‹"],
                    prefixPlaceholder: "Danh xÆ°ng",
                    quickReplyButtonAlign: "center",
                    quickReplyButtonColor: "#b4b4b4",
                    quickReplyButtonBorderColor: "#FF5F5F",
                    quickReplyButtonColorHover: "#b4b4b4",
                    quickReplyButtonBorderColorHover: "#D63838"
                },
                lightBoxData: [],
                lightBoxIndex: null,
                customSender: !1,
                startPayload: "",
                suggestionList: [],
                isChatWithBot: !1
            }, mutations: (s = {}, Object(c["a"])(s, f.SET_LIGHT_BOX_DATA_THEN_SHOW, (function (t, e) {
                e.data && e.data.length > 0 ? (t.lightBoxData = Object(h["a"])(e.data), t.lightBoxIndex = e.index || 0 === e.index ? e.index : null) : (t.lightBoxData = [], t.lightBoxIndex = null)
            })), Object(c["a"])(s, f.SET_CUSTOM_STYLES, (function (t, e) {
                t.styles = e
            })), s), actions: (i = {}, Object(c["a"])(i, f.SET_LIGHT_BOX_DATA_THEN_SHOW, (function (t, e) {
                t.commit(f.SET_LIGHT_BOX_DATA_THEN_SHOW, e)
            })), Object(c["a"])(i, f.SET_CUSTOM_STYLES, (function (t, e) {
                t.commit(f.SET_CUSTOM_STYLES, e)
            })), i)
        }), g = (n("28a5"), n("6b54"), n("bc3a")), _ = n.n(g);

        function b(t) {
            if (t) {
                var e = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return e.test(t)
            }
        }

        function v(t) {
            return String(t).replace(/&(?!(nbsp;))/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }

        var y = {
            get_chat_logs: function () {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(e, n, s) {
                    var i, o, r, a, c, l, u = arguments;
                    return regeneratorRuntime.wrap((function (t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                return i = u.length > 3 && void 0 !== u[3] ? u[3] : "", o = [], r = "https://chatapi.fpt.ai/backend/api/v1/", a = "bot/" + s + "/get-chatlog/" + encodeURI(e) + "/", c = r + ("" === i ? a : i.replace("/backend/api/v1/", "")), l = {headers: {Authorization: "Bearer " + n}}, t.next = 8, _.a.get(c, l).then((function (t) {
                                    o = t.data
                                })).catch((function (t) {
                                    console.log(t.response)
                                }));
                            case 8:
                                return t.abrupt("return", o);
                            case 9:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })));

                function e(e, n, s) {
                    return t.apply(this, arguments)
                }

                return e
            }(), get_suggestion_list: function () {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(e, n, s) {
                    var i, o, r, a, c, l, u = arguments;
                    return regeneratorRuntime.wrap((function (t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                return i = u.length > 3 && void 0 !== u[3] ? u[3] : "", o = [], r = "https://chatapi.fpt.ai/backend/api/v1/", a = "bot/" + s + "/" + encodeURI(e) + "/get-list-suggestion/", c = r + ("" === i ? a : i.replace("/backend/api/v1/", "")), l = {headers: {Authorization: "Bearer " + n}}, t.next = 8, _.a.get(c, l).then((function (t) {
                                    o = t.data
                                })).catch((function (t) {
                                    console.log(t.response)
                                }));
                            case 8:
                                return t.abrupt("return", o);
                            case 9:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })));

                function e(e, n, s) {
                    return t.apply(this, arguments)
                }

                return e
            }(), is_chat_with_bot: function () {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(e, n, s) {
                    var i, o, r, a, c, l, u = arguments;
                    return regeneratorRuntime.wrap((function (t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                return i = u.length > 3 && void 0 !== u[3] ? u[3] : "", o = !1, r = "https://chatapi.fpt.ai/backend/api/v1/", a = "bot/" + s + "/" + encodeURI(e) + "/is-chat-with-bot/", c = r + ("" === i ? a : i.replace("/backend/api/v1/", "")), l = {headers: {Authorization: "Bearer " + n}}, t.next = 8, _.a.get(c, l).then((function (t) {
                                    o = t.data
                                })).catch((function (t) {
                                    console.log(t.response)
                                }));
                            case 8:
                                return t.abrupt("return", o);
                            case 9:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })));

                function e(e, n, s) {
                    return t.apply(this, arguments)
                }

                return e
            }(), get_persistent_menus: function () {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(e) {
                    var n, s;
                    return regeneratorRuntime.wrap((function (t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                return n = null, s = "https://chatapi.fpt.ai/backend/api/v1/bot/" + e + "/get-persistent-menu/", t.next = 4, _.a.get(s).then((function (t) {
                                    n = t.data
                                })).catch((function (t) {
                                    console.log(t.response)
                                }));
                            case 4:
                                return t.abrupt("return", n);
                            case 5:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })));

                function e(e) {
                    return t.apply(this, arguments)
                }

                return e
            }(), guid: function () {
                return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4()
            }, s4: function () {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }, clickOpenLink: function (t) {
                d()("#ctr_link")[0].href = t, d()("#ctr_link")[0].click()
            }, clickCallPhone: function (t) {
                d()("#ctr_phone")[0].href = "tel:" + t, d()("#ctr_phone")[0].click()
            }, linkify: function (t) {
                var e = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi;
                return t.replace(e, (function (t) {
                    return '<a href="' + t + '" target="blank" class="white--text">' + t + "</a>"
                }))
            }, urlify: function (t) {
                if (t = v(t), b(t)) {
                    var e = /(https?:\/\/[^\s]+)/g;
                    return t.replace(e, (function (t) {
                        return '<a rel="noopener" style="position: relative; display: block; width: 100%; word-break: break-all;" target="_blank" href="' + t + '">' + t + "</a>"
                    }))
                }
                return t
            }, getClientInfo: function (t) {
                return JSON.parse(localStorage.getItem("fptai_livechat_client_" + t))
            }, b64EncodeUnicode: function (t) {
                return btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, (function (t, e) {
                    return String.fromCharCode("0x" + e)
                })))
            }, b64DecodeUnicode: function (t) {
                return decodeURIComponent(atob(t).split("").map((function (t) {
                    return "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2)
                })).join(""))
            }
        }, x = {
            send_start_message: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = "";
                try {
                    n = m.state.styles.customerButtonText
                } catch (i) {
                }
                var s = {
                    channel: "livechat",
                    sub_channel: t,
                    sender_id: m.state.clientId,
                    sender_name: m.state.clientName,
                    bot_code: m.state.botCode,
                    message: {type: "payload", content: "get_started#" + e + "#" + (n || "Báº¯t Ä‘áº§u")}
                };
                m.state.scClient.emit("user_send_message", s)
            }, send_message_to_socket: function (t, e, n) {
                var s = {
                    channel: "livechat",
                    sub_channel: n,
                    sender_id: m.state.clientId,
                    sender_name: m.state.clientName,
                    bot_code: m.state.botCode,
                    message: {type: t, content: e}
                };
                m.state.scClient.emit("user_send_message", s)
            }, upload_file_to_server: function () {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(e, n, s, i, o) {
                    var r, a, c, l, u;
                    return regeneratorRuntime.wrap((function (t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                return r = "livechat", a = !1, c = new FormData, c.append("attachment", o), l = "https://chatapi.fpt.ai/backend/api/v1/bot/" + e + "/user-upload-file-from-sc/c/" + r + "/s/" + n + "/f/" + i + "/", u = {headers: {Authorization: "Bearer " + s}}, t.next = 8, _.a.post(l, c, u).then((function (t) {
                                    a = !0
                                })).catch((function (t) {
                                    console.log(t.response)
                                }));
                            case 8:
                                return t.abrupt("return", a);
                            case 9:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })));

                function e(e, n, s, i, o) {
                    return t.apply(this, arguments)
                }

                return e
            }(), send_react: function () {
                var t = Object(l["a"])(regeneratorRuntime.mark((function t(e, n, s, i, o) {
                    var r, a, c;
                    return regeneratorRuntime.wrap((function (t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                return r = "https://chatapi.fpt.ai/backend/api/v1/bot/" + e + "/user-react-message/" + n + "/", a = {
                                    sender_id: n,
                                    message_id: i,
                                    react: o
                                }, c = {headers: {Authorization: "Bearer " + s}}, t.next = 5, _.a.post(r, a, c).then((function (t) {
                                })).catch((function (t) {
                                }));
                            case 5:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                })));

                function e(e, n, s, i, o) {
                    return t.apply(this, arguments)
                }

                return e
            }()
        };

        function C(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var s = Object.getOwnPropertySymbols(t);
                e && (s = s.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), n.push.apply(n, s)
            }
            return n
        }

        function k(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? C(n, !0).forEach((function (e) {
                    Object(c["a"])(t, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : C(n).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return t
        }

        var w = n("7812"), O = n("6821f"), S = {
                name: "App", components: {}, mounted: function () {
                    this.getCustomUI(), this.fptaiEndpoint = this.getUrlParam("scendpoint") || "livechat.fpt.ai:443", this.botCode = this.getUrlParam("botcode"), this.$store.state.botCode = this.botCode;
                    var t = this.getUrlParam("clear_session");
                    t && "1" === t && localStorage.removeItem("fptai_livechat_client_" + this.botCode);
                    var e = {name: "", id: "", token: ""};
                    this.$store.state.componentsMainApp = this, this.$store.state.bot_icon = this.getUrlParam("iconbot");
                    var n = this.getUrlParam("sendername"), s = this.getUrlParam("subchannel");
                    s && "" !== s && (this.$store.state.subChannel = s);
                    try {
                        var i = this.getUrlParam("extra_info");
                        this.extra_infomarion = i ? JSON.parse(i) : []
                    } catch (u) {
                    }
                    if (this.use_client_sender_info = !1, this.getUrlParam("use_client_sender_info") && "1" == this.getUrlParam("use_client_sender_info")) {
                        this.use_client_sender_info = !0, e.name = n, e.id = this.getUrlParam("sender_id"), e.token = this.getUrlParam("sender_token");
                        var o = {id: e.id};
                        localStorage.setItem("fptai_livechat_client_customer_" + this.botCode, JSON.stringify(o)), this.$store.state.customSender = !0;
                        for (var r = {set_attributes: {}}, a = 0; a < this.extra_infomarion.length; a++) this.extra_infomarion[a].variable && (r.set_attributes[this.extra_infomarion[a].variable] = this.extra_infomarion[a].value);
                        this.data_payload = y.b64EncodeUnicode(JSON.stringify(r)), this.$store.state.startPayload = this.data_payload, this.connectSocket(e), setTimeout((function () {
                            d()("#txt_input_message")[0].focus()
                        }), 500)
                    }
                    if (!this.use_client_sender_info) if (localStorage.getItem("fptai_livechat_client_" + this.botCode)) e = JSON.parse(localStorage.getItem("fptai_livechat_client_" + this.botCode)), this.connectSocket(e, !1, !0), setTimeout((function () {
                        d()("#txt_input_message")[0].focus()
                    }), 500); else if (n && "" !== n.trim()) {
                        var c = {name: n.trim(), id: O(y.guid() + this.botCode), token: ""};
                        localStorage.setItem("fptai_livechat_client_" + this.botCode, JSON.stringify(c)), this.display_required_form = !1, this.display_connecting_form = !0, this.connectSocket(c, !0, !0), setTimeout((function () {
                            d()("#txt_input_message")[0].focus()
                        }), 500)
                    } else if (this.anomyous_sender = !1, this.getUrlParam("anomyous_sender") && "1" == this.getUrlParam("anomyous_sender")) {
                        this.anomyous_sender = !0;
                        var l = {name: "Guest " + (new Date).getTime(), id: O(y.guid() + this.botCode), token: ""};
                        localStorage.setItem("fptai_livechat_client_" + this.botCode, JSON.stringify(l)), this.display_required_form = !1, this.display_connecting_form = !0, this.connectSocket(l, !0, !0), setTimeout((function () {
                            d()("#txt_input_message")[0].focus()
                        }), 500)
                    } else this.display_required_form = !0, this.display_connecting_form = !1, setTimeout(function () {
                        this.$refs.txt_required_name.focus()
                    }.bind(this), 500)
                }, data: function () {
                    return {
                        display_required_form: !1,
                        fptaiEndpoint: "",
                        botCode: "",
                        username: "",
                        prefix: "",
                        display_reconnect_form: !1,
                        display_connecting_form: !0,
                        display_webview: !1,
                        webview_header: "",
                        webview_url: "",
                        ifrm_webview_name: Date.now(),
                        extra_infomarion: [],
                        data_payload: "",
                        use_client_sender_info: !1,
                        anomyous_sender: !1
                    }
                }, methods: {
                    getUrlParam: function (t, e) {
                        e || (e = location.href), t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                        var n = "[\\?&]" + t + "=([^&#]*)", s = new RegExp(n), i = s.exec(e);
                        return null == i ? null : decodeURIComponent(i[1])
                    }, getCustomUI: function () {
                        var t = this.$store.state.styles, e = this.getUrlParam("styles");
                        if (e) {
                            for (var n in e = JSON.parse(e), t) e[n] && (t[n] = e[n]);
                            if (e.css) {
                                var s = document.createElement("style");
                                s.innerHTML = e.css, document.head.appendChild(s)
                            }
                        }
                        this.$store.dispatch(this.$ActionTypes.SET_CUSTOM_STYLES, JSON.parse(JSON.stringify(t)))
                    }, reconnectSocket: function () {
                        this.$router.go(0)
                    }, connectSocket: function (t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                            n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        if (this.$store.state.clientId = t.id, this.$store.state.clientName = t.name, this.$store.state.clientToken = t.token, !this.$store.state.scClient) {
                            var s = !0, i = {host: this.fptaiEndpoint, secure: s, path: "/ws/"};
                            this.$store.state.scClient = w.connect(i)
                        }
                        var o = {
                            sender_id: t.id,
                            token: t.token,
                            sender_name: t.name,
                            bot_code: this.botCode,
                            sub_channel: this.$store.state.subChannel
                        }, r = this;
                        this.$store.state.scClient.emit("sender_request_authenticate", o, function () {
                            var s = Object(l["a"])(regeneratorRuntime.mark((function s(i, o) {
                                var a, c, l;
                                return regeneratorRuntime.wrap((function (s) {
                                    while (1) switch (s.prev = s.next) {
                                        case 0:
                                            i ? "TimeoutError" === i["name"] || "BadConnectionError" === i["name"] ? r.connectSocket(t, e, n) : (a = {
                                                name: t.name,
                                                id: O(y.guid() + r.botCode),
                                                token: ""
                                            }, localStorage.setItem("fptai_livechat_client_" + r.botCode, JSON.stringify(a)), n && r.connectSocket(a, !0, !1)) : (c = {
                                                name: t.name,
                                                id: t.id,
                                                token: o.sender_token
                                            }, r.use_client_sender_info ? localStorage.setItem("fptai_livechat_client_customer_" + r.botCode, JSON.stringify({id: t.id})) : localStorage.setItem("fptai_livechat_client_" + r.botCode, JSON.stringify(c)), r.$store.state.clientToken = c.token, l = O(t.id + "." + r.botCode) + "@" + r.botCode + "/livechat", r.$store.state.scClient.on("error", (function (t) {
                                                throw"Socket error - " + t
                                            })), r.$store.state.scClient.on("disconnect", (function () {
                                                r.display_reconnect_form = !0
                                            })), r.$store.state.scSubscribeChannel = r.$store.state.scClient.subscribe(l), r.display_connecting_form = !1, r.$nextTick((function () {
                                                r.$store.state.scSubscribeChannel.watch((function (t) {
                                                    r.$store.state.componentsMainChatBox.handler_messages(t)
                                                }))
                                            })), e && x.send_start_message(r.$store.state.subChannel, r.data_payload), setTimeout((function () {
                                                d()("#txt_input_message")[0].focus()
                                            }), 500));
                                        case 1:
                                        case"end":
                                            return s.stop()
                                    }
                                }), s)
                            })));
                            return function (t, e) {
                                return s.apply(this, arguments)
                            }
                        }());
                        var a, c = this.getUrlParam("themes");
                        if (c && "" !== c) switch (c) {
                            case"red":
                                a = document.createElement("link"), a.id = "import_link_linkThemes_fpt_ai", a.rel = "stylesheet", a.href = "static/style-red.css", d()("head").append(a);
                                break;
                            case"blue":
                                a = document.createElement("link"), a.id = "import_link_linkThemes_fpt_ai", a.rel = "stylesheet", a.href = "static/style-blue.css", d()("head").append(a);
                                break;
                            default:
                                a = document.createElement("link"), a.id = "import_link_linkThemes_fpt_ai", a.rel = "stylesheet", a.href = "static/style-" + c + ".css", d()("head").append(a);
                                break
                        }
                    }, enter_users_name: function () {
                        var t = this.username.trim();
                        if ("" === t) return this.$refs.txt_required_name.focus(), !1;
                        this.styles.prefixEnable && (t = this.prefix.trim() + " " + t);
                        var e = {name: t, id: O(y.guid() + this.botCode), token: ""};
                        if (this.extra_infomarion && this.extra_infomarion.length > 0) {
                            for (var n = !0, s = {set_attributes: {}}, i = 0; i < this.extra_infomarion.length; i++) {
                                if (this.extra_infomarion[i].pattern && "" != this.extra_infomarion[i].pattern) {
                                    var o = new RegExp(this.extra_infomarion[i].pattern);
                                    if (!o.test(this.extra_infomarion[i].value)) {
                                        var r = "txt_" + this.extra_infomarion[i].variable;
                                        this.$refs[r][0].focus(), n = !1;
                                        break
                                    }
                                }
                                if (!this.extra_infomarion[i].value && this.extra_infomarion[i].required) {
                                    var a = "txt_" + this.extra_infomarion[i].variable;
                                    this.$refs[a][0].focus(), n = !1;
                                    break
                                }
                                this.extra_infomarion[i].variable && (s.set_attributes[this.extra_infomarion[i].variable] = this.extra_infomarion[i].value)
                            }
                            if (!n) return !1;
                            this.data_payload = y.b64EncodeUnicode(JSON.stringify(s))
                        }
                        localStorage.setItem("fptai_livechat_client_" + this.botCode, JSON.stringify(e)), this.display_required_form = !1, this.display_connecting_form = !0, this.connectSocket(e, !0, !0)
                    }, open_webview: function (t, e) {
                        var n = this;
                        this.display_webview = !0, this.$refs.ifr_display_webview && this.$refs.ifr_display_webview.contentWindow.location.replace(""), this.$nextTick((function () {
                            n.$refs.ifr_display_webview.parentNode.parentNode.parentNode.id = "dl_display_webview", n.$refs.ifr_display_webview.contentWindow.location.replace(e)
                        }))
                    }, close_webview: function () {
                        this.display_webview = !1
                    }, gotoFpt: function () {
                        window.open("https://fpt.ai/chatbot", "_blank")
                    }, validate_data: function (t) {
                        "number" === t.type && (t.value = t.value.replaceAll(/[^1234567890]/gi, ""))
                    }
                }, computed: k({}, Object(p["b"])(["styles"]), {
                    baseUrl: function () {
                        return "/v36/src/"
                    }
                })
            }, T = S, M = (n("034f"), n("487d"), n("2877")), B = n("6544"), I = n.n(B), $ = n("7496"), U = n("8336"),
            j = n("b0af"), L = n("99d9"), P = n("169a"), R = n("132d"), E = n("67b6"), H = n("43a6"), F = n("2fa4"),
            A = n("71d9"), N = n("2a7f"), D = Object(M["a"])(T, r, a, !1, null, "d27151e0", null), V = D.exports;
        I()(D, {
            VApp: $["a"],
            VBtn: U["a"],
            VCard: j["a"],
            VCardText: L["b"],
            VDialog: P["a"],
            VIcon: R["a"],
            VRadio: E["a"],
            VRadioGroup: H["a"],
            VSpacer: F["a"],
            VToolbar: A["a"],
            VToolbarTitle: N["a"]
        });
        var q = n("8c4f"), W = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("MainChatBox")
        }, J = [], z = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {
                staticClass: "main-chat-box",
                style: t.bodyStyle
            }, [n("div", {staticClass: "history-log-chat"}, [t.displayLoadingChatlogs ? n("div", {staticStyle: {"text-align": "center"}}, [n("v-progress-circular", {
                attrs: {
                    size: 20,
                    width: 2,
                    color: "green",
                    indeterminate: ""
                }
            })], 1) : t._e(), t._l(t.listMsg, (function (e) {
                return n("div", {
                    key: "msg_index_" + e.id,
                    staticClass: "clearfix"
                }, ["text" === e.type || "payload" === e.type ? n("ChatTextBox", {
                    attrs: {
                        isFirstMsg: e.isFirstMsg,
                        isLastMsg: e.isLastMsg,
                        isUserSend: "user" === e.source,
                        content: e.content,
                        msgId: e.id,
                        msgReact: e.react_icon
                    }
                }) : t._e(), "image" === e.type || "zalo_list_template" === e.type && !0 === e.content.cross_channel ? n("ChatImageBox", {
                    attrs: {
                        isFirstMsg: e.isFirstMsg,
                        isLastMsg: e.isLastMsg,
                        isUserSend: "user" === e.source,
                        content: e.content,
                        msgId: e.id,
                        msgReact: e.react_icon
                    }
                }) : t._e(), "quick_reply" === e.type || "rating" === e.type ? n("ChatQuickReplyBox", {
                    attrs: {
                        isFirstMsg: e.isFirstMsg,
                        isLastMsg: e.isLastMsg,
                        content: e.content,
                        msgId: e.id,
                        msgReact: e.react_icon
                    }
                }) : t._e(), "carousel" === e.type ? n("ChatCarouselBox", {
                    attrs: {
                        content: e.content,
                        boxindex: e.id
                    }
                }) : t._e(), "uploading" === e.type ? n("ChatUploadingBox", {
                    attrs: {
                        file_name: e.content.file_name,
                        status: e.content.status
                    }
                }) : t._e(), "file" === e.type ? n("ChatFileBox", {
                    attrs: {
                        isFirstMsg: e.isFirstMsg,
                        isLastMsg: e.isLastMsg,
                        isUserSend: "user" === e.source,
                        content: e.content,
                        msgId: e.id,
                        msgReact: e.react_icon
                    }
                }) : t._e()], 1)
            }))], 2), n("ControlChat", {ref: "control_chat"}), n("CoolLightBox", {
                attrs: {
                    items: t.lightBoxData,
                    index: t.lightBoxIndex
                }, on: {
                    close: function (e) {
                        return t.hideLightBox()
                    }
                }
            })], 1)
        }, G = [], X = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {staticClass: "control-chat"}, [n("PersistentMenu"), t.disable_upload_file ? t._e() : n("div", {
                staticClass: "ma-0",
                staticStyle: {width: "30px"},
                attrs: {id: "box-upload-file"}
            }, [n("v-file-input", {
                ref: "fileInput",
                attrs: {
                    accept: ".jpg,.jpeg,.png,.gif,.xls,.xlsx,.doc,.docs,.pdf,.ppt,.pptx",
                    label: "Upload File",
                    solo: "",
                    depressed: ""
                },
                on: {click: t.fileInputClick, change: t.uploadFileClick},
                model: {
                    value: t.uploadFileContent, callback: function (e) {
                        t.uploadFileContent = e
                    }, expression: "uploadFileContent"
                }
            }), n("v-btn", {
                staticClass: "upload-btn",
                attrs: {icon: "", color: t.styles ? t.styles.primaryColor : "#6d9ccbff"},
                on: {
                    click: function (e) {
                        return t.$refs.fileInput.$refs.input.click()
                    }
                }
            }, [n("v-icon", [t._v("mdi-paperclip")])], 1)], 1), n("div", {staticClass: "chat-text-field"}, [n("div", {staticClass: "chat-text-field_container"}, [n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: t.text_content,
                    expression: "text_content"
                }],
                attrs: {
                    id: "txt_input_message",
                    type: "text",
                    placeholder: t.styles.sendMessagePlaceholder,
                    name: "new-password",
                    autocomplete: "off",
                    maxlength: "2000"
                },
                domProps: {value: t.text_content},
                on: {
                    keypress: function (e) {
                        return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.sendMsg(e)
                    }, change: t.check_suggest, input: function (e) {
                        e.target.composing || (t.text_content = e.target.value)
                    }
                }
            }), n("v-btn", {
                staticClass: "ml-1 btn-send",
                attrs: {icon: "", small: "", color: t.styles ? t.styles.primaryColor : "#6d9ccbff"},
                on: {click: t.sendMsg}
            }, [n("v-icon", [t._v("mdi-telegram")])], 1)], 1)]), t.displayFileUpload ? n("div", {
                staticClass: "box-file-upload",
                attrs: {title: t.fileName}
            }, [n("v-btn", {
                staticClass: "ma-0 pa-0",
                attrs: {icon: "", small: "", depressed: ""},
                on: {click: t.deleteFileUpload}
            }, [n("v-icon", [t._v("mdi-window-close")])], 1), n("span", [t._v(t._s(t.fileName))])], 1) : t._e(), t.can_suggest() ? n("div", {staticClass: "box-suggest"}, t._l(t.list_display_suggest, (function (e, s) {
                return n("span", {
                    key: s,
                    domProps: {innerHTML: t._s(t.hightlight_keyword(e, t.text_content))},
                    on: {
                        click: function (n) {
                            return t.fill_suggest(e)
                        }
                    }
                })
            })), 0) : t._e(), n("v-snackbar", {
                attrs: {bottom: "", left: "", timeout: 25e4, color: "error"},
                model: {
                    value: t.snk_chat, callback: function (e) {
                        t.snk_chat = e
                    }, expression: "snk_chat"
                }
            }, [t._v("\n        " + t._s(t.snk_message) + "\n        "), n("v-btn", {
                attrs: {
                    dark: "",
                    text: "",
                    icon: ""
                }, on: {
                    click: function (e) {
                        t.snk_chat = !1
                    }
                }
            }, [n("v-icon", [t._v("mdi-close")])], 1)], 1)], 1)
        }, Y = [], Q = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {staticClass: "persistent-menu"}, [n("v-menu", {
                attrs: {
                    "nudge-width": 200,
                    top: "",
                    "offset-y": "",
                    "close-on-content-click": !1
                }, scopedSlots: t._u([{
                    key: "activator", fn: function (e) {
                        var s = e.on;
                        return [n("v-btn", t._g({
                            attrs: {icon: ""},
                            on: {click: t.openMenu}
                        }, s), [n("v-icon", {attrs: {color: t.styles.primaryColor}}, [t._v("menu")])], 1)]
                    }
                }]), model: {
                    value: t.menu, callback: function (e) {
                        t.menu = e
                    }, expression: "menu"
                }
            }, [n("v-card", [n("v-list", {staticClass: "pa-0"}, [n("v-list-item", {on: {click: t.back_to_main_menu}}, [n("div", {staticStyle: {height: "48px"}}), n("v-list-item-title", {staticClass: "subtitle-2 font-weight-bold grey--text"}, [t.inSubMenu ? n("v-icon", [t._v("mdi-arrow-left-circle")]) : t._e(), t._v("\n                        " + t._s(t.subMenuTitle) + "\n                    ")], 1)], 1)], 1), n("v-divider"), n("v-list", {
                staticClass: "pa-0",
                attrs: {dense: ""}
            }, t._l(t.items, (function (e) {
                return n("v-list-item", {
                    key: e.id, on: {
                        click: function (n) {
                            return t.click_menu_item(e)
                        }
                    }
                }, [n("div", {staticStyle: {height: "48px"}}), n("v-list-item-title", {staticStyle: {"max-width": "100%"}}, [t._v(t._s(e.title))]), "submenu" === e.type ? n("v-icon", [t._v("mdi-arrow-right-circle")]) : t._e()], 1)
            })), 1), n("v-card-actions", [n("span", {staticClass: "sp-ves"}, [t._v(t._s(t.version_fpt_ai_lc))]), n("div", {staticClass: "flex-grow-1"}), n("a", {
                staticClass: "fpt-bot-url",
                attrs: {target: "_blank", href: "https://fpt.ai/chatbot", rel: "nofollow"}
            }, [n("span", {staticClass: "caption font-italic"}, [t._v("Powered by FPT.AI")])])])], 1)], 1)], 1)
        }, Z = [];

        function K(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var s = Object.getOwnPropertySymbols(t);
                e && (s = s.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), n.push.apply(n, s)
            }
            return n
        }

        function tt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? K(n, !0).forEach((function (e) {
                    Object(c["a"])(t, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : K(n).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return t
        }

        var et = {
                name: "persistent-menu", data: function () {
                    return {
                        persistent_menus: [{
                            type: "payload",
                            title: "Äáº·t lá»‹ch",
                            content: "Äáº·t bÃ n",
                            titleHeader: "ThÃªm menu",
                            id: "level-11"
                        }, {
                            type: "submenu",
                            title: "Menu",
                            content: [{
                                type: "payload",
                                title: "Khai vá»‹",
                                content: "MÃ³n khai vá»‹",
                                titleHeader: "ThÃªm menu",
                                id: "level-12-0"
                            }, {
                                type: "payload",
                                title: "MÃ³n chÃ­nh",
                                content: "MÃ³n Äƒn chÃ­nh",
                                titleHeader: "ThÃªm menu",
                                id: "level-12-1"
                            }, {
                                type: "payload",
                                title: "TrÃ¡ng miá»‡ng",
                                content: "MÃ³n trÃ¡ng miá»‡ng",
                                titleHeader: "ThÃªm menu",
                                id: "level-12-2"
                            }],
                            titleHeader: "ThÃªm menu",
                            id: "level-12"
                        }], items: [], menu: !1, inSubMenu: !1, subMenuTitle: "Menu", version_fpt_ai_lc: ""
                    }
                }, mounted: function () {
                    var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                        var e = this;
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    this.$nextTick(Object(l["a"])(regeneratorRuntime.mark((function t() {
                                        return regeneratorRuntime.wrap((function (t) {
                                            while (1) switch (t.prev = t.next) {
                                                case 0:
                                                    return t.next = 2, e.load_persistent_menus();
                                                case 2:
                                                    e.items = e.persistent_menus, e.version_fpt_ai_lc = "v3.6.0";
                                                case 4:
                                                case"end":
                                                    return t.stop()
                                            }
                                        }), t)
                                    }))));
                                case 1:
                                case"end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));

                    function e() {
                        return t.apply(this, arguments)
                    }

                    return e
                }(), computed: tt({}, Object(p["b"])(["styles"])), methods: {
                    btn_msg_click: function (t) {
                        if (t.payload && "" !== t.payload) {
                            var e = t.payload;
                            e.indexOf("#") >= 0 ? e += "#" + t.title : e += "##" + t.title, x.send_message_to_socket("payload", e, this.$store.state.subChannel)
                        } else t.url && "" !== t.url ? y.clickOpenLink(t.url) : t.phone_call && "" !== t.phone_call && y.clickCallPhone(t.phone_call)
                    }, click_menu_item: function (t) {
                        if ("web_url" === t.type) y.clickOpenLink(t.content); else if ("payload" === t.type) {
                            var e = t.content;
                            e.indexOf("#") >= 0 ? e += "#" + t.title : e += "##" + t.title, x.send_message_to_socket("payload", e, this.$store.state.subChannel), this.menu = !1
                        } else "submenu" === t.type && (this.menu = !1, setTimeout(function () {
                            this.inSubMenu = !0, this.subMenuTitle = t.title, this.items = t.content, this.menu = !0
                        }.bind(this), 100))
                    }, openMenu: function () {
                        var t = this;
                        this.inSubMenu && (this.menu = !1, this.$nextTick((function () {
                            t.inSubMenu = !1, t.subMenuTitle = "Menu", t.items = t.persistent_menus, t.menu = !0
                        })))
                    }, back_to_main_menu: function () {
                        this.inSubMenu && (this.menu = !1, setTimeout(function () {
                            this.inSubMenu = !1, this.subMenuTitle = "Menu", this.items = this.persistent_menus, this.menu = !0
                        }.bind(this), 100))
                    }, load_persistent_menus: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, y.get_persistent_menus(this.$store.state.botCode);
                                    case 2:
                                        e = t.sent, e && (this.persistent_menus = e);
                                    case 4:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }

                        return e
                    }()
                }
            }, nt = et, st = (n("5d53"), n("ce7e6")), it = n("8860"), ot = n("da13"), rt = n("5d23"), at = n("e449"),
            ct = Object(M["a"])(nt, Q, Z, !1, null, "3591538a", null), lt = ct.exports;
        I()(ct, {
            VBtn: U["a"],
            VCard: j["a"],
            VCardActions: L["a"],
            VDivider: st["a"],
            VIcon: R["a"],
            VList: it["a"],
            VListItem: ot["a"],
            VListItemTitle: rt["a"],
            VMenu: at["a"]
        });
        n("f28c");

        function ut(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var s = Object.getOwnPropertySymbols(t);
                e && (s = s.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), n.push.apply(n, s)
            }
            return n
        }

        function dt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? ut(n, !0).forEach((function (e) {
                    Object(c["a"])(t, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ut(n).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return t
        }

        var ht = {
                name: "ControlChat", components: {PersistentMenu: lt}, data: function () {
                    return {
                        text_content: "",
                        uploadFileContent: null,
                        displayFileUpload: !1,
                        fileName: "",
                        acceptFiles: ["jpg", "jpeg", "png", "gif", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "pdf"],
                        snk_chat: !1,
                        snk_message: "",
                        disable_upload_file: !1,
                        allow_show_suggestion: !1,
                        show_suggest: !1,
                        click_suggest: !1,
                        is_chat_with_bot: !1,
                        list_display_suggest: [],
                        list_suggest: []
                    }
                }, mounted: function () {
                    this.getUrlParam("disable_upload_file") && "1" == this.getUrlParam("disable_upload_file") && (this.disable_upload_file = !0)
                }, computed: dt({}, Object(p["b"])(["styles"])), watch: {
                    text_content: function () {
                        this.check_suggest()
                    }
                }, methods: {
                    hightlight_keyword: function (t, e) {
                        var n = this.removeChar(t).indexOf(this.removeChar(e)), s = n + e.length, i = "";
                        return i = t.slice(0, s) + "</span>" + t.slice(s), i = i.slice(0, n) + "<span>" + i.slice(n), i
                    }, fill_suggest: function (t) {
                        this.click_suggest = !0, this.text_content = t
                    }, check_suggest: function () {
                        var t = this;
                        if (this.check_suggest && this.can_suggest) {
                            if (this.click_suggest) return this.show_suggest = !1, this.list_display_suggest = [], void (this.click_suggest = !1);
                            this.list_display_suggest = [], "" === this.text_content ? (this.show_suggest = !1, this.list_display_suggest = []) : this.list_suggest.forEach((function (e) {
                                t.removeChar(e).indexOf(t.removeChar(t.text_content)) >= 0 && t.list_display_suggest.length < 4 && t.list_display_suggest.push(e)
                            })), this.list_display_suggest.length > 0 ? this.show_suggest = !0 : this.show_suggest = !1
                        }
                    }, removeChar: function (t) {
                        return t = t.toLowerCase(), t = t.replace(/Ã |Ã¡|áº¡|áº£|Ã£|Ã¢|áº§|áº¥|áº­|áº©|áº«|Äƒ|áº±|áº¯|áº·|áº³|áºµ/g, "a"), t = t.replace(/Ã¨|Ã©|áº¹|áº»|áº½|Ãª|á»|áº¿|á»‡|á»ƒ|á»…/g, "e"), t = t.replace(/Ã¬|Ã­|á»‹|á»‰|Ä©/g, "i"), t = t.replace(/Ã²|Ã³|á»|á»|Ãµ|Ã´|á»“|á»‘|á»™|á»•|á»—|Æ¡|á»|á»›|á»£|á»Ÿ|á»¡/g, "o"), t = t.replace(/Ã¹|Ãº|á»¥|á»§|Å©|Æ°|á»«|á»©|á»±|á»­|á»¯/g, "u"), t = t.replace(/á»³|Ã½|á»µ|á»·|á»¹/g, "y"), t = t.replace(/Ä‘/g, "d"), t
                    }, getUrlParam: function (t, e) {
                        e || (e = location.href), t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                        var n = "[\\?&]" + t + "=([^&#]*)", s = new RegExp(n), i = s.exec(e);
                        return null == i ? null : decodeURIComponent(i[1])
                    }, sendMsg: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        "" !== this.text_content && (x.send_message_to_socket("text", this.text_content, this.$store.state.subChannel), this.text_content = "");
                                    case 1:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }

                        return e
                    }(), fileInputClick: function () {
                        this.$refs.fileInput.$refs.input.value = ""
                    }, uploadFileClick: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, s;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (!this.uploadFileContent) {
                                            t.next = 21;
                                            break
                                        }
                                        if (!(this.acceptFiles.indexOf(this.get_file_extention(this.uploadFileContent.name)) < 0)) {
                                            t.next = 7;
                                            break
                                        }
                                        return this.uploadFileContent = null, this.fileName = "", this.snk_message = "File type is not accept!", this.snk_chat = !0, t.abrupt("return", !1);
                                    case 7:
                                        if (!(this.uploadFileContent.size > 10485760)) {
                                            t.next = 13;
                                            break
                                        }
                                        return this.uploadFileContent = null, this.fileName = "", this.snk_message = "File size is over 10Mb!", this.snk_chat = !0, t.abrupt("return", !1);
                                    case 13:
                                        return this.fileName = this.uploadFileContent.name, e = y.guid(), n = {
                                            _id: e,
                                            type: "uploading",
                                            source: 1,
                                            content: {file_name: this.fileName, status: "uploading"},
                                            created_time: (new Date).toGMTString()
                                        }, this.$parent.handler_messages(n), t.next = 19, x.upload_file_to_server(this.$store.state.botCode, this.$store.state.clientId, this.$store.state.clientToken, e, this.uploadFileContent);
                                    case 19:
                                        s = t.sent, s ? this.$parent.handler_message_uploading(e, 0) : this.$parent.handler_message_uploading(e, 1);
                                    case 21:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }

                        return e
                    }(), deleteFileUpload: function () {
                        this.uploadFileContent = null, this.fileName = ""
                    }, check_file_is_image: function (t) {
                        return t.indexOf("image/") >= 0
                    }, get_file_extention: function (t) {
                        var e = t.toLowerCase().split(".");
                        return e.length > 1 ? e[e.length - 1] : "undefine"
                    }, can_suggest: function () {
                        return !(!this.show_suggest || !this.$store.state.isChatWithBot)
                    }
                }
            }, pt = ht, ft = (n("005c"), n("c91d"), n("23a7")), mt = n("2db4"),
            gt = Object(M["a"])(pt, X, Y, !1, null, "ebd31ed8", null), _t = gt.exports;
        I()(gt, {VBtn: U["a"], VFileInput: ft["a"], VIcon: R["a"], VSnackbar: mt["a"]});
        var bt = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {class: t.boxMsgStyle}, [t.isUserSend ? t._e() : n("div", {
                ref: "icon_bot",
                staticClass: "bot-icon"
            }, [n("img", {
                staticStyle: {"max-width": "24px", "max-height": "24px"},
                attrs: {src: t.styles.avatarBot, alt: "robot"}
            })]), 0 === t.msgButton.length ? n("div", {
                class: t.msgContentStyle,
                style: t.customUI
            }, [n("span", {domProps: {innerHTML: t._s(t.replaceLinkInTextContent(t.msgContent))}}), t.isUserSend ? t._e() : n("buttonReact", {
                attrs: {
                    message_id: t.msgId,
                    user_act: t.msgReact
                }
            })], 1) : n("v-container", {
                staticClass: "text-box-button pa-0 ma-0",
                attrs: {fluid: ""}
            }, [n("v-row", {attrs: {"no-gutters": ""}}, [t.isUserSend ? n("v-spacer") : t._e(), n("v-col", {
                attrs: {
                    sm: "6",
                    md: "5",
                    lg: "4",
                    xl: "4"
                }
            }, [n("div", {staticClass: "image-box-content"}, ["" !== t.msgContent ? n("div", {
                staticClass: "img-message-content",
                style: t.customUI,
                domProps: {innerHTML: t._s(t.replaceLinkInTextContent(t.msgContent))}
            }) : t._e(), t.msgButton.length > 0 ? n("div", {staticClass: "img-button-display"}, [t.isUserSend ? t._e() : n("buttonReact", {
                attrs: {
                    message_id: t.msgId,
                    user_act: t.msgReact
                }
            }), t._l(t.msgButton, (function (e, s) {
                return n("button", {
                    key: s,
                    style: [t.buttonCustomUI, t.buttonHovered === e ? t.buttonCustomUIHover : {}],
                    on: {
                        mouseover: function (n) {
                            return t.changeButtonHovered(e)
                        }, mouseleave: function (e) {
                            return t.changeButtonHovered(-1)
                        }, click: function (n) {
                            return t.btn_msg_click(e)
                        }
                    }
                }, [t._v("\n                            " + t._s(e.title) + "\n                        ")])
            }))], 2) : t._e()])])], 1)], 1)], 1)
        }, vt = [], yt = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {staticClass: "d-react"}, [t.display_act ? t._e() : n("button", {
                ref: "react-button-" + t.id,
                class: t.class_act,
                on: {click: t.open_act}
            }, ["" === t.act ? n("v-icon", {attrs: {size: "15"}}, [t._v("sentiment_satisfied_alt")]) : t._e(), "ðŸ‘" === t.act ? n("span", {staticClass: "s-icon"}, [t._v("ðŸ‘")]) : t._e(), "ðŸ‘Ž" === t.act ? n("span", {staticClass: "s-icon"}, [t._v("ðŸ‘Ž")]) : t._e()], 1), t.display_act ? n("div", {
                directives: [{
                    name: "closable",
                    rawName: "v-closable",
                    value: {exclude: [t.id], handler: "closeAct"},
                    expression: "{ exclude: [id], handler: 'closeAct'}"
                }], staticClass: "d-select-react", class: {animeshow: t.display_act}
            }, [n("v-btn", {
                staticClass: "btn-react-like",
                attrs: {icon: "", small: "", color: "blue"},
                on: {
                    click: function (e) {
                        return t.react("ðŸ‘")
                    }
                }
            }, [n("span", {staticClass: "s-icon"}, [t._v("ðŸ‘")])]), n("v-btn", {
                staticClass: "btn-react-dislike",
                attrs: {icon: "", small: "", color: "red"},
                on: {
                    click: function (e) {
                        return t.react("ðŸ‘Ž")
                    }
                }
            }, [n("span", {staticClass: "s-icon"}, [t._v("ðŸ‘Ž")])])], 1) : t._e()])
        }, xt = [], Ct = (n("34ef"), {
            name: "react-button", props: {message_id: "", user_act: ""}, data: function () {
                return {id: this.uuidv4(), display_act: !1, act: "", class_act: "btn-react"}
            }, mounted: function () {
                "" !== this.user_act && (this.act = this.user_act, this.class_act = "btn-react-ed")
            }, methods: {
                open_act: function () {
                    this.display_act = !0
                }, react: function () {
                    var t = Object(l["a"])(regeneratorRuntime.mark((function t(e) {
                        return regeneratorRuntime.wrap((function (t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    return this.act === e ? (this.act = "", this.class_act = "btn-react") : (this.act = e, this.class_act = "btn-react-ed"), this.display_act = !1, t.next = 4, x.send_react(this.$store.state.botCode, this.$store.state.clientId, this.$store.state.clientToken, this.message_id, this.act);
                                case 4:
                                case"end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));

                    function e(e) {
                        return t.apply(this, arguments)
                    }

                    return e
                }(), closeAct: function () {
                    "" !== this.act ? this.class_act = "btn-react-ed" : this.class_act = "btn-react", this.display_act = !1
                }, uuidv4: function () {
                    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (function (t) {
                        return (t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16)
                    }))
                }
            }
        }), kt = Ct, wt = (n("c375"), Object(M["a"])(kt, yt, xt, !1, null, "385c866a", null)), Ot = wt.exports;

        function St(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var s = Object.getOwnPropertySymbols(t);
                e && (s = s.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), n.push.apply(n, s)
            }
            return n
        }

        function Tt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? St(n, !0).forEach((function (e) {
                    Object(c["a"])(t, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : St(n).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return t
        }

        I()(wt, {VBtn: U["a"], VIcon: R["a"]});
        var Mt, Bt, It = {
                name: "baseBox", computed: Tt({}, Object(p["b"])(["styles"]), {
                    customUI: function () {
                        return {
                            background: this.isUserSend ? this.styles.secondaryColor : this.styles.primaryColor,
                            color: this.isUserSend ? this.styles.secondaryTextColor : this.styles.primaryTextColor
                        }
                    }, buttonCustomUI: function () {
                        return {
                            background: this.styles.buttonColor,
                            color: this.styles.buttonTextColor,
                            textAlign: this.styles.buttonAlign,
                            fontWeight: this.styles.buttonWeight
                        }
                    }, buttonCustomUIHover: function () {
                        return {
                            background: this.styles.buttonColorHover ? this.styles.buttonColorHover : this.styles.buttonColor,
                            color: this.styles.buttonTextColorHover ? this.styles.buttonTextColorHover : this.styles.buttonTextColor,
                            textAlign: this.styles.buttonAlign,
                            fontWeight: this.styles.buttonWeight,
                            opacity: this.styles.buttonOpacityHover
                        }
                    }, quickReplyButtonGroupCustomUI: function () {
                        return {"text-align": this.styles.quickReplyButtonAlign}
                    }, quickReplyButtonCustomUI: function () {
                        return {
                            "border-color": this.styles.quickReplyButtonBorderColor,
                            background: this.styles.buttonColor,
                            color: this.styles.buttonTextColor,
                            textAlign: this.styles.buttonAlign,
                            fontWeight: this.styles.buttonWeight
                        }
                    }, quickReplyButtonCustomUIHover: function () {
                        return {
                            "border-color": this.styles.quickReplyButtonBorderColorHover,
                            background: this.styles.buttonColorHover ? this.styles.buttonColorHover : this.styles.buttonColor,
                            color: this.styles.buttonTextColorHover ? this.styles.buttonTextColorHover : this.styles.buttonTextColor,
                            textAlign: this.styles.buttonAlign,
                            fontWeight: this.styles.buttonWeight
                        }
                    }
                })
            }, $t = It, Ut = Object(M["a"])($t, Mt, Bt, !1, null, null, null), jt = Ut.exports, Lt = {
                name: "ChatTextBox",
                extends: jt,
                props: {isFirstMsg: !1, isLastMsg: !1, isUserSend: !1, content: null, msgId: "", msgReact: ""},
                components: {buttonReact: Ot},
                data: function () {
                    return {msgContent: "", msgButton: [], iconBotCustom: "", buttonHovered: -1}
                },
                mounted: function () {
                    try {
                        this.msgContent = this.content.text, this.content.buttons ? this.msgButton = this.content.buttons : this.msgButton = [], this.iconBotCustom = this.$store.state.bot_icon, "" === this.iconBotCustom || this.isUserSend || this.$refs.icon_bot.setAttribute("style", "background-image: url('" + decodeURIComponent(this.iconBotCustom) + "'")
                    } catch (t) {
                        console.log(t)
                    }
                },
                methods: {
                    btn_msg_click: function (t) {
                        if (t.payload && "" !== t.payload) {
                            var e = t.payload;
                            e.indexOf("#") >= 0 ? e += "#" + t.title : e += "##" + t.title, x.send_message_to_socket("payload", e, this.$store.state.subChannel)
                        } else t.url && "" !== t.url ? y.clickOpenLink(t.url) : t.phone_call && "" !== t.phone_call ? y.clickCallPhone(t.phone_call) : t.webview && "" !== t.webview && this.$store.state.componentsMainApp && this.$store.state.componentsMainApp.open_webview("", t.webview)
                    }, replaceLinkInTextContent: function (t) {
                        return y.urlify(t)
                    }, changeButtonHovered: function (t) {
                        this.buttonHovered = t
                    }
                },
                computed: {
                    boxMsgStyle: function () {
                        var t = "box-msg";
                        return this.isFirstMsg && (t += " first-box-msg"), this.isLastMsg && (t += " last-box-msg"), t
                    }, msgContentStyle: function () {
                        var t = "";
                        return t = this.isUserSend ? "msg-2" : "msg-1", this.isLastMsg && (t = t + " " + t + "-lst-msg"), t
                    }
                }
            }, Pt = Lt, Rt = (n("0c0b"), n("62ad")), Et = n("a523"), Ht = n("0fd9"),
            Ft = Object(M["a"])(Pt, bt, vt, !1, null, "743489f6", null), At = Ft.exports;
        I()(Ft, {VCol: Rt["a"], VContainer: Et["a"], VRow: Ht["a"], VSpacer: F["a"]});
        var Nt = function () {
                var t = this, e = t.$createElement, n = t._self._c || e;
                return n("div", {class: t.boxMsgStyle}, [t.isUserSend ? t._e() : n("div", {
                    ref: "icon_bot",
                    staticClass: "bot-icon"
                }, [n("img", {
                    staticStyle: {"max-width": "24px", "max-height": "24px"},
                    attrs: {src: t.styles.avatarBot, alt: "robot"}
                })]), n("v-container", {
                    staticClass: "text-box-button pa-0 ma-0",
                    attrs: {fluid: ""}
                }, [n("v-row", {attrs: {"no-gutters": ""}}, [t.isUserSend ? n("v-spacer") : t._e(), n("v-col", {
                    attrs: {
                        xs: "12",
                        sm: "8",
                        md: "5",
                        lg: "3",
                        xl: "2"
                    }
                }, [n("div", {staticClass: "image-box-content"}, [n("div", {staticClass: "image-display"}, [n("v-img", {
                    attrs: {
                        src: t.msgImageUrl,
                        "aspect-ratio": "1.333",
                        cover: ""
                    }, on: {
                        click: function (e) {
                            return t.showLightBox()
                        }
                    }
                })], 1), "" !== t.msgContent ? n("div", {
                    staticClass: "img-title-content",
                    style: t.customUI,
                    domProps: {innerHTML: t._s(t.replaceLinkInTextContent(t.msgContent))}
                }) : t._e(), t.isUserSend ? t._e() : n("buttonReact", {
                    attrs: {
                        message_id: t.msgId,
                        user_act: t.msgReact
                    }
                }), t.msgButton.length > 0 ? n("div", {staticClass: "img-button-display"}, t._l(t.msgButton, (function (e, s) {
                    return n("button", {
                        key: s,
                        style: [t.buttonCustomUI, t.buttonHovered === e ? t.buttonCustomUIHover : {}],
                        on: {
                            mouseover: function (n) {
                                return t.changeButtonHovered(e)
                            }, mouseleave: function (e) {
                                return t.changeButtonHovered(-1)
                            }, click: function (n) {
                                return t.btn_msg_click(e)
                            }
                        }
                    }, [t._v("\n                            " + t._s(e.title) + "\n                        ")])
                })), 0) : t._e()], 1)])], 1)], 1)], 1)
            }, Dt = [], Vt = {
                name: "ChatImageBox",
                extends: jt,
                props: {isFirstMsg: !1, isLastMsg: !1, isUserSend: !1, content: null, msgId: "", msgReact: ""},
                data: function () {
                    return {msgContent: "", msgImageUrl: "", msgButton: [], iconBotCustom: "", buttonHovered: -1}
                },
                components: {buttonReact: Ot},
                mounted: function () {
                    try {
                        this.msgContent = this.content.title, this.msgImageUrl = this.content.url, this.content.buttons ? this.msgButton = this.content.buttons : this.msgButton = [], this.iconBotCustom = this.$store.state.bot_icon, "" === this.iconBotCustom || this.isUserSend || this.$refs.icon_bot.setAttribute("style", "background-image: url('" + decodeURIComponent(this.iconBotCustom) + "'")
                    } catch (t) {
                        console.log(t)
                    }
                },
                methods: {
                    showLightBox: function () {
                        this.$store.dispatch(this.$ActionTypes.SET_LIGHT_BOX_DATA_THEN_SHOW, {
                            data: [{
                                title: this.msgContent,
                                description: "",
                                src: this.msgImageUrl
                            }], index: 0
                        })
                    }, btn_msg_click: function (t) {
                        if (t.payload && "" !== t.payload) {
                            var e = t.payload;
                            e.indexOf("#") >= 0 ? e += "#" + t.title : e += "##" + t.title, x.send_message_to_socket("payload", e, this.$store.state.subChannel)
                        } else t.url && "" !== t.url ? y.clickOpenLink(t.url) : t.phone_call && "" !== t.phone_call ? y.clickCallPhone(t.phone_call) : t.webview && "" !== t.webview && this.$store.state.componentsMainApp && this.$store.state.componentsMainApp.open_webview("", t.webview)
                    }, changeButtonHovered: function (t) {
                        this.buttonHovered = t
                    }, replaceLinkInTextContent: function (t) {
                        return y.urlify(t)
                    }
                },
                computed: {
                    boxMsgStyle: function () {
                        var t = "box-msg";
                        return this.isFirstMsg && (t += " first-box-msg"), this.isLastMsg && (t += " last-box-msg"), t
                    }, msgContentStyle: function () {
                        var t = "";
                        return t = this.isUserSend ? "msg-2" : "msg-1", this.isLastMsg && (t = t + " " + t + "-lst-msg"), t
                    }
                }
            }, qt = Vt, Wt = (n("0178"), n("adda")), Jt = Object(M["a"])(qt, Nt, Dt, !1, null, "4a30826e", null),
            zt = Jt.exports;
        I()(Jt, {VCol: Rt["a"], VContainer: Et["a"], VImg: Wt["a"], VRow: Ht["a"], VSpacer: F["a"]});
        var Gt = function () {
                var t = this, e = t.$createElement, n = t._self._c || e;
                return n("div", {class: t.boxMsgStyle}, [n("v-container", {
                    staticClass: "pa-0 mt-2 mb-2",
                    attrs: {fluid: ""}
                }, [n("v-row", {attrs: {"no-gutters": ""}}, [t.isUserSend ? n("v-spacer") : t._e(), n("v-col", {
                    attrs: {
                        xs: "6",
                        sm: "4",
                        md: "3",
                        lg: "2",
                        xl: "1"
                    }
                }, [n("v-hover", {
                    scopedSlots: t._u([{
                        key: "default", fn: function (e) {
                            var s = e.hover;
                            return [n("div", {staticStyle: {position: "relative"}}, [n("div", {staticClass: "image-box-content"}, [n("div", {staticClass: "image-display"}, [n("v-icon", {attrs: {size: "170"}}, [t._v("mdi-file-document-outline")])], 1)]), n("v-fade-transition", [s ? n("v-overlay", {
                                attrs: {
                                    absolute: "",
                                    color: "#411C0B"
                                }
                            }, [n("div", {
                                staticStyle: {
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    "text-align": "center"
                                }, on: {click: t.downloadFile}
                            }, [n("v-icon", {attrs: {size: "70"}}, [t._v("mdi-download")]), n("br"), t._v("\n                    filename.jpg\n                  ")], 1)]) : t._e()], 1)], 1)]
                        }
                    }])
                })], 1)], 1)], 1), n("iframe", {staticStyle: {display: "none"}, attrs: {id: "frm_download"}})], 1)
            }, Xt = [], Yt = {
                name: "ChatDownloadBox",
                props: {isFirstMsg: !1, isLastMsg: !1, isUserSend: !1, content: null},
                data: function () {
                    return {msgFileUrl: ""}
                },
                mounted: function () {
                    try {
                        this.msgFileUrl = this.content.url
                    } catch (t) {
                        console.log(t)
                    }
                },
                methods: {
                    downloadFile: function () {
                        fetch(this.msgFileUrl).then((function (t) {
                            return t.blob()
                        })).then((function (t) {
                            var e = window.URL.createObjectURL(t), n = document.createElement("a");
                            n.style.display = "none", n.href = e, n.download = "abc.jpg", document.body.appendChild(n), n.click(), window.URL.revokeObjectURL(e), alert("your file has downloaded!")
                        })).catch((function () {
                            return alert("oh no!")
                        }))
                    }
                },
                computed: {
                    boxMsgStyle: function () {
                        var t = "box-msg";
                        return this.isFirstMsg && (t += " first-box-msg"), this.isLastMsg && (t += " last-box-msg"), t
                    }, msgContentStyle: function () {
                        var t = "";
                        return t = this.isUserSend ? "msg-2" : "msg-1", this.isLastMsg && (t = t + " " + t + "-lst-msg"), t
                    }
                }
            }, Qt = Yt, Zt = (n("a2eb"), n("0789")), Kt = n("ce87"), te = n("a797"),
            ee = Object(M["a"])(Qt, Gt, Xt, !1, null, "42213d18", null), ne = ee.exports;
        I()(ee, {
            VCol: Rt["a"],
            VContainer: Et["a"],
            VFadeTransition: Zt["c"],
            VHover: Kt["a"],
            VIcon: R["a"],
            VOverlay: te["a"],
            VRow: Ht["a"],
            VSpacer: F["a"]
        });
        var se = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {class: t.boxMsgStyle}, [t.isUserSend ? t._e() : n("div", {
                ref: "icon_bot",
                staticClass: "bot-icon"
            }, [n("img", {
                staticStyle: {"max-width": "24px", "max-height": "24px"},
                attrs: {src: t.styles.avatarBot, alt: "robot"}
            })]), 0 === t.msgButton.length ? n("div", {
                class: t.msgContentStyle,
                style: t.customUI
            }, [n("span", {domProps: {innerHTML: t._s(t.replaceLinkInTextContent(t.msgContent))}}), t.isUserSend ? t._e() : n("buttonReact", {
                attrs: {
                    message_id: t.msgId,
                    user_act: t.msgReact
                }
            })], 1) : n("v-container", {
                staticClass: "text-box-button pa-0 ma-0",
                attrs: {fluid: ""}
            }, [n("v-row", {attrs: {"no-gutters": ""}}, [n("v-col", {
                attrs: {
                    xs: "12",
                    sm: "8",
                    md: "5",
                    lg: "3",
                    xl: "2"
                }
            }, [n("div", {staticClass: "image-box-content"}, ["" !== t.msgContent ? n("div", {
                staticClass: "img-message-content",
                style: t.customUI
            }, [n("span", {domProps: {innerHTML: t._s(t.replaceLinkInTextContent(t.msgContent))}}), t.isUserSend ? t._e() : n("buttonReact", {
                attrs: {
                    message_id: t.msgId,
                    user_act: t.msgReact
                }
            })], 1) : t._e(), t.msgButton.length > 0 ? n("div", {
                staticClass: "quick-reply-button-display",
                style: t.quickReplyButtonGroupCustomUI
            }, t._l(t.msgButton, (function (e, s) {
                return n("button", {
                    key: s,
                    style: [t.quickReplyButtonCustomUI, t.buttonHovered === e ? t.quickReplyButtonCustomUIHover : {}],
                    on: {
                        mouseover: function (n) {
                            return t.changeButtonHovered(e)
                        }, mouseleave: function (e) {
                            return t.changeButtonHovered(-1)
                        }, click: function (n) {
                            return t.btn_msg_click(e)
                        }
                    }
                }, [t._v("\n                            " + t._s(e.title) + "\n                        ")])
            })), 0) : t._e()])])], 1)], 1)], 1)
        }, ie = [], oe = {
            name: "ChatQuickReplyBox",
            extends: jt,
            props: {isFirstMsg: !1, isLastMsg: !1, isUserSend: !1, content: null, msgId: "", msgReact: ""},
            components: {buttonReact: Ot},
            data: function () {
                return {msgContent: "", msgImageUrl: "", msgButton: [], iconBotCustom: "", buttonHovered: -1}
            },
            mounted: function () {
                try {
                    this.content.text ? this.msgContent = this.content.text : this.msgContent = "", this.content.buttons ? this.msgButton = this.content.buttons : this.msgButton = [], this.iconBotCustom = this.$store.state.bot_icon, "" === this.iconBotCustom || this.isUserSend || this.$refs.icon_bot.setAttribute("style", "background-image: url('" + decodeURIComponent(this.iconBotCustom) + "'")
                } catch (t) {
                    console.log(t)
                }
            },
            methods: {
                btn_msg_click: function (t) {
                    if (t.payload && "" !== t.payload) {
                        var e = t.payload;
                        e.indexOf("#") >= 0 ? e += "#" + t.title : e += "##" + t.title, x.send_message_to_socket("payload", e, this.$store.state.subChannel)
                    } else t.url && "" !== t.url ? y.clickOpenLink(t.url) : t.phone_call && "" !== t.phone_call && y.clickCallPhone(t.phone_call);
                    this.msgButton = []
                }, replaceLinkInTextContent: function (t) {
                    return y.urlify(t)
                }, changeButtonHovered: function (t) {
                    this.buttonHovered = t
                }
            },
            computed: {
                boxMsgStyle: function () {
                    var t = "box-msg";
                    return this.isFirstMsg && (t += " first-box-msg"), this.isLastMsg && (t += " last-box-msg"), t
                }, msgContentStyle: function () {
                    var t = "";
                    return t = this.isUserSend ? "msg-2" : "msg-1", this.isLastMsg && (t = t + " " + t + "-lst-msg"), t
                }
            }
        }, re = oe, ae = (n("7621"), Object(M["a"])(re, se, ie, !1, null, "043cdaf6", null)), ce = ae.exports;
        I()(ae, {VCol: Rt["a"], VContainer: Et["a"], VRow: Ht["a"]});
        var le = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {staticClass: "msg-carousel pb-1"}, [n("div", {
                staticClass: "scrolling-wrapper-flexbox",
                attrs: {id: "carousel_box_" + t.boxindex},
                on: {
                    mousedown: t.event_mouse_down,
                    mouseleave: t.event_mouse_leave,
                    mouseup: t.event_mouse_up,
                    mousemove: t.event_mouse_move
                }
            }, t._l(t.carousels, (function (e, s) {
                return n("div", {key: s, staticClass: "card"}, [n("v-hover", [n("div", {
                    staticClass: "cr-box",
                    staticStyle: {position: "relative"}
                }, [n("v-img", {
                    attrs: {"aspect-ratio": "0.9", contain: "", src: e.image_url},
                    on: {
                        click: function (e) {
                            return t.showLightBox(s)
                        }
                    }
                }), n("div", {staticClass: "card-title"}, [n("div", {
                    staticClass: "sub-title-1",
                    attrs: {title: e.title}
                }, [t._v(t._s(e.title))]), n("div", {
                    staticClass: "sub-title-2",
                    domProps: {innerHTML: t._s(t.replaceLinkInTextContent(e.subtitle))}
                })])], 1)]), e.buttons && e.buttons.length > 0 ? n("div", {staticClass: "carousel-img-button-display"}, t._l(e.buttons, (function (e, s) {
                    return n("button", {
                        key: s,
                        style: [t.buttonCustomUI, t.buttonHovered === e ? t.buttonCustomUIHover : {}],
                        on: {
                            mouseover: function (n) {
                                return t.changeButtonHovered(e)
                            }, mouseleave: function (e) {
                                return t.changeButtonHovered(-1)
                            }, click: function (n) {
                                return t.btn_msg_click(e)
                            }
                        }
                    }, [t._v("\n                    " + t._s(e.title) + "\n                ")])
                })), 0) : t._e()], 1)
            })), 0)])
        }, ue = [];

        function de(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var s = Object.getOwnPropertySymbols(t);
                e && (s = s.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), n.push.apply(n, s)
            }
            return n
        }

        function he(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? de(n, !0).forEach((function (e) {
                    Object(c["a"])(t, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : de(n).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return t
        }

        var pe = {
            name: "ChatCarouselBox",
            extends: jt,
            props: {content: null, boxindex: "", buttonHovered: -1},
            data: function () {
                return {isMouseDown: !1, startX: 0, scrollLeft: 0, carousels: []}
            },
            mounted: function () {
                try {
                    this.content.carousel_cards && this.content.carousel_cards.length > 0 && (this.carousels = this.content.carousel_cards)
                } catch (t) {
                    console.log(t)
                }
            },
            computed: he({}, Object(p["b"])(["styles"])),
            methods: {
                showLightBox: function (t) {
                    var e = [];
                    this.carousels.map((function (t) {
                        e.push({title: t.title, description: t.subtitle, src: t.image_url})
                    })), this.$store.dispatch(this.$ActionTypes.SET_LIGHT_BOX_DATA_THEN_SHOW, {data: e, index: t})
                }, event_mouse_down: function (t) {
                    this.isMouseDown = !0, this.startX = t.pageX - d()("#carousel_box_" + this.boxindex + ".scrolling-wrapper-flexbox")[0].offsetLeft, this.scrollLeft = d()("#carousel_box_" + this.boxindex + ".scrolling-wrapper-flexbox")[0].scrollLeft
                }, event_mouse_leave: function (t) {
                    this.isMouseDown = !1
                }, event_mouse_up: function (t) {
                    this.isMouseDown = !1
                }, event_mouse_move: function (t) {
                    if (this.isMouseDown) {
                        t.preventDefault();
                        var e = t.pageX - d()("#carousel_box_" + this.boxindex + ".scrolling-wrapper-flexbox")[0].offsetLeft,
                            n = 3 * (e - this.startX);
                        d()("#carousel_box_" + this.boxindex + ".scrolling-wrapper-flexbox")[0].scrollLeft = this.scrollLeft - n
                    }
                }, btn_msg_click: function (t) {
                    if (t.payload && "" !== t.payload) {
                        var e = t.payload;
                        e.indexOf("#") >= 0 ? e += "#" + t.title : e += "##" + t.title, x.send_message_to_socket("payload", e, this.$store.state.subChannel)
                    } else t.url && "" !== t.url ? y.clickOpenLink(t.url) : t.phone_call && "" !== t.phone_call ? y.clickCallPhone(t.phone_call) : t.webview && "" !== t.webview && this.$store.state.componentsMainApp && this.$store.state.componentsMainApp.open_webview("", t.webview)
                }, replaceLinkInTextContent: function (t) {
                    return y.urlify(t)
                }, changeButtonHovered: function (t) {
                    this.buttonHovered = t
                }
            }
        }, fe = pe, me = (n("37ba"), Object(M["a"])(fe, le, ue, !1, null, "527ccbc6", null)), ge = me.exports;
        I()(me, {VHover: Kt["a"], VImg: Wt["a"]});
        var _e = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {staticClass: "UploadingBox right"}, [n("div", {staticClass: "__container"}, [t.display_error ? n("div", {staticClass: "box-uploading-failed"}, [n("v-icon", [t._v("mdi-alert")]), n("span", [t._v("Can't upload file")])], 1) : n("div", {staticClass: "__loading"}, [t._m(0)]), n("div", {
                staticClass: "file-name",
                attrs: {title: t.file_name}
            }, [t._v(t._s(t.file_name))])])])
        }, be = [function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {staticClass: "lds-ring"}, [n("div"), n("div"), n("div"), n("div")])
        }], ve = {
            props: {file_name: "", status: ""}, data: function () {
                return {}
            }, mounted: function () {
            }, computed: {
                display_error: function () {
                    return !(!this.status || "failed" !== this.status)
                }
            }
        }, ye = ve, xe = (n("39f7"), Object(M["a"])(ye, _e, be, !1, null, "03c93db2", null)), Ce = xe.exports;
        I()(xe, {VIcon: R["a"]});
        var ke = function () {
            var t = this, e = t.$createElement, n = t._self._c || e;
            return n("div", {class: t.boxMsgStyle}, [t.isUserSend ? t._e() : n("div", {
                ref: "icon_bot",
                staticClass: "bot-icon"
            }, [n("img", {
                staticStyle: {"max-width": "24px", "max-height": "24px"},
                attrs: {src: t.styles.avatarBot, alt: "robot"}
            })]), n("v-container", {
                staticClass: "text-box-button pa-0 ma-0",
                attrs: {fluid: ""}
            }, [n("v-row", {attrs: {"no-gutters": ""}}, [t.isUserSend ? n("v-spacer") : t._e(), n("v-col", {
                attrs: {
                    xs: "12",
                    sm: "8",
                    md: "5",
                    lg: "3",
                    xl: "2"
                }
            }, [n("div", {staticClass: "image-box-content"}, [n("div", {staticClass: "image-display"}, [n("a", {
                attrs: {
                    href: t.msgFileUrl,
                    target: "_blank"
                }
            }, [t.fileIsImage(t.msgFileUrl) ? n("v-img", {
                attrs: {
                    src: t.msgFileUrl,
                    "aspect-ratio": "1.333",
                    cover: ""
                }
            }) : n("div", {staticClass: "fileDownload"}, [n("v-icon", [t._v("mdi-file-download")])], 1), n("div", {
                staticClass: "fileName",
                attrs: {title: t.fileName}
            }, [t._v(t._s(t.fileName))])], 1)]), t.isUserSend ? t._e() : n("buttonReact", {
                attrs: {
                    message_id: t.msgId,
                    user_act: t.msgReact
                }
            })], 1)])], 1)], 1)], 1)
        }, we = [], Oe = {
            name: "fileBox",
            extends: jt,
            props: {isUserSend: !1, isFirstMsg: !1, isLastMsg: !1, content: null, msgId: "", msgReact: ""},
            components: {buttonReact: Ot},
            data: function () {
                return {msgFileUrl: "", fileName: "", iconBotCustom: ""}
            },
            mounted: function () {
                var t = {};
                t = "string" === typeof this.content ? JSON.parse(this.content) : this.content, t && (this.msgFileUrl = t["url"], this.fileName = this.getFileNameFromUrl(this.msgFileUrl)), this.iconBotCustom = this.$store.state.bot_icon, "" === this.iconBotCustom || this.isUserSend || (console.log(this.$refs), this.$refs.icon_bot.setAttribute("style", "background-image: url('" + decodeURIComponent(this.iconBotCustom) + "'"))
            },
            methods: {
                fileIsImage: function (t) {
                    if (t) {
                        var e = t.split(".").pop().toLowerCase(), n = ["tif", "png", "gif", "ico", "jpg", "jpeg"];
                        return n.indexOf(e) >= 0
                    }
                    return !1
                }, getFileNameFromUrl: function (t) {
                    var e = t.split("/").pop();
                    return decodeURI(e)
                }
            },
            computed: {
                boxMsgStyle: function () {
                    var t = "box-msg";
                    return this.isFirstMsg && (t += " first-box-msg"), this.isLastMsg && (t += " last-box-msg"), t
                }
            }
        }, Se = Oe, Te = (n("f22b"), Object(M["a"])(Se, ke, we, !1, null, "358978b2", null)), Me = Te.exports;

        function Be(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var s = Object.getOwnPropertySymbols(t);
                e && (s = s.filter((function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }))), n.push.apply(n, s)
            }
            return n
        }

        function Ie(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Be(n, !0).forEach((function (e) {
                    Object(c["a"])(t, e, n[e])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Be(n).forEach((function (e) {
                    Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                }))
            }
            return t
        }

        I()(Te, {VCol: Rt["a"], VContainer: Et["a"], VIcon: R["a"], VImg: Wt["a"], VRow: Ht["a"], VSpacer: F["a"]});
        var $e = {
                name: "MainChatBox",
                components: {
                    ControlChat: _t,
                    ChatTextBox: At,
                    ChatImageBox: zt,
                    ChatQuickReplyBox: ce,
                    ChatCarouselBox: ge,
                    ChatDownloadBox: ne,
                    ChatUploadingBox: Ce,
                    ChatFileBox: Me
                },
                mounted: function () {
                    var t = this;
                    this.$nextTick((function () {
                        t.$store.state.scSubscribeChannel && t.$store.state.scSubscribeChannel.watch((function (e) {
                            t.handler_messages(e)
                        })), t.is_chat_with_bot(), t.get_chat_logs(), t.get_list_suggestion()
                    })), this.$store.state.componentsMainChatBox = this, d()(".history-log-chat")[0].addEventListener("scroll", this.eventScrollChatlogs)
                },
                beforeDestroy: function () {
                    d()(".history-log-chat")[0].removeEventListener("scroll", this.eventScrollChatlogs)
                },
                data: function () {
                    return {
                        listMsg: [],
                        usersMsgScrollTop: 0,
                        canLoadMoreChatLogs: !1,
                        paramsLoadChatLogs: "",
                        displayLoadingChatlogs: !1,
                        scrollPosition: 0
                    }
                },
                computed: Ie({}, Object(p["b"])(["lightBoxData", "lightBoxIndex", "styles"]), {
                    bodyStyle: function () {
                        return this.styles.bodyBackgroundEnable && this.styles.bodyBackgroundLink ? {background: "url(".concat(this.styles.bodyBackgroundLink, ") repeat")} : {}
                    }
                }),
                methods: {
                    hideLightBox: function () {
                        this.$store.dispatch(this.$ActionTypes.SET_LIGHT_BOX_DATA_THEN_SHOW, {})
                    }, handler_messages: function (t) {
                        var e = this, n = {};
                        if (n.type = t.type, "user-submit-webview" !== n.type) {
                            "chatlog_system_notes" === t.type && t.chatlog_system_notes && t.chatlog_system_notes.length > 0 && t.chatlog_system_notes.forEach((function (t) {
                                "mark_request_support_as_done" === t.message_type ? e.$store.state.isChatWithBot = !0 : "assign_request_support" === t.message_type && (e.$store.state.isChatWithBot = !1)
                            })), "request_human_support" === t.type && t.content.disable_bot && (this.$store.state.isChatWithBot = !1), n.content = t.content, n.created_time = t.created_time, n.react_icon = t.react_icon ? t.react_icon : "", t["_id"] ? n.id = t["_id"] : n.id = y.guid();
                            var s = this.listMsg.length;
                            if (t.source && 1 === t.source ? (n.source = "user", this.usersMsgScrollTop = d()(".history-log-chat")[0].scrollHeight) : (n.source = "admin", this.usersMsgScrollTop = d()(".history-log-chat")[0].scrollHeight), n.isLastMsg = !0, s > 0 ? (n.isFirstMsg = n.source !== this.listMsg[s - 1].source, n.source === this.listMsg[s - 1].source && (this.listMsg[s - 1].isLastMsg = !1)) : n.isFirstMsg = !0, s > 0 && "user" !== n.source) for (var i = s - 1; i >= 0; i--) {
                                if ("user" === this.listMsg[i].source) {
                                    this.listMsg.splice(i + 1, 0, n);
                                    break
                                }
                                var o = new Date(n.created_time), r = new Date(this.listMsg[i].created_time);
                                if (o >= r) {
                                    this.listMsg.splice(i + 1, 0, n);
                                    break
                                }
                                if (0 === i) {
                                    this.listMsg.splice(i, 0, n);
                                    break
                                }
                            } else this.listMsg.push(n);
                            this.$nextTick((function () {
                                var t = d()(".history-log-chat")[0];
                                e.usersMsgScrollTop > 0 ? t.scrollTop = e.usersMsgScrollTop : t.scrollTop = t.scrollHeight
                            }))
                        } else this.$store.state.componentsMainApp.close_webview()
                    }, get_chat_logs: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, s, i = this;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (e = !this.canLoadMoreChatLogs, "" === this.$store.state.clientId) {
                                            t.next = 10;
                                            break
                                        }
                                        return t.next = 4, y.get_chat_logs(this.$store.state.clientId, this.$store.state.clientToken, this.$store.state.botCode, this.paramsLoadChatLogs);
                                    case 4:
                                        n = t.sent, this.displayLoadingChatlogs = !1, s = n.chatlog, this.paramsLoadChatLogs = n.next ? n.next : "", this.canLoadMoreChatLogs = "" !== this.paramsLoadChatLogs, s && s.length > 0 ? (s.forEach((function (t) {
                                            try {
                                                var e = {};
                                                if (e.type = t.message_type, e.content = JSON.parse(t.message).content, e.id = t._id ? t._id : y.guid(), e.created_time = t.created_time, e.react_icon = t.react_icon ? t.react_icon : "", "quick_reply" !== e.type && "rating" !== e.type || (e.content.buttons = []), 1 === t.source) if (e.source = "user", "payload" === e.type && "get_started" !== e.content.text) e.type = "text", e.content.text.indexOf("#") >= 0 && (e.content.text = 3 === e.content.text.split("#").length ? e.content.text.split("#")[2] : e.content.text.split("#")[0]); else if ("payload" === e.type && "get_started" === e.content.text) return;
                                                var n = i.listMsg.length;
                                                e.isFirstMsg = !0, n > 0 ? (e.isLastMsg = e.source !== i.listMsg[0].source, e.source === i.listMsg[0].source && (i.listMsg[0].isFirstMsg = !1)) : e.isLastMsg = !0, i.listMsg.unshift(e)
                                            } catch (s) {
                                                console.log(s)
                                            }
                                        })), this.$nextTick((function () {
                                            var t = d()(".history-log-chat")[0];
                                            t.setAttribute("style", "scroll-behavior: auto;"), t.scrollTop = e ? t.scrollHeight : t.scrollHeight - i.scrollPosition - 22, t.setAttribute("style", "scroll-behavior: smooth;")
                                        }))) : !0 === this.$store.state.customSender && this.process_send_start_message();
                                    case 10:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }

                        return e
                    }(), process_send_start_message: function () {
                        this.$store.state.scSubscribeChannel ? x.send_start_message(this.$store.state.subChannel, this.$store.state.startPayload) : setTimeout(function () {
                            this.process_send_start_message()
                        }.bind(this), 200)
                    }, eventScrollChatlogs: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t(e) {
                            var n;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (n = d()(".history-log-chat")[0], 0 !== n.scrollTop) {
                                            t.next = 7;
                                            break
                                        }
                                        if (!this.canLoadMoreChatLogs) {
                                            t.next = 7;
                                            break
                                        }
                                        return this.scrollPosition = n.scrollHeight, this.displayLoadingChatlogs = !0, t.next = 7, this.get_chat_logs();
                                    case 7:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e(e) {
                            return t.apply(this, arguments)
                        }

                        return e
                    }(), handler_message_uploading: function (t, e) {
                        for (var n = 0; n < this.listMsg.length; n++) if (this.listMsg[n].id === t) {
                            0 === e ? this.listMsg.splice(n, 1) : this.listMsg[n].content["status"] = "failed";
                            break
                        }
                    }, get_list_suggestion: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if ("" === this.$store.state.clientId) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.next = 3, y.get_suggestion_list(this.$store.state.clientId, this.$store.state.clientToken, this.$store.state.botCode);
                                    case 3:
                                        e = t.sent, e && e.length > 0 && (this.$refs.control_chat.list_suggest = e.map((function (t) {
                                            return t.sample
                                        })));
                                    case 5:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }

                        return e
                    }(), is_chat_with_bot: function () {
                        var t = Object(l["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function (t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if ("" === this.$store.state.clientId) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.next = 3, y.is_chat_with_bot(this.$store.state.clientId, this.$store.state.clientToken, this.$store.state.botCode);
                                    case 3:
                                        e = t.sent, this.$store.state.isChatWithBot = e;
                                    case 5:
                                    case"end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }

                        return e
                    }()
                }
            }, Ue = $e, je = (n("b143"), n("490a")), Le = Object(M["a"])(Ue, z, G, !1, null, "22639e4c", null),
            Pe = Le.exports;
        I()(Le, {VProgressCircular: je["a"]});
        var Re = {name: "home", components: {MainChatBox: Pe}}, Ee = Re,
            He = Object(M["a"])(Ee, W, J, !1, null, null, null), Fe = He.exports;
        o["a"].use(q["a"]);
        var Ae = new q["a"]({
            mode: "history",
            base: "/v36/src/",
            routes: [{path: "/", alias: "/index.html", name: "home", component: Fe}]
        }), Ne = n("9483");
        Object(Ne["a"])("".concat("/v36/src/", "service-worker.js"), {
            ready: function () {
                console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")
            }, registered: function () {
                console.log("Service worker has been registered.")
            }, cached: function () {
                console.log("Content has been cached for offline use.")
            }, updatefound: function () {
                console.log("New content is downloading.")
            }, updated: function () {
                console.log("New content is available; please refresh.")
            }, offline: function () {
                console.log("No internet connection found. App is running in offline mode.")
            }, error: function (t) {

            }
        });
        n("bf40"), n("41e6");
        var De = n("5547"), Ve = (n("2223"), n("d1e7"), n("f309"));
        o["a"].use(Ve["a"]);
        var qe = new Ve["a"]({icons: {iconfont: "mdi"}});
        o["a"].use(De["a"]);
        var We, Je = n("ed18");
        Je.config(), o["a"].config.productionTip = !1, o["a"].directive("closable", {
            bind: function (t, e, n) {
                We = function (s) {
                    try {
                        s.stopPropagation();
                        var i = e.value, o = i.handler, r = (i.exclude, !1);
                        "btn-react" !== s.target._prevClass && "btn-react" !== s.target.parentElement._prevClass && "btn-react-ed" !== s.target._prevClass && "btn-react-ed" !== s.target.parentElement._prevClass || (r = !0), t.contains(s.target) || r || n.context[o]()
                    } catch (s) {
                    }
                }, document.addEventListener("click", We), document.addEventListener("touchstart", We)
            }, unbind: function () {
                document.removeEventListener("click", We), document.removeEventListener("touchstart", We)
            }
        }), new o["a"]({
            router: Ae, store: m, vuetify: qe, render: function (t) {
                return t(V)
            }
        }).$mount("#app")
    }, "5d53": function (t, e, n) {
        "use strict";
        var s = n("fd91"), i = n.n(s);
        i.a
    }, "61d4": function (t, e, n) {
    }, "6d42": function (t, e, n) {
    }, "6e69": function (t, e, n) {
    }, "71ad": function (t, e, n) {
    }, 7621: function (t, e, n) {
        "use strict";
        var s = n("e9fa"), i = n.n(s);
        i.a
    }, "80e0": function (t, e, n) {
    }, "904c": function (t, e, n) {
    }, "93b4": function (t, e, n) {
    }, a2eb: function (t, e, n) {
        "use strict";
        var s = n("904c"), i = n.n(s);
        i.a
    }, b143: function (t, e, n) {
        "use strict";
        var s = n("4274"), i = n.n(s);
        i.a
    }, be79: function (t, e, n) {
    }, c375: function (t, e, n) {
        "use strict";
        var s = n("434f"), i = n.n(s);
        i.a
    }, c91d: function (t, e, n) {
        "use strict";
        var s = n("0780"), i = n.n(s);
        i.a
    }, e9fa: function (t, e, n) {
    }, f22b: function (t, e, n) {
        "use strict";
        var s = n("6d42"), i = n.n(s);
        i.a
    }, fd91: function (t, e, n) {
    }
});
//# sourceMappingURL=app.a442f70e.js.map