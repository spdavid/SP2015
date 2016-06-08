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
}

_spBodyOnLoadFunctionNames.push("spcustomization.FixBranding.Init");



