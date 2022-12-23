using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortid;
using site_mangement_be.Entities;
using site_mangement_be.Model;

namespace site_mangement_be.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ILogger _logger;
        public ContactsController(ILogger<ContactsController> logger)
        {
            _logger = logger;
        }

        [HttpPost("create/{sitetoken}/{uuid}")]
        public async Task<ResponseModel> Create([FromBody] AddContactModel contact, string sitetoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                await _db.Contacts.AddAsync(new Contact
                {
                    CreatedBy = uuid,
                    CreatedOn = DateTime.Now,
                    Email = contact.Email,
                    FirstName = contact.FirstName,
                    LastName = contact.LastName,
                    Mobile = contact.Mobile,
                    Role = contact.Role,
                    Token = ShortId.Generate(),
                    SiteToken = sitetoken

                });
                _db.SaveChanges();
                return new ResponseModel { Message = "Added successfully", Status = "success" };
            }
        }

        [HttpGet("list/{sitetoken}/{uuid}")]
        public async Task<List<Contact>> List(string sitetoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                return await _db.Contacts.Where(x => x.CreatedBy == uuid && x.SiteToken == sitetoken).ToListAsync();
            }
        }

        [HttpDelete("delete/{contacttoken}/{uuid}")]
        public async Task<ResponseModel> Delete(string contacttoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                var details = await _db.Contacts.FirstOrDefaultAsync(x => x.Token == contacttoken && x.CreatedBy == uuid);
                if (details != null)
                {
                    _db.Remove(details);
                    _db.SaveChanges();
                    return new ResponseModel { Message = "Deleted successfully", Status = "success" };
                }
                return new ResponseModel { Message = "Unauthorized", Status = "warning" };
            }
        }

        [HttpGet("view/{contacttoken}/{uuid}")]
        public async Task<Contact?> details(string contacttoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                return await _db.Contacts.FirstOrDefaultAsync(x => x.Token == contacttoken && x.CreatedBy == uuid);
            }
        }

        [HttpPut("update/{contacttoken}/{uuid}")]
        public async Task<ResponseModel> Update([FromBody] AddContactModel contact, string contacttoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                var details = await _db.Contacts.FirstOrDefaultAsync(x => x.Token == contacttoken && x.CreatedBy == uuid);
                if (details != null)
                {
                    details.FirstName = contact.FirstName;
                    details.LastName = contact.LastName;
                    details.Email = contact.Email;
                    details.Role = contact.Role;
                    details.Mobile = contact.Mobile;
                    _db.SaveChanges();
                    return new ResponseModel { Message = "Updated successfully", Status = "success" };
                }
                return new ResponseModel { Message = "Unauthorized", Status = "warning" };

            }
        }

    }
}
