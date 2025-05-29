import axios from 'axios';

export const checkDomainAvailability = async (domain) => {
  const res = await axios.get(
    `https://interview-task-green.vercel.app/task/domains/check/${domain}.expressitbd.com`
  );
  return res.data;
};

export const createStore = async (storeData) => {
  const res = await axios.post(
    'https://interview-task-green.vercel.app/task/stores/create',
    storeData
  );
  return res.data;
};