# empty-microservice-app

This application is a sample framework for building a NodeJS Express microservice application 
leveraging Typescript and MongoDB

## The Setup
* Make sure you have NodeJS installed. This version was tested using the latest LTS. See the nodejs.org 
site for details.
* Update NPM by running the following:
```bash
sudo npm install npm@latest -g
```
* If you want to work on this project, you can clone this repository to a local directory with the following
```bash
sudo npm install npm@latest -g
```
* However, is you wish to start a new project based on this sample service (most likely case), then 
do the following. This will mirror the sample repository into another Git repo.

```bash
# Make a bare clone of the repository
git clone --bare https://github.com/thethomaslee/empty-microservice-app.git

# Mirror-push to the new repository
cd empty-microservice-app.git
git push --mirror https://github.com/[exampleuser]/[new-repository.git]

# Remove our temporary local repository
cd ..
rm -rf empty-microservice-app.git
```

* Next we are going to want to install the project dependencies. Change to the project directory
and run the following:
```bash
npm install
```

* This project uses TypeScript. TypeScript requires that type information be present for the 
other classes you are referencing. Typings is the system we use to pull version of the type files
so that TypeScript will be able to compile our code. Install the required Typings information with 
the following, run from the project directory.
```bash
./node_modules/.bin/typings install
```

* This project uses Grunt to compile the TypeScript, liniting and run unit tests.
Assuming we are using a local project ersion of Grunt, you can run the following to compile the application
run the tests. The included test is an integration test and require MongoDB to be running on localhost,
using the default port with no password. To start MongoDB run:
```bash
./node_modules/.bin/grunt buildandtest
```
To build the app and run the tests execute the following: 
```bash
./node_modules/.bin/grunt buildandtest
```