using CredentialManagement;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace ProvisioningArtifacts.Helpers
{
    public class CredentialHelper
    {

        public static UserPass GetCredentials(string CredentialName)
        {
            var cm = new Credential { Target = CredentialName };
            if (!cm.Exists())
                return null;

            cm.Load();
            var up = new UserPass(cm);
            return up;
        }

        public static bool SetCredentials(UserPass up, string CredentialName)
        {
            var cm = new Credential { Target = CredentialName, PersistanceType = PersistanceType.Enterprise, Username = up.UserName, Password = up.Password };
            return cm.Save();
        }

        public static void RemoveCredentials(string CredentialName)
        {
            var cm = new Credential { Target = CredentialName };
            cm.Delete();

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




            ClientContext ctx = new ClientContext(webUrl);
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

    public class UserPass
    {
        public UserPass()
        {
        }
        public UserPass(Credential cm)
        {
            UserName = cm.Username;
            Password = cm.Password;
        }

        public string UserName { get; set; }
        public string Password { get; set; }

    }
}
