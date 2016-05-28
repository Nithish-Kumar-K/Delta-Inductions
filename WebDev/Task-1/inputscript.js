function checkinput(){

	//initial overall check 
	if( year<0 || month < 0 || month > 11 || day < 0 || day > 31 || 
	minutes < 0 || minutes > 59 || hours >23 || hours < 0 || seconds < 0 || seconds > 59 ){
	alert("Your input is in an incorrect format! Please give the input in proper format");
	location.reload();
	}

	//checks no of days in a month also 1 stands for february and so on as js months are from 0 to 11
	if((month == 1||month == 3||month == 5||month == 8||month == 10) && day == 31 ){
		alert("Your input is in an incorrect format! Please check the no of days in the given month");
		location.reload();
	}
	//checks for february alone as it's a special case-first determine if it's a leap year
	leap=0;
	if(year%4==0){
		if(year%100==0){
			if(year%400==0){
			   leap=1;	
			}
			else{
			  leap=0;
			}
		}
		else{
		  leap=1;		
		}	
	}
	//here code is written in such a way that only one error message will be displayed for any input given so feb 31 will not show an error for the condition below 
	if((!leap && (day==29 || day==30) && month == 1) ||(leap && day==30 && month == 1)){
		alert("Your input is in an incorrect format! Please check the no of days in the given month");
		location.reload();
	}
		
	
	u=new Date();
	
	if(deadline < u){
	alert("Sorry the date is over already! Give a new deadline");
	location.reload();
	}
	
}
