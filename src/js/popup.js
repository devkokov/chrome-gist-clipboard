chrome.storage.sync.get({
    gistsMeta: {}
}, function (items) {
    const container = document.getElementById('gists');

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

                gistContainer.appendChild(gistFileButton);
            }

            userContainer.appendChild(gistContainer);
        });

        container.appendChild(userContainer);
    }
});
