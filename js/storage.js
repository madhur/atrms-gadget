Storage = function()
{

	var IsGadget = function()
	{
		var IsGadgetrun = (window.System != undefined);
		return IsGadgetrun;
	}

	return {
		storeItem: function(key, value)
		{
			if (IsGadget())
				System.Gadget.Settings.writeString(key, value);
		},

		getItem: function(key)
		{
			if (IsGadget())
				return System.Gadget.Settings.readString(key);
		},

		removeItem: function(key)
		{

			if (IsGadget())
				System.Gadget.Settings.writeString(key, "");
		}
	};
}