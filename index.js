// Learning cookies: https://www.section.io/engineering-education/what-are-cookies-nodejs/
// TODO: How to authenticate a user with cookies
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express();

/**
 * Attributes to protect cookies
 * =============================
 * HTTPonly: makes cookie inaccessible to JS code (prevents cross-site scripting attack)
 * secure: browser will reject cookies NOT sent over https
 * sameSite: avoid privacy leaks, improves security? not sure how
 */
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('hello!')
})

// Set a cookie with a key value pair. This will be encrypted
app.get('/cookies/set', (req, res) => {
    const cookieOptions = {
        httpOnly: true, // makes cookie inaccessible to JS code (prevents cross-site scripting attack)
        secure: true, // browser will reject cookies NOT sent over https
        // maxAge: 5000, // expires in 5 seconds
        expires: new Date('01/12/2022'), // Works the same way as maxAge
        sameSite: 'lax' // cookie is only set when the domain in the URL of the browser matches the domain of the cookie, thus eliminating third party’s domains
    }

    res.cookie('testCookie', 'encyrpted cookie value hello!!!!', cookieOptions)
    res.send('Cookie saved!')
})

app.get('/cookies', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
})

// delete the saved cookie
app.get('/cookies/delete', (req, res) => {
    //show the saved cookies
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});

const PORT = 8080

app.listen(PORT, () => console.log(`The server is running port: ${PORT}`));
