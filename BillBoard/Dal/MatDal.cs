using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Dal
{
     static public class MatDal
    {
        static BoardDB3Entities db = new BoardDB3Entities();
        // שליפת מודעות ללוח לפי תאריך וקוד
        //static public List<PanelAd> Retrievalpanelad(int boardid, System.DateTime date)
        //{
        //    List<PanelAd> panel = new List<PanelAd>();
        //    foreach (var item in db.PanelAds.Where(x => x.BoardId == boardid && x.PanelDate == date))
        //    {
        //        panel.Add(item);
        //    }
        //    return panel;
        //}


    }
}
