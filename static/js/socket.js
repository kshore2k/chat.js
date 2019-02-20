var sock = io.connect('http://10.0.0.164:8000');


$(document).on('mousemove', function (event) {
    sock.emit('mouse_activity', {
        x: event.pageX,
        y: event.pageY
    });
});
sock.on('all_mouse_activity', function (data) {
    if ($('.pointer[session_id="' + data.session_id + '"]').length <= 0) {
        $('body').append('<div class="pointer" session_id="' + data.session_id + '"></div>');
    }

    var $pointer = $('.pointer[session_id="' + data.session_id + '"]');

    $pointer.css('left', data.coords.x);
    $pointer.css('top', data.coords.y);

});


$(document).ready(function () {
    var username = prompt("Please enter a cool code name to join!");
    var socket = io();

    if (username != "") {

        $(document).keypress(function (e) {
            if (e.which == 13) {
                var msg = $("#message").val();
                socket.emit('send', {
                    name: username,
                    message: msg
                });
                $("#message").val("");
            }
        });

        $("#submit").click(function () {
            var msg = $("#message").val();
            socket.emit('send', {
                name: username,
                message: msg
            });
            $('.chat_box').scrollTop($('.chat_box').height() + 5);
            $("#message").val("");
        });

        socket.on('showMsg', function (data) {
            var temp = "";
            for (x in data) {
                temp += "<p><span style='font-weight: bold;'>" + data[x].name + "</span>" + ": " + data[x].message + "</p>";
            }
            $("p").html(temp);
            $('.chat_box').animate({
                scrollTop: $(".chat_box").get(0).scrollHeight
            }, 2000);
        });

        socket.on('start', function (data) {
            var temp = "";
            for (x in data) {
                temp += "<p><span style='font-weight: bold;'>" + data[x].name + "</span>" + ": " + data[x].message + "</p>";
            }
            $("p").html(temp);


        });

    } else {
        username = prompt("You must enter a username to join...");
    }

});
