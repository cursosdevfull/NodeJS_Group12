import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import multer from 'multer';
import multer_s3 from 'multer-s3';

export class UploadBuilder {
  private _fileName: string;
  private _maxSize: number;
  private _allowedMimeTypes: string[];
  private _destination: string;
  private _isPublic: boolean;

  get fileName(): string {
    return this._fileName;
  }

  get maxSize(): number {
    return this._maxSize;
  }

  get allowedMimeTypes(): string[] {
    return this._allowedMimeTypes;
  }

  get destination(): string {
    return this._destination;
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  addFieldName(fieldName: string): UploadBuilder {
    this._fileName = fieldName;
    return this;
  }

  addMaxSize(maxSize: number): UploadBuilder {
    this._maxSize = maxSize;
    return this;
  }

  addAllowedMimeTypes(allowedMimeTypes: string[]): UploadBuilder {
    this._allowedMimeTypes = allowedMimeTypes;
    return this;
  }

  addDestination(destination: string): UploadBuilder {
    this._destination = destination;
    return this;
  }

  addIsPublic(isPublic: boolean): UploadBuilder {
    this._isPublic = isPublic;
    return this;
  }

  build(): UploadOptions {
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fileName: string;
  readonly maxSize: number;
  readonly allowedMimeTypes: string[];
  readonly destination: string;
  readonly isPublic: boolean;

  constructor(instance: UploadBuilder) {
    this.fileName = instance.fileName;
    this.maxSize = instance.maxSize;
    this.allowedMimeTypes = instance.allowedMimeTypes;
    this.destination = instance.destination;
    this.isPublic = instance.isPublic;
  }
}

export class Upload {
  static save(options: UploadOptions) {
    return multer({
      limits: { fileSize: options.maxSize },
      storage: multer_s3({
        s3: new S3Client({}),
        bucket: 'curso-nodejs12',
        acl: options.isPublic ? 'public-read' : 'private',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, file, cb) {
          const mimeType = file.mimetype;
          const isFileAllowed = options.allowedMimeTypes.includes(mimeType);

          if (!isFileAllowed) {
            return cb(new Error('File type not allowed'), null);
          }

          const partsFileName = file.originalname.split('.');
          const extension = partsFileName[partsFileName.length - 1];
          const fileName = `${options.destination}/${Date.now()}.${extension}`;
          req.body[options.fileName] = fileName;

          cb(null, fileName);
        },
      }),
    }).single(options.fileName);
  }
}
