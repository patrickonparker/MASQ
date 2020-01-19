var fs = require("fs"),
  request = require("request");

var download = function(uri, filename, callback) {
  request.head(uri, () => {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

const icon = process.env.APP_ICON;

if (icon) {
  download(icon, "app-icon.png", function() {
    console.info("Fetched icon:", icon);
  });
}
