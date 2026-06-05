const adminHabitList = document.getElementById("adminHabitList");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

const totalHabits = document.getElementById("totalHabits");
const completedHabits = document.getElementById("completedHabits");
const activeHabits = document.getElementById("activeHabits");
const progressBar = document.getElementById("progressBar");

const API_URL = "http://localhost:3000/habits";

let allHabits = [];

// Statistics
function updateStats() {

    const total = allHabits.length;

    const completed = allHabits.filter(
        habit => habit.status === "Completed"
    ).length;

    const active = allHabits.filter(
        habit => habit.status === "Active"
    ).length;

    totalHabits.textContent = total;
    completedHabits.textContent = completed;
    activeHabits.textContent = active;

    let percentage = 0;

    if(total > 0){

        percentage = Math.round(
            (completed / total) * 100
        );

    }

    progressBar.style.width =
        percentage + "%";

    progressBar.textContent =
        percentage + "%";
}
// Load Habits

async function loadHabits() {

    try {

        const response = await fetch(API_URL);

        allHabits = await response.json();

        adminHabitList.innerHTML = "";

        if(allHabits.length === 0){

    adminHabitList.innerHTML = `

        <div class="col-12">

            <div class="alert alert-info text-center">

                No habits found.
                Add your first habit!

            </div>

        </div>

    `;

}

else{

    allHabits.forEach(habit => {

        displayHabit(habit);

    });

}

updateStats();

        updateStats();

    }

    catch (error) {

        alert("Failed to load habits");

        console.error(error);

    }

}

function displayHabit(habit) {

    const card = document.createElement("div");

    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `

        <div class="card shadow admin-card">

            <div class="card-body">

                <h4>${habit.name}</h4>

                <p>
                    <strong>Category:</strong>
                    ${habit.category}
                </p>

                <p>
                    <strong>Status:</strong>

                    <span class="${
                        habit.status === "Completed"
                        ? "text-success"
                        : "text-warning"
                    }">

                        ${habit.status}

                    </span>

                </p>

                <div class="d-flex gap-2">

                    <button
                        class="btn btn-success"
                        onclick="completeHabit('${habit.id}')"
                    >
                        Mark Complete
                    </button>

                    <button
                        class="btn btn-primary"
                        onclick="editHabit('${habit.id}')"
                    >
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteHabit('${habit.id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    `;

    adminHabitList.appendChild(card);

}

// Delete Habit

async function deleteHabit(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this habit?"
    );

    if (!confirmation) {

        return;

    }

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        loadHabits();

    }

    catch (error) {

        alert("Delete failed");

        console.error(error);

    }

}

// Complete Habit

async function completeHabit(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                status: "Completed"

            })

        });

        loadHabits();

    }

    catch (error) {

        alert("Update failed");

        console.error(error);

    }

}
async function editHabit(id){

    const habit = allHabits.find(
        h => h.id == id
    );

    const newName = prompt(
        "Edit Habit Name:",
        habit.name
    );

    if(!newName){
        return;
    }

    const newCategory = prompt(
        "Edit Category (Fitness/Study/Health):",
        habit.category
    );

    if(!newCategory){
        return;
    }

    const newStatus = prompt(
        "Edit Status (Active/Completed):",
        habit.status
    );

    if(!newStatus){
        return;
    }

    try{

        await fetch(`${API_URL}/${id}`,{

            method:"PATCH",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:newName,
                category:newCategory,
                status:newStatus

            })

        });

        alert("Habit updated successfully!");

        loadHabits();

    }

    catch(error){

        alert("Edit failed");

    }

}

// Events

searchInput.addEventListener(
    "input",
    filterHabits
);

categoryFilter.addEventListener(
    "change",
    filterHabits
);

statusFilter.addEventListener(
    "change",
    filterHabits
);

// Start App

loadHabits();