function resizeImages(source, dest, width, height) {
    return new Promise((resolve, reject) => {
        fs.readdir(source, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const promises = [];
                files.forEach((filename) => {
                    promises.push(resizeImage(source, filename, width, height));
                });
                Promise.all(promises)
                    .then((values) => {
                        resolve(values);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        })
    }
}

function resizeImage(source, filename, width, height){
    return new Promise((resolve, reject) => {
        gm(source + filename)
            .resize(width, height)
            .write(
                dest + "w" + width + "_" + filename,
                (err, values) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(values);
                }
            );
    }
}