

let qr;

function generateQR() {
            let type = document.getElementById("qrType").value;
            let value = document.getElementById("qrInput").value.trim();
            let qrColor = document.getElementById("qrColor").value;
            let bgColor = document.getElementById("bgColor").value;

            if (!value) { alert("Please enter a value!"); return; }

            let finalValue = value;
            if (type === "url" && !value.startsWith("http")) finalValue = "https://" + value;
            else if (type === "phone") finalValue = "tel:" + value;
            else if (type === "email") finalValue = "mailto:" + value;

            qr = new QRious({
                element: document.getElementById("qrCanvas"),
                value: finalValue,
                size: 250,
                foreground: qrColor,
                background: bgColor
            });

            let fileInput = document.getElementById("logoUpload").files[0];
            if (fileInput) {
                let img = new Image();
                img.onload = function () {
                    let canvas = document.getElementById("qrCanvas");
                    let ctx = canvas.getContext("2d");
                    let size = 60;
                    ctx.drawImage(img, (canvas.width - size) / 2, (canvas.height - size) / 2, size, size);
                };
                img.src = URL.createObjectURL(fileInput);
            }
        }

        function downloadQR() {
            let canvas = document.getElementById("qrCanvas");
            let link = document.createElement("a");
            link.download = "qr_code.png";
            link.href = canvas.toDataURL();
            link.click();
        }