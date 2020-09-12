using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [RoutePrefix("billboard")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BillBOardController : ApiController
    {
        [HttpPost]
        [Route("addbillboard")]
        public IHttpActionResult AddBillBoard([FromBody] BillboardDTO b)
        {           
            try
            {                
                Bll.BillboardBLL.AddBillBoard(b);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [Route("deletebillboard/{city}/{street}")]
        public IHttpActionResult DeleteBillBoard([FromUri]string city, [FromUri]string street)
        {

            if (Bll.BillboardBLL.DeleteBillBoard(city, street))
                return Ok();
            return BadRequest();
        }
        [HttpGet]
        [Route("getallbillboards")]
        public List<BillboardDTO> GetAllBillboards()
        { 
            return Bll.BillboardBLL.GetAllBillboards();
        }
        [HttpGet]
        [Route("getbillboardbycity/{city}")]
        public List<BillboardDTO> GetBillBoardByCity([FromUri]string city)
        {
            return Bll.BillboardBLL.GetBillBoardByCity(city);
        }
        [HttpGet]
        [Route("getbillboardbycityandstreet/{city}/{street}")]
        public List<BillboardDTO> GetBillBoardByCityAndStreet([FromUri]string city, [FromUri] string street)
        {
            return Bll.BillboardBLL.GetBillBoardByCityAndStreet(city, street);
        }
        [HttpGet]
        [Route("getallstreets/{city}")]
        public List<string> GetAllStreets([FromUri]string city)
        {
            return Bll.BillboardBLL.GetAllStreets(city);
        }
        [HttpGet]
        [Route("getbillboardbycityandarrstreet/{city}/{street}")]
        public List<BillboardDTO> GetBillBoardByCityAndArrStreet([FromUri] string city, [FromUri]List<string> street)
        {
            return Bll.BillboardBLL.GetBillBoardByCityAndArrStreet(city, street);
        }
        [HttpGet]
        [Route("getallbillboardcities")]
        public List<string> GetAllBillboardCities()
        {
            return Bll.BillboardBLL.GetAllBillboardCities();
        }
    }
}

