import type { Lang } from "./types";

type DescriptionText = { type: "text"; value: string };
type DescriptionLines = { type: "lines"; lines: string[] };
type Description = DescriptionText | DescriptionLines;

type CardTranslation = {
  title: string;
  description: Description;
};

export const DICTIONARY = {
  ua: {
    hero: {
      quote: "Команда — це більше,\nніж сума навичок.\nЦе культура.",
    },
    sectionTwo: {
      subtitle: "Командократичні команди здатні на більше, бо:",
      items: [
        { num: "01", text: "Команда > Проєкт" },
        { num: "02", text: "Довіра > Контроль" },
        { num: "03", text: "Цінності > Правила" },
        { num: "04", text: "Сила в порозумінні" },
      ],
    },
    sectionThree: {
      title: "Проблематика",
      subtitle:
        "Більшість інструментів створені для вертикального\nуправління:",
      nodes: {
        left: "Керівник",
        middle: "Виконавець",
        right: "Контроль",
      },
      block: {
        lead: "Але є команди, яким ефективніше працювати по-іншому",
        leadSecondary:
          "Горизонтально.\nЗ довірою, автономністю та порозуміннням.",
        badges: ["-32% плинність", "+140% залученість", "+25% швидкість"],
      },
    },
    sectionFour: {
      topBadge: "Принцип 01",
      title: "Команда > Проєкт",
      subtitle:
        "Проєкти закінчуються, команда залишається.\nЗ хорошою командою ви зробите будь-який проєкт.",
      centerBadge: "-35% плинність кадрів",
      cards: [
        {
          title: "Психологічна безпека",
          description: {
            type: "text",
            value:
              'Можна помилятися і вчитися. Можна казати "не знаю". Можна не погоджуватися.',
          } satisfies DescriptionText,
        },
        {
          title: "Критикуй ідеї,\nпідтримуй людей",
          description: {
            type: "text",
            value: "Ідеї — жорстко. Людей — щиро. Фідбек — це турбота.",
          } satisfies DescriptionText,
        },
        {
          title: "Нетерпимість\nдо токсичності",
          description: {
            type: "lines",
            lines: [
              "Хтось руйнує команду? Він йде.",
              "Здорова команда > токсичний",
              "талант.",
            ],
          } satisfies DescriptionLines,
        },
      ] satisfies CardTranslation[],
    },
    sectionFive: {
      topBadge: "Принцип 02",
      title: "Довіра > Контроль",
      subtitle:
        "Коли команді довіряють — вона доставляє кращі результати.\nКоли контролюють — втрачає мотивацію.",
      centerBadge: "+25% швидкість доставки",
      cards: [
        {
          title: "Контроль\nпороджує\nсаботаж",
          description: {
            type: "lines",
            lines: [
              "Постійний контроль = втрата мотивації.",
              '"Навіщо намагатися?"',
              "Результат: плинність.",
            ],
          } satisfies DescriptionLines,
        },
        {
          title: "Довіра\nпороджує відповідальність",
          description: {
            type: "text",
            value:
              "Довіра = відповідальність. Не треба чекати підтвердження. Результат: швидше, якісніше.",
          } satisfies DescriptionText,
        },
        {
          title: "Комунікація\n=\nповніша картина",
          description: {
            type: "text",
            value:
              "Команда бачить нюанси. Обговорення = повна картина. Менше ітерацій.",
          } satisfies DescriptionText,
        },
      ] satisfies CardTranslation[],
    },
    sectionSix: {
      topBadge: "Принцип 03",
      title: "Цінності > Правила",
      subtitle:
        "Правила завжди відстають від реальності.\nЦінності — це компас для будь-яких ситуацій.",
      centerBadge: "3 тижні апрув vs 1 день з цінностями",
      cards: [
        {
          title: "Правила\nзастарілі",
          description: {
            type: "text",
            value:
              "Правила формуються в минулому. Реальність швидко змінюється. Не вписується в правила.",
          } satisfies DescriptionText,
        },
        {
          title: "Цінності\nдають азімут",
          description: {
            type: "lines",
            lines: [
              "Нова ситуація?",
              "Орієнтуйся на цінності.",
              "Приймай рішення.",
            ],
          } satisfies DescriptionLines,
        },
        {
          title: "Гнучкість",
          description: {
            type: "text",
            value:
              "Нові виклики постійно. Цінності дають автономію. Діяти швидко.",
          } satisfies DescriptionText,
        },
      ] satisfies CardTranslation[],
    },
    sectionSeven: {
      topBadge: "Принцип 04",
      title: "Сила команди в порозумінні",
      subtitle: "Команда сильна, коли всі на одній хвилі.",
      centerBadge: "Година підготовки > 4 години доробки",
      cards: [
        {
          title: "Підготовка > виконання",
          description: {
            type: "text",
            value:
              "Детальний бриф = правильно з першого разу. Без брифу = переробки. Час витрачено.",
          } satisfies DescriptionText,
        },
        {
          title: "Єдина\nсемантика",
          description: {
            type: "text",
            value: "Всі на 70% > один на 100%. Спільна мова. Швидша робота.",
          } satisfies DescriptionText,
        },
        {
          title: "Культура\nфідбеку",
          description: {
            type: "text",
            value:
              "Фідбек = турбота. Критикуй ідеї жорстко. Підтримуй людей щиро.",
          } satisfies DescriptionText,
        },
      ] satisfies CardTranslation[],
    },
    sectionEight: {
      titleLines: ["Teamocracy — це нова культура", "командної взаємодії"],
      paragraph: {
        parts: [
          { text: "Ніхто не вигадував Teamocracy.", bold: true },
          {
            text: "Як і все інше, вона існувала собі у Всесвіті, допоки хтось не звернув на неї увагу.",
            bold: false,
          },
          {
            text: "Все, що ми зробили, так це просто дали ім'я принципам, що дозволяють краще",
            bold: false,
          },
          { text: "співпрацювати командам.", bold: false },
        ],
      },
      ctas: {
        follow: { lines: ["Стежити", "за сторінкою"] },
        join: { lines: ["Долучитись", "до обговорення"] },
      },
      manifesto: {
        label: "Завантажити повний Маніфест",
      },
    },
    manifestoModal: {
      title: "Дізнайся більше",
      subtitle:
        "Завантажуй повний Маніфест \nта ознайомся із принципами Teamocracy.",
      buttonLabel: "Завантажити зараз",
    },
  },
  en: {
    hero: {
      quote: "A team is more than\n the sum of its skills.\nIt's a culture.",
    },
    sectionTwo: {
      subtitle: "Teamocracy-driven teams are capable of more, because:",
      items: [
        { num: "01", text: "Team > Project" },
        { num: "02", text: "Trust > Control" },
        { num: "03", text: "Values > Rules" },
        { num: "04", text: "Strength in Understanding" },
      ],
    },
    sectionThree: {
      title: "The Problem",
      subtitle: "Most tools are built for top-down management:",
      nodes: {
        left: "Manager",
        middle: "Assignee",
        right: "Control",
      },
      block: {
        lead: "Yet, some teams thrive by working differently.",
        leadSecondary:
          "Horizontally.\nWith trust, autonomy, and mutual understanding.",
        badges: ["-32% turnover", "+140% engagement", "+25% speed"],
      },
    },
    sectionFour: {
      topBadge: "Principle 01",
      title: "Team > Project",
      subtitle:
        "Projects come and go. Teams remain.\n A great team can pull off any project.",
      centerBadge: "-35% staff turnover",
      cards: [
        {
          title: "Psychological Safety",
          description: {
            type: "text",
            value:
              'Feel free to make mistakes and learn. Speak up and say "I don\'t know". Feel safe to disagree.',
          } satisfies DescriptionText,
        },
        {
          title: "Tough on ideas,\nkind to people",
          description: {
            type: "lines",
            lines: [
              "Challenge ideas firmly,",
              "support people sincerely.",
              "Feedback is an act of care.",
            ],
          } satisfies DescriptionLines,
        },
        {
          title: "Zero Tolerance\nfor Toxicity",
          description: {
            type: "lines",
            lines: [
              "Someone undermining the team? They're out.",
              "A healthy team > a toxic talent.",
            ],
          } satisfies DescriptionLines,
        },
      ] satisfies CardTranslation[],
    },
    sectionFive: {
      topBadge: "Principle 02",
      title: "Trust > Control",
      subtitle:
        "Trusted teams deliver better results.\nMicromanaged teams lose motivation.",
      centerBadge: "+25% delivery speed",
      cards: [
        {
          title: "Micromanagement\n Kills Drive",
          description: {
            type: "lines",
            lines: [
              "Persistent micromanagement = loss of",
              'motivation. "Why bother?"',
              "The outcome: high turnover.",
            ],
          } satisfies DescriptionLines,
        },
        {
          title: "Trust Breeds\n Accountability",
          description: {
            type: "text",
            value:
              "Trust = accountability. No waiting for approvals. The outcome: faster, higher-quality results.",
          } satisfies DescriptionText,
        },
        {
          title: "Communication\n=\nThe Big Picture",
          description: {
            type: "text",
            value:
              "The team sees the nuances. Discussion = the complete picture. Fewer iterations.",
          } satisfies DescriptionText,
        },
      ] satisfies CardTranslation[],
    },
    sectionSix: {
      topBadge: "Principle 03",
      title: "Values > Rules",
      subtitle:
        "Rules are always a step behind reality.\nValues are the compass for every situation.",
      centerBadge: "3 weeks for approval vs. 1 day with values",
      cards: [
        {
          title: "Rules Are\nObsolete",
          description: {
            type: "text",
            value:
              "Rules are built on the past. Reality moves fast and leaves them behind. A static rulebook can't adapt.",
          } satisfies DescriptionText,
        },
        {
          title: "Values Provide\nTrue North",
          description: {
            type: "lines",
            lines: [
              "New challenge?",
              "Align with your values.",
              "Make the call.",
            ],
          } satisfies DescriptionLines,
        },
        {
          title: "Flexibility",
          description: {
            type: "lines",
            lines: [
              "New challenges never stop.",
              "Values empower autonomy",
              "and rapid action.",
            ],
          } satisfies DescriptionLines,
        },
      ] satisfies CardTranslation[],
    },
    sectionSeven: {
      topBadge: "Principle 04",
      title: "Team Strength\n in Understanding",
      subtitle: "A team is strong when everyone is on the same page.",
      centerBadge: "1 hour of prep > 4 hours of rework",
      cards: [
        {
          title: "Preparation > Execution",
          description: {
            type: "text",
            value:
              "A solid brief = done right the first time. No brief = endless rework. Wasted time.",
          } satisfies DescriptionText,
        },
        {
          title: "Shared\nContext",
          description: {
            type: "lines",
            lines: [
              "A team aligned at 70% >",
              "one person at 100%.",
              "Shared vocabulary.",
              "Rapid execution.",
            ],
          } satisfies DescriptionLines,
        },
        {
          title: "Feedback\nCulture",
          description: {
            type: "text",
            value: "Feedback is care. Tough on ideas, kind to people.",
          } satisfies DescriptionText,
        },
      ] satisfies CardTranslation[],
    },
    sectionEight: {
      titleLines: ["Teamocracy — a new culture", "of team collaboration"],
      paragraph: {
        parts: [
          { text: "No one invented Teamocracy.", bold: true },
          {
            text: "Like gravity, it was always there, waiting to be discovered.",
            bold: false,
          },
          {
            text: "All we did was give a name to the principles that empower better",
            bold: false,
          },
          { text: "teamwork.", bold: false },
        ],
      },
      ctas: {
        follow: { lines: ["Follow on", "social media"] },
        join: { lines: ["Join the", "discussion"] },
      },
      manifesto: {
        label: "Download the full Manifesto",
      },
    },
    manifestoModal: {
      title: "Learn more",
      subtitle:
        "Download the full Manifesto \nand learn about the principles of Teamocracy.",
      buttonLabel: "Download now",
    },
  },
} as const satisfies Record<Lang, unknown>;
