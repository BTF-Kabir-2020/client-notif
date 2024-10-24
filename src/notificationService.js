// export function registerNotification(title, options) {
//     // چک کردن پشتیبانی از نوتیفیکیشن‌ها
//     if ('Notification' in window) {
//         // اگر دسترسی قبلاً داده شده باشد
//         if (Notification.permission === "granted") {
//             new Notification(title, options);
//         } 
//         // اگر دسترسی قبلاً رد نشده باشد، درخواست دسترسی
//         else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then(permission => {
//                 if (permission === "granted") {
//                     new Notification(title, options);
//                 }
//             });
//         }
//     } 
//     // اگر مرورگر از نوتیفیکیشن پشتیبانی نمی‌کند (این حالت شامل برخی مرورگرهای iOS قدیمی است)
//     else {
//         console.log("مرورگر شما از نوتیفیکیشن‌ها پشتیبانی نمی‌کند.");
//     }
// }


// export function requestNotificationPermission() {
//     if ('Notification' in window && 'serviceWorker' in navigator) {
//         Notification.requestPermission().then(permission => {
//             if (permission === 'granted') {
//                 console.log('Notification permission granted.');
//             } else {
//                 console.log('Notification permission denied.');
//             }
//         });
//     } else {
//         console.log('Your browser does not support notifications.');
//     }
// }

export function requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    } else {
        console.log('Your browser does not support notifications or service workers.');
    }
}


export function sendNotification(title, options) {
    navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, options);
    });
}


export function registerNotification() {
    if (!('Notification' in window)) {
        console.error('Notifications are not supported in this browser.');
        alert('Notifications are not supported in this browser.');
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('Hello World!', {
                    body: 'This is a test notification.',
                    icon: '/icon.png',
                    badge: '/badge.png'
                }).then(() => {
                    console.log('Notification displayed successfully.');
                }).catch((error) => {
                    console.error('Notification failed:', error);
                    alert(`Notification error: ${error.message}`);
                });
            });
        } else {
            console.warn('Notification permission denied.');
            alert('Notification permission was denied.');
        }
    }).catch(error => {
        console.error('Failed to request notification permission:', error);
        alert(`Failed to request notification permission: ${error.message}`);
    });
}
