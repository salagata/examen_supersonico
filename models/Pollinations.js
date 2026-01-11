require("dotenv").config();
const Pollinations = require("../api/index");

const systemPrompt = 'Eres una IA que hace examenes, de entrada, recibes el temario de un examen seguido de algunas configuraciones para el examen, de salida devuelves un array json con la información del examen.'

const pol = Pollinations(process.env.API);
const exam = pol.initChat();

// TODO: Modelo para iniciar el chat completions, generar y calificar examen desde chat completions.