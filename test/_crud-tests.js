// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const getRequest = require(`@google-cloud/nodejs-repo-tools`).getRequest;
const test = require(`ava`);

module.exports = (DATA_BACKEND) => {
  let originalDataBackend, id, testConfig, appConfig;

  test.before(() => {
    testConfig = require(`./_test-config`);
    appConfig = require(`../config`);
    originalDataBackend = appConfig.get(`DATA_BACKEND`);
    appConfig.set(`DATA_BACKEND`, DATA_BACKEND);
  });

  // setup a book
  test.serial.cb(`should create a person`, (t) => {
    getRequest(testConfig)
      .post(`/api/persons`)
      .send({ title: `my person` })
      .expect(200)
      .expect((response) => {
        id = response.body.id;
        t.truthy(response.body.id);
        t.is(response.body.title, `my person`);
      })
      .end(t.end);
  });

  test.serial.cb(`should show a list of persons`, (t) => {
    // Give Datastore time to become consistent
    setTimeout(() => {
      const expected = /<div class="media-body">/;
      getRequest(testConfig)
        .get(`/persons`)
        .expect(200)
        .expect((response) => {
          t.regex(response.text, expected);
        })
        .end(t.end);
    }, 2000);
  });

  test.serial.cb(`should handle error`, (t) => {
    getRequest(testConfig)
      .get(`/persons`)
      .query({ pageToken: `badrequest` })
      .expect(500)
      .end(t.end);
  });

  // delete the book
  test.serial.cb((t) => {
    if (id) {
      getRequest(testConfig)
        .delete(`/api/persons/${id}`)
        .expect(200)
        .end(t.end);
    } else {
      t.end();
    }
  });

  test.serial.cb(`should post to add person form`, (t) => {
    const expected = /Redirecting to \/persons\//;
    getRequest(testConfig)
      .post(`/persons/add`)
      .send(`title=my%20person`)
      .expect(302)
      .expect((response) => {
        const location = response.headers.location;
        const idPart = location.replace(`/persons/`, ``);
        if (DATA_BACKEND !== `mongodb`) {
          id = parseInt(idPart, 10);
        } else {
          id = idPart;
        }
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should show add person form`, (t) => {
    const expected = /Add person/;
    getRequest(testConfig)
      .get(`/persons/add`)
      .expect(200)
      .expect((response) => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  // delete the book
  test.serial.cb((t) => {
    if (id) {
      getRequest(testConfig)
        .delete(`/api/persons/${id}`)
        .expect(200)
        .end(t.end);
    } else {
      t.end();
    }
  });

  // setup a book
  test.serial.cb((t) => {
    getRequest(testConfig)
      .post(`/api/persons`)
      .send({ title: `my person` })
      .expect(200)
      .expect((response) => {
        id = response.body.id;
        t.truthy(response.body.id);
        t.is(response.body.title, `my person`);
      })
      .end(t.end);
  });

  test.serial.cb(`should update a person`, (t) => {
    const expected = new RegExp(`Redirecting to /persons/${id}`);
    getRequest(testConfig)
      .post(`/persons/${id}/edit`)
      .send(`title=my%20other%20persons`)
      .expect(302)
      .expect((response) => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should show edit person form`, (t) => {
    const expected =
      /<input class="form-control" type="text" name="title" id="title" value="my other person">/;
    getRequest(testConfig)
      .get(`/persons/${id}/edit`)
      .expect(200)
      .expect((response) => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should show a person`, (t) => {
    const expected = /<h4>my other person&nbsp;<small><\/small><\/h4>/;
    getRequest(testConfig)
      .get(`/persons/${id}`)
      .expect(200)
      .expect((response) => {
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  test.serial.cb(`should delete a person`, (t) => {
    const expected = /Redirecting to \/persons/;
    getRequest(testConfig)
      .get(`/persons/${id}/delete`)
      .expect(302)
      .expect((response) => {
        id = undefined;
        t.regex(response.text, expected);
      })
      .end(t.end);
  });

  // clean up
  test.always.after.cb((t) => {
    appConfig.set(`DATA_BACKEND`, originalDataBackend);

    if (id) {
      getRequest(testConfig)
        .delete(`/api/persons/${id}`)
        .expect(200)
        .end(t.end);
    } else {
      t.end();
    }
  });
};
