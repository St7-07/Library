module.exports = function(type,hour){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let mn = today.getMinutes();

    if(dd < 10){
        dd= "0"+dd;
    }
    if(mm < 10){
        mm= "0"+mm;
    }
    if(hh < 10){
        hh= "0"+hh;
    }

    if(mn < 10){
        mn= "0"+mn;
    }

    if(type == 'actual'){
        today =  yyyy + '-'+mm+"-"+dd+"T"+hh+":"+mn+":00Z";
    }else if(type == 'end'){
        today = yyyy + '-'+mm+"-"+dd+"T"+hour+":00Z";
    }
    this.date = new Date(today);
};
