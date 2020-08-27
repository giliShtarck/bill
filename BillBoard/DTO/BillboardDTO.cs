using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace DTO
{
    public class BillboardDTO
    {/*תכונות של הלוחות מdal*/
        public int BoardId { get; set; }
        public string BoardStreet { get; set; }
        public string BoardCity { get; set; }
        public int PrecentPrice { get; set; }
        //from dal to dto
        public static BillboardDTO convertDalToDTO(Billboard b)
        {
            return new BillboardDTO()
            {

                BoardId = b.BoardId,
                BoardStreet = b.BoardStreet,
                BoardCity = b.BoardCity,
                PrecentPrice = b.PrecentPrice,
            };
        }
        //public BillboardDTO(Billboard b)
        //{
        //    BoardId = b.BoardId;
        //    BoardStreet = b.BoardStreet;
        //    BoardCity = b.BoardCity;
        //    PrecentPrice = b.PrecentPrice;
        //}
       
        //from dto to dal
        public static Billboard ToDal(BillboardDTO b)
        {
            return new Billboard()
            {
                BoardId = b.BoardId,
                BoardStreet = b.BoardStreet,
                BoardCity = b.BoardCity,
                PrecentPrice = b.PrecentPrice,
            };
        }
        public static List<BillboardDTO> ListToDTO(List<Dal.Billboard> lp)
        {
            List<BillboardDTO> l = new List<BillboardDTO>();
            foreach (Billboard p in lp)
            {
                BillboardDTO x = convertDalToDTO(p);
                l.Add(x);
            }
            return l;
        }
    }
}
