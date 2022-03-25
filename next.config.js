/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    apiKey: "AIzaSyAfjpds_s4PpjJhmhVc98GnqFL8ZPeaa18",
    authDomain: "sparrow-e7582.firebaseapp.com",
    projectId: "sparrow-e7582",
    storageBucket: "sparrow-e7582.appspot.com",
    messagingSenderId: "689673692771",
    appId: "1:689673692771:web:1fd921adf1a892c3e7ba56",

    DEFAULT_IMAGE_URL:
      "https://firebasestorage.googleapis.com/v0/b/sparrow-e7582.appspot.com/o/user.png?alt=media&token=2730043c-90da-40af-ad14-6c0838ecc36d",
  },
};

module.exports = nextConfig;
