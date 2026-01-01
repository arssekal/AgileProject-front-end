import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/backlogs';

export const listEpics = (backlogId) => {
    return axios.get(`${API_BASE_URL}/${backlogId}/epics`);
}

export const listUserStories = (backlogId) => {
    return axios.get(`${API_BASE_URL}/${backlogId}/user-stories`);
}

export const createEpic = (backlogId, epic)  => {
    return axios.post(`${API_BASE_URL}/${backlogId}/epics`, epic);
}