;(function() {
    "use strict";

    function EtsyClient(token) {
        this.token = token;
        var self = this;
        console.log("winning");

        var EtsyRouter = Backbone.Router.extend({
            routes: {
                "": "search",
                "listing/:listing_id": "details",
                "search/:keywords": "search"
            },
            search: function(keywords) {
                self.draw(keywords);

            },
            details: function(listing_id) {
                self.drawDetails(listing_id);
            },
            initialize: function() {
                Backbone.history.start();
            }
          
            
        });
        var Router = new EtsyRouter();

        this.handleEvents();
    }

    EtsyClient.prototype = {
        URLs: {
            listings: "https://openapi.etsy.com/v2/listings/active"
        },

        handleEvents: function(){
            $('body').on("submit", "form", function(event) {
                event.preventDefault();
                window.location.hash = 'search/' + this.querySelector('input').value;
            });
        },

        access_token: function() {
            return "?api_key=" + this.token;
        },

        getData: function(keywords) {
            if (keywords) {
                keywords = "&keywords=" + keywords;
            } else {
                keywords = "";
            }
            var etsydata = $.getJSON(
                "https://openapi.etsy.com/v2/listings/active.js?includes=Images" + keywords + "&api_key=ljn6cl37cqrlmiy8hbnq63ww&callback=?"
            ).then(function(jsonp) {
                return jsonp;
            });

            return etsydata;
        },
        drawDetails: function(listing_id){
            $.when(
                this.getData(listing_id),
                this.loadTemplate("detailed")
                ).then(function(apidata, template){
                    var templatingFun = _.template(template);
                    document.querySelector(".container").innerHTML = templatingFun(apidata);
                });
        },
        
        loadTemplate: function(name) {
            return $.get("./templates/" + name + ".html").then(function(data) {
                return data;
            });
        },

        draw: function(keywords) {
            $.when(
                //1-get api data 
                this.getData(keywords),
                //2-load html from templates/
                this.loadTemplate("home")
            ).then(function(apidata, template) {
                var templatingFn = _.template(template);
                document.querySelector(".container").innerHTML = templatingFn(apidata);

            });
        },
        
    };

    window.EtsyClient = EtsyClient;

})();
