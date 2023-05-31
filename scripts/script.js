var nameuser = document.querySelector("input#exampleInputName")
var gender = document.querySelectorAll("#form-user-create [name=gender]:checked")
var birth = document.querySelector("input#exampleInputBirth")
var country  = document.querySelector("input#exampleInputCountry")
var email = document.querySelector("input#exampleInputEmail")
var  password = document.querySelector("input#exampleInputPassword")
var photo  = document.querySelector("input#exampleInputFile")
var  admin = document.querySelector("input#exampleInputAdmin")

var fields = document.querySelectorAll("#form-user-create [name]")

var user = {}

fields.forEach(function(field, index){

    if(field.name == "gender"){
        if(field.checked){
            user[field.name] = field.value;
        }
        
    }
    else{
        user[field.name] = field.value;

    }


    
})
console.log(user)

