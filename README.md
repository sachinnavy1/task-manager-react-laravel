# Task Manager App

React frontend + Laravel API backend  
Authentication with Laravel Sanctum

## Tech Stack
- React (Vite)
- Laravel 10
- MySQL


## Backend Setup (Laravel)

- cd task
- composer install
- cp .env.example .env
- php artisan key:generate
- Edit .env
    DB_CONNECTION=sqlite
	#DB_HOST=
	#DB_PORT=
	DB_DATABASE=root/task-manager-react-laravel/task/database/database.sqlite
	#DB_USERNAME=
	#DB_PASSWORD=

- php artisan migrate --seed
- Install Sanctum
	php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
	php artisan migrate
- Run Backend
	php artisan serve
	Backend runs at:http://127.0.0.1:8000


## Frontend Setup (React + Vite)

- cd task-ui
- npm install
- Run Frontend
  npm run dev
  Frontend runs at:http://localhost:5173


## Authentication Flow

- Login using seeded user
- Token stored in localStorage
- Protected routes via React Router
- Laravel Sanctum protects API


## Features

- Login / Logout
- Task CRUD
- Status update (Pending / Completed)
- Pagination
- Form validation
- API Resources
- Responsive UI