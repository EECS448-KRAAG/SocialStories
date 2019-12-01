const client = require("./utils/elastic-client");
const uuid = require("uuid");
const data = require("./data");

async function createCourse(title) {
  const id = uuid.v4();
  const course_title = title.toLowerCase();

  const existing_courses = await client.search({
    index: "course",
    body: {
      query: {
        term: {
          title: course_title
        }
      }
    }
  });

  if (existing_courses.body.hits.hits.length !== 0) {
    return;
  } else {
    await client.indices.create({
      index: course_title
    });
    await client.create({
      index: "course",
      type: "_doc",
      id: id,
      body: {
        title: course_title,
        id: id
      }
    });
    return;
  }
}

console.log("Creating Fake Courses and Posts");

async function generateData() {
  await client.indices.create({
    index: "course"
  });
  
  await client.indices.create({
    index: "permission"
  });
  
  await client.create({
    index: "permission",
    id: "110911772696331606638",
    body: {
      user_id: "110911772696331606638",
      permission: 2,
      name: "Grant Gollier",
      courses: []
    }
  });
  for (post of data) {
    try {
      await createCourse(post.Course);
    } catch(e) {
      console.log("Duplicated Course, it's chill");
    }
    const id = uuid.v4();
    await client.create({
      index: post.Course.toLowerCase(),
      id: id,
      body: {
        id: id,
        title: post.Title,
        content: post.Content,
        tags: post.Tags.split(","),
        flagged: false
      }
  });
  }
}

generateData().then(console.log("Done!")).catch(console.error("We chill"));
