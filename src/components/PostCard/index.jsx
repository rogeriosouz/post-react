import "./styles.css";

export const PostCard = ({ title, body, cover, id }) => (
  <div className="post">
    <img src={cover} alt={title} />
    <div className={"post-contente"}>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
);
