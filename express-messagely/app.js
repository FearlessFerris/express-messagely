// Main Application 
const express = require( 'express' );
const morgan = require( 'morgan' );
const app = express();


// Routers 
const userRoutes = require( './routes/users' );


// Middleware 
app.use( express.json() ) // Parse bodies for JSON
app.use( '/users', userRoutes ) // Set a prefix for the user routes
app.use( morgan( ':method :url :status :res[content-length] :response-time ms' ) ) // This middleware is used to give the user basic information about HTTP requests 

// Routes 
app.get( '/', ( req, res ) => {
    return res.json({ Welcome: 'To the Messagely Homepage' });
});

// Export Application to use elsewhere 
module.exports = app;

