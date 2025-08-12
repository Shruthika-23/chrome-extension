chrome.storage.local.get("timeData", (data) => {
    const reportDiv = document.getElementById("report");
    if (!data.timeData) {
        reportDiv.innerHTML = "<p>No data yet.</p>";
        return;
    }
    let html = "<ul>";
    for (const [domain, ms] of Object.entries(data.timeData)) {
        const mins = (ms / 60000).toFixed(2);
        html += <li>${domain}: ${mins} mins</li>;
    }
    html += "</ul>";
    reportDiv.innerHTML = html;
});
