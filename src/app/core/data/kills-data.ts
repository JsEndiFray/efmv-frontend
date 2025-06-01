import {Skill} from '../../interface/kills-interface/kills-interface';

export const skillsData: Skill[] = [
  {
    id: 1,
    name: 'Front-End',
    category: 'frontend',
    technologies: ['Angular'],
    logo: '/logo/angular.jpg',
    level: 'learning',
    description: 'Desarrollo de interfaces de usuario modernas',
    //yearsOfExperience: 0.5
  },
  {
    id: 2,
    name: 'Back-End',
    category: 'backend',
    technologies: ['Node.js', 'Express'],
    logo: '/logo/node.jpg',
    level: 'learning',
    description: 'Desarrollo de APIs y servicios backend',
    //yearsOfExperience: 0.5
  },
  {
    id: 3,
    name: 'Base de Datos Relacional',
    category: 'database',
    technologies: ['MySQL', 'Sequelize ORM'],
    logo: '/logo/mysqlSequelize.jpg',
    level: 'learning',
    description: 'Gestión de bases de datos relacionales',
    //yearsOfExperience: 0.3
  },
  {
    id: 4,
    name: 'Base de Datos NoSQL',
    category: 'database',
    technologies: ['MongoDB Atlas', 'Mongoose ODM'],
    logo: '/logo/mongodbMongoose.jpg',
    level: 'learning',
    description: 'Bases de datos orientadas a documentos',
    //yearsOfExperience: 0.5
  },
  {
    id: 5,
    name: 'Control de Versiones',
    category: 'tools',
    technologies: ['GitHub', 'Git'],
    logo: '/logo/github.jpg',
    level: 'learning',
    description: 'Gestión de código y colaboración',
   // yearsOfExperience: 0.3
  },
  {
    id: 6,
    name: 'Reparación Móvil',
    category: 'other',
    technologies: ['Diagnóstico', 'Reparación Hardware'],
    logo: '/logo/reparacion.jpg',
    level: 'advanced',
    description: 'Reparación y mantenimiento de dispositivos móviles',
   // yearsOfExperience: 8
  }
];
