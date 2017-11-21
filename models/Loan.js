module.exports = function(loanDate,returnDate,returnedDate , state){
    this.loanDate=new Date(loanDate);
    this.returnDate=new Date(returnDate);
    this.returnedDate =new Date(returnedDate);
    this.state = state;
    }