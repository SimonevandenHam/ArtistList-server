# 🎸Artist List Server

This is the server repository for Artist List

## Setting up

You can find the client repository and the features of this application [here](https://github.com/SimonevandenHam/ArtistList-client).

### installation

- Clone this repository
- To install all the dependencies for this application run:


      $ npm install

- Run in Docker

### change in repository

- Update **databaseUrl** in [/db.js](https://github.com/SimonevandenHam/ArtistList-server/blob/master/db.js) with your local database credentials
- Switch **db.sync** true to false to create database
- Make first entry in spotifyTokens table to receive a working key
  > 💡**example** entry:
  > | id | expires_at | access_token | createdAt |updatedAt |
  > |--|--|--|--|--|
  > | 1 | 2020-02-02 | 1 | 2020-02-02 |2020-02-02 |

### Have fun!🤩
