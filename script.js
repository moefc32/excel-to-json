let selectedFile;

document.getElementById("input").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
})

let data = [{
  "name": "jayanth",
  "data": "scd",
  "abc": "sdef"
}]

document.getElementById("upload").addEventListener("click", () => {
  if (!selectedFile) {
    iziToast.error({
      title: "Error",
      message: "Anda belum memilih file Excel!",
      layout: 2,
      closeOnEscape: true,
      closeOnClick: true,
      displayMode: 2,
      position: "bottomLeft",
      timeout: 5000,
    });
  } else {
    XLSX.utils.json_to_sheet(data, "out.xlsx");
    if (selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, {
          type: "binary"
        });

        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)
        });
      }
    }
  }
});