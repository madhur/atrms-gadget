"use strict";

function atrmsClient(EmployeeId)
{
	this.EmpId=EmployeeId;

	var PickProps = 
	{
	   'StartDate': 'Date',
	   'RouteNo': 'Route No',
	   'Seq':'Seq',
	   'Order':'Order',
	   'EmpId':'Emp Id',
	   'Name':'Name',
	   'Days':'Days',
	   'Zone':'Zone',
	   'Area':'Area',
	   'Shift':'Shift',
	   'PickupTime':'Pickup',
	   'CabMatesUrl':'Details'
	};

	this.PickDrops=PickProps;

	var DropProps = 
	{
	   'StartDate': 'Date',
	   'Slot': 'Parking Slot',
	   'RouteNo': 'Route No',
	   'Seq':'Seq',
	   'Order':'Order',
	   'EmpId':'Emp Id',
	   'Name':'Name',
	   'Days':'Days',
	   'Zone':'Zone',
	   'Area':'Area',
	   'Shift':'Shift',
	   'CabMatesUrl':'Details'
	   
	};

	this.DropProps=DropProps;

	var siteUrl="http://wncrpma011.japa.ad.aexp.com/TransportRoster/EmployeeReport.aspx";
	var hostName="http://wncrpma011.japa.ad.aexp.com/TransportRoster";
	var clientSuccessCallback, cabmatesSuccessFunc;
	var clientFailureCallback;
	var parentElement;

	var getViewState=function()
	{

			$.ajax
		({
		    type: "GET",
		    url: siteUrl,
		    dataType: 'html',		    
		    processData: false,
			    xhrFields: 
			    {
			        withCredentials: true
			    }
	    })
		.done(ExtractViewState).fail(errorFunc).always(alwaysFunc);
	   
		return "";

	};

	var SendPostRequest=function(viewState)
	{
		var EmpId = EmployeeId;

		var postData= {"cmdShow": "Show", "txtEmpId" : EmpId, "txtPeopleSoft_Id": EmpId, "__VIEWSTATE":  viewState  }
				
			$.ajax
		({
		    type: "POST",
		    url: siteUrl,
		    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		    data: postData,
		    dataType: 'html',		    
		    processData: true,
			    xhrFields: 
			    {
			        withCredentials: true
			    }
	    })
		.done(parseRosterData).fail(errorFunc).always(alwaysFunc);


	};


	var parseRosterData=function(data)
	{
		var totaldata=[];

		var pickUpDatarows=$(data).find("#MainTab tr");
		var pickupArray=[];
		var pickupObj;

		if($(data).find("#strMsg").length)
		{

			clientFailureCallback($(data).find("#strMsg").html());
			return;
		}


		pickUpDatarows.each(function()
		{
			if(this.className=="tbldata" || this.className=="tbldata1")
			{
				pickupObj=new Object();
				var columnList=$('td', this);

				var i=0;
				for(var property in PickProps)
				{
					if(i<=columnList.length)
					{
						pickupObj[property]=columnList[i].innerHTML;
					}

					i=i+1;
				}
			
				var detailsUrl=$("td > a", this);
				pickupObj['CabMatesUrl']=hostName+detailsUrl[0].href.substring(detailsUrl[0].href.indexOf("/M"));
				
				pickupArray.push({"rowitem":pickupObj});

			}			
		});

		var dropDataRows=$(data).find("#MainTab2ndOrder tr");
		var dropArray=[];
		dropDataRows.each(function()
		{
			if(this.className=="tbldata" || this.className=="tbldata1")
			{
				var dropObj=new Object();
				var columnList=$('td', this);

				var i=0;
				for(var property in DropProps)
				{
					if(i<=columnList.length)
					{
						dropObj[property]=columnList[i].innerHTML;
					}
					i=i+1;
				}

				var detailsUrl=$("td > a", this);
				dropObj['CabMatesUrl']=hostName + detailsUrl[0].href.substring(detailsUrl[0].href.indexOf("/M"));
				
				dropArray.push({"rowitem": dropObj});

			}			
		});

		

		clientSuccessCallback(pickupArray, dropArray, EmployeeId);

	};

	var ExtractViewState=function(data)
	{

		var rawResponse=data;
		var viewState=$(rawResponse).find('input[name=__VIEWSTATE]')[0].value;
	    SendPostRequest(viewState);

	};

	var errorFunc=function()
	{
		
		failureFunc();

	};


	var alwaysFunc=function()
	{
		// do nothing as of now

	};

	var ExtractCabMates=function(data)
	{
		var rows=$(data).find("#grdCabMates tr");
		var cabmates=[];

		rows.each(function()
		{
			
				//cabmateList=new Object();
				var columnList=$('td', this);

			//	var i=0;
			
					//if(i<=columnList.length && i==3)
					//{
						cabmates.push(columnList[3].innerHTML);
					//}

					//i=i+1;
				

					
		});

		cabmatesSuccessFunc(cabmates, parentElement);

	};

	this.getCabMates=function(url, completeFunc, failureFunc, elem)
	{
		parentElement=elem;

		cabmatesSuccessFunc=completeFunc;

				$.ajax
		({
		    type: "GET",
		    url: url,
		    dataType: 'html',		    
		    processData: false,
			    xhrFields: 
			    {
			        withCredentials: true
			    }
	    })
		.done(ExtractCabMates).fail(errorFunc).always(alwaysFunc);
	   
		return "";


	}

	this.getRosterData=function(completeFunc, failureFunc)
	{
		clientSuccessCallback=completeFunc;
		clientFailureCallback=failureFunc;

		getViewState();
		
	};



}