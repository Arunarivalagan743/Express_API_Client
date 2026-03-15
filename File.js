const fs = require("fs");

fs.mkdir("../NodeHttp/fileMode", { recursive: true }, (err) => {
  if (err) return console.log(err.message);

  console.log("folder ready");

  fs.writeFile(
    "../NodeHttp/fileMode/dat.txt",
    "I am from file moduledfghjk",
    { flag: "wx" },
    (err) => {

      if (err) {
        console.log("File already exists. Not overwriting.");
      } else {
        console.log("file created");
      }

      // Append content
      fs.appendFile("../NodeHttp/fileMode/dat.txt", "\nThis is new content", (err) => {
        if (err) return console.log(err.message);

        console.log("Content added successfully");

        // Read file after append
        fs.readFile("../NodeHttp/fileMode/dat.txt", "utf8", (err, data) => {
          if (err) console.log(err.message);
          else console.log("File contents:\n", data);
        });

      });

    }
  );
});