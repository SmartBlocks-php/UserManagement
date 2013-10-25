require.config({
    paths : {
//        jquery: "Lib/jquery",
        underscore: "Lib/underscore",
        backbone: "Lib/backbone"
    }
});

//define('jquery-private', ['jquery'], function (jq) {
//    return jq.noConflict( true );
//});

require([
//    'jquery-private',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    return {
        ha: "my_module"
    };
});