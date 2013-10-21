using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ddlTest.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}