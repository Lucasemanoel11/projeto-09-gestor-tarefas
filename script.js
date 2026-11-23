let tarefas = [
  { id: 1, nome: "Praticar arco e afinação no violino", concluido: false },
  { id: 2, nome: "Ler dois capítulos em francês", concluido: true },
  { id: 3, nome: "Anotar reflexões filosóficas no caderno", concluido: false }
];

let proximoId = 4;

const formularioTarefa = document.querySelector("#formulario-tarefa");
const campoTarefa = document.querySelector("#campo-tarefa");
const listaTarefas = document.querySelector("#lista-tarefas");

function alternarEstadoTarefa(id) {
  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      return { ...tarefa, concluido: !tarefa.concluido };
    }
    return tarefa;
  });
}

function removerTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
}

function repintarDOM() {
  listaTarefas.innerHTML = "";

  for (const tarefa of tarefas) {
    const li = document.createElement("li");
    li.className = tarefa.concluido ? "item-tarefa concluida" : "item-tarefa";
    li.dataset.id = String(tarefa.id);

    const spanNome = document.createElement("span");
    spanNome.className = "nome-tarefa";
    spanNome.textContent = tarefa.nome;

    const divAcoes = document.createElement("div");
    divAcoes.className = "acoes-tarefa";

    const botaoAlternar = document.createElement("button");
    botaoAlternar.type = "button";
    botaoAlternar.className = "botao-acao botao-alternar";
    botaoAlternar.dataset.id = String(tarefa.id);
    botaoAlternar.textContent = tarefa.concluido ? "Reabrir" : "Concluir";

    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "botao-acao botao-remover";
    botaoRemover.dataset.id = String(tarefa.id);
    botaoRemover.textContent = "Remover";

    divAcoes.appendChild(botaoAlternar);
    divAcoes.appendChild(botaoRemover);

    li.appendChild(spanNome);
    li.appendChild(divAcoes);
    listaTarefas.appendChild(li);
  }
}

formularioTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const textoDigitado = campoTarefa.value.trim();

  if (textoDigitado === "") {
    campoTarefa.focus();
    return;
  }

  tarefas.push({
    id: proximoId,
    nome: textoDigitado,
    concluido: false
  });

  proximoId += 1;
  campoTarefa.value = "";
  campoTarefa.focus();
  repintarDOM();
});

listaTarefas.addEventListener("click", function (evento) {
  const botao = evento.target.closest("button");
  if (!botao || !botao.dataset.id) {
    return;
  }

  const idTarefa = Number(botao.dataset.id);

  if (botao.classList.contains("botao-alternar")) {
    alternarEstadoTarefa(idTarefa);
    repintarDOM();
  } else if (botao.classList.contains("botao-remover")) {
    removerTarefa(idTarefa);
    repintarDOM();
  }
});

repintarDOM();