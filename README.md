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


### Developer Notes:

- ##### [index.css](/src/index.css) : All CSS codes will be written inside this file, then laravel-mix will compile & minify the file to [Client-Side Public folder](/client).
- Building CSS should be done via laravel-mix's prod command.
`npm run prod` or `npx mix --production`