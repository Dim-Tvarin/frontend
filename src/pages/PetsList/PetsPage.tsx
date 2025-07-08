import { FiltersProvider } from 'src/context/FiltersContext';
import PetsList from './PetsList';

const PetsPage = () => {
  return (
    <FiltersProvider>
      <PetsList />
    </FiltersProvider>
  );
};

export default PetsPage;
