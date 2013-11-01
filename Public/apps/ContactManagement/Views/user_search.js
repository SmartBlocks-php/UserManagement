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
            base.users = new SmartBlocks.Blocks.Kernel.Collections.Users();

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(user_search_tpl, {});
            base.$el.html(template);


        },
        renderUsersList: function () {
            var base = this;

            base.$el.find('.user_search_results').html('');
            for (var k in base.users.models) {
                var thumb = new ContactThumb({model: base.users.models[k]});
                base.$el.find('.user_search_results').append(thumb.$el);
                thumb.init();
                thumb.addAction('<a href="javascript:void(0);" class="fa fa-plus-circle clickable-icon"></a>',
                    function (user) {
                        var contact = SmartBlocks.Blocks.UserManagement.Main.makeContact(SmartBlocks.current_user, user);

                    }
                );
            }
        },
        launch_search: function () {
            var base = this;
            var input = base.$el.find('.user_search_input').val();


            var users = SmartBlocks.Blocks.Kernel.Data.users.filter(function (user) {
                return user.get("name") && user.get("name").indexOf(input) > -1;
            });
            base.users.reset(users);
        },
        registerEvents: function () {
            var base = this;

            var key_timer = 0;
            base.$el.delegate('.user_search_input', 'keyup', function () {
                clearTimeout(key_timer);
                var elt = $(this);
                key_timer = setTimeout(function () {
                    if (elt.val() != "") {
                        base.launch_search();
                    } else {
                        base.$el.find('.user_search_results').html('');
                    }

                }, 100);
            });

            base.users.on("reset", function () {
                base.renderUsersList();
            });
        }
    });

    return View;
});