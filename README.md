# website-workshop

## Disclaimer ##
This is a weird workshop - web dev is a whirlwind right now. There are tools being created and pronounced DOA on a daily basis, and it's easy to feel intimidated - like you can't make an investment in any of them. Regardless of *which* tools are being used though, I have two nuggets of web wisdom for you:
* *Getting this shit set up is the hardest part*
* *It's more fun to be fancy.* You shouldn't need to sacrifice your programming principles in order to work on the web, and tools like these can make it all more palatable.

If we haven't adequately explained why we chose the tools that we did, please ask questions! There are so many choices when it comes to choosing your stack and workflow, and we want to help make it easier.

## What's in this box!? ##
#### Preprocessing
A gulpfile which allows you to use [browserify](http://browserify.org/), [sass](http://sass-lang.com/), [autoprefixer](https://github.com/postcss/autoprefixer), and [react](https://facebook.github.io/react/) with JSX.

#### Architecture
A [7-1 sass architecture](https://sass-guidelin.es/#the-7-1-pattern).

#### And some extras!####
* Examples of HTML `<meta>` tags which will allow your site to be scraped by Twitter and Facebook.
* A Flask server with Jinja2 templates demonstrating HTML template inheritance
* An extensible bash script so you can make your own project sandbox!

### Client ###
```
cd website-workshop/site/assets  # the main frontend source folder
npm install # downloads dependencies according to the package.json file
./node_modules/gulp/bin/gulp.js # runs gulp 
```

## Server ##
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
This is a little bit more complicated, but it gives you access to the pages above + a real server with backend logic + jinja2 templating.
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

## Sandbox ##
If you find yourself writing shell commands related to a specific task that you do often, this is the section for you!
We wrote an extensible script, `hab`, which had the following commands:
```
hab # cd to project folder
hab db [prd] # connect to sql db
hab deploy [prd|stg] # deploy the site and post to slack
hab gulp [js|css] # run gulp tasks
hab install # install python and node dependencies
hab lint [js|css] # check code against our style guide.
hab test [web|js|python|all] # run integration / unit tests 
hab up # run the development server
```
Obviously you don't need all of these but we ported over two for this project:
You can use these right away by doing:
```
source website-workshop/scripts/sandbox/hab
hab up
hab gulp
```
This setup makes it easy to use project-specific shell variables and quickly write your own shell commands!

## Useful Links ##
[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)

[Gulp Recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes)

[Babel](https://babeljs.io/)
