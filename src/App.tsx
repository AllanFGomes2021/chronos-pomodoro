import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

export function App() {
  return (
    <>
      <Heading>
        OLA MUNDO NOVO
        <button>
          <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        quasi reiciendis fuga voluptas. Dolore, porro tempora. Sed, tempora
        itaque rerum accusantium dignissimos sequi ipsa architecto neque ut
        velit cum sapiente?
      </p>
    </>
  );
}
