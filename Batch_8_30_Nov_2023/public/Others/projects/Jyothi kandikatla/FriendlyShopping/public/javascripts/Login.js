var validateCredentials = () =>{
    validateCaptcha();
    var validate = {};
    validate.username = $('#username').val();
    validate.password = $('#password').val();
    console.log(validate);
    /*axios.get('/validate/login/credentials',{params:validate}).then(response =>{
        console.log('sucess');
      
    }).catch(() =>{
        console.log('Error');
    })*/
    axios.post('/validate/login/credentials',validate).then((response) =>{
    console.log('success');
    console.log('response')
    console.log(response)
    if(response.data.msg == 'Valid'){
        $('#pageLoginModel').modal('hide');
        $(".metaContentBlock").hide();
        onSelectedContent('productDetails');
    }else{
        $('#invalidmsgblock').show();
        $('#invalidmsgblock').text('inavalid credentials ,please try again');
    }
    }).catch((err) =>{
        console.log('error')
        console.log(err)
    });
}