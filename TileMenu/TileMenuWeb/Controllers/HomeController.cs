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

                    ctx.Site.AddJsLink("tilescript", rootAppUrl + "/scripts/tiles.js", 0);


                    string addInScript = @"     
                                       var _TileInfo;
                                        function initTilesApp() {
                                            _TileInfo = new TileMenu.AddInInfo('" + rootAppUrl +  @"');     
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
