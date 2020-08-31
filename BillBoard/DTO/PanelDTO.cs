using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace DTO
{
    public class PanelDTO
    {
        public int BoardId { get; set; }
        public int AdId { get; set; }
        public System.DateTime PanelDate { get; set; }
        public int PanelLineStart { get; set; }
        public int PanelLineEnd { get; set; }
        public int PanelColumnStart { get; set; }
        public int PanelColumnEnd { get; set; }

        //from dal to dto

        public static PanelDTO convertDalToDTO(PanelAd p)
        {
            return new PanelDTO()
            {
                BoardId = p.BoardId,
                AdId = p.AdId,
                PanelDate = p.PanelDate,
                PanelLineStart = p.PanelLineStart,
                PanelLineEnd = p.PanelLineEnd,
                PanelColumnStart = p.PanelColumnStart,
                PanelColumnEnd = p.PanelColumnEnd
            };
        }
        //from dto to dal
        public static PanelAd ToDal(PanelDTO p)
        {
            return new PanelAd()
            {
                BoardId = p.BoardId,
                AdId = p.AdId,
                PanelDate = p.PanelDate,
                PanelLineStart = p.PanelLineStart,
                PanelLineEnd = p.PanelLineEnd,
                PanelColumnStart = p.PanelColumnStart,
                PanelColumnEnd = p.PanelColumnEnd
            };
        }
        //convert list from dal to dto
        public static List<PanelDTO> ListToDTO(List<PanelAd> lp)
        {
            List<PanelDTO> l = new List<PanelDTO>();
            foreach (PanelAd p in lp)
            {
                PanelDTO x = convertDalToDTO(p);
                l.Add(x);
            }
            return l;
        }
    }
}
