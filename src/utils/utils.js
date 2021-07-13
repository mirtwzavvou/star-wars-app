export const formatMovieList = ({ movieListData = [] } = {}) => {
  return movieListData.map(
    ({
      // eslint-disable-next-line camelcase
      fields: { title = '', release_date = '', episode_id = 0, director = '', opening_crawl = '' },
      id = -1,
    } = {}) => {
      return {
        id,
        title,
        releaseDate: release_date,
        episodeId: episode_id,
        director,
        description: opening_crawl,
      };
    }
  );
};

export const getReleaseYear = (releaseDate) => parseInt(releaseDate.slice(0, 4), 10);
