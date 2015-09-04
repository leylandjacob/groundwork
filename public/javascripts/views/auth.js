/**
 * @desc Auth View
 *
 *
 */
define([

    'jquery',
    'underscore',
    'backbone',
    'utils',
    'models/user'

],	function($, _, Backbone, Utils, UserModel){


    var AuthView = Backbone.View.extend({

        // setup DOM Elements
        el : $('body'),

        // bind Events
        events: {

            'click .trigger-signup' : 'signup',
            'click .trigger-login' : 'login',
            'click .trigger-request-reset' : 'requestReset',
            'click .trigger-submit-reset' : 'submitReset',
            'click .trigger-show-password' : 'showPassword'

        },

        /**
         * initialize()
         * @desc intialize the view
         *
         *
         */
        initialize: function(){

        },

        /**
         * render()
         * @desc Render the view
         *
         *
         */
        render: function(){

        },

        /**
         * signup()
         *
         *
         * @param event
         */
        signup: function(event) {

            event.preventDefault();

            var email = $('input[name="email"]').val();
            var password = $('input[name="password"]').val();
            var messages = Utils.getConfig().messages;

            // email required
            if(!email){
                Utils.alert( messages.requiredEmail );
                return;
            }

            // valid email required
            if(!Utils.validateEmail(email)){
                Utils.alert( messages.invalidEmail );
                return;
            }

            // valid password strength
            if( !Utils.validatePassword( password ) ){
                return;
            }

            this.user = new UserModel();

            this.user.save( { email : email, password: password } , {
                success: function(model, response, options) {

                    if(response.status === 'error'){

                        Utils.alert(response.message);
                        return;
                    }

                    window.location = "/";

                },

                error: function(model, response, options) {

                    Utils.alert( messages.signupError );

                }
            });
        },

        /**
         * login()
         *
         *
         * @param event
         */
        login: function(event) {

            event.preventDefault();

            var form = $('#login');

            var redirect = form.attr('data-redirect') ? form.attr('data-redirect') : '/';

            var email = $('input[name="email"]').val();
            var password = $('input[name="password"]').val();
            var messages = Utils.getConfig().messages;

            // email required
            if(!email){
                Utils.alert( messages.requiredEmail );
                return;
            }

            // password required
            if(!password){
                Utils.alert( messages.requiredPassword );
                return;
            }

            $.post(form.attr('action'), form.serialize(), function(response) {
                if(response.status === 'error') {
                    Utils.alert(response.message);
                } else {
                    window.location = redirect;
                }

            }, 'json');
            return false;
        },

        requestReset: function(event) {

            event.preventDefault();

            var form = $('#request-reset');

            var email = $('input[name="email"]').val();

            var messages = Utils.getConfig().messages;

            // email required
            if(!email){
                Utils.alert(messages.requiredEmail);
                return;
            }

            if(!Utils.validateEmail(email)){
                Utils.alert(messages.invalidEmail);
                return;
            }

            $.post(form.attr('action'), form.serialize(), function(response) {

                if(response.status === 'error') {

                    Utils.alert(response.message);

                } else {

                    Utils.alert(messages.resetSuccess);

                }

            }, 'json');
            return false;

        },

        submitReset: function(event) {

            event.preventDefault();

            var form = $('#submit-reset');
            var password = $('input[name="password"]').val();
            var passwordConfirm = $('input[name="password_confirm"]').val();

            if( !Utils.validatePassword(password, passwordConfirm) ){
                return;
            }

            $.post(form.attr('action'), form.serialize(), function(response) {

                if(response.status === 'error') {

                    Utils.alert(response.message);

                } else {

                    window.location = "/";

                }

            }, 'json');
            return false;

        },

        showPassword: function (event) {

            event.preventDefault();

            //TODO: change password fields to viewabel


        }



    });

    return AuthView;

});