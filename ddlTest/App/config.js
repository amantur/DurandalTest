define(['toastr'],function(toastr) {
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = "toast-bottom-right";

    var imageSettings = {
        imageBasePath: '~/Images/MyProductList'
    };

    var routes = [
		{
			route:''
		},
		{
            route: 'myProducts',
            moduleId: 'viewmodels/myproducts',
            title: 'My Products',
            nav: true
        },
        {
            route: 'searchProducts',
            moduleId: 'viewmodels/searchProduct',
            title: 'Search Products',
            nav: true
        },
        {
            route: 'addProducts',
            moduleId: 'viewmodels/addProduct',
            title: 'Add Product',
            nav: true
        }];

    var startModule = "myProducts";

    return {
        imageSettings: imageSettings,
        routes: routes,
        startModule: startModule
    };
});
