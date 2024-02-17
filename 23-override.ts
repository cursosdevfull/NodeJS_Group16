class Upload {
  save(file: File) {
    const sizeIsValid = file.size < 100000;

    if (!sizeIsValid) {
      console.log("Archive valid");
    } else {
      console.log("Archive invalid");
    }
  }

  validationSize(file: File) {
    return file.size < 100000;
  }
}

class UploadFile extends Upload {
  override validationSize(file: File) {
    return file.size < 1;
  }
}

const upload = new UploadFile();
const file = new File(["data"], "report.pdf", { type: "application/pdf" });
upload.save(file);
