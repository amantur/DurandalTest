define(['knockout',
        'underscore',
        'postal',
        'service/dataService',
		'service/logger',
        'durandal/system'],
function (ko, _, postal, dataService, logger, system) {
var results = ko.observableArray([]);
var query = ko.observable('');

var SearchProduct = {
    activate: activate,
    title: 'Search and Add Product',
    search: search,
    addProduct: addProduct,
    results: results,
    query: query
};

return SearchProduct;

function activate() {
    //return search();
}

function addProduct(item) {
    alert(item.Name);
}

function search() {
    return dataService.searchProduct(query()).then(function (data) {
        results([]);
        results(data);
    }).fail(function (jqXHR, textStatus) {
        var msg = 'Error searching product: ' + textStatus;
        logger.logError(msg, jqXHR, system.getModuleId(dataService), true);
    });
}
});
