import AWS from 'aws-sdk';

const awsS3Upload = (file:any):Promise<any> => {
  const s3 = new AWS.S3();
  const params = {
    Body: file.data,
    Bucket: "mkdev-ims-india",
    Key: `${Date.now().toString()}-${file.name}`
  }
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) { reject(err); }
      else { console.log('resolved: ', data); resolve(data); }
    })
  })
}

export default awsS3Upload;