# Social Network API 

## Table of Contents
  1. [Title](#title)
  2. [Description](#description)
  3. [Installation](#installation)
  4. [Usage](#usage)
  5. [Technologies](#technologies)
  6. [Credits](#credits)
  7. [Author](#author)
  8. [Questions](#questions)

## Description 

This App is an API for a social network web application where users can share their thoughts, react to others thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, the Mongoose ODM, and a JavaScript Date object to format timestamps for thoughts and reactions. The seed data is created using Insomnia.

To see how the API works using Insomnia, see the **Walkthrough Video Below**:

* https://youtu.be/V8AWqtjCkKY

The application **Content** can be accessed on my [GitHub Repository](https://github.com/EgRoku/social-network-api).

## Installation
  * Clone this repository.

  * On Visual Studio Code:
      * Open the cloned file. 
      * Create your own `.gitignore` file.
      * Check the dependencies and dev dependencies needed on `package.json`. 
  
  * To set up all the existing npm packages, run `npm init`.

  * To install the dependencies on the `node_modules` folder, run `npm install`

  * Ensure that MongoDB is installed on your machine. 
      * Otherwise, follow the instructions on the [MongoDB website](https://www.mongodb.com/docs/manual/installation/).

      * To run the app, type `npm start` in the console.

      * When the server is started, the Mongoose models are synched to the MongoDB database.
      
      * Open MongoDB and connect to the MongoDB URI `mongodb://localhost:27017`. On the list of databases, click on `socialnetworkapi` to see the `thoughts` and `users` data.

  * To create seed data and test the API routes, open Insomnia and use the same routes as the walkthrough video above.

## Usage

Users may utilize this app to create a new user with a valid username and email address, add other users as friends, delete those friends, post thoughts, reactions to those thoughts, and update and delete both thoughts and reactions.

 ## Technologies
  * JavaScript
  * Node.js
  * Express.js
  * MongoDB
  * Mongoose
  * Insomnia
  
 ### API Routes 

  **USERS**
  * Create a new user:  `POST /api/users`
  * Get all users: `GET /api/users`
  * Get a single user by its `id`: `GET /api/users/:userId`

  * Update a user by its `id`: `PUT /api/users/:userId`

  * Delete a user by its `id`: `DEL /api/user/:userId`

  **FRIENDS**
  * Add a new friend to a user's friend list: `POST /api/users/:userid/friends/:friendId`
  * Delete a friend from a user's friend list: `DEL /api/users/:userid/friends/:friendId`

 **THOUGHTS**
  * Create a new thought: `POST /api/thoughts/`
  * Get all thoughts: `GET /api/thoughts/`
  * Get a single thought by its `id`: `GET /api/thoughts/:thoughtId`
  * Update a thought by its `id`: `PUT /api/thoughts/:thoughtId`
  * Delete a thought by its `id`: `DEL /api/thoughts/:thoughtId`

 **REACTIONS**
  * Create a reaction: `POST /api/thoughts/:thoughtId/reactions`
  * Delete a reaction by the `reactionId`: `DEL /api/thoughts/:thoughtId/reactions/:reactionId`
  
  ## Credits
  * UCSD Boot Camp class materials and resources.
  * [MongoDB Documentation](https://www.mongodb.com/docs/manual/reference/connection-string/)
  * [Insomnia](https://insomnia.rest/)

  ## Author
  Jorge Jimenez

  ## Questions
  For questions or issues, please contact: 
  - Jorge Jimenez 
  - Email: jimenezjj5150@gmail.com
  - GitHub Username: egroku
  - GitHub Profile: https://github.com/egroku


