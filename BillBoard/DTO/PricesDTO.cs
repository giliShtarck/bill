using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace DTO
{
    public class PricesDTO
    {
        //תכונות של מחירים למודעה מה-dal
        public int PriceId { get; set; }
        public int NumsUnit { get; set; }
        public double PrecentDiscount { get; set; }
        public double Price { get; set; }
        //from dal to dto
        public static PricesDTO convertDalToDTO(Price p)
        {
            return new PricesDTO()
            {
                PriceId = p.PriceId,
                NumsUnit = p.NumsUnit,
                PrecentDiscount = p.PrecentDiscount,
                Price = p.Price1
            };
        }
        //from dto to dal
        public static Price ToDal(PricesDTO p)
        {
            return new Price()
            {
                PriceId = p.PriceId,
                NumsUnit = p.NumsUnit,
                PrecentDiscount = p.PrecentDiscount,
                Price1 = p.Price
            };
        }

        //from dal-list to dto -list
        public static List<PricesDTO> ListToDTO(List<Dal.Price> lp)
        {
            List<PricesDTO> l = new List<PricesDTO>();
            foreach (Price p in lp)
            {
                PricesDTO x =convertDalToDTO(p);
                l.Add(x);
            }
            return l;
        }
    }
}
