using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using System.Threading;
using Common;

namespace AzureWebJobsStorageQueue
{
    public class Functions
    {
        // This function will get triggered/executed when a new message is written 
        // on an Azure Queue called queue.
        public static void ProcessQueueMessage([QueueTrigger("testqueue")] string message, TextWriter log)
        {
            Console.WriteLine("Job Started " + message);
            Thread.Sleep(5000);
            Console.WriteLine(message);
            //throw new Exception("exception " + message);
            Console.WriteLine("Job Ended " + message);

        }

        public static void foo([QueueTrigger("anotherqueue")] string message, TextWriter log)
        {
            Common.Entities.HockeyPlayer hp = Common.Helpers.SerializerHelper.DeSerializeObject<Common.Entities.HockeyPlayer>(message);

            Console.WriteLine(hp.name);
        }
    }
}
