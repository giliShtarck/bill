using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using Bll;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [RoutePrefix("panelad")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PanelAdController : ApiController
    {
        [HttpGet]
        [Route("getpaneladbyboardanddate/{boardid}/{date}")]
        public List<PanelDTO> GetPanelAdByBoardAndDate([FromBody]int boardid, [FromBody]DateTime date)
        {
            return Bll.PanelAdBll.GetPanelAdByBoardAndDate(boardid, date);
        }
        [HttpPost]
        [Route("addNewAdvertisment/{boardid}/{date}")]
        public bool AddNewAdvertisment(AdvertisementsDTO a, DateTime date, int boardid ,bool istocheck)
        {
            Add_Advertisment_BLL ab = new Add_Advertisment_BLL();
            return ab.ArrangePlace(a, date, boardid,istocheck);
        }
        [HttpGet]
        [Route("getpaneladbyaddressanddate/{street}/{city}/{date}")]
        public List<PanelDTO> GetPanelAdByAddressAndDate([FromUri]string street, [FromUri]string city, [FromUri]DateTime date)
        {
            
            return PanelAdBll.GetPanelAdByAddressAndDate(street, city, date);
        }
    }
}
