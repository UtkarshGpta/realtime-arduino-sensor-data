
# RealTime Arduino Sensor Data

The application aims at collecting sensor values from various sensors through Arduino Uno, sending them to a server (running NodeJS) and serving the clients a realtime plot of all the sensor values into one single plot.
For Arduino Code, head to the following [gist](https://gist.github.com/UtkarshGpta/cbc7a899d3c6e1072db4b5f55e87b5a6).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software

 - MongoDB on local machine
 - PubNub account (to get publish and subscribe key)

Open a terminal and run the following command to run a local instance of MongoDB on the machine. Use sudo if unable to run the local instance.
```
mongod
```
Note the port number at the end of the output and hardcode it in config.js file.

Open another terminal and type
```
mongo
```
In this mongo terminal, create a database which would be used to store the data using
```
use <database naem of your choice>
```
Store this database name in "config.db.name" in config.js file. Also change the subscribe key in views/index.html. Search for 'subscribeKey' and change with the value you obtained from your PubNub account.

### Installing

Follow these step by step instructions to get a development env running on your local machine

Firstly clone this entire git repo to your desired folder and get into the cloned project by
```
git clone https://github.com/UtkarshGpta/realtime-remote-sensor-data.git
cd realtime-remote-sensor-data
```
Next, install all the package dependencies using
```
npm install
```
Finally to run the local server on the machine, execute
```
npm start
```
Now you'll get a server running at localhost:5000

Type this in the browser's address bar and you can see the real-time plot on the screen. Perform a GET request to this server and you can see the graph being updated in real-time.
Example: http://localhost:5000/post_data?voltage=235&current=5.1&temperature=25

## Deployment
Using above instructions, you get a server running locally. To deploy the application on Heroku, you need to add PubNub and mLab MongoDB as Add-ons under the resources tab. You need not harcode anything as the MongoDB URL, PubNub's Publish and Subscribe Key are taken up from process.env variable of Heroku. 

After adding mLab as an add-on, note down the database name alotted to your account and change the corresponding value of config.db.name in config.js

Integrate GitHub as deployment method and you can deploy the application automatically as soon as you push your changes onto your repository on GitHub.

## Result
We get a sensor data plot which is updated in real time and can be viewed on any device with an active internet connection.

Below is when viewed on a web browser on my laptop.

![RealTime Sensor Data plot](https://i.imgur.com/refZYlZ.gif)


## Authors

* **Utkarsh Gupta** - *Initial work* (https://github.com/UtkarshGpta)

See also the list of [contributors](https://github.com/UtkarshGpta/realtime-remote-sensor-data/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
