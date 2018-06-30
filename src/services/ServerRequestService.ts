const getData = (url: string) => {
  return fetch(url).then(res => res.json());
};

const postData = <T>(url: string, data: T) => {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'post'
  })
    .then(res => res.json())
    .catch();
};

export default { getData, postData };
