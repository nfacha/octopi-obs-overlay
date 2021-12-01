let OCTOPRINT_VERSION = null;
$().ready(async function () {
    OCTOPRINT_VERSION = await getVersion();
    console.log('Connected to Octoprint server version: ' + OCTOPRINT_VERSION.server);
    setInterval(async function () {
        updateOverlay();
    }, 1000);
});


async function updateOverlay() {
    //get job information
    const data = await getCurrentJob();
    const estimatedPrintTime = data.job.estimatedPrintTime;
    const filamentLenghtUsed = data.job.filament.tool0.length;
    const fileName = data.job.file.display;
    const completionPercent = data.progress.completion;
    const printTimeLeft = data.progress.printTimeLeft;
    const printTime = data.progress.printTime;
    const printState = data.state

    //get printer information

}
