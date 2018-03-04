const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    const users = JSON.parse(data);
    const interests = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const INTERESTS_MAX_NUMBER = interests.length;
    const INTERESTS_MIN_NUMBER = 0; 

    for (let user of users) {
        const userNumberOfInterests = Math.floor(Math.random() * (INTERESTS_MAX_NUMBER - INTERESTS_MIN_NUMBER));
        const interestsCopy = interests.slice();
        const userInterests = [];

        for (let i = 0; i < userNumberOfInterests; i++) {
            const idx = Math.floor(Math.random() * interestsCopy.length);
            userInterests.push(interestsCopy.splice(idx, 1)[0]);
        }

        user.interests = userInterests.sort((a, b) => {
            return a - b;
        });

        fs.writeFileSync('new-data.json', JSON.stringify(users));
    }
});