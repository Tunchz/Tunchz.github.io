var currentDashboardState = "";
var saveTimer;
var boardID;
var isPrivate = false;
var canEdit = false;
var wasEditing = false;
var wasHeaderOpen = false;
(function() {
    var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() {
                return false
            },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: "",
            prefix: ""
        },
        browserPrefixes = "webkit moz o ms khtml".split(" ");
    if (typeof document.cancelFullScreen != "undefined") {
        fullScreenApi.supportsFullScreen = true
    } else {
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
            fullScreenApi.prefix = browserPrefixes[i];
            if (typeof document[fullScreenApi.prefix + "CancelFullScreen"] != "undefined") {
                fullScreenApi.supportsFullScreen = true;
                break
            }
        }
    }
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + "fullscreenchange";
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case "":
                    return document.fullScreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + "FullScreen"]
            }
        };
        fullScreenApi.requestFullScreen = function(el) {
            return this.prefix === "" ? el.requestFullScreen() : el[this.prefix + "RequestFullScreen"]()
        };
        fullScreenApi.cancelFullScreen = function(el) {
            return this.prefix === "" ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
        }
    }
    if (typeof jQuery != "undefined") {
        jQuery.fn.requestFullScreen = function() {
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this)
                }
            })
        }
    }
    window.fullScreenApi = fullScreenApi
})();

function updateFullScreenStatus() {
    if (fullScreenApi.isFullScreen()) {
        wasEditing = freeboard.isEditing();
        wasHeaderOpen = freeboard.isHeaderOpen();
        freeboard.setEditing(false, false);
        freeboard.setHeaderOpen(false);
        $("#main-header").hide();
        // $("#board-content").css({'margin-bottom': 50});
        $("#footer-bar").hide();
        // $("#share-action").hide();
        // $("#clone-action").hide();
        // $("#full-screen").text("Shrink");
        // $("#full-screen").hide();
        // $("#full-screen-icon").removeClass("icon-resize-full").addClass("icon-resize-small")
        // $("#full-screen-icon").show();
        // $("#header").addClass("full-screen");
        // $("#admin-bar").addClass("full-screen");
        $("#board-content-bottom").addClass("full-screen");

        // Compensate top margin
        setTimeout(()=>{
            var topMargin;
            freeboard.getFullscreenAutoTopMargin()?(topMargin = ($("body").height() - $("#board-content").height()-6)/2,(topMargin<=0)&&(topMargin=0)):(topMargin = freeboard.getFullscreenTopMargin());
            console.log("------> view height : ",$("body").height());
            console.log("------> content height : ",$("#board-content").height());
            $("#board-content-top").css({'height': topMargin+"px"});
        },500)
    } else {
        if (canEdit) $("#main-header").show()
        if (wasEditing) freeboard.setEditing(true, true)
        if (wasHeaderOpen) freeboard.setHeaderOpen(wasHeaderOpen)
        // $("#board-content").css({'margin-bottom': 50});
        $("#footer-bar").show();
        // $("#share-action").show();
        // $("#clone-action").show();
        // $("#full-screen").text("Fullscreen");
        // $("#full-screen").show();
        // $("#full-screen-icon").addClass("icon-resize-full").removeClass("icon-resize-small")
        // $("#header").removeClass("full-screen");
        // $("#admin-bar").removeClass("full-screen");
        $("#board-content-bottom").removeClass("full-screen");


        $("#board-content-top").css({'height': "0px"});
    }
}

function toggleFullScreen() {
    if (fullScreenApi.isFullScreen()) {
        fullScreenApi.cancelFullScreen()
    } else {
        fullScreenApi.requestFullScreen(document.documentElement)
    }
}

function saveChanges() {
    console.log("--- saveChanges")
    if (!canEdit) {
        return
    }
    var newDashboardState = JSON.stringify(freeboard.serialize());
    console.log("--- serialize New and check for changes")
    if (currentDashboardState && newDashboardState !== currentDashboardState) {
        // $.post("/board/update/" + boardID, {
        //     data: newDashboardState
        // }, function() {
        //     currentDashboardState = newDashboardState
        // })
        console.log("--- CHANGES Found >>> processing save & update state")
        window.localStorage.setItem("netpie.freeboard.dashboard", newDashboardState);
        // currentDashboardState = newDashboardState
    }
}

function sleep(milliseconds) {
    var start = (new Date).getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date).getTime() - start > milliseconds) {
            break
        }
    }
}

function SelectText(element) {
    var doc = document,
        text = $(element).get()[0],
        range, selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select()
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range)
    }
}
window.onbeforeunload = function(e) {
    console.log("--- onbeforeUnload")
    if (!canEdit) {
        return
    }
    var newDashboardState = JSON.stringify(freeboard.serialize());
    if (currentDashboardState && newDashboardState !== currentDashboardState) {
        console.log("--- calling saveChanges")
        saveChanges();
        return "Click any button to save changes"
    }
    return
};
var sharingModel = function() {
    var self = this;
    self.sharedWith = ko.observableArray();
    self.addShare = function() {
        self.sharedWith.push({
            email: $("#share-with-email").val(),
            allowEdit: false
        });
        var sharedWithList = $("#shared-with-list");
        sharedWithList.scrollTop(sharedWithList[0].scrollHeight);
        $("#share-with-email").val("")
    };
    self.removeShare = function(item) {
        self.sharedWith.remove(item)
    }
};

function share() {
    var shareDialogContent = $("<div></div>");
    var onOffSwitch = $('<div class="onoffswitch" id="publicPrivateSwitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="publicPrivateSwitchInput"><label class="onoffswitch-label" for="publicPrivateSwitchInput"><div class="onoffswitch-inner"><span class="on">PUBLIC</span><span class="off">PRIVATE</span></div><div class="onoffswitch-switch"></div></label></div>');
    var sharingSettings = $("<div></div>");
    var onOffCheckbox = onOffSwitch.find("input");
    var shared = new sharingModel;

    function updateSharingSettings() {
        sharingSettings.empty();
        if (onOffCheckbox.prop("checked")) {
            $("span#dialog-ok").show();
            sharingSettings.append('<div style="margin-top:20px;">This freeboard is public and can be viewed by anyone at the url:</div>');
            $('<div class="share-link">' + location.href + "</div>").appendTo(sharingSettings).click(function() {
                SelectText(this)
            });
            var twitterShareButton = $('<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-lang="en">Tweet</a>').attr("data-text", "See my freeboard!").attr("data-url", location.href);
            sharingSettings.append($('<div style="margin-top:20px;"></div>').append(twitterShareButton));
            // twttr.widgets.load()
        } else {
            $("span#dialog-ok").hide();
            freeboard.showLoadingIndicator(true);
            // $.ajax({
            //     url: "/board/sharedwith/" + boardID,
            //     success: function(data) {
            //         if (!isPrivate && data.allocatedPrivate + 1 > data.privateBoards) {
            //             sharingSettings.append('<div style="margin-top:20px;">Your account does not allow any more private freeboards. <a href="/account/settings/#billing">Purchase or upgrade a plan</a> to make this freeboard private.</div>')
            //         } else {
                        $("span#dialog-ok").show();
                        sharingSettings.append('<div style="margin-top:20px;">This freeboard is private and can be viewed by the following people:</div>');
                        // if (_.isArray(data.sharedWith)) {
                        //     shared.sharedWith(data.sharedWith)
                        // }
                        var shareListContainer = $('<div class="share-list-container" data-bind="template: { name: \'sharing-template\'}"></div>');
                        sharingSettings.append(shareListContainer);
                        // ko.applyBindings(shared, shareListContainer.get()[0])
                //     }
                // },
                // complete: function() {
                    freeboard.showLoadingIndicator(false)
            //     }
            // })
        }
    }
    if (!isPrivate) {
        onOffCheckbox.attr("checked", true)
    }
    onOffCheckbox.change(function() {
        updateSharingSettings()
    });
    updateSharingSettings();
    var saveButton;
    var cancelButton = "Close";
    if (canEdit) {
        shareDialogContent.append(onOffSwitch);
        saveButton = "Save";
        cancelButton = "Cancel"
    }
    shareDialogContent.append(sharingSettings);
    freeboard.showDialog(shareDialogContent, "Share With", saveButton, cancelButton, function() {
        freeboard.showLoadingIndicator(true);
        if (onOffCheckbox.prop("checked")) {
            // $.post("/board/update/" + boardID, {
            //     isPrivate: "false"
            // }, function() {
                isPrivate = false;
                freeboard.showLoadingIndicator(false)
            // })
        } else {
            var sharedWithArray = shared.sharedWith();
            _.each(sharedWithArray, function(share) {
                share.allowEdit = share.allowEdit == true
            });
            // $.post("/board/update/" + boardID, {
            //     isPrivate: "true",
            //     sharedWith: JSON.stringify(sharedWithArray)
            // }, function() {
                isPrivate = true;
                freeboard.showLoadingIndicator(false)
            // })
        }
    });
    // twttr.widgets.load()
}
$(function() {
    if (!fullScreenApi.supportsFullScreen) {
        $("#full-screen-action").hide()
    }
    $(document).on(fullScreenApi.fullScreenEventName, function() {
        updateFullScreenStatus()
    });
    var boardData = JSON.parse(unescape($("#data-board").html()));
    // console.log("------- boardData ",boardData)
    boardID = boardData.id;
    isPrivate = boardData.isPrivate;
    canEdit = boardData.canEdit;
    $("#board-title").text(boardData.name);
    // $("#clone-action").click(function() {
    //     location.href = "/board/clone/" + boardID
    // });
    $("#share-action").click(share);
    $("#edit-dashboard").click(function() {
        location.href = "/board/edit/" + boardID
    });
    // freeboard.setAssetRoot("/freeboard-ui/");
    // freeboard.initialize(boardData.allow_edit, function() {
    //     if (!isPrivate) {
    //         delete boardData.bg_color;
    //         delete boardData.pane_header_bg_color;
    //         delete boardData.pane_bg_color;
    //         delete boardData.header_image
    //     }
    //     freeboard.loadDashboard(boardData, function() {
            if (canEdit) {
                // currentDashboardState = JSON.stringify(freeboard.serialize());
                setTimeout(function() {
                    console.log("--- save current Dashboard")
                    currentDashboardState = JSON.stringify(freeboard.serialize());
                    saveTimer = setInterval(saveChanges, 15e3);
                }, 5e3);
                // saveTimer = setInterval(saveChanges, 5e3);
            //     $("#edit-dashboard").click(function() {
            //         location.href = "/board/edit/" + boardID
            //     })
            }
    //     });
    //     if (boardData.allow_edit) {
    //         head.js("./plugins/all.js")
    //     }
    // })
});