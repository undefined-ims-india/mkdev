import AWS from 'aws-sdk';

const awsS3Upload = async (file: any): Promise<any> => {
  const s3 = new AWS.S3();
  const key = `${Date.now().toString()}-${file.name}`
  const params = {
    Body: file.data,
    Bucket: 'mkdev-ims-india',
    Key: key,
  };
  await s3.putObject(params).promise();
  return key;
};

export default awsS3Upload;
