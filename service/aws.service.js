const fs = require("fs");
const aws = require("aws-sdk");
const { uuid } = require("uuidv4");

class AwsService {
  constructor(accesKeyId, secretAccessKey) {
    this._s3 = new aws.S3({
      accessKeyId: accesKeyId,
      secretAccessKey,
      endpoint: "http://localhost:4566",
      s3ForcePathStyle: true
    });
  }
  async presignedS3ImageUrl() {
    const params = {
      Bucket: "my-bucket-2",
      Key: uuid() + ".jpeg",
      Expires: 60 * 60,
      ContentType: "image/*",
    };
    const request = await this._s3.getSignedUrl("putObject", params);
    return request;
  }

  async upload(fileName, bucketName) {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: "fc-banner.jpg",
      Body: fileContent,
      ContentType: "",
    };
    try {
      const request = await this._s3.upload(params).promise();
      console.log(request)
      return Promise.resolve(request);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

module.exports = AwsService;
