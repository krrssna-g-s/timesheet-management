
/*
*  @author : Srikrishna Gumma 
*  NameSpace : TSM 
*/

var TSM = TSM || {};

TSM  = (function ( $ ) {
    
    "use strict";

    var modalOverlay = '#modalOveray'
    , modalTarget
    , $accordion = $('.accordion')
    , $accordionTrigger = $accordion.find('h2');

    function postscript (arg1, arg2) {
        if (arg1 != undefined) {
            var method = eval('(' + arg1 + ')');
            method(arg2);
        }
    }

    /*  Private function
    *   @function initModalOverlay
    *   this method works based on the data attributes
    *   @params:  data-role  : tells if it is Modal or Dismiss
    *                          When Modal, the method triggers modal window and when Dismiss, method hides the modal
    *             data-target : modal div id (#modal-id)
    *             data-callback : to trigger call back
    *             data-row-from : to tell the server which row it is from
    */
    function initModalOverlay(  ){

       $('*[data-role]')
       .removeAttr('click')
       .on('click', function (argument) {
            var $this = $(this)
            , $role = $this.data('role')
            , modalTarget = $this.data('target')
            
            , callback = $this.attr('data-callback')
            , fromRow = $this.attr('data-row-from');

            if (!$(modalTarget).length) {
                return;
            }

            if($role === 'modal'){

              $(modalOverlay)
               .fadeIn(400, function ( ) {
                   $(modalTarget)
                   .fadeIn('fast');
                   $(modalTarget).find('.modal-content').hide()
                   $(modalTarget).find('.modal-content:first').show()
                });
                postscript(callback, fromRow);

            }else if($role === 'dismiss'){

              $(modalTarget)
                .fadeOut(400, function ( ) {
                    $(modalOverlay)
                    .fadeOut('fast');
                });
                postscript(callback, fromRow);
            }
           
       });

       $('*[data-url]').on('click', function ( event ) {
          var $this = $(this)
          , URI = $this.data('url');
          window.location.href= URI;

       });

       $('*[data-display]').on('click', function ( event ) {
          var $this = $(this)
          , display = $this.data('display')
          , view = $this.data('container');
          $(view).hide();
          $(display).show();
       });

       //accordion functionality for approaval section
       if($('.accordion').length){
          $('.accordion:first').find('.listing').show();
       }
       $accordionTrigger.on('click', function ( ) {

          if( $('.listing').is(':visible') ){

            $('.listing').slideUp('fast');

          }

          $(this).next('.listing').slideToggle('fast');
       });
    }

    function updateFooterWidth (argument) {
      var $footer = $('footer'),
          $li = $footer.find('li'),
          $liWidth = $li.width(),
          $liCount= $li.length,
          $ul = $footer.find('ul');

          $ul.css({
            width: $liWidth * $liCount + "px"
          });
    }
    
    return{
        /* 
        *   @function init(), this iinitiates the requred scripts for the page
        */
        init: function(){

            initModalOverlay();
            updateFooterWidth();

        },
        /* @function initPreloader(obj), this triggers the preloader when required,
        *  @params : "show" or "hide"  based on the param the function understands what needs to be triggerd
        *  Display PreLoader :  TSM.initPreloader('show')
        *  Hide PreLoader: TSM.initPreloader('hide')
        */
        initPreloader: function( obj ){

          var $preloader = $('#preloader')
          , $backDrop = $(modalOverlay);
          
          if(obj === "show"){
            
            $backDrop.show();
            $preloader.show();

          }else if(obj === "hide"){
            if(!$('.modal').is(':visible')){
              $backDrop.hide();
            }
            
            $preloader.hide();
          }
        },
        /* @function loadModal(container, bool), this triggers the modal when required,
        *  @params : "container" is the MODAL div ID need to be passed along with #
        *  @params : bool decides to show or hide, when true, the modal will be displayed and when false modal will be hidden
        *  Display Modal :  TSM.loadModal('#show-container', true)
        *  Hide Modal: TSM.loadModal('#show-container', false)
        */
        loadModal: function ( container, bool ){
          console.log(container, bool )
          if(bool){
            $(container).fadeIn('fast')
            $(modalOverlay).fadeIn('fast')
          }else{
            $(container).fadeOut('fast')
            $(modalOverlay).fadeOut('fast')
          }
        }

    };
 
// Pull in jQuery and Underscore
})( jQuery);
 

$(document).ready(function($) {
    TSM.init();
});



/*function callMethod(method) {
    method();
}*/