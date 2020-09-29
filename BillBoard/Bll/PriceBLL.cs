using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using DTO;
namespace Bll
{
    public static class PriceBLL
    {
        static BoardDB3Entities db = new BoardDB3Entities();
        public static double CalcPrice(int num, string city, string street, int numWeek)
        {
            //כמה אחוזים הלוח שווה לפי המיקום שלט
            float precentPrice = db.Billboards.FirstOrDefault(x => x.BoardCity == city && x.BoardStreet == street).PrecentPrice;
            //שליפה של אוביקט מחיר לפי מספר היחידות
            Price p = db.Prices.FirstOrDefault(x => x.NumsUnit == num);
            // חישוב סופי של המחיר
            return (p.Price1 * precentPrice * (1 - p.PrecentDiscount)*(numWeek-1))+p.Price1 * precentPrice;
        }
        //שליפת המחירים עם כל הפרטים
        public static List<PricesDTO> GetAllPrices()
        {
            try
            {
                return PricesDTO.ListToDTO(db.Prices.ToList());
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
