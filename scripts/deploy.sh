# download code
cd ~/simple-hr-app && git checkout main
cd ~/simple-hr-app && git pull

# install dependencies
cd ~/simple-hr-app/back-end && composer install

# back up current version
folder_name=$(date '+%Y-%m-%d-%H-%M-%S')
mkdir -p ~/backups/back-end/last
mkdir -p ~/backups/back-end/$folder_name
sudo mv /var/www/simple-hr-app/back-end ~/backups/back-end/last
sudo cp -R ~/backups/back-end/last ~/backups/back-end/$folder_name

# copy files to the target folder
sudo cp -R ~/simple-hr-app/back-end /var/www/simple-hr-app/back-end

# set up permissions
sudo chown -R www-data.www-data /var/www/simple-hr-app/back-end/storage
sudo chown -R www-data.www-data /var/www/simple-hr-app/back-end/bootstrap/cache
