import PropTypes from "prop-types";

const SuperHero = ({ heroName }) => {
  if (heroName === "joker") {
    throw new Error("Not a hero!");
  }
  return (
    <did className="text-white h-[80vh] w-full flex justify-center items-center font-bold text-2xl">
      {heroName} Is a super hero
    </did>
  );
};

SuperHero.propTypes = {
  heroName: PropTypes.string.isRequired,
};

export default SuperHero;
