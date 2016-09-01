using Microsoft.SharePoint.Client;
using ProvisioningArtifacts.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using ProvisioningArtifacts.Helpers;

namespace ProvisioningArtifacts
{
    class Program
    {
        static void Main(string[] args)
        {
            using (ClientContext ctx = CredentialHelper.GetContext("https://zalodev.sharepoint.com/sites/OD2", "david@zalodev.com"))
            {
                Web web = ctx.Web;
                ctx.Load(web);
                ctx.ExecuteQuery();
                //ArtifactProvisioningHelper.ImportSearchConfig(ctx);
                // ArtifactProvisioningHelper.CreatePage(ctx);
                 ArtifactProvisioningHelper.AddWebPartsToPage(ctx);

                Console.WriteLine(web.Title);
            }

            Console.WriteLine("Done");
            Console.ReadLine();
          

        }

        
    }
}
