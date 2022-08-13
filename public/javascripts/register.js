const form=document.getElementById('loginform');
const password1=document.getElementById('password');
const password2=document.getElementById('password2');
const setvisible=document.getElementById('visiblepassword');

form.addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();
    console.log('form submission');
    console.log('first validation');
    
    const name=document.getElementById('name');
    const files=document.getElementById('files');
    const formData=new FormData();
    
    formData.append('name',name.value);
    for(let i=0;i<files.files.length;i++){
        formData.append('files',files.files[i]);
    }

    fetch('http://localhost:3000/upload_files',{
        method:'POST',
        body:formData,
        })
        .then((res)=>console.log(res))
        .catch((err)=>('Error occured',err));

}

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