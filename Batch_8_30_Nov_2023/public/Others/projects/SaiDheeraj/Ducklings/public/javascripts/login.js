var ValidateUserCredentials = () => {
    UserCheckinData(); 
    var userData = {};
    userData.accountId = $("#UserAccountId").val();
    userData.accountpassword = $("#accountpassword").val();

   // axios.get('/validate/userlogin', {params : userData}).then(response => { // here params :: is when we do with get communication

    axios.post('/validate/userlogin', userData).then(response => { // here data :: is when we do with post communication
        console.log("success");
        if (response.data.msg == 'Valid') {
            $('#staticBackdrop').modal('hide');
            SelectedloadPage("productDetails");
        } else {
            $(".invalidMsgBlock").show();
            $(".invalidMsgBlock").text("Invalid Credentials, Please try again");
        }
    }).catch(() => {
        console.log("Error");
    })
    console.log(userData);
}