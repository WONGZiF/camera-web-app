var frontcamera = false;
var currentScream;

const
    cameraView = document.querySelector("#camera-view"),
    cameraDevice = document.querySelector("#camera-device"),
    photoDisplay = document.querySelector("#photo-display"),
    takePhotoButtom = document.querySelector("#take-photo-buttom"),
    frontCameraButtom = document.querySelector("#front-camera-button");

    function cameraStart() {
        // Stop the video streaming before access the media device
        if (typeof currentScream !== 'undefined') {
            currentScream.getTracks().forEach(track => {track.stop();});
        }

        var constraints = { video: { facingMode: (frontcamera? "user" : "environment") }, audio: false };

        navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            currentScream = stream;
            cameraDevice.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error happened.", error);
        });

    }

    takePhotoButton.onclick = function() {
        cameraView.width = cameraDevice.videoWidth;
        cameraView.height = cameraDevice.videoHeight;
        cameraView.getContext("2d").drawImage(cameraDevice, 0, 0);
        photoDisplay.src = cameraView.toDataURL("image/webp");
        photoDisplay.classList.add("photo-taken");
    };

    frontCameraButton.onclick = function() {
        frontcamera = !frontcamera;
        if (frontcamera) {
            frontCameraButton.textContent = "Back Camera";
        }
        else {
            frontCameraButton.textContent = "Front Camera";
        }
        cameraStart();
    };
        