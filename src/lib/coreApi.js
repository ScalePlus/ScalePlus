import { Constants } from "./constant";
let domainUrl = Constants.BASE_URL;

export default {
  GET: (link) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const url = domainUrl + link;

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: token ? `jwt ${token}` : "",
          "Cache-Control": "no-cache",
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            localStorage.clear();
          }
          return response.json();
        })
        .then((responseText) => {
          resolve(responseText);
        })
        .catch((error) => {
          reject(error);
        });
    }),

  POST: (link, data) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const url = domainUrl + link;
      fetch(url, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          Authorization: token ? `jwt ${token}` : "",
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            localStorage.clear();
          }
          return response.json();
        })
        .then((responseText) => {
          resolve(responseText);
        })
        .catch((error) => {
          reject(error);
        });
    }),

  PUT: (link, data) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const url = domainUrl + link;
      fetch(url, {
        body: JSON.stringify(data),
        method: "PUT",
        headers: {
          Authorization: token ? `jwt ${token}` : "",
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            localStorage.clear();
          }
          return response.json();
        })
        .then((responseText) => {
          resolve(responseText);
        })
        .catch((error) => {
          reject(error);
        });
    }),

  FILE_UPLOAD: (link, data, file) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      const url = domainUrl + link;
      let formData = new FormData();
      delete data["logo"];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }

      formData.append("file", file);

      fetch(url, {
        body: formData,
        method: "PUT",
        headers: {
          Authorization: token ? `jwt ${token}` : "",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            localStorage.clear();
          }
          return response.json();
        })
        .then((responseText) => {
          resolve(responseText);
        })
        .catch((error) => {
          reject(error);
        });
    }),
};
