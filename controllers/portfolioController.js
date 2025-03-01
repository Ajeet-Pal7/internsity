const path = require('path')

const sendFileWithFallback = (res, filePath, fallbackFile) => {
    res.sendFile(filePath, (err) => {
        if (err) {
            res.sendFile(fallbackFile);
        }
    });
};

exports.getBatches = async (req, res) => {
    if (req.method === 'GET') {
        sendFileWithFallback(
            res,
            path.join(__dirname, '../public', 'portfolio.html'),
            path.join(__dirname, '../public', 'error-404.html')
        );
    }
    else if (req.method === 'POST') {

    }
}