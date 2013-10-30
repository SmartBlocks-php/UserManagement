define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/logger_widget.html',
    'text!../Templates/logout_widget.html'
], function ($, _, Backbone, login_widget_tpl, logout_widget_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "logger_widget",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;
            if (!SmartBlocks.current_user.get('connected')) {
                var template = _.template(login_widget_tpl, {});
            } else {
                var template = _.template(logout_widget_tpl, {});
            }
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('form', 'submit', function () {
                var form = $(this);
                var login = base.$el.find(".login_input").val();
                var password = base.$el.find(".password_input").val();
                console.log("HA");
                $.ajax({
                    url: "/Users/login",
                    method: "POST",
                    data: {
                        name: login,
                        password: password
                    },
                    success: function (data, status) {
                        if (data.success) {
                            window.location.reload();
                        } else {
                            console.log("error logging in");
                            //Error in username/password handling
                        }
                    }
                });

            });



            base.$el.delegate(".delogger button", "click", function () {
                $.ajax({
                    url: "/Users/logout",
                    success: function (data) {
                        if (data.success) {
                            window.location.reload();
                        } else {
                            console.log("error when logging out");
                        }
                    }
                });
            });
        }
    });

    return View;
});