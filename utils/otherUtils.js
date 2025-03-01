// Other or common functions 

exports.randomNumber = (min, max) => { return Math.floor(Math.random() * (max - min)) + min; }

exports.sendFileWithFallback = async (res, filePath, fallbackFile) => {
    res.sendFile(filePath, (err) => {
        if (err) {
            res.sendFile(fallbackFile);
        }
    });

};
exports.sendProfileWithFallback = async (res, PngFilePath, JpgFilePath, JpegFilePath, fallbackFile) => {
    res.sendFile(PngFilePath, (err) => {
        if (err) {
            res.sendFile(JpgFilePath, (err) => {
                if(err){
                    res.sendFile(JpegFilePath, (err) => {
                        if(err){
                            res.sendFile(fallbackFile);
                        }
                    })
                }
            });
        }
    });

};