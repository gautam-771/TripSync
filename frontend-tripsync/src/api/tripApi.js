import api from "./client";

export const getMyTrips = async () => (await api.get("/api/trips")).data;
export const getTrip = async (tripId) => (await api.get(`/api/trips/${tripId}`)).data;
export const createTrip = async (payload) => (await api.post("/api/trips", payload)).data;
export const updateTrip = async (tripId, payload) => (await api.patch(`/api/trips/${tripId}`, payload)).data;
export const deleteTrip = async (tripId) => api.delete(`/api/trips/${tripId}`);
export const getTripMembers = async (tripId) => (await api.get(`/api/trips/${tripId}/members`)).data;
export const updateMemberRole = async (tripId, userId, role) =>
  api.patch(`/api/trips/${tripId}/members/${userId}/role`, { role });
export const removeMember = async (tripId, userId) =>
  api.delete(`/api/trips/${tripId}/members/${userId}`);
