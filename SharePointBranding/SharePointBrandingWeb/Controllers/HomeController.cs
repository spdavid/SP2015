using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OfficeDevPnP.Core;

namespace SharePointBrandingWeb.Controllers
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

                    // change alternate css of page. to point to our file in our provider hosted add-in
                    ctx.Web.AlternateCssUrl = rootAppUrl + "/Content/sharepointstyles.css";
                    ctx.Web.Update();
                    ctx.ExecuteQueryRetry();

                    ctx.Web.AddJsLink("spscript", rootAppUrl + "/scripts/spscripts.js", 0);


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
