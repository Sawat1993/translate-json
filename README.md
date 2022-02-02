# translate-json

### Steps to Translate JSON
- Place English JSON files in ```/files/input-json/``` folder
- Place Translation files in ```/files/input-xls/``` folder. (Translation files should have only two columns)
- Execute ```npm run start``` command
- All translation files will be generated in ```/files/output/``` folder

### File Structure
![File Structure](https://github.com/Sawat1993/translate-json/blob/master/file-structure.png)

### DO not disturb keys
- In some case we don't want to translate some keys like id, url, etc.
- We can update DND keys variable in ```index.js``` to not translate mentioned keys.

