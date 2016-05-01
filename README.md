# website-workshop

### Client ###
```cd website-workshop/site/assets``` <- the main frontend source folder

```npm install``` <- downloads dependencies according to the package.json file

```./node_modules/gulp/bin/gulp.js ``` <- runs gulp

# Server #
There are two options for serving the site.

### Server - Static ###
```cd website-workshop/site/compiled-templates ```

```python -m SimpleHTTPServer```` <- statically hosts the compiled html files 

### Server - Flask ###
If you have [virtualenv](https://virtualenv.pypa.io/en/latest/) we recommend you use the simple [flask](http://flask.pocoo.org/) server we have set up. 
