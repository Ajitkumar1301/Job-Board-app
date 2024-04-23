import { useEffect, useState } from "react"
import JobPosting from "./JobPosting";

const Home = () => {

  const ITEMS_PER_PAGE = 6;
  const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";


  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage);
    setFetchingDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    const itemIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response) =>
          response.json()
        )
      )
    );
    setItems([...items, ...itemsForPage]);

    setFetchingDetails(false);
  }

  useEffect(() => {
    if (currentPage === 0) fetchItems(currentPage);
  }, [currentPage]);

  console.log("itemIds", itemIds);

  return (
    <div className="app">
      <h2 className="title">Job Board</h2>

      {itemIds === null || items.length < 1 ? (
        <p className="custom-loading">Loading...</p>
      ) :
        (<div >
          <div className="items">
            {items.map((item) => {

              return <JobPosting key={item.id} {...item} />
            })}

          </div>
          {items.length > 0 &&
            currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE < itemIds.length && (
              <button
                className={`load-More`}
                disabled={fetchingDetails}
                onClick={() => fetchItems(currentPage + 1)}
              >
                {fetchingDetails ? "loading..." : "Load more jobs"}
              </button>
            )}
        </div>)

      }
    </div>
  )
}

export default Home
