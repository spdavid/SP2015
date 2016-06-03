using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OfficeDevPnP.Core;

namespace TileMenuWeb.Controllers
{
    public class HomeController : Controller
    {
        [SharePointContextFilter]
        public ActionResult Index()
        {
            User spUser = null;

            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext);

            using (var ctx = spContext.CreateUserClientContextForSPHost())
            {
                if (ctx != null)
                {
                    spUser = ctx.Web.CurrentUser;

                    ctx.Load(spUser, user => user.Title);

                    ctx.ExecuteQuery();

                    ViewBag.UserName = spUser.Title;

                    Uri appUrl = Request.Url;
                    string rootAppUrl = appUrl.Scheme + "://" + appUrl.Authority;
                    // ctx.Site.AddJsLink("DAHCORE", rootAppUrl + "/scripts/DAH/Core.js", 0);

                    // this removes your scripts from sharepoint
                    //ctx.Site.DeleteJsLink("tilescript");
                    //ctx.Site.DeleteJsLink("AddInInfoScript");

                    // inject our script into sharepoint
                    // https://server/scripts/tiles.js
                    // tilescript is the key. When the fuction runs again
                    // it will remove and readd the script link
                    ctx.Site.AddJsLink("tilescript", rootAppUrl + "/scripts/tiles.js", 0);



                    // if you want to add a block of script you use the below. 
                    // instead of your js file you have a string of javascript added
                    string addInScript = @"     
                                       var _TileInfo;
                                        function initTilesApp() {
                                            _TileInfo = new TileMenu.AddInInfo('" + rootAppUrl + @"');     
                                        }
                                            _spBodyOnLoadFunctionNames.push('initTilesApp');

                                            ";

                    ctx.Site.AddJsBlock("AddInInfoScript", addInScript, 1);


                }
            }

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
