//CONTROLLER, CONTROLA as regras de negocios/functions
class UserController{

    constructor(formIdCreate, formIdUpdate, tableId){

       this.formEl = document.getElementById(formIdCreate);
       this.formUpdateEl = document.getElementById(formIdUpdate);
       this.tableEl = document.getElementById(tableId)
 
       this.onSubmit();
       this.onEdit();
       this.selectAll();

    }

    onEdit(){
        document.querySelector("#div-box-update .btn-cancel").addEventListener("click", e=>{
            this.showCadastratePanel();
        })

        //working the submit btn after the datas edit, replacing for the new datas, recriating the HTML of the line with the new updates.
        this.formUpdateEl.addEventListener("submit", (btn)=>{
            btn.preventDefault()

            let submitBtn = this.formUpdateEl.querySelector("[type=submit]");

            submitBtn.disabled = true;


            //basically these comands are getting the old and the new values of the Update and Create Form.
            let userValues = this.getValues(this.formUpdateEl);
            
            let index = this.formUpdateEl.dataset.trIndex

            let tr =  this.tableEl.rows[index]

            let oldValues =  JSON.parse(tr.dataset.datauser)

            let result = Object.assign({}, oldValues, userValues)

          
            // saving the photo
            this.getPhoto(this.formUpdateEl).then(
                (content)=>{

                    if(!userValues.photo){ 
                        result._photo = oldValues._photo;} 
                    else{
                        result._photo = content
                    }
                        
                    //case the required camps wont be filled
                    if(!userValues){
                        console.error("Plese fill the required camps.")
                        this.formEl.reset();
                        return submitBtn.disabled = false;;
                    }

                    // recriating the HTML with the new updated line.
                    tr.dataset.datauser = JSON.stringify(result);
                    
                    tr.innerHTML = ` <tr>
                    <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${result._name}</td>
                    <td>${result._email}</td>
                    <td class="admin-state">${(result._admin)? "Sim" : "Não"}</td>
                    <td>${usefullMethods.dateFormat(result._register)}</td>
                    <td>
                    <button type="button" class="btn btn-primary btn-xs  btn-flat btn-edit">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs  btn-flat">Excluir</button>
                    </td>
                    </tr>
                    `;
                    
                    //bringing back the cadastrate panel with the ready new values.
                    this.addEventsTr(tr);
                    this.updateCount(); 
                    this.formUpdateEl.reset();
                    submitBtn.disabled = false;
                },

                ()=>{
                    console.error('Nothing was Sent.')

                })

                this.showCadastratePanel();})


        

    }

    onSubmit(){

       this.formEl.addEventListener("submit", (btn)=>{
            // cancel the submit of the form
            btn.preventDefault();

            let submitBtn = this.formEl.querySelector("[type=submit]");

            submitBtn.disabled = true;

            // values from the users 
            let userValues = this.getValues(this.formEl);
            //send photo
            this.getPhoto(this.formEl).then(
                (content)=>{
                    
                    //case the required camps wont be filled
                    if(!userValues){
                        console.error("Plese fill the required camps.")
                        this.formEl.reset();
                        return submitBtn.disabled = false;;
                    }

                    userValues.photo = content;
                    
                    this.insertData(userValues)

                    this.addLine(userValues);

                    this.formEl.reset();
                    submitBtn.disabled = false;
                },
                ()=>{
                    console.error('Nothing was Sent.')

                })
        })
    }

    getPhoto(form){

        return new Promise((resolve, reject)=>{

            let userPhoto = new FileReader();
    
            let photoEl = [...form.elements].filter(item =>{
                if (item.name === 'photo'){
                    return item;
                }
            }) 
    
            //acess the elements and get the photoURL in the files
            let file = photoEl[0].files[0]

            // call the right way of the promisse, throwing in the first fn from then().
            // onload -> after uploading the photo.
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




    getValues(formName){

        let user = {};
        let isValid = true;

        [...formName.elements].forEach(function(field){
            // checking if the required fields are filled.
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

    //method that makes the count of the users registered like a user or admin, changing values in the screen, using dataSet.
    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;
        let user = 0;

        [...this.tableEl.children].forEach(tr =>{

            numberUsers++;

            user = JSON.parse(tr.dataset.datauser)

            if(user._admin) numberAdmin++;
        })
        

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

        

    }

    getUserStorage(){
        let users = [];

        if(sessionStorage.getItem("user")){

            users = JSON.parse(sessionStorage.getItem("user"))

        }

        return users;

    }

    selectAll(){


        let users = this.getUserStorage();

        users.forEach(dataUser => {

            let user = new User();

            user.loadfromJSON(dataUser);
            
            this.addLine(user);

        })
        console.log(this.getUserStorage())
        
        
    }


    insertData(data){
    
        let users = this.getUserStorage();
        
        users.push(data);
        
        sessionStorage.setItem("user", JSON.stringify(users))
        
    }


    addLine(user){
    
        let tr = document.createElement("tr")

       

        //saving the first datas input, without updates.
        tr.dataset.datauser = JSON.stringify(user)

        tr.innerHTML = ` <tr>
            <td><img src="${user.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="admin-state">${(user.admin)? "Sim" : "Não"}</td>
            <td>${usefullMethods.dateFormat(user.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs  btn-flat btn-edit">Editar</button>
            <button type="button" class="btn btn-danger btn-xs  btn-flat btn-exclude">Excluir</button>
            </td>
            </tr>
            `;
            
            
           
        this.tableEl.appendChild(tr);
        this.updateCount();
        this.addEventsTr(tr)
        
    
        }
    

    addEventsTr(tr){
            //adding the event of click in the edit btn user datas.     
            tr.querySelector(".btn-edit").addEventListener("click", e =>{
            
                // getting the values writted back showing in the edit user datas form.
                let json = JSON.parse(tr.dataset.datauser);
                this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
                                
                
                for (let key in json) {
                    let field = this.formUpdateEl.querySelector("[name =" + key.replace("_", "") + "]")
                    
                    if(field)   {
                        
                        switch(field.type){
                            case "file":
                                continue;
                                
                           case "radio":
                               field = this.formUpdateEl.querySelector("[name =" + key.replace("_", "")+ "][value=" + json[key] + "]")
                               field.checked = true;
                               break;
                               
                               case "checkbox":
                                   field.checked = json[key]
                                   break;
                                   
                                   default:
                                       field.value = json[key];
                    
                                    }
                                }}

                this.formUpdateEl.querySelector(".photo").src = json._photo

                //showing the editpanel
                this.showEditPanel();})
            //adding the event of click in the edit btn user datas.
            tr.querySelector(".btn-exclude").addEventListener("click", e =>{

                if(confirm("Deseja realmente excluir?")){
                
                    tr.remove()
                    this.updateCount();
                }
        })

    }   
    
    
    showCadastratePanel(){

        document.querySelector("#div-box-create").style.display = "block"
        document.querySelector("#div-box-update").style.display = "none"

    }

    showEditPanel(){

        document.querySelector("#div-box-create").style.display = "none"
        document.querySelector("#div-box-update").style.display = "block"
    }
}