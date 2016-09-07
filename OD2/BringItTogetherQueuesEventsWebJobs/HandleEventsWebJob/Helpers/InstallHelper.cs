using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandleEventsWebJob.Helpers
{
    public class InstallHelper
    {
        public static void InstallApp(string hostUrl, string webServicUrl)
        {
            using (ClientContext ctx = ContextHelper.GetAppOnlyContext(hostUrl))
            {
                Console.WriteLine("Installing app for " + hostUrl);
                if (!ctx.Web.ListExists("Cats"))
                {
                    Console.WriteLine("Creating Cats List : " + hostUrl);
                    ctx.Web.CreateList(ListTemplateType.GenericList, "Cats", false);
                }

                List list = ctx.Web.GetListByTitle("Cats");
                list.AddRemoteEventReceiver("CatsAdded", webServicUrl, EventReceiverType.ItemAdded, EventReceiverSynchronization.Synchronous, true);
            } 
        }
    }
}
