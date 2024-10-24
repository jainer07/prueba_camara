function VerificarPermisos() {
    navigator.permissions.query({ name: 'camera' }).then(function (permissionStatus) {
        const mensaje = document.getElementById('mensaje');
        if (permissionStatus.state === 'granted') {
            mensaje.innerHTML = "Si tiene permisos"
            //window.location.href = `${window.location.origin}/PagoRv/CapturarDocumento`;
        }
        else if (permissionStatus.state === 'denied') {
            mensaje.innerHTML = 'permisos denegados';
            //$.get(`/PagoRv/SinPermisosCamara?opcion=1`, function (data) { $("#DetalleCapturaDocumento").html(data); });
        }
        else {
            mensaje.innerHTML = 'conceder permisos';
            //$.get(`/PagoRv/SinPermisosCamara?opcion=0`, function (data) { $("#DetalleCapturaDocumento").html(data); })
        }

        permissionStatus.onchange = function () {
            VerificarPermisos();
        };
    });
}

function ActivarPermisoCamara() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            window.location.href = `${window.location.origin}/CapturarDocumento`;
        })
        .catch(function (error) {
            const mensaje = document.getElementById('mensaje');
            mensaje.textContent = 'No se pudo obtener el permiso para la cámara.';
            $("#ActivarPermiso").remove();
            $(".container_mensaje_error").removeClass("ocultar");
        });
};

// const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const captureButton = document.getElementById('capture');

// // Pedir permiso para usar la cámara y comenzar la transmisión
// navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => {
//         video.srcObject = stream;
//         video.play();
//     })
//     .catch(err => {
//         console.error("Error al acceder a la cámara: ", err);
//     });

// // Capturar la foto al hacer clic en el botón
// captureButton.addEventListener('click', () => {
//     const context = canvas.getContext('2d');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const dataURL = canvas.toDataURL('image/png');
//     console.log("Foto capturada: ", dataURL);
// });
