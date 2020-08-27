using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using DTO;
namespace Bll
{
    public static class PanelAdBll
    {
        static BoardDB3Entities db = new BoardDB3Entities();
        public static List<PanelDTO> panel = new List<PanelDTO>();
       
        // שליפת מודעות ללוח לפי תאריך וקוד
        public static List<PanelDTO> GetPanelAdByBoardAndDate(int boardid, System.DateTime date)
        {

            panel = PanelDTO.ListToDTO(db.PanelAds.Where(x => x.BoardId == boardid && x.PanelDate == date).ToList());
            return panel;
        }
        //שליפת  לוחות לפי כתובת ותאריך
        public static List<PanelDTO> GetPanelAdByAddressAndDate(List<string> street, string city, System.DateTime date)
        {
            List<BillboardDTO> billboardlist = BillboardBLL.GetBillBoardByCityAndArrStreet(city, street);
            List<PanelDTO> panellist = PanelDTO.ListToDTO(db.PanelAds.Where(x => x.PanelDate == date).ToList());
            foreach (var item in billboardlist)
            {
                foreach (var item2 in panellist)
                {
                    if (item.BoardId == item2.BoardId)
                    {
                        panel.Add(item2);
                        break;
                    }
                }
            }
            return panel;
        }
    }
}
