using CredentialManagement;
using System;
using System.Collections.Generic;
using System.Linq;
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
