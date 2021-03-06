﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Dal;
using DTO;
namespace Bll
{
    public static class UsersBLL
    {
        static BoardDB3Entities db = new BoardDB3Entities();
        //הוספת לקוח למאגר
        public static bool Register(UserDTO user)
        {
            try
            {
                User u = DTO.UserDTO.ToDAL(user);
                User u2 = db.Users.FirstOrDefault(x => x.UserMail == u.UserMail);
                if (u2 == null)
                {
                    db.Users.Add(u);
                    db.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        //   שליחת מייל ללקוח ששכח סיסמא
        public static bool SendEmailMesg(string userMail)
        {
            //try
            //{
            //    MailMessage mail = new MailMessage();
            //    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            //    mail.From = new MailAddress("orgmodaonline@gmail.com");
            //    mail.To.Add(userMail);
            //    mail.Subject = subject;
            //    mail.Body = msg;
            //    SmtpServer.Port = 587;
            //    SmtpServer.Credentials = new System.Net.NetworkCredential("orgmodaonline@gmail.com", "manageronline");
            //    SmtpServer.EnableSsl = true;
            //    SmtpServer.Send(mail);
            //}
            //catch (Exception e)
            //{
            //    throw;
            //}


            try
            {
                Random r = new Random();

                string password="";
                for (int i = 0; i < 2; i++)
                {
                    password +=(char)r.Next(97, 122);
                }
                for (int i = 0; i < 6; i++)
                {
                    password += r.Next(0, 9).ToString();
                }
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("orgmodaonline@gmail.com");
                mail.To.Add(userMail);
                mail.Subject = "איפוס סיסמא";
                mail.Body = "לקוח יקר סיסמתך השתנתה. סיסמתך החדשה היא:" +password; 
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("orgmodaonline@gmail.com", "manageronline");
                SmtpServer.EnableSsl = true;
                User newuser = db.Users.FirstOrDefault(x => x.UserMail == userMail);
                if (newuser != null)
                {
                    newuser.UserPassword = password;
                    db.SaveChanges();
                    SmtpServer.Send(mail);
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        //התחברות למערכת החל מהפעם השניה
        public static UserDTO SignIn(string mail, string password)
        {
            try
            {
                User u = db.Users.FirstOrDefault(x => x.UserMail == mail
                  && x.UserPassword == password);
                if (u != null)
                    return UserDTO.convertDalToDTO(u);
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        //מחזיר מייל לקוח לפי קוד לקוח
        public static string UserMail(int userId)
        {
           return db.Users.FirstOrDefault(x => x.UserId == userId).UserMail;
        }
        // מחזיר שם לקוח לפי קוד לקוח
        public static string UserName(int userId)
        {
            return db.Users.FirstOrDefault(x => x.UserId == userId).UserName;
        }
    }
}
