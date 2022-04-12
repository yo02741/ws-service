const express = require("express");
const SocketServer = require("ws").Server;
const uuid = require('uuid');

const PORT = 3636;

const server = express().listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected !!");
  ws.id = uuid.v4();
  ws.send(`WELCOME, ${ws.id}`)

  //固定送最新時間給 Client
  // const sendNowTime = setInterval(()=>{
  //   ws.send(String(new Date()))
  // },1000)


  ws.on("message", (data) => {
    const clients = wss.clients;
    clients.forEach((client) => {
      client.send(data.toString())
    });
  });

  ws.on("close", () => {
    console.log("Close connected, Bye !");
    console.log("-----------------------");
  });
});