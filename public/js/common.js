//VIDHI - CHECK USER SESSION
var sessionInfo = {};
// var url = "http://localhost:3000/";
var url = "http://100.26.92.104:3000/";
// function checkUserLoggedIn() {
//     $.ajax({
//         url: url + "checkUserLoggedIn",
//         type: "POST",
//         crossDomain: true,
//         success: function (response) {
//             if(response.status == "failure") {
//                 alert('Log in first');
//                 window.location.href = '../index.html';
//             } else {
//                 sessionInfo = response.data.data;
//             }
//         },
//         error: function () {
//         }
//     });
// }

// if(window.location.pathname == '/' || window.location.pathname == '/index.html') {
//     // console.log(window.location.pathname);
// } else {
//     checkUserLoggedIn();
// }

//Vidhi- LOGIN API
$("#userlogin").on("click", function () {
    let email = $("#validationCustom01").val();
    if (!validateEmail(email)) {
        $("#validationCustom01").css('border', '1px solid red');
        return;
    } else {
        $("#validationCustom01").css('border', '');
    }
    let password = $("#validationCustom02").val();
    if (password.length == 0) {
        $("#validationCustom02").css('border', '1px solid red');
        return;
    } else {
        $("#validationCustom02").css('border', '');
    }

    $.ajax({
        url: url + "loginAPI",
        type: "POST",
        crossDomain: true,
        data: {
            email: email,
            password: password
        },
        success: function (response) {
            if (response.status == "success") {
                window.location.href = 'html/myProfile.html';
            } else {
                alert(response.message);
            }
        },
        error: function () {
            alert("Something went wrong. Please try again!!!");
        }

    });
});

$("#resetPassword").on("click", function () {
    let email = $("#email_idreset").val();
    console.log(email);
    if (!validateEmail(email)) {
        $("#email_idreset").css('border', '1px solid red');
        return;
    } else {
        $("#email_idreset").css('border', '');
    }
    alert("Reset password link has been sent to your registered email");
    window.location.href="../index.html";
});

$(document).bind('click', function (e) {
    var par = $(e.target).parent();
    if (!$('#displist').is(e.target)) {
        $('#displist').css("display", "none");
    };
});
