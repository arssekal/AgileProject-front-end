import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/sprints';

export const getSprint = (sprintId) => {
    return axios.get(BASE_URL + `/${sprintId}`)
}
export const sprintUserStories = (sprintId) => {
    return axios.get(BASE_URL + `/${sprintId}/user-stories`)
}