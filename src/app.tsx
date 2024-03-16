import MainScreen from '../src/components/mainScreen';

type AppComponentProps = {
  placesCount: number;
};

function App({ placesCount }: AppComponentProps): JSX.Element {
  return <MainScreen placesCount={placesCount} />;
}

export default App;
