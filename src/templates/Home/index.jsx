import { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { Posts } from "../../components/posts";
import { loadPost } from "../../utils/load-post.js";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsandPhotos = await loadPost();

    setPosts(postsandPhotos.slice(page, postPerPage));
    setAllPosts(postsandPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleInputSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filterPosts = !!searchInput
    ? allPosts.filter((post) => {
        return post.title.toUpperCase().includes(searchInput.toUpperCase());
      })
    : posts;

  return (
    <section className={"container"}>
      <div className="search-container">
        <TextInput onChange={handleInputSearch} value={searchInput} />
      </div>

      {filterPosts.length > 0 && <Posts posts={filterPosts} />}
      {filterPosts.length === 0 && <h1>Não esistem posts :(</h1>}

      <div className={"button-container"}>
        {!searchInput && (
          <Button
            onClick={loadMorePosts}
            text={"Load more Posts"}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
