const ChatCompletions = require("../api/completions");
const Pollinations = require("../api/index");
const examSchema = require("../utils/exam.schema.json");

const systemPrompt = 'Eres una IA que hace examenes, de entrada, recibes el temario de un examen seguido de algunas configuraciones para el examen, de salida devuelves un array json con la información del examen.'


/**
 * Creates a new Chat Completions with Pollinations API
 *
 * @returns {ChatCompletions} 
 */
function createChat() {try {
        
        const pol = new Pollinations(process.env.API);
        const teacher = pol.initChat();
    
        return teacher;
} catch (error) {
    console.log(error)
}
}


/**
 * Generates an exam using Chat Completions
 *
 * @param {ChatCompletions} teacher Chat Completions
 * @param {string} topic The Topic of the Exam
 * @param {string} [config=""] Additional Configuration for the exam
 * 
 * @returns {{}}
 */
async function createExam(teacher, topic, config = "") {
    let prompt = "";
    if(config) {
        prompt += `Consideraciones al momento de hacer el examen: ${config}`; 
    }
    prompt += `Temario: ${topic}`;
    
    const exam = await teacher.send(prompt,{
        response_format: {
            type: "json_schema",
            json_schema: {
                "name": "exam_structure",
                strict: true,
                schema: examSchema
            }
        }
    });

    return JSON.parse(exam);
}

// TODO: Calificar examen desde chat completions.

module.exports = {createChat, createExam}