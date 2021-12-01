let OCTOPRINT_VERSION = null;
$().ready(async function () {
    let urlParams = new URLSearchParams(window.location.search);
    SERVER_URL = urlParams.get('server');
    API_KEY = urlParams.get('key');
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

    //Update UI
    $('.label-status').text(printState);
    $('.label-file').text(fileName.replace('.gcode', ''));
    $('.label-filament-used').text(parseFloat(filamentLenghtUsed / 1000).toFixed(2) + 'm');
    $('.label-estimated-print-time').text(secondsToString(estimatedPrintTime));
    $('.label-elapsed-time').text(secondsToString(printTime));
    $('.label-time-left').text(secondsToString(printTimeLeft));
    let completePercentage = parseFloat(completionPercent).toFixed(1);
    let $progressBar = $('.progress-bar');
    $progressBar.css('width', completePercentage + '%');
    $progressBar.attr('aria-valuenow', completePercentage);
    $progressBar.text(completePercentage + '%');
    $('.label-nozzle-temp').text(tool0Actual + ' C (Target: ' + tool0Target + ' C)');
    $('.label-bed-temp').text(bedActual + ' C (Target: ' + bedTarget + ' C)');


    function secondsToString(seconds) {
        seconds = parseInt(seconds, 10)
        let hours = Math.floor(seconds / 3600)
        let minutes = Math.floor((seconds - (hours * 3600)) / 60)
        seconds = seconds - (hours * 3600) - (minutes * 60)
        if (!!hours) {
            if (!!minutes) {
                return `${hours}h ${minutes}m ${seconds}s`
            } else {
                return `${hours}h ${seconds}s`
            }
        }
        if (!!minutes) {
            return `${minutes}m ${seconds}s`
        }
        return `${seconds}s`
    }

}
