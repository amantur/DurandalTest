
namespace ddlTest.Models
{
    public class SearchCriteria
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ProductName { get; set; }
        public string Note { get; set; }

        public bool IsEmpty
        {
            get
            {
                return string.IsNullOrWhiteSpace(FirstName)
                    && string.IsNullOrWhiteSpace(LastName)
                    && string.IsNullOrWhiteSpace(MiddleName)
                    && string.IsNullOrWhiteSpace(ProductName)
                    && string.IsNullOrWhiteSpace(Note);
            }
        }
    }
}
