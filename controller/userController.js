//CONTROLLER, CONTROLA as regras de negocios/functions
class UserController{

    constructor(formId, tableId){

       this.formEl = document.getElementById(formId);
       this.tableEl = document.getElementById(tableId)

       this.onSubmit();

    }

    onSubmit(){

       this.formEl.addEventListener("submit", (btn)=>{

            btn.preventDefault();

            let userValues = this.getValues();
        
            this.getPhoto().then(
                (content)=>{
                    //
                    userValues.photo = content;
        
                    this.addLine(userValues);

                },
                ()=>{
                    console.error('Nothing was Sent.')

                }
            )
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
         userPhoto.readAsDataURL(file);
         })
    }




    getValues(){

        let user = {};

        [...this.formEl.elements].forEach(function(field){

            if(field.name == "gender"){

                if(field.checked){
                    user[field.name] = field.value;
                }
                
            }

            else{
                user[field.name] = field.value;
        
            }
        })

       
        
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

    addLine(user){
   
        
       this.tableEl.innerHTML = ` <tr>
            <td><img src="${user.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.admin}</td>
            <td>${user.birth}</td>
            <td>
           <button type="button" class="btn btn-primary btn-xs  btn-flat">Editar</button>
           <button type="button" class="btn btn-danger btn-xs  btn-flat">Excluir</button>
            </td>
        </tr>
        `
    }

}