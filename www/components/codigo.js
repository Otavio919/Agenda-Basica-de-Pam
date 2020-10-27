// This is a JavaScript file
window.onload = function () {
  update();
} 

function addContactFun() {
  if(document.getElementById('addContact').innerHTML == ""){
    document.getElementById('addContact').innerHTML = '<input type="text" class="mt-2 form-control " placeholder="NOME:" id="name"> <br> <input type="tel" class="form-control" placeholder="TELEFONE:" id="tel"> <br> <input type="email" class="form-control" placeholder="E-MAIL:" id="email"> <button class="btn btn-outline-light mt-2" onclick="showConfirm()" id="btnAdd">ADICIONAR</button> <br>';
    document.getElementById('btnAdd').innerHTML = 'CANCELAR';
  }
  else{
    document.getElementById('addContact').innerHTML = '';
    document.getElementById('btnAdd').innerHTML = 'ADICIONAR CONTATO';
  }
}

function onConfirm(button) {
  if(button == 1){
    var name, tel, email;
    name = document.getElementById('name').value;
    tel = document.getElementById('tel').value;
    email = document.getElementById('email').value;

    var con = localStorage.length + 1;

    if(localStorage.getItem(con) == null) {
      var contact = {name, tel, email};
      localStorage.setItem(con, JSON.stringify(contact));
    }else {
      con += 1;
      var contact = {name, tel, email};
      localStorage.setItem(con, JSON.stringify(contact));
    }
    document.getElementById('addContact').innerHTML = '';
    document.getElementById('btnAdd').innerHTML = 'ADICIONAR CONTATO';
  }
  if (button == 2) {
    navigator.notification.alert(
      'Operação cancelada!',
      '',         
      'ATENÇÂO',            
      'OKAY'                  
    );
  }

  update();
}

function showConfirm() {
  var name;
  name = document.getElementById('name').value;

  navigator.notification.confirm(
    'Deseja mesmo adicionar: ' + name,  
    onConfirm,
    'ATENÇÂO',
    'Adicionar, Cancelar'
  );
}

function update() {
  document.getElementById('listing').innerHTML = '';
  for(var x = 0; x <= localStorage.length; x++){
    var y = localStorage.key(x);
    if(localStorage.getItem(y) != null){
      var contactSave = JSON.parse(localStorage.getItem(y));
      document.getElementById('listing').innerHTML += '<tr><td scope="row">'+contactSave.name+'</td> <td>'+contactSave.tel+'</td> <td>'+contactSave.email+'</td><td class="p-2"><button class="btn btn-outline-light" id='+y+' onclick="excluir('+y+')">X</button></td></tr>';
    }
  }
}

function excluir(val) {
  localStorage.removeItem(val);
  update();
}
