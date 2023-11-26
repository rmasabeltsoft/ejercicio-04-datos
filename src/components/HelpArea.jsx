import HelpBox from './HelpBox';
import './HelpArea.css';

const HELP_ITEMS = [
  {
    id: 'h1',
    title: '¿Qué es Git?',
    text: 'Git es un sistema de control de versiones que nos ayuda a administrar nuestro código y crear instantáneas de código.',
  },
  {
    id: 'h2',
    title: '¿Qué es GitHub?',
    text: 'GitHub es una empresa y una oferta en línea que nos brinda toneladas de servicios relacionados con Git (por ejemplo, repositorios en la nube).',
  },
  {
    id: 'h3',
    title: '¿Qué es GitHub Actions?',
    text: 'GitHub Actions es un servicio de automatización (o servicio CI/CD) que nos ayuda a automatizar flujos de trabajo y procesos relacionados con el repositorio.',
  },
];

function HelpArea() {
  return (
    <section data-testid="help-area" id="help-area">
      {HELP_ITEMS.map((item) => (
        <HelpBox key={item.id} title={item.title} text={item.text} />
      ))}
    </section>
  );
}

export default HelpArea;
