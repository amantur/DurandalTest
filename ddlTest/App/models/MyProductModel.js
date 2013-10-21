define(["underscore", "ko", "models/baseVM"], function (_, ko, BaseVM) {
    var MyProduct = function (options) {
        this.id = 0;
        this.productName = null;
        this.productId = null;
        this.notesCount = null;
        this.items = [];

        BaseVM.apply(this, arguments);
    };

    _.extend(MyProduct.prototype, BaseVM.prototype);

    return MyProduct;
});
