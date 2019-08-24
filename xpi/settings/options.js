const getting = browser.storage.sync.get();
  getting.then(displayOptions, null);

function displayOptions(items){
  document.getElementById('server').value = items.server
  document.getElementById('token').value = items.token
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    server: document.querySelector('#server').value,
    token: document.querySelector('#token').value
  });
}

document.querySelector('form').addEventListener('submit', saveOptions);
