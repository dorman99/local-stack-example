const AWS = require('aws-sdk');

const sns = new AWS.SNS({
  endpoint: 'http://127.0.0.1:4566/sns-new-message-dev',
  region: 'us-east-2',
});

sns.publish(
  {
    Message: JSON.stringify({
      default: "hello",
      message: "new message!"
    }),
    MessageStructure: 'json',
    TopicArn: `arn:aws:sns:us-east-2:000000000000:test-local`,
  }
).promise().then(resp => {
  console.log("Success");
}).catch(err => {
  console.log("ERROR OCCURED");
  console.log(err);
});