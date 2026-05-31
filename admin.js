const adminHabitList = document.getElementById("adminHabitList");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");

const totalHabits = document.getElementById("totalHabits");
const completedHabits = document.getElementById("completedHabits");
const activeHabits = document.getElementById("activeHabits");

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
}

// Load Habits

async function loadHabits() {

    try {

        const response = await fetch(API_URL);

        allHabits = await response.json();

        adminHabitList.innerHTML = "";

        allHabits.forEach(habit => {

            displayHabit(habit);

        });

        updateStats();

    }

    catch (error) {

        alert("Failed to load habits");

        console.error(error);

    }

}

// Display Habit

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

// Search + Filters

function filterHabits() {

    const searchText =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;

    const status =
        statusFilter.value;

    adminHabitList.innerHTML = "";

    const filteredHabits =
        allHabits.filter(habit => {

            const matchSearch =
                habit.name.toLowerCase()
                .includes(searchText);

            const matchCategory =
                category === ""
                ||
                habit.category === category;

            const matchStatus =
                status === ""
                ||
                habit.status === status;

            return (
                matchSearch &&
                matchCategory &&
                matchStatus
            );

        });

    filteredHabits.forEach(habit => {

        displayHabit(habit);

    });

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