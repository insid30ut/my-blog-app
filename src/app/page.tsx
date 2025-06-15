export default function HomePage() {
  return (
    <div className="landing-page">
      <header className="hero-section">
        <h1 className="site-title">MycelialFunGuy</h1>
        <p className="intro-text">
          Dive into the fascinating world of mycology! Explore the hidden wonders of fungi, from their vital role in ecosystems to their incredible diversity and beauty. Join us on an adventure to discover the fun side of being a "FunGuy"!
        </p>
      </header>

      <section className="content-section">
        <div className="image-placeholder forest-image">
          {/* Placeholder for a forest scene or mycelial network image */}
          <span className="image-description">Forest Scene / Mycelial Network</span>
        </div>
        <div className="text-block">
          <h2>The Unseen World Beneath Our Feet</h2>
          <p>
            Mycelium, the root-like structure of a fungus, forms vast networks beneath the soil, connecting trees and plants in intricate ways. These networks are essential for nutrient cycling and play a crucial role in maintaining healthy ecosystems.
          </p>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Discover Diverse Fungi</h2>
        <div className="image-grid">
          <div className="image-placeholder mushroom-image">
            {/* Placeholder for a vibrant mushroom image */}
            <span className="image-description">Vibrant Mushroom</span>
          </div>
          <div className="image-placeholder mushroom-image">
            {/* Placeholder for another unique mushroom image */}
            <span className="image-description">Unique Mushroom</span>
          </div>
          <div className="image-placeholder mushroom-image">
            {/* Placeholder for a group of mushrooms */}
            <span className="image-description">Group of Mushrooms</span>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <p>&copy; 2025 MycelialFunGuy. All rights reserved.</p>
      </footer>
    </div>
  );
}
