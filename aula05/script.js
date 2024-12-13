// Carregar tarefas salvas ao abrir a página
document.addEventListener("DOMContentLoaded", carregarTarefas);

// Adicionar uma nova tarefa
function addElemento() {
    const input = document.getElementById("tarefa");
    const tarefa = input.value.trim();

    if (tarefa === "") {
        alert("Você precisa descrever a tarefa!");
        return;
    }

    criarTarefa(tarefa);
    salvarTarefa(tarefa);
    input.value = "";
}

// Criar o elemento de tarefa
function criarTarefa(tarefa, isChecked = false) {
    const ul = document.getElementById("itemLista");

    const li = document.createElement("li");
    if (isChecked) li.classList.add("checked");

    const textNode = document.createTextNode(tarefa);
    li.appendChild(textNode);

    const closeBtn = document.createElement("button");
    closeBtn.className = "close";
    closeBtn.textContent = "X";
    closeBtn.onclick = function () {
        li.remove();
        removerTarefa(tarefa);
    };

    li.appendChild(closeBtn);

    li.onclick = function () {
        li.classList.toggle("checked");
        atualizarStatusTarefa(tarefa, li.classList.contains("checked"));
    };

    ul.appendChild(li);
}

// Salvar tarefas no localStorage
function salvarTarefa(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push({ descricao: tarefa, concluida: false });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Remover tarefa do localStorage
function removerTarefa(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefasAtualizadas = tarefas.filter((item) => item.descricao !== tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));
}

// Atualizar o status de uma tarefa no localStorage
function atualizarStatusTarefa(tarefa, concluida) {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const index = tarefas.findIndex((item) => item.descricao === tarefa);
    if (index !== -1) {
        tarefas[index].concluida = concluida;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
}

// Carregar tarefas do localStorage
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach((tarefa) => criarTarefa(tarefa.descricao, tarefa.concluida));
}
