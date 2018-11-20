! function(e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var a = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
  }
  n.m = e, n.c = t, n.d = function(e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: r
    })
  }, n.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, n.t = function(e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var a in e) n.d(r, a, function(t) {
        return e[t]
      }.bind(null, a));
    return r
  }, n.n = function(e) {
    var t = e && e.__esModule ? function() {
      return e.default
    } : function() {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
  "use strict";
  var r = function(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }(n(1));
  $(document).ready(function() {
    $("body").bootstrapMaterialDesign()
  }), chrome.storage.local.get("todolist", function(e) {
    var t = React.createElement(r.default, {
        initList: e.todolist
      }),
      n = document.getElementById("root");
    ReactDOM.render(t, n)
  })
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }(),
    a = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(n(2));
  var o = function(e) {
    function t(e) {
      ! function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t);
      var n = function(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
      return n.state = {
        tasks: n.props.initList.map(function(e, t) {
          return {
            key: "t" + t,
            id: "t" + t,
            text: e.text,
            created: e.created,
            due: e.due
          }
        }),
        taskCount: (n.props.initList.length || 1) - 1,
        tempList: null
      }, n.inputRef = React.createRef(), n.handleChange = n.handleChange.bind(n), n.handleKeyPress = n.handleKeyPress.bind(n), n.handleDeleteClick = n.handleDeleteClick.bind(n), n
    }
    return function(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, React.Component), r(t, [{
      key: "handleChange",
      value: function(e) {
        var t = e.target.value;
        this.setState(function(e, n) {
          return {
            tempList: e.tasks.filter(function(e) {
              return e.text.includes(t)
            })
          }
        })
      }
    }, {
      key: "handleKeyPress",
      value: function(e) {
        var t = e.target.value.trim();
        if (t && "Enter" === e.key) {
          var n = new Date,
            r = new Date(n.getUTCFullYear(), n.getMonth(), n.getDate());
          if (t.includes("@")) {
            var a = t.substring(t.indexOf("@") + 1).trim().toLowerCase();
            r = function(e) {
              var t = new Date,
                n = new Date(t.getUTCFullYear(), t.getMonth(), t.getDate()),
                r = {
                  date: function(e) {
                    var n = parseInt(e.split("/")[0]) - 1,
                      r = parseInt(e.split("/")[1]);
                    return new Date(t.getUTCFullYear(), n, r)
                  },
                  days: function(e) {
                    return n.setTime(n.getTime() + 864e5 * e), n
                  },
                  weeks: function(e) {
                    return n.setTime(n.getTime() + 7 * e * 864e5), n
                  },
                  months: function(e) {
                    return n.setTime(n.getTime() + 30 * e * 864e5), n
                  }
                };
              if (e.includes("/")) return r.date(e);
              if (e.includes("day") || e.includes("week") || e.includes("month")) {
                var a = e.split(" ")[0],
                  o = e.split(" ")[1];
                return r[o += "s" !== o[o.length - 1] ? "s" : ""](a)
              }
              return e.includes("tomorrow") ? r.days(1) : n
            }(a), t = t.substring(0, t.indexOf("@")).trim()
          }
          this.setState(function(e, a) {
            var o = {
              key: "t" + (e.taskCount + 1),
              id: "t" + (e.taskCount + 1),
              text: t,
              created: n.getTime(),
              due: r.getTime()
            };
            return {
              tasks: e.tasks.concat([o]),
              taskCount: e.taskCount + 1,
              tempList: null
            }
          }), e.target.value = ""
        }
      }
    }, {
      key: "handleDeleteClick",
      value: function(e) {
        this.setState(function(t, n) {
          return {
            tasks: t.tasks.filter(function(t) {
              return t.id !== e
            }),
            tempList: null
          }
        }), this.inputRef.current.value = ""
      }
    }, {
      key: "render",
      value: function() {
        chrome.storage.local.set({
          todolist: this.state.tasks.map(function(e) {
            return {
              text: e.text,
              created: e.created,
              due: e.due
            }
          })
        });
        var e = this.state.tempList || this.state.tasks;
        return React.createElement("div", null, React.createElement("div", {
          id: "taskInputContainer",
          className: "form-group animated fadeInUp"
        }, React.createElement("label", {
          htmlFor: "taskInput",
          className: "bmd-label-floating"
        }, " Add / Search Task "), React.createElement("input", {
          ref: this.inputRef,
          onChange: this.handleChange,
          onKeyPress: this.handleKeyPress,
          className: "form-control",
          id: "taskInput"
        }), React.createElement("div", {
          id: "tip"
        }, ' Tip: Type "@" to add a due date (ex. @tomorrow, @3 weeks) ')), React.createElement(a.default, {
          tasks: e,
          onDeleteClick: this.handleDeleteClick
        }))
      }
    }]), t
  }();
  t.default = o
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }(),
    a = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(n(3));
  var o = function(e) {
    function t(e) {
      ! function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t);
      var n = function(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
      return n.listContainer = React.createRef(), n.handleDeleteClick = n.handleDeleteClick.bind(n), n
    }
    return function(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, React.Component), r(t, [{
      key: "componentDidUpdate",
      value: function() {
        this.listContainer.current.scrollTop = this.listContainer.current.scrollHeight
      }
    }, {
      key: "handleDeleteClick",
      value: function(e) {
        this.props.onDeleteClick(e)
      }
    }, {
      key: "render",
      value: function() {
        var e = this,
          t = this.props.tasks.map(function(t) {
            return React.createElement(a.default, {
              key: t.key,
              id: t.id,
              text: t.text,
              created: t.created,
              due: t.due,
              onDeleteClick: e.handleDeleteClick
            })
          });
        return React.createElement("div", {
          id: "taskContainer",
          ref: this.listContainer
        }, " ", t, " ")
      }
    }]), t
  }();
  t.default = o
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }(),
    a = i(n(4)),
    o = i(n(5));

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  var c = function(e) {
    function t(e) {
      ! function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }(this, t);
      var n = function(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
      return n.card = React.createRef(), n.handleDeleteClick = n.handleDeleteClick.bind(n), n
    }
    return function(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, React.Component), r(t, [{
      key: "componentDidMount",
      value: function() {
        this.props.due <= Date.now() && this.card.current.classList.add("expired")
      }
    }, {
      key: "handleDeleteClick",
      value: function(e) {
        this.card.current.classList.add("flipOutX"), setTimeout(this.props.onDeleteClick, 550, this.props.id)
      }
    }, {
      key: "render",
      value: function() {
        return React.createElement("div", {
          className: "card animated fadeInUp delay-4s",
          ref: this.card
        }, React.createElement("div", {
          className: "card-body"
        }, React.createElement("div", {
          className: "card-text"
        }, " ", this.props.text, " "), React.createElement(o.default, {
          created: this.props.created,
          due: this.props.due
        })), React.createElement(a.default, {
          onClick: this.handleDeleteClick
        }))
      }
    }]), t
  }();
  t.default = c
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }
    return function(t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t
    }
  }();
  var a = function(e) {
    function t() {
      return function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, t),
        function(e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" != typeof t && "function" != typeof t ? e : t
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return function(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, React.Component), r(t, [{
      key: "render",
      value: function() {
        return React.createElement("div", {
          className: "deleteButton btn btn-primary btn-raised",
          onClick: this.props.onClick
        }, React.createElement("svg", {
          "aria-hidden": "true",
          "data-prefix": "fas",
          "data-icon": "trash-alt",
          className: "svg-inline--fa fa-trash-alt fa-w-14",
          role: "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 448 512"
        }, React.createElement("path", {
          className: "trash-rotate",
          fill: "currentColor",
          d: "M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 16"
        }), React.createElement("path", {
          fill: "currentColor",
          d: "M0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"
        })))
      }
    }]), t
  }();
  t.default = a
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
      }
    }
    return function(t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t
    }
  }();

  function a(e, t) {
    return Math.ceil((t.getTime() - e.getTime()) / 864e5)
  }
  var o = function(e) {
    function t() {
      return function(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, t),
        function(e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" != typeof t && "function" != typeof t ? e : t
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return function(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }(t, React.Component), r(t, [{
      key: "render",
      value: function() {
        var e = new Date,
          t = new Date;
        t.setTime(this.props.created);
        var n = new Date;
        n.setTime(this.props.due);
        var r = a(t, n);
        r = Math.max(7, r);
        var o = a(e, n);
        return o = Math.max(0, o), React.createElement("div", {
          className: "card-footer text-muted"
        }, React.createElement("div", {
          className: "days"
        }, o + " day" + (1 !== o ? "s" : ""), " left"), React.createElement("div", {
          className: "progress"
        }, React.createElement("div", {
          className: "progress-bar",
          role: "progressbar",
          "aria-valuenow": o,
          "aria-valuemin": "0",
          "aria-valuemax": r,
          style: {
            width: 100 * o / r + "%"
          }
        })))
      }
    }]), t
  }();
  t.default = o
}]);
