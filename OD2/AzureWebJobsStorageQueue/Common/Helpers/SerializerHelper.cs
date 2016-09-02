using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Helpers
{
    public class SerializerHelper
    {
        public static string SerializeObject<T>(T messageObject)
         where T : struct
        {
            // Create a message and add it to the queue.
           return JsonConvert.SerializeObject(messageObject);
           
        }

        public static T DeSerializeObject<T>(string messageObject)
        where T : struct
        {
            // Create a message and add it to the queue.
            return JsonConvert.DeserializeObject<T>(messageObject);

        }
    }
}
