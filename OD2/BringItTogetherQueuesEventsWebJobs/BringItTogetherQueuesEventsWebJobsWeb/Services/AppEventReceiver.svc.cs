using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.EventReceivers;
using Microsoft.WindowsAzure.Storage.Queue;
using System.Configuration;
using Microsoft.WindowsAzure.Storage;

namespace BringItTogetherQueuesEventsWebJobsWeb.Services
{
    public class AppEventReceiver : IRemoteEventService
    {
        /// <summary>
        /// Handles app events that occur after the app is installed or upgraded, or when app is being uninstalled.
        /// </summary>
        /// <param name="properties">Holds information about the app event.</param>
        /// <returns>Holds information returned from the app event.</returns>
        public SPRemoteEventResult ProcessEvent(SPRemoteEventProperties properties)
        {
            SPRemoteEventResult result = new SPRemoteEventResult();

            //using (ClientContext clientContext = TokenHelper.CreateAppEventClientContext(properties, useAppWeb: false))
            //{
            //    if (clientContext != null)
            //    {
            //        clientContext.Load(clientContext.Web);
            //        clientContext.ExecuteQuery();
            //    }
            //}

            if (properties.EventType == SPRemoteEventType.AppInstalled)
            {
                AppInstalled(properties.AppEventProperties.HostWebFullUrl.ToString());

            }
            else if (properties.EventType == SPRemoteEventType.ItemAdded)
            {
                if (properties.ItemEventProperties.ListTitle == "Cats")
                {
                    AddCatsAddedToQueueu(properties);
                }
            }


            return result;
        }

        /// <summary>
        /// This method is a required placeholder, but is not used by app events.
        /// </summary>
        /// <param name="properties">Unused.</param>
        public void ProcessOneWayEvent(SPRemoteEventProperties properties)
        {
            throw new NotImplementedException();
        }

        private void AddCatsAddedToQueueu(SPRemoteEventProperties properties)
        {
            // get connection string from web.config
            var connString = ConfigurationManager.ConnectionStrings["AzureWebJobsStorage"].ConnectionString;

            var storageAccount = CloudStorageAccount.Parse(connString);

            // create Queue client
            var client = storageAccount.CreateCloudQueueClient();

            // get Queue reference
            var queue = client.GetQueueReference("cataddedqueue");

            // create Queue if it doesn't yet exist
            queue.CreateIfNotExists();
            string msg = string.Format("{0},{1}", properties.ItemEventProperties.WebUrl, properties.ItemEventProperties.ListItemId.ToString());

            // Create new Message
            var message = new CloudQueueMessage(msg);

            // Add / Send Message to the Queue
            queue.AddMessage(message);

        }
        private void AppInstalled(string url)
        {

            System.ServiceModel.OperationContext op = System.ServiceModel.OperationContext.Current;
            var msg = op.RequestContext.RequestMessage;
            Uri appUrl = msg.Headers.To;


            // get connection string from web.config
            var connString = ConfigurationManager.ConnectionStrings["AzureWebJobsStorage"].ConnectionString;

            var storageAccount = CloudStorageAccount.Parse(connString);

            // create Queue client
            var client = storageAccount.CreateCloudQueueClient();

            // get Queue reference
            var queue = client.GetQueueReference("addininstalled");

            // create Queue if it doesn't yet exist
            queue.CreateIfNotExists();

            
            // Create new Message
            var message = new CloudQueueMessage(url + "," + appUrl);

            // Add / Send Message to the Queue
            queue.AddMessage(message);
        }

    }
}
