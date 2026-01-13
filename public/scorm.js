var scorm = (function () {
    var api = null;

    function findAPI(win) {
        try {
            if (win.API != null) return win.API;
            if (win.parent && win.parent != win) {
                var found = findAPI(win.parent);
                if (found) return found;
            }
            if (win.opener && win.opener.API != null) return win.opener.API;
        } catch (e) {
            console.log("SCORM API Security Exception", e);
        }
        return null;
    }

    function init() {
        api = findAPI(window);
        if (!api) {
            // Try to find API in top frame just in case
            try {
                if (window.top.API) api = window.top.API;
            } catch (e) { }
        }

        if (api) {
            console.log("SCORM API Found");
            var status = api.LMSInitialize("");
            if (status == "true") {
                api.LMSSetValue("cmi.core.lesson_status", "completed");
                api.LMSCommit("");
            }
        } else {
            console.log("SCORM API Not Found - Running in Standalone Mode");
        }
    }

    function finish() {
        if (api) {
            api.LMSFinish("");
        }
    }

    return { init: init, finish: finish };
})();

// Initialize safely
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scorm.init);
} else {
    scorm.init();
}

window.addEventListener('beforeunload', function () {
    scorm.finish();
});
