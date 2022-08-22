async function loadFile(fileSelector) {
  if (fileSelector.files[0] !== null) {
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

function convert(allLines) {
  let tracks = allLines.filter(
    (line) => line.toLowerCase().indexOf("track") >= 0
  );
  tracks = tracks.map((line) => line.trim().split(/\s+/)[1]);

  let titles = allLines.filter(
    (line) => line.toLowerCase().indexOf("title") >= 0
  );
  titles = titles.map((line) => line.trim().slice(6)?.replaceAll('"', ""));

  let performers = allLines.filter(
    (line) => line.toLowerCase().indexOf("performer") >= 0
  );
  performers = performers.map((line) =>
    line.trim().slice(10)?.replaceAll('"', "")
  );

  let start = allLines.filter(
    (line) => line.toLowerCase().indexOf("index 01") >= 0
  );
  start = start.map((line) => line.trim().split(/\s+/)[2]);

  let end = allLines.filter(
    (line) => line.toLowerCase().indexOf("index 02") >= 0
  );
  end = end.map((line) => line.trim().split(/\s+/)[2]);

  if (end.length !== start.length) {
    start.push(start[start.length - 1]);
  }

  let srtContent = "";
  for (let i = 0; i < tracks.length; i++) {
    srtContent += `${Number(tracks[i])}\n`;
    srtContent += `${start[i]} --> ${
      end.length === start.length ? end[i] : start[i + 1]
    }\n`;
    srtContent += `${tracks[i]}. ${performers[i]} - ${titles[i]}\n\n`;
  }
  return srtContent;
}
