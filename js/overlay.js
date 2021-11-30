let OCTOPRINT_VERSION = null;
$().ready(async function () {
    OCTOPRINT_VERSION = await getVersion();
    // debugger;
    console.log('Connected to Octoprint server version: ' + OCTOPRINT_VERSION.server);
    console.log(await getCurrentJob());
});
