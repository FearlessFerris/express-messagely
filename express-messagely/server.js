// Import Application 
const app = require( './app' );
const port = process.env.port || 3000;

// Start Server on selected port 
app.listen( port, () => {
    console.log( `Server is running on port: ${ port } `);
});

