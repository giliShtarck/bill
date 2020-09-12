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
            BillboardDTO billDTO;
            Billboard bill;
            foreach (var item in street)
            {
                bill = db.Billboards.FirstOrDefault(x => x.BoardCity == city && x.BoardStreet == item);
                if (bill != null)
                {
                    billDTO = BillboardDTO.convertDalToDTO(bill);
                    billboard.Add(billDTO);
                }
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
        //שליפת ערים שקימים בהם לוחות
        public static List<string> GetAllBillboardCities()
        {
            bool exsist = false;
            List<string> cityList = new List<string>();
            
            foreach (var item in db.Billboards)
            {
                foreach (var item2 in cityList)
                {
                    if (item2 == item.BoardCity)
                    {
                        exsist = true;
                        break;
                    }

                }

                if (!exsist)
                {
                    cityList.Add(item.BoardCity);
                    
                }
                exsist = false;
            }
            return cityList;
        }
    }
}
