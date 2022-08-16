const form=document.getElementById('loginform');
const password1=document.getElementById('password');
const password2=document.getElementById('password2');
const setvisible=document.getElementById('visiblepassword');
const fileinput=document.getElementById('files');
const forminputs=document.querySelectorAll('div.input-group');


/* toggle password field visibility */
setvisible.addEventListener('click',(e)=>{
    
    if(e.currentTarget.classList.contains('fa-eye-slash')){
        e.currentTarget.classList.remove('fa-eye-slash');
        e.currentTarget.classList.add('fa-eye');
        password1.type="text";
        password2.type="text";
    }else{
        e.currentTarget.classList.remove('fa-eye');
        e.currentTarget.classList.add('fa-eye-slash');
        password1.type="password";
        password2.type="password";
    }

});

/* set profile picture text */
fileinput.addEventListener('input',()=>{

    let profiletext=document.getElementById('profile-text');
    profiletext.innerHTML=fileinput.value;
});

function validateEmail(email){
        var re=/\S+@\S+\.\S+/;
        return re.test(email);
}

function validatePhone(phone){
    
    let re=/^(\+250|07)\d{3}(\d{3,4}| |-)/;
    return re.test(phone);
}

function hasLower(str){

    return /[a-z]/g.test(str);
}

function hasUpper(str){
    return /[A-Z]/g.test(str);
}

function hasDigit(str){
    return /[0-9]/g.test(str);
}

function cleanValidationError(){

    console.log('cleaning');
    if(forminputs[3].lastChild.tagName=='P'  )
        forminputs[3].lastChild.remove();
    
    if(forminputs[4].lastChild.tagName=='P')
        forminputs[4].lastChild.remove();
}

/* validate password */
function validatePassword(password1,password2){
    
    let validationerrors=0;

    cleanValidationError();

    if(password1.length<8){
        validationerrors+=1;
        console.log(password1.length);
        /* display validation error message */
        lengtherror=document.createElement('p');
        lengtherror.classList.add('small-small');
        lengtherror.style.color='red';
        lengtherror.innerHTML='Must be at least 8 characters';
        forminputs[3].appendChild(lengtherror);
    }
    
    if(!hasLower(password1)){
        validationerrors+=1;
        /* display validation error message */
        haslowererror=document.createElement('p');
        haslowererror.classList.add('small-small');
        haslowererror.style.color='red';
        haslowererror.innerHTML='Must contain lowercase';
        
        if(validationerrors<2)
            forminputs[3].append(haslowererror);
        else
            forminputs[4].append(haslowererror);
    }
    
    if(!hasUpper(password1) && validationerrors<2){
        validationerrors+=1;
        /* display validation error message */
        hasuppererror=document.createElement('p');
        hasuppererror.classList.add('small-small');
        hasuppererror.style.color='red';
        hasuppererror.innerHTML='Must contain uppercase';
        
        if(validationerrors<2)
            forminputs[3].append(hasuppererror);
        else
            forminputs[4].append(hasuppererror);
    }

    if(!hasDigit(password1) && validationerrors<2){
        validationerrors+=1;
        /* display validation error message */
        hasdigiterror=document.createElement('p');
        hasdigiterror.classList.add('small-small');
        hasdigiterror.style.color='red';
        hasdigiterror.innerHTML='Must contain a digit';
        
        if(validationerrors<2)
            forminputs[3].append(hasdigiterror);
        else
            forminputs[4].append(hasdigiterror);
    }

    if(password1!=password2 && validationerrors<2){

        validationerrors+=1;
        /* display validation error message */
        nomatcherror=document.createElement('p');
        nomatcherror.classList.add('small-small');
        nomatcherror.style.color='red';
        nomatcherror.innerHTML='Password do not match';
        
        if(validationerrors<2)
            forminputs[3].append(nomatcherror);
        else
            forminputs[4].append(nomatcherror);
    }

}

/* form validation function */
const validateForm=()=>{

    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let phone=document.getElementById('phone').value;
    let pass1=password1.value;
    let pass2=password2.value;
    

    if(name.length<5 && forminputs[0].lastChild.tagName!='P'){
        
        let nameerror=document.createElement('p');
        nameerror.classList.add('small-small');
        nameerror.style.color='red';
        nameerror.innerHTML='Name must be at least 5 characters';
        forminputs[0].appendChild(nameerror);
    }else if(name.length>4 && forminputs[0].lastChild.tagName=='P'){
        forminputs[0].lastChild.remove();
    }

    if(!validateEmail(email) && forminputs[1].lastChild.tagName!='P'){
        let emailerror=document.createElement('p');
        emailerror.classList.add('small-small');
        emailerror.style.color='red';
        emailerror.innerHTML='Email Address is not valid !';
        forminputs[1].appendChild(emailerror);
    }else if(validateEmail(email) && forminputs[1].lastChild.tagName=='P'){
        forminputs[1].lastChild.remove();
    }

    if(!validatePhone(phone) && forminputs[2].lastChild.tagName!='P'){
        let phoneerror=document.createElement('p');
        phoneerror.classList.add('small-small');
        phoneerror.style.color='red';
        phoneerror.innerHTML='Enter valid phone number from rwanda !';
        forminputs[2].appendChild(phoneerror);
    }else if(validatePhone(phone) && forminputs[2].lastChild.tagName=='P'){
        forminputs[2].lastChild.remove();
    }

    validatePassword(pass1,pass2);

}

/* fetch api handle post request registration process */
const register=async(e)=>{
    
    e.preventDefault();

    validateForm();
    
    const url='http://localhost:3000/register';
    
    try{
        
        const formData=new FormData(form);
        const response=await fetch(url,{
            
            method: 'POST',
            body: formData
        });
        
        console.log(response);
    }catch(error){
        
        console.error(error);
    }
}

form.addEventListener('submit',(e)=>register(e));