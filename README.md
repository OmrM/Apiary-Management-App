# Apiary Management app
THIS IS A WORK IN PROGRESS. 
Beekeeping app made with React Native and the AWS SDK. 
I'm trying to stick to using Hooks and functional programming for this project. 

# Features:
## User Authentication: 
AWS cognito allows users to make an account and access their data. 

## Securely stores data: 
Data is stored in a DynamoDB NoSQL Database, which is accessed and edited through a graphQL API. 

## Image Upload: 
Users are able to upload images of their apiaries and hives which are stored onto an amazon S3 bucket. 
They are privately accessed using a presigned URL.  
![Alt Text](https://github.com/OmrM/Apiary-Management-App/tree/main/Demo-Images/ExpoImagePicker.png)
