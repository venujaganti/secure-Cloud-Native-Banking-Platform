import api from "./api";

const notificationService = {
  getNotifications() {
    return api.get("/notifications");
  },

  markAsRead(notificationId) {
    return api.put(
      `/notifications/${notificationId}/read`
    );
  },

  markAllAsRead() {
    return api.put("/notifications/read-all");
  }
};

export default notificationService;