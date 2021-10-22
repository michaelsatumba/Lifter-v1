

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
