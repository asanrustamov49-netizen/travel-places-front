import scss from "./mortgage.module.scss";

const Mortgage = () => {
  return (
    <section className={scss.mortgage}>
      <div className="container">
        <div className={scss.overlay}>
          <span>💎 The Best Places</span>
          <h2>Buy for cheapest price</h2>
          <p>
            Book your spots online in 10 minutes
            <br />
            and move in as early as tomorrow.
          </p>
          <button>Book Now →</button>
        </div>
      </div>
    </section>
  );
};

export default Mortgage;
