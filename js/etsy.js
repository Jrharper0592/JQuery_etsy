;(function(){
"use strict";
    function EtsyClient(token){
        this.token = token;
        var self = this;
        console.log("winning");
    }

    EtsyClient.prototype = {
        URLs: { 
            listings: "https://openapi.etsy.com/v2/listings/"
        },
    
        access_token: function(){
            return  ".js"+"?access_token="+this.token+"&callback=?";
        },
        //write in a $.ajax() Request for etsy info.
        // getlisting: function()
// //         /**
// //          * getData
// //          * @arguments none.
// //          * @return promise
// //          */
// //       
            getData: function(){
             var x = $.Deferred();

            if(this.length > 0){
                 x.resolve(this.listings);
             } else {
                var p = $.get(this.URLs.listings + this.access_token());
                 p.then(function(data){
                     x.resolve(data);
                     this.listings = data;
                 });
             }

             return x;
         },


        draw: function(){
           
        },
        //add into a function
        $.when(
            //1-get api data 
            //2-load html from templates/
            ).then(function(data,template){
            console.log("you got this!");
            })
        
    };

    window.EtsyClient = EtsyClient;

})();