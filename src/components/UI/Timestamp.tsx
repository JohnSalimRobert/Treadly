type Timestamp = {
  createdAt: string | Date; // Accept both formats
};

const timeAgo = (date: string | Date): string => {
  const createdDate = new Date(date);
  const seconds = Math.floor((new Date().getTime() - createdDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return createdDate.toLocaleDateString();

  interval = Math.floor(seconds / 86400);
  if (interval >= 1)
    return `${interval} day${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1)
    return `${interval} hour${interval === 1 ? "" : "s"} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `${interval} minute${interval === 1 ? "" : "s"} ago`;

  return "just now";
};

const Timestamp: React.FC<Timestamp> = ({ createdAt }) => {
  return <span>{timeAgo(createdAt)}</span>;
};

export default Timestamp;
