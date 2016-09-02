using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client.Publishing;
using Microsoft.SharePoint.Client.WebParts;



namespace ProvisioningArtifacts.Helpers
{
    class ArtifactProvisioningHelper
    {
        public static void ImportSearchConfig(ClientContext ctx)
        {
            // make sure you edit your file properties and set "Copy to ouptup directory = if newer"
            string completeFilePath = Environment.CurrentDirectory + @"\SPContent\SearchConfigurationGood.xml";
            ctx.ImportSearchSettings(completeFilePath, Microsoft.SharePoint.Client.Search.Administration.SearchObjectLevel.SPSite);
        }

        public static void CreatePage(ClientContext ctx)
        {
            ctx.Web.AddPublishingPage("HomePage.aspx", "WelcomeSplash", "Home Page", true);
            ctx.Web.SetHomePage("Pages/HomePage.aspx");

        }

        public static void AddWebPartsToPage(ClientContext ctx)
        {
           PublishingPage page = ctx.Web.GetPublishingPage("HomePage.aspx");
           File file =  page.ListItem.File;
           LimitedWebPartManager lwpm = file.GetLimitedWebPartManager(Microsoft.SharePoint.Client.WebParts.PersonalizationScope.Shared);
           WebPartDefinition webDef = lwpm.ImportWebPart(WebPartStrings.ProductSearchWP);
           lwpm.AddWebPart(webDef.WebPart, "TopZone", 1);
           ctx.ExecuteQuery();
           
        }
    }
}
