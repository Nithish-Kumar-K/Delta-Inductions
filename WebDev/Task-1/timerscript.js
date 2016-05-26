//functions 1.checkinput()-to ensure deadline entered is proper
//	    2.fixdeadline()-for converting user input into proper date format 
//            and also to call checkinput()
//	    3.timer()-to calculate amount of time left in terms of days,hours,minutes,seconds
//	    4.reset(),startcounter(),stopcounter()-for reset,start and stop buttons respectively 			

var interval,deadline=new Date("2016-05-28");
var year,month,day,hour,minute,second;

function checkinput(){
	if( year<0 || month < 0 || month > 11 || days < 0 || days > 30 || 
	minutes < 0 || minutes > 59 || hours >23 || hours < 0 || seconds < 0 || seconds > 59 ){
	alert("Your input is in an incorrect format! Please give the input in proper format");
	location.reload();
	}
	
	u=new Date();
	
	if(deadline < u){
	alert("Sorry the date is over already! Give a new deadline");
	location.reload();
	}
	
}

function fixdeadline(){
	year=document.getElementById("Year").value;
	month=document.getElementById("Month").value - 1 ; //java script months starting is 0
	day=document.getElementById("Day").value;
	hour=document.getElementById("Hour").value;
	minute=document.getElementById("Minute").value;
	second=document.getElementById("Second").value;
	
	deadline = new Date(year,month,day,hour,minute,second);
	
	checkinput();
}
									
function timer(){
	
    u = new Date();   //u is the time and date at this instance
    				  
    var timeleft = Date.parse(deadline)-u.getTime();
	// no of milliseconds per day is taken and it is used to get no of days. 
    //This process is repeated for hours and the rest
	document.getElementById("days").innerHTML=
	Math.floor(timeleft/86400000)+" days";
	timeleft%=86400000; 
	document.getElementById("hours").innerHTML=
	Math.floor(timeleft/3600000)+" hours";
	timeleft%=3600000;
	document.getElementById("minutes").innerHTML =
	Math.floor(timeleft/60000)+" minutes";
	timeleft%=60000;
	document.getElementById("seconds").innerHTML =
	Math.floor(timeleft/1000)+" seconds";
}

function startcounter(){
	interval=setInterval(function(){timer()},1000);
}

function stopcounter(){
	clearInterval(interval);
}

function reset(){
	clearInterval(interval);
	document.getElementById("days").innerHTML="0";
	document.getElementById("hours").innerHTML="0";
	document.getElementById("minutes").innerHTML="0";
	document.getElementById("seconds").innerHTML="0";
}


