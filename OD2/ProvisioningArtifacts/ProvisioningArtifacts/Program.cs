using Microsoft.SharePoint.Client;
using ProvisioningArtifacts.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace ProvisioningArtifacts
{
    class Program
    {
        static void Main(string[] args)
        {
            using (ClientContext ctx = GetContext("https://zalodev.sharepoint.com/sites/OD2", "david@zalodev.com"))
            {
                Web web = ctx.Web;
                ctx.Load(web);
                ctx.ExecuteQuery();

                Console.WriteLine(web.Title);
            }

            Console.WriteLine("Done");
            Console.ReadLine();
          

        }

        public static ClientContext GetContext(string webUrl, string username)
        {
            string userName = username;
            string password = "";
            UserPass userinfo = Helpers.CredentialHelper.GetCredentials("zalodevcreds");
            if (userinfo == null)
            {
                Console.WriteLine("User: " + userName + "\r\n");
                password = GetPassword(); 
                Helpers.CredentialHelper.SetCredentials(new UserPass() { UserName = username, Password = password }, "zalodevcreds");
            }
            else
            {
                password = userinfo.Password;
                username = userinfo.UserName;

            }

            var secure = new SecureString();
            foreach (char c in password)
            {
                secure.AppendChar(c);
            }

  


            ClientContext ctx =  new ClientContext(webUrl);
            ctx.Credentials = ctx.Credentials = new SharePointOnlineCredentials(userName, secure);
            return ctx;


        }

        public static string GetPassword()
        {
            string pass = "";
            Console.Write("Enter your password: ");
            ConsoleKeyInfo key;

            do
            {
                key = Console.ReadKey(true);

                // Backspace Should Not Work
                if (key.Key != ConsoleKey.Backspace)
                {
                    pass += key.KeyChar;
                    Console.Write("*");
                }
                else
                {
                    Console.Write("\b");
                }
            }
            // Stops Receving Keys Once Enter is Pressed
            while (key.Key != ConsoleKey.Enter);


            return pass.TrimEnd("\r".ToCharArray());
        }
    }
}
