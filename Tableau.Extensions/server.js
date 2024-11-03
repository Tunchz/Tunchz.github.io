const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)

// Listen to Static Files
app.use(express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/javascript', express.static(__dirname + 'public/javascript'));
// app.use('/image', express.static(__dirname + 'public/image'));

// app.use('/smm-network2', express.static(__dirname + 'smm-network2'));
// app.use('/assets', express.static(__dirname + 'smm-network2/assets'));
// app.use('/icons', express.static(__dirname + 'smm-network2/icons'));
// app.use('/fonts', express.static(__dirname + 'smm-network2/fonts'));
// app.use('/dist', express.static(__dirname + 'public/dist'));
// app.use('/models', express.static(__dirname + 'public/models'));


// Listen to HTML
// app.get('', (req, res) => {
//     res.sendFile(__dirname + '/smm-network2/index.html');
// })

// app.get('/clone', (req, res) => {
//     res.sendFile(__dirname + '/public/train/index.html');
// })

app.listen(3000,() => console.log('Server running on port 3000'));

