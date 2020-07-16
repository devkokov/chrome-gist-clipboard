// fetch gists meta data from github
function update_gists_meta_data(callback) {
    chrome.storage.sync.set({
        gistsMeta: {}
    }, function () {
        chrome.storage.sync.get({
            users: ''
        }, function (items) {
            if (items.users === '') {
                return;
            }

            let users = items.users.split(","),
                counter = 0;

            // fetch and store gists meta data for each user
            users.forEach(function (user) {
                github.pull_gists_metadata_for_user(user, function (userGistsMeta) {
                    chrome.storage.sync.get({
                        gistsMeta: {}
                    }, function (items) {
                        chrome.storage.sync.set({
                            gistsMeta: {...items.gistsMeta, ...userGistsMeta}
                        });
                        counter++;
                        if (counter === users.length) {
                            callback();
                        }
                    });
                });
            });
        });
    });
}
