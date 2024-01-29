const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};
https://fwtj5c-3005.csb.app/send-notification
const saveSubscription = async (subscription) => {
  const response = await fetch("http://localhost:3005/save-subscription", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(subscription),
  });

  return response.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BEc2zG6CoCTTgT-Mv0YgzX6TSjG5RsX-L2P6TlXob4_lTzVn1WOUBS4c0vvYLsBrpG1IhURlAydHdQSkhk9cUH8"
    ),
  });

  const response = await saveSubscription(subscription);
  console.log(response);
});

self.addEventListener("push", (e) => {
  console.log(e.data.text());
  self.registration.showNotification(
    "Wohoo! Somayeh  silent false  app mobile! Somayeh!",
    {
      body: "Somayeh hi show notification", //e.data.text(),
      sound: "H42VWCD-notification.mp3",
      silent: false,
    }
  );
});
// registration.showNotification('New Message', {
//   body: 'You have a new message',
//   icon: 'icon.png',
//   sound: 'notification_sound.mp3'
// });
