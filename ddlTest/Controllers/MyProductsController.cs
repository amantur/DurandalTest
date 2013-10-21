using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;
using ddlTest.Models;

namespace Nop.Plugin.NopCustom.MyProductList.Controllers
{
    public class MyProductsController : Controller
    {
        public ViewResult Index(int pageIndex = 0, int pageSize = 10)
        {
            return View();
        }

        public ViewResult Add()
        {
            return View();
        }

        public JsonResult SearchProduct(string query, int pageIndex = 0, int pageSize = 10)
        {
            var ret = new JsonResult()
            {
                Data = Service.SearchProduct(query),
                ContentType = "text/json",
                ContentEncoding = System.Text.Encoding.UTF8,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                MaxJsonLength = int.MaxValue
            };

            return ret;
        }

        public JsonResult Products(int pageIndex = 0, int pageSize = 10)
        {
            return new JsonResult
            {
                Data = Service.SearchMyProduct(new SearchCriteria(), pageIndex, pageSize),
                ContentType = "text/json",
                ContentEncoding = System.Text.Encoding.UTF8,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                MaxJsonLength = int.MaxValue
            };
        }
    }
}
