//functions 1.checkinput()-to ensure deadline entered is proper
//			2.fixdeadline()-for converting user input into proper date format 
//            and also to call checkinput()
//			3.timer()-to calculate amount of time left in terms of days,hours,minutes,seconds
//			4.reset(),startcounter(),stopcounter()-for reset,start and stop buttons respectively 			
//flag is 0 if start is not pressed it's 1 if already pressed
//also when stop or reset is pressed flag becomes 0 once again
var interval,deadline=new Date(),flag=0;
var year,month,day,hour,minute,second;
var name=document.getElementById("Name").value;
document.getElementById("launchmessage").innerHTML=
	" The time left for launch of "+name;


function fixdeadline(){
	year=document.getElementById("Year").value;
	month=document.getElementById("Month").value - 1 ; //java script months starting is 0
	day=document.getElementById("Day").value;
	hour=document.getElementById("Hour").value;
	minute=document.getElementById("Minute").value;
	second=document.getElementById("Second").value;
	
	deadline = new Date(year,month,day,hour,minute,second);
	
	checkinput();
	
	name=document.getElementById("Name").value;
	
	document.getElementById("launchmessage").innerHTML=
	" The time left for launch of "+name;  
}
									
function timer(){
	
    u = new Date();   //u is the time and date at this instance  				  
    var timeleft = Date.parse(deadline)-u.getTime();
    
    if(timeleft <= 0){
    	alert("The satellite has been launched successfully");
    	location.reload();
    }
	// no of milliseconds per day is taken and it is used to get no of days. 
    //This process is repeated for hours and the rest
	document.getElementById("days").innerHTML=" "+
	Math.floor(timeleft/86400000)+" Days";
	timeleft%=86400000; 
	document.getElementById("hours").innerHTML="  "+
	Math.floor(timeleft/3600000)+" Hours";
	timeleft%=3600000;
	document.getElementById("minutes").innerHTML ="   "+
	Math.floor(timeleft/60000)+" Minutes";
	timeleft%=60000;
	document.getElementById("seconds").innerHTML ="   "+
	Math.floor(timeleft/1000)+" Seconds";
};

function startcounter(){
	if(!flag){
		flag=1;
		interval=setInterval(function(){timer()},1000);
	}
}

function stopcounter(){
	flag=0;
	clearInterval(interval);
}

function reset(){
	flag=0;
	clearInterval(interval);
	//reset input values
	document.getElementById("Year").value=document.getElementById("Year").defaultValue;
	document.getElementById("Month").value=document.getElementById("Month").defaultValue;
	document.getElementById("Day").value=document.getElementById("Day").defaultValue;
	document.getElementById("Hour").value=document.getElementById("Hour").defaultValue;
	document.getElementById("Minute").value=document.getElementById("Minute").defaultValue;
	document.getElementById("Second").value=document.getElementById("Second").defaultValue;
	document.getElementById("Name").value=document.getElementById("Name").defaultValue;
	
	//reset display divisions
	document.getElementById("days").innerHTML="0"+ " Days";
	document.getElementById("hours").innerHTML="0"+ " Hours";
	document.getElementById("minutes").innerHTML="0"+ " Minutes";
	document.getElementById("seconds").innerHTML="0"+ " Seconds";
}

