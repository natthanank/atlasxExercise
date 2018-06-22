# Prerequisite
1. Install Node.js and npm ([Download here](https://nodejs.org/en/)).
> Verify that you are running node version 8.9.x or greater, and npm 5.5.x or greater by running `node -v` and `npm -v` in a terminal window. Older versions produce errors.

2. Install angular/cli globally with version 1.6.x or greater. Open command prompt as admin and type  `npm install -g @angular/cli`, type `ng -v` to verify verion.
3. Type `npm install` for install node package.
4. Visual Studio 2015 Update 3.
5. IIS URL Rewrite ([Download here](https://www.iis.net/downloads/microsoft/url-rewrite)).

# Build and Setup
1. Open command prompt as admin in folder `/WebApp/Angular`.
2. Type `ng build --aot -dop=false -op="D:\Git\AtlasX\Web\Base\WebApp\WebApp" -bh="/WebApp/"`.
> Add `--watch` for run build when files change.

3. Open project `WebApp.sln` in Visual Studio.
4. Build and run project.

# Deployment
is in file ```Deploy.docx```

# Project Structure
is in file ```Structure.docx```

# Build Documentation(Optional)
1. Open command prompt as admin in folder ```/WebApp/Angular```
2. type ```npm run compodoc```# atlasxExercise
