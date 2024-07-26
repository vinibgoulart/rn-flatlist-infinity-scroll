import {
  GithubRepositoriesList,
  TGithubRepository,
} from "@/components/GithubRepositoriesList";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";

export default function HomeScreen() {
  const githubRepositoriesGet = async (pageNew?: number) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=react&page=${pageNew || 1}`
    );
    const data = await response.json();

    return data.items;
  };

  const { handleRefetch, loading, data, refetching } =
    useInfinityScroll<TGithubRepository>(githubRepositoriesGet);

  return (
    <GithubRepositoriesList
      loading={loading}
      refetching={refetching}
      repositories={data}
      refetch={handleRefetch}
    />
  );
}
