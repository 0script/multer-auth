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
        forminputs[0].append(nameerror);
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
        phoneerror.innerHTML='Enter valid phone number !';
        forminputs[2].appendChild(phoneerror);
    }else if(validatePhone(phone) && forminputs[2].lastChild.tagName=='P'){
        forminputs[2].lastChild.remove();
    }
}

/* fetch api handle post request registration process */
const register=async(e)=>{
    
    e.preventDefault();

    validateForm();
    
    const url='localhost:3000/register';
    
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