using Dal;
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
            return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(a => a.AdUserId == userid && a.AdStatus == true).ToList());
        }
        //כל המודעות
        public static List<AdvertisementsDTO> GetAllAdvertisements()
        {

            return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(a => a.AdStatus == true&& a.AdDateBegin != null ).ToList());
        }
        //חיפוש מודעה לפי קטגוריה 
        public static List<AdvertisementsDTO> GetAdvertismentByCategory(string category)
        { 
            return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(x => x.Category.CategoryName == category && x.AdStatus == true
            && x.AdDateBegin != null ).ToList());
        }
        //עדכון מספר צפיות למודעה
        public static void UpdateAdViews(AdvertisementsDTO a)
        {
            Advertisement ad = db.Advertisements.FirstOrDefault(x => x.AdId == a.AdId);
            ad.AdViews = ad.AdViews + 1;
            db.SaveChanges();
        }
        //עידכון מודעה 
        public static void UpdateAd(AdvertisementsDTO a)
        {
            Advertisement ad = db.Advertisements.FirstOrDefault(x => x.AdId == a.AdId);
            ad.AdHeight = a.AdHeight;
            ad.AdWidth = a.AdWidth;
            ad.AdDateBegin = a.AdDateBegin;
            ad.AdDateEnd = a.AdDateEnd;
            ad.AdCategory = a.AdCategory;
            db.SaveChanges();
        }
        //כל המודעות לפי חודשים
        //public static List<AdvertisementsDTO> GetAdvertisementsByDate(DateTime date)
        //{
        //    return AdvertisementsDTO.ListToDTO(db.Advertisements.Where(a => a.AdDateBegin.Month >= date.Month && a.AdDateEnd.Month <= date.Month &&
        //     a.AdDateBegin.y >= date.Year && a.AdDateEnd.Year <= date.Year && a.AdStatus == true).ToList());

        //הוספת מודעה
        public static bool AddAdvertisement(AdvertisementsDTO ad)
        {
            Advertisement advertisement = db.Advertisements.FirstOrDefault(x => x.AdFiles == ad.AdFiles);
            if (advertisement == null)
            {
                Advertisement a = AdvertisementsDTO.ToDAL(ad);
                db.Advertisements.Add(a);
                db.SaveChanges();
                return true;
            }
            return false;
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
                SmtpServer.Send(mail);
            }
            catch (Exception e)
            {
                throw;
            }
        }
        //משנה סטטוס של מודעה שאושרה
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
                        if (item.PanelDate < DateTime.Today)
                            l3.Add(add);
                    }
                }
            }
            return l3;
        }
        //מחיקת מודעה שלא אושרה
        public static bool DeleteAdvertisment(int AdId)
        {

            Advertisement ad = db.Advertisements.FirstOrDefault(x => x.AdId == AdId);
            if (ad != null)
            {
                db.Advertisements.Remove(ad);
                db.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
