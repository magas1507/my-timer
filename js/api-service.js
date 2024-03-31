
async function getExercises() {
  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }
    const data = await response.json();
    exercisesList = data;
    console.log("Exercícios obtidos:", exercisesList); // Verifica se os exercícios foram obtidos corretamente
    localStorage.setItem('exercisesList', JSON.stringify(exercisesList));
    localStorage.setItem('offset', offset.toString());
    return exercisesList; // Retorna a lista de exercícios obtidos
  } catch (error) {
    console.error(error);
  }
}

const savedExercises = localStorage.getItem('exercisesList');
const savedOffset = localStorage.getItem('offset');
if (savedExercises && savedOffset) {
  exercisesList = JSON.parse(savedExercises);
  offset = parseInt(savedOffset);
  console.log('Exercícios carregados do localStorage');
} else {
  getExercises(); // Chama a função para buscar os exercícios
}

async function fetchAndDisplayExercise() {
  try {
    const exercises = await getExercises(); // Obtém os exercícios usando a função
    const randomIndex = Math.floor(Math.random() * exercises.length);
    const exercise = exercises[randomIndex];
    exerciseElement.textContent = exercise.name;
  } catch (error) {
    console.error('Erro ao buscar exercícios:', error);
  }
}