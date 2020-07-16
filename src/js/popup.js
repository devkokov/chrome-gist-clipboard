function display_gists() {
    chrome.storage.sync.get({
        gistsMeta: {}
    }, function (items) {
        const container = document.getElementById('gists');
        container.innerHTML = '';

        for (const [user, meta] of Object.entries(items.gistsMeta)) {
            var userContainer = document.createElement('div');
            userContainer.setAttribute('class', 'gists__user');

            var userLabel = document.createElement('div');
            userLabel.setAttribute('class', 'gists__user-label');
            userLabel.appendChild(document.createTextNode(user));

            userContainer.appendChild(userLabel);

            meta.forEach(function (gist) {
                var gistContainer = document.createElement('div');
                gistContainer.setAttribute('class', 'gists__gist');

                var gistLabel = document.createElement('p');
                gistLabel.appendChild(document.createTextNode(gist.name));
                gistContainer.appendChild(gistLabel);

                for (const [gistFileName, gistFileMeta] of Object.entries(gist.files)) {
                    var gistFileButton = document.createElement('button');
                    gistFileButton.appendChild(document.createTextNode(gistFileName));
                    gistFileButton.setAttribute('data-url', gistFileMeta.raw_url);
                    gistFileButton.addEventListener('click', function () {
                        if (copy_gist_to_clipboard(gistFileMeta.raw_url)) {
                            // todo: show feedback
                        } else {
                            // todo: show feedback
                        }
                    });

                    gistContainer.appendChild(gistFileButton);
                }

                userContainer.appendChild(gistContainer);
            });

            container.appendChild(userContainer);
        }
    });
}

function copy_gist_to_clipboard(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);

    if (xmlHttp.status !== 200) {
        return false;
    }

    try {
        navigator.clipboard.writeText(xmlHttp.responseText);
        return true;
    } catch (err) {
        return false;
    }
}

display_gists();

document.getElementById('update').addEventListener('click', function () {
    update_gists_meta_data(display_gists);
});
