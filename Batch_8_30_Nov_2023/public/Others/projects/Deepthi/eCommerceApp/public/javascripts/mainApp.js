var loadPage = (type) => {
    var templateUrl = '';
    switch(type) {
        case 'signup' :
            templateUrl = 'Templates/signUp.htm';
            break;
        case 'home' :
            // $("#signUpContent").hide();
            $('#mainContentBlockArea').html('');
              break; 
        case 'forgotpwd' :
             templateUrl = 'Templates/forgotPassword.htm';  
             break;
        case 'productDetailsList':
            templateUrl = 'Templates/productDetails.htm';   
            break;      
    }
    axios.get(templateUrl).then((response) => {

        if(type == 'signup'){
            $("#mainContentBlockArea").html(response.data);
        }else if(type == 'forgotpwd'){
            $('#pageLoginModel').modal('hide');
            $("#mainContentBlockArea").html(response.data);
        }else if(type == 'productDetailsList'){
            $("#mainContentBlockArea").html(response.data);
            loadProductDetails();
        }
    })
}

document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector("#refresh").addEventListener('click',() => {
        getCaptchaValue();
    })

});

// var getCanvasImage = () => {
//    var image = document.querySelector("#canvasBlock").toDataURL();
//    console.log(image);
// }
// getCanvasImage();

