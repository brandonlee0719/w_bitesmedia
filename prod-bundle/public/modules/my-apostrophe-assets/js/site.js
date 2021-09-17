$(function() {
  
  // user menu
  var $userMenuTrigger = $('.bt-header__user'),
  		$userMenu        = $('.bt-header__user__menu')

  $userMenuTrigger.click(function(e) {
  	$userMenu.toggleClass('bt--active');
  })

});
