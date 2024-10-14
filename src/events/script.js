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


// Stripe checkout
const stripe = Stripe('your-publishable-key');

document.getElementById('checkout-btn').addEventListener('click', async () => {
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
    });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
});


// Example for front-end AJAX call (register button)
function registerForEvent(eventId) {
    fetch('/register-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_id: eventId
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Event successfully registered!');
            } else {
                alert('Error registering event');
            }
        });
}

// On load of the cart page
window.onload = function () {
    fetch('/get-registered-events')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Render the registered events in the DOM
                const cartContainer = document.getElementById('cart-items');
                data.events.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.innerHTML = `${event.name} - ₹${event.price}`; // Use ₹ instead of $
                    cartContainer.appendChild(eventItem);
                });
                document.getElementById('total-amount').innerText = `₹${data.totalAmount}`; // Use ₹ for total amount
            } else {
                document.getElementById('cart-items').innerHTML = "<p>Your cart is empty.</p>";
            }
        });
}
