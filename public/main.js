
$.ajax({
    url: '/newClusters.2.json',
    method: 'GET'
}).success(clusters => {
    const nodes = [];
    const edges = [];
    const pictures = {};

    clusters.forEach((cluster, idx) => {
        cluster.push({
            id: 'cluster_' + idx
        });

        cluster.forEach(user => {
            nodes.push({
                name: user.id,
            });
            
            pictures[user.id] = user.photo;
            pictures[cluster[cluster.length - 1].id] = 'http://www.citystylistapp.net/uploads/9/2/3/3/9233754/city-stylist-app-solid-white-circle_orig.png';
        });

        // console.log(nodes);

        // for (let i = 0; i < cluster.length; i++) {
            for(let j = 0; j < cluster.length; j++) {

                edges.push({
                    src: cluster[cluster.length - 1].id,
                    dest: cluster[j].id
                });
            }
        // }

   
    });
    
    startGraph(nodes, edges, pictures);
});