const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(btn => btn.classList.remove('bg-gray-900', 'text-white'));
        tab.classList.add('bg-gray-900', 'text-white');

        contents.forEach(content => content.classList.add('hidden'));
        document.getElementById(`content${index + 1}`).classList.remove('hidden');
    });
});










