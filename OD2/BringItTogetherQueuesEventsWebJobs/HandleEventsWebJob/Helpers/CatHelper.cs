using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandleEventsWebJob.Helpers
{
    public class CatHelper
    {
        public static void FeedCat(string hosturl, int itemid)
        {
            using (ClientContext ctx = ContextHelper.GetAppOnlyContext(hosturl))
            {
                List list = ctx.Web.GetListByTitle("Cats");
                ListItem item = list.GetItemById(itemid);
                ctx.Load(item, i=> i["Title"]);
                ctx.ExecuteQuery();

                ctx.Web.Title = "Cat Added : " + item["Title"].ToString();
                ctx.Web.Update();
                ctx.ExecuteQuery();


            }
        }
    }
}
