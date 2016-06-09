var statusId = '';
var notifyId = '';
var spcustomization;
(function (spcustomization) {
    var FixBranding = (function () {
        function FixBranding() {
        }
        FixBranding.Init = function () {
            var newElement = document.createElement("div");
            newElement.setAttribute("class", "custmenu");
            newElement.innerHTML = "<ul>\n                                        <li><a href='#'>Home</a></li>\n                                        <li><a href='#'>My Projects</a></li>\n                                        <li><a href='#'>My Faviorte sites</a></li>\n                                    </ul>";
            var element = document.getElementById("s4-bodyContainer");
            element.insertBefore(newElement, element.firstChild);
        };
        return FixBranding;
    }());
    spcustomization.FixBranding = FixBranding;
    var Notifs = (function () {
        function Notifs() {
        }
        Notifs.AddNotification = function () {
            //notifyId = SP.UI.Notify.addNotification("Hello World!", true);
            notifyId = SP.UI.Notify.addNotification("Hello World!", false);
        };
        Notifs.RemoveNotification = function () {
            SP.UI.Notify.removeNotification(notifyId);
            notifyId = '';
        };
        Notifs.AddStatus = function () {
            statusId = SP.UI.Status.addStatus("Status good! <a href='#'>Good stuff here</a>");
            // red error message
            // yellow information
            // green Good message
            SP.UI.Status.setStatusPriColor(statusId, 'green');
        };
        Notifs.RemoveLastStatus = function () {
            SP.UI.Status.removeStatus(statusId);
            statusId = '';
        };
        Notifs.RemoveAllStatus = function () {
            SP.UI.Status.removeAllStatus(true);
        };
        return Notifs;
    }());
    spcustomization.Notifs = Notifs;
})(spcustomization || (spcustomization = {}));
_spBodyOnLoadFunctionNames.push("spcustomization.FixBranding.Init");
// html used for notifications
//<input id="Button1" type= "button" value= "Add Notification" onclick= "spcustomization.Notifs.AddNotification()" />
//    <input id="Button2" type= "button" value= "Remove Notification" onclick= "spcustomization.Notifs.RemoveNotification()" />
//        <p></p>
//        < input id= "Button3" type= "button" value= "Add Status" onclick= "spcustomization.Notifs.AddStatus()" />
//            <input id="Button4" type= "button" value= "Remove Last Status" onclick= "spcustomization.Notifs.RemoveLastStatus()" />
//                <input id="Button5" type= "button" value= "Remove All Status" onclick= "spcustomization.Notifs.RemoveAllStatus()" /> 
