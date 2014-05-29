$(document).ready(function()
{
	var storage=new Storage();


	$("#readmore").click(function()
	{
		document.getElementById('overlayDetails').show();
	});

	$('#oldroster').change(function()
	{
		if ($(this).is(":checked"))
		{
			console.log("setting");
			storage.storeItem("oldroster", true);
		}
		else
		{
			console.log("removing");
			storage.removeItem("oldroster");
		}

	});


	console.log(storage.getItem("oldroster"));

	if(storage.getItem("oldroster"))
	{
		$('#oldroster').prop('checked', true);

	}
	else
	{
		$('#oldroster').prop('checked', false);

	}


});