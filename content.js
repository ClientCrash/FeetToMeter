// Find and replace mentions of feet with meters
function convertFeetToMeters() {
    const elements = document.getElementsByTagName("*");
    const feetRegex = /(\d+(\.\d+)?)\s*(ft|feet)\b/gi;
    let totalElements = elements.length;
    let feetCount = 0;
  
    for (let i = 0; i < totalElements; i++) {
      const element = elements[i];
  
      for (let j = 0; j < element.childNodes.length; j++) {
        const node = element.childNodes[j];
  
        if (node.nodeType === 3) { // Text node
          const text = node.nodeValue;
  
          // Replace feet mentions with meters
          const convertedText = text.replace(feetRegex, function(match, p1, p2, p3) {
            const feet = parseFloat(p1);
            const meters = (feet * 0.3048).toFixed(2);
            feetCount++;
            
            return `<span class="convert" data-feet="${match}">${meters} m <span class="revert" style="cursor: pointer;">⟳</span></span>`;
          });
  
          // Update the text content if a replacement occurred
          if (convertedText !== text) {
            element.innerHTML = convertedText;
          }
        }
      }
    }
  
    attachRevertHandlers();
    logFeetCount(feetCount);
}

// Attach event handlers to all "revert" elements
function attachRevertHandlers() {
    const revertEls = document.querySelectorAll(".revert");
    revertEls.forEach(el => {
        el.addEventListener("click", function() {
            const parent = this.parentElement;
            parent.textContent = parent.dataset.feet;
        });
    });
}

function logFeetCount(feetCount) {
    console.log(`Total feet found: ${feetCount}`);
    storeFeetCount(feetCount);  // store the count to local storage
}

// Store feet count to Chrome storage
function storeFeetCount(feetCount) {
    chrome.storage.local.get(['totalFeetCount'], function(result) {
        var total = (result.totalFeetCount ? result.totalFeetCount : 0) + feetCount;
        chrome.storage.local.set({totalFeetCount: total}, function() {
            console.log('Total feet count updated to ' + total);
        });
    });
}

// Call the conversion function
convertFeetToMeters();
