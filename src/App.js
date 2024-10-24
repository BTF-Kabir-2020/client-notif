import logo from './logo.svg';
import './App.css';
// import { registerNotification } from './notificationService'; // فرض کنید نام فایل notificationService.js است
import React, { useEffect } from 'react';
import swDev from './swDev';
import { registerNotification, requestNotificationPermission, sendNotification } from './notificationService';

function App() {



  // if ('Notification' in window) {
  //   if (Notification.permission === "granted") {
  //     console.log(Notification.permission);
  //   }
  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(permission => {
  //       console.log(Notification.permission);
  //     });
  //   }
  // } else {
  //   console.log("مرورگر شما از نوتیفیکیشن‌ها پشتیبانی نمی‌کند.");
  // }

  // if ('Notification' in window && 'serviceWorker' in navigator) {
  //   Notification.requestPermission().then(permission => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //     }
  //   });
  // }

  // const handleNotification = () => {
  //   // فراخوانی تابع نوتیفیکیشن
  //   registerNotification("سلام!", {
  //     body: "این یک نوتیفیکیشن تست است.",
  //     icon: "/path-to-icon.png"  // آیکن نوتیفیکیشن (اختیاری)
  //   });
  // };

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  });




  useEffect(() => {
    // ثبت سرویس‌ورکر
    swDev();

    // درخواست دسترسی به نوتیفیکیشن‌ها
    requestNotificationPermission();
  }, []);

  const handleNotification = () => {
    // ارسال نوتیفیکیشن دستی
    sendNotification('Hello!', {
      body: 'This is a test notification',
      // icon: '/path/to/icon.png'
    });
  };




  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ارسال نوتیفیکیشن</h1>
        <button onClick={handleNotification}>نوتیفیکیشن بده</button>
        <button onClick={registerNotification}>Send Notification</button>
        <h1>ارسال نوتیفیکیشن</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
