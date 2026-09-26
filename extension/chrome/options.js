// Saves options to chrome.storage
const saveOptions = () => {
  const calc = document.getElementById('calc').checked;
  const typechart = document.getElementById('typechart').checked;

  chrome.storage.sync.set(
    { calc: calc, typechart: typechart },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { calc: true, typechart: false },
    (items) => {
      document.getElementById('calc').checked = items.calc;
      document.getElementById('typechart').checked = items.typechart;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
