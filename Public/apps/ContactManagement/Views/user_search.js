define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/user_search.html',
    './contact_thumbnail'
], function ($, _, Backbone, user_search_tpl, ContactThumb) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "user_search",
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

            var template = _.template(user_search_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});