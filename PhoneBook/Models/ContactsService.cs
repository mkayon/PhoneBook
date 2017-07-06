using PhoneBook.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PhoneBook.DTO;
using AutoMapper;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

namespace PhoneBook.Models
{
    public class ContactsService : IContactsService<ContactDto>
    {
        private PhoneBookBaseEntities1 db = new PhoneBookBaseEntities1();
        public void DeleteContact(ContactDto obj)
        {
            
            throw new NotImplementedException();
        }

        public ContactDto GetById(object id)
        {
            ContactDto contactDto;
            Contacts contact = db.Contacts.Find(id);
            Mapper.Initialize(cfg => cfg.CreateMap<Contacts, ContactDto>()
            .ForMember(x => x.ContactId, x => x.MapFrom(d => d.Contact_Id))
 .ForMember(x => x.FirstName, x => x.MapFrom(d => d.First_Name))
 .ForMember(x => x.LastName, x => x.MapFrom(d => d.Last_Name))
 .ForMember(x => x.Email, x => x.MapFrom(d => d.Email_Adress))
  );
            contactDto= Mapper.Map<Contacts, ContactDto>(contact);
            Mapper.Initialize(cfg => cfg.CreateMap<Phone_Numbers, PhoneNumberDto>()
            .ForMember(x => x.PhoneNumberId, x => x.MapFrom(d => d.Phone_Number_Id))
            .ForMember(x => x.ContactId, x => x.MapFrom(d => d.Contact_Id))
            .ForMember(x => x.PhoneNum, x => x.MapFrom(d => d.Phone_Number))
            );
            contactDto.PhoneNumber = Mapper.Map<ICollection<Phone_Numbers>,List< PhoneNumberDto>>(contact.Phone_Numbers);
            return contactDto;
        }

        public List<ContactDto> GetContacts()
        {
            List<Contacts> contacts = db.Contacts.ToList<Contacts>();
            Mapper.Initialize(cfg => cfg.CreateMap<Contacts,ContactDto>()
            .ForMember(x => x.ContactId, x => x.MapFrom(d => d.Contact_Id))
            .ForMember(x=> x.FirstName,x=>x.MapFrom(d=>d.First_Name))
            .ForMember(x => x.LastName, x => x.MapFrom(d => d.Last_Name))
            .ForMember(x => x.Email, x => x.MapFrom(d => d.Email_Adress)));

            return Mapper.Map<List<Contacts>,List<ContactDto>>(contacts);
         
           // throw new NotImplementedException();
        }

        public void InsertContact(ContactDto obj)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ContactDto,Contacts >()
.ForMember(x => x.Contact_Id, x => x.MapFrom(d => d.ContactId))
.ForMember(x => x.First_Name, x => x.MapFrom(d => d.FirstName))
.ForMember(x => x.Last_Name, x => x.MapFrom(d => d.LastName))
.ForMember(x => x.Email_Adress, x => x.MapFrom(d => d.Email))
);
          Contacts  contact = Mapper.Map<ContactDto,Contacts >(obj);
            contact.Create_Date = DateTime.UtcNow;
            List<PhoneNumberDto> tlist = obj.PhoneNumber.FindAll(x => x.PhoneNumberId == 0);

            foreach (var item in tlist)
            {
                Phone_Numbers PN = new Phone_Numbers() { Phone_Number = item.PhoneNum, Contact_Id = contact.Contact_Id, Create_Date = DateTime.UtcNow };
                contact.Phone_Numbers.Add(PN);
                db.Phone_Numbers.Add(PN);
            }


            db.Contacts.Add(contact);
            db.SaveChanges();
        }

        public void UpdateContact(ContactDto obj)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<ContactDto, Contacts>()
.ForMember(x => x.Contact_Id, x => x.MapFrom(d => d.ContactId))
.ForMember(x => x.First_Name, x => x.MapFrom(d => d.FirstName))
.ForMember(x => x.Last_Name, x => x.MapFrom(d => d.LastName))
.ForMember(x => x.Email_Adress, x => x.MapFrom(d => d.Email))
);
            Contacts contact = Mapper.Map<ContactDto, Contacts>(obj);
            contact.Update_Date = DateTime.UtcNow;
            Mapper.Initialize(cfg => cfg.CreateMap< PhoneNumberDto,Phone_Numbers>()
.ForMember(x => x.Phone_Number_Id, x => x.MapFrom(d => d.PhoneNumberId))
.ForMember(x => x.Contact_Id, x => x.MapFrom(d => d.ContactId))
.ForMember(x => x.Phone_Number, x => x.MapFrom(d => d.PhoneNum))
);
            contact.Phone_Numbers = Mapper.Map< List<PhoneNumberDto>,ICollection<Phone_Numbers>>(obj.PhoneNumber);

            contact.Create_Date = db.Contacts.Find(obj.ContactId).Create_Date;
            //    Contacts contacts = new Contacts() { Contact_Id = contact.ContactId, First_Name = contact.FirstName, Last_Name = contact.LastName, Email_Adress = contact.Email, Phone_Numbers = new List<Phone_Numbers>(), Update_Date = DateTime.UtcNow };
            //    contacts.Create_Date = db.Contacts.Find(contact.ContactId).Create_Date;

            //    foreach (var item in contact.PhoneNumber)
            //    {

            //        contacts.Phone_Numbers.Add(new Phone_Numbers() { Phone_Number_Id = item.PhoneNumberId, Phone_Number = item.PhoneNum, Contact_Id = contact.ContactId });
            //    }
            //    if (!ModelState.IsValid)
            //    {
            //        return BadRequest(ModelState);
            //    }

            //    if (id != contacts.Contact_Id)
            //    {
            //        return BadRequest();
            //    }
            //    Contacts contacts2 = db.Contacts.Find(contact.ContactId);
            //    contacts2.First_Name = contacts.First_Name;
            //    contacts2.Last_Name = contacts.Last_Name;
            //    contacts2.Email_Adress = contacts.Email_Adress;
            //    List<PhoneNumberDto> tlist = contact.PhoneNumber.FindAll(x => x.PhoneNumberId == 0);
            //    List<Phone_Numbers> tlist2 = contacts2.Phone_Numbers.ToList<Phone_Numbers>();
            //    List<Phone_Numbers> tlist3 = new List<Phone_Numbers>();
            //    foreach (var item in tlist)
            //    {
            //        Phone_Numbers PN = new Phone_Numbers() { Phone_Number = item.PhoneNum, Contact_Id = contacts2.Contact_Id, Create_Date = DateTime.UtcNow };
            //        contacts2.Phone_Numbers.Add(PN);

            //    }
            //    foreach (var item in contacts2.Phone_Numbers)
            //    {
            //        var tmp = ((List<Phone_Numbers>)contacts.Phone_Numbers).Find(x => x.Phone_Number_Id == item.Phone_Number_Id);

            //        if (tmp == null)
            //        {
            //            var delitem = tlist2.Find(x => x.Phone_Number_Id == item.Phone_Number_Id);
            //            tlist3.Add(delitem);
            //        }
            //    }
            //    foreach (var item in tlist3)
            //    {
            //        contacts2.Phone_Numbers.Remove(item);
            //        db.Phone_Numbers.Remove(item);

            //    }


            db.Entry(contact).State = EntityState.Modified;


                db.SaveChanges();
            


            //    return StatusCode(HttpStatusCode.NoContent);
        }
    }
}