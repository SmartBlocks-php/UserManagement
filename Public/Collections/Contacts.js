define([
    'jquery',
    'underscore',
    'backbone',
    '../Models/Contact'
], function ($, _, Backbone, Contact) {
    var Collection = Backbone.Collection.extend({
        model: Contact,
        url: "/UserManagement/Contacts"
    });

    return Collection;
});