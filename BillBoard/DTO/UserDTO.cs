using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace DTO
{
    public class UserDTO
    {
        //כל התכונת מהדל ללא קשרי גומלין
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserMail { get; set; }
        public string Userphone { get; set; }
        public string Userpassword { get; set; }
        public bool IsManager { get; set; }

        //מקבל מסוג מחלקת דל ומבצע המרה
        public static UserDTO convertDalToDTO(User u)
        {
            return new UserDTO()
            {
                UserId = u.UserId,
                UserName = u.UserName,
                UserMail = u.UserMail,
                Userphone = u.Userphone,
                Userpassword = u.UserPassword,
                IsManager = u.IsManager
            };
        }

        //from dto to dal
        public static User ToDAL(UserDTO u)
        {
            return new User()
            {
                UserId = u.UserId,
                UserName = u.UserName,
                UserMail = u.UserMail,
                Userphone = u.Userphone,
                UserPassword = u.Userpassword,
                IsManager = u.IsManager
            };
        }
        public static List<UserDTO> ListToDTO(List<Dal.User> lp)
        {
            List<UserDTO> l = new List<UserDTO>();
            foreach (User p in lp)
            {
                UserDTO x = convertDalToDTO(p);
                l.Add(x);
            }
            return l;
        }

    }
}
