﻿using Dal;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
namespace Bll
{
    public static class AdvertismentsBLL
    {

        public static BoardDB3Entities db = new BoardDB3Entities();
        //מודעה אחרונה לפי קוד משתמש
        public static AdvertisementsDTO GetLastAdvertisementByUser(int userid)
        {
            return DTO.AdvertisementsDTO.convertDalToDTO(db.Advertisements.OrderBy(a => a.AdDateEnd).Last(a => a.AdUserId == userid));
        }
        //כל המודעות לפי קוד משתמש
        public static List<AdvertisementsDTO> GetAllAdvertisementsForUser(int userid)
        {
            return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(a => a.AdUserId == userid).ToList());

        }
        //כל המודעות
        public static List<AdvertisementsDTO> GetAllAdvertisements()
        {
            return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(a => a.AdStatus == true).ToList());

        }
        //חיפוש מודעה לפי קטגוריה 
        public static List<AdvertisementsDTO> GetAdvertismentByCategory(string category)
        {
            return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(x => x.Category.CategoryName == category && x.AdStatus == true).ToList());

        }
        //עדכון מודעה
        //החזרת מודעה לפי קטגוריה מסוימת



        //כל המודעות לפי חודשים
        //public static List<AdvertisementsDTO> GetAdvertisementsByDate(DateTime date)
        //{
        //    return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(a => a.AdDateBegin.Month >= date.Month && a.AdDateEnd.Month <= date.Month &&
        //     a.AdDateBegin.y >= date.Year && a.AdDateEnd.Year <= date.Year && a.AdStatus == true).ToList());
        
        //הוספת מודעה
        public static void AddAdvertisement(AdvertisementsDTO ad)
        {
            db.Advertisements.Add(AdvertisementsDTO.ToDAL(ad));
            db.SaveChanges();
        }
        // מחזיר את  רשימת המודעות הממתינות לאישור
        public static List<AdvertisementsDTO> GetAllFalseAdvertisments()
        {
            try
            {
                return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(x => x.AdStatus == false).ToList());
            }
            catch (Exception e)
            {
                throw new Exception();
            }
        }
        //שליחת מייל ללקוח
        public static void SendEmailMesg(string userMail, string subject, string msg)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("orgmodaonline@gmail.com");
                mail.To.Add(userMail);
                mail.Subject = subject;
                mail.Body = msg;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("orgmodaonline@gmail.com", "manageronline");
                SmtpServer.EnableSsl = true;
            }
            catch (Exception e)
            {
                throw;
            }
        }
        //משנה סטטוס של מודעה שמאושרת
        public static bool ChangeStatus(AdvertisementsDTO a)
        {
            try
            {
                Advertisement newad = db.Advertisements.FirstOrDefault(x => x.AdId == a.AdId);
                if (newad != null)
                {
                    newad.AdStatus = true;
                    db.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }

        }
        //שליפת מודעות לפי קטגוריה ועיר
        public static List<AdvertisementsDTO> GetAdvertismentByCategoryAndCity(string city, string category)
        {
            List<AdvertisementsDTO> l1 = AdvertismentsBLL.GetAdvertismentByCategory(category);
            List<BillboardDTO> l2 = BillboardBLL.GetBillBoardByCity(city);
            List<AdvertisementsDTO> l3 = new List<AdvertisementsDTO>();
            foreach (var item in db.PanelAds)
            {
                var add = l1.FirstOrDefault(x => x.AdId == item.AdId);
                if (add != null)
                {
                    var bill = l2.FirstOrDefault(x => x.BoardId == item.BoardId);
                    if (bill != null)
                    {
                        if (add.AdDateBegin < DateTime.Today)
                            l3.Add(add);
                    }
                }
            }
            return l3;
        }
    }
}
