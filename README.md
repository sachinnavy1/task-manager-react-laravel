# Task Manager App

React frontend + Laravel API backend  
Authentication with Laravel Sanctum

## Tech Stack
- React (Vite)
- Laravel 10
- MySQL


## Backend Setup (Laravel)

1- cd task
2- composer install
3- cp .env.example .env
4- php artisan key:generate
5-Edit .env
    DB_CONNECTION=sqlite
	#DB_HOST=
	#DB_PORT=
	DB_DATABASE=root/task-manager-react-laravel/task/database/database.sqlite
	#DB_USERNAME=
	#DB_PASSWORD=

6-php artisan migrate --seed
7-Install Sanctum
	php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
	php artisan migrate
8-Run Backend
	php artisan serve
	Backend runs at:http://127.0.0.1:8000


## Frontend Setup (React + Vite)

1-cd task-ui
2-npm install
3-Run Frontend
  npm run dev
  Frontend runs at:http://localhost:5173


## Authentication Flow

1-Login using seeded user
2-Token stored in localStorage
3-Protected routes via React Router
4-Laravel Sanctum protects API


## Features

1-Login / Logout
2-Task CRUD
3-Status update (Pending / Completed)
4-Pagination
5-Form validation
6-API Resources
7-Responsive UI