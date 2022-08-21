// const { readFileSync, promises: fsPromises } = require("fs");

// function readCueFile() {
// const fileName = document.getElementById("fileName").value;
//   const type = fileName.slice(-3) === "cue" ? true : false;
//   let cueFile = "";
//   if (type) {
//     cueFile = readTextFile(fileName);
//     // console.log(cueFile);
//     //   const contents = readFileSync(fileName, "utf-8");
//     //   const arr = contents.split(/\r?\n/);
//     //   console.log(arr);
//   }
// }

async function loadFile(fileName) {
  const type = fileName.slice(-3) === "cue" ? true : false;
  if (type) {
    document.getElementById("cueContent").value =
      await fileName.files[0].text();
  } else {
    alert("File not supported!");
  }
}

function convert() {
  const cue = document.getElementById("cueContent").value;
  if (cue !== "") {
    console.log(cue);
  }
}
