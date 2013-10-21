define(["underscore", "ko", "models/baseVM"], function (_, ko, BaseVM) {
    var MySearchResult = function (options) {
        this.id = 0;
        this.firstName = null;
        this.middleName = null;
        this.lastName = null;
        this.productName = null;
        this.note = null;
        this.isEmpty = null;

        BaseVM.apply(this, arguments);
    };

    _.extend(MySearchResult.prototype, BaseVM.prototype);

    return MySearchResult;
});
