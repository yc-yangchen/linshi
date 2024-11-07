const https = require("https");
const fs = require("fs");
const path = require("path");

const levels = [
  "/assets/resources/native/f9/f92c957c-ad47-4e23-b122-d118cd6dd3c1.png",
  "/assets/resources/native/f9/f92c957c-ad47-4e23-b122-d118cd6dd3c1.png",
  "/assets/resources/native/f9/f92c957c-ad47-4e23-b122-d118cd6dd3c1.png",
  "/assets/resources/native/f9/f92c957c-ad47-4e23-b122-d118cd6dd3c1.png",
];


// let uniqueArr = [...new Set(levels)];

const baseUrl =
  "https://html5.gamedistribution.com/rvvASMiM/a186dc9ac7f548f884db8ff54df6dd9f";
function downloadFile(level) {
  const arr = level.split("/");
  const filename = arr.pop();
  console.log(filename, 333);
  const dir = arr.join("/");
  const downloadDir = path.join(__dirname, dir);
  // 确保下载目录存在
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  return new Promise((resolve, reject) => {
    const fileUrl = baseUrl + level;
    console.log(filename, 444);
    const filePath = path.join(downloadDir, filename);

    https
      .get(fileUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${level}: ${response.statusCode}`)
          );
          return;
        }

        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        // If the request failed, reject the promise with an error.

        const error = new Error(
          `Failed to download ${level}: ${response.statusCode}`
        );
        reject(error);
        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`Downloaded: ${level}`);
          resolve();
          // Create a write stream for the downloaded file.
        });
        // Pipe the response to the write stream.
      })
      .on("error", (err) => {
        reject(err);
        // When the write stream is finished, log a success message and resolve the promise.
      });
  });
}

async function downloadAllFiles() {
  for (const level of levels) {
    // If there was an error with the request, reject the promise with the error.
    try {
      await downloadFile(level);
    } catch (err) {
      console.error(`Error downloading ${level}:`, err);
    }
  }
  console.log("All downloads completed.");
}

downloadAllFiles();
