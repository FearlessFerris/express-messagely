// User Routes 
 const express = require( 'express' );
 const router = new express.Router();
 const User = require( '../models/user' );
 const jwt = require( 'jsonwebtoken' );
 const { SECRET_KEY } = require( '../config' );
 const ExpressError = require('../expressError');



// Application Homepage 
 router.get( '/', ( req, res ) => {
    return res.json({ Welcome: 'To the User Routes Homepage!!!' });
 });

 // Register a new User 
 router.post( '/register', async ( req, res, next ) => {
    try{
        let { username, password, f_name, l_name, phone } = await User.register( req.body )
        let token = jwt.sign({ username }, SECRET_KEY );
        return res.json({ 
            token: token,
            user: username,
            password: password,
            f_name: f_name,
            l_name: l_name,
            phone: phone
         });
    }
    catch( e ){
        return next( e );
    }
 });

 // User Login Page 
 router.post( '/login', async ( req, res, next ) => {
    try{
        const { username, password } = req.body;
        if( await User.authenticate( username, password )){
            let token = jwt.sign({ username }, SECRET_KEY )
            User.updateLogin( username )
            return res.json({ token })
        }
        else{
            throw new ExpressError( 'Invalid Username / Password', 400 )
        }
    }
    catch( e ){
        return next( e );
    }
 });

 // Return a list of all users inside of the Messagely Database 
 router.get( '/all', async ( req, res, next ) => {
    try{
        const allUsers = await User.all();
        return res.json({ Users: allUsers })
    }
    catch( e ){
        return next( e );
    }
 });

 // Return a specific use by a username 
 router.get( '/:username', async ( req, res, next ) => {
    try{
        const user = await User.get( req.params.username )
        return res.json({ User: user });
    }   
    catch( e ){
        return next( e );
    }
 });

 // Return all messages from a specific user 
 router.get( '/:username/from', async ( req, res, next ) => {
    try{
        const messages = await User.messagesFrom( req.params.username )
        return res.json({ Messages: messages });
    }
    catch( e ){
        return next( e );
    }
 });

 // Return all messages sent to a specific user 
 router.get( '/:username/to', async ( req, res, next ) => {
    try{
        const messages = await User.messagesTo( req.params.username )
        return res.json({ Messages: messages });
    }
    catch( e ){
        return next( e );
    }
 });




 module.exports = router;