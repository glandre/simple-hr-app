# Simple HR App

## Description

Simple HR App is a Web Application capable that allows the HR users to manage information about departments and associated employees with names and salaries.

Here are the main features available in this application:

- Manage (add, edit, list, delete) departments.
- Manage employees.
- Highest Salary per Department Report: Show all departments along with the highest salary within each department. A department with no employees shows 0 as the highest salary.
- List of Highly Payed Departments Report: List just those departments that have more than two employees that earn over 50k.

## Running the Application Locally

Instructions to be added here.

## Architecture

This project uses Laravel in the back-end, and React in the front-end. Check the Architecture
documentation for a detailed overview of the Software Architecture.

## Software Development Process

### Commits

Commit messages are important. In this project, a simplified version of the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) method is followed. In summary:

- A commit message should have a Subject and optionally a body.
- A commit message Subject should be written in the imperative.
- A commit message Subject should be prefixed with a semantic word that clarifies its intent.

Semantic prefixes:

- `feat`: introduces a new feature to the codebase.
- `fix`: patches a bug in your codebase.
- `refactor`: introduces a code change that neither fixes a bug nor adds a feature.
- `docs`: updates the project documentation.
- `chore`: introduces changes in the maintenance of the codebase (e.g., build and deploy scripts).

### Versioning

This project follows the [semantic versioning](https://semver.org/) approach.
Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards compatible manner, and
PATCH version when you make backwards compatible bug fixes.
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## Server Setup (Local and Staging)

The following steps were executed in the following:

- **Local Development Environment**: Linux machine with **Pop!\_OS 21.04** installed;
- **Staging Environment**: Linux machine with **Ubuntu 20.04.3 LTS** installed.

### MySQL

- Install MySQL:

```
sudo apt install mysql-server
sudo mysql_secure_installation
```

- Access MySQL as the root user. For example:

```
sudo su
mysql
```

- In the MySQL console, setup the application database and database user:

```
CREATE DATABASE simple_hr_app;
CREATE USER 'simple_hr_app_user'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON simple_hr_app.* TO 'simple_hr_app_user'@'%';
exit
```

The command above creates database called `simple_hr_app` and a user called `simple_hr_app_user` with password `password` that can full control over the database.

- MySQL IDE (MySQL Workbench) or other MySQL IDE of your choice.

https://dev.mysql.com/downloads/workbench/

- Open your MySQL IDE and connect to the Database

### PHP

- Install PHP >= 7.3 (PHP < 8) and other Required PHP Packages

**Notice:** PHP 8 is not supported in the current staging environment.

```
sudo apt install unzip php-cli php-fpm php-mbstring php-xml php-bcmath php-mysql
```

### Composer

- Install the latest version of Composer. The steps bellow are from getcomposer.org:

```
# Download Composer
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php

# Verify if the installer Hash matches
HASH=`curl -sS https://composer.github.io/installer.sig`

# the command below should return the message: "Installer verified"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

# Install Composer globally
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Test the installation:
composer
```

### Node and NPM (Front-end development environment)

**This section only needs to be followed in the development environment.**

- Install Node Version Manager:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

- Install Node LTS:

```
nvm install --lts
```

- Install the latest NPM version:

```
sudo apt install nodejs
```

Last, install the latest npm version:

```
npm i -g npm@latest
```

Check the installed versions:

```
~$ node -v
v14.17.5

~$ npm -v
7.21.1
```

### NGINX (Staging-only)

Front-end SPA address: http://hr.geraldolandre.com/
Back-end API address: http://hr-api.geraldolandre.com/

### Back-end

- Move the back-end folder to `/var/www` and setup its permissions:

```
sudo mkdir /var/www/simple-hr-app
sudo cp -R ~/simple-hr-app/back-end /var/www/simple-hr-app/back-end

sudo chown -R www-data.www-data /var/www/simple-hr-app/back-end/storage
sudo chown -R www-data.www-data /var/www/simple-hr-app/back-end/bootstrap/cache
```

- Create an NGINX configuration file for the API

```
sudo nano /etc/nginx/sites-available/simple-hr-app-back-end
```

The content of the file should like like the one bellow.

Replace `api.domainname.com` with the correct domain name.

```
server {
    listen 80;
    server_name api.domainname.com;
    root /var/www/simple-hr-app/back-end/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

- Activate the NGINX new virtual host:

```
sudo ln -s /etc/nginx/sites-available/simple-hr-app-back-end /etc/nginx/sites-enabled/
```

- Check if the configuration is ok

```
sudo nginx -t
```

- Reload NGINX

```
sudo systemctl reload nginx
```

### Front-end

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/hr.geraldolandre.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name hr.geraldolandre.com;

        location ~* \.(?:manifest|appcache|html?|xml|json)$ {
            expires -1;
            # access_log logs/static.log; # I don't usually include a static log
        }

        location ~* \.(?:css|js)$ {
            try_files $uri =404;
            expires 1y;
            access_log off;
            add_header Cache-Control "public";
        }

        # Any route containing a file extension (e.g. /devicesfile.js)
        location ~ ^.+\..+$ {
            try_files $uri =404;
        }

        # Any route that doesn't have a file extension (e.g. /devices)
        location / {
            try_files $uri $uri/ /index.html;
        }
}
```

## Deployment

### Back-end

Use the script `scripts/deploy.sh` directly in the server to perform a back-end deployment.

Access via ssh the server machine, and run the following script:

```bash
sh ~/simple-hr-app/scripts/deploy.sh
```

### Front-end

In your local development environment run the following commands to deploy the front-end:

```
cd front-end/
npm install
npm run build
npm run deploy
```

## Useful Scripts

The folder `scripts` contains useful multi-purpose scripts. See below for details.

### Tunnel MySQL connection via SSH

In order to connect your local environment with the staging MySQL instance, access the root of the repository and run the following command:

```bash
sh scripts/start_tunnel.sh
```

**Notice:** replace `geraldo@geraldolandre.com` with the intended SSH connection.

After this, you should be able to connect to the staging database with `127.0.0.1:3306`, by using the MySQL IDE (e.g., DBeaver) and by setting up your `.env` accordingly.

## REFERENCES

- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- Semantic Versioning: https://semver.org/
- MySQL Workbench: https://dev.mysql.com/downloads/workbench/
- How to install composer on Ubuntu 20.04 (DigitalOcean): https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04
- How to install MySQL on Ubuntu 20.04 (DigitalOcean): https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
- How to install Node.js on Ubuntu 20.04 (DigitalOcean): https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
