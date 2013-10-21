///<reference path="../../require.js"/>
///<reference path="../../underscore.js"/>

define(["ko", "underscore", "postal", "models/myproduct", "models/baseVM"],
    function (ko, _, postal, MyProduct, BaseVM) {
        var ListViewModel = function () {
            this.myProducts = [];
            this.search = "";

            BaseVM.apply(this, arguments);
        };

        _.extend(ListViewModel.prototype, BaseVM.prototype, {

        });
    });
