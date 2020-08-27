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
    [RoutePrefix("category")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CategoryController : ApiController
    {

        [HttpGet]
        [Route("getallcategories")]
        public List<CategoryDTO> GetAllCategories()
        {
            return Bll.CategoryBLL.GetAllCategories();
        }
    }
}
