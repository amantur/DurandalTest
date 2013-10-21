
namespace ddlTest.Models
{
    public class MyProductNote 
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Note { get; set; }

        public int MyProductId { get; set; }
        public virtual MyProduct MyProduct { get; set; }

        public string FullName
        {
            get
            {
                return FirstName + (string.IsNullOrWhiteSpace(MiddleName) ? "" : (" " + MiddleName)) + " " + LastName;
            }
        }
    }
}
