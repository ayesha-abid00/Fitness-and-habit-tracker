const habitForm = document.getElementById("habitForm");

const habitList = document.getElementById("habitList");

habitForm.addEventListener("submit", function(e){

    e.preventDefault();

    // GET VALUES

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

    // CREATE CARD

    const card = document.createElement("div");

    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `

        <div class="card shadow habit-card h-100">

            <div class="card-body">

                <h3 class="card-title">
                    ${habitName}
                </h3>

                <p>
                    <strong>Category:</strong>
                    ${habitCategory}
                </p>

                <p>
                    <strong>Target Days:</strong>
                    ${targetDays}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${habitStatus}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${habitDescription}
                </p>

            </div>

        </div>

    `;

    // SHOW CARD

    habitList.appendChild(card);

    // RESET FORM

    habitForm.reset();

});