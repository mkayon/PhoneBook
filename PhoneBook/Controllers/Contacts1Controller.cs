using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PhoneBook.Models;
using PhoneBook.DTO;

namespace PhoneBook.Controllers
{
    public class Contacts1Controller : ApiController
    {
        private PhoneBookBaseEntities1 db = new PhoneBookBaseEntities1();

        // GET: api/Contacts1
        public ICollection<ContactDto> GetContacts()
        {
            List<ContactDto> contacts = new List<ContactDto>();
            foreach (var item in db.Contacts)
            {
                contacts.Add(new ContactDto() { ContactId = item.Contact_Id, FirstName = item.First_Name, LastName = item.Last_Name, Email = item.Email_Adress });
            }
            return contacts;
        }
        
        // GET: api/Contacts1/5
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult GetContacts(int id)
        {
            Contacts contacts = db.Contacts.Find(id);
            if (contacts == null)
            {
                return NotFound();
            }
            ContactDto contact = new ContactDto()
            {
                ContactId = contacts.Contact_Id,
                FirstName = contacts.First_Name,
                LastName = contacts.Last_Name,
                Email = contacts.Email_Adress,
                PhoneNumber = new List<PhoneNumberDto>()
            };
            foreach (var item in contacts.Phone_Numbers)
            {
                contact.PhoneNumber.Add(new PhoneNumberDto() { PhoneNumberId = item.Phone_Number_Id, PhoneNum = item.Phone_Number });
            }
            return Ok(contact);
        }

        // PUT: api/Contacts1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContacts(int id, ContactDto contact)
        {
            Contacts contacts = new Contacts() { Contact_Id = contact.ContactId, First_Name = contact.FirstName, Last_Name = contact.LastName, Email_Adress = contact.Email, Phone_Numbers = new List<Phone_Numbers>(), Update_Date = DateTime.UtcNow };
            contacts.Create_Date = db.Contacts.Find(contact.ContactId).Create_Date;

            foreach (var item in contact.PhoneNumber)
            {

                contacts.Phone_Numbers.Add(new Phone_Numbers() { Phone_Number_Id = item.PhoneNumberId, Phone_Number = item.PhoneNum, Contact_Id = contact.ContactId });
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contacts.Contact_Id)
            {
                return BadRequest();
            }
            Contacts contacts2 = db.Contacts.Find(contact.ContactId);
            contacts2.First_Name = contacts.First_Name;
            contacts2.Last_Name = contacts.Last_Name;
            contacts2.Email_Adress = contacts.Email_Adress;
            List<PhoneNumberDto> tlist = contact.PhoneNumber.FindAll(x => x.PhoneNumberId == 0);
            List<Phone_Numbers> tlist2 = contacts2.Phone_Numbers.ToList<Phone_Numbers>();
            List<Phone_Numbers> tlist3 = new List<Phone_Numbers>();
            foreach (var item in tlist)
            {
                Phone_Numbers PN = new Phone_Numbers() { Phone_Number = item.PhoneNum, Contact_Id = contacts2.Contact_Id, Create_Date = DateTime.UtcNow };
                contacts2.Phone_Numbers.Add(PN);

            }
            foreach (var item in contacts2.Phone_Numbers)
            {
                var tmp = ((List<Phone_Numbers>)contacts.Phone_Numbers).Find(x => x.Phone_Number_Id == item.Phone_Number_Id);

                if (tmp == null)
                {
                    var delitem = tlist2.Find(x => x.Phone_Number_Id == item.Phone_Number_Id);
                    tlist3.Add(delitem);
                }
            }
            foreach (var item in tlist3)
            {
                contacts2.Phone_Numbers.Remove(item);
                db.Phone_Numbers.Remove(item);

            }
            

            db.Entry(contacts2).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

 

        // POST: api/Contacts1
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult PostContacts(ContactDto contact)
        {
            Contacts contacts = new Contacts() { Contact_Id = contact.ContactId, First_Name = contact.FirstName, Last_Name = contact.LastName, Email_Adress = contact.Email, Phone_Numbers = new List<Phone_Numbers>(), Create_Date = DateTime.UtcNow };
            List<PhoneNumberDto> tlist = contact.PhoneNumber.FindAll(x => x.PhoneNumberId == 0);
                       if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foreach (var item in tlist)
            {
                Phone_Numbers PN = new Phone_Numbers() { Phone_Number = item.PhoneNum, Contact_Id = contacts.Contact_Id, Create_Date = DateTime.UtcNow };
                contacts.Phone_Numbers.Add(PN);
                db.Phone_Numbers.Add(PN);
            }
 

            db.Contacts.Add(contacts);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Contacts1/5
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult DeleteContacts(int id)
        {
            Contacts contacts = db.Contacts.Find(id);
            if (contacts == null)
            {
                return NotFound();
            }
            foreach (var item in contacts.Phone_Numbers)
            {

            }
           db.Phone_Numbers.RemoveRange(contacts.Phone_Numbers);
            db.Contacts.Remove(contacts);
            db.SaveChanges();

            return Ok(contacts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactsExists(int id)
        {
            return db.Contacts.Count(e => e.Contact_Id == id) > 0;
        }
    }
}