
function generateExam(response) {
    var exam = document.getElementById('exam');
    document.getElementById('response-raw').textContent = `req: unknown
    
    res:${JSON.stringify(response)}
    ----`;
    for (let id = 0; id < response.length; id++) {
        const field = response[id];
        const li = document.createElement('li');
        // checha el tipo de pregunta
        switch(field.type) {
            case "D": {
                // crea el enunciado
                const h2 = document.createElement('h2');
                h2.textContent = field.name;
                li.appendChild(h2);
                // crea las preguntas
                const ol = document.createElement('ol');
                let i3 = 0
                for (const questions of field.questions) {
                    // crea el titulo de la pregunta
                    var li2 = document.createElement('li');
                    var h3 = document.createElement('h3');
                    h3.textContent = questions.question;
                    // crea el textarea para la respuesta
                    const textarea = document.createElement('textarea');
                    textarea.setAttribute('id', String(id)+"d"+ String(i3));
                    textarea.setAttribute('rows', "5");
                    textarea.setAttribute('cols', "50");
                    // añade los elementos al elemento de lista
                    li2.appendChild(h3);
                    li2.appendChild(textarea);
                    ol.appendChild(li2);
                    i3++
                }
                li.appendChild(ol);
                break;
            }
            case "C": {
                // crea el enunciado
                const h2 = document.createElement('h2');
                h2.textContent = field.name;
                li.appendChild(h2);
                // crea las preguntas
                var ol = document.createElement('ol');
                let i3 = 0
                for (const questions of field.questions) {
                    // crea el titulo de la pregunta
                    var li2 = document.createElement('li');
                    var h3 = document.createElement('h3');
                    // crea los espacios para rellenar
                    const size = questions.answer
                    let i4 = 0
                    h3.innerHTML = questions.question
                        .replaceAll(/\[\_+\]/g, x => {
                            let r = `<input type="text" size="${size[i4].length}" id=${String(id)+"c"+ String(i3)+"c"+ String(i4)}>`;
                            i4++
                            return r
                        });
                    // añade los elementos al elemento de lista
                    li2.appendChild(h3);
                    ol.appendChild(li2);
                    i3++
                }
                li.appendChild(ol);
                break;
            }
            case "T": {
                const h2 = document.createElement('h2');
                h2.textContent = field.name;
                li.appendChild(h2);
                const ol = document.createElement('ol');
                let i3 = 0
                for (const que of field.questions) {
                    const li2 = document.createElement('li');
                    const h3 = document.createElement('h3');
                    h3.textContent = que.question;
                    li2.appendChild(h3);
                    let i4 = 0; 
                    for (const option of que.options) {
                        var li3 = document.createElement('li');
                        var input = document.createElement('input');
                        input.setAttribute('type', 'radio');
                        input.setAttribute('value', String(i4));
                        input.setAttribute('name', id+"t"+String(i3));
                        input.setAttribute('id', String(id)+"t"+ String(i3)+"o"+ String(i4));
                        li3.appendChild(input);
                        li3.innerHTML += option;
                        li2.appendChild(li3);
                        i4++
                    }
                    ol.appendChild(li2);
                    i3++
                }
                li.appendChild(ol);
                break;
            }
            case "B": {
                const h2 = document.createElement('h2');
                h2.textContent = field.name;
                li.appendChild(h2);
                const ol = document.createElement('ol');
                let i3 = 0
                for (const que of field.questions) {
                    const li2 = document.createElement('li');
                    const h3 = document.createElement('h3');
                    h3.textContent = que.question;
                    const choice = document.createElement('select');

                    const trueOp = document.createElement("option");
                    const falseOp = document.createElement("option");
                    const noop = document.createElement("option");

                    noop.value = "noop"
                    trueOp.value = true
                    falseOp.value = false
                    noop.selected = true
                    trueOp.textContent = true
                    falseOp.textContent = false
                    
                    choice.appendChild(noop)
                    choice.appendChild(trueOp)
                    choice.appendChild(falseOp)
                    choice.setAttribute('id', String(id)+"b"+ String(i3));
                    choice.setAttribute('name', id+"b"+String(i3));
                    choice.setAttribute('value', "noop");

                    li2.appendChild(h3);
                    li2.appendChild(choice);
                    ol.appendChild(li2);
                    i3++
                }
                li.appendChild(ol);
                break;
            }
        }
        exam.appendChild(li);
    }
    const submit = document.createElement('button');
    submit.setAttribute('id', 'submit');
    submit.setAttribute('type', 'submit');
    submit.onclick = (e) => {
        
    }

    exam.appendChild(submit);
}
function renderExam(exam) {
    if(exam.constructor.name == "Array") {
        generateExam(exam)
    } else {
        generateExam([exam])
    }
}

const btn = document.getElementById('submit');

btn.addEventListener('click', (e) => {
    btn.textContent = "Generando..."
    btn.disabled = "disabled"
            
    var questions = document.getElementById('questions').value;
    var extras = document.getElementById('extras').value;
    var data = {
        topic: questions,
        config: extras
    };
    if(document.getElementById("no-ai").checked) {
        const jsonExam = document.getElementById("json").value;
        renderExam(JSON.parse(jsonExam).fields);
    } else {
        fetch("/api/v1/exam", {
            "method": "POST",
            "body": JSON.stringify(data)
        }).then(x => x.json())
            .then(res => {
                renderExam(res.fields)
            })
//         var xhr = new XMLHttpRequest();
//         request = query(data)
//         xhr.open('POST', "proxy.php", true);

//         xhr.onreadystatechange = () => {
// try {
//                 if (xhr.readyState == 4 && xhr.status == 200) {
//                     const jsonExam = extractJSON(xhr.responseText);
//                     var response = JSON.parse(jsonExam);
//                     renderExam(response)
//                 }
// } catch (e) {
//                     console.log(extractJSON(xhr.responseText))
    
//     document.getElementById('response-raw').textContent = `Error: ${e}
    
//     req:${xhr.responseText}`;
// }
//         }
        
//         xhr.send(JSON.stringify({
//             'messages': [
//                 {'role': 'user', 'content': request.prompt}, 
//                 {'role': 'user', 'content': request.temario}
//             ], 
//             'model': 'ModelsLab/deepseek-coder-6.7b-instruct', 
//             'stream': false}))
    }
});