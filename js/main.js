const form = document.getElementById('form_consulta');
const inputs = form.querySelectorAll('input, textarea, select');
const formInputs = document.getElementsByClassName('form_input');
const btnSend = document.getElementById('send');
const subject = document.getElementById('subject');
const other = document.getElementsByClassName('last_input');
const btnReset = document.getElementById('reset');
var requests = [];

window.onload = () => {
  var loadRequests = localStorage.getItem('requests');
  if (loadRequests !== null) {
    requests = JSON.parse(loadRequests);
  }
};

function removeDisable(tag, index = -1) {
  let attribute = 'disabled';
  tag.removeAttribute(attribute);
  tag.classList.remove('disable');
  if (index != -1) {
    formInputs[index].classList.remove('disable');
  }
}

function enableButton() {
  if (inputs[2].value != '') {
    removeDisable(btnSend);
  }
}

function sendInfo() {
  var request = [];

  for (let i = 0; i < inputs.length; i++) {
    request.push(inputs[i].value);
    console.log(request);
  }

  requests.push(request);
  localStorage.setItem('requests', JSON.stringify(requests));
}

inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value != '') {
      removeDisable(inputs[index + 1], index + 1);
      if (index == 2) {
        enableButton();
      }
      return;
    }
  });
});

subject.addEventListener('input', () => {
  var options = Array.from(subject.options);
  if (options[subject.selectedIndex].value !== '3') {
    other[0].classList.remove('show');
    return;
  }
  other[0].classList.add('show');
});

btnSend.addEventListener('click', () => {
  sendInfo();
});

btnReset.addEventListener('click', () => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
});

function renderTable(requests) {
  const tableDiv = document.getElementById('table');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headers = ['Nombre', 'Correo electrónico', 'Asunto', 'Mensaje'];
  const headerRow = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  requests.forEach((request) => {
    const row = document.createElement('tr');
    request.forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  tableDiv.innerHTML = '';
  tableDiv.appendChild(table);
}

window.onload = () => {
  var loadRequests = localStorage.getItem('requests');
  if (loadRequests !== null) {
    requests = JSON.parse(loadRequests);
    renderTable(requests);
  }
};

function sendInfo() {
  var request = [];

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value != '') {
      request.push(inputs[i].value);
    }
  }
  requests.push(request);
  localStorage.setItem('requests', JSON.stringify(requests));
  renderTable(requests);
}
