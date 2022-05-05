import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getRootCategories = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/categories/roots`);

    // TODO: throw custom data integrity error in case of unexpected type
    return response.data?.items ?? [];
  } catch (e) {
    console.error(e);
  }
};

export const getSubcategories = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/categories/subcategories`);

    // TODO: throw custom data integrity error in case of unexpected type
    return (response.data?.items ?? [])
      .filter(category => Boolean(category?.parent?.id))
      .reduce((result, { parent: { id: parent }, ...category }) => {
        if (!result[parent]) {
          result[parent] = [];
        }
        result[parent].push({ ...category, parent });

        return result;
      }, {});
  } catch (e) {
    console.error(e);
  }
};
