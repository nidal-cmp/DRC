export default function CategorySidebar({
  category,
  setCategory
}) {

  const categories = [
    "All",
    "Main Course",
    "Starters",
    "Drinks"
  ];

  return (
    <div className="category-sidebar">

      <h2>Categories</h2>

      {

        categories.map((cat) => (

          <button
            key={cat}
            className={
              category === cat
                ? "active-category"
                : ""
            }
            onClick={() =>
              setCategory(cat)
            }
          >
            {cat}
          </button>

        ))

      }

    </div>
  );

}