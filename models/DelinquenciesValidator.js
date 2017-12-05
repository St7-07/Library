const db_connection = require('../DB_Connnection').db_connection;
const sql = require('../DB_Connnection').sql;

module.exports = {
    validateDelinquencies: function(){
                                db_connection.then(pool => {
                                console.log("conecto");
                                return pool.request().execute('showDelinquencies');
                                }).then(result => {
                                    checkDelinquencies(result.recordsets[0])
                                }).catch(err => {
                                    console.log(err);
                                });
    }
} 

//Makes map function to check if a delinquency has to be deleted
function checkDelinquencies(records){
    let delinquencies = records.map(record =>{
        return{
            delqDate : record.delqdDate,
            numDays : record.numDays,
            id: record.id_delinquency
        }
    });

    for(let key in delinquencies){
        if(isDelinquencyOver(delinquencies[key].delqDate, delinquencies[key].numDays )){
            deleteDelinquency(delinquencies[key].id)
            console.log("Se ha eliminado la morosidad del numero de cedula: "+delinquencies[key].id)
        }else{
            console.log("No se ha borrado la morosidad: "+delinquencies[key].id)
        }
    }
}

//checks if the diference between the delqDate and the actual day is great than numDays
//if it is, returns true
function isDelinquencyOver(delqDate,numDays){
    let isOver = false;
    let today = new Date();
    let delqDateD = new Date(delqDate.slice(0, -5));
    let daysDiff = (today - delqDateD) / (1000 * 60 * 60 * 24);
    console.log("Diferencia entre dias: "+ daysDiff )
    if(daysDiff >= numDays){
        isOver = true;
    }
    return isOver;
}


function deleteDelinquency(delinquencyId){
    db_connection.then(pool =>  {
        return pool.request().
           input('delinquencyId', sql.Int, delinquencyId).
           execute('deleteDelinquencyByIdentification');
   }).then(result => {
       console.log(result.output)
   }).catch(err => {
       console.log(err)
   });
}