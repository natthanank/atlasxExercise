#install nuget package
nuget install .\WebApp\packages.config -OutputDirectory .\packages

#'$?' in powershell will return true if last command return success
if (!($?)) {echo "!!! ABORTING !!!"; exit;}

#build project
$msbuild = "C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe"
&$msbuild ('WebApp.sln','/verbosity:n','/p:DeployOnBuild=true','/p:PublishProfile=DeployProfile')

if (!($?)) {echo "!!! ABORTING !!!"; exit 1;}

#build Angular
cd .\Angular
npm install --cache "C:\npmcache"
if (!($?)) {echo "!!! ABORTING !!!"; exit 1;}

ng build --prod --aot=false --output-path=D:\Project\AtlasX\client
if (!($?)) {echo "!!! ABORTING !!!"; exit 1;}

exit 0;