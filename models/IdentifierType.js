module.exports = function(identifier)
{
    let typeNum;
    if(identifier.length == 6){
        typeNum = 1; //Type 1 quiere decir estudiante
    }else if (identifier.length == 10){
        typeNum = 2; //Type 2 quiere decir funcionario
    }
    this.type = typeNum;
}