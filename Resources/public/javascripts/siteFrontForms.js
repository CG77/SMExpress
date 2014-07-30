

var ua = navigator.userAgent;
if( ua.indexOf("Android") >= 0 )
{
  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
  if (androidversion > 4.0)
  {
    $(window).resize(function() {
        // fieldset width bug fix
        $(".fieldsetWidth").css("width", $(window).width() - 62);
    });
    $(document).ready(function() {
        // fieldset width bug fix
        $(".fieldsetWidth").css("width", $(window).width() - 62);
    });
  }
}


$(document).ready(function() {
    var isPhone = {
      Android: function() {
          var ua = navigator.userAgent;
          if( ua.indexOf("Android") >= 0 )
          {
            var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
            if (androidversion > 4.0)
            {
            return navigator.userAgent.match(/Android/i);
            }
          }
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isPhone.Android() || isPhone.BlackBerry() || isPhone.iOS() || isPhone.Opera() || isPhone.Windows());
      }
    };

    if(isPhone.any()){
        if (Modernizr.touch && Modernizr.inputtypes.date) {
            document.getElementsByClassName('.datepicker').type = 'date';
        } 
        else if (!Modernizr.touch && !Modernizr.inputtypes.date) {
            /* datepicker */
            $( ".datepicker" ).datepicker({
              showOtherMonths: true,
              selectOtherMonths: true
            });
        }
    } else {
      $(function() {
        $('.datepicker').attr('type','text');
        /* datepicker */
        $( ".datepicker" ).datepicker({
          showOtherMonths: true,
          selectOtherMonths: true
        });

      });
    }

    // style select, checkbox, radio, input file
    $(".box select, .uForm input:checkbox, input:radio, input:file").uniform();

    // range input
	$(".iRange").rangeinput();

    /**
     * Get the jQuery Tools Validator to validate checkbox and
     * radio groups rather than each individual input
     */

    $('[type=checkbox]').bind('change', function(){
        clearCheckboxError($(this));
    });

    // validate checkbox and radio groups
    function validateCheckRadio(){
        var err = {};

        $('.radioGroup, .checkerGroup').each(function(){
             if($(this).hasClass('required'))
                if (!$(this).find('input:checked').length)
                    err[$(this).find('input:first').attr('name')] = 'Veuillez compléter ce champ.';
        });
        $('.inputGrid, .radioScale').each(function(){
             if($(this).hasClass('required'))
                if (!$(this).find('input:checked').length)
                    err[$(this).find('input:first').attr('name')] = 'Veuillez compléter.';
        });

        if (!$.isEmptyObject(err)){
            validator.invalidate(err);
            return false
        }
        else return true;

    }

    // clear any checkbox errors
    function clearCheckboxError(input){
        var parentDiv = input.parents('.field');

        if (parentDiv.hasClass('required'))
            if (parentDiv.find('input:checked').length > 0){
                validator.reset(parentDiv.find('input:first'));
                parentDiv.find('.error').remove();
            }
    }

    // position the error messages next to input labels
    $.tools.validator.addEffect("labelMate", function(errors, event){
        $.each(errors, function(index, error){
            error.input.first().parents('.field').find('.error').remove().end().find('label:first:not(.radioGroup label, .checkerGroup label, .inputGrid label, radioScale label), .fieldTitle').after('<span class="error">' + error.messages[0] + '</span>');
        });

    }, function(inputs){
        inputs.each(function(){
            $(this).parents('.field').find('.error').remove();
        });

    });

    /**
     * Handle the form submission, display success message if
     * no errors are returned by the server. Call validator.invalidate
     * otherwise.
     */

//    $(".uForm").validator({effect:'labelMate'}).submit(function(e){
//       var form = $(this), checkRadioValidation = validateCheckRadio();
//
//        if(!e.isDefaultPrevented() && checkRadioValidation){
//            $.post(form.attr('action'), form.serialize(), function(data){
//                data = $.parseJSON(data);
//
//                if(data.status == 'success'){
//                    form.fadeOut('fast', function(){
//                        $('.formUnit').append('<strong class="success">Le formulaire a bien été envoyé&nbsp;!</strong>');
//                    });
//                }
//                else validator.invalidate(data.errors);
//
//            });
//        }
//
//        return false;
//    });

    var validator = $('.uForm').data('validator');

});
