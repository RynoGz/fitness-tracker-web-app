const workoutForm = document.getElementById("workoutForm");
const workoutTable = document.getElementById("workoutTable")?.querySelector("tbody");
const favoritesTable = document.getElementById("favoritesTable")?.querySelector("tbody");

// Load workouts and favorites from local storage
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let achievementsArr = JSON.parse(localStorage.getItem("achievements")) || [];

// Defining checkAchievements globally
function checkAchievements(workoutType, duration, calories) {
    const today = new Date().toISOString().split('T')[0];
    
    goals.forEach(goal => {
        let achievementText = "";
        let isAchieved = false;

        switch(goal.goalType.toLowerCase()) {
            case "time":
                if (duration >= goal.target && today <= goal.deadline) {
                    achievementText = `Goal Achieved: ${goal.target} minutes workout by ${goal.deadline}!`;
                    isAchieved = true;
                }
                break;
            case "calories":
                if (calories >= goal.target && today <= goal.deadline) {
                    achievementText = `Goal Achieved: ${goal.target} calories burned by ${goal.deadline}!`;
                    isAchieved = true;
                }
                break;
            case "sessions":
                if (workoutType && today <= goal.deadline) {
                    achievementText = `Goal Achieved: Workout session completed by ${goal.deadline}!`;
                    isAchieved = true;
                }
                break;
        }

        if (isAchieved && !achievementsArr.includes(achievementText)) {
            achievementsArr.push(achievementText);
            localStorage.setItem("achievements", JSON.stringify(achievementsArr));
            alert(achievementText);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Favorites function
    window.addToFavorites = function (index) {
        favorites.push(workouts[index]);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Workout added to favorites! Go to the Favorites page to view.");
        updateFavoritesTable(); 
    };

    if (workoutForm) {
        workoutForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let newWorkout = {
                type: workoutForm.workoutType.value.toUpperCase(),
                duration: parseInt(workoutForm.duration.value), 
                calories: parseInt(workoutForm.calories.value), 
                date: workoutForm.date.value
            };
            workouts.push(newWorkout);
            updateWorkoutTable();
            updateStats();
            checkAchievements(newWorkout.type.toLowerCase(), newWorkout.duration, newWorkout.calories, 0); 
            workoutForm.reset();
        });
    }


    updateWorkoutTable();
    updateFavoritesTable();
    updateStats();
});

function updateWorkoutTable() {
    
    workoutTable.innerHTML = "";
    workouts.forEach((workout, index) => {
        let row = `<tr>
            <td>${workout.type}</td>
            <td>${workout.duration}</td>
            <td>${workout.calories}</td>
            <td>${workout.date}</td>
            <td><button onclick="addToFavorites(${index})">⭐ Favorite</button></td>
        </tr>`;
        workoutTable.innerHTML += row;
    });
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function updateFavoritesTable() {
    if (!favoritesTable) return;
    favoritesTable.innerHTML = "";
    favorites.forEach((workout, index) => {
        let row = `<tr>
            <td>${workout.type}</td>
            <td>${workout.duration}</td>
            <td>${workout.calories}</td>
            <td>${workout.date}</td>
            <td><button onclick="removeFromFavorites(${index})">❌ Unfavorite</button></td>
        </tr>`;
        favoritesTable.innerHTML += row;
    });
}

// Function to remove a workout from favorites
window.removeFromFavorites = function(index) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesTable();
    alert("Workout removed from favorites!");
};
function updateStats() {
    const totalWorkoutsEl = document.querySelector("#totalWorkouts");
    const totalCaloriesEl = document.querySelector("#totalCalories");
    const avgDurationEl = document.querySelector("#avgDuration");


    if (workouts.length > 0) {
        const totalWorkouts = workouts.length;
        const totalCalories = workouts.reduce((acc, workout) => acc + parseInt(workout.calories), 0);
        const totalDuration = workouts.reduce((acc, workout) => acc + parseInt(workout.duration), 0);
        const avgDuration = totalDuration / totalWorkouts;

        totalWorkoutsEl.textContent = `Total Workouts: ${totalWorkouts}`;
        totalCaloriesEl.textContent = `Total Calories Burned: ${totalCalories}`;
        totalCaloriesEl.style.color = "#fff"; 
        avgDurationEl.textContent = `Average Workout Duration: ${avgDuration.toFixed(1)} min`;
    } else {
        totalWorkoutsEl.textContent = "Total Workouts: 0";
        totalCaloriesEl.textContent = "Total Calories Burned: 0";
        totalCaloriesEl.style.color = "#fff"; 
        avgDurationEl.textContent = "Average Workout Duration: 0 min";
    }
}

// Fitness goals
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");
  
    const form = document.querySelector("#fitnessGoals form");
    const goalType = document.querySelector("#goal-type");
    const target = document.querySelector("#goal-value");
    const deadline = document.querySelector("#goal-deadline");
    const goalsTableBody = document.querySelector("#goalsTable tbody");
  
    
    console.log("Form:", form);
    console.log("Goal Type:", goalType);
    console.log("Target:", target);
    console.log("Deadline:", deadline);
    console.log("Table Body:", goalsTableBody);
  

function updateGoalsTable() {
    if (!goalsTableBody) return;
    goalsTableBody.innerHTML = "";

    goals.forEach(goal => {
        let progress = 0;
        let currentValue = 0;
        

        switch (goal.goalType.toLowerCase()) {
            case "time":
                currentValue = workouts.reduce((acc, workout) => acc + parseInt(workout.duration), 0);
                progress = Math.min((currentValue / goal.target) * 100, 100);
                break;
            case "calories":
                currentValue = workouts.reduce((acc, workout) => acc + parseInt(workout.calories), 0);
                progress = Math.min((currentValue / goal.target) * 100, 100);
                break;
            case "sessions":
                currentValue = workouts.length;
                progress = Math.min((currentValue / goal.target) * 100, 100);
                break;
        }

        const achievedGoalsCount = achievementsArr.length;
        let badges = "None";
        if (achievedGoalsCount >= 10) {
            badges = "Platinum";
        } else if (achievedGoalsCount >= 5) {
            badges = "Gold";
        } else if (achievedGoalsCount >= 3) {
            badges = "Silver";
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${goal.goalType}</td>
            <td>${goal.target}</td>
            <td>${goal.deadline}</td>
            <td>${badges}</td>
            <td>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%">${progress.toFixed(1)}%</div>
                </div>
            </td>
        `;
        goalsTableBody.appendChild(row);
    });
}
  
    // Form submission
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Form submitted");
  
            
            const newGoal = {
                goalType: goalType.value,
                target: Number(target.value),
                deadline: deadline.value,
                created: new Date().toISOString()
            };
  
            console.log("New goal:", newGoal);
  
            
            goals.push(newGoal);
            localStorage.setItem("goals", JSON.stringify(goals));
  
            
            updateGoalsTable();
            alert(`Goal set: ${newGoal.target} ${newGoal.goalType} by ${newGoal.deadline}`);
  
            
            form.reset();
        });
    } else {
        console.error("Form not found");
    }
  
    
    updateGoalsTable();
});

// Additional stats and chart functions
function updateStats() {
    const totalWorkoutsEl = document.querySelector("#totalWorkouts");
    const totalCaloriesEl = document.querySelector("#totalCalories");
    const avgDurationEl = document.querySelector("#avgDuration");

    if (!totalWorkoutsEl || !totalCaloriesEl || !avgDurationEl) {
        return;
    }

    if (workouts.length > 0) {
        const totalWorkouts = workouts.length;
        const totalCalories = workouts.reduce((acc, workout) => acc + parseInt(workout.calories), 0);
        const totalDuration = workouts.reduce((acc, workout) => acc + parseInt(workout.duration), 0);
        const avgDuration = totalDuration / totalWorkouts;

        totalWorkoutsEl.textContent = `Total Workouts: ${totalWorkouts}`;
        totalCaloriesEl.textContent = `Total Calories Burned: ${totalCalories}`;
        totalCaloriesEl.style.color = "#fff";
        avgDurationEl.textContent = `Average Workout Duration: ${avgDuration.toFixed(1)} min`;
        
        updateCaloriesChart();
        updateDurationChart();
    } else {
        totalWorkoutsEl.textContent = "Total Workouts: 0";
        totalCaloriesEl.textContent = "Total Calories Burned: 0";
        totalCaloriesEl.style.color = "#fff";
        avgDurationEl.textContent = "Average Workout Duration: 0 min";
    }
}

function updateCaloriesChart() {
    const ctx = document.getElementById("caloriesChart")?.getContext("2d");
    if (!ctx) return;

    const labels = workouts.map((_, index) => `Workout ${index + 1}`);
    const data = workouts.map(workout => parseInt(workout.calories));

    new Chart(ctx, {
        type: "bar", 
        data: {
            labels: labels,
            datasets: [{
                label: "Calories Burned",
                data: data,
                backgroundColor: "rgba(255, 159, 10, 0.8)", 
                borderColor: "rgba(255, 159, 10, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Calories Burned",
                        color: "#333"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Workouts",
                        color: "#333"
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            }
        }
    });
}

function updateDurationChart() {
    const ctx = document.getElementById("durationChart")?.getContext("2d");
    if (!ctx) return;

    const labels = workouts.map((_, index) => `Workout ${index + 1}`);
    const data = workouts.map(workout => parseInt(workout.duration));

    new Chart(ctx, {
        type: "line", 
        data: {
            labels: labels,
            datasets: [{
                label: "Duration (min)",
                data: data,
                borderColor: "rgba(255, 159, 10, 1)",
                backgroundColor: "rgba(255, 159, 10, 0.2)",
                fill: true,
                tension: 0.3 
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Duration (minutes)",
                        color: "#333"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Workouts",
                        color: "#333"
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            }
        }
    });
}

// Delete function
window.deleteWorkout = function(index) {
    
    workouts.splice(index, 1);

    
    localStorage.setItem("workouts", JSON.stringify(workouts));

    updateWorkoutTable();
};


function updateWorkoutTable() {
    if (!workoutTable) return;
    workoutTable.innerHTML = ""; 

    
    workouts.forEach((workout, index) => {
        let row = `<tr>
            <td>${workout.type}</td>
            <td>${workout.duration}</td>
            <td>${workout.calories}</td>
            <td>${workout.date}</td>
            <td><button onclick="addToFavorites(${index})">⭐ Favorite</button></td>
            <td><button onclick="deleteWorkout(${index})">🗑️ Delete</button></td>
        </tr>`;
        workoutTable.innerHTML += row;
    });

    
    localStorage.setItem("workouts", JSON.stringify(workouts));
}



