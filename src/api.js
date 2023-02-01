const getApi = (url) => {
  return fetch(url).then((response) => response.json());
};

export const getCategoriesApi = () => {
  return getApi(
    "https://cms.crocobet.com/integrations/v2/slot/categories?include=games"
  ).then(({ data }) => {
    return data.filter((item) => item.platform === "desktop");
  });
};

export const getProvidersApi = () => {
  return getApi(
    `https://cms.crocobet.com/integrations?type=slot&platform=desktop`
  ).then(({ data }) => {
    return data;
  });
};

export const getProviderGamesApi = (provider) => {
  return getApi(
    `https://cms.crocobet.com/integrations/v2/slot/providers/${provider}?platform=desktop`
  ).then(({ data }) => {
    return data.games;
  });
};
