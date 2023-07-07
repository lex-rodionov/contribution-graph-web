import axios from 'axios';

const api = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  config => {
    return config.data;
  }
);

export async function getContributionList() {
  try {
    return api.get('https://dpg.gg/test/calendar.json');
  } catch (error) {
    return [];
  }
}