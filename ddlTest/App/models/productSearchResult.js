define(["underscore", "ko", "models/baseVM"],
    function (_, ko, BaseVM) {
        var ProductSearchResult = function (options) {
            /*this.id = 0;
            this.name = null;
            this.shortDescription = null;*/
            this.id = 0;
            this.name = null;
            this.shortDescription = null;
            this.description = null;
            this.category = null;
            this.image = null;

            BaseVM.apply(this, arguments);
        };

        _.extend(SearchResult.prototype, BaseVM.prototype);

        return ProductSearchResult;
    });
