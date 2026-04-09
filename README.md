# Smart Fitness Tracker Web Application

## Overview

This project is a frontend web application designed to help users track workouts, set fitness goals, and monitor progress over time.
The application uses JavaScript and browser local storage to manage data, allowing users to interact with the system without requiring a backend.


## Technologies Used

* HTML
* CSS
* JavaScript
* Chart.js (for data visualisation)
* Local Storage (for data persistence)


## Features

### Workout Management

* Log workouts (type, duration, calories, date)
* View all logged workouts in a table
* Delete workouts
* Mark workouts as favorites


### Favorites System

* Save workouts as favorites
* View and manage favorited workouts
* Remove workouts from favorites


### Fitness Goals

* Set goals based on:

  - Workout duration
  - Calories burned
  - Sessions per week
  - Track progress toward goals
  - Display progress using dynamic progress bars


###  Achievements System

* Automatically detects when goals are achieved
* Displays achievement alerts
* Tracks achievements and assigns badge levels:

  - Silver
  - Gold
  - Platinum


### Statistics & Visualization

* Total workouts
* Total calories burned
* Average workout duration
* Interactive charts using Chart.js:

  - Calories per workout
  - Duration per workout


## Data Storage

* Uses browser **localStorage** to store:

  - Workouts
  - Favorites
  - Goals
  - Achievements

## What I Learned

* Building multi-page web applications
* Managing application state using local storage
* Implementing CRUD operations in JavaScript
* Creating dynamic UI updates
* Integrating data visualisation using Chart.js


## Project Structure

* `index.html` – homepage
* `log-workout.html` – workout logging
* `stats.html` – statistics and charts
* `goals.html` – fitness goals and progress tracking
* `favourites.html` – favorite workouts
* `styles.css` – styling
* `workoutscript.js` – application logic


## How to Run

1. Open `index.html` in a web browser
2. Navigate through the application using the menu
3. Start logging workouts and tracking progress


## Contribution

This project was developed as part of a group assignment. I contributed to the design and implementation of the system alongside my team.
