import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users/4"
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      {data ? <h2>{data.name}</h2> : <p>Loading...</p>}
    </div>
  );
};
