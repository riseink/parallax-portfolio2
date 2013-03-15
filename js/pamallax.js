var readyState = function(callback)
{
	var body = document.body;
	
	if(body && body.readyState == 'loaded')
	{
		callback();
	}
	else
	{
		if (window.addEventListener)
		{
			window.addEventListener('load', callback, false);
		}
		else
		{
			window.attachEvent('onload', callback);
		}
	}	
}

readyState(function()
{
	var $window = $(window);

	var stubHeight = $window.height() / 2;

	$('.stub').css({'height': stubHeight + 'px'});
	$('.stubheader').css({'margin-top': (stubHeight - $('#header').height()) / 2  + 'px'});

	$('[data-stub]').each(function()
	{
		var self = $(this);
		var target = $(self.data('stub'));

		var speed = self.data('speed') ? self.data('speed') : 1;
		var start = target.offset().top;
		var end = target.offset().top + target.height();

		self.css('visibility', 'hidden');
		self.width($window.width());
		self.height(target.height());

		self.html('<img src="' + self.data('image') + '" style=" width:' + $window.width() + 'px;">');

		var yPos = (($window.scrollTop() - start) / speed);

		if(($window.scrollTop() + $window.height()) >= start && ($window.scrollTop() + $window.height()) <= (end + $window.height()))
		{
			self.css('top', target.offset().top-$window.scrollTop());
			self.find('img').css('margin-top', yPos);
			self.css('visibility','visible');
		}

		$window.scroll(function()
		{
			if(($window.scrollTop() + $window.height()) >= start && ($window.scrollTop() + $window.height()) <= (end + $window.height()))
			{
				yPos = (($window.scrollTop() - start) / speed);

				self.find('img').css('margin-top', yPos);
				self.css('top', target.offset().top - $window.scrollTop());
				self.css('visibility', 'visible');

			}
			else if(self.css('visibility') == 'visible')
			{
				self.css('visibility', 'hidden');
			}
		});

		$window.resize(function()
		{
			stubHeight = $window.height() / 2;

			$('.stub').css({'height': stubHeight + 'px'});
			$('.stubheader').css({'margin-top': (stubHeight - $('#header').height()) / 2  + 'px'});
			
			start = target.offset().top;
			end = target.offset().top + target.height();
			
			self.width($window.width());
			self.height(target.height());

			self.html('<img src="' + self.data('image') + '" style=" width:' + $window.width() + 'px;">');

			yPos = (($window.scrollTop()-start) / speed);

			self.find('img').css('margin-top', yPos);
			self.css('top', target.offset().top - $window.scrollTop());
		});

	});

});