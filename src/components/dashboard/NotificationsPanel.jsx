import { useEffect, useState } from "react";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/config";

function NotificationsPanel() {
  const [notifications, setNotifications] = useState([]);

  // Real-Time Listener
  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData = snapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

      setNotifications(notificationData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id="notifications" className="bg-white mt-8 p-6 rounded-2xl shadow-md">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">Live Notifications</h2>

      {/* LIST */}
      <div className="mt-6 space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="border-l-4 border-green-600 bg-gray-50 p-4 rounded-lg"
            >
              <h3 className="font-bold text-green-700">{notification.title}</h3>

              <p className="mt-1 text-gray-600">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;
