define(["underscore", "ko", "models/baseVM"], function (_, ko, BaseVM) {
    var MyProductNote = function (options) {
        this.id = 0;
        this.firstName = null;
        this.middleName = null;
        this.lastName = null;
        this.myProductId = null;
        this.note = null;
        this.fullName = null;

        BaseVM.apply(this, arguments);
    };

    _.extend(MyProductNote.prototype, BaseVM.prototype);

    return MyProductNote;
});
