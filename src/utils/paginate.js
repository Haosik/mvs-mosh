import _ from 'lodash';

export const paginate = (items, currentPage, perPage) => {
  const startIndex = (currentPage - 1) * perPage;
  //   const newItems = [...items].splice(startIndex, perPage);
  //   return newItems;
  return _(items)
    .slice(startIndex)
    .take(perPage)
    .value();
};
