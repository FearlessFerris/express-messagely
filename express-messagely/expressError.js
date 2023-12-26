// Create ExpressError class that extends the Error 

class ExpressError extends Error {
    constructor( msg, status ){
        super();
        this.msg = msg;
        this.status = status;
        console.log( this.stack )
    }
}

// Export ExpressError Class 
module.exports = ExpressError;