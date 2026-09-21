/* =========================
HEALTHDESK JAVASCRIPT
========================= */

/* =========================
HAMBURGER MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

menuButton.addEventListener("click", function () {

    navigation.classList.toggle("show");

    const isOpen =
        navigation.classList.contains("show");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});

}

/* =========================
LOGIN
FAKE LOGIN FOR PROTOTYPE
========================= */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("loginMessage");


    /*
       DEMO LOGIN

       Any email and any password will work
       as long as both fields are filled.
    */

    if (email === "") {

        message.textContent =
            "Please enter your email.";

        message.className =
            "form-message error";

        return;

    }


    if (password === "") {

        message.textContent =
            "Please enter your password.";

        message.className =
            "form-message error";

        return;

    }


    /*
       Save the email temporarily in the browser.
       This is NOT a real login system.
    */

    localStorage.setItem(
        "healthdeskLoggedIn",
        "true"
    );

    localStorage.setItem(
        "healthdeskEmail",
        email
    );


    message.textContent =
        "Login successful! Redirecting...";

    message.className =
        "form-message success";


    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 700);

});

}

/* =========================
SIGN UP
FAKE SIGN UP FOR PROTOTYPE
========================= */

const signupForm =
document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const message =
        document.getElementById("signupMessage");


    /*
       DEMO SIGN UP

       Any name, email and password will work
       as long as all fields are filled.
    */

    if (name === "") {

        message.textContent =
            "Please enter your full name.";

        message.className =
            "form-message error";

        return;

    }


    if (email === "") {

        message.textContent =
            "Please enter your email.";

        message.className =
            "form-message error";

        return;

    }


    if (password === "") {

        message.textContent =
            "Please create a password.";

        message.className =
            "form-message error";

        return;

    }


    /*
       Save demo user information.

       This is NOT a real database.
    */

    localStorage.setItem(
        "healthdeskLoggedIn",
        "true"
    );

    localStorage.setItem(
        "healthdeskName",
        name
    );

    localStorage.setItem(
        "healthdeskEmail",
        email
    );


    message.textContent =
        "Account created! Redirecting...";

    message.className =
        "form-message success";


    setTimeout(function () {

        window.location.href =
            "dashboard.html";

    }, 700);

});

}

/* =========================
DASHBOARD USER NAME
========================= */

const welcomeMessage =
document.getElementById("welcomeMessage");

if (welcomeMessage) {

const savedName =
    localStorage.getItem("healthdeskName");

if (savedName) {

    welcomeMessage.textContent =
        "Welcome, " + savedName + "!";

}

}

/* =========================
BOOK APPOINTMENT
========================= */

const appointmentForm =
document.getElementById("appointmentForm");

if (appointmentForm) {

const dateInput =
    document.getElementById("appointmentDate");

const today =
    new Date()
        .toISOString()
        .split("T")[0];

dateInput.min = today;


appointmentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const type =
            document.getElementById(
                "appointmentType"
            ).value;

        const date =
            document.getElementById(
                "appointmentDate"
            ).value;

        const time =
            document.getElementById(
                "appointmentTime"
            ).value;

        const reason =
            document.getElementById(
                "appointmentReason"
            ).value.trim();

        const message =
            document.getElementById(
                "appointmentMessage"
            );


        if (type === "") {

            message.textContent =
                "Please select Public or Private.";

            message.className =
                "form-message error";

            return;

        }


        if (date === "") {

            message.textContent =
                "Please select a date.";

            message.className =
                "form-message error";

            return;

        }


        if (time === "") {

            message.textContent =
                "Please select a time.";

            message.className =
                "form-message error";

            return;

        }


        if (reason === "") {

            message.textContent =
                "Please enter the reason for your appointment.";

            message.className =
                "form-message error";

            return;

        }


        const appointment = {

            type: type,
            date: date,
            time: time,
            reason: reason

        };


        localStorage.setItem(
            "healthdeskAppointment",
            JSON.stringify(appointment)
        );


        message.textContent =
            "Appointment confirmed successfully!";

        message.className =
            "form-message success";


        appointmentForm.reset();

        dateInput.min = today;


        setTimeout(function () {

            window.location.href =
                "myappointment.html";

        }, 900);

    }
);

}

/* =========================
DISPLAY APPOINTMENT
========================= */

const appointmentDisplay =
document.getElementById(
"appointmentDisplay"
);

if (appointmentDisplay) {

const savedAppointment =
    localStorage.getItem(
        "healthdeskAppointment"
    );


if (savedAppointment) {

    const appointment =
        JSON.parse(savedAppointment);


    appointmentDisplay.innerHTML = `

        <div class="appointment-card">

            <div class="appointment-status">
                REQUESTED
            </div>

            <h3>
                Recent Appointment
            </h3>

            <div class="appointment-detail">

                <span>
                    Appointment Type
                </span>

                <strong>
                    ${escapeHTML(appointment.type)}
                </strong>

            </div>


            <div class="appointment-detail">

                <span>
                    Date
                </span>

                <strong>
                    ${formatDate(appointment.date)}
                </strong>

            </div>


            <div class="appointment-detail">

                <span>
                    Time
                </span>

                <strong>
                    ${formatTime(appointment.time)}
                </strong>

            </div>


            <div class="appointment-detail">

                <span>
                    Reason
                </span>

                <strong>
                    ${escapeHTML(appointment.reason)}
                </strong>

            </div>


            <button
                class="cancel-button"
                id="cancelAppointment"
                type="button"
            >
                Cancel Appointment
            </button>

        </div>

    `;


    const cancelButton =
        document.getElementById(
            "cancelAppointment"
        );


    cancelButton.addEventListener(
        "click",
        function () {

            const confirmCancel =
                confirm(
                    "Are you sure you want to cancel this appointment?"
                );


            if (!confirmCancel) {
                return;
            }


            localStorage.removeItem(
                "healthdeskAppointment"
            );


            window.location.reload();

        }
    );

}

}

/* =========================
FORMAT DATE
========================= */

function formatDate(dateString) {

const date =
    new Date(dateString + "T00:00:00");

return date.toLocaleDateString(
    "en-PH",
    {
        year: "numeric",
        month: "long",
        day: "numeric"
    }
);

}

/* =========================
FORMAT TIME
========================= */

function formatTime(timeString) {

const parts =
    timeString.split(":");

const hours =
    Number(parts[0]);

const minutes =
    Number(parts[1]);


const date =
    new Date();

date.setHours(hours);
date.setMinutes(minutes);


return date.toLocaleTimeString(
    "en-PH",
    {
        hour: "numeric",
        minute: "2-digit"
    }
);

}

/* =========================
BASIC HTML SAFETY
========================= */

function escapeHTML(text) {

const div =
    document.createElement("div");

div.textContent = text;

return div.innerHTML;

}

/* =========================
SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

window.addEventListener(
    "load",
    function () {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function () {

                console.log(
                    "HealthDesk offline mode enabled."
                );

            })
            .catch(function (error) {

                console.log(
                    "Service Worker registration failed:",
                    error
                );

            });

    }
);

}