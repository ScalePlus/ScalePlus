import Cookies from "universal-cookie";
import { Constants } from "./constant";
let domainUrl = Constants.BASE_URL;

const cookies = new Cookies();

export default {
  GET: (link) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      let url = domainUrl + link;

      if (cookies.get("unique_id")) {
        url = url + `?unique_id=${cookies.get("unique_id")}`;
      }

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
      let url = domainUrl + link;

      if (cookies.get("unique_id")) {
        url = url + `?unique_id=${cookies.get("unique_id")}`;
      }

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
      let url = domainUrl + link;

      if (cookies.get("unique_id")) {
        url = url + `?unique_id=${cookies.get("unique_id")}`;
      }

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

  FILE_UPLOAD: (link, data, fileKey, method) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      let url = domainUrl + link;

      if (cookies.get("unique_id")) {
        url = url + `?unique_id=${cookies.get("unique_id")}`;
      }

      let formData = new FormData();
      let file = data[fileKey];
      delete data[fileKey];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }

      formData.append("file", file);

      fetch(url, {
        body: formData,
        method: method,
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
