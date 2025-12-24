import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/backlogs';

export const listEpics = (id) => {
    return axios.get(`${API_BASE_URL}/${id}/epics`);
}

export const listUserStories = (id) => {
    return axios.get(`${API_BASE_URL}/${id}/user-stories`);
}

export const createEpic = (backlogId, epic)  => {
    return axios.post(`${API_BASE_URL}/${backlogId}/epics`, epic);
}