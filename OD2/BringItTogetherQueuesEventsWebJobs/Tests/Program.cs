using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HandleEventsWebJob.Helpers;

namespace Tests
{
    class Program
    {
        static void Main(string[] args)
        {

            // HandleEventsWebJob.Helpers.InstallHelper.InstallApp("https://zalodev.sharepoint.com/sites/od2/");
            CatHelper.FeedCat("https://zalodev.sharepoint.com/sites/OD2", 1);
            Console.ReadLine();
        }
    }
}
