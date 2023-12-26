
const db = require( '../db' );
const bcrypt = require( 'bcrypt' );
const { SALT } = require( '../config' );

// User Model 
class User {
    
    // Method to register a new user 
    static async register({ username, password, f_name, l_name, phone }){
        const hashed_pw = await bcrypt.hash( password, SALT );
        const result = await db.query(
            `INSERT INTO users (
                username,
                password,
                f_name,
                l_name,
                phone,
                join_at,
                last_login_at )
            VALUES ( $1, $2, $3, $4, $5, current_timestamp, current_timestamp )
            RETURNING username, password, f_name, l_name, phone`, 
            [ username, hashed_pw, f_name, l_name, phone ]
        );
        return result.rows[0];
    }

    // Method to authenticate the a user for login 
    static async authenticate( username, password ){
        const result = await db.query( 
            'SELECT * FROM users WHERE username = $1',
            [ username ]);
        let user = result.rows[0];
        
        return user && await bcrypt.compare( password, user.password )
    }

    // Update the latest login time for a specific user 
    static async updateLogin( username ){
        const result = await db.query( 
            `UPDATE users 
             SET last_login_at = current_timestamp
             WHERE username = $1
             RETURNING username, last_login_at`,
             [ username ]
        );
        console.log( result.rows );
        return result.rows[0];
    }

    // Display all users inside of the users table 
    static async all(){
        const result = await db.query(
            `SELECT username, f_name, l_name, phone FROM users`
        )
        console.log( result.rows );
        return result.rows
    }

    // Display information on a specific user 
    static async get( username ){
        const result = await db.query( 
            `SELECT username, f_name, l_name, phone FROM users
             WHERE username = $1`,
             [ username ]);
        console.log( result.rows );
        return result.rows
    }

    // Display messages from a specific user 
    static async messagesFrom( username ){
        const result = await db.query( 
            `SELECT * FROM messages
             WHERE from_username = $1`,
             [ username ]);
            
            console.log( result );
        return result.rows
    }

    // Display the messages sent to a specific user 
    static async messagesTo( username ){
        const result = await db.query( 
            `SELECT * FROM messages
             WHERE to_username = $1`,
             [ username ]);
            
            console.log( result );
        return result.rows
    }

}

module.exports = User;