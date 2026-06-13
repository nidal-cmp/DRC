export default function SearchBar({
    search,
    setSearch
  }) {
    return (
      <input
        className="search-bar"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  }