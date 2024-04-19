import {useQuery} from '@apollo/client';
import {GET_REPOSITORIES} from '../graphql/queries.js';

export const useRepositories = () => {
  const {data = [], loading, refetch} = useQuery(GET_REPOSITORIES);

  const {repositories = null} = data;

  // ? sin apollo
  // const [repositories, setRepositories] = useState(null);
  // const fetchRespositories = async () => {
  //   try {
  //     const res = await globalThis.fetch(
  //       'http://192.168.18.24:5000/api/repositories'
  //     );
  //     const json = await res.json();
  //     setRepositories(json);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchRespositories();
  // }, []);

  const repositoriesNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return {repositories: repositoriesNodes, loading, refetch};
};
