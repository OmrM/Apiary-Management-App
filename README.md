# Apiary Management app
This project is a work-in-progress. 
It's a beekeeping app made with React Native and the AWS SDK. 
I'm trying to stick to using Hooks and functional programming for this project, which has been a struggle because a lot of examples and documentation online use class-based implementations. I am still refactoring code while working on adding features so, some of my code is still a little disorganized and redundant. I still need to modularize a lot of my components and their styles, but all this is on the to-do section of my Kanban board. 


![Alt Text](https://github.com/OmrM/Apiary-Management-App/blob/main/Demo%20Images/HomePage.png)

# Features:
## User Authentication: 
AWS cognito allows users to make an account and access their data. 

![Alt Text](https://github.com/OmrM/Apiary-Management-App/blob/main/Demo%20Images/LogIn.png)


## Securely stores data: 
Data is stored in a DynamoDB NoSQL Database, which is accessed and edited through a graphQL API. 


## Image Upload: 
Users are able to upload images of their apiaries and hives which are stored onto an amazon S3 bucket. 
They are privately accessed using a presigned URL.  
![Alt Text](https://github.com/OmrM/Apiary-Management-App/blob/main/Demo%20Images/ExpoImagePicker.png)

## Figma Prototypes: 
https://www.figma.com/proto/WpJpyohzwJVBbHFpnS88IZ/Bees?page-id=219%3A198&node-id=312%3A143&viewport=353%2C48%2C1.4&scaling=scale-down
