const adminHabitList = document.getElementById("adminHabitList");

const API_URL = "http://localhost:3000/habits";


// LOAD ALL HABITS

async function loadHabits(){

    try{

        const response = await fetch(API_URL);

        const habits = await response.json();

        adminHabitList.innerHTML = "";

        habits.forEach(habit => {

            displayHabit(habit);

        });

    }

    catch(error){

        alert("Failed to load habits");

    }

}


// DISPLAY HABIT

function displayHabit(habit){

    const card = document.createElement("div");

    card.classList.add("col-md-4","mb-4");

    card.innerHTML = `

    <div class="card shadow admin-card">

        <div class="card-body">

            <h4>${habit.name}</h4>

            <p>
            Category: ${habit.category}
            </p>

            <p>
            Status: ${habit.status}
            </p>

            <button
                class="btn btn-danger"
                onclick="deleteHabit('${habit.id}')"
            >
                Delete
            </button>

        </div>

    </div>

    `;

    adminHabitList.appendChild(card);

}async function deleteHabit(id){

    const confirmation = confirm(
        "Are you sure you want to delete this habit?"
    );

    if(!confirmation){

        return;

    }

    try{

        const response = await fetch(

            `${API_URL}/${id}`,

            {
                method:"DELETE"
            }

        );

        if(!response.ok){

            throw new Error();

        }

        loadHabits();

    }

    catch(error){

        alert("Delete failed");

    }

}
loadHabits();