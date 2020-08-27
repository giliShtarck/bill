using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DTO;
namespace API.Controllers
{
    [RoutePrefix("advertisment")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AdvertismentController : ApiController
    {
        Bll.Add_Advertisment_BLL adbll = new Bll.Add_Advertisment_BLL();
       [HttpPost]
        [Route("addadvertisment")]
        public IHttpActionResult AddAdvertisment([FromBody] AdvertisementsDTO a)
        {
            try
            {
                Bll.AdvertismentsBLL.AddAdvertisement(a);         // להוסיף תאריך וקוד לוח
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        //[HttpGet]
        //[Route("getadvertisementsbydate/{date}")]
        //public List<AdvertisementsDTO> GetAdvertisementsByDate([FromBody] DateTime date)
        //{
        //    return Bll.AdvertismentsBLL.GetAdvertisementsByDate(date);
        //}
        [HttpGet]
        [Route("getadvertisementsbycategory/{category}")]
        public List<AdvertisementsDTO> GetAdvertismentByCategory([FromBody] string category)
        {
            return Bll.AdvertismentsBLL.GetAdvertismentByCategory(category);
        }
        [HttpGet]
        [Route("getalladvertisments")]
        public List<AdvertisementsDTO> GetAllAdvertisements()
        {
            return Bll.AdvertismentsBLL.GetAllAdvertisements();
        }
        [HttpGet]
        [Route("getalladvertismentsforuser/{userid}")]
        public List<AdvertisementsDTO> GetAllAdvertisementsForUser(int userid)
        {
            return Bll.AdvertismentsBLL.GetAllAdvertisementsForUser(userid);
        }
        [HttpGet]
        [Route("getlastadvertismentsbyuser/{userid}")]
        public AdvertisementsDTO GetLastAdvertisementByUser(int userid)
        {
            return Bll.AdvertismentsBLL.GetLastAdvertisementByUser(userid);
        }
        [HttpGet]
        [Route("getallfalseadvertisments")]
        public List<AdvertisementsDTO> GetAllFalseAdvertisments()
        {
            return Bll.AdvertismentsBLL.GetAllFalseAdvertisments();
        }
        [HttpPut]
        [Route("Approval")]
        public List<DateTime> Approval(AdvertisementsDTO c,int boardid)
        {
            Bll.Add_Advertisment_BLL ad = new Bll.Add_Advertisment_BLL();
            return ad.Approval(c,boardid);
        }
        [HttpGet]
        [Route("getadvertismentbycategoryandcity/{city}/{category}")]
        public List<AdvertisementsDTO> GetAdvertismentByCategoryAndCity([FromUri] string city, [FromUri]string category)
        {
            return Bll.AdvertismentsBLL.GetAdvertismentByCategoryAndCity(city, category);
        }

    }
}
