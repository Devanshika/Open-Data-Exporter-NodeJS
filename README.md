Socrata to NoSQL Readme

In order to run the code:

1. Edit the file path in the config.json. The file path should be where you want the datasets to get stored. I have created a folder called Open data that stores all the datasets.
2. Edit Iteration Start to 0 and Iteration End to the last dataset to fetch all datasets. This is given to allow for multiple instances to download different range of datasets.
3. Open Command prompt and using the cd command navigate to the project folder.
4. To install the dependencies, run the command npm install 
5. Run the following command: node --max-old-space-size=4096 app.js
