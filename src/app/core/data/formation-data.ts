import {Formation} from '../../interface/formation-interface/formation-interface';

export const formationData: Formation[] = [
  {
    id: 1,
    title: 'Graduado de Secundaria',
    institution: 'I.E.S Eloy Alfaro',
    location: 'Machala, Ecuador',
    year: 2001,
    logo: '/logo-estudios/EloyAlfaro.jpg',
    type: 'secondary',
    description: 'Educación secundaria completa'
  },
  {
    id: 2,
    title: 'Título de Tripulante de Cabina de Pasajeros',
    institution: 'Centro de Estudios Aeronáuticos',
    location: 'Madrid, España',
    year: 2008,
    logo: '/logo-estudios/aeronaiticos.jpg',
    type: 'professional',
    description: 'Formación especializada en aviación civil'
  },
  {
    id: 3,
    title: 'Programador Full Stack Developer',
    institution: 'Centro de Estudios Atrium',
    location: 'Madrid, España',
    year: 2024,
    logo: '/logo-estudios/Atrium.jpg',
    type: 'bootcamp',
    description: 'Formación intensiva en desarrollo web con Angular, Node.js, Express y MongoDB'
  }
];
