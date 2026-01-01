import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/epics';

export const getEpicDetails = (id) => {
    return axios.get(`${API_BASE_URL}/${id}`);
}
export const listEpicUserStories = (id) => {
    return axios.get(`${API_BASE_URL}/${id}/user-stories`);
}

export const createUserStroy = (userStory) => {
    return axios.post(`${API_BASE_URL}/${userStory.epicId}/user-stories`, userStory);
}

