NodeJS version: 12.16

Set the Firebase configuration in the file fire.js.
Steps to install firebase:
1. 'npm install -g firebase-tools'
2. 'firebase login'

Please make sure the Google account you use for Login has been provided the necessary permissions.

During the command 'firebase init' in the below steps, do not overwrite the Database rules and index.html.
When it asks for public directory please enter 'build'

Steps to run the code:
1. 'npm install'
2. 'npm run build'
3. Set an environment variable API_KEY to the value of the Firebase API key.
4. 'firebase init'
5. 'npm run deploy'
6. 'npm start'
