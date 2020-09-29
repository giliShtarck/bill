using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Cors;
using DTO;
using Newtonsoft.Json;

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
                AdvertisementsDTO ad = Bll.AdvertismentsBLL.AddAdvertisement(a);
                return Ok(ad);  // להוסיף תאריך וקוד לוח
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("sendemailmesg/{usermail}/{sub}/{msg}")]
        public IHttpActionResult SendEmailMesg([FromUri]string usermail, [FromUri] string sub, [FromUri] string msg)
        {
            try
            {
                Bll.AdvertismentsBLL.SendEmailMesg(usermail, sub, msg);
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
        [HttpGet]
        [Route("getadvertismentbycategoryandcity/{city}/{category}")]
        public List<AdvertisementsDTO> GetAdvertismentByCategoryAndCity([FromUri] string city, [FromUri]string category)
        {
            return Bll.AdvertismentsBLL.GetAdvertismentByCategoryAndCity(city, category);
        }
        [HttpPut]
        [Route("updateadviews")]
        public IHttpActionResult UpdateAdViews([FromBody]AdvertisementsDTO a)
        {
            try
            {
                Bll.AdvertismentsBLL.UpdateAdViews(a);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("updatead")]
        public IHttpActionResult UpdateAd([FromBody]AdvertisementsDTO a)
        {
            try
            {
                Bll.AdvertismentsBLL.UpdateAd(a);
                return Ok(a);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("changestatus")]
        public IHttpActionResult ChangeStatus([FromBody] AdvertisementsDTO a)
        {
            try
            {
                if (Bll.AdvertismentsBLL.ChangeStatus(a))
                    return Ok();
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [Route("deleteadvertisment/{adid}")]
        public IHttpActionResult DeleteAdvertisment([FromUri] int adid)
        {
            try
            {
                if (Bll.AdvertismentsBLL.DeleteAdvertisment(adid))
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("approval")]
        public List<DateTime>  Approval([FromBody] object []arr)
        {
           
            var advertisment = Newtonsoft.Json.JsonConvert.DeserializeObject<AdvertisementsDTO>(JsonConvert.SerializeObject(arr[0]));
            //AdvertisementsDTO a = (AdvertisementsDTO)arr[0];
            return adbll.Approval(advertisment,arr[1].ToString(),arr[2].ToString(),(bool)arr[3]);
            //return Ok();
        }
    }
}
