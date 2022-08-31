type Props = {
  name: string;
  description: string;
  stars: number;
  owner: string;
  avatar: string;
  url: string;
  topics: string[];
};

export default function GithubCard({
  name,
  description,
  stars,
  owner,
  avatar,
  url,
  topics,
}: Props) {
  return (
    <div className="github-card">
      <a href={url}>{name} </a>
      <p>{description}</p>
      <p>
        <img src={avatar} alt={owner} /> <span>{owner}</span>
      </p>
      <p>☆ {stars}</p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}
