var todayUser = firebase.database().ref("bestbaby/");

var todayName = document.getElementById('todayName');
var todayCity = document.getElementById('todayCity');
var todayCard = document.getElementById('todayCard');
var list = document.getElementById('list');

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

if(month < 10)
	month = "0"+month;
if(day.length < 10)
	day = "0"+day;

var currentDate = day+"/"+month+"/"+year;
var currentDate1 = year+"/"+month+"/"+day;

var msgToDisplayForRating="";
todayUser.orderByChild('birthday').equalTo(currentDate1).limitToFirst(50).once('value',loadList, errorData);

function buttonsControl(button, i,noOfStars,phoneNumber,curRatingIndi) {

	if(msgToDisplayForRating != 'Thanks for rating '+phoneNumber+" "+noOfStars +" stars!"){
var ratingGiven;
	if(noOfStars==='5')
		ratingGiven = 5;
	else if(noOfStars==='4')
		ratingGiven = 4;
	else if(noOfStars==='3')
		ratingGiven = 3;
	else if(noOfStars==='2')
		ratingGiven = 2;
	else if(noOfStars==='1')
		ratingGiven = 1;

		newRating = ( parseInt(ratingGiven) + parseInt(curRatingIndi) ) /2 ;
		console.log('new Rating'+ newRating);
		firebase.database().ref('bestbaby/'+phoneNumber).update({
		rating:newRating
			}).then(function() {
				msgToDisplayForRating = 'Thanks for rating '+phoneNumber+" "+noOfStars +" stars!";
   			 alert(msgToDisplayForRating);
 		 });
	msgToDisplayForRating = 'Thanks for rating '+phoneNumber+" "+noOfStars +" stars!";

		}
}

todayUser.orderByChild('birthday').equalTo(currentDate).limitToFirst(50).once('value',loadList, errorData);
function loadList(data){
	// var elements = document.querySelectorAll('element');
	// for(var i=0;i<elements.length;i++){
	// 	elements[i].remove();
	// }
	//console.log(data.val());
	var usersData = data.val();
		var keys = Object.keys(usersData);
//	console.log(keys);
	for(var i=0;i<keys.length;i++){
		var key = keys[i];
		// todayName.innerHTML = usersData[key].fullname;
		// todayCity.innerHTML = usersData[key].place;
		var li = document.createElement('h3');
		var li1 = document.createElement('li');
		var li2 = document.createElement('li');
		var divTag = document.createElement('div');
		divTag.setAttribute('class','rating-current');

		var istar = document.createElement('i');
		istar.setAttribute('class','fas fa-star');

		var br = document.createElement('img');
		var breakLine = document.createElement('BR');
		br.setAttribute('class','profile-pic');
		br.setAttribute('src',usersData[key].profileImage);



		var divTagRating = document.createElement('div');
		divTagRating.style.margin = "auto";
		divTagRating.setAttribute('class','rating');
		var ratingInput = document.createElement('INPUT');

		var labelRating = document.createElement('LABEL');









		 for(var j=5;j>0;j--){
		 	 ratingInput = document.createElement('INPUT');
		 	 ratingInput.setAttribute('name','star-'+j+'-'+usersData[key].phoneNo+'-'+usersData[key].rating);
		 	 ratingInput.setAttribute('value',j);
		 ratingInput.setAttribute('type','radio');
		 ratingInput.setAttribute('id',"star"+j+"-"+usersData[key].phoneNo);
		 ratingInput.setAttribute('class','radio-btn hide');
		 labelRating = document.createElement('LABEL');
		 labelRating.setAttribute('for','star'+j+"-"+usersData[key].phoneNo);
		labelRating.innerHTML = '☆';

		 // ratingInput.addEventListener('click',function(){
		 // 	alert(ratingInput.id);
		 // });

		divTagRating.appendChild(ratingInput);
		divTagRating.appendChild(labelRating);

		}


		li.innerHTML = usersData[key].fullname ;
		 li1.innerHTML = usersData[key].place;
		 li2.innerHTML = usersData[key].rating;
		 list.appendChild(breakLine);
		list.appendChild(br);
		list.appendChild(li);
		list.appendChild(li1);
		list.appendChild(divTag);
		divTag.appendChild(istar);
		divTag.appendChild(li2);
		list.appendChild(divTagRating);
		var buttons = document.getElementsByTagName("input"); //returns a nodelist


		for (let k = 0; k < buttons.length; k++) {
  				buttons[k].addEventListener("click", function(event) {
  					//alert(buttons.length+"-"+usersData[key].phoneNo);
  					console.log("k="+k+",i="+i);
  					var element = event.target;
  					var str = element.name;
  					var splitStr = str.split('-');
  				//	alert(splitStr);
  				  buttonsControl(this, k,splitStr[1],splitStr[2],splitStr[3]);
 			 }, false);
		}


	}

}
function errorData(err){
	alert('alert while displaying the list '+err);
}
