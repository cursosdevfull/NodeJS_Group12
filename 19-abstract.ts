abstract class Upload {
  abstract newFileName: string;

  constructor() {
    this.progress();
  }

  progress() {
    console.log("progress: " + this.newFileName);
  }

  abstract saveFile(file: File): void;
}

class UploadAWS extends Upload {
  newFileName = new Date().getTime().toString();

  constructor() {
    super();
  }

  saveFile(file: File) {
    console.log("file uploaded");
  }

  override progress() {
    super.progress();
    console.log("new file name: " + this.newFileName);
  }
}

const upload = new UploadAWS();
const file = new File(["data"], "data.txt", { type: "text/plain" });
upload.saveFile(file);
