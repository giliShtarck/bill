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
    [RoutePrefix("users")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class UserController : ApiController
    {
        [HttpPost]
        [Route("register")]
        public IHttpActionResult Register([FromBody]DTO.UserDTO user)
        //לאן חוזר ההחזרה באנגולר ומה עושים עם זה
        {
            if (Bll.UsersBLL.Register(user))
                return Ok();
            return BadRequest();
        }
        [HttpGet]
        [Route("signin/{mail}/{password}")]
        public IHttpActionResult SignIn([FromUri] string mail, [FromUri]string password)
        {
            UserDTO u = Bll.UsersBLL.SignIn(mail, password);
                if(u!=null)
                  return Ok(u);
            return BadRequest();
        }
        [HttpGet]
        [Route("sendemail/{usermail}")]
        public IHttpActionResult SendEmail([FromUri] string usermail)
        {
            
            if (Bll.UsersBLL.SendEmailMesg(usermail) == true)
                return Ok();
            return BadRequest();
        }
    }
}
