document.addEventListener("DOMContentLoaded", async () => {
    const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRhBfkLZwlSmj2Rh0w8AFLlirlzCm_26qZnf4tIcE5e8qgqQz7NtFBZyhBRX61TB0-jCignTKJNdOty/pub?gid=0&single=true&output=tsv';
    const tableContainer = document.getElementById("tableContainer");

    async function fetchTableData() {
        try {
            const response = await fetch(dataUrl);
            const csvData = await response.text();
            return csvData.split('\n').map(row => row.split('\t'));
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function createTable(data) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table header
        const headerRow = document.createElement('tr');
        ['Column 1', 'Column 2', 'Column 3'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create table rows
        data.forEach(row => {
            const tr = document.createElement('tr');
            row.slice(0, 3).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }

    const tableData = await fetchTableData();
    tableContainer.innerHTML = ''; // Clear previous content
    if (tableData.length > 0) {
        const table = createTable(tableData);
        tableContainer.appendChild(table);
    } else {
        tableContainer.innerHTML = '<p>No data available.</p>';
    }
});
