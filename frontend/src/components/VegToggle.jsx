export default function VegToggle({
    vegOnly,
    setVegOnly
  }) {
    return (
      <div className="veg-toggle">
  
        <input
          type="checkbox"
          checked={vegOnly}
          onChange={() => setVegOnly(!vegOnly)}
        />
  
        <span>Veg Only</span>
  
      </div>
    );
  }