var statusId = '';
var notifyId = '';

namespace spcustomization {
    export class FixBranding
    {
        static Init() {
            var newElement = document.createElement("div");
            newElement.setAttribute("class", "custmenu");
            newElement.innerHTML = `<ul>
                                        <li><a href='#'>Home</a></li>
                                        <li><a href='#'>My Projects</a></li>
                                        <li><a href='#'>My Faviorte sites</a></li>
                                    </ul>`;
            var element = document.getElementById("s4-bodyContainer");
            element.insertBefore(newElement, element.firstChild);
        }
    }

    export class Notifs {

       static AddNotification() {
            //notifyId = SP.UI.Notify.addNotification("Hello World!", true);
            notifyId = SP.UI.Notify.addNotification("Hello World!", false);

        }

       static RemoveNotification() {
            SP.UI.Notify.removeNotification(notifyId);
            notifyId = '';
        }

       static AddStatus() {
           statusId = SP.UI.Status.addStatus("Status good! <a href='#'>Good stuff here</a>");
           // red error message
           // yellow information
           // green Good message
            SP.UI.Status.setStatusPriColor(statusId, 'green');
        }

       static RemoveLastStatus() {
            SP.UI.Status.removeStatus(statusId);
            statusId = '';
        }

       static RemoveAllStatus() {
            SP.UI.Status.removeAllStatus(true);
        }
    }
}

_spBodyOnLoadFunctionNames.push("spcustomization.FixBranding.Init");



// html used for notifications
//<input id="Button1" type= "button" value= "Add Notification" onclick= "spcustomization.Notifs.AddNotification()" />
//    <input id="Button2" type= "button" value= "Remove Notification" onclick= "spcustomization.Notifs.RemoveNotification()" />
//        <p></p>
//        < input id= "Button3" type= "button" value= "Add Status" onclick= "spcustomization.Notifs.AddStatus()" />
//            <input id="Button4" type= "button" value= "Remove Last Status" onclick= "spcustomization.Notifs.RemoveLastStatus()" />
//                <input id="Button5" type= "button" value= "Remove All Status" onclick= "spcustomization.Notifs.RemoveAllStatus()" />