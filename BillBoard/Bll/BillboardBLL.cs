using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using DTO;
namespace Bll
{
    public static class BillboardBLL
    {

        static BoardDB3Entities db = new BoardDB3Entities();
        //להוסיף לוח למאגר
        public static void AddBillBoard(BillboardDTO b)
        {
            Billboard newbill = BillboardDTO.ToDal(b);
            Billboard b2 = db.Billboards.FirstOrDefault(x => x.BoardCity == b.BoardCity && x.BoardStreet == b.BoardStreet);
            if (b2 == null)
            {
                db.Billboards.Add(newbill);
                db.SaveChanges();
            }
        }
        //למחוק לוח לפי קוד מזהה
        public static bool DeleteBillBoard(string city, string street)
        {
            Billboard b = db.Billboards.FirstOrDefault(x => x.BoardCity == city && x.BoardStreet == street);
            if (b != null)
            {
                db.Billboards.Remove(b);
                db.SaveChanges();
                return true;
            }
            return false;

        }
        //לעדכן אחוזי מחיר
        public static void UpdatePrice()
        {

        }
        //שליפת כל הלוחות
        public static List<BillboardDTO> GetAllBillboards()
        {
            return BillboardDTO.ListToDTO(db.Billboards.ToList());
        }
        //שליפת לוחות לפי עיר
        public static List<BillboardDTO> GetBillBoardByCity(string city)
        {
            return BillboardDTO.ListToDTO(db.Billboards.Where(x => x.BoardCity == city).ToList());
        }

        //שליפת לוחות לפי עיר ורחוב
        public static List<BillboardDTO> GetBillBoardByCityAndStreet(string city, string street)
        {
            return BillboardDTO.ListToDTO(db.Billboards.Where(x => x.BoardCity == city && x.BoardStreet.Contains(street)).ToList());
        }
        //שליפת לוחות לפי עיר ורשימת רחובות
        public static List<BillboardDTO> GetBillBoardByCityAndArrStreet(string city, List<string> street)
        {
            List<BillboardDTO> billboard = new List<BillboardDTO>();
            BillboardDTO bill;
            foreach (var item in street)
            {
                bill = BillboardDTO.convertDalToDTO(db.Billboards.FirstOrDefault(x => x.BoardCity == city
                  && x.BoardStreet == item));
                if (bill != null)
                    billboard.Add(bill);
            }
            return billboard;
        }
        //שליפת רחובות לפי קוד עיר
        public static List<string> GetAllStreets(string city)
        {
            List<string> streets = new List<string>();
            foreach (BillboardDTO item in GetBillBoardByCity(city))
            {
                streets.Add(item.BoardStreet);
            }
            return streets;
        }

        //.....פונקציה שבודקת בשעת הוספה שאין מרחק קטן ב 10 מטר האחד מהשני 
        //בשבת הלוח מראה שבת שלום לפי getdate ובודקת בלוח שנה
        //vvלפי לוח שנה- זמני היום
        //התממשקות למזג האויר
        //add modaha

    }

}
