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
})(spcustomization || (spcustomization = {}));
_spBodyOnLoadFunctionNames.push("spcustomization.FixBranding.Init");
//# sourceMappingURL=SPScripts.js.map