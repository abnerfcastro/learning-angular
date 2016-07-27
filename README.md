# learning-angular
Learning AngularJS from scratch.

## Setting Up the Environment

First of all, you need to have Node.js installed.

After that, we're gonna use Bower. Bower is a package manager that makes it easy to manage all your application's front-end dependencies. It can be installed using `npm`, the Node package manager. It is included with the install of Node.js.

Now we can install Bower. The following command installs Bower _globally_ on your system. To execute it, open cmd on Windows or a terminal window on Linux and type:

```
npm install -g bower
```

Installed packages will be placed in a `bower_components` directory. This is created in the folder which the `bower` program was executed. In order to change this destination, we will add a file named `.bowerrc` file to our project, because we want `bower_components` to be inside the `app` folder -- just because. For now, the contents of `.bowerrc` will be as follows:

```
{
  "directory": "app/bower_components"
}
```

We can install packages with `bower install <package>`, but in order to make it more fun, we can create a `bower.json` file that will specify all the dependencies of our project. Then we simply type `bower install`. Sort of a _Makefile_ for C/C++, right? Can we make that comparison? I'm totally new to this web development world.

So, this is what our `bower.json` will look like -- for now.

```json
{
    "name": "learning-angular",
    "version": "0.0.0",
    "dependencies": {
        "angular": "1.5.x"
    }
}
```

And we'll update this file as we go along.

One more thing: we don't want to commit the Angular framework files along with our project. So we put the entire `bower_components` folder inside `.gitignore` file.

## Getting Started

Well, as much as I want to start coding right away, setup is not finished yet. We need a server to run our application. Angular does work if you just run the `index.html` file, but as the application gets more complex, it won't work properly because the browser -- for security matters -- will not execute some scripts. So I have read. Don't take my word for it.

But anyway, we need a http-server. We could write one ourselves, but a simpler solution would be to install `http-server`.

> `http-server` is a simple, zero-configuration command-line http server. It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.

That's exactly what we need.

And now we'll need another configuration file: `package.json`. This is the [documentation](https://docs.npmjs.com/files/package.json "package.json documentation") if you want to read more details about it. But for now, this is all we need to know:

> All npm packages contain a file, usually in the project root, called package.json - this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies.

We tell `npm` the dependencies of our project, just like we told `bower`. That said, the structure of the file is something like this:

```json
{
    "name": "learning-angular",
    "private": true,
    "version": "0.0.0",
    "description": "Learning AngularJS from scratch.",
    "repository": "https://github.com/abnerfcastro/learning-angular.git",
    "license": "MIT",
    "devDependencies": {
        "http-server": "^0.9.0"
    },
    "scripts": {
        "prestart": "npm install",
        "start": "http-server ./app -a localhost -p 8000 -c-1"
    }
}
```



