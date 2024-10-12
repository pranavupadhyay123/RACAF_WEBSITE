const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

// Function to set the first tab as active on page load
function setInitialActiveTab() {
    // Set the first tab as active
    tabs[0].classList.add('bg-gray-900', 'text-white');
    
    // Show the first tab's content
    contents.forEach(content => content.classList.add('hidden'));
    document.getElementById(`content1`).classList.remove('hidden');
}

// Event listeners for tab clicks
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(btn => btn.classList.remove('bg-gray-900', 'text-white'));
        tab.classList.add('bg-gray-900', 'text-white');

        contents.forEach(content => content.classList.add('hidden'));
        document.getElementById(`content${index + 1}`).classList.remove('hidden');
    });
});

// Set the initial active tab on page load
setInitialActiveTab();








    // Function to handle the opening of the modals
    document.querySelectorAll('.rules-button').forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).classList.remove('hidden');
        });
    });

    // Function to handle closing the modals
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.rules-modal').classList.add('hidden');
        });
    });

    // Optional: Close modal when clicking outside the modal content
    document.querySelectorAll('.rules-modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });


    