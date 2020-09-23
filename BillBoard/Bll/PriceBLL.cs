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
        public static int CalcPrice(int num)
        {
            return int.Parse(db.Prices.First(a => a.NumsUnit == num).ToString());
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
