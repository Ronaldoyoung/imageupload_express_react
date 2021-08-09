const aws = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

const s3 = new aws.S3({
  secretAccessKey: AWS_SECRET_KEY,
  accessKeyId: AWS_ACCESS_KEY
});

// getSignedUrl({key}).then(result => console.log(result)).catch(err => console.log(err));

// try {
//   const data = await getSignedUrl({ key })
// } catch(err) {
//   console.log(err)
// }

const getSignedUrl = ({key}) => {
  return new Promise((resolve, reject) => {
    s3.createPresignedPost({
      Bucket: "image-upload-test-4ir",
      Fields: {
        key
      },
      Expires: 300,
      Conditions: [
        ["content-length-range", 0, 50 * 1000 * 1000],
        ["starts-with", "$Content-Type", "image/"]
      ]
    }, (err, data) => {
      if(err) throw reject(err)
      resolve(data);
    })
  })  
}

module.exports = { s3, getSignedUrl };
