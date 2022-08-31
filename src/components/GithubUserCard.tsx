type Props = {
  owner: string;
  avatar: string;
  url: string;
};

export default function GithubUserCard({ owner, avatar, url }: Props) {
  return (
    <div className="github-card github-card--user">
      <img src={avatar} alt={owner} /> <a href={url}>{owner}</a>
    </div>
  );
}
