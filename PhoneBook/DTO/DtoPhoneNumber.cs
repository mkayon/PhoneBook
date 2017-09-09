using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhoneBook.DTO
{
    public class PhoneNumberDto
    {
        public int PhoneNumberId { get; set; }
        public string PhoneNum { get; set; }
        public int ContactId { get; internal set; }
    }
}