import api from "./client";

export const inviteMember = async (tripId, payload) =>
  (await api.post(`/api/trips/${tripId}/invitations`, payload)).data;
export const acceptInvitation = async (tripId, token) =>
  api.post(`/api/trips/${tripId}/invitations/accept`, null, { params: { token } });
export const rejectInvitation = async (tripId, token) =>
  api.post(`/api/trips/${tripId}/invitations/reject`, null, { params: { token } });

export const getItineraries = async (tripId) =>
  (await api.get(`/api/trips/${tripId}/itineraries`)).data;
export const createItinerary = async (tripId, payload) =>
  (await api.post(`/api/trips/${tripId}/itineraries`, payload)).data;
export const updateItinerary = async (tripId, itineraryId, payload) =>
  (await api.put(`/api/trips/${tripId}/itineraries/${itineraryId}`, payload)).data;
export const deleteItinerary = async (tripId, itineraryId) =>
  api.delete(`/api/trips/${tripId}/itineraries/${itineraryId}`);
export const createActivity = async (tripId, itineraryId, payload) =>
  (await api.post(`/api/trips/${tripId}/itineraries/${itineraryId}/activities`, payload)).data;
export const updateActivity = async (tripId, itineraryId, activityId, payload) =>
  (await api.put(`/api/trips/${tripId}/itineraries/${itineraryId}/activities/${activityId}`, payload)).data;
export const deleteActivity = async (tripId, itineraryId, activityId) =>
  api.delete(`/api/trips/${tripId}/itineraries/${itineraryId}/activities/${activityId}`);

export const getBalances = async (tripId) =>
  (await api.get(`/api/trips/${tripId}/balances`)).data;
export const createExpense = async (tripId, payload) =>
  api.post(`/api/trips/${tripId}/expenses`, payload);
export const createSettlement = async (tripId, payload) =>
  // The supplied controller currently maps this duplicated path.
  api.post(`/api/trips/${tripId}/settlements/settlements`, payload);

export const getDocuments = async (tripId) =>
  (await api.get(`/api/trips/${tripId}/documents`)).data;
export const uploadDocument = async (tripId, file) => {
  const form = new FormData();
  form.append("file", file);
  return (await api.post(`/api/trips/${tripId}/documents`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  })).data;
};
export const downloadDocument = async (tripId, documentId) =>
  api.get(`/api/trips/${tripId}/documents/${documentId}/download`, { responseType: "blob" });
export const deleteDocument = async (tripId, documentId) =>
  api.delete(`/api/trips/${tripId}/documents/${documentId}`);

export const getNotifications = async () => (await api.get("/api/notifications")).data;
export const markNotificationRead = async (notificationId) =>
  api.patch(`/api/notifications/${notificationId}/read`);

export const getAdminUsers = async () => (await api.get("/api/admin/users")).data;
export const getAdminUser = async (id) => (await api.get(`/api/admin/users/${id}`)).data;
export const updateAdminUser = async (id, payload) =>
  (await api.patch(`/api/admin/users/${id}`, payload)).data;
export const updateAdminUserStatus = async (id, status) =>
  (await api.patch(`/api/admin/users/${id}/status`, { status })).data;
export const resetAdminPassword = async (id, newPassword) =>
  api.patch(`/api/admin/users/${id}/reset-password`, { newPassword });
export const deleteAdminUser = async (id) => api.delete(`/api/admin/users/${id}`);
