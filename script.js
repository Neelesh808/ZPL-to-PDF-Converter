const f = async (code) => {
    const pdfDoc = await PDFLib.PDFDocument.create();
    // console.log(pdfDoc);

    for (let i = 0; i < code.length - 1; i++) {
        let code1 = code[i];
        let p = await fetch(`https://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/`, {
            method: "POST",
            body: `${code1} + ^XZ`,
            headers: {
                Accept: "application/pdf",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (p.status == 200) {
            let blob = await p.blob();
            let arrayBuffer = await blob.arrayBuffer();
            // console.log(arrayBuffer);
            let pdfBytes = new Uint8Array(arrayBuffer);
            // console.log(pdfBytes);

            const sourcePdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
            const copiedPages = await pdfDoc.copyPages(sourcePdfDoc, sourcePdfDoc.getPageIndices());

            // Add each copied page to the new PDF document
            copiedPages.forEach((page) => pdfDoc.addPage(page));
        } else {
            let r = await p.text();
            let err = document.getElementById(`statusMessage`);
            err.style.display = "block"; 
            err.innerText = r;
            setTimeout(() => {
                err.style.display = "none";        
            }, 3000);
        }
    }

    if (pdfDoc.getPageCount() > 0) {
        const mergedPdfBytes = await pdfDoc.save();
        const mergedBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(mergedBlob);

        // Create a link to open the merged PDF in a new tab
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download;
        document.body.appendChild(a);
        a.style.display = "none";
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

let btn = document.getElementById("sumbitBtn");
btn.addEventListener("click", () => {
    let zplText = document.getElementById("zplText").value;
    let code = zplText.split("^XZ");
    if (code.length > 0) {
        f(code);
    }
});
