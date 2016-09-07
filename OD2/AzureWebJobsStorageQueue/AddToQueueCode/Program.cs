using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Queue;
using System.Configuration;

namespace AddToQueueCode
{
    class Program
    {
        static void Main(string[] args)
        {
            AddMessageToQueue("davis message from console");
        }

        static void AddMessageToQueue(string newMessage)
        {
            
            var connString = ConfigurationManager.ConnectionStrings["AzureWebJobsStorage"].ConnectionString;

            var storageAccount = CloudStorageAccount.Parse(connString);

            // create Queue client
            var client = storageAccount.CreateCloudQueueClient();

            // get Queue reference
            var queue = client.GetQueueReference("anotherqueue");

            // create Queue if it doesn't yet exist
            queue.CreateIfNotExists();

            Common.Entities.HockeyPlayer hp;
            hp.id = 1;
            hp.name = "David";
            hp.position = "Goalie";
            // {id = 1, name = "David", position = "Goalie"}
           string aMessage = Common.Helpers.SerializerHelper.SerializeObject<Common.Entities.HockeyPlayer>(hp);

            // Create new Message
            var message = new CloudQueueMessage(aMessage);

            // Add / Send Message to the Queue
            queue.AddMessage(message);

        }
    }
}
