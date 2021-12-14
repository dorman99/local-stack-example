const AWS = require('aws-sdk');

const sns = new AWS.SNS({
  endpoint: 'http://127.0.0.1:4561/sns-new-message-dev', // port sns local porject
  region: 'us-east-1',
});

sns.publish(
  {
    Message: JSON.stringify({
      default: "hello",
      message: "new message!"
    }),
    MessageStructure: 'json',
    TopicArn: `arn:aws:sns:us-east-1:000000000000:new-topic`,
  }
).promise().then(resp => {
  console.log("Success");
}).catch(err => {
  console.log("ERROR OCCURED");
  console.log(err);
});