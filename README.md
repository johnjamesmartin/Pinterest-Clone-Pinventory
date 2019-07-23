# Pinventory

This is a Pinterest clone that I called "Pinventory" (I know, it's a cheesy name). The project was made as part of a FreeCodeCamp track and combines Node, Express, Pug, Mongo and Mongoose, JavaScript, etc. to make a basic full stack app.

## Installation

Download repo and install dependencies (cd into folder and type "npm install"). Create a .env file and set environment variables like so (replacing values with your own — including values from a database you will need to set up (MongoDB.net offers a free sandbox for this)):

DB_USER="someuser"
DB_PASS="somepass"
DB_CLUSTER="clusterX-something.mongodb.net"
DB_PARAMS="collectionName?retryWrites=true&w=majority"

PASSPORT_SECRET="somesecret"

GITHUB_APP_ID="someappid"
GITHUB_APP_SECRET="someappsecret"

SUPER_ID="userwhowillbesuperadminid"
SUPER_USERNAME="userwhowillbesuperadminemail"
SUPER_PASSWORD="userwhowillbesuperadminpassword"
SUPER_EMAIL="userwhowillbesuperadminemail"

BASIC_USERNAME="basicuserusername"
BASIC_PASSWORD="basicuserpassword"
BASIC_EMAIL="emailaddresshere"

## License

MIT License

Copyright (c) 2019 John Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
