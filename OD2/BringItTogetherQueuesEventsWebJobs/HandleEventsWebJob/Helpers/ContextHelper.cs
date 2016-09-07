using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HandleEventsWebJob.Helpers
{
    public class ContextHelper
    {
        public static ClientContext GetAppOnlyContext(string siteUrl)
        {
            Uri siteUri = new Uri(siteUrl);
            // Connect to a site using an app-only token.
            string realm = TokenHelper.GetRealmFromTargetUrl(siteUri);
            var token = TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal, siteUri.Authority, realm).AccessToken;
            var ctx = TokenHelper.GetClientContextWithAccessToken(siteUrl.ToString(), token);
            return ctx;

        }
    }
}
