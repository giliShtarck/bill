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
            using(BoardDB3Entities db2 = new BoardDB3Entities())
            {
                panel = PanelDTO.ListToDTO(db2.PanelAds.Where(x => x.BoardId == boardid && x.PanelDate == date).ToList());
                return panel;
            } 
        }
        //שליפת  לוחות לפי כתובת ותאריך
        public static List<PanelDTO> GetPanelAdByAddressAndDate(List<string> street, string city, System.DateTime date)
        {
            panel.Clear();
            List<BillboardDTO> billboardlist = BillboardBLL.GetBillBoardByCityAndArrStreet(city, street);
            List<PanelDTO> panellist = PanelDTO.ListToDTO(db.PanelAds.Where(x => x.PanelDate == date).ToList());
            if (panellist.Count == 0 || billboardlist.Count == 0) return null;
            foreach (var item in billboardlist)
            {
                foreach (var item2 in panellist)
                {
                    if (item.BoardId == item2.BoardId)
                    {
                        panel.Add(item2);
                    }
                }
            }
            var orderedList = panel.OrderBy(x => x.PanelLineStart).ThenBy(x => x.PanelColumnStart).ToList();
            var emptyAdsList = new List<PanelDTO>();
            int row = 0, col = 0;
            for (int i = 0; i < 8; i++)
            {
                bool rowIsFull = false;
                int columns = 0;
                var thisRow = orderedList.Where(a => a.PanelLineStart == i ||
                                (a.PanelLineStart <= i && a.PanelLineEnd >= i))
                   .OrderBy(x => x.PanelColumnStart).ThenBy(x => x.PanelLineStart).ToList();
                if (thisRow.Count == 0)
                {

                    for (int j = 0; j < 4; j++)
                    {
                        emptyAdsList.Add(new PanelDTO()
                        {
                            AdId = -1,
                            BoardId = orderedList.FirstOrDefault().BoardId,
                            PanelLineStart = i,
                            PanelLineEnd = i,
                            PanelColumnStart = j,
                            PanelColumnEnd = j
                        });
                    }
                    continue;
                }
                // check if need to add empty ads in the beginning of the row
                var firstColumn = thisRow.Min(a => a.PanelColumnStart);
                for (int j = 0; j < firstColumn; j++)
                {
                    emptyAdsList.Add(new PanelDTO()
                    {
                        AdId = -1,
                        BoardId = orderedList.FirstOrDefault().BoardId,
                        PanelLineStart = i,
                        PanelLineEnd = i,
                        PanelColumnStart = j,
                        PanelColumnEnd = j
                    });
                }
            
                //check if need to add empty ads in the middle of the row
                for (int j = 0; j < thisRow.Count; j++)
                {
                    columns = thisRow[j].PanelColumnEnd;
                    if (j < thisRow.Count-1)
                    { 
                        int nextColumnStart = thisRow[j + 1].PanelColumnStart; 
                        if(columns + 1 < nextColumnStart)
                        {
                            for(int k = columns+1; k < nextColumnStart; k++)
                            {
                                emptyAdsList.Add(new PanelDTO()
                                {
                                    AdId = -1,
                                    BoardId = orderedList.FirstOrDefault().BoardId,
                                    PanelLineStart = i,
                                    PanelLineEnd = i,
                                    PanelColumnStart = k,
                                    PanelColumnEnd = k
                                });
                            }
                        }
                    }
                    if (columns == 3)
                    {
                        rowIsFull = true;
                        break;
                    }
                }

                //check if need to add empty ads in the end of the row
                if (!rowIsFull)
                {
                    for (int k = columns + 1; k < 4; k++)
                    {
                        emptyAdsList.Add(new PanelDTO()
                        {
                            AdId = -1,
                            BoardId = orderedList.FirstOrDefault().BoardId,
                            PanelLineStart = i,
                            PanelLineEnd = i,
                            PanelColumnStart = k,
                            PanelColumnEnd = k
                        });
                    }
                }
            }
            orderedList.AddRange(emptyAdsList);
            return orderedList.OrderBy(x => x.PanelLineStart).ThenBy(x => x.PanelColumnStart).ToList();
        }

    }
}
