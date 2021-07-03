#!/bin/bash
apt install curl
curl -sL https://deb.nodesource.com/setup_14.x 
apt install nodejs npm
#npm i
touch album.desktop
chmod 777 album.desktop
echo "#!/usr/bin/env xdg-open
[Desktop Entry]
Exec=$PWD/albums.sh
Name=Albums
GenericName=Albums
Comment=start albums server
Encoding=UTF-8
Terminal=true
Type=Application
Categories=Application
" > album.desktop
mkdir ./public
chown -R $1 ./
mkdir /home/$1/Desktop
cp album.desktop /home/$1/Desktop/
chown -R $1 /home/$1/Desktop
mkdir /home/$1/Pictures
ln -s ./public /home/$1/Pictures/
chown -R $1 /home/$1/Pictures
