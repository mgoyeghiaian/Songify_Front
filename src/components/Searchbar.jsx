import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="w-[270px] mt-4 ml-4 mb-8">
      <label htmlFor="search-field" className="sr-only">Search all Songs</label>
      <div className={`flex items-center rounded-full p-2 ml-5 mt-1   ${expanded ? 'border border-gray-200' : ''}`}>
        <FiSearch
          className={`w-5 h-5 mt-1    text-white cursor-pointer hover:text-gray-400 transform transition-transform duration-500 ${expanded ? 'rotate-60' : ''}`}
          onClick={toggleExpansion}
        />
        {expanded && (
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2  bg-transparent border-none outline-none placeholder-gray-500 text-base text-white transition-all duration-500 border-r-0"
            style={{ borderRightWidth: expanded ? '2px' : '0', paddingLeft: expanded ? '8px' : '0' }}
          />
        )}
      </div>
    </form>
  );
};
export default Searchbar;
