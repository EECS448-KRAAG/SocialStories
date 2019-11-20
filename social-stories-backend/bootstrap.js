const client = require('./utils/elastic-client');
const uuid = require('uuid');

console.log("Creating Fake Courses and Posts");
client.indices.create({
    index: 'course'
});

client.indices.create({
    index: 'permission'
});

client.create({
    index: 'permission',
    id: "110911772696331606638",
    body: {
        user_id: "110911772696331606638",
        permission: 2,
        name: "Grant Gollier",
        courses: []
    }
});

client.indices.create({
    index: 'eecs101'
});

client.indices.create({
    index: 'eecs168'
});

client.indices.create({
    index: 'eecs448'
});

client.create({
    index: "course",
    id: uuid.v4(),
    body: {
        "title": "EECS101"
    }
});

client.create({
    index: "course",
    id: uuid.v4(),
    body: {
        "title": "EECS168"
    }
});

client.create({
    index: "course",
    id: uuid.v4(),
    body: {
        "title": "EECS448"
    }
});

for (i = 0; i < 5; i++) {
    id = uuid.v4();
    client.create({
        index: "eecs101",
        id: id,
        body: {
            id: id,
            title: `Help Me Please: ${i}`,
            content: `This is the body of post ${i}`,
            tags: [`${i}`, 'Free']
        }
    })
}

for (i = 0; i < 5; i++) {
    id = uuid.v4();
    client.create({
        index: "eecs168",
        id: id,
        body: {
            id: id,
            title: `Help Me Please: ${i}`,
            content: `This is the body of post ${i}`,
            tags: [`${i+5}`, "C++"]
        }
    })
}

for (i = 0; i < 5; i++) {
    id = uuid.v4();
    client.create({
        index: "eecs448",
        id: id,
        body: {
            id: id,
            title: `Help Me Please: ${i}`,
            content: `This is the body of post ${i}`,
            tags: [`${i+10}`, "Unity"]
        }
    })
}    
