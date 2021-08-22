# Simple HR App

## Description

Simple HR App is a Web Application capable that allows the HR users to manage information about departments and associated employees with names and salaries.

Here are the main features available in this application:

- Manage (add, edit, list, delete) departments.
- Manage employees.
- Highest Salary per Department Report: Show all departments along with the highest salary within each department. A department with no employees shows 0 as the highest salary.
- List of Highly Payed Departments Report: List just those departments that have more than two employees that earn over 50k.

## Architecture

## Software Process

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

- Install PHP >= 7.3 and other Required PHP Packages

```
sudo apt install unzip php-cli php-fpm php-mbstring php-xml php-bcmath
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

## REFERENCES

- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- Semantic Versioning: https://semver.org/
- How to install composer on Ubuntu 20.04 (DigitalOcean): https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04
- How to install MySQL on Ubuntu 20.04 (DigitalOcean): https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
- MySQL Workbench: https://dev.mysql.com/downloads/workbench/
