import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/projects';

export const listProjects = () => {
    return axios.get(API_BASE_URL);
}

export const lastThreeProjects = () => {
    return axios.get(API_BASE_URL+ "/last-three");
}

export const getProject = (id) => {
    return axios.get(API_BASE_URL + "/" + id);
}

export const listProjectSprints = (projectId) => {
    return axios.get(API_BASE_URL + `/${projectId}/sprints`);
}
