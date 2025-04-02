

const capitalizeWords = (str) => {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(" ");
};

export const getStates = (data) => {
  const states =  data.filter(item => item["Другий рівень"] === '')
        .map(item => ({
            id: item["Перший рівень"],
            name: item["Назва об'єкта українською мовою"]
          })
  );
  
  const cleanStates = states.map(state => ({
      ...state,
    name: state.name.split('/')[0] 
      .toLowerCase()
      .replace(/^./, char => char.toUpperCase())
  }));

  return cleanStates
}

export const states = [
    {
        "id": "0500000000",
        "name": "Вінницька область"
    },
    {
        "id": "0700000000",
        "name": "Волинська область"
    },
    {
        "id": 1200000000,
        "name": "Дніпропетровська область"
    },
    {
        "id": 1400000000,
        "name": "Донецька область"
    },
    {
        "id": 1800000000,
        "name": "Житомирська область"
    },
    {
        "id": 2100000000,
        "name": "Закарпатська область"
    },
    {
        "id": 2300000000,
        "name": "Запорізька область"
    },
    {
        "id": 2600000000,
        "name": "Івано-франківська область"
    },
    {
        "id": 3200000000,
        "name": "Київська область"
    },
    {
        "id": 3500000000,
        "name": "Кіровоградська область"
    },
    {
        "id": 4400000000,
        "name": "Луганська область"
    },
    {
        "id": 4600000000,
        "name": "Львівська область"
    },
    {
        "id": 4800000000,
        "name": "Миколаївська область"
    },
    {
        "id": 5100000000,
        "name": "Одеська область"
    },
    {
        "id": 5300000000,
        "name": "Полтавська область"
    },
    {
        "id": 5600000000,
        "name": "Рівненська область"
    },
    {
        "id": 5900000000,
        "name": "Сумська область"
    },
    {
        "id": 6100000000,
        "name": "Тернопільська область"
    },
    {
        "id": 6300000000,
        "name": "Харківська область"
    },
    {
        "id": 6500000000,
        "name": "Херсонська область"
    },
    {
        "id": 6800000000,
        "name": "Хмельницька область"
    },
    {
        "id": 7100000000,
        "name": "Черкаська область"
    },
    {
        "id": 7300000000,
        "name": "Чернівецька область"
    },
    {
        "id": 7400000000,
        "name": "Чернігівська область"
    },
  
]

export const getCities = (data) => {
  // удаляем все районы в городах
  const filterFromR = data.filter(i => i["Категорія"] !== "Р");
  const transformedData = filterFromR.map(i => ({
            idArea: i["Перший рівень"],
            idCity: i["Четвертий рівень"] || i["Третій рівень"] || i["Другий рівень"],
            name: i["Назва об'єкта українською мовою"]
  }));
  
  return transformedData.map(item => {
    const state = states.find(state => String(state.id) === String(item.idArea));
    const transformCityName = capitalizeWords(item.name)
        if (state) {
            item.name = `${transformCityName}, ${state.name}`;
        }
        return item;
    });
}