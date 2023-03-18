interface IUpload {
  save(file: File): void;
}

class FactoryUploadAWS implements IUpload {
  save(file: File): void {
    this.startProgress();
    setTimeout(() => this.endProgress(), 2000);
  }

  startProgress() {
    console.log("Uploading file to AWS");
  }

  endProgress() {
    console.log("File uploaded");
  }
}

class FactoryUploadAzure implements IUpload {
  save(file: File): void {
    this.progress();
  }

  progress() {
    console.log("File uploaded to Azure");
  }
}

class FactoryUploadGCP implements IUpload {
  save(file: File): void {
    this.progress();
  }

  progress() {
    console.log("File uploaded to GCP");
  }
}

function uploadFile(cloud: string) {
  let upload;
  switch (cloud) {
    case "AWS":
      upload = new FactoryUploadAWS();
      break;
    case "GCP":
      upload = new FactoryUploadGCP();
      break;
    case "AZURE":
      upload = new FactoryUploadAzure();
      break;
    default:
      upload = new FactoryUploadAWS();
      break;
  }

  return upload;
}

const upload = uploadFile("AWS"); //new FactoryUploadGCP() //FactoryUploadAWS()
const file = new File(["data"], "data.txt", { type: "text/plain" });
upload.save(file);
