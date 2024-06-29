import AWS from 'aws-sdk';

export default (Key: string) => {
  const s3 = new AWS.S3();
  const params = {
    Key,
    Bucket: 'mkdev-ims-india'
  }
  return s3.getObject(params).promise();
}