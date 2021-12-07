import React from "react";

import "./styles.css";

import { Posts } from "../../components/posts";
import { loadPost } from "../../utils/load-post.js";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchInput: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;

    const postsandPhotos = await loadPost();

    this.setState({
      posts: postsandPhotos.slice(page, postPerPage),
      allPosts: postsandPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postPerPage, allPosts, posts } = this.state;

    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleInputSearch = (e) => {
    const { value } = e.target;
    this.setState({ searchInput: value });
  };

  render() {
    const { posts, page, postPerPage, allPosts, searchInput } = this.state;

    const noMorePosts = page + postPerPage >= allPosts.length;

    const filterPosts = !!searchInput
      ? allPosts.filter((post) => {
          return post.title.toUpperCase().includes(searchInput.toUpperCase());
        })
      : posts;

    return (
      <section className={"container"}>
        <div className="search-container">
          <TextInput onChange={this.handleInputSearch} value={searchInput} />
        </div>

        {filterPosts.length > 0 && <Posts posts={filterPosts} />}
        {filterPosts.length === 0 && <h1>Não esistem posts :(</h1>}

        <div className={"button-container"}>
          {!searchInput && (
            <Button
              onClick={this.loadMorePosts}
              text={"Load more Posts"}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
