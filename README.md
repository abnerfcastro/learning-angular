# learning-angular
Learning AngularJS from scratch.

## Setting up the environment

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

```
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
