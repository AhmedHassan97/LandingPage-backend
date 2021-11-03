const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const api = supertest(app);
var rug = require("random-username-generator");
var new_username = rug.generate();

test("Login Sucessfully", async () => {
  const body = {
    query: `query{
          login(userName:"ahmed.hassan972@eng-st.cu.edu.eg",password:"1234567"){
          userId
          }
        }`,
  };
  const response = await api.post(`/graphql`).send(body).expect(200);
  console.log(JSON.parse(response.text));
}, 10000);

test("Login UnSucessfully (incorrectpassword)", async () => {
  const body = {
    query: `query{
            login(userName:"ahmed.hassan972@eng-st.cu.edu.eg",password:"12345678"){
            userId
            }
          }`,
  };
  const response = await api.post(`/graphql`).send(body).expect(500);
  expect(response.body.errors[0].message).toBe("Password is incorrect!");
}, 10000);

test("Login UnSucessfully (incorrectUsername)", async () => {
  const body = {
    query: `query{
              login(userName:"ahmed.hassanssdasdasdasd972@eng-st.cu.edu.eg",password:"12345678"){
              userId
              }
            }`,
  };
  const response = await api.post(`/graphql`).send(body).expect(500);
  expect(response.body.errors[0].message).toBe("User does not exist!");
}, 10000);

test("Signup UnSucessfully (incorrectUsername)", async () => {
  const body = {
    query: `mutation{
        createUser(userInput:{userName:"ahmed.hassan972@eng-st.cu.edu.eg",password:"12345678"}){
            userName
            password
                }
              }`,
  };
  const response = await api.post(`/graphql`).send(body).expect(200);
  expect(response.body.errors[0].message).toBe("User exists already.");
}, 10000);

test("Signup Sucessfully ", async () => {
  const body = {
    query: `mutation{
        createUser(userInput:{userName:"${new_username}",password:"${123456789}"}){
          userName
          password
        }
      }`,
  };
  const response = await api.post(`/graphql`).send(body).expect(200);
}, 10000);
