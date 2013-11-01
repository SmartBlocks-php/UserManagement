define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/contact_management.html',
    './contact_page',
    './contact_list',
    './user_search'
], function ($, _, Backbone, contact_management_tpl, ContactPageView, ContactListView, UserSearchView) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "contact_management",
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

            var template = _.template(contact_management_tpl, {});
            base.$el.html(template);

            var contact_page = new ContactPageView();
            base.$el.find('.contact_page_container').html(contact_page.$el);
            contact_page.init();

            var contact_list = new ContactListView();
            base.$el.find('.contact_list_container').html(contact_list.$el);
            contact_list.init();

            var user_search = new UserSearchView();
            base.$el.find('.user_search_container').html(user_search.$el);
            user_search.init();
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});