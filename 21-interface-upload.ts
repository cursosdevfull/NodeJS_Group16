interface IUpload {
  save(file: File): void;
}

class UploadAWS implements IUpload {
  save(file: File): void {
    console.log("filename", file.name);
    console.log("type", file.type);
  }
}

class UploadAzure implements IUpload {
  save(file: File): void {
    this.showInfo(file);
  }

  showInfo(file: File) {
    console.log("filename", file.name);
    console.log("type", file.type);
  }
}

const file = new File(["data"], "image.png", { type: "image/png" });

//const upload: IUpload = new UploadAWS()
const upload: IUpload = new UploadAzure();
upload.save(file);
