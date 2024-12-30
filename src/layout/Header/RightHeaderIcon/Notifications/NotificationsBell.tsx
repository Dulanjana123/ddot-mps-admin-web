import { createSignalRService } from "@services/shared/signalR-service";
import React, { useEffect, useState } from "react";
import { Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useMsal } from "@azure/msal-react";

const NotificationsBell = () => {
  const [notifications, setNotifications] = useState<{ type: string; title: string; body: string; read: boolean }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { accounts } = useMsal();
  const email = accounts[0]?.username;

  useEffect(() => {
    if (!email) {
      console.error("User email is required for establishing SignalR connection.");
      return;
    }

    const signalRService = createSignalRService(email);

    const handleReceiveNotification = (type: string, title: string, body: string) => {
      setNotifications((prevNotifications) => [{ type, title, body, read: false }, ...prevNotifications]);
      setUnreadCount((count) => count + 1);
    };

    signalRService.onReceiveNotification(handleReceiveNotification);

    return () => {
      signalRService.offReceiveNotification(handleReceiveNotification);
      signalRService.stopConnection();
    };
  }, [email]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const markAsRead = (index: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif, idx) => (idx === index ? { ...notif, read: true } : notif))
    );
    setUnreadCount((count) => count - 1);
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
    setNotifications((prevNotifications) => prevNotifications.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <div className="notification-bell">
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle className="icon-button">
          <i className="fa fa-bell"></i> {/* Font-awesome bell icon */}
          {unreadCount > 0 && (
            <Badge color="danger" pill>
              {unreadCount}
            </Badge>
          )}
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem header>Notifications</DropdownItem>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <DropdownItem
                key={index}
                onClick={() => markAsRead(index)}
                className={notification.read ? "notification-read" : "notification-unread"}
              >
                <div className="notification-content">
                  <span className="notification-type">{notification.type}</span>
                  <strong className="notification-title">{notification.title}</strong>
                  <p className="notification-body">{notification.body}</p>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>No new notifications</DropdownItem>
          )}
          <DropdownItem divider />
          {notifications.length > 0 && (
            <DropdownItem onClick={markAllAsRead}>Mark all as read</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NotificationsBell;
