import AWS from 'aws-sdk';
import crypto from 'crypto';

const ci = crypto.createCipher('aes-256-gcm', 'mkdev');

const awsS3Upload = (file:string):Promise<any> => {
  const s3 = new AWS.S3();
  const params = {
    Body: file,
    Bucket: "mkdev-ims-india",
    Key: ci.update(file, 'utf8', 'hex') + ci.final('hex')
  }
  console.log(params)
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err, data) => {
      if (err) { reject(err); }
      else { console.log('resolved: ', data); resolve(data); }
    })
  })
}

export default awsS3Upload;