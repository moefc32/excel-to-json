let selectedFile;
let fileName;
let jsonContent;

const input = document.getElementById("input");
const upload = document.getElementById("upload");
const download = document.getElementById("download");

function checkExtension(exts) {
  return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(input.value);
}

input.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];

  if (selectedFile && !checkExtension(['.xls', '.xlsx'])) {
    iziToast.error({
      title: "Error",
      message: "File tidak valid, pastikan memilih file .xls atau .xlsx!",
      layout: 2,
      closeOnEscape: true,
      closeOnClick: true,
      displayMode: 2,
      position: "bottomLeft",
      timeout: 5000,
    });

    input.value = null;
    selectedFile = null;
  } else {
    fileName = selectedFile.name.split('.').slice(0, -1).join('.');
  }
})

let data = [{
  "name": "jayanth",
  "data": "scd",
  "abc": "sdef"
}]

upload.addEventListener("click", () => {
  if (!selectedFile) {
    iziToast.error({
      title: "Error",
      message: "Anda belum memilih file!",
      layout: 2,
      closeOnEscape: true,
      closeOnClick: true,
      displayMode: 2,
      position: "bottomLeft",
      timeout: 5000,
    });
  } else {
    XLSX.utils.json_to_sheet(data, "out.xlsx");
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);

    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, {
        type: "binary"
      });

      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        jsonContent = JSON.stringify(rowObject, undefined, 4);
        document.getElementById("output").innerHTML = jsonContent;

        download.disabled = false;
      });
    }
  }
});

download.addEventListener("click", () => {
  if (!selectedFile) {
    iziToast.error({
      title: "Error",
      message: "Anda belum memilih file!",
      layout: 2,
      closeOnEscape: true,
      closeOnClick: true,
      displayMode: 2,
      position: "bottomLeft",
      timeout: 5000,
    });
  } else {
    const a = document.createElement('a');
    const file = new Blob([jsonContent], {
      type: "application/json"
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  }
});