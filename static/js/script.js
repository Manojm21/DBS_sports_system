document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body'),
        sidebar = body.querySelector('nav'),
        toggle = body.querySelector(".toggle"),
        searchBtn = body.querySelector(".search-box"),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text"),
        homeSection = document.querySelector('.home'),
        wrapperSection = document.querySelector('.card-wrapper');

    // Always set the initial state to dark mode
    body.classList.add('dark');

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        adjustHomeMargin();
        adjustWrapperMargin();
    });

    searchBtn.addEventListener("click", () => {
        sidebar.classList.remove("close");
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
        } else {
            modeText.innerText = "Dark mode";
        }

        adjustHomeMargin();
        adjustWrapperMargin();
    });

    const adjustHomeMargin = () => {
        const sidebarWidth = 50;
        if (homeSection) {
            homeSection.style.marginLeft = sidebar.classList.contains('close') ? '0' : sidebarWidth + 'px';
        }
    };

    const adjustWrapperMargin = () => {
        const sidebarWidth = 130;
        if (wrapperSection) {
            wrapperSection.style.marginLeft = sidebar.classList.contains('close') ? '0' : sidebarWidth + 'px';
        }
    };

    // Dynamic arrow icon for cricket, football, and volleyball links
    const sportLinks = document.querySelectorAll('.sport-link');
    sportLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove existing arrow icons
            document.querySelectorAll('.arrow-icon').forEach(icon => icon.remove());

            // Create and append the arrow icon to the arrow container
            const arrowContainer = document.querySelector('.arrow-container');
            const arrowIcon = document.createElement('i');
            arrowIcon.className = 'fas fa-arrow-right arrow-icon';
arrowIcon.style.fontSize = '80px'; // Adjust the size as needed
arrowIcon.style.color = 'red'; // Set the color to white
arrowIcon.style.position = 'relative'; // Set position to enable animation

            // Create a style element
            const styleElement = document.createElement('style');
            document.head.appendChild(styleElement);

            // Access the style sheet of the created style element
            const styleSheet = styleElement.sheet;

            // Add keyframes to the style sheet
            styleSheet.insertRule('@keyframes moveLeftRight { 0% { left: 0; } 50% { left: 8px; } 100% { left: 0; } }', 0);

            // Apply the animation to the arrowIcon
            arrowIcon.style.animation = 'moveLeftRight 1s ease infinite'; // Adjust animation duration as needed


            arrowContainer.appendChild(arrowIcon);

            // Scroll to the login button
            const loginButton = document.querySelector('.btn.btn-primary');
            loginButton.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
    });



    // Adjust the home and wrapper section margins on page load
    adjustHomeMargin();
    adjustWrapperMargin();

    // Adjust the home and wrapper section margins when the window is resized
    window.addEventListener('resize', () => {
        adjustHomeMargin();
        adjustWrapperMargin();
    });
});
