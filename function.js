const nameOfUser = document.getElementById('name');
const dob = document.getElementById('dob');
const city = document.getElementById('city');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const submit = document.getElementById('submit');

const image = document.getElementById('input-image');
const imagePlace = document.getElementById('image');

var fileImage ;
var imageURLPic ="";

if(image!=null){
image.addEventListener('change', function(){
	const file = this.files[0];
	fileImage = file;
	if(file){
		const reader = new FileReader();
		reader.addEventListener('load', function(){
				imagePlace.setAttribute("src",this.result);
				imagePlace.setAttribute("style","width: 100px;height: 100px;");
				console.log(this.result);
		});
		reader.readAsDataURL(file);
	}
});
}

// $(function(){
//                 if(!Modernizr.inputtypes.date) {
//                     console.log("The 'date' input type is not supported, so using JQueryUI datepicker instead.");
//                     $("#theDate").datepicker();
//                 }
//             });

const database = firebase.database();

// var imageID=0;
// function changeimage(every_seconds){
//     //change the image
//     console.log('Hi');
//     if(!imageID){
//     	document.getElementById("myimage").style.backgroundColor= 'red';

//         // document.getElementById("myimage").background-image="http://www.all-freeware.com/images/full/38943-nice_feathers_free_screensaver_desktop_screen_savers__nature.jpeg";
//         imageID++;
//     }
//     else{if(imageID==1){
//     	document.getElementById("myimage").style.backgroundColor= 'blue';
//         imageID++;
//     }else{if(imageID==2){
//     	document.getElementById("myimage").style.backgroundColor= '#871ae0';
//         imageID=0;
//     }}}
//     //call same function again for x of seconds
//     setTimeout("changeimage("+every_seconds+")",((every_seconds)*1000));
// }

if(image!=null){
submit.addEventListener('click',(e) =>{
	localStorage.setItem("vOneLocalStorage", phone.value);
	console.log(phone.value);
	e.preventDefault();
	console.log('1st');
	var uploadTask = firebase.storage().ref('Images/profilePics/'+phone.value+".png").put(fileImage);

	console.log('2nd: '+fileImage.name);

	uploadTask.on('state_changed',function(snapshot){
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes )* 100;
		document.getElementById('progressStatus').innerHTML = 'Uploading '+progress+"%";
	},
	function(error){
		alert('Error in saving Image');
	},
	function(){
		uploadTask.snapshot.ref.getDownloadURL().then(function(url){
			//console.log(url);
			imageURLPic = url;

		firebase.database().ref('bestbaby/'+phone.value).set({
		birthday: dob.value.replaceAll("-","/"),
		fullname: nameOfUser.value,
		place: city.value,
		emailId: email.value,
		phoneNo: phone.value,
		profileImage: imageURLPic,
		rating:5
	}).then(function() {
    window.open("profileCreated.html","_self");
  });
			alert('Successfully Added!');

	}

	);
		});


});
}
