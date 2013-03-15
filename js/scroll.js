var changePage = function( collections, active )
{
	for(var c in collections)
	{	
		var self = $(collections[c])[active];
		
		$(collections[c]).removeClass('active');
		$(self).addClass('active');
		
		window.location.hash = '/' + $(self).attr('href').replace('#','');
	}
}

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
	var headerHeight = $('#header').height();
	var collections = ['#nav a'];
	var sectionCollections = $('section[data-type="page"]');
	
	var active = 0;
	
	var scrollTop = $(window).scrollTop();
	var newScrollTop = 0;
	var isScroll = false;
	
	var clearTime = null;

	for(var c in collections)
	{
		$(collections[c]).each(function(i)
		{		
			$(this).click(function()
			{
				if( $("html:not(:animated), body:not(:animated)").length == 0)
				{
					return false;
				}
				
				var self = this;
				var scrollTop = $(window).scrollTop();
				var section = $(sectionCollections[i]);
				var top = section.offset().top - headerHeight;

				if ($(self).hasClass('active') && scrollTop == top)
				{
					return false;
				}
				
				active = i;
				changePage(collections, active);
				
				$("html:not(:animated), body:not(:animated)").animate(
				{
					scrollTop: top
				}, 1000);
				
				return false;
			});
		});
	}

	$window.scroll(function()
	{
		scrollTop = $window.scrollTop();
		isScroll = true;
		
		if(newScrollTop < scrollTop || newScrollTop == 0)
		{	
			
			if(sectionCollections[(active+1)] !== undefined && ($(sectionCollections[(active+1)]).offset().top - headerHeight) <= newScrollTop)
			{
				active++;
				changePage(collections, active);
			} 
		}
		else
		{
			if((active-1) >= 0 && ($(sectionCollections[(active-1)]).offset().top - headerHeight) >= newScrollTop || (active-1) >= 0 && ($(sectionCollections[(active)]).offset().top - headerHeight) >= newScrollTop)
			{
				
				active--;
				changePage(collections, active);
			} 
		}
		
		newScrollTop = scrollTop;
	});
	
	$window.resize(function()
	{	
		headerHeight = $('#header').height();
		
		if(clearTime != null)
		{
			clearTimeout(clearTime);
			clearTime = null;
		}
		
		clearTime = setTimeout(function()
		{
			if( ! isScroll)
			{
				var section = $(sectionCollections[active]);
				var top = section.offset().top - headerHeight;
					
				$("html:not(:animated), body:not(:animated)").animate(
				{
					scrollTop: top
				}, 1000);
			}
		}, 1000);
		
		isScroll = false;
	});
	
});