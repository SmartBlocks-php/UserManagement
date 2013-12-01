define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default:{

        },
        urlRoot:"/UserManagement/Contacts",
        parse:function (response) {

            var user_a_array = response.user_a;
            var user_b_array = response.user_b;

            var user_a = SmartBlocks.Blocks.Kernel.Data.users.get(user_a_array['id']);
            var user_b = SmartBlocks.Blocks.Kernel.Data.users.get(user_b_array['id']);

            SmartBlocks.current_user.get("id")
            response.user_a = user_a;
            response.user_b = user_b;
            response.real_contact = SmartBlocks.current_user.get("id") == user_a_array['id'] ? user_b : user_a;

            return response;
        }
    });
    return Model;
});