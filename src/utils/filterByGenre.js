export default (items, currentGenre) =>
  items.filter(item => (currentGenre ? item.genre.name === currentGenre : item));
