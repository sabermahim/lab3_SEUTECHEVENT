# lab3_SEUTECHEVENT
SEU TechXplore 2026 — Event Information & Registration Website

A single-page website built for CSE472: Web and Internet Programming Lab at Southeast University. The project simulates an event information and registration page for a fictional annual technology festival, SEU TechXplore 2026, organized by the Department of Computer Science and Engineering.

Live Site: SEU Tech Event Information and Registration Page

About

This project was built incrementally across the course labs — starting with plain HTML structure, then styled with CSS, and finally made interactive with JavaScript. It includes an event details page, a registration form, and a simple admin panel to view submitted registrations.

Features
Semantic HTML5 structure (header, nav, main, sections, footer)
Fully responsive, dark-themed design
Event schedule table, tracks list, and participation rules
Registration form with validation (name, student ID, email, date, participation type, preferences, track)
JavaScript-powered interactions:
Live registration status check
Seat availability check (variable + if...else)
Personalised greeting using the registrant's name
Event venue lookup
Registration data saved in the browser (localStorage)
Admin panel with login, showing all registered participants in a table
University logo and custom event banner
Tech Stack
HTML5 — page structure and content
CSS3 — layout, responsive design, dark theme
JavaScript (Vanilla) — DOM manipulation, form handling, admin panel logic
Netlify — live hosting/deployment
Project Structure
cse472-web-lab-studentid/
└── labs/
    ├── lab-01-html/          # Lab 01: HTML structure
    ├── lab-02-css/           # Lab 02: CSS styling
    └── lab-03-javascript/    # Lab 03: JavaScript interactivity
        ├── index.html
        ├── css/
        │   └── style.css
        ├── js/
        │   └── script.js
        └── assets/
            └── images/
Labs Completed
 Lab 01 — HTML structure: semantic tags, headings, lists, table, form
 Lab 02 — CSS styling: layout, colors, typography, responsive design
 Lab 03 — JavaScript foundations: variables, if...else, functions, onclick, getElementById(), textContent, .value
Running Locally
Clone the repository:
bash
   git clone https://github.com/your-username/your-repo-name.git
Open labs/lab-03-javascript/index.html in your browser, or
Use the VS Code Live Server extension for the best experience (right-click index.html → Open with Live Server).
Admin Panel

The site includes a demo admin panel (accessible via the Admin link in the navigation bar) that lists everyone who has registered through the form on the current browser/device. Login credentials are provided separately in the Lab Report and are for academic demonstration purposes only.

Author

Saber Hossain Mahim Event Coordinator, SEU TechXplore 2026 Department of Computer Science and Engineering, Southeast University

Course: CSE472 — Web and Internet Programming Lab Course Teacher: Mr. Abid Ahmad
