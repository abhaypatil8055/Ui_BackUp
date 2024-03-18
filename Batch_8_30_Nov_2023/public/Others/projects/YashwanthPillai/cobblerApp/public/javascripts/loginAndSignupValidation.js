
  
 
   // loginAndSignupValidation()

   
    var loginAndSignupValidation = {
        loginAndSignupDetails () {
            loginAndSignupValidation.userName = $("#userName").val().trim()

            if(loginAndSignupValidation.userName === ""){
                $("#E_UN").show()
                return
            }else{
                $("#E_UN").hide()

            }
            loginAndSignupValidation.userEmail = $("#user_Email").val().trim()
            if(loginAndSignupValidation.userEmail === ""){
                $("#U_EM").show()
                return
            }else{
                $("#U_EM").hide()

            }
            loginAndSignupValidation.userPwd = $("#user_Pwd").val().trim()
            if(loginAndSignupValidation.userPwd === ""){
                $("#U_PD").show()
                return
            }else{
                $("#U_PD").hide()

            }
        }
    }
    
    var validateLoginAndSignupData = () =>{
        loginAndSignupValidation.loginAndSignupDetails()
        console.log(loginAndSignupValidation.userName,loginAndSignupValidation.userEmail,loginAndSignupValidation.userPwd);
    }


    var showPass = () =>{

        var showPassword = $("#user_Pwd")
        var currentType = $("#user_Pwd").attr('type')
        // console.log(showPassword,currentType)

        if(currentType === 'password'){
            showPassword.attr("type","text")
            $("#openEye").css("display", "inline-block")
            // $('element_selector').css('property_name', 'value');
            $("#closedEye").css("display", "none")
        }else{
            showPassword.attr("type","password")
            $("#openEye").css("display", "none")
            // $('element_selector').css('property_name', 'value');
            $("#closedEye").css("display", "inline-block")
        }
    }

    var keyUpPwd = (event) =>{

        // console.log(event);

        var element = event.target

        /////// 1. for min characters

        if(element.value.length >= 8 ){
            // min-length-val error
            $("#min-length-val").css("color", "green")
            $("#checkOne").css("display","inline-block")
            $("#crossOne").css("display","none")


        }else{
            
            $("#min-length-val").css("color", "red")
            $("#checkOne").css("display","none")
            $("#crossOne").css("display","inline-block")

            

        }
// // ////// 2. For max characters
        
        if(element.value.length <= 11){
            
            $("#max-length-val").css("color", "red")
            $("#checkTwo").css("display","none")
            $("#crossTwo").css("display","inline-block")
        }else{

            $("#max-length-val").css("color", "green")
            $("#checkTwo").css("display","inline-block")
            $("#crossTwo").css("display","none")
        }

        // 3. One Numerical character
         
        // if()
        

    }
