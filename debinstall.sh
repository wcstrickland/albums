#!/bin/bash
apt install nodejs npm
npm i
echo" 
#!/usr/bin/env xdg-open
[Desktop Entry]
Exec=/home/$1/albums/albums.sh
Name=Albums
GenericName=Albums
Comment=start albums server
Encoding=UTF-8
Terminal=true
Type=Application
Categories=Application
"> album.desktop
cp. album.desktop /home/$1/Desktop/
mkdir /home/$1/Pictures
mkdir /home$1/Pictures/Public_Pictures
ln -s /home$1/Pictures/Public_Pictures ./public
