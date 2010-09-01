/**
 *	jQuery Dropdown plugin
 *	@version 0.2
 *	@date Nov 6, 2009
 *	@author Eli Dupuis
 *	@copyright (c) 2009 Lift Interactive (http://liftinteractive.com)
 *	Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *	Requires: jQuery v1.3.2 or later (most likely works fine with earlier versions, but unteseted)

 *	Based heavily on snippet from (Steve Taylor) http://sltaylor.co.uk/blog/jquery-hover-drop-down-menu-settimeout/

*/
(function($) {

var ver = '0.2';

$.fn.dropdown = function(options) {
	// ;;;debug(this);

	// build main options before element iteration
	var opts = $.extend({}, $.fn.dropdown.defaults, options);
	var navTimers = []; 

	return this.each(function() {
		$this = $(this);
		// build element specific options
		var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

		//	start firefox glitch fix:
		//	remove title attributes because they interfere with the hover() in Firefox:
		//	http://dev.jquery.com/ticket/5290
		if ($.browser.mozilla) {
			$this.removeAttr('title');
			$this.find('*[title]').each(function(){
				$(this).removeAttr('title');
			});
		}
		//	end firefox glitch fix.

		$(this).hover(  
			function (e) {
				var id = $.data(this);
				var $this = $(this);
				navTimers[id] = setTimeout( function() {
					$this.find(o.child).fadeIn(o.speedIn);
					navTimers[id] = "";
				}, o.delay );
			}, function (e) {
				var id = $.data(this);
				if (navTimers[id] != "") {
					clearTimeout(navTimers[id]);
				} else {
					$(this).find(o.child).fadeOut(o.speedOut);
				}
		});	

	});
};

//
// private function for debugging
//
// ;;;function debug($obj) {
// ;;;	if (window.console && window.console.info)
// ;;;	window.console.info('dropdown element count: ' + $obj.size());
// ;;;};

//
// plugin defaults
//
$.fn.dropdown.defaults = {
	delay: 100,
	speedIn: 300,
	speedOut: 200,
	child: 'ul'
};

//	public function/method
$.fn.dropdown.ver = function() { return "jquery.dropdown version " + ver; };

})(jQuery);