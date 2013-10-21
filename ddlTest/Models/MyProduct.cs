using System.Collections.Generic;

namespace ddlTest.Models
{
    public class MyProduct 
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public int NotesCount { get; set; }

        public virtual ICollection<MyProductNote> Items { get; set; }

        public MyProduct()
        {
            Items = new HashSet<MyProductNote>();
        }
    }
}
