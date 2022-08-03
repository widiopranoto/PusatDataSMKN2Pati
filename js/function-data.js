var inputUrlSpreadSheet="https://docs.google.com/spreadsheets/d/1S1kEhlCAi1N48CR98eW-OLzgmGgjRYjIYxWPLJ9cCt8/edit?usp=sharing";
var inputIdGScript='AKfycbwwQpjerLK3moZDdr8W_ksxt8el6Ay77I7cjwIoVqpWXJSq0q0';
let username,password,usernameOnline,passwordOnline,nama,status,tingkat,inputNamaSheet;
let usernameOffline,passwordOffline,statusOnline;
usernameOffline=localStorage.getItem('usernameOffline');
tingkat=localStorage.getItem('tingkat');
if(tingkat=='X'){inputNamaSheet='X';}
if(tingkat=='XI'){inputNamaSheet='XI';}
if(tingkat=='XII'){inputNamaSheet='XII';}
if(tingkat=='XIII'){inputNamaSheet='XIII';}

function ambilItem(inputNamaSheet,usernameOffline,noKolom,idLokal,idTampil){
  var action="getItem";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  var obj=JSON.parse(this.responseText).result;	
      if(idTampil!=null){document.getElementById(idTampil).innerHTML=obj;}
	  localStorage.setItem(idLokal,obj);
    }
  };
  var teks1='https://script.google.com/macros/s/';
  var teks2=inputIdGScript;
  var teks3="/exec?";
  var teks4="inputUrlSpreadSheet=";
  var teks5=inputUrlSpreadSheet;
  var teks6="&inputNamaSheet=";
  var teks7=inputNamaSheet;
  var teks8="&action=";
  var teks9="getItem";
  var teks10="&username=";
  var teks11=usernameOffline;
  var teks12="&noKolom=";
  var teks13=noKolom;
  var teksGabung=teks1+teks2+teks3+teks4+teks5+teks6+teks7+teks8+teks9+teks10+teks11+teks12+teks13;
  var req=teksGabung;
  xhttp.open("GET", req, true);
  xhttp.send();
}

function showItem(simpanLokal,idTampil){
  document.getElementById(idTampil).innerHTML=simpanLokal;
}
function cekStatus(){
  usernameOffline=localStorage.getItem('usernameOffline');
  nama=localStorage.getItem('nama');
  status=localStorage.getItem('status');
  if(status!='logged-in'){
	localStorage.setItem('usernameOffline',null);
	localStorage.setItem('passwordOffline',null);
	localStorage.setItem('nama',null);
	//localStorage.setItem('status','Anda belum login');
  }
  if(status=='logged-in'){
	//username=localStorage.getItem('username');
	//password=localStorage.getItem('password');
	//ambilItem(inputNamaSheet,username,2,'usernameOnline');
	//ambilItem(inputNamaSheet,username,3,'passwordOnline');
  }
}
function tampilkanStatus(idTampil1,idTampil2,idTampil3){
	usernameOffline=localStorage.getItem('usernameOffline');
    nama=localStorage.getItem('nama');
    status=localStorage.getItem('status');
	showItem(usernameOnline,idTampil1);
	showItem(nama,idTampil2);
	showItem(status,idTampil3);
}
function isikanLogin(){
  status=localStorage.getItem('status');
  usernameIsian = document.getElementById('username').value;
  passwordIsian = document.getElementById('password').value; 
  tingkatIsian = document.getElementById('tingkat').value; 
  //isikan username, password, dan tingkat ke local storage
  localStorage.setItem('usernameOffline',usernameIsian);
  localStorage.setItem('passwordOffline',passwordIsian);	  
  localStorage.setItem('tingkat',tingkatIsian);
  //ambil username, password, dan tingkat dari local storage
  //usernameOffline=localStorage.getItem('usernameOffline');
  //passwordOffline=localStorage.getItem('passwordOffline');
  //tingkat=localStorage.getItem('tingkat');
  /*
  if(status!='logged-in' && usernameIsian!=null){
    localStorage.setItem('username',usernameIsian);
    localStorage.setItem('password',passwordIsian);	
  }
  if(status=='logged-in' && usernameIsian==null ){
    username=localStorage.getItem('username');
    password=localStorage.getItem('password');	
  }  
  */
}  
function cekLoginOnline(){
  //ambil usernameOffline dan passwordOffline
  usernameOffline = localStorage.getItem('usernameOffline');
  passwordOffline = localStorage.getItem('passwordOffline');
  tingkat=localStorage.getItem('tingkat');
  //ambil username dan password di cloud
  ambilItem(inputNamaSheet,usernameOffline,1,'usernameOnline');
  ambilItem(inputNamaSheet,usernameOffline,2,'nama');
  ambilItem(inputNamaSheet,usernameOffline,3,'passwordOnline');
}
function validasiLogin(){
//cek jika usernameOnline dan passwordOnline sudah tersedia
//if(usernameOnline!=null && passwordOnline!=null){
    usernameOffline=localStorage.getItem('usernameOffline');
    passwordOffline=localStorage.getItem('passwordOffline');
    usernameOnline=localStorage.getItem('usernameOnline');
    passwordOnline=localStorage.getItem('passwordOnline');  
	//if(usernameOffline!=usernameOnline || passwordOffline!=passwordOnline){localStorage.setItem('status','Anda belum login (validasi)');}
	//if(usernameOffline==usernameOnline && passwordOffline==passwordOnline){localStorage.setItem('status','logged-in');}
	var lengthPassword=localStorage.getItem('passwordOffline').length;
	if(usernameOffline!=null && passwordOffline!=null && lengthPassword==8){localStorage.setItem('status','logged-in');}
// }
}
function validasiLoginLevel2(){
//cek jika usernameOnline dan passwordOnline sudah tersedia
//if(usernameOnline!=null && passwordOnline!=null){
    usernameOffline=localStorage.getItem('usernameOffline');
    passwordOffline=localStorage.getItem('passwordOffline');
    usernameOnline=localStorage.getItem('usernameOnline');
    passwordOnline=localStorage.getItem('passwordOnline');  
	if(usernameOffline!=usernameOnline || passwordOffline!=passwordOnline){localStorage.setItem('statusOnline',1);}
	if(usernameOffline==usernameOnline && passwordOffline==passwordOnline){localStorage.setItem('statusOnline',0);}
// }
}
function logOut(){
  localStorage.clear();
  localStorage.setItem('status','Anda belum login (sudah logout)');
  showItem(status,'status_hal_beranda');
}
function cekLogoutHalLogin(){
	status=localStorage.getItem('status');
    if(status!='logged-in'){
	document.getElementById('username_hal_login').innerHTML=null; 	  
	document.getElementById('nama_hal_login').innerHTML=null; 	  
	document.getElementById('status_hal_login').innerHTML='Anda belum login (cek logout)'; 	  
	}
  if(localStorage.getItem('status')=='logged-in'){
    usernameOnline=localStorage.getItem('usernameOnline');
	ambilItem(inputNamaSheet,usernameOnline,1,'username','username_hal_login');	  
	ambilItem(inputNamaSheet,usernameOnline,2,'nama','nama_hal_login');
	document.getElementById('status_hal_login').innerHTML='Anda sudah logged-in'; 
	}
}
function tulisModal(idModal,namaData,idData){
document.write(
"<div id="+idModal+" class='modal'>"+
"<form class='modal-content animate'>"+
"<div class='container'>"+
"<span onclick="+"document.getElementById("+"'"+idModal+"'"+").style.display='none'"+" class="+"close"+">&times;</span>"+
"<label><b>"+namaData+"</b></label>"+
"<input type='text' placeholder='' id="+idData+" required>"+
"<button type='submit' onclick="+"simpanItem("+"'"+idData+"'"+")"+">Simpan</button>"+
"</div>"+
"</form>"+
"</div>");
}
function tulisModalStatus(idModal){
document.write(
"<div id="+"'"+idModal+"'"+" class='modal'>"+
"<div class='modal-content animate'>"+
"<div class='container'>"+
"<span onclick="+"document.getElementById("+"'"+idModal+"'"+").style.display='none'"+" class="+"close"+">&times;</span>"+
"<label><b>Status Login</b></label>"+
"<div class='col-sm-12 text-left'>"+
"<table class='w3-table-all'>"+
"<thead>"+
"<tr class='w3-blue'>"+
"<th>Username/NIS</th>"+
"<th>Nama</th>"+
"<th>Status Login</th>"+
"</tr>"+
"</thead>"+
"<tr>"+
"<td id='username_modal_login'></td>"+
"<td id='nama_modal_login'></td>"+
"<td id='status_modal_login'></td>"+
"</tr>"+
"</table>"+
"</div>"+
"</div>"+
"</div>"+
"</div>");
}
function simpanItem(idData){
  if(idData=='editNama')noKolom=2; 
  if(idData=='editPassword')noKolom=3; 
  //if(idData=='editKonsetrasi')noKolom=4; 
  //if(idData=='editKelas')noKolom=5; 
  if(idData=='editNIK')noKolom=6;
  if(idData=='editNISN')noKolom=7;
  if(idData=='editJenisKelamin')noKolom=8;
  if(idData=='editTempatLahir')noKolom=9;
  if(idData=='editTglLahir')noKolom=10; 
  if(idData=='editAgama')noKolom=11; 
  if(idData=='editStatusKandung')noKolom=12; 
  if(idData=='editAnakKe')noKolom=13;
  if(idData=='editAlamatSiswa')noKolom=14;
  if(idData=='editNoHPSiswa')noKolom=15;
  if(idData=='editEmailSiswa')noKolom=16;
  if(idData=='editAsalSekolah')noKolom=17;
  if(idData=='editTahunIjazah')noKolom=18;
  if(idData=='editNoIjazah')noKolom=19;
  if(idData=='editNoKIP')noKolom=20;
  if(idData=='editNamaAyah')noKolom=21;  
  if(idData=='editTahunLahirAyah')noKolom=22;
  if(idData=='editPendidikanAyah')noKolom=23;
  if(idData=='editPekerjaanAyah')noKolom=24;
  if(idData=='editPenghasilanAyah')noKolom=25;
  if(idData=='editNamaIbu')noKolom=26;
  if(idData=='editTahunLahirIbu')noKolom=27;
  if(idData=='editPendidikanIbu')noKolom=28;
  if(idData=='editPekerjaanIbu')noKolom=29;
  if(idData=='editPenghasilanIbu')noKolom=30;  
  if(idData=='editAlamatOrtu')noKolom=31;
  if(idData=='editNoHPOrtu')noKolom=32;
  if(idData=='editNamaWali')noKolom=33;
  if(idData=='editTahunLahirWali')noKolom=34;
  if(idData=='editPendidikanWali')noKolom=35;
  if(idData=='editPekerjaanWali')noKolom=36;
  if(idData=='editPenghasilanWali')noKolom=37;
  if(idData=='editAlamatWali')noKolom=38;  
  if(idData=='editNoHPWali')noKolom=39;
  if(idData=='editTinggiBadanSiswa')noKolom=40;
  if(idData=='editBeratBadanSiswa')noKolom=41;
  if(idData=='editJarakRumahSekolah')noKolom=42;
  if(idData=='editWaktuTempuh')noKolom=43;
  if(idData=='editJmlSaudaraKandung')noKolom=44;
 
  var action="postItem";
  usernameOffline=localStorage.getItem('usernameOffline');
  var item = document.getElementById(idData).value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  var obj=JSON.parse(this.responseText).result;	
      //if(idLokal!=null && idTampil!=null){document.getElementById(idTampil).innerHTML=obj;}
	  //localStorage.setItem(idLokal,obj);
    }
  };
  var teks1='https://script.google.com/macros/s/';
  var teks2=inputIdGScript;
  var teks3="/exec?";
  var teks4="inputUrlSpreadSheet=";
  var teks5=inputUrlSpreadSheet;
  var teks6="&inputNamaSheet=";
  var teks7=inputNamaSheet;
  var teks8="&action=";
  var teks9="postItem";
  var teks10="&username=";
  var teks11=usernameOffline;
  var teks12="&noKolom=";
  var teks13=noKolom;
  var teks14="&item=";
  var teks15=item;
  var teksGabung=teks1+teks2+teks3+teks4+teks5+teks6+teks7+teks8+teks9+teks10+teks11+teks12+teks13+teks14+teks15;
  var req=teksGabung;
  xhttp.open("POST", req, true);
  xhttp.send();
}