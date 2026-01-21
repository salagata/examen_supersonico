const express = require("express");
const { createChat, createExam } = require("../models/Exam");

const newExam = async (req,res) => {
    const {topic, config} = Object.assign(req.body,{ config: "" });
    
    const teacher = createChat();
    res.setHeader("Content-Type","application/json")
    try {
        const exam = await createExam(teacher,topic, config);
        res.status(200).send(JSON.stringify({
            "failed":false,
            "prompt": {
                "topic": topic,
                "config": config
            },
            "response": exam
        }));
    } catch (error) {
        res.status(500).send(JSON.stringify({
            "failed":true,
            "prompt": {
                "topic": topic,
                "config": config
            },
            "error": error
        }))
    }
}

module.exports = { newExam };
// TODO: Calificar el examen