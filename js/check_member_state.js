//UID憑證登入驗證
//登出按鈕 設定為 #logout_btn
//會員名稱 設定為 #login_member
//信任憑證 UID01、UID02
//setCookie設定cookie檔
//getCookie讀取cookie檔

$(function () {
    getCookie("UID01");
    getCookie("UID02");
    //判斷UID是否空白
    if (getCookie("UID01") != "" && getCookie("UID02") != "") {

        //丟到後端去做驗證
        var jsonData = {};
        jsonData["UID01"] = getCookie("UID01");
        jsonData["UID02"] = getCookie("UID02");
        // console.log(JSON.stringify(jsonData));
        $.ajax({
            type: "POST",
            url: "mem_uid_check_api.php",
            data: JSON.stringify(jsonData),
            dataType: "json",
            success: showdata_uid_check,
            error: function () {
                alert("error-mem_uid_check_api.php");
            }
        });

    } else {
        // console.log("222");
        alert("抱歉!請登入會員。");
        location.href = "20221228-SPA.html";
    }

    //登出按鈕logout_btn監聽
    $("#logout_btn").bind("click", function () {
        setCookie("UID01", "", 0);
        setCookie("UID02", "", 0);
        location.href = "mem_control_panel.html";
    });

});

//UID憑證登入狀態
function showdata_uid_check(data) {
    if (data.state) {
        //UID 驗證成功
        //顯示會員訊息
        // if (data.data[0].UserState == "y") {
        $("#login_member").text(data.data[0].Nickname + "會員您好！");
        //     $.ajax({
        //         type: "GET",
        //         url: "mem_R_api.php",
        //         dataType: "json",
        //         async: false,
        //         success: showdata,
        //         error: function () {
        //             console.log("讀取失敗+mem_R_api.php");
        //         }
        //     });
        // } else {
        //     alert("抱歉!您的帳號已停權。");
        //     // location.href = "mem_control_panel.html";
        // }

    } else {
        //UID 驗證失敗
        alert("抱歉!請登入會員。");
        // location.href = "20221228-SPA.html";

    }

};

//form w3c
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}