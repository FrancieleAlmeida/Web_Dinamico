const dark = document.querySelector('.dark')
const ligth = document.querySelector('.ligth')
const qrContainer = document.querySelector('#qr-code')
const qrText = document.querySelector('.qr-text')
const sizes = document.querySelector('.sizes')
const share = document.querySelector('.share-btn')
const download = document.querySelector('.download-btn')


let colorLigth = '#fff',
    colorDark = '#000',
    text = 'www.ifms.edu.br',
    size = 300;


//eventos
dark.addEventListener('input', handleDarkColor)
ligth.addEventListener('input', handleLigthColor)
qrText.addEventListener('input', handleQRText)
sizes.addEventListener('change', handleSize)


//functions
function handleDarkColor(e){
    colorDark = e.target.value
    generateQRCode()
    //console.log(colorDark)

}

function handleLigthColor(e){
    colorLigth = e.target.value
    generateQRCode()
}

function handleQRText(e){
    text = e.target.value
    generateQRCode()
}

function handleSize(e){
    size = e.target.value
    generateQRCode()
}

async function generateQRCode(){
    qrContainer.innerHTML = ''

    new QRCode('qr-code',{
        text,
        height: size,
        width: size,
        colorLigth,
        colorDark,
    })

    download.href = await resolveDataUrl()
}

function resolveDataUrl(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img")
            if(img.currentSrc){
                resolve(img.currentSrc)
                return
            }
            const canvas = document.querySelector('canvas')
            resolve(canvas.toDataURL())
        }, 50)
    })
}

generateQRCode()