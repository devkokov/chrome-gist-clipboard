// Saves options to chrome.storage
function save_options() {
    var users = document.getElementById('users').value;
    chrome.storage.sync.set({
        users: users,
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);

        update_gists_meta_data();
    });
}

// fetch gists meta data from github
function update_gists_meta_data() {
    chrome.storage.sync.set({
        gistsMeta: {}
    }, function () {
        chrome.storage.sync.get({
            users: ''
        }, function (items) {
            if (items.users === '') {
                return;
            }

            // fetch and store gists meta data for each user
            items.users.split(",").forEach(function (user) {
                github.pull_gists_metadata_for_user(user, function (userGistsMeta) {
                    chrome.storage.sync.get({
                        gistsMeta: {}
                    }, function (items) {
                        chrome.storage.sync.set({
                            gistsMeta: {...items.gistsMeta, ...userGistsMeta}
                        });
                    });
                });
            });
        });
    });
}

// Restores options from chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        users: ''
    }, function (items) {
        document.getElementById('users').value = items.users;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);