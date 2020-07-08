const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

module.exports = {
    pull_gists_metadata_for_user: function (user, callback) {
        octokit.gists.listForUser({
            username: user
        }).then((gists) => {
            let gistsMeta = {};
            gistsMeta[user] = [];
            gists.data.forEach(function (gist) {
                gistsMeta[user].push({
                    'name': gist.description,
                    'files': gist.files
                });
            });
            callback(gistsMeta);
        })
    }
};
