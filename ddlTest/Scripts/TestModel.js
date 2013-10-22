var TestModel = function (require) {
    var self = this;
    self.title = 'Search and Add Product';
    self.results = ko.observableArray([]);
    self.query = ko.observable('pavilion');
    self.activate = function () {
        //var that = this;
        console.log('activated searchProduct : [' + self.query() + ']');
        self.search();
    };

    self.addProduct = function (item) {
        alert(item.Name);
    };

    self.search = function () {
        //var that = this;
        return searchProduct(self.query()).then(function (data) {
            self.results([]);
            self.results(data);
            console.log('found [' + data.length + '] products for [' + self.query() + ']');
        }).fail(function (jqXHR, textStatus) {
            var msg = 'Error searching product: ' + textStatus;
            console.log(msg);
            //logger.logError(msg, jqXHR, system.getModuleId(searchProduct), true);
        });
    };

    function searchProduct(query) {
        var q = "query=" + escape(query) + "&pageIndex=1&pageSize=20";
        return $.ajax({
            url: '/MyProducts/SearchProduct',
            type: 'GET',
            dataType: 'json',
            data: q
        });
    }
};
