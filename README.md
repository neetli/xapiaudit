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
