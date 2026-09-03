// ============================================================
// CSE472 Lab 03 - JavaScript Foundations and Simple Interaction
// Simple interactive functions required for this laboratory.
// These use only: variables, if...else, functions, onclick,
// document.getElementById() and textContent / value.
// ============================================================

// Stores the number of seats currently available for the event.
let availableSeats = 12;

// Runs when the "Check Registration Status" button is clicked.
// Finds the registrationStatus paragraph and updates its text.
function checkRegistration() {
    let message = document.getElementById("registrationStatus");
    message.textContent = "Registration is currently open.";
}

// Runs when the "Check Seat Availability" button is clicked.
// Uses a simple if...else decision based on availableSeats.
function checkSeats() {
    let message = document.getElementById("seatMessage");
    if (availableSeats > 0) {
        message.textContent = "Seats are available. Remaining seats: " + availableSeats;
    } else {
        message.textContent = "Sorry, no seats are available.";
    }
}

// Runs when the "Show Greeting" button is clicked.
// Reads the value typed in the Full Name field (id="studentName")
// and writes a personalised greeting into greetingMessage.
function showGreeting() {
    let name = document.getElementById("studentName").value;
    let output = document.getElementById("greetingMessage");
    output.textContent = "Welcome, " + name + "! We can't wait to see you at SEU TechXplore 2026.";
}

// Independent improvement (Lab 03, Section 19.2): a small button of our
// own that calls a function and updates one paragraph, using only the
// concepts taught in this laboratory.
function showVenue() {
    let message = document.getElementById("venueMessage");
    message.textContent = "Venue: Southeast University Main Campus, Dhaka. Check the Event Schedule section above for the exact room.";
}


// ============================================================
// Site functionality: registration form storage and admin panel
// Wrapped in an IIFE so these internal variables and helper
// functions stay private and do not clash with the functions above.
// ============================================================
    (function () {
        "use strict";

        var STORAGE_KEY = "seuTechXploreRegistrations";
        var ADMIN_EMAIL = "admin@seu.edu.bd";
        var ADMIN_PASSWORD = "admin@seu";

        // ---------- Helpers ----------
        function getRegistrations() {
            try {
                var raw = localStorage.getItem(STORAGE_KEY);
                return raw ? JSON.parse(raw) : [];
            } catch (e) {
                return [];
            }
        }

        function saveRegistrations(list) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
                return true;
            } catch (e) {
                return false;
            }
        }

        function escapeHtml(str) {
            var div = document.createElement("div");
            div.textContent = str == null ? "" : String(str);
            return div.innerHTML;
        }

        function formatDateTime(iso) {
            try {
                var d = new Date(iso);
                return d.toLocaleString();
            } catch (e) {
                return iso;
            }
        }

        // ---------- Registration form ----------
        var regForm = document.getElementById("registration-form");
        var regSuccess = document.getElementById("registration-success");

        if (regForm) {
            regForm.addEventListener("submit", function (e) {
                e.preventDefault();

                var fullname = document.getElementById("studentName").value.trim();
                var studentid = document.getElementById("studentid").value.trim();
                var email = document.getElementById("email").value.trim();
                var preferredDate = document.getElementById("preferred-date").value;
                var participationType = regForm.querySelector('input[name="participation-type"]:checked');
                var preferences = Array.prototype.slice.call(regForm.querySelectorAll('input[name="preferences"]:checked')).map(function (el) { return el.value; });
                var track = document.getElementById("track").value;
                var trackLabel = document.getElementById("track").selectedOptions[0] ? document.getElementById("track").selectedOptions[0].text : track;
                var notes = document.getElementById("notes").value.trim();

                var entry = {
                    fullname: fullname,
                    studentid: studentid,
                    email: email,
                    preferredDate: preferredDate,
                    participationType: participationType ? participationType.value : "",
                    preferences: preferences,
                    track: trackLabel,
                    notes: notes,
                    submittedAt: new Date().toISOString()
                };

                var list = getRegistrations();
                list.push(entry);
                saveRegistrations(list);

                if (regSuccess) {
                    regSuccess.hidden = false;
                }
                regForm.reset();

                if (regSuccess) {
                    setTimeout(function () {
                        regSuccess.hidden = true;
                    }, 6000);
                }
            });
        }

        // ---------- Admin panel ----------
        var loginBox = document.getElementById("admin-login-box");
        var dashboard = document.getElementById("admin-dashboard");
        var loginForm = document.getElementById("admin-login-form");
        var loginError = document.getElementById("admin-login-error");
        var tableBody = document.getElementById("admin-table-body");
        var regCount = document.getElementById("reg-count");
        var emptyMessage = document.getElementById("admin-empty-message");
        var refreshBtn = document.getElementById("admin-refresh-btn");
        var clearBtn = document.getElementById("admin-clear-btn");
        var logoutBtn = document.getElementById("admin-logout-btn");

        function renderTable() {
            var list = getRegistrations();
            tableBody.innerHTML = "";

            if (list.length === 0) {
                emptyMessage.hidden = false;
            } else {
                emptyMessage.hidden = true;
                list.forEach(function (entry, index) {
                    var tr = document.createElement("tr");
                    tr.innerHTML =
                        "<td>" + (index + 1) + "</td>" +
                        "<td>" + escapeHtml(entry.fullname) + "</td>" +
                        "<td>" + escapeHtml(entry.studentid) + "</td>" +
                        "<td>" + escapeHtml(entry.email) + "</td>" +
                        "<td>" + escapeHtml(entry.preferredDate) + "</td>" +
                        "<td>" + escapeHtml(entry.participationType) + "</td>" +
                        "<td>" + escapeHtml(entry.preferences && entry.preferences.length ? entry.preferences.join(", ") : "\u2014") + "</td>" +
                        "<td>" + escapeHtml(entry.track) + "</td>" +
                        "<td>" + escapeHtml(formatDateTime(entry.submittedAt)) + "</td>";
                    tableBody.appendChild(tr);
                });
            }
            regCount.textContent = list.length;
        }

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();
                var email = document.getElementById("admin-email").value.trim().toLowerCase();
                var password = document.getElementById("admin-password").value;

                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    loginError.hidden = true;
                    loginBox.hidden = true;
                    dashboard.hidden = false;
                    loginForm.reset();
                    renderTable();
                } else {
                    loginError.hidden = false;
                }
            });
        }

        if (refreshBtn) {
            refreshBtn.addEventListener("click", renderTable);
        }

        if (clearBtn) {
            clearBtn.addEventListener("click", function () {
                if (window.confirm("This will permanently delete all stored registrations from this browser. Continue?")) {
                    saveRegistrations([]);
                    renderTable();
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", function () {
                dashboard.hidden = true;
                loginBox.hidden = false;
            });
        }
    })();
