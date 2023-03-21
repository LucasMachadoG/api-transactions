import express from "express";
import { userRoutes } from "./routes/user.routes";

const app = express ()

//Criando configuracao para o express aceitar requisicoes com json no body
app.use(express.json())

app.use ("/user", userRoutes())

app.listen (3333, () => {
    console.log ("API esta rodando...")
})