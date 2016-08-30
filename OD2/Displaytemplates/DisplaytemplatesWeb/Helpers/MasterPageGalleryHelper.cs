using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace DisplaytemplatesWeb.Helpers
{
    public class MasterPageGalleryHelper
    {
        public static void UploadDisplaytemplate(ClientContext ctx)
        {

            List list = ctx.Web.GetListByUrl("/_catalogs/masterpage");
            Folder rootFolder = list.RootFolder;
            Folder dtFolder = rootFolder.EnsureFolder("Display Templates");
            //Folder cwpFolder = dtFolder.EnsureFolder("Content Web Parts");

            //string path = HttpContext.Current.Server.MapPath("./SPContent/Item_FavoriteFood.html");

            //cwpFolder.UploadFile("Item_FavoriteFood.html", path, true);

            Folder searchFolder = dtFolder.EnsureFolder("Search");

            string path2 = HttpContext.Current.Server.MapPath("./SPContent/Item_Product.html");

            searchFolder.UploadFile("Item_Product.html", path2, true);

            string path3 = HttpContext.Current.Server.MapPath("./SPContent/Item_Product_HoverPanel.html");

            searchFolder.UploadFile("Item_Product_HoverPanel.html", path3, true);

        }

    }
}