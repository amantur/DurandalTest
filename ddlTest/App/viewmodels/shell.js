define(['durandal/system',
    'plugins/router',
    'service/logger',
    'config'],
    function (system, router, logger, config) {
        var shell = {
            activate: activate,
            router: router
        };

        function activate() {
            router.map([
                { route: '', moduleId: 'viewmodels/myProducts', title: 'My Products', nav: true },
                { route: 'searchProduct', moduleId: 'viewmodels/searchProduct', title: 'Search Products', nav: true },
				{ route: 'addProduct', moduleId: 'viewmodels/addProduct', title: 'Add Product', nav: true }            
            ]).buildNavigationModel();
            logger.log('MyProducts Started', null, system.getModuleId(shell), true);
            return router.activate();
        }

        return shell;
    }
);
