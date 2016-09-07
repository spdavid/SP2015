using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;

namespace HandleEventsWebJob
{
    public class Functions
    {
        // This function will get triggered/executed when a new message is written 
        // on an Azure Queue called queue.
        public static void ProcessQueueMessage([QueueTrigger("addininstalled")] string message, TextWriter log)
        {
            // message should be in format "hosturl,appurl"
            Console.WriteLine(message);
            string[] messageArray = message.Split(",".ToCharArray());
            string hosturl = messageArray[0];
            string webServicUrl = messageArray[1];

            Helpers.InstallHelper.InstallApp(hosturl, webServicUrl);
        }

        public static void CatQueueProcessor([QueueTrigger("cataddedqueue")] string message, TextWriter log)
        {
            // message format hosturl,itemid https://zalodev.sharepoint.com/sites/OD2,2
            Console.WriteLine("Cat found in cataddedqueueu");
            string[] messageArray = message.Split(",".ToCharArray());
            string hosturl = messageArray[0];
            int catItemID = int.Parse( messageArray[1]);

            Helpers.CatHelper.FeedCat(hosturl, catItemID);


            Console.WriteLine("done cataddedqueueu");
        }
    }
}
