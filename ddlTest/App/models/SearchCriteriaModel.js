define(["underscore", "ko", "models/baseVM"], function (_, ko, BaseVM) {
    var SearchCriteria = function (options) {
        this.id = 0;
        this.name = null;
        this.shortDescription = null;
        this.description = null;
        this.category = null;
        this.image = null;

        BaseVM.apply(this, arguments);
    };

    _.extend(SearchCriteria.prototype, BaseVM.prototype);

    return SearchCriteria;
});
