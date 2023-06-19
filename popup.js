window.onload = function() {
    chrome.storage.local.get(['totalFeetCount'], function(result) {
        document.getElementById('feetCount').textContent = result.totalFeetCount ? result.totalFeetCount : 0;
    });
}
