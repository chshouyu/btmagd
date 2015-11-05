
cd app/
npm run build
cd ../
rm -rf good-bt2mag/
mkdir good-bt2mag/
cd good-bt2mag/
mkdir app/
cd ../
cp -r app/index.html app/dest good-bt2mag/app/
cp -r js icons manifest.json good-bt2mag/