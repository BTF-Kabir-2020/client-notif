// export default function swDev() {
//     let swUrl = `${process.env.PUBLIC_URL}/sw.js`
//     navigator.serviceWorker.register(swUrl).then((res) => {
//         console.warn(res)
//     }).catch((err) => {
//         console.error(err)
//     })
// }



// export default function swDev() {
//     // آدرس سرویس‌ورکر
//     let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

//     // ثبت سرویس‌ورکر
//     navigator.serviceWorker.register(swUrl).then((res) => {
//         console.warn('Service Worker registered:', res);
//     }).catch((err) => {
//         console.error('Service Worker registration failed:', err);
//     });
// }




// export default function swDev() {
//     if ('serviceWorker' in navigator) {
//         let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
//         navigator.serviceWorker.register(swUrl).then((res) => {
//             console.warn('Service Worker registered:', res);
//         }).catch((err) => {
//             console.error('Service Worker registration failed:', err);
//         });
//     } else {
//         console.warn('Service Worker is not supported in this browser.');
//     }
// }





export default function swDev() {
    if ('serviceWorker' in navigator) {
        let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

        navigator.serviceWorker.register(swUrl)
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
                alert(`Service Worker registration failed: ${error.message}`);
            });
    } else {
        console.error('Service Worker is not supported in this browser.');
        alert('Service Worker is not supported in this browser.');
    }
}
