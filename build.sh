
cd app/
npm run build
cd ../
rm -rf btmagd/
mkdir btmagd/
cd btmagd/
mkdir app/
cd ../
cp -r app/dest btmagd/app/
cp -r js icons manifest.json btmagd/