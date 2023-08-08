const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);
    //updating
    const updatePromise = db.collection("tasks").updateMany(
      {
        completed: false,
      },
      {
        $set: {
          completed: true,
        },
      }
    );
    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    db.collection("users").insertOne(
      {
        name: "Niraj",
        age: 32,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user");
        }
        console.log(result.ops);
      }
    );
    db.collection("task").insertMany(
      {
        task: "clean the house",
        completed: true,
      },
      {
        task: "running",
        completed: true,
      },
      {
        task: "cooking",
        completed: false,
      },
      (error, result) => {
        if (error) {
          return console.log("not inserted");
        }
        console.log(result.ops);
      }
    );

    db.collection("users").findOne(
      { _id: new ObjectID("5c1113239cbfe605241f9071") },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(user);
      }
    );

    db.collection("users")
      .find({ age: 27 })
      .toArray((error, users) => {
        console.log(users);
      });

    db.collection("tasks").findOne(
      { _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") },
      (error, task) => {
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      });
  }
);
