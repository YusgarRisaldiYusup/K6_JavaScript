import { check, group } from "k6";
import http from "k6/http";

// Import third-party reporter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export default function () {
  // Group GET request
  group("GET User", function () {
    // Inisialisasi URL untuk permintaan GET
    let Url_Get = "https://reqres.in/api/users?page=2";

    // Melakukan permintaan GET ke URL
    let response_get = http.get(Url_Get);

    // Pemeriksaan Assertion: Memastikan status respons adalah 200 OK
    check(response_get, {
      "is status 200": (r) => r.status === 200,
    });
  });

  // Group POST request
  group("POST new user", function () {
    // Inisialisasi URL untuk permintaan POST
    let Url_Post = "https://reqres.in/api/users";

    // Inisialisasi Payload Body untuk permintaan POST
    let Body = JSON.stringify({
      name: "morpheus",
      job: "leader",
    });

    // Melakukan permintaan POST ke URL dengan Payload Body
    let response_post = http.post(Url_Post, Body);

    // Pemeriksaan Assertion: Memastikan status respons adalah 201 Created
    check(response_post, {
      "is status 201": (r) => r.status === 201,
    });

    // Sub-group untuk scenario POST yang berbeda
    group("POST new user - Scenario 2", function () {
      // Mengubah Payload Body untuk skenario kedua
      let Body = JSON.stringify({
        name: "neo",
        job: "developer",
      });

      // Melakukan permintaan POST ke URL dengan Payload Body yang baru
      let response_post = http.post(Url_Post, Body);

      // Pemeriksaan Assertion: Memastikan status respons adalah 201 Created
      check(response_post, {
        "is status 201": (r) => r.status === 201,
      });
    });
  });
}

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
