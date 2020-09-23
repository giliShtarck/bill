using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using DTO;
namespace Bll
{
    //ArrangePlace

    public class Add_Advertisment_BLL
    {
        BoardDB3Entities db = new BoardDB3Entities();
        static int x = 8;
        static int y = 4;
        public DateTime date;
        private int boardId;
        int[,] mat = new int[x, y];
        //בונה שמאתחלת את המטריצה באפסים
        public Add_Advertisment_BLL()
        {
            for (int i = 0; i < x; i++)
            {
                for (int j = 0; j < y; j++)
                {
                    mat[i, j] = 0;
                }
            }
        }
        //how many neighbors are catch
        public int neighbors(int width, int height, int i, int j)
        {
            int[,] mat2 = new int[x + 2, y + 2];
            int a1=0,b1=0;
            int cnt = 0;
            for (int a = 0; a < x + 2; a++)
            {
                b1 = 0;
                for (int b = 0; b < y + 2; b++)
                {
                    if (a == 0 || b == 0 || a == x + 1 || b == y + 1)
                        mat2[a, b] = 1;
                    else
                    { 
                        mat2[a, b] = mat[a1, b1];
                        b1++;
                    }
                }
                if (a != 0)
                {
                    a1++;
                }
            }
            int i1 = i + 1, j1 = j + 1;
            for (int a = i1-1; a < i1 + height+1; a++)
            {
                for (int b = j1-1; b < j1 + width+1; b++)
                {
                    if (mat2[a, b] != 0)
                    {
                        cnt++;
                    }
                }
            }
            return cnt;
        }
        //the first method to organize the matrix
        public bool ArrangePlace(AdvertisementsDTO a, DateTime date, int boardid)
        {
            this.date = date;
            this.boardId = boardid;
            int max = 0, cnt, begin = 0, flag = 0;
            mat = BuildMat(date, boardid);
            for (int i = 0; i < x; i++)
            {
                for (int j = 0; j < y; j++)
                {
                    if (mat[i, j] == 0)
                    {
                        if (CountPlace((int)a.AdWidth, (int)a.AdHeight, i, j))
                        {
                            flag = 1;
                            cnt = neighbors((int)a.AdWidth, (int)a.AdHeight, i, j);
                            if (cnt > max)
                            {
                                max = cnt;
                                begin = i * 10 + j;
                            }

                        }
                    }
                }
            }
            if (flag == 1)
            {
                //AddAdvertismentToMat(a, begin);
                return true;
            }
            return false;
        }
        //place advertisment
        public void AddAdvertismentToMat(AdvertisementsDTO ad, int begin)
        {
            for (int a = begin / 10; a < begin / 10 + ad.AdHeight; a++)
            {
                for (int b = begin % 10; b < begin % 10 + ad.AdWidth; b++)
                {
                    mat[a, b] = ad.AdId;
                }

            }
            PanelToDal(ad.AdId, begin, (int)ad.AdHeight, (int)ad.AdWidth);
        }
        //פונקציה שממירה את המטריצה לסוג של הדל
        //add the new panel to sql
        public void PanelToDal(int AdId, int begin, int AdHeight, int AdWidth)
        {

            PanelAd p = new PanelAd()
            {
                AdId = AdId,
                BoardId = this.boardId,
                PanelColumnEnd = begin % 10 + AdWidth,
                PanelColumnStart = begin % 10,
                PanelDate = this.date,
                PanelLineEnd = begin / 10 + AdHeight,
                PanelLineStart = begin / 10
            };
            db.PanelAds.Add(p);
            db.SaveChanges();
            //for (int i = 0; i < x; i++)
            //{
            //    for (int j = 0; j < y; j++)
            //    {
            //    }
            //}
        }
        //בודק על כל מקום במטריצה אם יכול להיות שם את המודעה
        public bool CountPlace(int width, int height, int i, int j)
        {
            if (i + height > x || j + width > y)
                return false;
            for (int a = i; a < i + height; a++)
            {
                for (int b = j; b < j + width; b++)
                {
                    if (mat[a, b] != 0)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
        //פונקציה הממירה טבלת לוח מודעות למטריצה
        public int[,] BuildMat(System.DateTime date, int boardid)
        {
            List<DTO.PanelDTO> panel = PanelAdBll.GetPanelAdByBoardAndDate(boardid, date);
            foreach (var item in panel)
            {
                for (int i = item.PanelLineStart; i < item.PanelLineEnd; i++)
                {
                    for (int j = item.PanelColumnStart; j < item.PanelColumnEnd; j++)
                    {
                        mat[i, j] = item.AdId;
                    }
                }
            }
            return mat;
        }
        //פונקציה שמנסה לסדר מקום למודעה חדשה
        //פונקציה לצמצום מטריצה ע"מ לאפשר תאים  ריקים צמודים אחד לשני לחפש
        //A function to reduce a matrix by allowing empty cells adjacent to each other to search

        //בודק האם יש מקום למודעה בתאריכים הרצויים
        public List<DateTime> Approval(AdvertisementsDTO a, string city, string street)
        {
            int boardid;
            Billboard bill = db.Billboards.FirstOrDefault(x => x.BoardCity == city && x.BoardStreet == street);
            List<DateTime> listDates = new List<DateTime>();
            if (bill != null)
            {
                boardid = bill.BoardId;
                bool begin = false;
                DateTime date = (DateTime)a.AdDateBegin;
                while (date < a.AdDateEnd)
                {
                    begin = ArrangePlace(a, date, boardid);
                    if (begin == true)
                    {
                        listDates.Add(date);
                        date.AddDays(7);
                    }
                }
            }
            return listDates;
        }
    }

}
