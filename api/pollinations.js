const ChatCompletions = require("./completions");

class PollinationsSession {
    constructor(key) {
        this.apiKey = key;
    }

    initChat(systemPrompt = "") {
        return new ChatCompletions(this.apiKey,systemPrompt)
    }
}

module.exports = PollinationsSession;