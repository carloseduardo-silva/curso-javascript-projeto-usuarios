//MODEL - Modelo de dados, definição/tratamento dos dados(atributos).
class User{
    
    constructor(name, gender, birth, email, password, country, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._email = email;
        this._password = password;
        this._country = country;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date()

    

    }       

    //Getters Method to acess the private atributes

    get id(){
        return this._id
    }

    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get country(){
        return this._country;
    }

    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    //Setters Method to atribute values for this private atributes.

    set register(value){
        return this._register = value;
    }
    
    set name(value){
        return this._name = value;
    }

    set gender(value){
        return this._gender = value;
    }

    set birth(value){
        return this._birth = value;
    }

    set email(value){
        return this._email = value;
    }

    set password(value){
        return this._password = value;
    }

    set country(value){
        return this._country = value;
    }

    set photo(value){
        return this._photo = value;
    }

    set admin(value){
        return this._admin = value;
    }

    
    
    loadfromJSON(dataUserJson){
    
        for (let name in dataUserJson) {
           
            switch (name){
                case "_register":
                    this[name] = new Date(dataUserJson[name])
                    break;

                default:
                    this[name] = dataUserJson[name];
            }
        }
}

    // get an array with the objects registered in the local storage.
    static getUserStorage(){
        let users = [];

        if(localStorage.getItem("user")){

            users = JSON.parse(localStorage.getItem("user"))

        }
        return users;
    }

    // get the ids of the objects, if not exists it creates one, returning then.
    getNewID(){

        let usersId = JSON.parse(localStorage.getItem('usersID'))
        //if not exists will value 0, will sum 1 and set this id value in the LocStorage
        if(!usersId > 0) usersId = 0;

        usersId ++;

        localStorage.setItem("usersID", usersId)

        return usersId;


    }

    // save the line registered in the localstorage + insert in the array of users objects.
    save(){
    
        let users = User.getUserStorage();
       
        //assigning id to the users object in the localstorage.
        // if dont exists == first id
        if(this.id > 0){

            users.map(u=>{
                //comparing the ids of the LOCAL STORAGE OBJECT and LINE HTML OBJECT.
                if(u._id == this.id){
                     Object.assign( u ,this)
                }
                return u;
            })
        } 
        // if already exists == just assign the next.
        else{
            
            this._id = this.getNewID();

            users.push(this);
            
        }
        localStorage.setItem("user", JSON.stringify(users))
        
        
    }


    // get the array user list from the localStorage, use the parameter "tr" to get his id and splice the right user value from the locstorage.
    removeLine(tr){

        let users = User.getUserStorage();
        
        users.splice(tr._id-1, 1)
        
        //setting the new localstorage list without de exclude user.
        localStorage.setItem("user", JSON.stringify(users))

   
    }










}