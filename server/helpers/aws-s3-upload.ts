import AWS from 'aws-sdk';

const awsS3Upload = async (file:any):Promise<any> => {
  const s3 = new AWS.S3();
  const params = {
    Body: file.data,
    Bucket: "mkdev-ims-india",
    Key: `${Date.now().toString()}-${file.name}`
  }
  return await s3.putObject(params);
}

export default awsS3Upload;