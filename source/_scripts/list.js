$(function () {
  $(".listi-nupp").click(function () {
    $('.list-success').hide();
    $('.list-error').hide();
    $.post("https://www.segakoorideliit.ee/subscribe.php",
      {
        email: $('.listi-email').val()
      },
      function (data, status) {
        if (data == "success") {
          $('.listi-email').val('');
          $('.list-success').html('<span>Õnnestus! Kontrollige oma postkasti (vajadusel ka rämpsposti kausta) ja kinnitage meililistiga liitumine.</span>');
          $('.list-success').show();
        } else {
          if (data == "error") {
            $('.list-error').html('<span>Päringu saatmine ebaõnnestus, proovige mõne aja pärast uuesti</span>');
          } else if ($('.listi-email').val().length === 0 || data == "error1") {
            $('.list-error').html('<span>Palun sisestage meiliaadress</span>');
          } else if (data == "error2") {
            $('.list-error').html('<span>Palun sisestage korrektne meiliaadress</span>');
          } else {
            $('.list-error').html('<span>Päringu saatmine ebaõnnestus, proovige mõne aja pärast uuesti</span>');
          }
          $('.list-error').show();
        }

      }).fail(function () {
        $('.list-error').html('<span>Serveri viga</span>');
        $('.list-error').show();
      });
  });
});