const fs = require('fs');
const kmeans = require('node-kmeans');

fs.readFile('new-data.json', 'utf8', (err, data) => {
    const users = JSON.parse(data);

    let allIds = [];

    users.forEach((user, idx) => {
        //let ids = [].concat(user.groups);
        let ids = [].concat(user.interests);
        user.ids = ids;
        allIds.push(...ids);
    });

    allIds = allIds.sort((a, b) => a - b);

    let uniqueIds = allIds.filter(function(item, pos) {
        return allIds.indexOf(item) == pos;
    });
    
    users.forEach(user => {
        const ids = [];

        uniqueIds.forEach(id => {
            if (user.ids.indexOf(id) !== -1) {
                ids.push(1);

            } else {
                ids.push(0);
            }
        });

        user.ids = ids;
    });


    const vectors = users.map(user => user.ids);
    const clusters = [];
    let cnt = 0;
    kmeans.clusterize(vectors, {
        k: 8
    }, (err, res) => {
        res.forEach(cluster => {
            const c = [];

            cluster.clusterInd.forEach(ind => {
                c.push(users[ind].user);    

                cnt++;
            });
            
            clusters.push(c);
        });
        console.log(cnt);
        fs.writeFileSync('clusters.json', JSON.stringify(clusters));
    });
});