using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using DTO;
namespace Bll
{
    public static class CategoryBLL
    {

       
        static BoardDB3Entities db = new BoardDB3Entities();
        //שליפת כל הקטגוריות
        public static List<CategoryDTO> GetAllCategories()
        {
           return CategoryDTO.ListToDTO(db.Categories.ToList());
        }
    }
}
