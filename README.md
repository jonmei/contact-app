# Contact Application

## Synopsis

This our SWAT team app. Made for learning purposes. Should work as rudimentary contact management app.

## Server installation

First run `npm install`.
Then `npm start` to start the server.

## Client setup

1. Copy these CDNs to header:

```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <script>
        //Set the server address here before adding to your project
        var serverAttr = "YOUR_SERVER_ADDRESS";
    </script>
    <script src="contact/contactForm.jsx" type="text/js"></script>
    <script src="contact/contactList.jsx" type="text/js"></script>
    <script src="contact/contact.jsx" type="text/js"></script>
    <link rel="stylesheet" href="contact/style.css">
```
2. Set your server address in var serverAddr = "YOUR_SERVER_ADDRESS"
3. Contact app will be included into div that has class name `contactContainer`, e.g.:
`<div class="contactContainer"></div>`
4. Make sure you are running website on http protocol, otherwise website will not work 

## License

The source code is under GNU GPL v3. Use it as you wish.
