using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
namespace DTO
{
   public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        //from dal to dto
        public static CategoryDTO convertDalToDTO(Category c)
        {
            return new CategoryDTO()
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
            };
        }


        //from dto to dal
        public static Category ToDAL(CategoryDTO c)
        {
            return new Category()
            {

                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
            };
        }
        //convert list from dal to dto
        public static List<CategoryDTO> ListToDTO(List<Category> lp)
        {
            List<CategoryDTO> l = new List<CategoryDTO>();
            foreach (Category p in lp)
            {
                CategoryDTO x = convertDalToDTO(p);
                l.Add(x);
            }
            return l;
        }

    }
}

