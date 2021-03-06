/**
 * Base Jack namespaces
 */
try {

	//Creating library namespace object
	Jack = {

		/**
		 * An alias to load classes from Autoloader.
		 *
		 * Usage:
		 * <code>
		 *     Jack.use('App.Controller.Index', 'Foo.Bar.Baz', ...);
		 * </code>
		 */
		use: function()
		{
			Jack.Autoloader.loadClass.apply(this, arguments);
		},

		/**
		 * Returns existing or new instance of a class.
		 *
		 * Usage:
		 * <code>
		 *     Jack.getInstance('App.Autoloader').init();
		 *     var controller = Jack.getInstance('App.Controller.Index', true);
		 * </code>
		 *
		 * @param class_name Dot seperated class name
		 * @param create Creates new object
		 */
		getInstance: function(class_name, create)
		{
			switch (typeof class_name)
			{
				case 'object':
					return class_name;
					break;
				case 'function':
					return new class_name;
					break;
				case 'string':
					Jack.use(class_name);
					if (!create)
						return eval('(' + class_name + ')');
					else
						return eval('new '+class_name);
					break;
			}
		},

		/**
		 * Creates router based on existing router options.
		 *
		 * @param location
		 */
		go: function(location)
		{
			window.location.hash = App.Bootstrap.router.options.prefix+location;
		}

	};

	//Creating app namespace object
	App = {
		Model : {},
		View : {},
		Controller : {}
	};

	//Applying Jack into window.
	window.Jack = Jack;
	window.App = App;

} catch (e) {
	console.log('An error occured while running application: [' + e.code + '] : ' + e.message);
}