async function loadFile(fileSelector) {
  const type = fileSelector.files[0].name.slice(-3) === "cue" ? true : false;

  if (type) {
    const file = fileSelector.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const file = event.target.result;
      const allLines = file.split(/\r\n|\n/);
      download(allLines);
    };

    reader.readAsText(file);
  } else {
    alert("Error: File not supported!");
  }
}

function download(allLines) {
  if (allLines !== "") {
    let finalSRT = convert(allLines);
    var myBlob = new Blob([finalSRT], { type: "text/plain" });
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    const fileFullName = allLines.filter(
      (line) => line.toLowerCase().indexOf("file") >= 0
    );
    const [_, fileName] = fileFullName[0].match(/"((?:\\.|[^"\\])*)"/);
    anchor.download = `${fileName.split(".")[0]}.srt`;
    anchor.click();
  }
}

function convert(cueText) {
  const srtText = cueText; //.split(/\r?\n/);

  //   // Reading line by line
  //   allLines.forEach((line) => {
  //     console.log(line);
  //   });
  return srtText[0];
}
