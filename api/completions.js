const axios = require("axios");
const fs = require("fs");

class ChatCompletions {
    constructor(key,systemPrompt = "") {
        this.apiKey = key;
        this.history = [];
        
        if(systemPrompt) {
            this.history.push({
                role: "system",
                content: systemPrompt
            });
        }
    }

    async send(message,options = {}) {
        const messagePart = {
            role: "user",
            content: message
        }

        this.history.push(messagePart);
        
        const config = {
            model: 'openai',
            messages: this.history,
            temperature: 0.7
        };

        // try {
            const response = await axios.post('https://gen.pollinations.ai/v1/chat/completions', Object.assign(config,options), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            this.history.push(response.data.choices[0].message);
            return response.data.choices[0].message.content;
        // } catch (error) {
        //     throw new Error('Error:', error);
        // }
    }
}

module.exports = ChatCompletions;