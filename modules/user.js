//MODEL - Modelo de dados, definição/tratamento dos dados(atributos).
class User{
    
    constructor(name, gender, birth, email, password, country, photo, admin){

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

}