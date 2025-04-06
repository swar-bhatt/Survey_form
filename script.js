// Load existing data when page loads
document.addEventListener('DOMContentLoaded', loadData);

function submitForm(event) {
    event.preventDefault();

    // Get form values
    const surveyData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        city: document.getElementById('city').value,
        household: document.getElementById('household').value,
        income: document.getElementById('income').value,
        ngoSupport: document.querySelector('input[name="ngoSupport"]:checked').value,
        timestamp: new Date().toISOString()
    };

    // Store data
    saveData(surveyData);

    // Reset form
    document.getElementById('surveyForm').reset();

    // Update table
    loadData();
}

function saveData(data) {
    // Get existing data or initialize empty array
    let existingData = JSON.parse(localStorage.getItem('surveyData')) || [];
    
    // Add new data
    existingData.push(data);
    
    // Save back to localStorage
    localStorage.setItem('surveyData', JSON.stringify(existingData));
}

function loadData() {
    const dataBody = document.getElementById('dataBody');
    const existingData = JSON.parse(localStorage.getItem('surveyData')) || [];
    
    // Clear existing table content
    dataBody.innerHTML = '';

    // Populate table
    existingData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.phone}</td>
            <td>${data.city}</td>
            <td>${data.household}</td>
            <td>$${data.income}</td>
            <td>${data.ngoSupport}</td>
        `;
        dataBody.appendChild(row);
    });
}

// Optional: Clear all data (uncomment to use and add button in HTML)
/*
function clearData() {
    localStorage.removeItem('surveyData');
    loadData();
}
*/