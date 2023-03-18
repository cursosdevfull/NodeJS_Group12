class Upload {
  uploadFile(file: File) {
    //this.save(file)
    this.progress();
  }

  progress() {
    console.log("progress");
  }

  /*  save(file: File) {
      console.log("file uploaded")
      return "file saved"
    } */
}

class UploadAWS extends Upload {
  override save(file: File) {
    console.log("new method for loading");
  }
}

const uploadAWS = new UploadAWS();
const file = new File(["data"], "data.txt", { type: "text/plain" });

uploadAWS.uploadFile(file);
