export interface videocard{
    id:number,
    img: string[],
    name: string,
    brand: string,
    price: number,
    frequency: number,
    video: string,
    memory: number,
    videoFrequency: number,
    energy: number,
    reviews: string[], 
}

const getExpirationDates = () => {
    const currentYear = new Date().getFullYear();
    const expirationDates: string [] = [];

    for (let year = currentYear; year <= currentYear + 10; year++) {
        for (let month = 1; month <= 12; month++) {
            const monthString:string | any = month.toString().padStart(2, '0');
            const yearString:string | any = year.toString().slice(-2);
            expirationDates.push(`${monthString}/${yearString}`);
        }
    }

    return expirationDates;
};
export const expirationDates = getExpirationDates();

export const cities = [
    {
        city: "Алматы",
        addresses: [
            "ул. Панфилова, 132",
            "ул. Толе би, 187",
            "пр. Назарбаева, 124"
        ]
    },
    {
        city: "Нур-Султан (Астана)",
        addresses: [
            "ул. Сыганак, 29",
            "пр. Мангилик Ел, 54",
            "ул. Кунаева, 12"
        ]
    },
    {
        city: "Шымкент",
        addresses: [
            "ул. Байтурсынова, 56",
            "ул. Рыскулова, 42",
            "ул. Кунаева, 37"
        ]
    },
    {
        city: "Караганда",
        addresses: [
            "ул. Абая, 15",
            "ул. Алиханова, 19",
            "пр. Нурсултана Назарбаева, 58"
        ]
    },
    {
        city: "Актобе",
        addresses: [
            "ул. Абулхаир хана, 64",
            "ул. 312-й стрелковой дивизии, 37",
            "пр. Алии Молдагуловой, 5"
        ]
    },
    {
        city: "Тараз",
        addresses: [
            "ул. Толе би, 85",
            "ул. Сулейманова, 23",
            "ул. Байзак батыра, 76"
        ]
    },
    {
        city: "Павлодар",
        addresses: [
            "ул. Кутузова, 98",
            "пр. Назарбаева, 129",
            "ул. Лермонтова, 58"
        ]
    },
    {
        city: "Усть-Каменогорск",
        addresses: [
            "ул. Казахстан, 50",
            "ул. Абая, 14",
            "пр. Сатпаева, 39"
        ]
    },
    {
        city: "Семей",
        addresses: [
            "ул. Абая, 54",
            "ул. Шакарима, 22",
            "пр. Назарбаева, 76"
        ]
    },
    {
        city: "Атырау",
        addresses: [
            "ул. Азаттык, 47",
            "ул. Курмангазы, 16",
            "ул. Сатыбалдиева, 18"
        ]
    },
    {
        city: "Кызылорда",
        addresses: [
            "ул. Астана, 36",
            "ул. Айтиева, 57",
            "ул. Абая, 29"
        ]
    },
    {
        city: "Костанай",
        addresses: [
            "ул. Алтынсарина, 32",
            "пр. Аль-Фараби, 67",
            "ул. Баймагамбетова, 19"
        ]
    },
    {
        city: "Петропавловск",
        addresses: [
            "ул. Абая, 23",
            "пр. Назарбаева, 45",
            "ул. Жамбыла, 58"
        ]
    },
    {
        city: "Актау",
        addresses: [
            "мкр. 3, дом 12",
            "мкр. 5, дом 45",
            "мкр. 12, дом 27"
        ]
    },
    {
        city: "Уральск",
        addresses: [
            "ул. Сырыма Датова, 12",
            "ул. Темир Масина, 18",
            "пр. Евразия, 45"
        ]
    }
];

export const videocards:videocard [] = [
    {
        id: 1,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h1a/heb/68514888253470.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/had/h98/68514888777758.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hf3/hb0/68514892447774.jpg?format=gallery-medium'],
        name: 'Видеокарта Colorful iGame GeForce RTX 3050 Ultra W DUO OC 8G-V 8 ГБ',
        brand: 'colorful',
        price: 135000,
        frequency: 1807,
        video: '7680 х 4320',
        memory: 8192,
        videoFrequency: 14000,
        energy: 115,
        reviews: [],
    },
    {
        id: 2,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h93/hf7/64082073059358.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hc7/hb5/64082075549726.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/ha3/h0f/64082077319198.jpg?format=gallery-medium'],
        name: 'GIGABYTE GeForce RTX 2060 D6 GV-N2060D6-6GD rev. 2.0 6 ГБ',
        brand: 'gigabyte',
        price: 149990,
        frequency: 1680,
        video: '7680 х 4320',
        memory: 6144,
        videoFrequency: 14000,
        energy: 160,
        reviews: [],
    },
    {
        id: 3,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/hd6/hdc/64380043919390.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h59/h84/64380044607518.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h81/h75/64380049850398.jpg?format=gallery-medium'],
        name: 'Видеокарта PowerColor AMD Radeon RX 6700 XT Fighter AXRX 6700XT 12GBD6-3DH 12 ГБ',
        brand: 'AMD Radeon',
        price: 178840,
        frequency: 2581 ,
        video: '7680 х 4320',
        memory: 12288,
        videoFrequency: 16000,
        energy: 180,
        reviews: [],
    },
    {
        id: 4,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h71/h2a/82963016777758.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hfe/hcd/82963018055710.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h4c/hd7/82963021463582.jpg?format=gallery-medium'],
        name: 'Видеокарта Colorful iGame GeForce RTX 4070 Ultra W OC V2-V 12 Гб',
        brand: 'colorful',
        price: 360000,
        frequency: 2505 ,
        video: '7680 х 4320',
        memory: 12288,
        videoFrequency: 21000,
        energy: 180,
        reviews: [],
    },
    {
        id: 5,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/hd6/hdc/64380043919390.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h59/h84/64380044607518.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h81/h75/64380049850398.jpg?format=gallery-medium'],
        name: 'Видеокарта Colorful iGame GeForce RTX 3060 Ultra W OC 12 Гб',
        brand: 'colorful',
        price: 212990,
        frequency: 1777 ,
        video: '7680 х 4320',
        memory: 12288,
        videoFrequency: 15000,
        energy: 170,
        reviews: [],
    },
    {
        id: 6,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/hd8/hf0/81178100367390.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h1c/h2d/81178100432926.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h21/h5f/81178100498462.jpg?format=gallery-medium'],
        name: 'Видеокарта GIGABYTE GeForce RTX 4070 GAMING OC GV-N4070GAMING OC-12GD 12 ГБ',
        brand: 'gigabyte',
        price: 391496,
        frequency: 2565,
        video: '7680 х 4320',
        memory: 12288,
        videoFrequency: 16000,
        energy: 180,
        reviews: [],
    },
    {
        id: 7,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/hc0/h6e/82892076449822.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h41/h4a/82892083855390.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h4a/hd1/82892095193118.jpg?format=gallery-medium'],
        name: 'Видеокарта GIGABYTE GeForce RTX 4070 GAMING OC GV-N4070GAMING OC-12GD 12 ГБ',
        brand: 'colorful',
        price: 137620,
        frequency: 1552,
        video: '7680 х 4320',
        memory: 8192,
        videoFrequency: 14000,
        energy: 125,
        reviews: [],
    },
    {
        id: 8,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h30/h48/64453093457950.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hf4/h7f/64453095358494.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h29/hb5/64453101846558.jpg?format=gallery-medium'],
        name: 'Видеокарта ASUS Dual GeForce RTX 3050 OC Edition 8 ГБ',
        brand: 'asus',
        price: 166766,
        frequency: 1852,
        video: '7680 х 4320',
        memory: 8192,
        videoFrequency: 14000,
        energy: 130,
        reviews: [],
    },
    {
        id: 9,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h5b/h74/67868671016990.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h1b/h5c/67868672131102.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hce/h35/67868676849694.jpg?format=gallery-medium'],
        name: 'Видеокарта GIGABYTE GeForce RTX 4070 Ti MASTER GV-N407TAORUS M-12GD 12 ГБ',
        brand: 'gigabyte',
        price: 541767,
        frequency: 2670,
        video: '7680 х 4320',
        memory: 12288,
        videoFrequency: 21000,
        energy: 240,
        reviews: [],
    },
    {
        id: 10,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h7d/h61/64012373131294.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h21/ha3/64012374966302.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h8e/h34/64012378308638.jpg?format=gallery-medium'],
        name: 'Видеокарта GIGABYTE Radeon RX 6900 XT Gaming OC GV-R69XTGAMING OC-16GD 16 ГБ',
        brand: 'AMD Radeon',
        price: 500000,
        frequency: 2285,
        video: '7680 х 4320',
        memory: 16384,
        videoFrequency: 16000,
        energy: 265,
        reviews: [],
    },
    {
        id: 11,
        img: ['https://cdn1.ozone.ru/s3/multimedia-s/6727181320.jpg',
        'https://resources.cdn-kaspi.kz/img/m/p/h27/h22/84057804079134.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h44/h32/84057804210206.jpg?format=gallery-medium'],
        name: 'Видеокарта GIGABYTE Radeon RX 6900 XT Gaming OC GV-R69XTGAMING OC-16GD 16 ГБ',
        brand: 'colorful',
        price: 244330,
        frequency: 2580,
        video: '7680 х 4320',
        memory: 8192,
        videoFrequency: 16000,
        energy: 160,
        reviews: [],
    },
    {
        id: 12,
        img: ['https://resources.cdn-kaspi.kz/img/m/p/h2e/h0c/79486591729694.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hde/h22/79487837175838.jpg?format=gallery-medium',],
        name: 'Видеокарта NVIDIA RTX 3080 Ti Founders Edition 12 ГБ',
        brand: 'gigabyte',
        price: 256330,
        frequency: 1440,
        video: '7680 х 4320',
        memory: 12288,
        videoFrequency: 19000,
        energy: 320,
        reviews: [],
    },
]