var phone = localStorage.getItem("vOneLocalStorage");

var whatsappRef = document.getElementById('whatsappRef');
var fbRef = document.getElementById('fbRef');
var twitterRef = document.getElementById('twitterRef');

var loadList = document.getElementById('loadList');

var cur_rat = document.getElementById('cur_rat');

if(loadList!=null){
	loadList.addEventListener('click',function(){
		window.open("listOfBaby.html","_self");
	});
}

var name ;


// if(phone!=null) {
// key = encodeURIComponent('phone');
// value = encodeURIComponent(phone);
// }
getParams(window.location.href);

function getParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	if(query!=null){
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		console.log(pair[0]);
		if(pair[0] == "phone"){
		params[pair[0]] = decodeURIComponent(pair[1]);
		console.log(params[pair[0]]);
		phone = params[pair[0]];
			}
		}
	}
	return params;
};

whatsappRef.setAttribute('href','whatsapp://send?text=Hello,vote me for my Birthday by visiting justaddress.in/profileCreated.html?phone='+phone);
fbRef.setAttribute('href',"https://facebook.com/sharer.php?u=justaddress.in/profileCreated.html?phone="+phone);
twitterRef.setAttribute('href',"https://twitter.com/share?url=justaddress.in/profileCreated.html?phone="+phone+"&amp;text=7%Happy%Birthday&amp;hashtags=7HappyBirthday");

var userRef = firebase.database().ref("bestbaby/"+ phone+"/");
var curRating = 5;
var phoneNum;

userRef.once('value',gotData , errorData);
function gotData(data){
	console.log("Hi"+phone);
	console.log(data.val());
	var usersData = data.val();
//	var keys = Object.keys(usersData);
//	console.log(keys);
//		var key = usersData[i];
		 name = usersData.fullname;
		 phoneNum = usersData.phoneNo;
		var email = usersData.emailId;
		var dob = usersData.birthday;
		var city = usersData.place;
		var image = usersData.profileImage;
		console.log(name,email,phoneNum,dob,image);
		document.getElementById('nameText').innerHTML = name;
		document.getElementById('emailText').innerHTML = email;
		cur_rat.innerHTML = usersData.rating;
		curRating = usersData.rating;

		document.getElementById('phoneText').innerHTML = phoneNum;
		document.getElementById('dobText').innerHTML = dob;
		document.getElementById('cityText').innerHTML = city;
		document.getElementById('image').setAttribute("src",image);
}

function errorData(err){
	alert('alert while displaying the list '+err);
}

function onratingClicked(ratId){

	var ratingGiven;
	if(ratId==='star5')
		ratingGiven = 5;
	else if(ratId==='star4')
		ratingGiven = 4;
	else if(ratId==='star3')
		ratingGiven = 3;
	else if(ratId==='star2')
		ratingGiven = 2;
	else if(ratId==='star1')
		ratingGiven = 1;

		newRating = ( parseInt(ratingGiven) + parseInt(curRating) ) /2 ;
		console.log('new Rating'+ newRating);
		firebase.database().ref('bestbaby/'+phone).update({
		rating:newRating
			}).then(function() {
   			 alert('Thanks for rating '+name+" "+ratingGiven +" stars!");
   			 userRef.once('value',gotData , errorData);
function gotData(data){
	console.log("Hi"+phone);
	console.log(data.val());
	var usersData = data.val();
//	var keys = Object.keys(usersData);
//	console.log(keys);
//		var key = usersData[i];
		 name = usersData.fullname;
		var phoneNum = usersData.phoneNo;
		var email = usersData.emailId;
		var dob = usersData.birthday;
		var city = usersData.place;
		var image = usersData.profileImage;
	//	console.log(name,email,phoneNum,dob,image);
		document.getElementById('nameText').innerHTML = name;
		document.getElementById('emailText').innerHTML = email;

		// var divTag = document.createElement('div');
		// divTag.setAttribute('class','rating-current');

		// var istar = document.createElement('i');
		// istar.setAttribute('class','fas fa-star');
		// list.appendChild(divTag);
		// divTag.appendChild(istar);
		// divTag.appendChild(li2);

		cur_rat.innerHTML = usersData.rating;
		curRating = usersData.rating;

		document.getElementById('phoneText').innerHTML = phoneNum;
		document.getElementById('dobText').innerHTML = dob;
		document.getElementById('cityText').innerHTML = city;
		document.getElementById('image').setAttribute("src",image);
}
 		 });
}


var ratingGiven = document.getElementById('star5');
if(ratingGiven!=null){
	ratingGiven.addEventListener('checked', (e) =>{
	console.log('5');
});
}
