### Installation

Ensure the repository is cloned on your machine and you have node installed.

From the project root, install npm dependacies with the following command:

    $ npm install


## Running
-----------------

To run the server use the following command:

    $ npm run dev

Fire up a browser, go to http://localhost:8080/ and play!

Note:
1. Hot reload is not functional yet.
2. After around 7pm EAT (approximately), conversions one year in the past to the day will be seen as valid by the application but the API will reject this. It appears the API servers are hosted somewhere in Asia. So if you're on `1st July 2018`, they cross into the next day, `2nd July 2018`, before you. One year in the past for you will therefore be `1st July 2017` but for the server it will appear as though you're going past the 1yr quota afforded to free users.
