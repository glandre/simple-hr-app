# This script is supposed to be run in the destination server

# install dependencies
echo "[deploy.sh] Installing dependencies..."
cd ~/simple-hr-app/back-end && composer install

# back up current version
echo "[deploy.sh] Backup - deleting last.bak..."
sudo rm -rf ~/backups/back-end/last.bak
echo "[deploy.sh] Backup - backing up last directory..."
sudo mv ~/backups/back-end/last ~/backups/back-end/last.bak

echo "[deploy.sh] Backup - creating date-based directory..."
folder_name=$(date '+%Y-%m-%d-%H-%M-%S')
sudo mkdir -p ~/backups/back-end/$folder_name

echo "[deploy.sh] Backup - backing up existing version..."
sudo mv /var/www/simple-hr-app/back-end ~/backups/back-end/last
sudo cp -R ~/backups/back-end/last ~/backups/back-end/$folder_name

# copy files to the target folder
echo "[deploy.sh] Deploying updated version..."
sudo cp -R ~/simple-hr-app/back-end /var/www/simple-hr-app/back-end

# set up permissions
echo "[deploy.sh] Setting up permissions..."
sudo chown -R www-data.www-data /var/www/simple-hr-app/back-end/storage
sudo chown -R www-data.www-data /var/www/simple-hr-app/back-end/bootstrap/cache

echo "[deploy.sh] Done."