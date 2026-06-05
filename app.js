const habitForm = document.getElementById("habitForm");

const habitList = document.getElementById("habitList");

const API_URL = "http://localhost:3000/habits";


// GET HABITS

async function fetchHabits(){

    try{

        const response = await fetch(API_URL);

        const habits = await response.json();

        habitList.innerHTML = "";

        habits.forEach((habit) => {

            displayHabit(habit);

        });

    }

    catch(error){

        alert("Error loading habits");

    }

}


// DISPLAY HABIT

function displayHabit(habit){

    const card = document.createElement("div");

    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `

        <div class="card shadow habit-card h-100">

            <div class="card-body">

                <h3 class="card-title">
                    ${habit.name}
                </h3>
<p>
    <strong>Category:</strong>

    <span class="badge bg-primary">

        ${habit.category}

    </span>

</p>
                <p>
                    <strong>Target Days:</strong>
                    ${habit.days}
                </p>
<p>
    <strong>Status:</strong>

    <span class="${
        habit.status === "Completed"
        ? "badge bg-success"
        : "badge bg-warning text-dark"
    }">

        ${habit.status}

    </span>

</p>

                <p>
                    <strong>Description:</strong>
                    ${habit.description}
                </p>

            </div>

        </div>

    `;

    habitList.appendChild(card);

}


// ADD HABIT

habitForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const habitName = document.getElementById("habitName").value;

    const habitCategory = document.getElementById("habitCategory").value;

    const targetDays = document.getElementById("targetDays").value;

    const habitStatus = document.getElementById("habitStatus").value;

    const habitDescription = document.getElementById("habitDescription").value;


    // VALIDATION

    if(
        habitName === "" ||
        habitCategory === "" ||
        targetDays === "" ||
        habitStatus === "" ||
        habitDescription === ""
    ){

        alert("Please fill all fields");

        return;

    }


    // NEW HABIT OBJECT

    const newHabit = {

        name: habitName,
        category: habitCategory,
        days: targetDays,
        status: habitStatus,
        description: habitDescription

    };


    try{

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(newHabit)

        });


        if(!response.ok){

            throw new Error("Failed to add");

        }

fetchHabits();

habitForm.reset();

alert("Habit added successfully!");

    }

    catch(error){

        alert("Error adding habit");

    }

});


// LOAD HABITS ON PAGE LOAD

fetchHabits();