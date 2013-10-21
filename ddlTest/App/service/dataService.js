define(['durandal/system', 'service/logger'],
    function (system, logger) {
        var dataservice = {
            getMyProductPartials: getMyProductPartials,
            searchProduct: searchProduct
        };

        return dataservice;

        function searchProduct(query) {
            var data = {};
            data.query = query;
            data.pageIndex = 1;
            data.pageSize = 20;
            return $.ajax({
                url: '/MyProducts/SearchProduct',
                type: 'GET',
                dataType: 'json',
                data: JSON.stringify(data)
            });
        }

        function getMyProductPartials(myProductsKOB) {
            return $.ajax({
                url: '/MyProducts/Products',
                type: 'GET',
                dataType: 'json'
            }).then(function (data) {
                var x = [];
                data.forEach(function (item) {
                    x.push(item);
                });
                myProductsKOB([]);
                return myProductsKOB(x);
            }).fail(function (jqXHR, textStatus) {
                var msg = 'Error getting data. ' + textStatus;
                logger.logError(msg, jqXHR, system.getModuleId(dataservice), true);
            });
        }
    }
);
