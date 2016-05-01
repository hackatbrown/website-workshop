# website-workshop

### Sandbox ###

### Client ###
```cd website-workshop/site/assets``` <- the main frontend source folder

```npm install``` <- downloads dependencies according to the package.json file

```./node_modules/gulp/bin/gulp.js ``` <- runs gulp

# Server #
There are two options for serving the site.

### Server - Static ###
```cd website-workshop/site ```
```python -m SimpleHTTPServer``` <- statically hosts the compiled html files 
On your browser, go to localhost:8000/compiled-templates
And for the react example just go to localhost:8000/compiled-templates/react-example.html

### Server - Flask ###
If you have [virtualenv](https://virtualenv.pypa.io/en/latest/) we recommend you use the simple 
[flask](http://flask.pocoo.org/) server we have set up. 
