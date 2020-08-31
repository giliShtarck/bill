using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AdvertisementsDTO
    {
        public int AdId { get; set; }
        public Nullable<int> AdCategory { get; set; }
        public Nullable<System.DateTime> AdDateRequest { get; set; }
        public Nullable<System.DateTime> AdDateBegin { get; set; }
        public Nullable<System.DateTime> AdDateEnd { get; set; }
        public Nullable<int> AdHeight { get; set; }
        public Nullable<int> AdWidth { get; set; }
        public int AdUserId { get; set; }
        public string AdFiles { get; set; }
        public Nullable<int> AdViews { get; set; }
        public bool AdStatus { get; set; }
        //From DAL to DTO
        public static AdvertisementsDTO convertDalToDTO(Advertisement a)
        {
            return new AdvertisementsDTO()
            {
                AdId = a.AdId,
                AdDateRequest = a.AdDateRequest,
                AdDateBegin = a.AdDateBegin,
                AdDateEnd = a.AdDateEnd,
                AdHeight = a.AdHeight,
                AdWidth = a.AdWidth,
                AdUserId = a.AdUserId,
                AdFiles = a.AdFiles,
                AdViews = a.AdViews,
                AdCategory = a.AdCategory,
                AdStatus = a.AdStatus,
            };
        }
        //from dto to dal
        public static Advertisement ToDAL(AdvertisementsDTO ad)
        {
            return new Advertisement()
            {
                AdId = ad.AdId,
                AdDateRequest = ad.AdDateRequest,
                AdDateBegin = ad.AdDateBegin,
                AdDateEnd = ad.AdDateEnd,
                AdHeight = ad.AdHeight,
                AdWidth = ad.AdWidth,
                AdUserId = ad.AdUserId,
                AdFiles = ad.AdFiles,
                AdViews = ad.AdViews,
                AdCategory = ad.AdCategory,
                AdStatus = ad.AdStatus,

            };
        }
        //ממיר מערך מדל לדטו
        public static List<AdvertisementsDTO> ListToDTO(List<Dal.Advertisement> lp)
        {
            List<AdvertisementsDTO> l = new List<AdvertisementsDTO>();
            foreach (Advertisement p in lp)
            {
                AdvertisementsDTO x = convertDalToDTO(p);
                l.Add(x);
            }
            return l;
        }
    }
}
