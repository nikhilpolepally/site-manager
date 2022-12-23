using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortid;
using site_mangement_be.Entities;
using site_mangement_be.Model;

namespace site_mangement_be.Controllers
{
    [Route("api/sites")]
    [ApiController]
    public class SiteController : ControllerBase
    {
        private readonly ILogger _logger;
        public SiteController(ILogger<SiteController> logger)
        {
            _logger = logger;
        }

        [HttpPost("create/{uuid}")]
        public async Task<ResponseModel> CreateSite([FromBody] CreateSiteModel site, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                await _db.Sites.AddAsync(new Site
                {
                    City = site.city,
                    CreatedOn = DateTime.Now,
                    Latitude = site.latitude.ToString(),
                    Longitude = site.longitude.ToString(),
                    Name = site.locationName,
                    Token = ShortId.Generate(),
                    CreatedBy= uuid
                });
                _db.SaveChanges();
                return new ResponseModel { Message = "Added successfully", Status = "success" };
            }
        }

        [HttpGet("list/{uuid}")]
        public async Task<List<Site>> SiteList(string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                return await _db.Sites.Where(x=>x.CreatedBy==uuid).ToListAsync();   
            }
        }

        [HttpDelete("delete/{sitetoken}/{uuid}")]
        public async Task<ResponseModel> DeleteSite(string sitetoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                var details= await _db.Sites.FirstOrDefaultAsync(x => x.Token == sitetoken && x.CreatedBy==uuid);
                if (details != null)
                {
                    _db.Remove(details);
                    _db.SaveChanges();
                    return new ResponseModel { Message = "Deleted successfully", Status = "success" };
                }
                return new ResponseModel { Message = "Unauthorized", Status = "warning" };
            }
        }

        [HttpGet("view/{sitetoken}")]
        public async Task<Site?> SiteDetails(string sitetoken)
        {
            using (dbcon _db = new dbcon())
            {
                return await _db.Sites.FirstOrDefaultAsync(x => x.Token == sitetoken);
            }
        }

        [HttpPut("update/{sitetoken}/{uuid}")]
        public async Task<ResponseModel> UpdateSite([FromBody] CreateSiteModel site, string sitetoken, string uuid)
        {
            using (dbcon _db = new dbcon())
            {
                var details = await _db.Sites.FirstOrDefaultAsync(x => x.Token == sitetoken && x.CreatedBy == uuid);
                if (details != null)
                {
                    details.City = site.city;
                    details.Latitude = site.latitude;
                    details.Longitude = site.longitude;
                    details.Name = site.locationName;
                    _db.SaveChanges();
                    return new ResponseModel { Message = "Updated successfully", Status = "success" };
                }
                return new ResponseModel { Message = "Unauthorized", Status = "warning" };

            }
        }

    }
}
