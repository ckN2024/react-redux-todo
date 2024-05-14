import { useDispatch } from "react-redux";
import { sortByNewestFirst, sortByOldestFirst } from "../redux/actions/todoActions";

const SortingMenu = () => {
    const dispatch = useDispatch()
  
  return (
    <div className="flex gap-2 px-[0.5em] sm:px-[1em] md:px-[1.5em] lg:px-[2em] mb-2">
      {/* button to sort by recent first */}
      <button
        onClick={() => dispatch(sortByNewestFirst())}
        className="px-2 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300 text-sm"
      >
        Recent first
      </button>

      {/* button to sort by oldest first */}
      <button
        onClick={() => dispatch(sortByOldestFirst())}
        className="px-2 border rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300 text-sm"
      >
        Oldest first
      </button>
    </div>
  );
};

export default SortingMenu;
