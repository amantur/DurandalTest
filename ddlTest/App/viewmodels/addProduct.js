define(["knockout",
        "underscore",
        "postal",
        "models/SearchCriteriaModel",
        "models/baseViewModel"],
function (ko,_,postal,searchCriteriaModel,baseModel) {
    var results = ko.observableArray();
    var query = ko.observable();

    var AddProduct = {
        activate: activate,
        title: 'Search and Add Product',
        search: search,
        results: results,
        query:query
    };

    return AddProduct;
    
    function activate() {
        
    }
    
    function search() {
        
    }
});