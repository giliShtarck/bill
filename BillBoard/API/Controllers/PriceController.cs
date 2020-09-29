using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DTO;
using Bll;
namespace API.Controllers
{
    [RoutePrefix("price")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PriceController : ApiController
    {
        [HttpGet]
        [Route("calcprice/{num}/{city}/{street}/{numWeek}")]
        public IHttpActionResult CalcPrice([FromUri] int num, [FromUri] string city, [FromUri] string street, [FromUri] int numWeek)
        {
            try
            {
                double price = PriceBLL.CalcPrice(num, city, street, numWeek);
                return Ok(price);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("getallprices")]
        public List<PricesDTO> GetAllPrices()
        {
            return PriceBLL.GetAllPrices();
        }
    }
}
