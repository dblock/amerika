## Deploy to AWS Lambda

### Install Apex

Install [Apex](https://github.com/apex/apex).

```
curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh
```

### Configure AWS

Install [awscli](https://github.com/aws/aws-cli).

```
brew install awscli
```

Configure AWS with `aws configure`.

```
$ aws configure
AWS Access Key ID [None]: ...
AWS Secret Access Key [None]: ...
Default region name [us-east-1]: us-east-1
Default output format [json]: json
```

### Updated Depenencies

Install dependent packages and export schema and utterances.

```
make build
```

### Deploy to Lambda

```
$ make deploy
  ...
   • creating function         env= function=artsy
   • created alias current     env= function=artsy version=1
   • function created          env= function=artsy name=amerika_artsy version=1
```

### Triggers

Go to the Lambda function and choose _Triggers_. Add an `Alexa Skills Kit` trigger or you'll get an obscure `Please make sure that "Alexa Skills Kit" is selected for the event source type of arn:...` error.

### Logs

If logs don't appear in CloudWatch, manually attach the following policy.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

### Test

```
apex invoke amerika < test/functions/amerika/fixtures/LaunchRequest.json
```

This should return a welcome message.

```json
{
  "version":"1.0",
  "sessionAttributes":{},
  "response":{
    "shouldEndSession":true,
    "outputSpeech":{
      "type":"SSML",
      "ssml":"<speak>...</speak>"
    }
  }
}
```

### Alexa Skill Configuration

Add the skill to [Alexa Skills](https://developer.amazon.com/edw/home.html#/skills/list).

#### Interaction Model

* Copy-paste the contents of [functions/amerika/schema.json](schema.json) into _Intent Schema_.
* Copy-paste the contents of [functions/amerika/utterances.txt](utterances.txt) into _Sample Utterances_.
