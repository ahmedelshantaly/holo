import { useCallback, useEffect, useRef, useState } from "react";
import GithubCard from "../components/GithubCard";
import GithubUserCard from "../components/GithubUserCard";
import SearchInput from "../components/SearchInput";
import { debounce } from "lodash";
import Loader from "../components/Loader";

export default function Home() {
  const listInnerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("repositories");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  const search = useCallback(
    debounce(async (criteria: string) => {
      try {
        setLoading(true);
        await fetch(
          `https://api.github.com/search/${searchCriteria}?q=${criteria}&per_page=10&page=${currPage}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setErrorMessage(data.message);
              setLoading(false);
            } else {
              setErrorMessage("");
            }
            if (!data.items.length) {
              setLastList(true);
              return;
            }

            setPrevPage(currPage);
            setSearchResults([...searchResults, ...data.items]);
          });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }, 300),
    [searchCriteria, currPage, lastList, prevPage]
  );

  useEffect(() => {
    if (searchTerm && !lastList && prevPage !== currPage) {
      search(searchTerm);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, lastList, prevPage]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      search(searchTerm);
      setPrevPage(0);
      setCurrPage(1);
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCriteria, searchTerm]);

  return (
    <div className="home">
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchCriteria={setSearchCriteria}
        setSearchResults={setSearchResults}
      />

      <div className="cards-list" onScroll={onScroll} ref={listInnerRef}>
        {searchResults.length > 0
          ? searchCriteria === "repositories"
            ? searchResults?.map((item: any) => (
                <GithubCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  stars={item.stargazers_count}
                  owner={item.owner.login}
                  avatar={item.owner.avatar_url}
                  url={item.html_url}
                  topics={item.topics}
                />
              ))
            : searchResults.map((item: any) => (
                <GithubUserCard
                  key={item.id}
                  owner={item.login}
                  avatar={item.avatar_url}
                  url={item.html_url}
                />
              ))
          : ""}
        {loading && <Loader />}
        {errorMessage && !loading && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}
