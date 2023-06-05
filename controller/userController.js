//CONTROLLER, CONTROLA as regras de negocios/functions
class UserController{

    constructor(formId, tableId){

       this.formEl = document.getElementById(formId);
       this.tableEl = document.getElementById(tableId)

       this.onSubmit();

    }

    onSubmit(){

       this.formEl.addEventListener("submit", (btn)=>{
            // cancel the submit of the form
            btn.preventDefault();

            let submitBtn = this.formEl.querySelector("[type=submit]");

            submitBtn.disabled = true;

            // values from the users 
            let userValues = this.getValues();
            //send photo
            this.getPhoto().then(
                (content)=>{
                    
                    //case the required camps wont pe filled
                    if(!userValues){
                        console.error("Plese fill the required camps.")
                        this.formEl.reset();
                        return submitBtn.disabled = false;;
                    }

                    userValues.photo = content;
                    
                    this.addLine(userValues);

                    this.formEl.reset();
                    submitBtn.disabled = false;
                },
                ()=>{
                    console.error('Nothing was Sent.')

                })
        })
    }

    getPhoto(){

        return new Promise((resolve, reject)=>{

            let userPhoto = new FileReader();
    
            let photoEl = [...this.formEl.elements].filter(item =>{
                if (item.name === 'photo'){
                    return item;
                }
            }) 
    
            //acess the elements and get the photoURL in the files
            let file = photoEl[0].files[0]

            // call the right way of the promisse, throwing in the first fn from then().
            userPhoto.onload = ()=>{
               resolve(userPhoto.result)
         };

          // call the wrong way of the promisse, throwing in the second fn from then().
         userPhoto.onerror = (e)=>{

            reject(e);
         }
         
         
         //read the photoURL
         // case has a file -> pass the photo.
         if (file){
            userPhoto.readAsDataURL(file);

         }
         //case hasn't a file -> pass the default photo.
         else{
            resolve("dist/img/boxed-bg.jpg");
         }
         })
    }




    getValues(){

        let user = {};
        let isValid = true;

        [...this.formEl.elements].forEach(function(field){

            if(["name", "email", "password"].indexOf(field.name) > -1 && !(field.value)){

                field.parentElement.classList.add("has-error")
                isValid = false;
                

            }

            if(["name", "email", "password"].indexOf(field.name) > -1 && (field.value)){
                field.parentElement.classList.remove("has-error");

            }

            if(field.name == "gender"){

                if(field.checked){
                    user[field.name] = field.value;
                }
                
            }

            else if (field.name == "admin"){
                user[field.name] = field.checked;

            }

            else{
                user[field.name] = field.value;
        
            }
        })

        if(!isValid){
            return false;
        }
       
        
       return new User(
        user.name, 
        user.gender, 
        user.birth, 
        user.email, 
        user.password, 
        user.country,
        user.photo, 
        user.admin

        
        );

        
    }

    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr =>{

            numberUsers++;


        })

    }


    addLine(user){
        
        let tr = document.createElement("tr")

        tr.innerHTML = ` <tr>
            <td><img src="${user.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="admin-state">${(user.admin)? "Sim" : "Não"}</td>
            <td>${usefullMethods.dateFormat(user.register)}</td>
            <td>
           <button type="button" class="btn btn-primary btn-xs  btn-flat">Editar</button>
           <button type="button" class="btn btn-danger btn-xs  btn-flat">Excluir</button>
            </td>
        </tr>
        `;

        this.tableEl.appendChild(tr);

        this.updateCount()
    }

}