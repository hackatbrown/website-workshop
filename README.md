# website-workshop

### Sandbox ###

### Client ###
```cd website-workshop/site/assets``` <- the main frontend source folder

```npm install``` <- downloads dependencies according to the package.json file

```./node_modules/gulp/bin/gulp.js ``` <- runs gulp

# Server #
There are two options for serving the site.

### Server - Static ###
```
cd website-workshop/site
python -m SimpleHTTPServer
```
These commands statically host the html from the `compiled-templates` folder.
On your browser, go to [localhost:8000/compiled-templates](http://localhost:8000/compiled-templates)
And for the react example just go to [localhost:8000/compiled-templates/react-example.html](http://http://localhost:8000/compiled-templates/react-example.html)

### Server - Flask ###
This is a little bit more complicated, but it gives you access to the pages above + a real server that you can deploy to the internet.
[*Flask*](http://flask.pocoo.org/) is a lightweight Python server similar to the one we used for hackatbrown. In order to get started, run 
```
sudo pip install flask
```

FYI This will download flask to your global python! If you don't want this, check out [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) a very simple way of managing python dependencies (that we used!)

Then, do
```
python website-workshop/site/main.py
```
All set!
