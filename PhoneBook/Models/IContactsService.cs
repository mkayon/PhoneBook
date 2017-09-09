using PhoneBook.DTO;
using System.Collections.Generic;

namespace PhoneBook.Controllers
{
    internal interface IContactsService<T>where T:class
    {
         List<T> GetContacts();
        T GetById(object id);
        void InsertContact(T obj);
        void UpdateContact(T obj);
        void DeleteContact(T obj);

    }
}