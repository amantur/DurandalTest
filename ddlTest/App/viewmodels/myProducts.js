define(['service/dataService', 'service/logger'],
    function (dataservice, logger) {

        var myProducts = ko.observableArray();
        var initialized = false;
        var filter = ko.observable();

        var vm = {
            filter: filter,
            activate: activate,
            myProducts: myProducts,
            title: 'My Products',
            refresh: refresh,
            search: search
        };

        return vm;

        function activate() {
            if (initialized) { return; }
            initialized = true;
            return refresh();
        }

        function refresh() {
            return dataservice.getMyProductPartials(myProducts);
        }

        function search() {
            logger.log('Shell Filter', null, system.getModuleId(shell), true);
        }
    });
