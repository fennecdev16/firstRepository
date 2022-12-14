RESTAURANT APPLICATION

*************************************CLIENT**********************************************************
   

1) Features: 
	-> address autocomplete (register page and update profile)
	-> EmailJS
	-> Order Tracking with Google map
     -> Weather forcast
	-> Stripe
	-> save images -> Cloudinary
	-> Form data validator
	-> react-redux, reduxjs/toolkit
	-> jwt-decode to decode token and check if it's expired
	-> Refresh Token
	-> localStorage

2) Admin panel

  
*************************************SERVER**********************************************************

 Features: 
	-> bcrypt (password)
	-> Twilio
	-> Socket io
	-> jsonwebtoken to generate and verify token and Refresh Token
	-> route secure with middleware (withAuth)
	-> promise-mysql

 

GITHUB
git add .
git commit -m "my changes" 
git remote add origin https://github.com/fennecdev16/restaurant.git
git push -u origin master

HEROKU
heroku git:remote -a la-casa-di-sergio 
git status
git add .
git status
git commit -m "changes" 
git push heroku master

***************************
VPS DEPLOYMENT
https://www.youtube.com/watch?v=Nxw2j1-srVc
https://www.youtube.com/watch?v=eE4GbaXbq50
https://www.youtube.com/watch?v=ZKaWTK91ECQ
https://www.youtube.com/watch?v=G_XyAfcLeqI

Hostinger panel password AAAAB3NzaC1yc2E@
Hostinger Set secure root password AAAAB3NzaC1yc2E@

******************
MongoDb

database user: alforno-hostinger
SjsAqeITeif8HbH3
mongodb+srv://alforno-hostinger:SjsAqeITeif8HbH3@cluster0.xgjuczd.mongodb.net/alforno-hostinger?retryWrites=true&w=majority

*****************
Putty
nano file
To save changes: Ctrl X, y, Enter

*********************
configuring vps server
https://www.youtube.com/watch?v=ZKaWTK91ECQ
https://github.com/basir/mern-amazona
https://github.com/safak/youtube/tree/mern-deployment


->ssh root@45.93.139.119
->apt-get update
->sudo apt install git
->curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
->sudo bash /tmp/nodesource_setup.sh
->sudo apt-get install -y nodejs
->node -v
->npm -v
->clear
->mkdir -p ~/apps/alforno/repo
->mkdir -p ~/apps/alforno/dest
->cd ~/apps/alforno/repo
->git --bare init

->nano hooks/post-receive
#!/bin/bash -l
echo 'post-receive: Triggered.'
cd ~/apps/alforno/dest/
echo 'post-receive:git check out...'
git --git-dir=/root/apps/alforno/repo/ --work-tree=/root/apps/alforno/dest/ checkout master -f
echo 'post-receive: npm install...'
npm install
npm run build
forever restart alforno

->To save changes: Ctrl X, y, Enter
-> chmod ug+x hooks/post-receive

-> get mongo address: mongodb+srv://alforno-hostinger:SjsAqeITeif8HbH3@cluster0.xgjuczd.mongodb.net/alforno-hostinger?retryWrites=true&w=majority
-> cd ../dest
-> nano .env
-> put MONGODB address, PORT ...
->To save changes: Ctrl X, y, Enter
->root@fennectech:~/apps/alforno/dest# sudo a2enmod proxy proxy_http rewrite headers expires
->sudo nano /etc/apache2/sites-available/alforno.shop.conf

<VirtualHost *:80>
    ServerName alforno.shop   
    ServerAlias www.alforno.shop
    ProxyRequests Off
    ProxyPreserveHost On
    ProxyVia Full

    <Proxy *>
        Require all granted
    </Proxy>

    ProxyPass        / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/   

</VirtualHost>

->To save changes: Ctrl X, y, Enter

-> sudo a2dissite 000-default
-> sudo a2ensite alforno.shop.conf
-> sudo systemctl restart apache2
-> sudo apt install certbot python3-certbot-apache
-> sudo certbot -d alforno.shop -d www.alforno.shop --apache --agree-tos -m cherifi.sam@gmail.com --no-eff-email --redirect
-> sudo certbot renew --dry-run

->root@fennectech:~/apps/alforno/dest# npm install forever -g

->forever start --uid="alforno" --sourceDir="/root/apps/alforno/dest/" server/index.js  