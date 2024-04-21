import ErrorBoundary from "../components/ErrorBoundary";
import SuperHero from "../components/SuperHero";

const ErrorBoundaryTest = () => {
  return (
    <ErrorBoundary>
      <SuperHero heroName={"joker"} />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryTest;
