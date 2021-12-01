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
    const jobInfo = await getCurrentJob();
    const estimatedPrintTime = jobInfo.job.estimatedPrintTime;
    const filamentLenghtUsed = jobInfo.job.filament.tool0.length;
    const fileName = jobInfo.job.file.display;
    const completionPercent = jobInfo.progress.completion;
    const printTimeLeft = jobInfo.progress.printTimeLeft;
    const printTime = jobInfo.progress.printTime;
    const printState = jobInfo.state

    //get printer information
    const printerInfo = await getPrinterState();
    const bedTarget = printerInfo.temperature.bed.target;
    const bedActual = printerInfo.temperature.bed.actual;
    const tool0Target = printerInfo.temperature.tool0.target;
    const tool0Actual = printerInfo.temperature.tool0.actual;

}
