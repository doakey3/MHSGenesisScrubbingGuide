window.onload = function () {
    var toc = "";
    var level = 0;

    document.getElementById("contents").innerHTML =
        document.getElementById("contents").innerHTML.replace(
            /<h([\d])>([^<]+)<\/h([\d])>/gi,
            function (str, openLevel, titleText, closeLevel) {
                // Skip malformed tags
                if (openLevel != closeLevel) {
                    return str;
                }

                var currentLevel = parseInt(openLevel, 10);

                // Handle nesting of <ul> elements based on heading levels
                if (currentLevel > level) {
                    toc += (new Array(currentLevel - level + 1)).join("<ul>");
                } else if (currentLevel < level) {
                    toc += (new Array(level - currentLevel + 1)).join("</ul>");
                }

                level = currentLevel;

                // Generate an ID for the heading based on its text
                var anchor = titleText.replace(/\s+/g, "_");

                // Add this heading to the TOC list
                toc += "<li><a href=\"#" + anchor + "\">" + titleText + "</a></li>";

                // Return a heading that is itself a link back to #toc
                return "<h" + currentLevel + " id=\"" + anchor + "\">"
                       + "<a href=\"#toc\">" + titleText + "</a>"
                       + "</h" + currentLevel + ">";
            }
        );

    // Close out remaining nested <ul> tags if needed
    if (level > 0) {
        toc += (new Array(level + 1)).join("</ul>");
    }

    // Finally insert the TOC into the page
    document.getElementById("toc").innerHTML += toc;
};
