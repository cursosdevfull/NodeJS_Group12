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

class FactoryUploadLinode implements IUpload {
  save(file: File): void {
    this.startProgress();
    setTimeout(() => this.endProgress(), 2000);
  }

  startProgress() {
    console.log("Uploading file to Linode");
  }

  endProgress() {
    console.log("File uploaded");
  }
}

class FactoryUploadDigitalOcean implements IUpload {
  save(file: File): void {
    this.progress();
  }

  progress() {
    console.log("File uploaded to DigitalOcean");
  }
}

class FactoryUploadHostinger implements IUpload {
  save(file: File): void {
    this.progress();
  }

  progress() {
    console.log("File uploaded to Hostinger");
  }
}

function uploadFile(localOrCloud: string, type: string) {
  let upload;
  if (localOrCloud === "local") {
    switch (type) {
      case "DIGITALOCEAN":
        upload = new FactoryUploadDigitalOcean();
        break;
      case "LINODE":
        upload = new FactoryUploadLinode();
        break;
      case "HOSTINGER":
        upload = new FactoryUploadHostinger();
        break;
      default:
        upload = new FactoryUploadDigitalOcean();
        break;
    }
  } else {
    switch (type) {
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
  }

  return upload;
}

const upload = uploadFile("cloud", "AZURE");
const file = new File(["data"], "data.txt", { type: "text/plain" });
upload.save(file);
