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

        update_gists_meta_data(function () {
            // done
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