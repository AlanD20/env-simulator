# Environment Simulator

Environment Simulator is a real-world simulation of how pollutions spread with their effects in the environment.

###### Notice:
This project is a solution for a [task](TASK.md). You can look at the file for more information about the task and rules of how to implement the environment simulation.

---

## Setup Workplace

- You need to have both **[Node.js](https://nodejs.org/en/download/)** and **[Meteor](https://www.meteor.com/developers/install)** on your machine.
- Install all the dependencies with the following commands: (install NPM packages first as the project is in TypeScript)
`npm install && meteor run`
- To run TailwindCSS JIT mode, simply run watch command for laravel-mix with the following command:
`npm run watch` or `npx mix watch`

## Deploy With Docker
- Build the project using the following command: (it's recommended to output outside development folder)
`meteor build ../app --server-only`
- Build the docker image:
`docker build -t env-simulator/app .`
- The image base is mongodb image. Running the container gives non interactive bash, to do so, run the container then execute bash:
`docker run -p 3000:3000 --name app1 env-simulator/app`
`docker exec -it app1 /bin/bash`
- Echo out the mongodb connection string and exit out using the following command: 
`mongosh`
- export the environments:
    1. `export MONGO_URL='mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1'`
    2. `export ROOT_URL='http://localhost:3000'`
- Check node 14.18.3 is installed:
`nvm install 14.18.3 && nvm use 14.18.3`
- Run the application with port 3000
`PORT=3000 node main.js`


### Developer Notes:

- ##### [index.css](/src/index.css) : All CSS codes will be written inside this file, then laravel-mix will compile & minify the file to [Client-Side Public folder](/client).
- Building CSS should be done via laravel-mix's prod command.
`npm run prod` or `npx mix --production`

