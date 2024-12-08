const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: 'dsjxutapk',
    api_key: '526932476659242',
    api_secret: 'iJzINK5Swjfb8LkDv4wFg9HaMW0'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Ecommerce-App",
        resource_type: "image",
        public_id: (req, file) => file.originalname.split('.')[0], // Use file's original name
    },
});

const parser = multer({ storage: storage });

module.exports = {
    cloudinary,
    parser,
};


// public_id: (req, file) => "computed-filename-using-request",
