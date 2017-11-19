module.exports = function(identification, name, lastname, email,
    tel, cel, expireDate, districtID, signals, locationID, applicant) {
       //Validar con patrones
       this.identification = identification;
       this.name = name;
       this.lastname = lastname;
       this.email = email;
       this.tel = tel;
       this.cel = cel;
       this.expireDate =  new Date(expireDate);
       this.districtID = districtID;
       this.signals = signals;
       this.locationID = locationID;
}