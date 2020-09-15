$(document).on('click', 'ul li a', function (){
  $(this).addClass('active').siblings().removeClass('active');
});
