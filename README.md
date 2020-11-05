# PHP backend and React front end balance tool

![Balance Image ](screenshot/photo.PNG)
#
![Balance Image ](screenshot/photo2.PNG)


## Settings

clone repo. 

access client folder y execute  `npm install`. once finish run  `npm start`  


on main folder run `composer install`. then php `artisan key:generate`
replace .env.example for .env and set up your database credential inside then tun `php artisan config:cache` to refresh environment variables. 

Next step run migrtion `php artisan migrate` 

then start serving  `php artisan serve` 

