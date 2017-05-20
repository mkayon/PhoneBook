using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhoneBook.DTO
{
    public class ContactDto
    {
        public int ContactId { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }
        public List<PhoneNumberDto> PhoneNumber { get; set; }

    }
}